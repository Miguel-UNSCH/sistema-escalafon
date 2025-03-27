/*
  Warnings:

  - Changed the type of `tipo_sancion` on the `demeritos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "tipo_sancion" AS ENUM ('amo_ver', 'amo_esc', 'sus', 'dest');

-- AlterTable
ALTER TABLE "demeritos" DROP COLUMN "tipo_sancion",
ADD COLUMN     "tipo_sancion" "tipo_sancion" NOT NULL;
