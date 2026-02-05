import { NextResponse } from "next/server";
import { errorhndler } from "@/libs/error/errorHandler";

export async function GET(request) {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    return errorhndler(error);
  }
}
