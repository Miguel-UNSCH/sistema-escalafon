/*
  Warnings:

  - Added the required column `motivo` to the `meritos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "meritos" ADD COLUMN     "motivo" CITEXT NOT NULL;
