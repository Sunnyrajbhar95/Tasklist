"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

function Page() {
  const { data: session } = useSession();

  return (
    <div className="w-full h-full flex justify-center items-center">
      welcome to dashboard, {session?.user?.name}
      <div onClick={() => signOut({ callbackUrl: "/auth/login" })}>logout</div>
    </div>
  );
}

export default Page;
