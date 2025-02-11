import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/zod";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
// notice this is only object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { data, success } = loginSchema.safeParse(credentials);
        if (!success) throw new Error("Invalid credentials");

        const user = await prisma.user.findUnique({
          where: {
            email: data.email,
          },
        });

        if (!user) throw new Error("Invalid credentials [email]");

        if (!user.password) throw new Error("Invalid credentials [password]");

        const isValid = await bcrypt.compare(data.password, user.password);

        if (!isValid) throw new Error("Invalid credentials [password]");

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
