// auth.config.ts
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// IMPORTANTE: No importar prisma directamente en este archivo

export default {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // Mantener callbacks simples que no usen prisma
    async authorized({ auth }) {
      return !!auth;
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;
