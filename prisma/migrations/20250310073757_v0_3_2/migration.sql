/*
  Warnings:

  - Changed the type of `ubigeo_id` on the `conyuges` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "conyuges" DROP COLUMN "ubigeo_id",
ADD COLUMN     "ubigeo_id" INTEGER NOT NULL;
