/*
  Warnings:

  - You are about to drop the column `estadoCivil` on the `personales` table. All the data in the column will be lost.
  - You are about to drop the column `situacionLaboral` on the `personales` table. All the data in the column will be lost.
  - Added the required column `estado_civil` to the `personales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `situacion_laboral` to the `personales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "personales" DROP COLUMN "estadoCivil",
DROP COLUMN "situacionLaboral",
ADD COLUMN     "estado_civil" "EstadoCivil" NOT NULL,
ADD COLUMN     "situacion_laboral" "SituacionLaboral" NOT NULL;
