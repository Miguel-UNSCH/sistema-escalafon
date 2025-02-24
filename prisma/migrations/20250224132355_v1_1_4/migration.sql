/*
  Warnings:

  - Added the required column `apellidos` to the `Conyuge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombres` to the `Conyuge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apellidos` to the `Hijo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombres` to the `Hijo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conyuge" ADD COLUMN     "apellidos" TEXT NOT NULL,
ADD COLUMN     "nombres" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Hijo" ADD COLUMN     "apellidos" TEXT NOT NULL,
ADD COLUMN     "nombres" TEXT NOT NULL;
