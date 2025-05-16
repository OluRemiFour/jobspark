import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const base_url = process.env.API_BASE_URL + "api/v1/auth/verifyEmail";
    const response = await axios.post(base_url, { email, otp });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Verification error:", error);
    let errorMessage = "Failed to verify email";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
