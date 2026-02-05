import { otpVerification } from "@/controllers/user/user.controllers";
import { dbConnection } from "@/libs/dbConnection";
import { errorhndler } from "@/libs/error/errorHandler";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  await dbConnection();
  try {
    const data = await request.json();
    const token = await otpVerification(data);

    const response = NextResponse.json(
      { success: true, message: "Otp verified successfully" },
      { status: 200 },
    );
    response.cookies.set("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    return errorhndler(error);
  }
}
