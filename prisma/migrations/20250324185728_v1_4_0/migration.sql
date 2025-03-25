/*
  Warnings:

  - You are about to drop the column `cargo_id` on the `evaluations` table. All the data in the column will be lost.
  - You are about to drop the column `dependencia_id` on the `evaluations` table. All the data in the column will be lost.
  - You are about to drop the column `puntuacion` on the `evaluations` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `evaluations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[evaluado_id,file_id]` on the table `evaluations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `evaluado_id` to the `evaluations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evaluado_ucd_id` to the `evaluations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evaluador_id` to the `evaluations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evaluador_ucd_id` to the `evaluations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "evaluations" DROP CONSTRAINT "evaluations_cargo_id_fkey";

-- DropForeignKey
ALTER TABLE "evaluations" DROP CONSTRAINT "evaluations_dependencia_id_fkey";

-- DropForeignKey
ALTER TABLE "evaluations" DROP CONSTRAINT "evaluations_user_id_fkey";

-- DropIndex
DROP INDEX "evaluations_user_id_file_id_key";

-- AlterTable
ALTER TABLE "evaluations" DROP COLUMN "cargo_id",
DROP COLUMN "dependencia_id",
DROP COLUMN "puntuacion",
DROP COLUMN "user_id",
ADD COLUMN     "evaluado_id" TEXT NOT NULL,
ADD COLUMN     "evaluado_ucd_id" INTEGER NOT NULL,
ADD COLUMN     "evaluador_id" TEXT NOT NULL,
ADD COLUMN     "evaluador_ucd_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "evaluations_evaluado_id_file_id_key" ON "evaluations"("evaluado_id", "file_id");

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_evaluado_ucd_id_fkey" FOREIGN KEY ("evaluado_ucd_id") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_evaluador_ucd_id_fkey" FOREIGN KEY ("evaluador_ucd_id") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_evaluado_id_fkey" FOREIGN KEY ("evaluado_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_evaluador_id_fkey" FOREIGN KEY ("evaluador_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
