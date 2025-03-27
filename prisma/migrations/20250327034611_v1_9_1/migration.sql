/*
  Warnings:

  - The values [c] on the enum `TipoCapacitacion` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TipoCapacitacion_new" AS ENUM ('dip', 'cur_cap', 'cert', 'cons');
ALTER TABLE "capacitaciones" ALTER COLUMN "tipe" DROP DEFAULT;
ALTER TABLE "capacitaciones" ALTER COLUMN "tipe" TYPE "TipoCapacitacion_new" USING ("tipe"::text::"TipoCapacitacion_new");
ALTER TYPE "TipoCapacitacion" RENAME TO "TipoCapacitacion_old";
ALTER TYPE "TipoCapacitacion_new" RENAME TO "TipoCapacitacion";
DROP TYPE "TipoCapacitacion_old";
COMMIT;

-- AlterTable
ALTER TABLE "capacitaciones" ALTER COLUMN "tipe" DROP DEFAULT;
