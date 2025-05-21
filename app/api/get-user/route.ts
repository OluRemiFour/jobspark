import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const token = req.headers.get("token");
  if (!token) {
    return NextResponse.json({ message: "Token not found " });
  }

  const base_url = process.env.API_BASE_URL + "api/v1/user/getUser";
  try {
    const request = await axios.get(base_url, {
      headers: {
        token,
        "Content-Type": "application/json",
      },
    });
    const response = request.data;
    if (response) {
      return NextResponse.json(response);
    }
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
