// middleware.ts
import NextAuth from "next-auth";
import authConfig from "./config/auth.config";

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ["/admin/:path*"],
};
