import { errorhndler } from "@/libs/error/errorHandler";
import { userAuth } from "@/libs/authMiddleware/userAuth";
import { NextResponse } from "next/server";
import { resetPassword } from "@/controllers/user/user.controllers";

export async function POST(request) {
  try {
    const data = await request.json();
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    data.token = token;
    // const userdata = await userAuth(request);
    // if (userdata.success === false) {
    //   return NextResponse.json(
    //     { succes: false, message: userdata.message },
    //     { status: userdata.status || 400 },
    //   );
    // }
    const user = await resetPassword(data);
    return NextResponse.json({ success: true, message: user }, { status: 200 });
  } catch (error) {
    return errorhndler(error);
  }
}
