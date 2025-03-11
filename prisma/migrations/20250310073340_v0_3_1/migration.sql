/*
  Warnings:

  - You are about to drop the column `gradoInstruccion` on the `conyuges` table. All the data in the column will be lost.
  - Added the required column `grado_instruccion` to the `conyuges` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "conyuges" DROP COLUMN "gradoInstruccion",
ADD COLUMN     "grado_instruccion" "GradoInstruccion" NOT NULL;
