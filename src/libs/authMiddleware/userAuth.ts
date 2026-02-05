import User from "@/model/user/user.model";
import jwt from "jsonwebtoken";
export const userAuth = async (request: any) => {
  const token = request.cookies.get("token")?.value;
  console.log("Token from cookie:", token);
  if (!token) {
    return {
      success: false,
      message: "Authentication token is missing",
      status: 401,
    };
  }

  const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
  if (!decodeToken) {
    return {
      success: false,
      message: "Invalid token",
      status: 403,
    };
  }

  const user = await User.findById(decodeToken.id).select("-password");
  if (!user) {
    return {
      success: false,
      message: "User not found",
      status: 404,
    };
  }

  return {
    success: true,
    user,
  };
};
