/*
  Warnings:

  - Added the required column `etapa` to the `evaluations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "evaluations" ADD COLUMN     "etapa" INTEGER NOT NULL;
