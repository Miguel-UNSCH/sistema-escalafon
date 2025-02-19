"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { AuthError } from "next-auth";
import { loginSchema, registerSchema } from "@/lib/zod";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  try {
    await signIn("credentials", { email: values.email, password: values.password, redirect: false });

    return { success: true };
  } catch (error: unknown) {
    if (error instanceof AuthError) return { error: error.cause?.err?.message };

    return { error: "error 500" };
  }
};

export const registerAction = async (values: z.infer<typeof registerSchema>) => {
  try {
    const { data, success } = registerSchema.safeParse(values);
    if (!success) return { error: "invalid data" };

    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (user) return { error: "email already registered" };

    const password = await bcrypt.hash(data.password, 10);
    await prisma.user.create({ data: { nombres: data.nombres, apellidos: data.apellidos, email: data.email, password } });

    return { success: true };
  } catch (error: unknown) {
    if (error instanceof AuthError) return { error: error.cause?.err?.message };

    return { error: "error 500" };
  }
};
