"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: "bg-orange-500 hover:bg-orange-600 text-white",
            card: "shadow-none border-none",
          },
        }}
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
      />
    </div>
  );
}
