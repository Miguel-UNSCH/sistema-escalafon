/*
  Warnings:

  - Added the required column `userId` to the `experiencias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "experiencias" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "experiencias" ADD CONSTRAINT "experiencias_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
