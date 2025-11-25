"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f8] px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
        <SignUp
          appearance={{
            elements: {
              rootBox: "w-full",
              cardBox: "w-full shadow-none",
              card: "w-full shadow-none border-none rounded-3xl",
              headerTitle: "text-2xl font-semibold",
              formButtonPrimary: "bg-orange-500 hover:bg-orange-600 text-white rounded-xl",
              formFieldInput: "rounded-xl",
              footerActionLink: "text-orange-600 hover:text-orange-700",
            },
          }}
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          fallbackRedirectUrl="/"
        />
      </div>
    </main>
  );
}
