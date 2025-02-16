/*
  Warnings:

  - You are about to drop the column `cargoAl` on the `Ascenso` table. All the data in the column will be lost.
  - You are about to drop the column `cargoDel` on the `Ascenso` table. All the data in the column will be lost.
  - Changed the type of `nivelRemunerativoDel` on the `Ascenso` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `nivelRemunerativoAl` on the `Ascenso` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Ascenso" DROP COLUMN "cargoAl",
DROP COLUMN "cargoDel",
DROP COLUMN "nivelRemunerativoDel",
ADD COLUMN     "nivelRemunerativoDel" INTEGER NOT NULL,
DROP COLUMN "nivelRemunerativoAl",
ADD COLUMN     "nivelRemunerativoAl" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Personal" ALTER COLUMN "userId" SET DATA TYPE TEXT;
