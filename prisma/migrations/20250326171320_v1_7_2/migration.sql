/*
  Warnings:

  - The values [pn] on the enum `TipoDescanso` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TipoDescanso_new" AS ENUM ('m', 'p', 'it');
ALTER TABLE "descansos_medicos" ALTER COLUMN "tipo_descanso" TYPE "TipoDescanso_new" USING ("tipo_descanso"::text::"TipoDescanso_new");
ALTER TYPE "TipoDescanso" RENAME TO "TipoDescanso_old";
ALTER TYPE "TipoDescanso_new" RENAME TO "TipoDescanso";
DROP TYPE "TipoDescanso_old";
COMMIT;
