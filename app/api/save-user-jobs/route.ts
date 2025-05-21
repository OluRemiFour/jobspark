import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const token = req.headers.get("token");
  const payload = await req.json();

  console.log(payload);
  if (!token) {
    return NextResponse.json({ message: "Token is not found" });
  }
  // const base_url = process.env.API_BASE_URL;
  try {
    const request = await axios.post(
      //   `${base_url}api/v1/jobs/saveJob`,
      `https://jobai-0obv.onrender.com/api/v1/jobs/saveJob`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          token,
        },
      }
    );
    const result = request.data;
    return NextResponse.json(result);
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
