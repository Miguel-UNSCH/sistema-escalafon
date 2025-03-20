/*
  Warnings:

  - You are about to drop the column `cargoId` on the `personales` table. All the data in the column will be lost.
  - You are about to drop the column `dependenciaId` on the `personales` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "personales" DROP CONSTRAINT "personales_cargoId_fkey";

-- DropForeignKey
ALTER TABLE "personales" DROP CONSTRAINT "personales_dependenciaId_fkey";

-- AlterTable
ALTER TABLE "personales" DROP COLUMN "cargoId",
DROP COLUMN "dependenciaId";
