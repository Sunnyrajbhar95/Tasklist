"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { loginUser } from "@/services/auth/authservices";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

 

  const handleLogin = async () => {
    try {
      const repsponse = await loginUser(formData);
      console.log(repsponse);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#181925] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl bg-[#25273E] flex flex-col md:flex-row-reverse">
        {/* Right Side: Image (Hidden on small screens) */}
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
              Welcome back to <br /> your dashboard.
            </h1>
          </div>
        </div>

        {/* Left Side: Form */}
        <div className="flex-1 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-2xl font-bold text-white mb-1.5">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Please log in to access your account.
            </p>

            <form className="space-y-4" action="#" method="POST">
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
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e)=>setFormData({...formData,email:e.target.value})}
                  className="w-full px-4 py-3 bg-[#181925] border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    className="block text-sm font-medium text-gray-300"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e)=>setFormData({...formData,password:e.target.value})}
                  className="w-full px-4 py-3 bg-[#181925] border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-600 bg-[#181925] text-indigo-500 focus:ring-indigo-500/50 focus:ring-offset-[#25273E]"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-300"
                >
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 mt-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transition-all active:scale-[0.98]"
                onClick={handleLogin}
              >
                Sign In
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                href="/auth/register"
                className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
