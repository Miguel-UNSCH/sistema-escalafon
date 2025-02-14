import { object, string, number, z, date, optional } from "zod";

export const loginSchema = object({
  email: string({ required_error: "Email is required" }).min(1, "Email is required").email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const registerSchema = object({
  email: string({ required_error: "Email is required" }).min(1, "Email is required").email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  repeatPassword: string({ required_error: "Repeat password is required" }),
  nombres: string({ required_error: "Nombres is required" }).min(1, "Nombres is required"),
  apellidos: string({ required_error: "Apellidos is required" }).min(1, "Apellidos is required"),
});

enum Role {
  PERSONAL = "PERSONAL",
  ADMIN = "ADMIN",
}

enum Status {
  ENABLED = "ENABLED",
  DISABLED = "DISABLED",
}

export const userSchema = object({
  id: string().min(1, "El ID es obligatorio"),
  nombres: string().min(1, "El nombre es obligatorio"),
  apellidos: string().min(1, "El apellido es obligatorio"),
  role: z.enum([Role.PERSONAL, Role.ADMIN]).default(Role.PERSONAL),
  email: optional(string().email("El correo electrónico debe ser válido").max(255, "El correo electrónico es demasiado largo")),
  password: optional(string().min(8, "La contraseña debe tener al menos 8 caracteres")),
  ubigeoId: optional(number().int().positive("El ID del ubigeo debe ser un número positivo")),
  status: z.enum([Status.ENABLED, Status.DISABLED]).default(Status.ENABLED), // Valor por defecto 'ENABLED'
  personalId: optional(number().int().positive("El ID del personal debe ser un número positivo")),
  conyugeId: optional(number().int().positive("El ID del cónyuge debe ser un número positivo")),
  hijoId: optional(number().int().positive("El ID del hijo debe ser un número positivo")),
  updatedAt: date().optional(),
  createdAt: date().default(() => new Date()),
});

export type User = z.infer<typeof userSchema>;
