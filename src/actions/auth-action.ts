"use server";

import { signIn } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { registerSchema, ZLoginS, ZRegisterS } from "@/lib/zod";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export const loginAction = async (values: ZLoginS) => {
  try {
    const user = await prisma.user.findUnique({ where: { email: values.email } });
    if (!user) return { error: "Usuario no encontrado." };

    await signIn("credentials", { email: values.email, password: values.password, redirect: false });

    return { success: true, must_change_pwd: user.must_change_pwd, role: user.role };
  } catch (error) {
    if (error instanceof AuthError) {
      return { message: error.cause?.err?.message };
    }
    return { message: "error 500" };
  }
};

export const registerAction = async (values: ZRegisterS) => {
  try {
    const { data, success } = registerSchema.safeParse(values);
    if (!success) return { error: "Datos inválidos, revise los campos." };

    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (user) return { error: "El correo electrónico ya está registrado." };

    const password = await bcrypt.hash(data.dni, 10);

    await prisma.user.create({
      data: {
        name: data.name.toUpperCase(),
        last_name: data.lastName.toUpperCase(),
        dni: data.dni,
        email: data.email.toUpperCase(),
        password,
      },
    });

    return { success: true, message: "Usuario creado con éxito." };
  } catch (error) {
    return { error: "Error en el servidor. Intente nuevamente más tarde." };
  }
};

export const patchPassword = async (email: string, newPassword: string) => {
  try {
    const existingUser: User | null = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) return { error: "Usuario no encontrado." };

    const password = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({ where: { id: existingUser.id }, data: { password, must_change_pwd: 0 } });

    return { success: true, message: "Contraseña actualizada exitosamente." };
  } catch (error) {
    return { error: "Error en el servidor. Intente nuevamente más tarde." };
  }
};
