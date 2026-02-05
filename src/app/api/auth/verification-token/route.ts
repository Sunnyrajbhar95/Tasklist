import { NextResponse } from "next/server";
import { errorhndler } from "@/libs/error/errorHandler";
import { verificationtoken } from "@/controllers/user/user.controllers";
import { userAuth } from "@/libs/authMiddleware/userAuth";
import { dbConnection } from "@/libs/dbConnection";
export async function POST(request) {
  await dbConnection();
  try {
    const data = await request.json();
    const userdata = await userAuth(request);
    if (userdata.success === false) {
      return NextResponse.json(
        { succes: false, message: userdata.message },
        { status: userdata.status || 400 },
      );
    }

    const user = await verificationtoken(data);
    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    return errorhndler(error);
  }
}
