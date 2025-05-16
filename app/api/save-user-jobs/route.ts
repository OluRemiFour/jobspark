import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
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
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: error.message,
    });
  }
}
