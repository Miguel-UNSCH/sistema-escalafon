-- CreateEnum
CREATE TYPE "EstadoCivil" AS ENUM ('s', 'c', 'd', 'v');

-- CreateEnum
CREATE TYPE "GrupoSanguineo" AS ENUM ('a_positivo', 'a_negativo', 'b_positivo', 'b_negativo', 'ab_positivo', 'ab_negativo', 'o_positivo', 'o_negativo');

-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('m', 'f');

-- CreateEnum
CREATE TYPE "TipoContrato" AS ENUM ('dl', 'cas', 'pi', 'p');

-- CreateEnum
CREATE TYPE "TipoDesplazamiento" AS ENUM ('ri', 'rv', 'r', 'd', 'p');

-- CreateEnum
CREATE TYPE "TipoDescanso" AS ENUM ('m', 'p', 'pn');

-- CreateEnum
CREATE TYPE "TipoPermisoLicenciaVacacion" AS ENUM ('p', 'v', 'pf');

-- CreateEnum
CREATE TYPE "SituacionLaboral" AS ENUM ('nd276', 'cpv', 'cl30057', 'casi', 'cast', 'cpi', 'ppp1404', 'pp1004');

-- CreateEnum
CREATE TYPE "RegimenPensionario" AS ENUM ('l29903', 'dl19990');

-- CreateEnum
CREATE TYPE "GradoInstruccion" AS ENUM ('sin', 'pc', 'pi', 'sc', 'si', 'tec', 'uni', 'pos', 'null');

-- CreateEnum
CREATE TYPE "FormacionAcademica" AS ENUM ('pc', 'pi', 'sc', 'si', 'bac', 'tit', 'pos', 'tec');

-- CreateTable
CREATE TABLE "Ubigeo" (
    "id" SERIAL NOT NULL,
    "inei" TEXT NOT NULL,
    "reniec" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "distrito" TEXT NOT NULL,

    CONSTRAINT "Ubigeo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dependencia" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT,
    "codigo" TEXT NOT NULL,

    CONSTRAINT "Dependencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cargo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Cargo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ubigeo_inei_key" ON "Ubigeo"("inei");

-- CreateIndex
CREATE UNIQUE INDEX "Ubigeo_reniec_key" ON "Ubigeo"("reniec");

-- CreateIndex
CREATE UNIQUE INDEX "Dependencia_nombre_key" ON "Dependencia"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Dependencia_codigo_key" ON "Dependencia"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Cargo_nombre_key" ON "Cargo"("nombre");
