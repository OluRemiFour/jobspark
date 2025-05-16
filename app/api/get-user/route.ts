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
  } catch (error: any | string) {
    console.error(error.response?.data || error.message);
    let message = "An error occured";

    if (error instanceof Error) {
      message = error.message;
      console.log(error.message);
    }

    return NextResponse.json(message);
  }
}
