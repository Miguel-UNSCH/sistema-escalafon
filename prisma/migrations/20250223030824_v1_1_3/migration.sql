/*
  Warnings:

  - Made the column `codigo` on table `Dependencia` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Dependencia" ALTER COLUMN "codigo" SET NOT NULL;
