/*
  Warnings:

  - Added the required column `detalle` to the `permisos_licencias_vacaciones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "permisos_licencias_vacaciones" ADD COLUMN     "detalle" CITEXT NOT NULL;
