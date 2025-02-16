/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `Cargo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Cargo_nombre_key" ON "Cargo"("nombre");
