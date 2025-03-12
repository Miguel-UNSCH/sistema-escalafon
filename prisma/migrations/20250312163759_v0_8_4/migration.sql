/*
  Warnings:

  - Changed the type of `tipo_documento` on the `documentos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "tipo_doc" AS ENUM ('mem', 'ofi', 'act');

-- AlterTable
ALTER TABLE "documentos" ALTER COLUMN "numero_documento" SET DATA TYPE CITEXT,
DROP COLUMN "tipo_documento",
ADD COLUMN     "tipo_documento" "tipo_doc" NOT NULL,
ALTER COLUMN "asunto" SET DATA TYPE CITEXT;
