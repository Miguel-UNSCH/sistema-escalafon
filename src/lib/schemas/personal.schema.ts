import { object, string, number, boolean, z, date } from "zod";

import { UbigeoSchema } from "./ubigeo.schema";
import { dependenciaSchema } from "./dependencia.schema";
import { cargoSchema } from "./cargo.schema";
import { EstadoCivil, GrupoSanguineo, Sexo, Status } from "../zod";

export const personalSchema = object({
  userId: string({ required_error: "Usuario es requerido" }),
  sexo: Sexo,
  edad: number({ required_error: "Edad es requerida" }).min(18, "La edad mínima es 18 años").max(100, "La edad máxima es 100 años"),
  dni: string({ required_error: "DNI es requerido" }).length(8, "El DNI debe tener 8 caracteres"),
  nAutogenerado: string({ required_error: "Número autogenerado es requerido" }),
  licenciaConducir: string().optional(),
  grupoSanguineo: GrupoSanguineo,
  fechaIngreso: date().optional(),
  unidadEstructurada: string({ required_error: "Unidad estructurada es requerida" }),
  fechaNacimiento: date().optional(),
  nacionalidad: string({ required_error: "Nacionalidad es requerida" }),
  domicilio: string({ required_error: "Domicilio es requerido" }),
  interiorUrbanizacion: string().optional(),
  telefono: string().optional(),
  celular: string({ required_error: "Celular es requerido" }),
  regimenPensionario: string({ required_error: "Régimen pensionario es requerido" }),
  nombreAfp: string().optional(),
  situacionLaboral: string({ required_error: "Situación laboral es requerida" }),
  estadoCivil: EstadoCivil,
  discapacidad: boolean({ required_error: "Discapacidad es requerida" }),
  status: Status.optional(),

  ubigeo: UbigeoSchema,
  dependencia: dependenciaSchema,
  cargo: cargoSchema,
});

export type ZPersonal = z.infer<typeof personalSchema>;
