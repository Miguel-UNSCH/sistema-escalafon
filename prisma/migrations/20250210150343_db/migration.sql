/*
  Warnings:

  - The values [SOLTERO,CASADO,SEPARADO,DIVORCIADO,VIUDO,CONVIVIENTE] on the enum `EstadoCivil` will be removed. If these variants are still used in the database, this will fail.
  - The values [MASCULINO,FEMENINO] on the enum `Sexo` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `apellidosYNombres` on the `Ascenso` table. All the data in the column will be lost.
  - You are about to drop the column `apellidosYNombres` on the `BonificacionFamiliar` table. All the data in the column will be lost.
  - You are about to drop the column `apellidosYNombres` on the `BonificacionPersonal` table. All the data in the column will be lost.
  - You are about to drop the column `nombres` on the `Conyuge` table. All the data in the column will be lost.
  - You are about to drop the column `ubigeoId` on the `Conyuge` table. All the data in the column will be lost.
  - You are about to drop the column `apellidosYnombres` on the `FichaEvaluacion` table. All the data in the column will be lost.
  - You are about to drop the column `nombres` on the `Hijo` table. All the data in the column will be lost.
  - You are about to drop the column `ubigeoId` on the `Hijo` table. All the data in the column will be lost.
  - You are about to drop the column `apellidoMaterno` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `apellidoPaterno` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `nombres` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `ubigeoId` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the `ConstanciaPago` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_HijoToPersonal` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Conyuge` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Hijo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Personal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Conyuge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Hijo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Personal` table without a default value. This is not possible if the table is not empty.
  - Made the column `dependenciaOficinaId` on table `Personal` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ENABLED', 'DISABLED');

-- AlterEnum
BEGIN;
CREATE TYPE "EstadoCivil_new" AS ENUM ('S', 'C', 'D', 'V');
ALTER TABLE "Personal" ALTER COLUMN "estadoCivil" TYPE "EstadoCivil_new" USING ("estadoCivil"::text::"EstadoCivil_new");
ALTER TYPE "EstadoCivil" RENAME TO "EstadoCivil_old";
ALTER TYPE "EstadoCivil_new" RENAME TO "EstadoCivil";
DROP TYPE "EstadoCivil_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Sexo_new" AS ENUM ('M', 'F');
ALTER TABLE "Personal" ALTER COLUMN "sexo" TYPE "Sexo_new" USING ("sexo"::text::"Sexo_new");
ALTER TYPE "Sexo" RENAME TO "Sexo_old";
ALTER TYPE "Sexo_new" RENAME TO "Sexo";
DROP TYPE "Sexo_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "ConstanciaPago" DROP CONSTRAINT "ConstanciaPago_cargoId_fkey";

-- DropForeignKey
ALTER TABLE "ConstanciaPago" DROP CONSTRAINT "ConstanciaPago_dependenciaOficinaId_fkey";

-- DropForeignKey
ALTER TABLE "ConstanciaPago" DROP CONSTRAINT "ConstanciaPago_personalId_fkey";

-- DropForeignKey
ALTER TABLE "Conyuge" DROP CONSTRAINT "Conyuge_ubigeoId_fkey";

-- DropForeignKey
ALTER TABLE "Hijo" DROP CONSTRAINT "Hijo_ubigeoId_fkey";

-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_conyugeId_fkey";

-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_dependenciaOficinaId_fkey";

-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_ubigeoId_fkey";

-- DropForeignKey
ALTER TABLE "_HijoToPersonal" DROP CONSTRAINT "_HijoToPersonal_A_fkey";

-- DropForeignKey
ALTER TABLE "_HijoToPersonal" DROP CONSTRAINT "_HijoToPersonal_B_fkey";

-- AlterTable
ALTER TABLE "ActaEntrega" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ENABLED';

-- AlterTable
ALTER TABLE "Ascenso" DROP COLUMN "apellidosYNombres",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ENABLED';

-- AlterTable
ALTER TABLE "BonificacionFamiliar" DROP COLUMN "apellidosYNombres",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ENABLED';

-- AlterTable
ALTER TABLE "BonificacionPersonal" DROP COLUMN "apellidosYNombres",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ENABLED';

-- AlterTable
ALTER TABLE "Capacitacion" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ENABLED';

-- AlterTable
ALTER TABLE "Cargo" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ENABLED';

-- AlterTable
ALTER TABLE "Contrato" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ENABLED';

-- AlterTable
ALTER TABLE "Conyuge" DROP COLUMN "nombres",
DROP COLUMN "ubigeoId",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ENABLED',
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Demerito" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ENABLED';

-- AlterTable
ALTER TABLE "DependenciaOficina" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ENABLED';

-- AlterTable
ALTER TABLE "DescansoMedico" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ENABLED';

-- AlterTable
ALTER TABLE "Desplazamiento" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ENABLED';

-- AlterTable
ALTER TABLE "Discapacidad" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ENABLED';

-- AlterTable
ALTER TABLE "Estudios" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ENABLED';

-- AlterTable
ALTER TABLE "ExperienciaLaboral" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ENABLED';

-- AlterTable
ALTER TABLE "FichaEvaluacion" DROP COLUMN "apellidosYnombres",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ENABLED';

-- AlterTable
ALTER TABLE "Hijo" DROP COLUMN "nombres",
DROP COLUMN "ubigeoId",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ENABLED',
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Merito" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ENABLED';

-- AlterTable
ALTER TABLE "PermisoLicenciaVacacion" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ENABLED';

-- AlterTable
ALTER TABLE "Personal" DROP COLUMN "apellidoMaterno",
DROP COLUMN "apellidoPaterno",
DROP COLUMN "email",
DROP COLUMN "nombres",
DROP COLUMN "ubigeoId",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ENABLED',
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "dependenciaOficinaId" SET NOT NULL;

-- AlterTable
ALTER TABLE "RenunciaLiquidacion" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ENABLED';

-- AlterTable
ALTER TABLE "Ubigeo" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ENABLED';

-- DropTable
DROP TABLE "ConstanciaPago";

-- DropTable
DROP TABLE "_HijoToPersonal";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "email" TEXT,
    "contrasenia" TEXT,
    "ubigeoId" INTEGER,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PersonalHijos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PersonalHijos_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "_PersonalHijos_B_index" ON "_PersonalHijos"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Conyuge_userId_key" ON "Conyuge"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Hijo_userId_key" ON "Hijo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Personal_userId_key" ON "Personal"("userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_ubigeoId_fkey" FOREIGN KEY ("ubigeoId") REFERENCES "Ubigeo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_dependenciaOficinaId_fkey" FOREIGN KEY ("dependenciaOficinaId") REFERENCES "DependenciaOficina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conyuge" ADD CONSTRAINT "Conyuge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conyuge" ADD CONSTRAINT "Conyuge_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hijo" ADD CONSTRAINT "Hijo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PersonalHijos" ADD CONSTRAINT "_PersonalHijos_A_fkey" FOREIGN KEY ("A") REFERENCES "Hijo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PersonalHijos" ADD CONSTRAINT "_PersonalHijos_B_fkey" FOREIGN KEY ("B") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
