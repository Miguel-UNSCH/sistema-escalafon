/*
  Warnings:

  - You are about to drop the column `current_cargo_id` on the `ascensos` table. All the data in the column will be lost.
  - You are about to drop the column `current_dependencia_id` on the `ascensos` table. All the data in the column will be lost.
  - You are about to drop the column `new_cargo_id` on the `ascensos` table. All the data in the column will be lost.
  - You are about to drop the column `new_dependencia_id` on the `ascensos` table. All the data in the column will be lost.
  - Added the required column `currentUCDId` to the `ascensos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `newUCDId` to the `ascensos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ascensos" DROP CONSTRAINT "ascensos_current_cargo_id_fkey";

-- DropForeignKey
ALTER TABLE "ascensos" DROP CONSTRAINT "ascensos_current_dependencia_id_fkey";

-- DropForeignKey
ALTER TABLE "ascensos" DROP CONSTRAINT "ascensos_new_cargo_id_fkey";

-- DropForeignKey
ALTER TABLE "ascensos" DROP CONSTRAINT "ascensos_new_dependencia_id_fkey";

-- AlterTable
ALTER TABLE "ascensos" DROP COLUMN "current_cargo_id",
DROP COLUMN "current_dependencia_id",
DROP COLUMN "new_cargo_id",
DROP COLUMN "new_dependencia_id",
ADD COLUMN     "currentUCDId" INTEGER NOT NULL,
ADD COLUMN     "newUCDId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ascensos" ADD CONSTRAINT "ascensos_currentUCDId_fkey" FOREIGN KEY ("currentUCDId") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ascensos" ADD CONSTRAINT "ascensos_newUCDId_fkey" FOREIGN KEY ("newUCDId") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;
