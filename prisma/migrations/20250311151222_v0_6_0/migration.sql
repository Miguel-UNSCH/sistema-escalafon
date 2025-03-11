/*
  Warnings:

  - Changed the type of `condicion_laboral` on the `contratos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CLaboral" AS ENUM ('nombrado', 'contratado', 'plaza_vacante', 'designado', 'indeterminado', 'eventual', 'reincorporado', 'mandato_judicial', 'profesional', 'preprofesional');

-- AlterTable
ALTER TABLE "contratos" DROP COLUMN "condicion_laboral",
ADD COLUMN     "condicion_laboral" "CLaboral" NOT NULL;

-- DropEnum
DROP TYPE "SLaboral";
