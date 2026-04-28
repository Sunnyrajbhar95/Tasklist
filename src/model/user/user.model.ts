import mongoose, { Schema, model, models } from "mongoose";
import {User} from "../../type/user.type"

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please Enter valid email",
      ],
    },
    password: {
      type: String,
      required: false,
      match: [
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Please Enter Valid password ",
      ],
    },
    provider: {
      type: String,
      enum: ["Credentials", "google"],
      default: "Credentials",
    },
    otp: {
      type: Number,
    },
    otpExpiredAt: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const User = models.User || model<User>("User", userSchema);
export default User;
