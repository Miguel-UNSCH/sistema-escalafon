/*
  Warnings:

  - Added the required column `updatedAt` to the `conf_edicion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "conf_edicion" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
