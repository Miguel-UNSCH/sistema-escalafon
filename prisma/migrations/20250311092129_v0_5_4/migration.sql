/*
  Warnings:

  - You are about to drop the `capacitacion` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `file_id` on table `estudios` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "capacitacion" DROP CONSTRAINT "capacitacion_file_id_fkey";

-- DropForeignKey
ALTER TABLE "capacitacion" DROP CONSTRAINT "capacitacion_user_id_fkey";

-- DropForeignKey
ALTER TABLE "estudios" DROP CONSTRAINT "estudios_file_id_fkey";

-- AlterTable
ALTER TABLE "estudios" ALTER COLUMN "file_id" SET NOT NULL;

-- DropTable
DROP TABLE "capacitacion";

-- CreateTable
CREATE TABLE "capacitaciones" (
    "id" TEXT NOT NULL,
    "centro_capacitacion" CITEXT NOT NULL,
    "materia" CITEXT NOT NULL,
    "especialidad" CITEXT NOT NULL,
    "periodo" JSONB NOT NULL,
    "horas_lectivas" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL DEFAULT 'certificado',
    "file_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "capacitaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experiencias" (
    "id" TEXT NOT NULL,
    "centro_labor" CITEXT NOT NULL,
    "periodo" JSONB NOT NULL,
    "user_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "cargo_id" INTEGER NOT NULL,
    "dependencia_id" INTEGER NOT NULL,

    CONSTRAINT "experiencias_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "estudios" ADD CONSTRAINT "estudios_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capacitaciones" ADD CONSTRAINT "capacitaciones_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capacitaciones" ADD CONSTRAINT "capacitaciones_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiencias" ADD CONSTRAINT "experiencias_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiencias" ADD CONSTRAINT "experiencias_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiencias" ADD CONSTRAINT "experiencias_cargo_id_fkey" FOREIGN KEY ("cargo_id") REFERENCES "cargos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiencias" ADD CONSTRAINT "experiencias_dependencia_id_fkey" FOREIGN KEY ("dependencia_id") REFERENCES "dependencias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
