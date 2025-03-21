/*
  Warnings:

  - The primary key for the `cargos_dependencias` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cargoId` on the `usuario_cargo_dependencias` table. All the data in the column will be lost.
  - You are about to drop the column `dependenciaId` on the `usuario_cargo_dependencias` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cargoId,dependenciaId]` on the table `cargos_dependencias` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,cargoDependenciaId]` on the table `usuario_cargo_dependencias` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cargoDependenciaId` to the `usuario_cargo_dependencias` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "usuario_cargo_dependencias" DROP CONSTRAINT "usuario_cargo_dependencias_cargoId_dependenciaId_fkey";

-- DropIndex
DROP INDEX "usuario_cargo_dependencias_userId_cargoId_dependenciaId_key";

-- AlterTable
ALTER TABLE "cargos_dependencias" DROP CONSTRAINT "cargos_dependencias_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "cargos_dependencias_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "usuario_cargo_dependencias" DROP COLUMN "cargoId",
DROP COLUMN "dependenciaId",
ADD COLUMN     "cargoDependenciaId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cargos_dependencias_cargoId_dependenciaId_key" ON "cargos_dependencias"("cargoId", "dependenciaId");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_cargo_dependencias_userId_cargoDependenciaId_key" ON "usuario_cargo_dependencias"("userId", "cargoDependenciaId");

-- AddForeignKey
ALTER TABLE "usuario_cargo_dependencias" ADD CONSTRAINT "usuario_cargo_dependencias_cargoDependenciaId_fkey" FOREIGN KEY ("cargoDependenciaId") REFERENCES "cargos_dependencias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
