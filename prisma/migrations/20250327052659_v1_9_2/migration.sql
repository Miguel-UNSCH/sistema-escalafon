/*
  Warnings:

  - You are about to drop the column `periodo` on the `demeritos` table. All the data in the column will be lost.
  - Added the required column `fecha_start` to the `demeritos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "demeritos" DROP COLUMN "periodo",
ADD COLUMN     "fecha_end" TIMESTAMP(3),
ADD COLUMN     "fecha_start" TIMESTAMP(3) NOT NULL;
