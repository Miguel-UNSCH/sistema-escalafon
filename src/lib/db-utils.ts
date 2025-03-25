import { prisma } from "@/config/prisma.config";

// lib/db-utils.ts
export const isUCDInUse = async (usuarioCargoDependenciaId: number): Promise<boolean> => {
  const [expCount] = await Promise.resolve([
    // const [expCount, contratoCount, ascensoCount, desplazamientoCount] = await Promise.all([
    prisma.experience.count({ where: { usuarioCargoDependenciaId } }),
    // prisma.contrato.count({ where: { usuarioCargoDependenciaId } }),
    // prisma.ascenso.count({ where: { usuarioCargoDependenciaId } }),
    // prisma.desplazamiento.count({ where: { usuarioCargoDependenciaId } }),
  ]);

  // return expCount > 0 || contratoCount > 0 || ascensoCount > 0 || desplazamientoCount > 0;
  return (await expCount) > 0;
};
