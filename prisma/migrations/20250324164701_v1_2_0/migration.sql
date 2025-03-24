/*
  Warnings:

  - You are about to drop the column `cargo_id` on the `bonuses_family` table. All the data in the column will be lost.
  - You are about to drop the column `dependencia_id` on the `bonuses_family` table. All the data in the column will be lost.
  - Added the required column `usuarioCargoDependenciaId` to the `bonuses_family` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bonuses_family" DROP CONSTRAINT "bonuses_family_cargo_id_fkey";

-- DropForeignKey
ALTER TABLE "bonuses_family" DROP CONSTRAINT "bonuses_family_dependencia_id_fkey";

-- AlterTable
ALTER TABLE "bonuses_family" DROP COLUMN "cargo_id",
DROP COLUMN "dependencia_id",
ADD COLUMN     "usuarioCargoDependenciaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "bonuses_family" ADD CONSTRAINT "bonuses_family_usuarioCargoDependenciaId_fkey" FOREIGN KEY ("usuarioCargoDependenciaId") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;
