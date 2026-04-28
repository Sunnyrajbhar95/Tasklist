import { signUp } from "@/controllers/user/user.controllers";
import { dbConnection } from "@/libs/dbConnection";
import { NextResponse } from "next/server";
import { errorhndler } from "@/libs/error/errorHandler";
import { registerUser } from "@/type/auth.type";

export async function POST(request: Request) {
  await dbConnection();
  try {
    const data: registerUser = await request.json();
    const user = await signUp(data);
    return NextResponse.json(
      {
        user,
        message: "Otp Sent Successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    return errorhndler(error);
  }
}
