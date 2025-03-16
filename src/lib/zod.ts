import { getMimeValues } from "@/utils";
import { z } from "zod";

export const userSchema = z.object({
  name: z.string(),
  dni: z.string(),
});

const passwordValidation = z
  .string()
  .min(8, "Debe tener al menos 8 caracteres")
  .max(32, "Debe tener como máximo 32 caracteres")
  .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
  .regex(/[a-z]/, "Debe tener al menos una minúscula")
  .regex(/[0-9]/, "Debe tener al menos un número")
  .regex(/[@$!%*?&]/, "Debe tener un carácter especial");

export const changePwdSchema = z.object({ pwd: z.string(), newPwd: passwordValidation, repeatNewPwd: passwordValidation }).refine((data) => data.newPwd === data.repeatNewPwd, {
  message: "Las contraseñas no coinciden",
  path: ["repeatNewPwd"],
});
export type ZChangePwdS = z.infer<typeof changePwdSchema>;

export const loginSchema = z.object({
  email: z.string({ required_error: "El correo es obligatorio" }).min(1, "El correo es obligatorio").email("Correo inválido"),
  password: z.string({ required_error: "La contraseña es obligatoria" }).min(8, "La contraseña es obligatoria"),
});
export type ZLoginS = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1, "Name is required").max(32, "Name must be less than 32 characters"),
  lastName: z.string({ required_error: "Last name is required" }).min(1, "Last name is required").max(32, "Last name must be less than 32 characters"),
  dni: z.string({ required_error: "dni is required" }),
  email: z.string({ required_error: "Email is required" }).min(1, "Email is required").email("Invalid email"),
});
export type ZRegisterS = z.infer<typeof registerSchema>;

export const periodoSchema = z.object({
  from: z.preprocess((val) => (typeof val === "string" ? new Date(val) : val), z.date()),
  to: z.preprocess((val) => (typeof val === "string" ? new Date(val) : val), z.date()),
});

export const fileSchema = z
  .instanceof(File, { message: "Debe ser un archivo válido." })
  .refine((file) => file.size <= 20 * 1024 * 1024, {
    message: "El archivo no debe superar los 20MB.",
  })
  .refine((file) => getMimeValues().includes(file.type), {
    message: "Solo se permiten archivos PDF, DOCX, XLSX o JSON.",
  });

export const uploadSchema = z.object({
  file: fileSchema,
});
export type ZUploadS = z.infer<typeof uploadSchema>;
