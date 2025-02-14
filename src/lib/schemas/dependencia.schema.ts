import { z, object } from "zod";

export const dependenciaSchema = object({
  nombre: z.string({ required_error: "Nombre es requerido" }).min(3, "Nombre debe tener como minimo 3 caracteres"),
  direccion: z.string({ required_error: "Direccion es requerida" }).min(3, "Direccion debe tener como minimo 3 caracteres"),
  codigo: z.string({ required_error: "Codigo es requerido" }).min(3, "Codigo debe tener como minimo 3 caracteres"),
});

export type Dependencia = z.infer<typeof dependenciaSchema>;
