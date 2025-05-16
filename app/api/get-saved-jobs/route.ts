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

  const base_url = `${process.env.API_BASE_URL}api/v1/jobs/getSavedJobs`;
  try {
    const request = await axios.get(base_url, {
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });
    const response = request.data;
    if (response) {
      return NextResponse.json(response);
    }
  } catch (error) {
    console.log(error.message);
  }
}
