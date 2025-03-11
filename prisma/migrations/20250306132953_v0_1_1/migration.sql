/*
  Warnings:

  - You are about to drop the `Cargo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Dependencia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ubigeo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Cargo";

-- DropTable
DROP TABLE "Dependencia";

-- DropTable
DROP TABLE "Ubigeo";

-- CreateTable
CREATE TABLE "ubigeos" (
    "id" SERIAL NOT NULL,
    "inei" TEXT NOT NULL,
    "reniec" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "distrito" TEXT NOT NULL,

    CONSTRAINT "ubigeos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dependencias" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT,
    "codigo" TEXT NOT NULL,

    CONSTRAINT "dependencias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cargos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "cargos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ubigeos_inei_key" ON "ubigeos"("inei");

-- CreateIndex
CREATE UNIQUE INDEX "ubigeos_reniec_key" ON "ubigeos"("reniec");

-- CreateIndex
CREATE UNIQUE INDEX "dependencias_nombre_key" ON "dependencias"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "dependencias_codigo_key" ON "dependencias"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "cargos_nombre_key" ON "cargos"("nombre");
