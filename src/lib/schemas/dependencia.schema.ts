import { z } from "zod";

export const dependenciaSchema = z.object({
  nombre: z.string({ required_error: "Nombre es requerido" }).min(3, "Nombre debe tener como minimo 3 caracteres"),
  direccion: z.string().optional(),
  codigo: z.string(),
});

export type ZDependencia = z.infer<typeof dependenciaSchema>;
