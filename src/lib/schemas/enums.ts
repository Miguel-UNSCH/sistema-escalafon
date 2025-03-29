import { z } from "zod";

import {
  EstadoCivil as EstadoCivilPrisma,
  GrupoSanguineo as GrupoSanguineoPrisma,
  Sexo as SexoPrisma,
  TContrato as TContratoPrisma,
  CLaboral as CLaboralPrisma,
  RLaboral as RLaboralPrisma,
  TipoDesplazamiento as TipoDesplazamientoPrisma,
  TipoDescanso as TipoDescansoPrisma,
  TipoPermisoLicenciaVacacion as TipoPermisoLicenciaVacacionPrisma,
  GradoInstruccion as GradoInstruccionPrisma,
  NivelEducativo as NivelPrisma,
  TDiscapacidad as TDiscapacidadPrisma,
  TipoCapacitacion as TCapacitacionPrisma,
  TEntCertDic as TEntCertDicdPrisma,
  tipo_doc as tipo_docPrisma,
  tipo_sancion as tipo_sancionPrisma,
} from "@prisma/client";

export const EstadoCivil = z.nativeEnum(EstadoCivilPrisma);

export const GrupoSanguineo = z.nativeEnum(GrupoSanguineoPrisma);

export const Sexo = z.nativeEnum(SexoPrisma);

export const TContrato = z.nativeEnum(TContratoPrisma);

export const TipoDesplazamiento = z.nativeEnum(TipoDesplazamientoPrisma);

export const TipoDescanso = z.nativeEnum(TipoDescansoPrisma);

export const TipoPermisoLicenciaVacacion = z.nativeEnum(TipoPermisoLicenciaVacacionPrisma);

export const CLaboral = z.nativeEnum(CLaboralPrisma);

export const RLaboral = z.nativeEnum(RLaboralPrisma);

export const GradoInstruccion = z.nativeEnum(GradoInstruccionPrisma);

export const NivelEducativo = z.nativeEnum(NivelPrisma);

export const TDiscapacidad = z.nativeEnum(TDiscapacidadPrisma);

export const TCapacitacion = z.nativeEnum(TCapacitacionPrisma);

export const TEntCertDic = z.nativeEnum(TEntCertDicdPrisma);

export const tipo_doc = z.nativeEnum(tipo_docPrisma);
export const tipo_sancion = z.nativeEnum(tipo_sancionPrisma);
