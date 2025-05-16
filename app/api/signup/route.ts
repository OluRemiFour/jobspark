import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json();
  const base_url = process.env.API_BASE_URL + "api/v1/auth/signup";

  try {
    const response = await axios.post(base_url, payload);

    if (response.data.success) {
      return NextResponse.json(response.data);
    }

    return NextResponse.json(
      {
        success: false,
        message: response.data.message || "Signup failed",
        data: response.data,
      },
      { status: 400 }
    );
  } catch (error: unknown) {
    console.error("Full error:", error);

    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", {
        status: error.response?.status,
        data: error.response?.data,
        config: error.config,
      });

      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || "Internal Server Error",
          data: error.response?.data,
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred.",
      },
      { status: 500 }
    );
  }
}
