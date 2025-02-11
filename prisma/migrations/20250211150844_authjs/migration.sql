/*
  Warnings:

  - You are about to drop the column `dependenciaId` on the `Ascenso` table. All the data in the column will be lost.
  - You are about to drop the column `oficinaId` on the `Ascenso` table. All the data in the column will be lost.
  - You are about to drop the column `dependenciaId` on the `FichaEvaluacion` table. All the data in the column will be lost.
  - Added the required column `dependenciaOficinaId` to the `FichaEvaluacion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FichaEvaluacion" DROP CONSTRAINT "FichaEvaluacion_dependenciaId_fkey";

-- AlterTable
ALTER TABLE "Ascenso" DROP COLUMN "dependenciaId",
DROP COLUMN "oficinaId";

-- AlterTable
ALTER TABLE "FichaEvaluacion" DROP COLUMN "dependenciaId",
ADD COLUMN     "dependenciaOficinaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "FichaEvaluacion" ADD CONSTRAINT "FichaEvaluacion_dependenciaOficinaId_fkey" FOREIGN KEY ("dependenciaOficinaId") REFERENCES "DependenciaOficina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
