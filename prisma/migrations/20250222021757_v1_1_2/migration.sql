/*
  Warnings:

  - The values [OTHER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `status` on the `Cargo` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Conyuge` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Dependencia` table. All the data in the column will be lost.
  - You are about to drop the column `edad` on the `Hijo` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Hijo` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Ubigeo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pap]` on the table `Ascenso` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pap]` on the table `Contrato` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnp]` on the table `Contrato` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[personalId]` on the table `Conyuge` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `pap` on the `Ascenso` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `pap` to the `Contrato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cnp` to the `Contrato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalId` to the `Conyuge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ubigeoId` to the `Conyuge` table without a default value. This is not possible if the table is not empty.
  - Made the column `ocupacion` on table `Conyuge` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `ubigeoId` to the `Hijo` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `fechaNacimiento` on the `Hijo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'PERSONAL');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'PERSONAL';
COMMIT;

-- DropForeignKey
ALTER TABLE "Conyuge" DROP CONSTRAINT "Conyuge_userId_fkey";

-- DropForeignKey
ALTER TABLE "Hijo" DROP CONSTRAINT "Hijo_userId_fkey";

-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_conyugeId_fkey";

-- DropIndex
DROP INDEX "Conyuge_userId_key";

-- DropIndex
DROP INDEX "Hijo_userId_key";

-- AlterTable
ALTER TABLE "Ascenso" DROP COLUMN "pap",
ADD COLUMN     "pap" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Cargo" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Contrato" DROP COLUMN "pap",
ADD COLUMN     "pap" INTEGER NOT NULL,
DROP COLUMN "cnp",
ADD COLUMN     "cnp" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Conyuge" DROP COLUMN "userId",
ADD COLUMN     "personalId" INTEGER NOT NULL,
ADD COLUMN     "ubigeoId" INTEGER NOT NULL,
ALTER COLUMN "ocupacion" SET NOT NULL;

-- AlterTable
ALTER TABLE "Dependencia" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Hijo" DROP COLUMN "edad",
DROP COLUMN "userId",
ADD COLUMN     "ubigeoId" INTEGER NOT NULL,
DROP COLUMN "fechaNacimiento",
ADD COLUMN     "fechaNacimiento" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Ubigeo" DROP COLUMN "status";

-- CreateIndex
CREATE UNIQUE INDEX "Ascenso_pap_key" ON "Ascenso"("pap");

-- CreateIndex
CREATE UNIQUE INDEX "Contrato_pap_key" ON "Contrato"("pap");

-- CreateIndex
CREATE UNIQUE INDEX "Contrato_cnp_key" ON "Contrato"("cnp");

-- CreateIndex
CREATE UNIQUE INDEX "Conyuge_personalId_key" ON "Conyuge"("personalId");

-- AddForeignKey
ALTER TABLE "Conyuge" ADD CONSTRAINT "Conyuge_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conyuge" ADD CONSTRAINT "Conyuge_ubigeoId_fkey" FOREIGN KEY ("ubigeoId") REFERENCES "Ubigeo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hijo" ADD CONSTRAINT "Hijo_ubigeoId_fkey" FOREIGN KEY ("ubigeoId") REFERENCES "Ubigeo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
