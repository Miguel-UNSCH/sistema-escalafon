/*
  Warnings:

  - You are about to drop the column `pap` on the `Ascenso` table. All the data in the column will be lost.
  - You are about to drop the column `nacionalidad` on the `Personal` table. All the data in the column will be lost.
  - Added the required column `periodo` to the `Ascenso` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `periodo` on the `Capacitacion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `periodo` on the `DescansoMedico` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `periodo` on the `ExperienciaLaboral` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `periodo` on the `PermisoLicenciaVacacion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `aniosServicio` to the `Personal` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Ascenso_pap_key";

-- AlterTable
ALTER TABLE "Ascenso" DROP COLUMN "pap",
ADD COLUMN     "periodo" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Capacitacion" DROP COLUMN "periodo",
ADD COLUMN     "periodo" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "DescansoMedico" DROP COLUMN "periodo",
ADD COLUMN     "periodo" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "ExperienciaLaboral" DROP COLUMN "periodo",
ADD COLUMN     "periodo" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "PermisoLicenciaVacacion" DROP COLUMN "periodo",
ADD COLUMN     "periodo" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Personal" DROP COLUMN "nacionalidad",
ADD COLUMN     "aniosServicio" INTEGER NOT NULL;
