-- CreateTable
CREATE TABLE "ContratoYNombramiento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apellidosYNombres" TEXT NOT NULL,
    "condicionLaboral" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "resolucionNombramiento" TEXT NOT NULL,
    "cargoEstructural" TEXT NOT NULL,
    "regimenLaboral" TEXT NOT NULL,
    "nivelRemuneracion" TEXT NOT NULL,
    "pap" TEXT NOT NULL,
    "cnp" TEXT NOT NULL,
    "fechaIngreso" DATETIME NOT NULL,
    "anosServicio" INTEGER NOT NULL,
    "fechaNacimiento" DATETIME NOT NULL,
    "fechaCese" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TipoContratoCAS" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contratoYNombramientoId" INTEGER NOT NULL,
    "condicionLaboral" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "contratoCAS" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "regimenLaboral" TEXT NOT NULL,
    "fechaIngreso" DATETIME NOT NULL,
    "fechaCese" DATETIME NOT NULL,
    CONSTRAINT "TipoContratoCAS_contratoYNombramientoId_fkey" FOREIGN KEY ("contratoYNombramientoId") REFERENCES "ContratoYNombramiento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContratoProyectoInversion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contratoYNombramientoId" INTEGER NOT NULL,
    "condicionLaboral" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "resolucionContrato" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "meta" TEXT NOT NULL,
    "regimenLaboral" TEXT NOT NULL,
    "fechaIngreso" DATETIME NOT NULL,
    "fechaCese" DATETIME NOT NULL,
    CONSTRAINT "ContratoProyectoInversion_contratoYNombramientoId_fkey" FOREIGN KEY ("contratoYNombramientoId") REFERENCES "ContratoYNombramiento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PracticaDL1401" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contratoYNombramientoId" INTEGER NOT NULL,
    "condicionLaboral" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "convenio" TEXT NOT NULL,
    "fechaIngreso" DATETIME NOT NULL,
    "fechaCese" DATETIME NOT NULL,
    CONSTRAINT "PracticaDL1401_contratoYNombramientoId_fkey" FOREIGN KEY ("contratoYNombramientoId") REFERENCES "ContratoYNombramiento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RenunciaYLiquidacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apellidosYNombres" TEXT NOT NULL,
    "documentoRenuncia" TEXT NOT NULL,
    "motivoRenuncia" TEXT NOT NULL,
    "fechaRenuncia" DATETIME NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Desplazamiento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apellidosYNombres" TEXT NOT NULL,
    "tipoDesplazamiento" TEXT NOT NULL,
    "documentoRotacion" TEXT NOT NULL,
    "fechaDesplazamiento" DATETIME NOT NULL,
    "oficinaDe" TEXT NOT NULL,
    "oficinaA" TEXT NOT NULL,
    "cargo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DescansoMedico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apellidosYNombres" TEXT NOT NULL,
    "tipoDescanso" TEXT NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "fechaDescansoDesde" DATETIME NOT NULL,
    "fechaDescansoHasta" DATETIME NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PermisosLicenciasVacaciones" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apellidosYNombres" TEXT NOT NULL,
    "tipoPermiso" TEXT NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "fechaPermisoDesde" DATETIME NOT NULL,
    "fechaPermisoHasta" DATETIME NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Ascenso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apellidosYNombres" TEXT NOT NULL,
    "resolucionAscenso" TEXT NOT NULL,
    "cargoAnterior" TEXT NOT NULL,
    "cargoNuevo" TEXT NOT NULL,
    "nivelRemunerativoAnterior" TEXT NOT NULL,
    "nivelRemunerativoNuevo" TEXT NOT NULL,
    "papAnterior" TEXT NOT NULL,
    "papNuevo" TEXT NOT NULL,
    "cnpAnterior" TEXT NOT NULL,
    "cnpNuevo" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL
);
