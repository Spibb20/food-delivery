import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/user.provider";
import { OrderFoodAuth } from "@/context/food.provider";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Food Delivery",
  description: "Food delivery ordering application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          <AuthProvider>
            <OrderFoodAuth>{children}</OrderFoodAuth>
          </AuthProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
