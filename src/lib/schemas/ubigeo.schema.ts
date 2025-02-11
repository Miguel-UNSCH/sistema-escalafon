import { z } from "zod";

export const UbigeoSchema = z.object({
  inei: z.string(),
  reniec: z.string(),
  departamento: z.string(),
  provincia: z.string(),
  distrito: z.string(),
});

export type Ubigeo = z.infer<typeof UbigeoSchema>;
