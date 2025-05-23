import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const token = req.headers.get("token");
  if (!token) {
    return NextResponse.json({
      status: "Fail",
      message: "Token not found ",
    });
  }
  const base_url = `${process.env.API_BASE_URL}api/v1/user/get-profile-picture`;
  try {
    const request = await axios.get(base_url, {
      headers: {
        token,
      },
    });
    const response = await request.data;
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
export async function POST(req: Request) {
  const token = req.headers.get("token");
  const formData = await req.formData();
  const file = formData.get("profilePicture") as File;
  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      {
        status: "Fail",
        message: "Invalid file",
      },
      { status: 400 }
    );
  }

  // ✅ Repack the file into a new FormData
  const proxyFormData = new FormData();
  proxyFormData.append("profilePicture", file, file.name);

  console.log(proxyFormData);
  if (!token) {
    return NextResponse.json({
      status: "Fail",
      message: "Token not found ",
    });
  }
  const base_url = `${process.env.API_BASE_URL}api/v1/user/upload-profile-picture`;
  try {
    const request = await axios.post(base_url, proxyFormData, {
      headers: {
        token,
        // "Content-Type": "multipart/form-data",
      },
    });
    const response = await request.data;
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
