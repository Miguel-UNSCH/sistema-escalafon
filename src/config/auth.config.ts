import { loginSchema } from "@/lib/zod";
import type { NextAuthConfig } from "next-auth";

import bcrypt from "bcryptjs";

import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/config/prisma.config";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { data, success } = loginSchema.safeParse(credentials);
        if (!success) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({ where: { email: data.email } });

        if (!user) {
          throw new Error("Invalid credentials [user-not-found]");
        }

        const isValid = bcrypt.compare(data.password, user.password);

        if (!isValid) {
          throw new Error("Invalid credentials [password-not-match]");
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
