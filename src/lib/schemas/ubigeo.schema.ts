import { z } from "zod";

export const UbigeoSchema = z.object({
  inei: z.string(),
  reniec: z.string(),
  departamento: z.string({ required_error: "departamento es requerido" }),
  provincia: z.string({ required_error: "provincia es requerido" }),
  distrito: z.string({ required_error: "distrito es requerido" }),
});

export type Ubigeo = z.infer<typeof UbigeoSchema>;
