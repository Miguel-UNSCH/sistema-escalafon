/*
  Warnings:

  - Changed the type of `tipo` on the `discapacidades` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `entidad_certificadora` to the `discapacidades` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TDiscapacidad" AS ENUM ('sensorial', 'motriz', 'intelectual', 'psicosocial', 'multiple');

-- CreateEnum
CREATE TYPE "TEntCertDic" AS ENUM ('min', 'ess', 'cod');

-- AlterTable
ALTER TABLE "discapacidades" DROP COLUMN "tipo",
ADD COLUMN     "tipo" "TDiscapacidad" NOT NULL,
DROP COLUMN "entidad_certificadora",
ADD COLUMN     "entidad_certificadora" "TEntCertDic" NOT NULL;
