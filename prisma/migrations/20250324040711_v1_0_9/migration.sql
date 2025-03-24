/*
  Warnings:

  - You are about to drop the column `cargo_id` on the `descansos_medicos` table. All the data in the column will be lost.
  - You are about to drop the column `dependencia_id` on the `descansos_medicos` table. All the data in the column will be lost.
  - Added the required column `detalle` to the `descansos_medicos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioCargoDependenciaId` to the `descansos_medicos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "descansos_medicos" DROP CONSTRAINT "descansos_medicos_cargo_id_fkey";

-- DropForeignKey
ALTER TABLE "descansos_medicos" DROP CONSTRAINT "descansos_medicos_dependencia_id_fkey";

-- AlterTable
ALTER TABLE "descansos_medicos" DROP COLUMN "cargo_id",
DROP COLUMN "dependencia_id",
ADD COLUMN     "detalle" CITEXT NOT NULL,
ADD COLUMN     "usuarioCargoDependenciaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "descansos_medicos" ADD CONSTRAINT "descansos_medicos_usuarioCargoDependenciaId_fkey" FOREIGN KEY ("usuarioCargoDependenciaId") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;
