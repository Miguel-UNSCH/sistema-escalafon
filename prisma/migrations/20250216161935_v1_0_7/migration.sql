/*
  Warnings:

  - You are about to drop the column `personalId` on the `Conyuge` table. All the data in the column will be lost.
  - You are about to drop the column `conyugeId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hijoId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `personalId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_PersonalHijos` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[conyugeId]` on the table `Personal` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'OTHER';

-- DropForeignKey
ALTER TABLE "Conyuge" DROP CONSTRAINT "Conyuge_personalId_fkey";

-- DropForeignKey
ALTER TABLE "Hijo" DROP CONSTRAINT "Hijo_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_conyugeId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_personalId_fkey";

-- DropForeignKey
ALTER TABLE "_PersonalHijos" DROP CONSTRAINT "_PersonalHijos_A_fkey";

-- DropForeignKey
ALTER TABLE "_PersonalHijos" DROP CONSTRAINT "_PersonalHijos_B_fkey";

-- DropIndex
DROP INDEX "Conyuge_personalId_key";

-- AlterTable
ALTER TABLE "Conyuge" DROP COLUMN "personalId",
ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "conyugeId",
DROP COLUMN "hijoId",
DROP COLUMN "personalId";

-- DropTable
DROP TABLE "_PersonalHijos";

-- CreateIndex
CREATE UNIQUE INDEX "Personal_conyugeId_key" ON "Personal"("conyugeId");

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_conyugeId_fkey" FOREIGN KEY ("conyugeId") REFERENCES "Conyuge"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conyuge" ADD CONSTRAINT "Conyuge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hijo" ADD CONSTRAINT "Hijo_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hijo" ADD CONSTRAINT "Hijo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
