import { z } from "zod";

import { UbigeoSchema } from "./ubigeo.schema";
import { dependenciaSchema } from "./dependencia.schema";
import { cargoSchema } from "./cargo.schema";
import { EstadoCivil, GrupoSanguineo, RegimenPensionario, Sexo, SituacionLaboral } from "../zod";

export const personalSchema = z.object({
  userId: z.string({ required_error: "Usuario es requerido" }),
  domicilio: z.string({ required_error: "Domicilio es requerido" }),
  interiorUrbanizacion: z.string().optional(),
  sexo: Sexo,
  dni: z.string({ required_error: "DNI es requerido" }).length(8, "El DNI debe tener 8 caracteres"),
  nAutogenerado: z.string({ required_error: "Número autogenerado es requerido" }),
  licenciaConducir: z.string().optional(),
  grupoSanguineo: GrupoSanguineo,
  fechaIngreso: z
    .string({ required_error: "Fecha de ingreso es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  fechaNacimiento: z
    .string({ required_error: "Fecha de nacimiento es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  unidadEstructurada: z.string({ required_error: "Unidad estructurada es requerida" }),
  telefono: z.string().optional(),
  aniosServicio: z.number({ required_error: "" }),
  celular: z.string({ required_error: "Celular es requerido" }),
  regimenPensionario: RegimenPensionario,
  nombreAfp: z.string().optional(),
  situacionLaboral: SituacionLaboral,
  estadoCivil: EstadoCivil,
  discapacidad: z.boolean({ required_error: "Discapacidad es requerida" }),

  ubigeo: UbigeoSchema,
  dependencia: dependenciaSchema,
  cargo: cargoSchema,
});

export type ZPersonal = z.infer<typeof personalSchema>;
