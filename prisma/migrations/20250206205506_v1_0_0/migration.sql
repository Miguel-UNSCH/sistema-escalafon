/*
  Warnings:

  - You are about to drop the `Trabajador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GradoInstruccionToHijo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `trabajadorId` on the `ActaEntrega` table. All the data in the column will be lost.
  - You are about to drop the column `papCnp` on the `Ascenso` table. All the data in the column will be lost.
  - You are about to drop the column `trabajadorId` on the `Ascenso` table. All the data in the column will be lost.
  - You are about to drop the column `trabajadorId` on the `BonificacionFamiliar` table. All the data in the column will be lost.
  - You are about to drop the column `trabajadorId` on the `BonificacionPersonal` table. All the data in the column will be lost.
  - You are about to drop the column `trabajadorId` on the `Capacitacion` table. All the data in the column will be lost.
  - You are about to drop the column `trabajadorId` on the `ConstanciaPago` table. All the data in the column will be lost.
  - You are about to drop the column `trabajadorId` on the `Contrato` table. All the data in the column will be lost.
  - You are about to drop the column `trabajadorId` on the `Conyuge` table. All the data in the column will be lost.
  - You are about to drop the column `trabajadorId` on the `Demerito` table. All the data in the column will be lost.
  - You are about to drop the column `trabajadorId` on the `DescansoMedico` table. All the data in the column will be lost.
  - You are about to drop the column `cargo` on the `Desplazamiento` table. All the data in the column will be lost.
  - You are about to drop the column `trabajadorId` on the `Desplazamiento` table. All the data in the column will be lost.
  - You are about to drop the column `cargo` on the `Discapacidad` table. All the data in the column will be lost.
  - You are about to drop the column `organoEstructurado` on the `Discapacidad` table. All the data in the column will be lost.
  - You are about to drop the column `trabajadorId` on the `Discapacidad` table. All the data in the column will be lost.
  - You are about to drop the column `trabajadorId` on the `Estudio` table. All the data in the column will be lost.
  - You are about to drop the column `trabajadorId` on the `ExperienciaLaboral` table. All the data in the column will be lost.
  - You are about to drop the column `trabajadorId` on the `FichaEvaluacion` table. All the data in the column will be lost.
  - You are about to drop the column `trabajadorId` on the `FormacionAcademica` table. All the data in the column will be lost.
  - You are about to drop the column `trabajadorId` on the `Hijo` table. All the data in the column will be lost.
  - You are about to drop the column `trabajadorId` on the `Merito` table. All the data in the column will be lost.
  - You are about to drop the column `trabajadorId` on the `PermisoLicenciaVacaciones` table. All the data in the column will be lost.
  - You are about to drop the column `trabajadorId` on the `Renuncia` table. All the data in the column will be lost.
  - Added the required column `personalId` to the `ActaEntrega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cnp` to the `Ascenso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pap` to the `Ascenso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalId` to the `Ascenso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalId` to the `BonificacionFamiliar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalId` to the `BonificacionPersonal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalId` to the `Capacitacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalId` to the `ConstanciaPago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalId` to the `Contrato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalId` to the `Conyuge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalId` to the `Demerito` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalId` to the `DescansoMedico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cargoActual` to the `Desplazamiento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cargoNuevo` to the `Desplazamiento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalId` to the `Desplazamiento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalId` to the `Discapacidad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalId` to the `Estudio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalId` to the `ExperienciaLaboral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalId` to the `FichaEvaluacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalId` to the `FormacionAcademica` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalId` to the `Hijo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalId` to the `Merito` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idDireccion` to the `Oficina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalId` to the `PermisoLicenciaVacaciones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalId` to the `Renuncia` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_GradoInstruccionToHijo_B_index";

-- DropIndex
DROP INDEX "_GradoInstruccionToHijo_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Trabajador";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_GradoInstruccionToHijo";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Personal" (
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
    "fechaNacimiento" DATETIME NOT NULL,
    "domicilio" TEXT NOT NULL,
    "interiorUrbanizacion" TEXT NOT NULL,
    "telefonoFijo" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "correoElectronico" TEXT NOT NULL,
    "personalDiscapacidad" BOOLEAN NOT NULL,
    "estadoCivil" TEXT NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "ubigeoId" INTEGER NOT NULL,
    "regimenPensionarioId" INTEGER NOT NULL,
    "situacionLaboral" TEXT NOT NULL,
    "idJerarquia" INTEGER NOT NULL,
    CONSTRAINT "Personal_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Personal_ubigeoId_fkey" FOREIGN KEY ("ubigeoId") REFERENCES "Ubigeo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Personal_regimenPensionarioId_fkey" FOREIGN KEY ("regimenPensionarioId") REFERENCES "RegimenPensionario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Personal_idJerarquia_fkey" FOREIGN KEY ("idJerarquia") REFERENCES "Jerarquia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GobiernoRegional" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "sede" TEXT,
    "codigoRegion" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GerenciaRegional" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "idGobierno" INTEGER NOT NULL,
    CONSTRAINT "GerenciaRegional_idGobierno_fkey" FOREIGN KEY ("idGobierno") REFERENCES "GobiernoRegional" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Subgerencia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "idGerencia" INTEGER NOT NULL,
    CONSTRAINT "Subgerencia_idGerencia_fkey" FOREIGN KEY ("idGerencia") REFERENCES "GerenciaRegional" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DireccionRegional" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "idGerencia" INTEGER NOT NULL,
    CONSTRAINT "DireccionRegional_idGerencia_fkey" FOREIGN KEY ("idGerencia") REFERENCES "GerenciaRegional" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProgramaRegional" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "idGerencia" INTEGER NOT NULL,
    CONSTRAINT "ProgramaRegional_idGerencia_fkey" FOREIGN KEY ("idGerencia") REFERENCES "GerenciaRegional" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ConsejoRegional" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "idGobierno" INTEGER NOT NULL,
    CONSTRAINT "ConsejoRegional_idGobierno_fkey" FOREIGN KEY ("idGobierno") REFERENCES "GobiernoRegional" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Vicegobernacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "idGobierno" INTEGER NOT NULL,
    CONSTRAINT "Vicegobernacion_idGobierno_fkey" FOREIGN KEY ("idGobierno") REFERENCES "GobiernoRegional" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Procuraduria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "idGobierno" INTEGER NOT NULL,
    CONSTRAINT "Procuraduria_idGobierno_fkey" FOREIGN KEY ("idGobierno") REFERENCES "GobiernoRegional" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrganoDeControl" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "idGobierno" INTEGER NOT NULL,
    CONSTRAINT "OrganoDeControl_idGobierno_fkey" FOREIGN KEY ("idGobierno") REFERENCES "GobiernoRegional" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Jerarquia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "idReferencia" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ActaEntrega" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personalId" INTEGER NOT NULL,
    "personaRecibeActa" TEXT NOT NULL,
    "documentoActa" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "fechaInicio" DATETIME NOT NULL,
    "fechaFin" DATETIME NOT NULL,
    CONSTRAINT "ActaEntrega_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ActaEntrega" ("cargo", "dependenciaOficina", "documentoActa", "fechaFin", "fechaInicio", "id", "personaRecibeActa") SELECT "cargo", "dependenciaOficina", "documentoActa", "fechaFin", "fechaInicio", "id", "personaRecibeActa" FROM "ActaEntrega";
DROP TABLE "ActaEntrega";
ALTER TABLE "new_ActaEntrega" RENAME TO "ActaEntrega";
CREATE TABLE "new_Ascenso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personalId" INTEGER NOT NULL,
    "cargoAnteriorId" INTEGER NOT NULL,
    "cargoActualId" INTEGER NOT NULL,
    "nivelRemunerativo" TEXT NOT NULL,
    "pap" TEXT NOT NULL,
    "cnp" TEXT NOT NULL,
    "fechaAscenso" DATETIME NOT NULL,
    CONSTRAINT "Ascenso_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ascenso_cargoAnteriorId_fkey" FOREIGN KEY ("cargoAnteriorId") REFERENCES "Cargo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ascenso_cargoActualId_fkey" FOREIGN KEY ("cargoActualId") REFERENCES "Cargo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ascenso" ("cargoActualId", "cargoAnteriorId", "fechaAscenso", "id", "nivelRemunerativo") SELECT "cargoActualId", "cargoAnteriorId", "fechaAscenso", "id", "nivelRemunerativo" FROM "Ascenso";
DROP TABLE "Ascenso";
ALTER TABLE "new_Ascenso" RENAME TO "Ascenso";
CREATE TABLE "new_BonificacionFamiliar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personalId" INTEGER NOT NULL,
    "tipoBonificacion" TEXT NOT NULL,
    "documentoBonificacion" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    CONSTRAINT "BonificacionFamiliar_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BonificacionFamiliar" ("cargo", "dependenciaOficina", "documentoBonificacion", "id", "tipoBonificacion") SELECT "cargo", "dependenciaOficina", "documentoBonificacion", "id", "tipoBonificacion" FROM "BonificacionFamiliar";
DROP TABLE "BonificacionFamiliar";
ALTER TABLE "new_BonificacionFamiliar" RENAME TO "BonificacionFamiliar";
CREATE TABLE "new_BonificacionPersonal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personalId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "tipoBonificacion" TEXT NOT NULL,
    "documentoBonificacion" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    CONSTRAINT "BonificacionPersonal_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BonificacionPersonal_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BonificacionPersonal" ("cargoId", "dependenciaOficina", "documentoBonificacion", "id", "tipoBonificacion") SELECT "cargoId", "dependenciaOficina", "documentoBonificacion", "id", "tipoBonificacion" FROM "BonificacionPersonal";
DROP TABLE "BonificacionPersonal";
ALTER TABLE "new_BonificacionPersonal" RENAME TO "BonificacionPersonal";
CREATE TABLE "new_Capacitacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personalId" INTEGER NOT NULL,
    "centroCapacitacion" TEXT NOT NULL,
    "materia" TEXT NOT NULL,
    "profesionEspecialidad" TEXT NOT NULL,
    "periodoInicio" DATETIME NOT NULL,
    "periodoFin" DATETIME NOT NULL,
    "horasLectivas" INTEGER NOT NULL,
    "fechaEmision" DATETIME NOT NULL,
    "certificadoPdf" TEXT NOT NULL,
    CONSTRAINT "Capacitacion_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Capacitacion" ("centroCapacitacion", "certificadoPdf", "fechaEmision", "horasLectivas", "id", "materia", "periodoFin", "periodoInicio", "profesionEspecialidad") SELECT "centroCapacitacion", "certificadoPdf", "fechaEmision", "horasLectivas", "id", "materia", "periodoFin", "periodoInicio", "profesionEspecialidad" FROM "Capacitacion";
DROP TABLE "Capacitacion";
ALTER TABLE "new_Capacitacion" RENAME TO "Capacitacion";
CREATE TABLE "new_ConstanciaPago" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personalId" INTEGER NOT NULL,
    "documentoPago" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "nivelRemunerativo" TEXT NOT NULL,
    "papCnp" TEXT NOT NULL,
    "diasLaboradosInicio" DATETIME NOT NULL,
    "diasLaboradosFin" DATETIME NOT NULL,
    CONSTRAINT "ConstanciaPago_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ConstanciaPago" ("cargo", "dependenciaOficina", "diasLaboradosFin", "diasLaboradosInicio", "documentoPago", "id", "nivelRemunerativo", "papCnp") SELECT "cargo", "dependenciaOficina", "diasLaboradosFin", "diasLaboradosInicio", "documentoPago", "id", "nivelRemunerativo", "papCnp" FROM "ConstanciaPago";
DROP TABLE "ConstanciaPago";
ALTER TABLE "new_ConstanciaPago" RENAME TO "ConstanciaPago";
CREATE TABLE "new_Contrato" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personalId" INTEGER NOT NULL,
    "oficinaId" INTEGER NOT NULL,
    "cargoEstructural" TEXT NOT NULL,
    "regimenLaboral" TEXT NOT NULL,
    "nivelRemuneracion" TEXT NOT NULL,
    "papCnp" TEXT NOT NULL,
    "fechaIngreso" DATETIME NOT NULL,
    "fechaCese" DATETIME NOT NULL,
    CONSTRAINT "Contrato_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Contrato_oficinaId_fkey" FOREIGN KEY ("oficinaId") REFERENCES "Oficina" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Contrato" ("cargoEstructural", "fechaCese", "fechaIngreso", "id", "nivelRemuneracion", "oficinaId", "papCnp", "regimenLaboral") SELECT "cargoEstructural", "fechaCese", "fechaIngreso", "id", "nivelRemuneracion", "oficinaId", "papCnp", "regimenLaboral" FROM "Contrato";
DROP TABLE "Contrato";
ALTER TABLE "new_Contrato" RENAME TO "Contrato";
CREATE TABLE "new_Conyuge" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personalId" INTEGER NOT NULL,
    "apellidosYNombres" TEXT NOT NULL,
    "ubigeoId" INTEGER NOT NULL,
    "fechaNacimiento" DATETIME NOT NULL,
    "gradoInstruccion" TEXT NOT NULL,
    "profesion" TEXT NOT NULL,
    "ocupacion" TEXT NOT NULL,
    "centroTrabajo" TEXT NOT NULL,
    "postgradoEspecializacion" TEXT NOT NULL,
    CONSTRAINT "Conyuge_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Conyuge_ubigeoId_fkey" FOREIGN KEY ("ubigeoId") REFERENCES "Ubigeo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Conyuge" ("apellidosYNombres", "centroTrabajo", "fechaNacimiento", "gradoInstruccion", "id", "ocupacion", "postgradoEspecializacion", "profesion", "ubigeoId") SELECT "apellidosYNombres", "centroTrabajo", "fechaNacimiento", "gradoInstruccion", "id", "ocupacion", "postgradoEspecializacion", "profesion", "ubigeoId" FROM "Conyuge";
DROP TABLE "Conyuge";
ALTER TABLE "new_Conyuge" RENAME TO "Conyuge";
CREATE UNIQUE INDEX "Conyuge_personalId_key" ON "Conyuge"("personalId");
CREATE TABLE "new_Demerito" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personalId" INTEGER NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "tipoSancion" TEXT NOT NULL,
    "fechaInicio" DATETIME NOT NULL,
    "fechaFin" DATETIME NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    CONSTRAINT "Demerito_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Demerito" ("cargo", "dependenciaOficina", "documentoSustento", "fechaFin", "fechaInicio", "id", "tipoSancion") SELECT "cargo", "dependenciaOficina", "documentoSustento", "fechaFin", "fechaInicio", "id", "tipoSancion" FROM "Demerito";
DROP TABLE "Demerito";
ALTER TABLE "new_Demerito" RENAME TO "Demerito";
CREATE TABLE "new_DescansoMedico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personalId" INTEGER NOT NULL,
    "tipoDescanso" TEXT NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "fechaInicio" DATETIME NOT NULL,
    "fechaFin" DATETIME NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    CONSTRAINT "DescansoMedico_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DescansoMedico" ("cargo", "dependenciaOficina", "documentoSustento", "fechaFin", "fechaInicio", "id", "tipoDescanso") SELECT "cargo", "dependenciaOficina", "documentoSustento", "fechaFin", "fechaInicio", "id", "tipoDescanso" FROM "DescansoMedico";
DROP TABLE "DescansoMedico";
ALTER TABLE "new_DescansoMedico" RENAME TO "DescansoMedico";
CREATE TABLE "new_Desplazamiento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personalId" INTEGER NOT NULL,
    "tipoDesplazamiento" TEXT NOT NULL,
    "documentoRotacion" TEXT NOT NULL,
    "fechaDesplazamiento" DATETIME NOT NULL,
    "oficinaOrigen" TEXT NOT NULL,
    "oficinaDestino" TEXT NOT NULL,
    "cargoActual" TEXT NOT NULL,
    "cargoNuevo" TEXT NOT NULL,
    CONSTRAINT "Desplazamiento_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Desplazamiento" ("documentoRotacion", "fechaDesplazamiento", "id", "oficinaDestino", "oficinaOrigen", "tipoDesplazamiento") SELECT "documentoRotacion", "fechaDesplazamiento", "id", "oficinaDestino", "oficinaOrigen", "tipoDesplazamiento" FROM "Desplazamiento";
DROP TABLE "Desplazamiento";
ALTER TABLE "new_Desplazamiento" RENAME TO "Desplazamiento";
CREATE TABLE "new_Discapacidad" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personalId" INTEGER NOT NULL,
    "tipoDiscapacidad" TEXT NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "condicionLaboral" TEXT NOT NULL,
    CONSTRAINT "Discapacidad_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Discapacidad" ("condicionLaboral", "documentoSustento", "id", "tipoDiscapacidad") SELECT "condicionLaboral", "documentoSustento", "id", "tipoDiscapacidad" FROM "Discapacidad";
DROP TABLE "Discapacidad";
ALTER TABLE "new_Discapacidad" RENAME TO "Discapacidad";
CREATE TABLE "new_Estudio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personalId" INTEGER NOT NULL,
    "formacionAcademica" TEXT NOT NULL,
    "anoInicio" INTEGER NOT NULL,
    "anoFin" INTEGER NOT NULL,
    "institucion" TEXT NOT NULL,
    "otrosEstudios" TEXT NOT NULL,
    CONSTRAINT "Estudio_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Estudio" ("anoFin", "anoInicio", "formacionAcademica", "id", "institucion", "otrosEstudios") SELECT "anoFin", "anoInicio", "formacionAcademica", "id", "institucion", "otrosEstudios" FROM "Estudio";
DROP TABLE "Estudio";
ALTER TABLE "new_Estudio" RENAME TO "Estudio";
CREATE TABLE "new_ExperienciaLaboral" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personalId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "centroLaboral" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "periodoInicio" DATETIME NOT NULL,
    "periodoFin" DATETIME NOT NULL,
    "fechaEmision" DATETIME NOT NULL,
    CONSTRAINT "ExperienciaLaboral_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExperienciaLaboral_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ExperienciaLaboral" ("cargoId", "centroLaboral", "dependenciaOficina", "documentoSustento", "fechaEmision", "id", "periodoFin", "periodoInicio") SELECT "cargoId", "centroLaboral", "dependenciaOficina", "documentoSustento", "fechaEmision", "id", "periodoFin", "periodoInicio" FROM "ExperienciaLaboral";
DROP TABLE "ExperienciaLaboral";
ALTER TABLE "new_ExperienciaLaboral" RENAME TO "ExperienciaLaboral";
CREATE TABLE "new_FichaEvaluacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personalId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "fechaEvaluacion" DATETIME NOT NULL,
    CONSTRAINT "FichaEvaluacion_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FichaEvaluacion_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FichaEvaluacion" ("cargoId", "dependenciaOficina", "documentoSustento", "fechaEvaluacion", "id") SELECT "cargoId", "dependenciaOficina", "documentoSustento", "fechaEvaluacion", "id" FROM "FichaEvaluacion";
DROP TABLE "FichaEvaluacion";
ALTER TABLE "new_FichaEvaluacion" RENAME TO "FichaEvaluacion";
CREATE TABLE "new_FormacionAcademica" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personalId" INTEGER NOT NULL,
    "gradoId" INTEGER NOT NULL,
    "campoEstudio" TEXT NOT NULL,
    "institucion" TEXT NOT NULL,
    "fechaInicio" DATETIME NOT NULL,
    "fechaFin" DATETIME NOT NULL,
    CONSTRAINT "FormacionAcademica_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FormacionAcademica" ("campoEstudio", "fechaFin", "fechaInicio", "gradoId", "id", "institucion") SELECT "campoEstudio", "fechaFin", "fechaInicio", "gradoId", "id", "institucion" FROM "FormacionAcademica";
DROP TABLE "FormacionAcademica";
ALTER TABLE "new_FormacionAcademica" RENAME TO "FormacionAcademica";
CREATE TABLE "new_Hijo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personalId" INTEGER NOT NULL,
    "apellidosYNombres" TEXT NOT NULL,
    "ubigeoId" INTEGER NOT NULL,
    "fechaNacimiento" DATETIME NOT NULL,
    "edad" INTEGER NOT NULL,
    CONSTRAINT "Hijo_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Hijo_ubigeoId_fkey" FOREIGN KEY ("ubigeoId") REFERENCES "Ubigeo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Hijo" ("apellidosYNombres", "edad", "fechaNacimiento", "id", "ubigeoId") SELECT "apellidosYNombres", "edad", "fechaNacimiento", "id", "ubigeoId" FROM "Hijo";
DROP TABLE "Hijo";
ALTER TABLE "new_Hijo" RENAME TO "Hijo";
CREATE TABLE "new_Merito" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personalId" INTEGER NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "fechaMerito" DATETIME NOT NULL,
    CONSTRAINT "Merito_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Merito" ("cargo", "dependenciaOficina", "documentoSustento", "fechaMerito", "id") SELECT "cargo", "dependenciaOficina", "documentoSustento", "fechaMerito", "id" FROM "Merito";
DROP TABLE "Merito";
ALTER TABLE "new_Merito" RENAME TO "Merito";
CREATE TABLE "new_Oficina" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "idDireccion" INTEGER NOT NULL,
    CONSTRAINT "Oficina_idDireccion_fkey" FOREIGN KEY ("idDireccion") REFERENCES "DireccionRegional" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Oficina" ("id", "nombre") SELECT "id", "nombre" FROM "Oficina";
DROP TABLE "Oficina";
ALTER TABLE "new_Oficina" RENAME TO "Oficina";
CREATE TABLE "new_PermisoLicenciaVacaciones" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personalId" INTEGER NOT NULL,
    "tipoPermiso" TEXT NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "fechaInicio" DATETIME NOT NULL,
    "fechaFin" DATETIME NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    CONSTRAINT "PermisoLicenciaVacaciones_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PermisoLicenciaVacaciones" ("cargo", "dependenciaOficina", "documentoSustento", "fechaFin", "fechaInicio", "id", "tipoPermiso") SELECT "cargo", "dependenciaOficina", "documentoSustento", "fechaFin", "fechaInicio", "id", "tipoPermiso" FROM "PermisoLicenciaVacaciones";
DROP TABLE "PermisoLicenciaVacaciones";
ALTER TABLE "new_PermisoLicenciaVacaciones" RENAME TO "PermisoLicenciaVacaciones";
CREATE TABLE "new_Renuncia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personalId" INTEGER NOT NULL,
    "documentoRenuncia" TEXT NOT NULL,
    "motivoRenuncia" TEXT NOT NULL,
    "fechaRenuncia" DATETIME NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    CONSTRAINT "Renuncia_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Renuncia" ("cargo", "dependenciaOficina", "documentoRenuncia", "fechaRenuncia", "id", "motivoRenuncia") SELECT "cargo", "dependenciaOficina", "documentoRenuncia", "fechaRenuncia", "id", "motivoRenuncia" FROM "Renuncia";
DROP TABLE "Renuncia";
ALTER TABLE "new_Renuncia" RENAME TO "Renuncia";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "GobiernoRegional_codigoRegion_key" ON "GobiernoRegional"("codigoRegion");

-- CreateIndex
CREATE UNIQUE INDEX "Vicegobernacion_idGobierno_key" ON "Vicegobernacion"("idGobierno");

-- CreateIndex
CREATE UNIQUE INDEX "Procuraduria_idGobierno_key" ON "Procuraduria"("idGobierno");

-- CreateIndex
CREATE UNIQUE INDEX "OrganoDeControl_idGobierno_key" ON "OrganoDeControl"("idGobierno");
