/*
  Warnings:

  - You are about to drop the `ActaEntrega` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ascenso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BonificacionFamiliar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BonificacionPersonal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ConsejoRegional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ConstanciaPago` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contrato` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Demerito` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DescansoMedico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Desplazamiento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DireccionRegional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Estudio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FichaEvaluacion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FormacionAcademica` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GerenciaRegional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GobiernoRegional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GradoInstruccion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Jerarquia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Merito` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Oficina` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrganoDeControl` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PermisoLicenciaVacaciones` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Procuraduria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProgramaRegional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RegimenPensionario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Renuncia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subgerencia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vicegobernacion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `periodoFin` on the `Capacitacion` table. All the data in the column will be lost.
  - You are about to drop the column `periodoInicio` on the `Capacitacion` table. All the data in the column will be lost.
  - You are about to drop the column `profesionEspecialidad` on the `Capacitacion` table. All the data in the column will be lost.
  - You are about to drop the column `apellidosYNombres` on the `Conyuge` table. All the data in the column will be lost.
  - You are about to drop the column `postgradoEspecializacion` on the `Conyuge` table. All the data in the column will be lost.
  - You are about to drop the column `tipoDiscapacidad` on the `Discapacidad` table. All the data in the column will be lost.
  - You are about to drop the column `cargoId` on the `ExperienciaLaboral` table. All the data in the column will be lost.
  - You are about to drop the column `centroLaboral` on the `ExperienciaLaboral` table. All the data in the column will be lost.
  - You are about to drop the column `dependenciaOficina` on the `ExperienciaLaboral` table. All the data in the column will be lost.
  - You are about to drop the column `periodoFin` on the `ExperienciaLaboral` table. All the data in the column will be lost.
  - You are about to drop the column `periodoInicio` on the `ExperienciaLaboral` table. All the data in the column will be lost.
  - You are about to drop the column `apellidosYNombres` on the `Hijo` table. All the data in the column will be lost.
  - You are about to drop the column `correoElectronico` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `domicilio` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `grupoSanguineo` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `idJerarquia` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `interiorUrbanizacion` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `licenciaConducir` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `nroAutogenerado` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `personalDiscapacidad` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `regimenPensionarioId` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `telefonoFijo` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `departamentoRegion` on the `Ubigeo` table. All the data in the column will be lost.
  - You are about to drop the column `nacionalidad` on the `Ubigeo` table. All the data in the column will be lost.
  - Added the required column `especialidad` to the `Capacitacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaInicio` to the `Capacitacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombres` to the `Conyuge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Discapacidad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cargo` to the `ExperienciaLaboral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `centroLabor` to the `ExperienciaLaboral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaInicio` to the `ExperienciaLaboral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombres` to the `Hijo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departamento` to the `Ubigeo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Cargo_nombre_key";

-- DropIndex
DROP INDEX "GobiernoRegional_codigoRegion_key";

-- DropIndex
DROP INDEX "OrganoDeControl_idGobierno_key";

-- DropIndex
DROP INDEX "Procuraduria_idGobierno_key";

-- DropIndex
DROP INDEX "Vicegobernacion_idGobierno_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ActaEntrega";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Ascenso";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BonificacionFamiliar";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BonificacionPersonal";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ConsejoRegional";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ConstanciaPago";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Contrato";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Demerito";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DescansoMedico";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Desplazamiento";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DireccionRegional";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Estudio";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FichaEvaluacion";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FormacionAcademica";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "GerenciaRegional";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "GobiernoRegional";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "GradoInstruccion";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Jerarquia";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Merito";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Oficina";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "OrganoDeControl";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PermisoLicenciaVacaciones";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Procuraduria";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProgramaRegional";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RegimenPensionario";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Renuncia";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Subgerencia";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Vicegobernacion";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Estudios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personalId" INTEGER NOT NULL,
    "nivel" TEXT NOT NULL,
    "anioInicio" INTEGER NOT NULL,
    "anioFin" INTEGER,
    "institucion" TEXT NOT NULL,
    "otrosEstudios" TEXT,
    CONSTRAINT "Estudios_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Capacitacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personalId" INTEGER NOT NULL,
    "centroCapacitacion" TEXT NOT NULL,
    "materia" TEXT NOT NULL,
    "especialidad" TEXT NOT NULL,
    "fechaInicio" DATETIME NOT NULL,
    "fechaFin" DATETIME,
    "horasLectivas" INTEGER,
    "fechaEmision" DATETIME,
    "certificadoPdf" TEXT,
    CONSTRAINT "Capacitacion_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Capacitacion" ("centroCapacitacion", "certificadoPdf", "fechaEmision", "horasLectivas", "id", "materia", "personalId") SELECT "centroCapacitacion", "certificadoPdf", "fechaEmision", "horasLectivas", "id", "materia", "personalId" FROM "Capacitacion";
DROP TABLE "Capacitacion";
ALTER TABLE "new_Capacitacion" RENAME TO "Capacitacion";
CREATE TABLE "new_Conyuge" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personalId" INTEGER NOT NULL,
    "nombres" TEXT NOT NULL,
    "fechaNacimiento" DATETIME NOT NULL,
    "gradoInstruccion" TEXT,
    "profesion" TEXT,
    "ocupacion" TEXT,
    "centroTrabajo" TEXT,
    "postgrado" TEXT,
    "ubigeoId" INTEGER NOT NULL,
    CONSTRAINT "Conyuge_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Conyuge_ubigeoId_fkey" FOREIGN KEY ("ubigeoId") REFERENCES "Ubigeo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Conyuge" ("centroTrabajo", "fechaNacimiento", "gradoInstruccion", "id", "ocupacion", "personalId", "profesion", "ubigeoId") SELECT "centroTrabajo", "fechaNacimiento", "gradoInstruccion", "id", "ocupacion", "personalId", "profesion", "ubigeoId" FROM "Conyuge";
DROP TABLE "Conyuge";
ALTER TABLE "new_Conyuge" RENAME TO "Conyuge";
CREATE UNIQUE INDEX "Conyuge_personalId_key" ON "Conyuge"("personalId");
CREATE TABLE "new_Discapacidad" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personalId" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "documentoSustento" TEXT,
    "organoEstructurado" TEXT,
    "condicionLaboral" TEXT,
    CONSTRAINT "Discapacidad_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Discapacidad" ("condicionLaboral", "documentoSustento", "id", "personalId") SELECT "condicionLaboral", "documentoSustento", "id", "personalId" FROM "Discapacidad";
DROP TABLE "Discapacidad";
ALTER TABLE "new_Discapacidad" RENAME TO "Discapacidad";
CREATE UNIQUE INDEX "Discapacidad_personalId_key" ON "Discapacidad"("personalId");
CREATE TABLE "new_ExperienciaLaboral" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personalId" INTEGER NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "centroLabor" TEXT NOT NULL,
    "dependencia" TEXT,
    "cargo" TEXT NOT NULL,
    "fechaInicio" DATETIME NOT NULL,
    "fechaFin" DATETIME,
    "fechaEmision" DATETIME,
    CONSTRAINT "ExperienciaLaboral_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ExperienciaLaboral" ("documentoSustento", "fechaEmision", "id", "personalId") SELECT "documentoSustento", "fechaEmision", "id", "personalId" FROM "ExperienciaLaboral";
DROP TABLE "ExperienciaLaboral";
ALTER TABLE "new_ExperienciaLaboral" RENAME TO "ExperienciaLaboral";
CREATE TABLE "new_Hijo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personalId" INTEGER NOT NULL,
    "nombres" TEXT NOT NULL,
    "fechaNacimiento" DATETIME NOT NULL,
    "edad" INTEGER,
    "gradoInstruccion" TEXT,
    "ubigeoId" INTEGER NOT NULL,
    CONSTRAINT "Hijo_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Hijo_ubigeoId_fkey" FOREIGN KEY ("ubigeoId") REFERENCES "Ubigeo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Hijo" ("edad", "fechaNacimiento", "id", "personalId", "ubigeoId") SELECT "edad", "fechaNacimiento", "id", "personalId", "ubigeoId" FROM "Hijo";
DROP TABLE "Hijo";
ALTER TABLE "new_Hijo" RENAME TO "Hijo";
CREATE TABLE "new_Personal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apellidoPaterno" TEXT NOT NULL,
    "apellidoMaterno" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "dni" TEXT NOT NULL,
    "fechaNacimiento" DATETIME NOT NULL,
    "fechaIngreso" DATETIME NOT NULL,
    "telefono" TEXT,
    "celular" TEXT,
    "email" TEXT,
    "regimenPensionario" TEXT,
    "nombreAfp" TEXT,
    "situacionLaboral" TEXT,
    "estadoCivil" TEXT,
    "ubigeoId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,
    CONSTRAINT "Personal_ubigeoId_fkey" FOREIGN KEY ("ubigeoId") REFERENCES "Ubigeo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Personal_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Personal" ("apellidoMaterno", "apellidoPaterno", "cargoId", "celular", "dni", "edad", "estadoCivil", "fechaIngreso", "fechaNacimiento", "id", "nombres", "sexo", "situacionLaboral", "ubigeoId") SELECT "apellidoMaterno", "apellidoPaterno", "cargoId", "celular", "dni", "edad", "estadoCivil", "fechaIngreso", "fechaNacimiento", "id", "nombres", "sexo", "situacionLaboral", "ubigeoId" FROM "Personal";
DROP TABLE "Personal";
ALTER TABLE "new_Personal" RENAME TO "Personal";
CREATE UNIQUE INDEX "Personal_dni_key" ON "Personal"("dni");
CREATE TABLE "new_Ubigeo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "departamento" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "distrito" TEXT NOT NULL
);
INSERT INTO "new_Ubigeo" ("distrito", "id", "provincia") SELECT "distrito", "id", "provincia" FROM "Ubigeo";
DROP TABLE "Ubigeo";
ALTER TABLE "new_Ubigeo" RENAME TO "Ubigeo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
