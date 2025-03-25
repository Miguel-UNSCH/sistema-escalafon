/*
  Warnings:

  - You are about to drop the column `cargo_id` on the `personales` table. All the data in the column will be lost.
  - You are about to drop the column `dependencia_id` on the `personales` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "personales" DROP CONSTRAINT "personales_cargo_id_fkey";

-- DropForeignKey
ALTER TABLE "personales" DROP CONSTRAINT "personales_dependencia_id_fkey";

-- AlterTable
ALTER TABLE "personales" DROP COLUMN "cargo_id",
DROP COLUMN "dependencia_id",
ADD COLUMN     "cargoId" INTEGER,
ADD COLUMN     "dependenciaId" INTEGER;

-- CreateTable
CREATE TABLE "cargos_dependencias" (
    "cargoId" INTEGER NOT NULL,
    "dependenciaId" INTEGER NOT NULL,

    CONSTRAINT "cargos_dependencias_pkey" PRIMARY KEY ("cargoId","dependenciaId")
);

-- AddForeignKey
ALTER TABLE "cargos_dependencias" ADD CONSTRAINT "cargos_dependencias_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "cargos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cargos_dependencias" ADD CONSTRAINT "cargos_dependencias_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "dependencias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personales" ADD CONSTRAINT "personales_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "dependencias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personales" ADD CONSTRAINT "personales_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "cargos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
