import { z } from "zod";

import {
  EstadoCivil as EstadoCivilPrisma,
  GrupoSanguineo as GrupoSanguineoPrisma,
  Sexo as SexoPrisma,
  TipoContrato as TipoContratoPrisma,
  TContrato as TContratoPrisma,
  CLaboral as CLaboralPrisma,
  RLaboral as RLaboralPrisma,
  TipoDesplazamiento as TipoDesplazamientoPrisma,
  TipoDescanso as TipoDescansoPrisma,
  TipoPermisoLicenciaVacacion as TipoPermisoLicenciaVacacionPrisma,
  SituacionLaboral as SituacionLaboralPrisma,
  RegimenPensionario as RegimenPensionarioPrisma,
  GradoInstruccion as GradoInstruccionPrisma,
  NivelEducativo as NivelPrisma,
  TDiscapacidad as TDiscapacidadPrisma,
  TEntCertDic as TEntCertDicdPrisma,
} from "@prisma/client";

export const EstadoCivil = z.nativeEnum(EstadoCivilPrisma);

export const GrupoSanguineo = z.nativeEnum(GrupoSanguineoPrisma);

export const Sexo = z.nativeEnum(SexoPrisma);

export const TipoContrato = z.nativeEnum(TipoContratoPrisma);

export const TContrato = z.nativeEnum(TContratoPrisma);

export const TipoDesplazamiento = z.nativeEnum(TipoDesplazamientoPrisma);

export const TipoDescanso = z.nativeEnum(TipoDescansoPrisma);

export const TipoPermisoLicenciaVacacion = z.nativeEnum(TipoPermisoLicenciaVacacionPrisma);

export const SituacionLaboral = z.nativeEnum(SituacionLaboralPrisma);

export const CLaboral = z.nativeEnum(CLaboralPrisma);

export const RegimenPensionario = z.nativeEnum(RegimenPensionarioPrisma);

export const RLaboral = z.nativeEnum(RLaboralPrisma);

export const GradoInstruccion = z.nativeEnum(GradoInstruccionPrisma);

export const NivelEducativo = z.nativeEnum(NivelPrisma);

export const TDiscapacidad = z.nativeEnum(TDiscapacidadPrisma);

export const TEntCertDic = z.nativeEnum(TEntCertDicdPrisma);
