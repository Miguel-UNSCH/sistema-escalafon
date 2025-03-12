/*
  Warnings:

  - You are about to drop the column `periodo` on the `ascensos` table. All the data in the column will be lost.
  - Added the required column `fecha` to the `ascensos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ascensos" DROP COLUMN "periodo",
ADD COLUMN     "fecha" TIMESTAMP(3) NOT NULL;
