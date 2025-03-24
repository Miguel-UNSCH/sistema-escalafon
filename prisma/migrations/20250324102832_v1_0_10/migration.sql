/*
  Warnings:

  - You are about to drop the column `cargo_id` on the `permisos_licencias_vacaciones` table. All the data in the column will be lost.
  - You are about to drop the column `dependencia_id` on the `permisos_licencias_vacaciones` table. All the data in the column will be lost.
  - Added the required column `usuarioCargoDependenciaId` to the `permisos_licencias_vacaciones` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "permisos_licencias_vacaciones" DROP CONSTRAINT "permisos_licencias_vacaciones_cargo_id_fkey";

-- DropForeignKey
ALTER TABLE "permisos_licencias_vacaciones" DROP CONSTRAINT "permisos_licencias_vacaciones_dependencia_id_fkey";

-- AlterTable
ALTER TABLE "permisos_licencias_vacaciones" DROP COLUMN "cargo_id",
DROP COLUMN "dependencia_id",
ADD COLUMN     "usuarioCargoDependenciaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "permisos_licencias_vacaciones" ADD CONSTRAINT "permisos_licencias_vacaciones_usuarioCargoDependenciaId_fkey" FOREIGN KEY ("usuarioCargoDependenciaId") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;
