/*
  Warnings:

  - You are about to drop the column `fecha` on the `demeritos` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioCargoDependenciaId` on the `demeritos` table. All the data in the column will be lost.
  - Added the required column `asunto` to the `demeritos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodo` to the `demeritos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_documento` to the `demeritos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ucd_id` to the `demeritos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "demeritos" DROP CONSTRAINT "demeritos_usuarioCargoDependenciaId_fkey";

-- AlterTable
ALTER TABLE "demeritos" DROP COLUMN "fecha",
DROP COLUMN "usuarioCargoDependenciaId",
ADD COLUMN     "asunto" CITEXT NOT NULL,
ADD COLUMN     "periodo" JSONB NOT NULL,
ADD COLUMN     "tipo_documento" CITEXT NOT NULL,
ADD COLUMN     "ucd_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "demeritos" ADD CONSTRAINT "demeritos_ucd_id_fkey" FOREIGN KEY ("ucd_id") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;
