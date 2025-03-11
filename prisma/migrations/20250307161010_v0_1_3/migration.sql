/*
  Warnings:

  - The `must_change_pwd` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "must_change_pwd",
ADD COLUMN     "must_change_pwd" INTEGER NOT NULL DEFAULT 1;
