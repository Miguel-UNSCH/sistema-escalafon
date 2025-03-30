/*
  Warnings:

  - A unique constraint covering the columns `[n_autogenerado]` on the table `personales` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "personales_n_autogenerado_key" ON "personales"("n_autogenerado");
