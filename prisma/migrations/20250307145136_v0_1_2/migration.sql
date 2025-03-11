/*
  Warnings:

  - A unique constraint covering the columns `[dni]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "citext";

-- AlterTable
ALTER TABLE "cargos" ALTER COLUMN "nombre" SET DATA TYPE CITEXT;

-- AlterTable
ALTER TABLE "dependencias" ALTER COLUMN "nombre" SET DATA TYPE CITEXT,
ALTER COLUMN "direccion" SET DATA TYPE CITEXT,
ALTER COLUMN "codigo" SET DATA TYPE CITEXT;

-- AlterTable
ALTER TABLE "ubigeos" ALTER COLUMN "departamento" SET DATA TYPE CITEXT,
ALTER COLUMN "provincia" SET DATA TYPE CITEXT,
ALTER COLUMN "distrito" SET DATA TYPE CITEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "must_change_pwd" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "name" SET DATA TYPE CITEXT,
ALTER COLUMN "last_name" SET DATA TYPE CITEXT,
ALTER COLUMN "email" SET DATA TYPE CITEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_dni_key" ON "users"("dni");
