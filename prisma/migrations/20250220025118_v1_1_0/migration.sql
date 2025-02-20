/*
  Warnings:

  - Changed the type of `fechaIngreso` on the `Personal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `fechaNacimiento` on the `Personal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Personal" DROP COLUMN "fechaIngreso",
ADD COLUMN     "fechaIngreso" TIMESTAMP(3) NOT NULL,
DROP COLUMN "fechaNacimiento",
ADD COLUMN     "fechaNacimiento" TIMESTAMP(3) NOT NULL;
