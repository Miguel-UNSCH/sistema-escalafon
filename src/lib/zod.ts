import { object, string, number, z, date, optional } from "zod";

export const EstadoCivil = z.enum(["S", "C", "D", "V"]);
export const GrupoSanguineo = z.enum(["A_POSITIVO", "A_NEGATIVO", "B_POSITIVO", "B_NEGATIVO", "AB_POSITIVO", "AB_NEGATIVO", "O_POSITIVO", "O_NEGATIVO"]);
export const Sexo = z.enum(["M", "F"]);
export const Status = z.enum(["ENABLED", "DISABLED"]);

export const SituacionLaboral = z.enum(["ND276", "CPV", "CL30057", "CASI", "CAST", "CPI", "PPP1404", "PP1004"]);
export const RegimenPensionario = z.enum(["L29903", "DL19990"]);
export const GradoInstruccion = z.enum(["SIN", "PC", "PI", "SC", "SI", "TEC", "UNI", "POS", "NULL"]);
export const FormacionAcademica = z.enum(["PC", "PI", "SC", "SI", "BAC", "TIT", "POS", "TEC"]);

export const loginSchema = object({
  email: string({ required_error: "Email is required" }).min(1, "Email is required").email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const registerSchema = object({
  email: string({ required_error: "El correo electrónico es obligatorio" }).min(1, "El correo electrónico es obligatorio").email("Correo electrónico no válido"),
  password: string({ required_error: "La contraseña es obligatoria" })
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(32, "La contraseña debe tener menos de 32 caracteres")
    .regex(/[A-Z]/, "La contraseña debe tener al menos una letra mayúscula")
    .regex(/[a-z]/, "La contraseña debe tener al menos una letra minúscula")
    .regex(/[0-9]/, "La contraseña debe tener al menos un número")
    .regex(/[@$!%*?&]/, "La contraseña debe tener al menos un carácter especial (@$!%*?&)"),
  repeatPassword: string({ required_error: "Repetir la contraseña es obligatorio" }),
  nombres: string({ required_error: "Los nombres son obligatorios" }).min(1, "Debe ingresar sus nombres"),
  apellidos: string({ required_error: "Los apellidos son obligatorios" }).min(1, "Debe ingresar sus apellidos"),
}).superRefine(({ password, repeatPassword }, ctx) => {
  if (password !== repeatPassword) {
    ctx.addIssue({ code: "custom", path: ["repeatPassword"], message: "Las contraseñas deben coincidir" });
  }
});

export const userSchema = object({
  id: string().min(1, "El ID es obligatorio"),
  nombres: string().min(1, "El nombre es obligatorio"),
  apellidos: string().min(1, "El apellido es obligatorio"),
  email: optional(string().email("El correo electrónico debe ser válido").max(255, "El correo electrónico es demasiado largo")),
  password: optional(string().min(8, "La contraseña debe tener al menos 8 caracteres")),
  ubigeoId: optional(number().int().positive("El ID del ubigeo debe ser un número positivo")),
  status: Status.default("ENABLED"),
  personalId: optional(number().int().positive("El ID del personal debe ser un número positivo")),
  conyugeId: optional(number().int().positive("El ID del cónyuge debe ser un número positivo")),
  hijoId: optional(number().int().positive("El ID del hijo debe ser un número positivo")),
  updatedAt: date().optional(),
  createdAt: date().default(() => new Date()),
});

export type User = z.infer<typeof userSchema>;
