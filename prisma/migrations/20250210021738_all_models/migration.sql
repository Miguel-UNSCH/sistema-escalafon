/*
  Warnings:

  - Added the required column `updatedAt` to the `Ascenso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Capacitacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Cargo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Contrato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Conyuge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `DependenciaOficina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `DescansoMedico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Desplazamiento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Discapacidad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Estudios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ExperienciaLaboral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Hijo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PermisoLicenciaVacacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Personal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `RenunciaLiquidacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Ubigeo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ascenso" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Capacitacion" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Cargo" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Contrato" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Conyuge" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "DependenciaOficina" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "DescansoMedico" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Desplazamiento" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Discapacidad" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Estudios" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ExperienciaLaboral" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Hijo" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PermisoLicenciaVacacion" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Personal" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "RenunciaLiquidacion" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Ubigeo" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "BonificacionPersonal" (
    "id" SERIAL NOT NULL,
    "apellidosYNombres" TEXT NOT NULL,
    "tipoBonificacion" TEXT NOT NULL,
    "resolucionBonificacion" TEXT NOT NULL,
    "dependenciaOficinaId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "personalId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BonificacionPersonal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BonificacionFamiliar" (
    "id" SERIAL NOT NULL,
    "apellidosYNombres" TEXT NOT NULL,
    "tipoBonificacion" TEXT NOT NULL,
    "resolucionBonificacion" TEXT NOT NULL,
    "dependenciaOficinaId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "personalId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BonificacionFamiliar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FichaEvaluacion" (
    "id" SERIAL NOT NULL,
    "apellidosYnombres" TEXT NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "fechaEvaluacion" TIMESTAMP(3) NOT NULL,
    "personalId" INTEGER NOT NULL,
    "dependenciaId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FichaEvaluacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Merito" (
    "id" SERIAL NOT NULL,
    "personalId" INTEGER NOT NULL,
    "dependenciaOficinaId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Merito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Demerito" (
    "id" SERIAL NOT NULL,
    "personalId" INTEGER NOT NULL,
    "dependenciaOficinaId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "tipoSancion" TEXT NOT NULL,
    "fechaSancion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Demerito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActaEntrega" (
    "id" SERIAL NOT NULL,
    "actaEentregadoPorId" INTEGER NOT NULL,
    "actaRecibidoPorId" INTEGER NOT NULL,
    "dependenciaOficinaId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActaEntrega_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConstanciaPago" (
    "id" SERIAL NOT NULL,
    "personalId" INTEGER NOT NULL,
    "dependenciaOficinaId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "nivelRemunerativo" TEXT NOT NULL,
    "pap" TEXT NOT NULL,
    "cnp" TEXT NOT NULL,
    "diasLaborados" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConstanciaPago_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BonificacionPersonal" ADD CONSTRAINT "BonificacionPersonal_dependenciaOficinaId_fkey" FOREIGN KEY ("dependenciaOficinaId") REFERENCES "DependenciaOficina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonificacionPersonal" ADD CONSTRAINT "BonificacionPersonal_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonificacionPersonal" ADD CONSTRAINT "BonificacionPersonal_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonificacionFamiliar" ADD CONSTRAINT "BonificacionFamiliar_dependenciaOficinaId_fkey" FOREIGN KEY ("dependenciaOficinaId") REFERENCES "DependenciaOficina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonificacionFamiliar" ADD CONSTRAINT "BonificacionFamiliar_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonificacionFamiliar" ADD CONSTRAINT "BonificacionFamiliar_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FichaEvaluacion" ADD CONSTRAINT "FichaEvaluacion_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FichaEvaluacion" ADD CONSTRAINT "FichaEvaluacion_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "DependenciaOficina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FichaEvaluacion" ADD CONSTRAINT "FichaEvaluacion_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Merito" ADD CONSTRAINT "Merito_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Merito" ADD CONSTRAINT "Merito_dependenciaOficinaId_fkey" FOREIGN KEY ("dependenciaOficinaId") REFERENCES "DependenciaOficina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Merito" ADD CONSTRAINT "Merito_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demerito" ADD CONSTRAINT "Demerito_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demerito" ADD CONSTRAINT "Demerito_dependenciaOficinaId_fkey" FOREIGN KEY ("dependenciaOficinaId") REFERENCES "DependenciaOficina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demerito" ADD CONSTRAINT "Demerito_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActaEntrega" ADD CONSTRAINT "ActaEntrega_dependenciaOficinaId_fkey" FOREIGN KEY ("dependenciaOficinaId") REFERENCES "DependenciaOficina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActaEntrega" ADD CONSTRAINT "ActaEntrega_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActaEntrega" ADD CONSTRAINT "ActaEntrega_actaEentregadoPorId_fkey" FOREIGN KEY ("actaEentregadoPorId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActaEntrega" ADD CONSTRAINT "ActaEntrega_actaRecibidoPorId_fkey" FOREIGN KEY ("actaRecibidoPorId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConstanciaPago" ADD CONSTRAINT "ConstanciaPago_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConstanciaPago" ADD CONSTRAINT "ConstanciaPago_dependenciaOficinaId_fkey" FOREIGN KEY ("dependenciaOficinaId") REFERENCES "DependenciaOficina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConstanciaPago" ADD CONSTRAINT "ConstanciaPago_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
