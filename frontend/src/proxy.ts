import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
const isAdminRoute = createRouteMatcher(["/admin(.*)", "/api/blob/upload(.*)"]);
const adminIds = () => new Set((process.env.ADMIN_USER_IDS || "").split(",").map((id) => id.trim()).filter(Boolean));
export default clerkMiddleware(async (auth, request) => {
  if (!isAdminRoute(request)) return;
  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    if (request.nextUrl.pathname.startsWith("/api/")) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    return redirectToSignIn({ returnBackUrl: request.url });
  }
  if (!adminIds().has(userId)) return new NextResponse("Not authorized", { status: 403 });
});
export const config = { matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"] };
