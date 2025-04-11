/*
  Warnings:

  - The values [nombrado,contratado,plaza_vacante,designado,indeterminado,eventual,reincorporado,mandato_judicial,profesional,preprofesional] on the enum `CLaboral` will be removed. If these variants are still used in the database, this will fail.
  - The values [fag_cas,fun_276,cas,regimen_especial] on the enum `RLaboral` will be removed. If these variants are still used in the database, this will fail.
  - The values [dl_276_proyecto,practicante] on the enum `TContrato` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CLaboral_new" AS ENUM ('dl_con', 'dl_nom', 'dl_cps', 'dl_rpmj', 'dl_cpsj', 'cas_ind', 'cas_tem', 'cas_sup', 'cas_tra', 'pi_con', 'pi_prmj', 'pra_pre', 'pra_pro');
ALTER TABLE "contratos" ALTER COLUMN "condicion_laboral" TYPE "CLaboral_new" USING ("condicion_laboral"::text::"CLaboral_new");
ALTER TYPE "CLaboral" RENAME TO "CLaboral_old";
ALTER TYPE "CLaboral_new" RENAME TO "CLaboral";
DROP TYPE "CLaboral_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "RLaboral_new" AS ENUM ('dl_276', 'cas_1057', 'pi_276', 'pi_728');
ALTER TABLE "contratos" ALTER COLUMN "regimen_laboral" TYPE "RLaboral_new" USING ("regimen_laboral"::text::"RLaboral_new");
ALTER TYPE "RLaboral" RENAME TO "RLaboral_old";
ALTER TYPE "RLaboral_new" RENAME TO "RLaboral";
DROP TYPE "RLaboral_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TContrato_new" AS ENUM ('dl_276', 'cas', 'pro_inv', 'pra');
ALTER TABLE "contratos" ALTER COLUMN "tipo_contrato" TYPE "TContrato_new" USING ("tipo_contrato"::text::"TContrato_new");
ALTER TYPE "TContrato" RENAME TO "TContrato_old";
ALTER TYPE "TContrato_new" RENAME TO "TContrato";
DROP TYPE "TContrato_old";
COMMIT;

-- AlterTable
ALTER TABLE "contratos" ADD COLUMN     "obra" CITEXT;
