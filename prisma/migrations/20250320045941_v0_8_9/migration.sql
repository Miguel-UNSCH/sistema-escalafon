-- CreateEnum
CREATE TYPE "TipoCapacitacion" AS ENUM ('c');

-- AlterTable
ALTER TABLE "capacitaciones" ADD COLUMN     "tipe" "TipoCapacitacion" NOT NULL DEFAULT 'c';
