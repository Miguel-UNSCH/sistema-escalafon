/*
  Warnings:

  - You are about to drop the column `regimen_pensionario` on the `personales` table. All the data in the column will be lost.
  - You are about to drop the column `situacion_laboral` on the `personales` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "personales" DROP COLUMN "regimen_pensionario",
DROP COLUMN "situacion_laboral";
