/*
  Warnings:

  - The values [p,pf] on the enum `TipoPermisoLicenciaVacacion` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TipoPermisoLicenciaVacacion_new" AS ENUM ('mot_per', 'per_enf', 'per_hon', 'per_cap', 'per_lac', 'lic_sgh', 'lic_cgh', 'lic_vac', 'v');
ALTER TABLE "permisos_licencias_vacaciones" ALTER COLUMN "tipo" TYPE "TipoPermisoLicenciaVacacion_new" USING ("tipo"::text::"TipoPermisoLicenciaVacacion_new");
ALTER TYPE "TipoPermisoLicenciaVacacion" RENAME TO "TipoPermisoLicenciaVacacion_old";
ALTER TYPE "TipoPermisoLicenciaVacacion_new" RENAME TO "TipoPermisoLicenciaVacacion";
DROP TYPE "TipoPermisoLicenciaVacacion_old";
COMMIT;
