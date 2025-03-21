/*
  Warnings:

  - You are about to drop the column `cargo_id` on the `experiencias` table. All the data in the column will be lost.
  - You are about to drop the column `dependencia_id` on the `experiencias` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `experiencias` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[usuarioCargoDependenciaId,file_id]` on the table `experiencias` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usuarioCargoDependenciaId` to the `experiencias` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "experiencias" DROP CONSTRAINT "experiencias_cargo_id_fkey";

-- DropForeignKey
ALTER TABLE "experiencias" DROP CONSTRAINT "experiencias_dependencia_id_fkey";

-- DropForeignKey
ALTER TABLE "experiencias" DROP CONSTRAINT "experiencias_user_id_fkey";

-- DropIndex
DROP INDEX "experiencias_user_id_file_id_key";

-- AlterTable
ALTER TABLE "experiencias" DROP COLUMN "cargo_id",
DROP COLUMN "dependencia_id",
DROP COLUMN "user_id",
ADD COLUMN     "usuarioCargoDependenciaId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "usuario_cargo_dependencias" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "dependenciaId" INTEGER NOT NULL,

    CONSTRAINT "usuario_cargo_dependencias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_cargo_dependencias_userId_cargoId_dependenciaId_key" ON "usuario_cargo_dependencias"("userId", "cargoId", "dependenciaId");

-- CreateIndex
CREATE UNIQUE INDEX "experiencias_usuarioCargoDependenciaId_file_id_key" ON "experiencias"("usuarioCargoDependenciaId", "file_id");

-- AddForeignKey
ALTER TABLE "usuario_cargo_dependencias" ADD CONSTRAINT "usuario_cargo_dependencias_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_cargo_dependencias" ADD CONSTRAINT "usuario_cargo_dependencias_cargoId_dependenciaId_fkey" FOREIGN KEY ("cargoId", "dependenciaId") REFERENCES "cargos_dependencias"("cargoId", "dependenciaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiencias" ADD CONSTRAINT "experiencias_usuarioCargoDependenciaId_fkey" FOREIGN KEY ("usuarioCargoDependenciaId") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;
