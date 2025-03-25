/*
  Warnings:

  - You are about to drop the column `cargo_id` on the `demeritos` table. All the data in the column will be lost.
  - You are about to drop the column `dependencia_id` on the `demeritos` table. All the data in the column will be lost.
  - You are about to drop the column `cargo_id` on the `meritos` table. All the data in the column will be lost.
  - You are about to drop the column `dependencia_id` on the `meritos` table. All the data in the column will be lost.
  - Added the required column `usuarioCargoDependenciaId` to the `demeritos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioCargoDependenciaId` to the `meritos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "demeritos" DROP CONSTRAINT "demeritos_cargo_id_fkey";

-- DropForeignKey
ALTER TABLE "demeritos" DROP CONSTRAINT "demeritos_dependencia_id_fkey";

-- DropForeignKey
ALTER TABLE "meritos" DROP CONSTRAINT "meritos_cargo_id_fkey";

-- DropForeignKey
ALTER TABLE "meritos" DROP CONSTRAINT "meritos_dependencia_id_fkey";

-- AlterTable
ALTER TABLE "demeritos" DROP COLUMN "cargo_id",
DROP COLUMN "dependencia_id",
ADD COLUMN     "usuarioCargoDependenciaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "meritos" DROP COLUMN "cargo_id",
DROP COLUMN "dependencia_id",
ADD COLUMN     "usuarioCargoDependenciaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "meritos" ADD CONSTRAINT "meritos_usuarioCargoDependenciaId_fkey" FOREIGN KEY ("usuarioCargoDependenciaId") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demeritos" ADD CONSTRAINT "demeritos_usuarioCargoDependenciaId_fkey" FOREIGN KEY ("usuarioCargoDependenciaId") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;
