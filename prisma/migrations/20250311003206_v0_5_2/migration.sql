/*
  Warnings:

  - You are about to drop the column `certificado` on the `estudios` table. All the data in the column will be lost.
  - You are about to drop the column `personal_id` on the `estudios` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `estudios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "estudios" DROP CONSTRAINT "estudios_personal_id_fkey";

-- AlterTable
ALTER TABLE "estudios" DROP COLUMN "certificado",
DROP COLUMN "personal_id",
ADD COLUMN     "file_id" TEXT,
ADD COLUMN     "tipo" TEXT NOT NULL DEFAULT 'certificado',
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "estudios" ADD CONSTRAINT "estudios_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estudios" ADD CONSTRAINT "estudios_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;
