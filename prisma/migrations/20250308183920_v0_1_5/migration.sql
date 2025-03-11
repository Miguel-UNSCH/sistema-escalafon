/*
  Warnings:

  - You are about to drop the column `cargo_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `dependencia_id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_cargo_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_dependencia_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "cargo_id",
DROP COLUMN "dependencia_id";
