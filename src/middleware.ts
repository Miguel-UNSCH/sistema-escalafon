import authConfig from "@/config/auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

const { auth: middleware } = NextAuth(authConfig);

const publicRoutes = ["/", "/login", "/register", "/api/auth/verify-email"];

export default middleware((r) => {
  const { nextUrl, auth } = r;
  const isLoggedIn = !!auth?.user;
  console.log(isLoggedIn);
  if (!publicRoutes.includes(nextUrl.pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
