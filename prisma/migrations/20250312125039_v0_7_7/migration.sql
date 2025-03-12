/*
  Warnings:

  - Added the required column `fecha` to the `bonuses_personal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bonuses_personal" ADD COLUMN     "fecha" TIMESTAMP(3) NOT NULL;
