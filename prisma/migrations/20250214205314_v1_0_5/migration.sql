-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_hijoId_fkey";

-- AddForeignKey
ALTER TABLE "Hijo" ADD CONSTRAINT "Hijo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
