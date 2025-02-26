/*
  Warnings:

  - The primary key for the `Personal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `periodo` on the `Estudios` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "ActaEntrega" DROP CONSTRAINT "ActaEntrega_actaEntregadoPorId_fkey";

-- DropForeignKey
ALTER TABLE "ActaEntregaDestinatario" DROP CONSTRAINT "ActaEntregaDestinatario_destinatarioId_fkey";

-- DropForeignKey
ALTER TABLE "Ascenso" DROP CONSTRAINT "Ascenso_personalId_fkey";

-- DropForeignKey
ALTER TABLE "BonificacionFamiliar" DROP CONSTRAINT "BonificacionFamiliar_personalId_fkey";

-- DropForeignKey
ALTER TABLE "BonificacionPersonal" DROP CONSTRAINT "BonificacionPersonal_personalId_fkey";

-- DropForeignKey
ALTER TABLE "Capacitacion" DROP CONSTRAINT "Capacitacion_personalId_fkey";

-- DropForeignKey
ALTER TABLE "Contrato" DROP CONSTRAINT "Contrato_personalId_fkey";

-- DropForeignKey
ALTER TABLE "Conyuge" DROP CONSTRAINT "Conyuge_personalId_fkey";

-- DropForeignKey
ALTER TABLE "Demerito" DROP CONSTRAINT "Demerito_personalId_fkey";

-- DropForeignKey
ALTER TABLE "DescansoMedico" DROP CONSTRAINT "DescansoMedico_personalId_fkey";

-- DropForeignKey
ALTER TABLE "Desplazamiento" DROP CONSTRAINT "Desplazamiento_personalId_fkey";

-- DropForeignKey
ALTER TABLE "Discapacidad" DROP CONSTRAINT "Discapacidad_personalId_fkey";

-- DropForeignKey
ALTER TABLE "Estudios" DROP CONSTRAINT "Estudios_personalId_fkey";

-- DropForeignKey
ALTER TABLE "ExperienciaLaboral" DROP CONSTRAINT "ExperienciaLaboral_personalId_fkey";

-- DropForeignKey
ALTER TABLE "FichaEvaluacion" DROP CONSTRAINT "FichaEvaluacion_personalId_fkey";

-- DropForeignKey
ALTER TABLE "Hijo" DROP CONSTRAINT "Hijo_personalId_fkey";

-- DropForeignKey
ALTER TABLE "Merito" DROP CONSTRAINT "Merito_personalId_fkey";

-- DropForeignKey
ALTER TABLE "PermisoLicenciaVacacion" DROP CONSTRAINT "PermisoLicenciaVacacion_personalId_fkey";

-- DropForeignKey
ALTER TABLE "Renuncia" DROP CONSTRAINT "Renuncia_personalId_fkey";

-- AlterTable
ALTER TABLE "ActaEntrega" ALTER COLUMN "actaEntregadoPorId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ActaEntregaDestinatario" ALTER COLUMN "destinatarioId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Ascenso" ALTER COLUMN "personalId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "BonificacionFamiliar" ALTER COLUMN "personalId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "BonificacionPersonal" ALTER COLUMN "personalId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Capacitacion" ALTER COLUMN "personalId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Contrato" ALTER COLUMN "personalId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Conyuge" ALTER COLUMN "personalId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Demerito" ALTER COLUMN "personalId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "DescansoMedico" ALTER COLUMN "personalId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Desplazamiento" ALTER COLUMN "personalId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Discapacidad" ALTER COLUMN "personalId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Estudios" ALTER COLUMN "personalId" SET DATA TYPE TEXT,
DROP COLUMN "periodo",
ADD COLUMN     "periodo" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "ExperienciaLaboral" ALTER COLUMN "personalId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "FichaEvaluacion" ALTER COLUMN "personalId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Hijo" ALTER COLUMN "personalId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Merito" ALTER COLUMN "personalId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "PermisoLicenciaVacacion" ALTER COLUMN "personalId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Personal_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Personal_id_seq";

-- AlterTable
ALTER TABLE "Renuncia" ALTER COLUMN "personalId" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Archivo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Archivo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Conyuge" ADD CONSTRAINT "Conyuge_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hijo" ADD CONSTRAINT "Hijo_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discapacidad" ADD CONSTRAINT "Discapacidad_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estudios" ADD CONSTRAINT "Estudios_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Capacitacion" ADD CONSTRAINT "Capacitacion_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienciaLaboral" ADD CONSTRAINT "ExperienciaLaboral_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renuncia" ADD CONSTRAINT "Renuncia_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Desplazamiento" ADD CONSTRAINT "Desplazamiento_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DescansoMedico" ADD CONSTRAINT "DescansoMedico_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermisoLicenciaVacacion" ADD CONSTRAINT "PermisoLicenciaVacacion_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ascenso" ADD CONSTRAINT "Ascenso_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonificacionPersonal" ADD CONSTRAINT "BonificacionPersonal_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonificacionFamiliar" ADD CONSTRAINT "BonificacionFamiliar_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FichaEvaluacion" ADD CONSTRAINT "FichaEvaluacion_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Merito" ADD CONSTRAINT "Merito_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demerito" ADD CONSTRAINT "Demerito_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActaEntrega" ADD CONSTRAINT "ActaEntrega_actaEntregadoPorId_fkey" FOREIGN KEY ("actaEntregadoPorId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActaEntregaDestinatario" ADD CONSTRAINT "ActaEntregaDestinatario_destinatarioId_fkey" FOREIGN KEY ("destinatarioId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
