/*
  Warnings:

  - You are about to drop the `ContratoProyectoInversion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContratoYNombramiento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DatosPersonales` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EstudiosYCaptacion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PermisosLicenciasVacaciones` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PersonalConDiscapacidad` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PracticaDL1401` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RenunciaYLiquidacion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TipoContratoCAS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `apellidosYNombres` on the `ActaEntrega` table. All the data in the column will be lost.
  - You are about to drop the column `documentoSustento` on the `ActaEntrega` table. All the data in the column will be lost.
  - You are about to drop the column `fechaDesde` on the `ActaEntrega` table. All the data in the column will be lost.
  - You are about to drop the column `fechaHasta` on the `ActaEntrega` table. All the data in the column will be lost.
  - You are about to drop the column `quienRecibe` on the `ActaEntrega` table. All the data in the column will be lost.
  - You are about to drop the column `apellidosYNombres` on the `Ascenso` table. All the data in the column will be lost.
  - You are about to drop the column `cargoNuevo` on the `Ascenso` table. All the data in the column will be lost.
  - You are about to drop the column `cnpAnterior` on the `Ascenso` table. All the data in the column will be lost.
  - You are about to drop the column `cnpNuevo` on the `Ascenso` table. All the data in the column will be lost.
  - You are about to drop the column `dependenciaOficina` on the `Ascenso` table. All the data in the column will be lost.
  - You are about to drop the column `nivelRemunerativoAnterior` on the `Ascenso` table. All the data in the column will be lost.
  - You are about to drop the column `nivelRemunerativoNuevo` on the `Ascenso` table. All the data in the column will be lost.
  - You are about to drop the column `papAnterior` on the `Ascenso` table. All the data in the column will be lost.
  - You are about to drop the column `papNuevo` on the `Ascenso` table. All the data in the column will be lost.
  - You are about to drop the column `resolucionAscenso` on the `Ascenso` table. All the data in the column will be lost.
  - You are about to drop the column `apellidosYNombres` on the `BonificacionFamiliar` table. All the data in the column will be lost.
  - You are about to drop the column `resolucionBonificacion` on the `BonificacionFamiliar` table. All the data in the column will be lost.
  - You are about to drop the column `apellidosYNombres` on the `BonificacionPersonal` table. All the data in the column will be lost.
  - You are about to drop the column `resolucionBonificacion` on the `BonificacionPersonal` table. All the data in the column will be lost.
  - You are about to drop the column `apellidosYNombres` on the `ConstanciaPago` table. All the data in the column will be lost.
  - You are about to drop the column `cnp` on the `ConstanciaPago` table. All the data in the column will be lost.
  - You are about to drop the column `diasLaboradosDesde` on the `ConstanciaPago` table. All the data in the column will be lost.
  - You are about to drop the column `diasLaboradosHasta` on the `ConstanciaPago` table. All the data in the column will be lost.
  - You are about to drop the column `documentoSustento` on the `ConstanciaPago` table. All the data in the column will be lost.
  - You are about to drop the column `pap` on the `ConstanciaPago` table. All the data in the column will be lost.
  - You are about to drop the column `anoPostgrado` on the `Conyuge` table. All the data in the column will be lost.
  - You are about to drop the column `datosPersonalesId` on the `Conyuge` table. All the data in the column will be lost.
  - You are about to drop the column `departamento` on the `Conyuge` table. All the data in the column will be lost.
  - You are about to drop the column `distrito` on the `Conyuge` table. All the data in the column will be lost.
  - You are about to drop the column `fechaNacimiento` on the `Conyuge` table. All the data in the column will be lost.
  - You are about to drop the column `lugarNacimiento` on the `Conyuge` table. All the data in the column will be lost.
  - You are about to drop the column `postgrado` on the `Conyuge` table. All the data in the column will be lost.
  - You are about to drop the column `provincia` on the `Conyuge` table. All the data in the column will be lost.
  - You are about to drop the column `universidadPostgrado` on the `Conyuge` table. All the data in the column will be lost.
  - You are about to drop the column `apellidosYNombres` on the `Demerito` table. All the data in the column will be lost.
  - You are about to drop the column `fechaSancionDesde` on the `Demerito` table. All the data in the column will be lost.
  - You are about to drop the column `fechaSancionHasta` on the `Demerito` table. All the data in the column will be lost.
  - You are about to drop the column `apellidosYNombres` on the `DescansoMedico` table. All the data in the column will be lost.
  - You are about to drop the column `fechaDescansoDesde` on the `DescansoMedico` table. All the data in the column will be lost.
  - You are about to drop the column `fechaDescansoHasta` on the `DescansoMedico` table. All the data in the column will be lost.
  - You are about to drop the column `apellidosYNombres` on the `Desplazamiento` table. All the data in the column will be lost.
  - You are about to drop the column `oficinaA` on the `Desplazamiento` table. All the data in the column will be lost.
  - You are about to drop the column `oficinaDe` on the `Desplazamiento` table. All the data in the column will be lost.
  - You are about to drop the column `apellidosYNombres` on the `ExperienciaLaboral` table. All the data in the column will be lost.
  - You are about to drop the column `cargoLaboral` on the `ExperienciaLaboral` table. All the data in the column will be lost.
  - You are about to drop the column `datosPersonalesId` on the `ExperienciaLaboral` table. All the data in the column will be lost.
  - You are about to drop the column `periodoLaboralFin` on the `ExperienciaLaboral` table. All the data in the column will be lost.
  - You are about to drop the column `periodoLaboralInicio` on the `ExperienciaLaboral` table. All the data in the column will be lost.
  - You are about to drop the column `apellidosYNombres` on the `FichaEvaluacion` table. All the data in the column will be lost.
  - You are about to drop the column `datosPersonalesId` on the `Hijo` table. All the data in the column will be lost.
  - You are about to drop the column `fechaNacimiento` on the `Hijo` table. All the data in the column will be lost.
  - You are about to drop the column `gradoInstruccion` on the `Hijo` table. All the data in the column will be lost.
  - You are about to drop the column `lugarNacimiento` on the `Hijo` table. All the data in the column will be lost.
  - You are about to drop the column `apellidosYNombres` on the `Merito` table. All the data in the column will be lost.
  - You are about to drop the column `fecha` on the `Merito` table. All the data in the column will be lost.
  - Added the required column `documentoActa` to the `ActaEntrega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaFin` to the `ActaEntrega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaInicio` to the `ActaEntrega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personaRecibeActa` to the `ActaEntrega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trabajadorId` to the `ActaEntrega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cargoActual` to the `Ascenso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentoAscenso` to the `Ascenso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaAscenso` to the `Ascenso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nivelRemunerativo` to the `Ascenso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `papCnp` to the `Ascenso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trabajadorId` to the `Ascenso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentoBonificacion` to the `BonificacionFamiliar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trabajadorId` to the `BonificacionFamiliar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentoBonificacion` to the `BonificacionPersonal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trabajadorId` to the `BonificacionPersonal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diasLaboradosFin` to the `ConstanciaPago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diasLaboradosInicio` to the `ConstanciaPago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentoPago` to the `ConstanciaPago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `papCnp` to the `ConstanciaPago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trabajadorId` to the `ConstanciaPago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lugarFechaNacimiento` to the `Conyuge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postgradoEspecializacion` to the `Conyuge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trabajadorId` to the `Conyuge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaFin` to the `Demerito` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaInicio` to the `Demerito` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trabajadorId` to the `Demerito` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaFin` to the `DescansoMedico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaInicio` to the `DescansoMedico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trabajadorId` to the `DescansoMedico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oficinaDestino` to the `Desplazamiento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oficinaOrigen` to the `Desplazamiento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trabajadorId` to the `Desplazamiento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cargo` to the `ExperienciaLaboral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodoFin` to the `ExperienciaLaboral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodoInicio` to the `ExperienciaLaboral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trabajadorId` to the `ExperienciaLaboral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trabajadorId` to the `FichaEvaluacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lugarFechaNacimiento` to the `Hijo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trabajadorId` to the `Hijo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaMerito` to the `Merito` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trabajadorId` to the `Merito` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "DatosPersonales_dni_key";

-- DropIndex
DROP INDEX "PersonalConDiscapacidad_dni_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ContratoProyectoInversion";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ContratoYNombramiento";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DatosPersonales";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "EstudiosYCaptacion";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PermisosLicenciasVacaciones";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PersonalConDiscapacidad";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PracticaDL1401";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RenunciaYLiquidacion";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TipoContratoCAS";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Trabajador" (
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
    "unidadEstructurada" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "fechaNacimiento" DATETIME NOT NULL,
    "distrito" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "departamentoRegion" TEXT NOT NULL,
    "nacionalidad" TEXT NOT NULL,
    "domicilio" TEXT NOT NULL,
    "interiorUrbanizacion" TEXT NOT NULL,
    "telefonoFijo" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "correoElectronico" TEXT NOT NULL,
    "personalDiscapacidad" BOOLEAN NOT NULL,
    "regimenPensionario" TEXT NOT NULL,
    "nombreAFP" TEXT NOT NULL,
    "situacionLaboral" TEXT NOT NULL,
    "estadoCivil" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GradoInstruccion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hijoId" INTEGER NOT NULL,
    "gradoInstruccion" TEXT NOT NULL,
    CONSTRAINT "GradoInstruccion_hijoId_fkey" FOREIGN KEY ("hijoId") REFERENCES "Hijo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Estudio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trabajadorId" INTEGER NOT NULL,
    "formacionAcademica" TEXT NOT NULL,
    "anoInicio" INTEGER NOT NULL,
    "anoFin" INTEGER NOT NULL,
    "institucion" TEXT NOT NULL,
    "otrosEstudios" TEXT NOT NULL,
    CONSTRAINT "Estudio_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Capacitacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trabajadorId" INTEGER NOT NULL,
    "centroCapacitacion" TEXT NOT NULL,
    "materia" TEXT NOT NULL,
    "profesionEspecialidad" TEXT NOT NULL,
    "periodoInicio" DATETIME NOT NULL,
    "periodoFin" DATETIME NOT NULL,
    "horasLectivas" INTEGER NOT NULL,
    "fechaEmision" DATETIME NOT NULL,
    "certificadoPdf" TEXT NOT NULL,
    CONSTRAINT "Capacitacion_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Discapacidad" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trabajadorId" INTEGER NOT NULL,
    "tipoDiscapacidad" TEXT NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "organoEstructurado" TEXT NOT NULL,
    "condicionLaboral" TEXT NOT NULL,
    CONSTRAINT "Discapacidad_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Oficina" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Contrato" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trabajadorId" INTEGER NOT NULL,
    "oficinaId" INTEGER NOT NULL,
    "cargoEstructural" TEXT NOT NULL,
    "regimenLaboral" TEXT NOT NULL,
    "nivelRemuneracion" TEXT NOT NULL,
    "papCnp" TEXT NOT NULL,
    "fechaIngreso" DATETIME NOT NULL,
    "fechaCese" DATETIME NOT NULL,
    CONSTRAINT "Contrato_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Contrato_oficinaId_fkey" FOREIGN KEY ("oficinaId") REFERENCES "Oficina" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Renuncia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trabajadorId" INTEGER NOT NULL,
    "documentoRenuncia" TEXT NOT NULL,
    "motivoRenuncia" TEXT NOT NULL,
    "fechaRenuncia" DATETIME NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    CONSTRAINT "Renuncia_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PermisoLicenciaVacaciones" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trabajadorId" INTEGER NOT NULL,
    "tipoPermiso" TEXT NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "fechaInicio" DATETIME NOT NULL,
    "fechaFin" DATETIME NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    CONSTRAINT "PermisoLicenciaVacaciones_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ActaEntrega" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trabajadorId" INTEGER NOT NULL,
    "personaRecibeActa" TEXT NOT NULL,
    "documentoActa" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "fechaInicio" DATETIME NOT NULL,
    "fechaFin" DATETIME NOT NULL,
    CONSTRAINT "ActaEntrega_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ActaEntrega" ("cargo", "dependenciaOficina", "id") SELECT "cargo", "dependenciaOficina", "id" FROM "ActaEntrega";
DROP TABLE "ActaEntrega";
ALTER TABLE "new_ActaEntrega" RENAME TO "ActaEntrega";
CREATE TABLE "new_Ascenso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trabajadorId" INTEGER NOT NULL,
    "documentoAscenso" TEXT NOT NULL,
    "cargoAnterior" TEXT NOT NULL,
    "cargoActual" TEXT NOT NULL,
    "nivelRemunerativo" TEXT NOT NULL,
    "papCnp" TEXT NOT NULL,
    "fechaAscenso" DATETIME NOT NULL,
    CONSTRAINT "Ascenso_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ascenso" ("cargoAnterior", "id") SELECT "cargoAnterior", "id" FROM "Ascenso";
DROP TABLE "Ascenso";
ALTER TABLE "new_Ascenso" RENAME TO "Ascenso";
CREATE TABLE "new_BonificacionFamiliar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trabajadorId" INTEGER NOT NULL,
    "tipoBonificacion" TEXT NOT NULL,
    "documentoBonificacion" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    CONSTRAINT "BonificacionFamiliar_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BonificacionFamiliar" ("cargo", "dependenciaOficina", "id", "tipoBonificacion") SELECT "cargo", "dependenciaOficina", "id", "tipoBonificacion" FROM "BonificacionFamiliar";
DROP TABLE "BonificacionFamiliar";
ALTER TABLE "new_BonificacionFamiliar" RENAME TO "BonificacionFamiliar";
CREATE TABLE "new_BonificacionPersonal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trabajadorId" INTEGER NOT NULL,
    "tipoBonificacion" TEXT NOT NULL,
    "documentoBonificacion" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    CONSTRAINT "BonificacionPersonal_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BonificacionPersonal" ("cargo", "dependenciaOficina", "id", "tipoBonificacion") SELECT "cargo", "dependenciaOficina", "id", "tipoBonificacion" FROM "BonificacionPersonal";
DROP TABLE "BonificacionPersonal";
ALTER TABLE "new_BonificacionPersonal" RENAME TO "BonificacionPersonal";
CREATE TABLE "new_ConstanciaPago" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trabajadorId" INTEGER NOT NULL,
    "documentoPago" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "nivelRemunerativo" TEXT NOT NULL,
    "papCnp" TEXT NOT NULL,
    "diasLaboradosInicio" DATETIME NOT NULL,
    "diasLaboradosFin" DATETIME NOT NULL,
    CONSTRAINT "ConstanciaPago_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ConstanciaPago" ("cargo", "dependenciaOficina", "id", "nivelRemunerativo") SELECT "cargo", "dependenciaOficina", "id", "nivelRemunerativo" FROM "ConstanciaPago";
DROP TABLE "ConstanciaPago";
ALTER TABLE "new_ConstanciaPago" RENAME TO "ConstanciaPago";
CREATE TABLE "new_Conyuge" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trabajadorId" INTEGER NOT NULL,
    "apellidosYNombres" TEXT NOT NULL,
    "lugarFechaNacimiento" TEXT NOT NULL,
    "gradoInstruccion" TEXT NOT NULL,
    "profesion" TEXT NOT NULL,
    "ocupacion" TEXT NOT NULL,
    "centroTrabajo" TEXT NOT NULL,
    "postgradoEspecializacion" TEXT NOT NULL,
    CONSTRAINT "Conyuge_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Conyuge" ("apellidosYNombres", "centroTrabajo", "gradoInstruccion", "id", "ocupacion", "profesion") SELECT "apellidosYNombres", "centroTrabajo", "gradoInstruccion", "id", "ocupacion", "profesion" FROM "Conyuge";
DROP TABLE "Conyuge";
ALTER TABLE "new_Conyuge" RENAME TO "Conyuge";
CREATE UNIQUE INDEX "Conyuge_trabajadorId_key" ON "Conyuge"("trabajadorId");
CREATE TABLE "new_Demerito" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trabajadorId" INTEGER NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "tipoSancion" TEXT NOT NULL,
    "fechaInicio" DATETIME NOT NULL,
    "fechaFin" DATETIME NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    CONSTRAINT "Demerito_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Demerito" ("cargo", "dependenciaOficina", "documentoSustento", "id", "tipoSancion") SELECT "cargo", "dependenciaOficina", "documentoSustento", "id", "tipoSancion" FROM "Demerito";
DROP TABLE "Demerito";
ALTER TABLE "new_Demerito" RENAME TO "Demerito";
CREATE TABLE "new_DescansoMedico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trabajadorId" INTEGER NOT NULL,
    "tipoDescanso" TEXT NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "fechaInicio" DATETIME NOT NULL,
    "fechaFin" DATETIME NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    CONSTRAINT "DescansoMedico_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DescansoMedico" ("cargo", "dependenciaOficina", "documentoSustento", "id", "tipoDescanso") SELECT "cargo", "dependenciaOficina", "documentoSustento", "id", "tipoDescanso" FROM "DescansoMedico";
DROP TABLE "DescansoMedico";
ALTER TABLE "new_DescansoMedico" RENAME TO "DescansoMedico";
CREATE TABLE "new_Desplazamiento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trabajadorId" INTEGER NOT NULL,
    "tipoDesplazamiento" TEXT NOT NULL,
    "documentoRotacion" TEXT NOT NULL,
    "fechaDesplazamiento" DATETIME NOT NULL,
    "oficinaOrigen" TEXT NOT NULL,
    "oficinaDestino" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    CONSTRAINT "Desplazamiento_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Desplazamiento" ("cargo", "documentoRotacion", "fechaDesplazamiento", "id", "tipoDesplazamiento") SELECT "cargo", "documentoRotacion", "fechaDesplazamiento", "id", "tipoDesplazamiento" FROM "Desplazamiento";
DROP TABLE "Desplazamiento";
ALTER TABLE "new_Desplazamiento" RENAME TO "Desplazamiento";
CREATE TABLE "new_ExperienciaLaboral" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trabajadorId" INTEGER NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "centroLaboral" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "periodoInicio" DATETIME NOT NULL,
    "periodoFin" DATETIME NOT NULL,
    "fechaEmision" DATETIME NOT NULL,
    CONSTRAINT "ExperienciaLaboral_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ExperienciaLaboral" ("centroLaboral", "dependenciaOficina", "documentoSustento", "fechaEmision", "id") SELECT "centroLaboral", "dependenciaOficina", "documentoSustento", "fechaEmision", "id" FROM "ExperienciaLaboral";
DROP TABLE "ExperienciaLaboral";
ALTER TABLE "new_ExperienciaLaboral" RENAME TO "ExperienciaLaboral";
CREATE TABLE "new_FichaEvaluacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trabajadorId" INTEGER NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "fechaEvaluacion" DATETIME NOT NULL,
    CONSTRAINT "FichaEvaluacion_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FichaEvaluacion" ("cargo", "dependenciaOficina", "documentoSustento", "fechaEvaluacion", "id") SELECT "cargo", "dependenciaOficina", "documentoSustento", "fechaEvaluacion", "id" FROM "FichaEvaluacion";
DROP TABLE "FichaEvaluacion";
ALTER TABLE "new_FichaEvaluacion" RENAME TO "FichaEvaluacion";
CREATE TABLE "new_Hijo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trabajadorId" INTEGER NOT NULL,
    "apellidosYNombres" TEXT NOT NULL,
    "lugarFechaNacimiento" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    CONSTRAINT "Hijo_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Hijo" ("apellidosYNombres", "edad", "id") SELECT "apellidosYNombres", "edad", "id" FROM "Hijo";
DROP TABLE "Hijo";
ALTER TABLE "new_Hijo" RENAME TO "Hijo";
CREATE TABLE "new_Merito" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trabajadorId" INTEGER NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "fechaMerito" DATETIME NOT NULL,
    CONSTRAINT "Merito_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Merito" ("cargo", "dependenciaOficina", "documentoSustento", "id") SELECT "cargo", "dependenciaOficina", "documentoSustento", "id" FROM "Merito";
DROP TABLE "Merito";
ALTER TABLE "new_Merito" RENAME TO "Merito";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
