/*
  Warnings:

  - The values [sensorial,motriz,intelectual,psicosocial,multiple] on the enum `TDiscapacidad` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TDiscapacidad_new" AS ENUM ('sen', 'mot', 'int', 'psi', 'mul');
ALTER TABLE "discapacidades" ALTER COLUMN "tipo" TYPE "TDiscapacidad_new" USING ("tipo"::text::"TDiscapacidad_new");
ALTER TYPE "TDiscapacidad" RENAME TO "TDiscapacidad_old";
ALTER TYPE "TDiscapacidad_new" RENAME TO "TDiscapacidad";
DROP TYPE "TDiscapacidad_old";
COMMIT;
