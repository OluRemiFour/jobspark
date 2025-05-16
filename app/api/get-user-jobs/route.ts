// import { NextRequest, NextResponse } from "next/server";
// import axios from "axios";

// export async function GET(req: NextRequest) {
//   // PROPER way to get the Authorization header
//   // const authHeader = request.headers.get("authorization");

//   // Extract token from "Bearer <token>"
//   // const token = authHeader?.split(" ")[1];

//   const token = req.headers.get("token");

//   if (!token) {
//     return NextResponse.json(
//       { message: "Authorization token missing" },
//       { status: 401 }
//     );
//   }

//   try {
//     const response = await axios.get(
//       `https://jobai-0obv.onrender.com/api/v1/jobs`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           token: token,
//         },
//       }
//     );

//     return NextResponse.json(response.data);
//   } catch (error: unknown) {
//     console.error("Backend API Error:", error);

//     if (error instanceof Error) {
//       return NextResponse.json({ message: error.message }, { status: 500 });
//     }

//     return NextResponse.json(
//       { message: "An unexpected error occurred" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const token = req.headers.get("token"); // ✅ correct

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
          token: token, // ✅ must match what the backend expects
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Backend API Error:", error.message);

    return NextResponse.json(
      {
        message:
          error.response?.data?.message || "An unexpected error occurred",
        status: error.response?.status || 500,
      },
      { status: error.response?.status || 500 }
    );
  }
}
