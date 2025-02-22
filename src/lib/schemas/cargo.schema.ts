import { object, z } from "zod";

export const cargoSchema = object({
  nombre: z.string({ required_error: "Nombre es requerido" }).min(3, "Nombre debe tener como minimo 3 caracteres"),
});

export type ZCargo = z.infer<typeof cargoSchema>;
