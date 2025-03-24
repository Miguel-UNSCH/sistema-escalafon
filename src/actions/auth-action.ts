// eslint-disable no-unused-vars
"use server";

import { prisma } from "@/config/prisma.config";
import { ChangePwd, changePwdSchema, cPwdSchema, registerSchema, ZLoginS, ZRegisterS } from "@/lib/zod";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";
import { signIn as nextAuthSignIn } from "@/auth";

// Define el tipo de resultado, extendiéndolo para incluir los campos adicionales
type LoginResult = {
  success: boolean;
  message?: string;
  must_change_pwd?: number;
  role?: string;
  redirectTo?: string;
};

export async function loginAction(values: ZLoginS): Promise<LoginResult> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: values.email },
    });
    if (!user) {
      return {
        success: false,
        message: "Usuario no encontrado.",
      };
    }

    // Usar la versión server-side de signIn
    const result = await nextAuthSignIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (!result || result.error) {
      return {
        success: false,
        message: result?.error || "Error al iniciar sesión",
      };
    }

    // Retornar los datos adicionales y la redirección basada en el rol
    return {
      success: true,
      must_change_pwd: user.must_change_pwd,
      role: user.role,
      redirectTo: user.role === "admin" ? "/dashboard" : "/personal-file",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message,
      };
    }
    if (error instanceof AuthError) {
      return {
        success: false,
        message: "Credenciales inválidas",
      };
    }
    // eslint-disable-next-line no-console
    console.error("Error de autenticación:", error);
    return {
      success: false,
      message: "Error del servidor",
    };
  }
}

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
        modification_end_time: new Date(Date.now() + 1 * 60 * 1000),
        dni: data.dni,
        email: data.email.toUpperCase(),
        password,
      },
    });

    return { success: true, message: "Usuario creado con éxito." };
  } catch (error: unknown) {
    return { error: "Error en el servidor. Intente nuevamente más tarde." };
  }
};

export const patchPassword = async (email: string, currentPassword: string, newPassword: string) => {
  try {
    const existingUser: User | null = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) return { error: "Usuario no encontrado." };

    const passwordMatch = await bcrypt.compare(currentPassword, existingUser.password);
    if (!passwordMatch) return { error: "La contraseña actual es incorrecta." };

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: existingUser.id },
      data: { password: hashedNewPassword, must_change_pwd: 0 },
    });

    return { success: true, message: "Contraseña actualizada exitosamente." };
  } catch (error: unknown) {
    return { error: "Error en el servidor. Intente nuevamente más tarde." };
  }
};

export const patchPwd = async (userId: string, data: ChangePwd): Promise<{ success?: boolean; message?: string; error?: string }> => {
  try {
    const validatedData = cPwdSchema.parse(data);

    const existingUser: User | null = await prisma.user.findUnique({ where: { id: userId } });
    if (!existingUser) return { error: "Usuario no encontrado." };

    const isMatch = await bcrypt.compare(validatedData.current_pwd, existingUser.password);
    if (!isMatch) return { error: "La contraseña actual es incorrecta." };

    const hashedPassword = await bcrypt.hash(validatedData.new_pwd, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword, must_change_pwd: 0 },
    });

    return { success: true, message: "Contraseña actualizada exitosamente." };
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: "Error en el servidor. Intente nuevamente más tarde." };
  }
};
