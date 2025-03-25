/*
  Warnings:

  - You are about to drop the column `cargo_id` on the `contratos` table. All the data in the column will be lost.
  - You are about to drop the column `convenio` on the `contratos` table. All the data in the column will be lost.
  - You are about to drop the column `dependencia_id` on the `contratos` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_cese` on the `contratos` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_ingreso` on the `contratos` table. All the data in the column will be lost.
  - You are about to drop the column `cargo_emisor_id` on the `documentos` table. All the data in the column will be lost.
  - You are about to drop the column `cargo_receptor_id` on the `documentos` table. All the data in the column will be lost.
  - You are about to drop the column `dependencia_emisor_id` on the `documentos` table. All the data in the column will be lost.
  - You are about to drop the column `dependencia_receptor_id` on the `documentos` table. All the data in the column will be lost.
  - You are about to drop the column `emisor_id` on the `documentos` table. All the data in the column will be lost.
  - You are about to drop the column `numero_documento` on the `documentos` table. All the data in the column will be lost.
  - You are about to drop the column `receptor_id` on the `documentos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,file_id]` on the table `documentos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `periodo` to the `contratos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ucd_id` to the `contratos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `r_id` to the `documentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `r_ucd_id` to the `documentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ucd_id` to the `documentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `documentos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "contratos" DROP CONSTRAINT "contratos_cargo_id_fkey";

-- DropForeignKey
ALTER TABLE "contratos" DROP CONSTRAINT "contratos_dependencia_id_fkey";

-- DropForeignKey
ALTER TABLE "documentos" DROP CONSTRAINT "documentos_cargo_emisor_id_fkey";

-- DropForeignKey
ALTER TABLE "documentos" DROP CONSTRAINT "documentos_cargo_receptor_id_fkey";

-- DropForeignKey
ALTER TABLE "documentos" DROP CONSTRAINT "documentos_dependencia_emisor_id_fkey";

-- DropForeignKey
ALTER TABLE "documentos" DROP CONSTRAINT "documentos_dependencia_receptor_id_fkey";

-- DropForeignKey
ALTER TABLE "documentos" DROP CONSTRAINT "documentos_emisor_id_fkey";

-- DropForeignKey
ALTER TABLE "documentos" DROP CONSTRAINT "documentos_receptor_id_fkey";

-- DropIndex
DROP INDEX "documentos_emisor_id_file_id_key";

-- DropIndex
DROP INDEX "documentos_numero_documento_key";

-- AlterTable
ALTER TABLE "contratos" DROP COLUMN "cargo_id",
DROP COLUMN "convenio",
DROP COLUMN "dependencia_id",
DROP COLUMN "fecha_cese",
DROP COLUMN "fecha_ingreso",
ADD COLUMN     "periodo" JSONB NOT NULL,
ADD COLUMN     "ucd_id" INTEGER NOT NULL,
ALTER COLUMN "regimen_laboral" DROP NOT NULL;

-- AlterTable
ALTER TABLE "documentos" DROP COLUMN "cargo_emisor_id",
DROP COLUMN "cargo_receptor_id",
DROP COLUMN "dependencia_emisor_id",
DROP COLUMN "dependencia_receptor_id",
DROP COLUMN "emisor_id",
DROP COLUMN "numero_documento",
DROP COLUMN "receptor_id",
ADD COLUMN     "r_id" TEXT NOT NULL,
ADD COLUMN     "r_ucd_id" INTEGER NOT NULL,
ADD COLUMN     "ucd_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "constancias" (
    "id" TEXT NOT NULL,
    "periodo" JSONB NOT NULL,
    "nivel_remunerado" CITEXT NOT NULL,
    "pap" INTEGER NOT NULL,
    "cnp" INTEGER NOT NULL,
    "ucd_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,

    CONSTRAINT "constancias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "constancias_user_id_file_id_key" ON "constancias"("user_id", "file_id");

-- CreateIndex
CREATE UNIQUE INDEX "documentos_user_id_file_id_key" ON "documentos"("user_id", "file_id");

-- AddForeignKey
ALTER TABLE "contratos" ADD CONSTRAINT "contratos_ucd_id_fkey" FOREIGN KEY ("ucd_id") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_ucd_id_fkey" FOREIGN KEY ("ucd_id") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_r_ucd_id_fkey" FOREIGN KEY ("r_ucd_id") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_r_id_fkey" FOREIGN KEY ("r_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "constancias" ADD CONSTRAINT "constancias_ucd_id_fkey" FOREIGN KEY ("ucd_id") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "constancias" ADD CONSTRAINT "constancias_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "constancias" ADD CONSTRAINT "constancias_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
