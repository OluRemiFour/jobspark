import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json();
  const { email, password } = payload;
  const base_url = process.env.API_BASE_URL + "api/v1/auth/login";

  try {
    const response = await axios.post(base_url, { email, password });
    // console.log(response.data);
    if (response.data.status === "success" || response.data) {
      // console.log("after resp ok", response);
      return NextResponse.json(response.data);
    }

    return NextResponse.json(
      {
        success: false,
        message: response.data.message || "Invalid email or password.",
      },
      { status: 401 }
    );
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", {
        status: error.response?.status,
        data: error.response?.data,
      });

      const status = error.response?.status || 500;
      const message = error.response?.data?.message || "Internal server error";

      return NextResponse.json(
        {
          success: false,
          message,
        },
        { status }
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
