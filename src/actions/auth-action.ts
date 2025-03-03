"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { auth, signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { AuthError } from "next-auth";
import { loginSchema, registerSchema } from "@/lib/zod";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  try {
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false, // 🚨 Evita redirecciones automáticas
    });

    if (result?.error) {
      return { error: "Credenciales incorrectas" };
    }

    // ✅ Obtener sesión después del login
    const session = await auth(); // Alternativa: await getSession();

    if (!session?.user) {
      return { error: "No se pudo obtener la sesión" };
    }

    return {
      success: true,
      role: session.user.role, // 🚨 Asegúrate de que NextAuth devuelve el rol
    };
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "Error 500: Fallo interno del servidor" };
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
