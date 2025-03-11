/*
  Warnings:

  - You are about to alter the column `pap` on the `contratos` table. The data in that column could be lost. The data in that column will be cast from `Citext` to `Integer`.
  - You are about to alter the column `cnp` on the `contratos` table. The data in that column could be lost. The data in that column will be cast from `Citext` to `Integer`.

*/
-- AlterTable
ALTER TABLE "contratos" ALTER COLUMN "pap" SET DATA TYPE INTEGER USING pap::integer;
ALTER TABLE "contratos" ALTER COLUMN "cnp" SET DATA TYPE INTEGER USING cnp::integer;

