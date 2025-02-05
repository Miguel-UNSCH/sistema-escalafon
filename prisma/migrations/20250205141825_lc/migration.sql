-- CreateTable
CREATE TABLE "BonificacionPersonal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apellidosYNombres" TEXT NOT NULL,
    "tipoBonificacion" TEXT NOT NULL,
    "resolucionBonificacion" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BonificacionFamiliar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apellidosYNombres" TEXT NOT NULL,
    "tipoBonificacion" TEXT NOT NULL,
    "resolucionBonificacion" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FichaEvaluacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apellidosYNombres" TEXT NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "fechaEvaluacion" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Merito" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apellidosYNombres" TEXT NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Demerito" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apellidosYNombres" TEXT NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "tipoSancion" TEXT NOT NULL,
    "fechaSancionDesde" DATETIME NOT NULL,
    "fechaSancionHasta" DATETIME NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ActaEntrega" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apellidosYNombres" TEXT NOT NULL,
    "quienRecibe" TEXT NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "fechaDesde" DATETIME NOT NULL,
    "fechaHasta" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ConstanciaPago" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apellidosYNombres" TEXT NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "nivelRemunerativo" TEXT NOT NULL,
    "pap" TEXT NOT NULL,
    "cnp" TEXT NOT NULL,
    "diasLaboradosDesde" DATETIME NOT NULL,
    "diasLaboradosHasta" DATETIME NOT NULL
);
