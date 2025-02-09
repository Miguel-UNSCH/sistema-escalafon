/*
  Warnings:

  - A unique constraint covering the columns `[inei]` on the table `Ubigeo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reniec]` on the table `Ubigeo` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `sexo` on the `Personal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `grupoSanguineo` on the `Personal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `estadoCivil` on the `Personal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EstadoCivil" AS ENUM ('SOLTERO', 'CASADO', 'SEPARADO', 'DIVORCIADO', 'VIUDO', 'CONVIVIENTE');

-- CreateEnum
CREATE TYPE "GrupoSanguineo" AS ENUM ('A_POSITIVO', 'A_NEGATIVO', 'B_POSITIVO', 'B_NEGATIVO', 'AB_POSITIVO', 'AB_NEGATIVO', 'O_POSITIVO', 'O_NEGATIVO');

-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('MASCULINO', 'FEMENINO');

-- CreateEnum
CREATE TYPE "TipoContrato" AS ENUM ('DECRETO_LEGISLATIVO_276', 'CAS', 'PROYECTO_INVERSION', 'PRACTICANTE');

-- CreateEnum
CREATE TYPE "TipoDesplazamiento" AS ENUM ('ROTACION_INTERNA', 'ROTACION_VOLUNTARIA', 'REASIGNACION', 'DESIGNACION', 'DESTACADO', 'PERMUTA', 'ENCARGAR');

-- CreateEnum
CREATE TYPE "TipoDescanso" AS ENUM ('MEDICO', 'PARTICULAR', 'PRE_POSTNATAL');

-- CreateEnum
CREATE TYPE "TipoPermisoLicenciaVacacion" AS ENUM ('PARTICULAR', 'VACACIONES', 'PERMISO_FAMILIAR');

-- AlterTable
ALTER TABLE "Personal" DROP COLUMN "sexo",
ADD COLUMN     "sexo" "Sexo" NOT NULL,
DROP COLUMN "grupoSanguineo",
ADD COLUMN     "grupoSanguineo" "GrupoSanguineo" NOT NULL,
DROP COLUMN "estadoCivil",
ADD COLUMN     "estadoCivil" "EstadoCivil" NOT NULL;

-- CreateTable
CREATE TABLE "Contrato" (
    "id" SERIAL NOT NULL,
    "tipoContrato" "TipoContrato" NOT NULL,
    "condicionLaboral" TEXT NOT NULL,
    "resolucionNombramiento" TEXT,
    "regimenLaboral" TEXT NOT NULL,
    "nivelRemuneracion" TEXT,
    "pap" TEXT,
    "cnp" TEXT,
    "fechaIngreso" TIMESTAMP(3) NOT NULL,
    "fechaCese" TIMESTAMP(3),
    "aniosServicio" INTEGER,
    "personalId" INTEGER NOT NULL,
    "dependenciaOficinaId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,

    CONSTRAINT "Contrato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RenunciaLiquidacion" (
    "id" SERIAL NOT NULL,
    "documentoRenuncia" TEXT NOT NULL,
    "motivoRenuncia" TEXT NOT NULL,
    "fechaRenuncia" TIMESTAMP(3) NOT NULL,
    "personalId" INTEGER NOT NULL,
    "dependenciaOficinaId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,

    CONSTRAINT "RenunciaLiquidacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Desplazamiento" (
    "id" SERIAL NOT NULL,
    "tipoDesplazamiento" "TipoDesplazamiento" NOT NULL,
    "documentoRotacion" TEXT NOT NULL,
    "fechaDesplazamiento" TIMESTAMP(3) NOT NULL,
    "dependenciaOficinaDeId" INTEGER NOT NULL,
    "dependenciaOficinaAId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "personalId" INTEGER NOT NULL,

    CONSTRAINT "Desplazamiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DescansoMedico" (
    "id" SERIAL NOT NULL,
    "tipoDescanso" "TipoDescanso" NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "fechaInicioDescanso" TIMESTAMP(3) NOT NULL,
    "fechaFinDescanso" TIMESTAMP(3) NOT NULL,
    "dependenciaOficinaId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "personalId" INTEGER NOT NULL,

    CONSTRAINT "DescansoMedico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermisoLicenciaVacacion" (
    "id" SERIAL NOT NULL,
    "tipoPermisoLicenciaVacacion" "TipoPermisoLicenciaVacacion" NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "fechaInicioPermiso" TIMESTAMP(3) NOT NULL,
    "fechaFinPermiso" TIMESTAMP(3) NOT NULL,
    "dependenciaOficinaId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "personalId" INTEGER NOT NULL,

    CONSTRAINT "PermisoLicenciaVacacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ascenso" (
    "id" SERIAL NOT NULL,
    "apellidosYNombres" TEXT NOT NULL,
    "resolucionAscenso" TEXT NOT NULL,
    "cargoDel" TEXT NOT NULL,
    "cargoAl" TEXT NOT NULL,
    "nivelRemunerativoDel" TEXT NOT NULL,
    "nivelRemunerativoAl" TEXT NOT NULL,
    "papDel" TEXT NOT NULL,
    "papAl" TEXT NOT NULL,
    "cnp" TEXT NOT NULL,
    "dependenciaId" INTEGER NOT NULL,
    "oficinaId" INTEGER NOT NULL,
    "personalId" INTEGER NOT NULL,
    "cargoDelId" INTEGER NOT NULL,
    "cargoAlId" INTEGER NOT NULL,
    "dependenciaOficinaId" INTEGER NOT NULL,

    CONSTRAINT "Ascenso_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ubigeo_inei_key" ON "Ubigeo"("inei");

-- CreateIndex
CREATE UNIQUE INDEX "Ubigeo_reniec_key" ON "Ubigeo"("reniec");

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_dependenciaOficinaId_fkey" FOREIGN KEY ("dependenciaOficinaId") REFERENCES "DependenciaOficina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RenunciaLiquidacion" ADD CONSTRAINT "RenunciaLiquidacion_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RenunciaLiquidacion" ADD CONSTRAINT "RenunciaLiquidacion_dependenciaOficinaId_fkey" FOREIGN KEY ("dependenciaOficinaId") REFERENCES "DependenciaOficina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RenunciaLiquidacion" ADD CONSTRAINT "RenunciaLiquidacion_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Desplazamiento" ADD CONSTRAINT "Desplazamiento_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Desplazamiento" ADD CONSTRAINT "Desplazamiento_dependenciaOficinaDeId_fkey" FOREIGN KEY ("dependenciaOficinaDeId") REFERENCES "DependenciaOficina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Desplazamiento" ADD CONSTRAINT "Desplazamiento_dependenciaOficinaAId_fkey" FOREIGN KEY ("dependenciaOficinaAId") REFERENCES "DependenciaOficina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Desplazamiento" ADD CONSTRAINT "Desplazamiento_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DescansoMedico" ADD CONSTRAINT "DescansoMedico_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DescansoMedico" ADD CONSTRAINT "DescansoMedico_dependenciaOficinaId_fkey" FOREIGN KEY ("dependenciaOficinaId") REFERENCES "DependenciaOficina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DescansoMedico" ADD CONSTRAINT "DescansoMedico_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermisoLicenciaVacacion" ADD CONSTRAINT "PermisoLicenciaVacacion_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermisoLicenciaVacacion" ADD CONSTRAINT "PermisoLicenciaVacacion_dependenciaOficinaId_fkey" FOREIGN KEY ("dependenciaOficinaId") REFERENCES "DependenciaOficina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermisoLicenciaVacacion" ADD CONSTRAINT "PermisoLicenciaVacacion_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ascenso" ADD CONSTRAINT "Ascenso_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ascenso" ADD CONSTRAINT "Ascenso_cargoDelId_fkey" FOREIGN KEY ("cargoDelId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ascenso" ADD CONSTRAINT "Ascenso_cargoAlId_fkey" FOREIGN KEY ("cargoAlId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ascenso" ADD CONSTRAINT "Ascenso_dependenciaOficinaId_fkey" FOREIGN KEY ("dependenciaOficinaId") REFERENCES "DependenciaOficina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
