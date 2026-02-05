import { NextResponse } from "next/server";
import ApiError from './apiError'

export const errorhndler = (error: any) => {
  console.log(error);

  if (error instanceof ApiError) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.statusCode },
    );
  }

  return NextResponse.json(
    {
      success: false,
      message: "Internal server problem",
    },
    { status: 500 },
  );
};
