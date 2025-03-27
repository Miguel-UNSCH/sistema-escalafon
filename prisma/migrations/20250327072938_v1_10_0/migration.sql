/*
  Warnings:

  - You are about to drop the `file_access` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rud_access` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "file_access" DROP CONSTRAINT "file_access_file_id_fkey";

-- DropForeignKey
ALTER TABLE "file_access" DROP CONSTRAINT "file_access_user_id_fkey";

-- DropTable
DROP TABLE "file_access";

-- DropTable
DROP TABLE "rud_access";

-- DropEnum
DROP TYPE "RegimenPensionario";

-- DropEnum
DROP TYPE "SituacionLaboral";

-- DropEnum
DROP TYPE "TipoContrato";
