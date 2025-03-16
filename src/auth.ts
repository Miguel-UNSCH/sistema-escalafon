import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/config/auth.config";
import { prisma } from "@/config/prisma.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
