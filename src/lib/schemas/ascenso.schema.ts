import { object, string, number, z } from "zod";

export const ascensoSchema = object({
  resolucionAscenso: string().min(1, "La resolución de ascenso es obligatoria"),
  nivelRemunerativoDel: number().min(1, "El nivel remunerativo desde es obligatorio"),
  nivelRemunerativoAl: number().min(1, "El nivel remunerativo hasta es obligatorio"),
  papDel: string().min(1, "El PAP desde es obligatorio"),
  papAl: string().min(1, "El PAP hasta es obligatorio"),
  cnp: string().min(1, "El CNP es obligatorio"),
  personalId: string().min(1, "El ID del personal es obligatorio"),
  cargoDelId: string().min(1, "El ID del cargo desde es obligatorio"),
  cargoAlId: string().min(1, "El ID del cargo hasta es obligatorio"),
  dependenciaOficinaId: string().min(1, "El ID de la dependencia u oficina es obligatorio"),
});

export type Ascenso = z.infer<typeof ascensoSchema>;
