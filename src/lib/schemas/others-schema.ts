import { z } from "zod";

export const UbigeoSchema = z.object({
  inei: z.string(),
  reniec: z.string(),
  departamento: z.string({ required_error: "departamento es requerido" }),
  provincia: z.string({ required_error: "provincia es requerido" }),
  distrito: z.string({ required_error: "distrito es requerido" }),
});

export type ZUbigeo = z.infer<typeof UbigeoSchema>;

export const cargoSchema = z.object({
  nombre: z.string({ required_error: "Nombre es requerido" }).min(3, "Nombre debe tener como minimo 3 caracteres"),
});

export type ZCargo = z.infer<typeof cargoSchema>;

export const dependenciaSchema = z.object({
  nombre: z.string({ required_error: "Nombre es requerido" }).min(3, "Nombre debe tener como minimo 3 caracteres"),
  direccion: z.string().optional(),
  codigo: z.string(),
});

export type ZDependencia = z.infer<typeof dependenciaSchema>;
