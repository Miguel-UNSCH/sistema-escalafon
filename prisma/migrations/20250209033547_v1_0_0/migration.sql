/*
  Warnings:

  - Added the required column `inei` to the `Ubigeo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reniec` to the `Ubigeo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ubigeo" ADD COLUMN     "inei" TEXT NOT NULL,
ADD COLUMN     "reniec" TEXT NOT NULL;
