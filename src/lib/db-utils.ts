import { prisma } from "@/config/prisma.config";

// lib/db-utils.ts
export const isUCDInUse = async (usuarioCargoDependenciaId: number): Promise<boolean> => {
  const [ascensoCount, desplazamientoCount] = await Promise.all([
    // const [expCount, contratoCount, ascensoCount, desplazamientoCount] = await Promise.all([
    // prisma.experience.count({ where: { usuarioCargoDependenciaId } }),
    // prisma.contrato.count({ where: { usuarioCargoDependenciaId } }),
    prisma.ascenso.count({ where: { currentUCDId: usuarioCargoDependenciaId } }),
    prisma.desplazamiento.count({ where: { currentUCDId: usuarioCargoDependenciaId } }),
  ]);

  // return expCount > 0 || contratoCount > 0 || ascensoCount > 0 || desplazamientoCount > 0;
  return ascensoCount > 0 || desplazamientoCount > 0;
};
