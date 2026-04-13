"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { registerUser, otpVerification } from "@/services/auth/authservices";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isOtpVerification, setIsOtpVerification] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const router = useRouter();
  const otpref = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // this fuction will handle the form submission and call the registerUser function from authservices
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      setIsOtpVerification(true);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // this function will handle the otp input change and move the focus to the next input field
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      otpref[index + 1]?.current?.focus();
    }
  };

  // this function will handle the backspace key press and move the focus to the previous input field
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    console.log(index);
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        otpref[index - 1]?.current?.focus();
      }
    }
  };

  // this function will handle the otp verification and call the otpVerification function from authservices
  const otpverification = async () => {
    try {
      const response = await otpVerification({
        email: formData.email,
        otp: Number(otp.join("")),
      });
      router.push("/auth/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // this function will handle the google sign in and call the signIn function from next-auth/react
  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };
  return (
    <div className="min-h-screen w-full bg-[#181925] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl bg-[#25273E] flex flex-col md:flex-row">
        {/* Left Side: Image (Hidden on small screens) */}
        <div className="hidden md:flex flex-1 relative bg-black/20">
          <Image
            src="/auth/auth.jpg"
            alt="Auth Background"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181925]/90 to-transparent flex items-end p-10">
            <h1 className="text-3xl font-bold text-white tracking-wide">
              Start your journey <br /> with us.
            </h1>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            {!isOtpVerification ? (
              <>
                <h2 className="text-2xl font-bold text-white mb-1.5">
                  Create an Account
                </h2>
                <p className="text-sm text-gray-400 mb-6">
                  Sign up to get started with your task list.
                </p>

                <form className="space-y-4" action="#" method="POST">
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-300 mb-1.5"
                      htmlFor="name"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-[#181925] border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-300 mb-1.5"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 bg-[#181925] border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-300 mb-1.5"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-[#181925] border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transition-all active:scale-[0.98]"
                    onClick={handleSubmit}
                  >
                    Sign Up
                  </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                  >
                    Log in
                  </Link>
                </p>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transition-all active:scale-[0.98]"
                  onClick={handleGoogleSignIn}
                >
                  Sign Up with Google
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-white mb-1.5 text-center">
                  Verify your email
                </h2>
                <p className="text-sm text-gray-400 mb-8 text-center">
                  We've sent a 4-digit verification code to
                  <br />
                  <span className="text-white font-medium">
                    {formData.email || "your email"}
                  </span>
                  .
                </p>

                <div className="flex justify-center gap-4 mb-8">
                  {[...Array(4)].map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      className="w-14 h-14 text-center text-2xl font-bold bg-[#181925] text-white border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                      ref={otpref[index]}
                      value={otp[index]}
                      maxLength={1}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transition-all active:scale-[0.98]"
                  onClick={() => otpverification()}
                >
                  Verify Code
                </button>

                <p className="mt-8 text-center text-sm text-gray-400">
                  Didn't receive the code?{" "}
                  <button className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                    Resend
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
