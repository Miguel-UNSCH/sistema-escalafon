/*
  Warnings:

  - Changed the type of `gradoInstruccion` on the `Conyuge` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gradoInstruccion` on the `Hijo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `regimenPensionario` on the `Personal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `situacionLaboral` on the `Personal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SituacionLaboral" AS ENUM ('ND276', 'CPV', 'CL30057', 'CASI', 'CAST', 'CPI', 'PPP1404', 'PP1004');

-- CreateEnum
CREATE TYPE "RegimenPensionario" AS ENUM ('L29903', 'DL19990');

-- CreateEnum
CREATE TYPE "GradoInstruccion" AS ENUM ('SIN', 'PC', 'PI', 'SC', 'SI', 'TEC', 'UNI', 'POS', 'NULL');

-- CreateEnum
CREATE TYPE "FormacionAcademica" AS ENUM ('PC', 'PI', 'SC', 'SI', 'BAC', 'TIT', 'POS', 'TEC');

-- AlterTable
ALTER TABLE "Conyuge" DROP COLUMN "gradoInstruccion",
ADD COLUMN     "gradoInstruccion" "GradoInstruccion" NOT NULL;

-- AlterTable
ALTER TABLE "Hijo" DROP COLUMN "gradoInstruccion",
ADD COLUMN     "gradoInstruccion" "GradoInstruccion" NOT NULL;

-- AlterTable
ALTER TABLE "Personal" DROP COLUMN "regimenPensionario",
ADD COLUMN     "regimenPensionario" "RegimenPensionario" NOT NULL,
DROP COLUMN "situacionLaboral",
ADD COLUMN     "situacionLaboral" "SituacionLaboral" NOT NULL;
