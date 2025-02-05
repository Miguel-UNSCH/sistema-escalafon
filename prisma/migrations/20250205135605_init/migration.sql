-- CreateTable
CREATE TABLE "DatosPersonales" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apellidoPaterno" TEXT NOT NULL,
    "apellidoMaterno" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "dni" TEXT NOT NULL,
    "numeroAutogenerado" TEXT NOT NULL,
    "licenciaConducir" TEXT NOT NULL,
    "grupoSanguineo" TEXT NOT NULL,
    "fechaIngreso" DATETIME NOT NULL,
    "unidadEstructurada" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "fechaNacimiento" DATETIME NOT NULL,
    "distrito" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "nacionalidad" TEXT NOT NULL,
    "domicilioAv" TEXT NOT NULL,
    "interiorUrbanizacion" TEXT NOT NULL,
    "provinciaDomicilio" TEXT NOT NULL,
    "distritoDomicilio" TEXT NOT NULL,
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
CREATE TABLE "Conyuge" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "datosPersonalesId" INTEGER NOT NULL,
    "apellidosYNombres" TEXT NOT NULL,
    "lugarNacimiento" TEXT NOT NULL,
    "fechaNacimiento" DATETIME NOT NULL,
    "departamento" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "distrito" TEXT NOT NULL,
    "gradoInstruccion" TEXT NOT NULL,
    "profesion" TEXT NOT NULL,
    "ocupacion" TEXT NOT NULL,
    "centroTrabajo" TEXT NOT NULL,
    "postgrado" TEXT NOT NULL,
    "anoPostgrado" INTEGER NOT NULL,
    "universidadPostgrado" TEXT NOT NULL,
    CONSTRAINT "Conyuge_datosPersonalesId_fkey" FOREIGN KEY ("datosPersonalesId") REFERENCES "DatosPersonales" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Hijo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "datosPersonalesId" INTEGER NOT NULL,
    "apellidosYNombres" TEXT NOT NULL,
    "lugarNacimiento" TEXT NOT NULL,
    "fechaNacimiento" DATETIME NOT NULL,
    "edad" INTEGER NOT NULL,
    "gradoInstruccion" TEXT NOT NULL,
    CONSTRAINT "Hijo_datosPersonalesId_fkey" FOREIGN KEY ("datosPersonalesId") REFERENCES "DatosPersonales" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EstudiosYCaptacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "datosPersonalesId" INTEGER NOT NULL,
    "apellidosYNombres" TEXT NOT NULL,
    "tipoEstudio" TEXT NOT NULL,
    "anioInicio" INTEGER NOT NULL,
    "anioFin" INTEGER NOT NULL,
    "institucion" TEXT NOT NULL,
    "otrosEstudios" TEXT NOT NULL,
    "centroCapacitacion" TEXT NOT NULL,
    "materiaCapacitacion" TEXT NOT NULL,
    "profesionEspecialidad" TEXT NOT NULL,
    "periodoInicio" DATETIME NOT NULL,
    "periodoFin" DATETIME NOT NULL,
    "horasLectivas" INTEGER NOT NULL,
    "fechaEmisionCertificado" DATETIME NOT NULL,
    "certificadoEscaneado" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ExperienciaLaboral" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "datosPersonalesId" INTEGER NOT NULL,
    "apellidosYNombres" TEXT NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "centroLaboral" TEXT NOT NULL,
    "dependenciaOficina" TEXT NOT NULL,
    "cargoLaboral" TEXT NOT NULL,
    "periodoLaboralInicio" DATETIME NOT NULL,
    "periodoLaboralFin" DATETIME NOT NULL,
    "fechaEmision" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PersonalConDiscapacidad" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apellidosYNombres" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "tipoDiscapacidad" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "organoEstructurado" TEXT NOT NULL,
    "condicionLaboral" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "DatosPersonales_dni_key" ON "DatosPersonales"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalConDiscapacidad_dni_key" ON "PersonalConDiscapacidad"("dni");
