import { z, object } from "zod";

export const dependenciaSchema = object({
  nombre: z.string({ required_error: "Nombre es requerido" }).min(3, "Nombre debe tener como minimo 3 caracteres"),
  direccion: z.string().optional(),
  codigo: z.string().optional(),
});

export type Dependencia = z.infer<typeof dependenciaSchema>;
