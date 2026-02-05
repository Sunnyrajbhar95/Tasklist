import { NextResponse } from "next/server";
import { errorhndler } from "@/libs/error/errorHandler";
import { login } from "@/controllers/user/user.controllers";
import { dbConnection } from "@/libs/dbConnection";

export async function POST(request) {
  await dbConnection();
  try {
    const data = await request.json();
    const userToken = await login(data);
    const response = NextResponse.json(
      { message: "Login successfull" },
      { status: 200 },
    );
    response.cookies.set("token", userToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
    });
    return response;
  } catch (error) {
    console.log(error);
    return errorhndler(error);
  }
}
