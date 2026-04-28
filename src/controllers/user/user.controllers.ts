import User from "@/model/user/user.model";
import bcrypt from "bcrypt";
import ApiError from "@/libs/error/apiError";
import jwt from "jsonwebtoken";
import { userResonse,requestBody,resetPasswordType } from "@/type/auth.type"; 


const getOtp = () => {
  return Math.floor(Math.random() * 9000 + 1000);
};

// controller to register the user
export const signUp = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    if (!email || !password || !name) {
      console.log("Email,Name and password is required");
      throw new ApiError("Email,Name and password is required", 400);
    }
    const userExist:userResonse | null= await User.findOne({ email});
    if (userExist && userExist.isVerified) {
      throw new ApiError("User Already Exist", 400);
    }
    const otp = getOtp();
    const otpExpiredAt = Date.now() + 5 * 60 * 1000;
    const hashPassword = await bcrypt.hash(password, 10);
    if (userExist && !userExist.isVerified) {
      userExist.name = name;
      userExist.password = hashPassword;
      userExist.otpExpiredAt = otpExpiredAt;
      userExist.otp = otp;
      await userExist.save();
      return userExist;
    }
    const user = await User.create({
      name,
      email,
      provider: "Credentials",
      otpExpiredAt,
      password: hashPassword,
      otp,
    });
    return user;
  } catch (error: any) {
    throw new ApiError(error.message, error.statusCode || 500);
  }
};
// otp verification controller
export const otpVerification = async ({
  email,
  otp,
}: {
  email: string;
  otp: number;
}) => {
  if (!email || !otp) {
    throw new ApiError("Email or Otp is required", 400);
  }
  const user:userResonse | null = await User.findOne({ email });
  if (!user) {
    throw new ApiError("User does not exit", 404);
  }
  if (user.otp !== otp || user.otpExpiredAt < Date.now()) {
    throw new ApiError("Invalid or expired otp", 400);
  }
  user.isVerified = true;
  user.otp = null;
  await user.save();
  //   logic to generate the jwt token

  const payload = {
    id: user?._id,
    email: user?.email,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY);

  return token;
};

// controller to login the user
export const login = async (data: requestBody) => {
  const { email, password } = data;
  if (!email || !password) {
    throw new ApiError("email or password is reqired", 400);
  }
  const user:userResonse = await User.findOne({ email });
  if (!user) {
    throw new ApiError("User not found ", 404);
  }
  const checkPassword = await bcrypt.compare(password, user?.password);
  if (!checkPassword) {
    throw new ApiError("Invaild email or password", 401);
  }
  const payload = {
    id: user?._id,
    email: user?.email,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY);
  return token;
};

// cotroller to reset the password
export const verificationtoken = async (data: requestBody) => {
  const { email } = data;
  if (!email) {
    throw new ApiError("Email is required", 400);
  }
  const user:userResonse = await User.findOne({ email, isVerified: true });
  if (!user) {
    throw new ApiError("User not found", 404);
  }
  const url = `http://localhost:3000/api/auth/reset-password?token=${user._id}`;
  return url;
};

// controller to reset the password
export const resetPassword = async (data: resetPasswordType) => {
  const { token, newPassword } = data;
  if (!token || !newPassword) {
    throw new ApiError("Token and new password is required", 400);
  }
  const user:userResonse = await User.findById(token);
  if (!user) {
    throw new ApiError("Invalid token", 404);
  }
  const hashPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashPassword;
  await user.save();
  return "Password reset successfully";
};
