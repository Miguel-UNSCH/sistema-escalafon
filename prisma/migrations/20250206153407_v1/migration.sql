/*
  Warnings:

  - You are about to drop the column `cargoActual` on the `Ascenso` table. All the data in the column will be lost.
  - You are about to drop the column `cargoAnterior` on the `Ascenso` table. All the data in the column will be lost.
  - You are about to drop the column `documentoAscenso` on the `Ascenso` table. All the data in the column will be lost.
  - You are about to drop the column `cargo` on the `BonificacionPersonal` table. All the data in the column will be lost.
  - You are about to drop the column `lugarFechaNacimiento` on the `Conyuge` table. All the data in the column will be lost.
  - You are about to drop the column `cargo` on the `ExperienciaLaboral` table. All the data in the column will be lost.
  - You are about to drop the column `cargo` on the `FichaEvaluacion` table. All the data in the column will be lost.
  - You are about to drop the column `gradoInstruccion` on the `GradoInstruccion` table. All the data in the column will be lost.
  - You are about to drop the column `hijoId` on the `GradoInstruccion` table. All the data in the column will be lost.
  - You are about to drop the column `lugarFechaNacimiento` on the `Hijo` table. All the data in the column will be lost.
  - You are about to drop the column `cargo` on the `Trabajador` table. All the data in the column will be lost.
  - You are about to drop the column `departamentoRegion` on the `Trabajador` table. All the data in the column will be lost.
  - You are about to drop the column `distrito` on the `Trabajador` table. All the data in the column will be lost.
  - You are about to drop the column `nacionalidad` on the `Trabajador` table. All the data in the column will be lost.
  - You are about to drop the column `nombreAFP` on the `Trabajador` table. All the data in the column will be lost.
  - You are about to drop the column `provincia` on the `Trabajador` table. All the data in the column will be lost.
  - You are about to drop the column `regimenPensionario` on the `Trabajador` table. All the data in the column will be lost.
  - You are about to drop the column `unidadEstructurada` on the `Trabajador` table. All the data in the column will be lost.
  - Added the required column `cargoActualId` to the `Ascenso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cargoAnteriorId` to the `Ascenso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cargoId` to the `BonificacionPersonal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaNacimiento` to the `Conyuge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ubigeoId` to the `Conyuge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cargoId` to the `ExperienciaLaboral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cargoId` to the `FichaEvaluacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `GradoInstruccion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaNacimiento` to the `Hijo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ubigeoId` to the `Hijo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cargoId` to the `Trabajador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regimenPensionarioId` to the `Trabajador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ubigeoId` to the `Trabajador` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Cargo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Ubigeo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "distrito" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "departamentoRegion" TEXT NOT NULL,
    "nacionalidad" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "RegimenPensionario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FormacionAcademica" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trabajadorId" INTEGER NOT NULL,
    "gradoId" INTEGER NOT NULL,
    "campoEstudio" TEXT NOT NULL,
    "institucion" TEXT NOT NULL,
    "fechaInicio" DATETIME NOT NULL,
    "fechaFin" DATETIME NOT NULL,
    CONSTRAINT "FormacionAcademica_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FormacionAcademica_gradoId_fkey" FOREIGN KEY ("gradoId") REFERENCES "GradoInstruccion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GradoInstruccionToHijo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GradoInstruccionToHijo_A_fkey" FOREIGN KEY ("A") REFERENCES "GradoInstruccion" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GradoInstruccionToHijo_B_fkey" FOREIGN KEY ("B") REFERENCES "Hijo" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ascenso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trabajadorId" INTEGER NOT NULL,
    "cargoAnteriorId" INTEGER NOT NULL,
    "cargoActualId" INTEGER NOT NULL,
    "nivelRemunerativo" TEXT NOT NULL,
    "papCnp" TEXT NOT NULL,
    "fechaAscenso" DATETIME NOT NULL,
    CONSTRAINT "Ascenso_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ascenso_cargoAnteriorId_fkey" FOREIGN KEY ("cargoAnteriorId") REFERENCES "Cargo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ascenso_cargoActualId_fkey" FOREIGN KEY ("cargoActualId") REFERENCES "Cargo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ascenso" ("fechaAscenso", "id", "nivelRemunerativo", "papCnp", "trabajadorId") SELECT "fechaAscenso", "id", "nivelRemunerativo", "papCnp", "trabajadorId" FROM "Ascenso";
DROP TABLE "Ascenso";
ALTER TABLE "new_Ascenso" RENAME TO "Ascenso";
CREATE TABLE "new_BonificacionPersonal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trabajadorId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "tipoBonificacion" TEXT NOT NULL,
    "documentoBonificacion" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    CONSTRAINT "BonificacionPersonal_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BonificacionPersonal_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BonificacionPersonal" ("dependenciaOficina", "documentoBonificacion", "id", "tipoBonificacion", "trabajadorId") SELECT "dependenciaOficina", "documentoBonificacion", "id", "tipoBonificacion", "trabajadorId" FROM "BonificacionPersonal";
DROP TABLE "BonificacionPersonal";
ALTER TABLE "new_BonificacionPersonal" RENAME TO "BonificacionPersonal";
CREATE TABLE "new_Conyuge" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trabajadorId" INTEGER NOT NULL,
    "apellidosYNombres" TEXT NOT NULL,
    "ubigeoId" INTEGER NOT NULL,
    "fechaNacimiento" DATETIME NOT NULL,
    "gradoInstruccion" TEXT NOT NULL,
    "profesion" TEXT NOT NULL,
    "ocupacion" TEXT NOT NULL,
    "centroTrabajo" TEXT NOT NULL,
    "postgradoEspecializacion" TEXT NOT NULL,
    CONSTRAINT "Conyuge_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Conyuge_ubigeoId_fkey" FOREIGN KEY ("ubigeoId") REFERENCES "Ubigeo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Conyuge" ("apellidosYNombres", "centroTrabajo", "gradoInstruccion", "id", "ocupacion", "postgradoEspecializacion", "profesion", "trabajadorId") SELECT "apellidosYNombres", "centroTrabajo", "gradoInstruccion", "id", "ocupacion", "postgradoEspecializacion", "profesion", "trabajadorId" FROM "Conyuge";
DROP TABLE "Conyuge";
ALTER TABLE "new_Conyuge" RENAME TO "Conyuge";
CREATE UNIQUE INDEX "Conyuge_trabajadorId_key" ON "Conyuge"("trabajadorId");
CREATE TABLE "new_ExperienciaLaboral" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trabajadorId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "centroLaboral" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "periodoInicio" DATETIME NOT NULL,
    "periodoFin" DATETIME NOT NULL,
    "fechaEmision" DATETIME NOT NULL,
    CONSTRAINT "ExperienciaLaboral_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExperienciaLaboral_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ExperienciaLaboral" ("centroLaboral", "dependenciaOficina", "documentoSustento", "fechaEmision", "id", "periodoFin", "periodoInicio", "trabajadorId") SELECT "centroLaboral", "dependenciaOficina", "documentoSustento", "fechaEmision", "id", "periodoFin", "periodoInicio", "trabajadorId" FROM "ExperienciaLaboral";
DROP TABLE "ExperienciaLaboral";
ALTER TABLE "new_ExperienciaLaboral" RENAME TO "ExperienciaLaboral";
CREATE TABLE "new_FichaEvaluacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trabajadorId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "fechaEvaluacion" DATETIME NOT NULL,
    CONSTRAINT "FichaEvaluacion_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FichaEvaluacion_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FichaEvaluacion" ("dependenciaOficina", "documentoSustento", "fechaEvaluacion", "id", "trabajadorId") SELECT "dependenciaOficina", "documentoSustento", "fechaEvaluacion", "id", "trabajadorId" FROM "FichaEvaluacion";
DROP TABLE "FichaEvaluacion";
ALTER TABLE "new_FichaEvaluacion" RENAME TO "FichaEvaluacion";
CREATE TABLE "new_GradoInstruccion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);
INSERT INTO "new_GradoInstruccion" ("id") SELECT "id" FROM "GradoInstruccion";
DROP TABLE "GradoInstruccion";
ALTER TABLE "new_GradoInstruccion" RENAME TO "GradoInstruccion";
CREATE TABLE "new_Hijo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trabajadorId" INTEGER NOT NULL,
    "apellidosYNombres" TEXT NOT NULL,
    "ubigeoId" INTEGER NOT NULL,
    "fechaNacimiento" DATETIME NOT NULL,
    "edad" INTEGER NOT NULL,
    CONSTRAINT "Hijo_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Hijo_ubigeoId_fkey" FOREIGN KEY ("ubigeoId") REFERENCES "Ubigeo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Hijo" ("apellidosYNombres", "edad", "id", "trabajadorId") SELECT "apellidosYNombres", "edad", "id", "trabajadorId" FROM "Hijo";
DROP TABLE "Hijo";
ALTER TABLE "new_Hijo" RENAME TO "Hijo";
CREATE TABLE "new_Trabajador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apellidoPaterno" TEXT NOT NULL,
    "apellidoMaterno" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "dni" TEXT NOT NULL,
    "nroAutogenerado" TEXT NOT NULL,
    "licenciaConducir" TEXT NOT NULL,
    "grupoSanguineo" TEXT NOT NULL,
    "fechaIngreso" DATETIME NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "fechaNacimiento" DATETIME NOT NULL,
    "ubigeoId" INTEGER NOT NULL,
    "domicilio" TEXT NOT NULL,
    "interiorUrbanizacion" TEXT NOT NULL,
    "telefonoFijo" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "correoElectronico" TEXT NOT NULL,
    "personalDiscapacidad" BOOLEAN NOT NULL,
    "regimenPensionarioId" INTEGER NOT NULL,
    "situacionLaboral" TEXT NOT NULL,
    "estadoCivil" TEXT NOT NULL,
    CONSTRAINT "Trabajador_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Trabajador_ubigeoId_fkey" FOREIGN KEY ("ubigeoId") REFERENCES "Ubigeo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Trabajador_regimenPensionarioId_fkey" FOREIGN KEY ("regimenPensionarioId") REFERENCES "RegimenPensionario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Trabajador" ("apellidoMaterno", "apellidoPaterno", "celular", "correoElectronico", "dni", "domicilio", "edad", "estadoCivil", "fechaIngreso", "fechaNacimiento", "grupoSanguineo", "id", "interiorUrbanizacion", "licenciaConducir", "nombres", "nroAutogenerado", "personalDiscapacidad", "sexo", "situacionLaboral", "telefonoFijo") SELECT "apellidoMaterno", "apellidoPaterno", "celular", "correoElectronico", "dni", "domicilio", "edad", "estadoCivil", "fechaIngreso", "fechaNacimiento", "grupoSanguineo", "id", "interiorUrbanizacion", "licenciaConducir", "nombres", "nroAutogenerado", "personalDiscapacidad", "sexo", "situacionLaboral", "telefonoFijo" FROM "Trabajador";
DROP TABLE "Trabajador";
ALTER TABLE "new_Trabajador" RENAME TO "Trabajador";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Cargo_nombre_key" ON "Cargo"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "_GradoInstruccionToHijo_AB_unique" ON "_GradoInstruccionToHijo"("A", "B");

-- CreateIndex
CREATE INDEX "_GradoInstruccionToHijo_B_index" ON "_GradoInstruccionToHijo"("B");
