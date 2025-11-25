"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  function openResetFlow() {
    router.push(
      `/sign-in${
        email.trim() ? `?identifier=${encodeURIComponent(email.trim())}` : ""
      }`
    );
  }
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex gap-16">
          <div className="flex flex-col relative">
            <Button
              type="button"
              className="rounded-[50%] bg-white absolute left-0 top-0"
              onClick={() => router.back()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M10 12L6 8L10 4"
                  stroke="#18181B"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
            <div className="flex flex-col gap-5">
              <h1 className="font-bold text-3xl mt-12">Reset your password</h1>
              <p className="text-gray-500">
                Enter your email to continue to the secure password reset flow.
              </p>
              <Input
                type="email"
                value={email}
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="underline">Forgot password</p>
            </div>
            <div className="flex flex-col">
              <Button
                type="button"
                className="bg-black w-[450px] mt-5 mb-5 text-white"
                onClick={openResetFlow}
              >
                Continue
              </Button>
              <div className="flex gap-2 pl-23">
                <p className="text-gray-500">Don’t have an account?</p>
                <Link href="/sign-up">
                  <span className="text-blue-500">Sign up</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
