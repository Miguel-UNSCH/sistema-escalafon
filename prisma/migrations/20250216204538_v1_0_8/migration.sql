/*
  Warnings:

  - You are about to drop the column `actaEentregadoPorId` on the `ActaEntrega` table. All the data in the column will be lost.
  - You are about to drop the column `actaRecibidoPorId` on the `ActaEntrega` table. All the data in the column will be lost.
  - You are about to drop the column `cargoAlId` on the `Ascenso` table. All the data in the column will be lost.
  - You are about to drop the column `cargoDelId` on the `Ascenso` table. All the data in the column will be lost.
  - You are about to drop the column `dependenciaOficinaId` on the `Ascenso` table. All the data in the column will be lost.
  - You are about to drop the column `nivelRemunerativoAl` on the `Ascenso` table. All the data in the column will be lost.
  - You are about to drop the column `nivelRemunerativoDel` on the `Ascenso` table. All the data in the column will be lost.
  - You are about to drop the column `papAl` on the `Ascenso` table. All the data in the column will be lost.
  - You are about to drop the column `papDel` on the `Ascenso` table. All the data in the column will be lost.
  - You are about to drop the column `dependenciaOficinaId` on the `BonificacionFamiliar` table. All the data in the column will be lost.
  - You are about to drop the column `dependenciaOficinaId` on the `BonificacionPersonal` table. All the data in the column will be lost.
  - You are about to drop the column `dependenciaOficinaId` on the `Contrato` table. All the data in the column will be lost.
  - You are about to drop the column `dependenciaOficinaId` on the `Demerito` table. All the data in the column will be lost.
  - You are about to drop the column `dependenciaOficinaId` on the `DescansoMedico` table. All the data in the column will be lost.
  - You are about to drop the column `fechaFinDescanso` on the `DescansoMedico` table. All the data in the column will be lost.
  - You are about to drop the column `fechaInicioDescanso` on the `DescansoMedico` table. All the data in the column will be lost.
  - You are about to drop the column `cargoId` on the `Desplazamiento` table. All the data in the column will be lost.
  - You are about to drop the column `dependenciaOficinaAId` on the `Desplazamiento` table. All the data in the column will be lost.
  - You are about to drop the column `dependenciaOficinaDeId` on the `Desplazamiento` table. All the data in the column will be lost.
  - You are about to drop the column `dependenciaOficinaId` on the `ExperienciaLaboral` table. All the data in the column will be lost.
  - You are about to drop the column `dependenciaOficinaId` on the `FichaEvaluacion` table. All the data in the column will be lost.
  - You are about to drop the column `dependenciaOficinaId` on the `Merito` table. All the data in the column will be lost.
  - You are about to drop the column `dependenciaOficinaId` on the `PermisoLicenciaVacacion` table. All the data in the column will be lost.
  - You are about to drop the column `fechaFinPermiso` on the `PermisoLicenciaVacacion` table. All the data in the column will be lost.
  - You are about to drop the column `fechaInicioPermiso` on the `PermisoLicenciaVacacion` table. All the data in the column will be lost.
  - You are about to drop the column `dependenciaOficinaId` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `discapacidadId` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the `DependenciaOficina` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RenunciaLiquidacion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `actaEntregadoPorId` to the `ActaEntrega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dependenciaId` to the `ActaEntrega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nivelRemunerativo` to the `Ascenso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pap` to the `Ascenso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dependenciaId` to the `BonificacionFamiliar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dependenciaId` to the `BonificacionPersonal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dependenciaId` to the `Contrato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dependenciaId` to the `Demerito` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dependenciaId` to the `DescansoMedico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodo` to the `DescansoMedico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dependenciaId` to the `FichaEvaluacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dependenciaId` to the `Merito` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dependenciaId` to the `PermisoLicenciaVacacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodo` to the `PermisoLicenciaVacacion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ActaEntrega" DROP CONSTRAINT "ActaEntrega_actaEentregadoPorId_fkey";

-- DropForeignKey
ALTER TABLE "ActaEntrega" DROP CONSTRAINT "ActaEntrega_actaRecibidoPorId_fkey";

-- DropForeignKey
ALTER TABLE "ActaEntrega" DROP CONSTRAINT "ActaEntrega_dependenciaOficinaId_fkey";

-- DropForeignKey
ALTER TABLE "Ascenso" DROP CONSTRAINT "Ascenso_cargoAlId_fkey";

-- DropForeignKey
ALTER TABLE "Ascenso" DROP CONSTRAINT "Ascenso_cargoDelId_fkey";

-- DropForeignKey
ALTER TABLE "Ascenso" DROP CONSTRAINT "Ascenso_dependenciaOficinaId_fkey";

-- DropForeignKey
ALTER TABLE "Ascenso" DROP CONSTRAINT "Ascenso_personalId_fkey";

-- DropForeignKey
ALTER TABLE "BonificacionFamiliar" DROP CONSTRAINT "BonificacionFamiliar_dependenciaOficinaId_fkey";

-- DropForeignKey
ALTER TABLE "BonificacionFamiliar" DROP CONSTRAINT "BonificacionFamiliar_personalId_fkey";

-- DropForeignKey
ALTER TABLE "BonificacionPersonal" DROP CONSTRAINT "BonificacionPersonal_dependenciaOficinaId_fkey";

-- DropForeignKey
ALTER TABLE "BonificacionPersonal" DROP CONSTRAINT "BonificacionPersonal_personalId_fkey";

-- DropForeignKey
ALTER TABLE "Capacitacion" DROP CONSTRAINT "Capacitacion_personalId_fkey";

-- DropForeignKey
ALTER TABLE "Contrato" DROP CONSTRAINT "Contrato_dependenciaOficinaId_fkey";

-- DropForeignKey
ALTER TABLE "Contrato" DROP CONSTRAINT "Contrato_personalId_fkey";

-- DropForeignKey
ALTER TABLE "Demerito" DROP CONSTRAINT "Demerito_dependenciaOficinaId_fkey";

-- DropForeignKey
ALTER TABLE "Demerito" DROP CONSTRAINT "Demerito_personalId_fkey";

-- DropForeignKey
ALTER TABLE "DescansoMedico" DROP CONSTRAINT "DescansoMedico_dependenciaOficinaId_fkey";

-- DropForeignKey
ALTER TABLE "DescansoMedico" DROP CONSTRAINT "DescansoMedico_personalId_fkey";

-- DropForeignKey
ALTER TABLE "Desplazamiento" DROP CONSTRAINT "Desplazamiento_cargoId_fkey";

-- DropForeignKey
ALTER TABLE "Desplazamiento" DROP CONSTRAINT "Desplazamiento_dependenciaOficinaAId_fkey";

-- DropForeignKey
ALTER TABLE "Desplazamiento" DROP CONSTRAINT "Desplazamiento_dependenciaOficinaDeId_fkey";

-- DropForeignKey
ALTER TABLE "Desplazamiento" DROP CONSTRAINT "Desplazamiento_personalId_fkey";

-- DropForeignKey
ALTER TABLE "Discapacidad" DROP CONSTRAINT "Discapacidad_personalId_fkey";

-- DropForeignKey
ALTER TABLE "Estudios" DROP CONSTRAINT "Estudios_personalId_fkey";

-- DropForeignKey
ALTER TABLE "ExperienciaLaboral" DROP CONSTRAINT "ExperienciaLaboral_dependenciaOficinaId_fkey";

-- DropForeignKey
ALTER TABLE "ExperienciaLaboral" DROP CONSTRAINT "ExperienciaLaboral_personalId_fkey";

-- DropForeignKey
ALTER TABLE "FichaEvaluacion" DROP CONSTRAINT "FichaEvaluacion_dependenciaOficinaId_fkey";

-- DropForeignKey
ALTER TABLE "FichaEvaluacion" DROP CONSTRAINT "FichaEvaluacion_personalId_fkey";

-- DropForeignKey
ALTER TABLE "Merito" DROP CONSTRAINT "Merito_dependenciaOficinaId_fkey";

-- DropForeignKey
ALTER TABLE "Merito" DROP CONSTRAINT "Merito_personalId_fkey";

-- DropForeignKey
ALTER TABLE "PermisoLicenciaVacacion" DROP CONSTRAINT "PermisoLicenciaVacacion_dependenciaOficinaId_fkey";

-- DropForeignKey
ALTER TABLE "PermisoLicenciaVacacion" DROP CONSTRAINT "PermisoLicenciaVacacion_personalId_fkey";

-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_dependenciaOficinaId_fkey";

-- DropForeignKey
ALTER TABLE "RenunciaLiquidacion" DROP CONSTRAINT "RenunciaLiquidacion_cargoId_fkey";

-- DropForeignKey
ALTER TABLE "RenunciaLiquidacion" DROP CONSTRAINT "RenunciaLiquidacion_dependenciaOficinaId_fkey";

-- DropForeignKey
ALTER TABLE "RenunciaLiquidacion" DROP CONSTRAINT "RenunciaLiquidacion_personalId_fkey";

-- DropIndex
DROP INDEX "Discapacidad_personalId_key";

-- AlterTable
ALTER TABLE "ActaEntrega" DROP COLUMN "actaEentregadoPorId",
DROP COLUMN "actaRecibidoPorId",
ADD COLUMN     "actaEntregadoPorId" INTEGER NOT NULL,
ADD COLUMN     "dependenciaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Ascenso" DROP COLUMN "cargoAlId",
DROP COLUMN "cargoDelId",
DROP COLUMN "dependenciaOficinaId",
DROP COLUMN "nivelRemunerativoAl",
DROP COLUMN "nivelRemunerativoDel",
DROP COLUMN "papAl",
DROP COLUMN "papDel",
ADD COLUMN     "nivelRemunerativo" TEXT NOT NULL,
ADD COLUMN     "pap" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BonificacionFamiliar" DROP COLUMN "dependenciaOficinaId",
ADD COLUMN     "dependenciaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "BonificacionPersonal" DROP COLUMN "dependenciaOficinaId",
ADD COLUMN     "dependenciaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Contrato" DROP COLUMN "dependenciaOficinaId",
ADD COLUMN     "dependenciaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Demerito" DROP COLUMN "dependenciaOficinaId",
ADD COLUMN     "dependenciaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "DescansoMedico" DROP COLUMN "dependenciaOficinaId",
DROP COLUMN "fechaFinDescanso",
DROP COLUMN "fechaInicioDescanso",
ADD COLUMN     "dependenciaId" INTEGER NOT NULL,
ADD COLUMN     "periodo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Desplazamiento" DROP COLUMN "cargoId",
DROP COLUMN "dependenciaOficinaAId",
DROP COLUMN "dependenciaOficinaDeId";

-- AlterTable
ALTER TABLE "ExperienciaLaboral" DROP COLUMN "dependenciaOficinaId",
ADD COLUMN     "dependenciaId" INTEGER,
ALTER COLUMN "cargoId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "FichaEvaluacion" DROP COLUMN "dependenciaOficinaId",
ADD COLUMN     "dependenciaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Merito" DROP COLUMN "dependenciaOficinaId",
ADD COLUMN     "dependenciaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PermisoLicenciaVacacion" DROP COLUMN "dependenciaOficinaId",
DROP COLUMN "fechaFinPermiso",
DROP COLUMN "fechaInicioPermiso",
ADD COLUMN     "dependenciaId" INTEGER NOT NULL,
ADD COLUMN     "periodo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Personal" DROP COLUMN "dependenciaOficinaId",
DROP COLUMN "discapacidadId",
ADD COLUMN     "dependenciaId" INTEGER;

-- DropTable
DROP TABLE "DependenciaOficina";

-- DropTable
DROP TABLE "RenunciaLiquidacion";

-- CreateTable
CREATE TABLE "Dependencia" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT,
    "codigo" TEXT,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dependencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Renuncia" (
    "id" SERIAL NOT NULL,
    "documentoRenuncia" TEXT NOT NULL,
    "motivoRenuncia" TEXT NOT NULL,
    "fechaRenuncia" TIMESTAMP(3) NOT NULL,
    "personalId" INTEGER NOT NULL,
    "dependenciaId" INTEGER,
    "cargoId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Renuncia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActaEntregaDestinatario" (
    "id" SERIAL NOT NULL,
    "actaId" INTEGER NOT NULL,
    "destinatarioId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActaEntregaDestinatario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DependenciasDesplazamiento" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DependenciasDesplazamiento_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CargosDesplazamiento" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CargosDesplazamiento_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CargosAscenso" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CargosAscenso_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_DependenciasAscenso" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DependenciasAscenso_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dependencia_nombre_key" ON "Dependencia"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Dependencia_codigo_key" ON "Dependencia"("codigo");

-- CreateIndex
CREATE INDEX "_DependenciasDesplazamiento_B_index" ON "_DependenciasDesplazamiento"("B");

-- CreateIndex
CREATE INDEX "_CargosDesplazamiento_B_index" ON "_CargosDesplazamiento"("B");

-- CreateIndex
CREATE INDEX "_CargosAscenso_B_index" ON "_CargosAscenso"("B");

-- CreateIndex
CREATE INDEX "_DependenciasAscenso_B_index" ON "_DependenciasAscenso"("B");

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discapacidad" ADD CONSTRAINT "Discapacidad_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estudios" ADD CONSTRAINT "Estudios_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Capacitacion" ADD CONSTRAINT "Capacitacion_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienciaLaboral" ADD CONSTRAINT "ExperienciaLaboral_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienciaLaboral" ADD CONSTRAINT "ExperienciaLaboral_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renuncia" ADD CONSTRAINT "Renuncia_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renuncia" ADD CONSTRAINT "Renuncia_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renuncia" ADD CONSTRAINT "Renuncia_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Desplazamiento" ADD CONSTRAINT "Desplazamiento_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DescansoMedico" ADD CONSTRAINT "DescansoMedico_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DescansoMedico" ADD CONSTRAINT "DescansoMedico_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermisoLicenciaVacacion" ADD CONSTRAINT "PermisoLicenciaVacacion_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermisoLicenciaVacacion" ADD CONSTRAINT "PermisoLicenciaVacacion_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ascenso" ADD CONSTRAINT "Ascenso_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonificacionPersonal" ADD CONSTRAINT "BonificacionPersonal_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonificacionPersonal" ADD CONSTRAINT "BonificacionPersonal_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonificacionFamiliar" ADD CONSTRAINT "BonificacionFamiliar_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonificacionFamiliar" ADD CONSTRAINT "BonificacionFamiliar_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FichaEvaluacion" ADD CONSTRAINT "FichaEvaluacion_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FichaEvaluacion" ADD CONSTRAINT "FichaEvaluacion_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Merito" ADD CONSTRAINT "Merito_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Merito" ADD CONSTRAINT "Merito_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demerito" ADD CONSTRAINT "Demerito_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demerito" ADD CONSTRAINT "Demerito_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActaEntrega" ADD CONSTRAINT "ActaEntrega_actaEntregadoPorId_fkey" FOREIGN KEY ("actaEntregadoPorId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActaEntrega" ADD CONSTRAINT "ActaEntrega_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActaEntregaDestinatario" ADD CONSTRAINT "ActaEntregaDestinatario_actaId_fkey" FOREIGN KEY ("actaId") REFERENCES "ActaEntrega"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActaEntregaDestinatario" ADD CONSTRAINT "ActaEntregaDestinatario_destinatarioId_fkey" FOREIGN KEY ("destinatarioId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DependenciasDesplazamiento" ADD CONSTRAINT "_DependenciasDesplazamiento_A_fkey" FOREIGN KEY ("A") REFERENCES "Dependencia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DependenciasDesplazamiento" ADD CONSTRAINT "_DependenciasDesplazamiento_B_fkey" FOREIGN KEY ("B") REFERENCES "Desplazamiento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CargosDesplazamiento" ADD CONSTRAINT "_CargosDesplazamiento_A_fkey" FOREIGN KEY ("A") REFERENCES "Cargo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CargosDesplazamiento" ADD CONSTRAINT "_CargosDesplazamiento_B_fkey" FOREIGN KEY ("B") REFERENCES "Desplazamiento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CargosAscenso" ADD CONSTRAINT "_CargosAscenso_A_fkey" FOREIGN KEY ("A") REFERENCES "Ascenso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CargosAscenso" ADD CONSTRAINT "_CargosAscenso_B_fkey" FOREIGN KEY ("B") REFERENCES "Cargo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DependenciasAscenso" ADD CONSTRAINT "_DependenciasAscenso_A_fkey" FOREIGN KEY ("A") REFERENCES "Ascenso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DependenciasAscenso" ADD CONSTRAINT "_DependenciasAscenso_B_fkey" FOREIGN KEY ("B") REFERENCES "Dependencia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
