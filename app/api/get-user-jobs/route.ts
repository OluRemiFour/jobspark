import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const token = req.headers.get("token");

  if (!token) {
    return NextResponse.json(
      { message: "Authorization token missing" },
      { status: 401 }
    );
  }

  try {
    const response = await axios.get(
      `https://jobai-0obv.onrender.com/api/v1/jobs`,
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    let message = "An error occurred";

    if (error instanceof Error) {
      message = error.message;
      console.error(message);
    } else if (
      typeof error === "object" &&
      error !== null &&
      "response" in error
    ) {
      const err = error as { response?: { data?: string }; message?: string };
      message = err.response?.data || err.message || message;
      console.error(message);
    } else {
      console.error("Unknown error", error);
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
