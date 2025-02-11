-- CreateTable
CREATE TABLE "Ubigeo" (
    "id" SERIAL NOT NULL,
    "departamento" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "distrito" TEXT NOT NULL,

    CONSTRAINT "Ubigeo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cargo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Cargo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DependenciaOficina" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT,
    "codigo" TEXT,

    CONSTRAINT "DependenciaOficina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Personal" (
    "id" SERIAL NOT NULL,
    "apellidoPaterno" TEXT NOT NULL,
    "apellidoMaterno" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "dni" TEXT NOT NULL,
    "nAutogenerado" TEXT NOT NULL,
    "licenciaConducir" TEXT,
    "grupoSanguineo" TEXT NOT NULL,
    "fechaIngreso" TIMESTAMP(3) NOT NULL,
    "unidadEstructurada" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "nacionalidad" TEXT NOT NULL,
    "ubigeoId" INTEGER NOT NULL,
    "domicilio" TEXT NOT NULL,
    "interiorUrbanizacion" TEXT,
    "telefono" TEXT,
    "celular" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "regimenPensionario" TEXT NOT NULL,
    "nombreAfp" TEXT,
    "situacionLaboral" TEXT NOT NULL,
    "estadoCivil" TEXT NOT NULL,
    "discapacidad" BOOLEAN NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "dependenciaOficinaId" INTEGER,
    "conyugeId" INTEGER,
    "discapacidadId" INTEGER,

    CONSTRAINT "Personal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conyuge" (
    "id" SERIAL NOT NULL,
    "personalId" INTEGER NOT NULL,
    "nombres" TEXT NOT NULL,
    "ubigeoId" INTEGER NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "gradoInstruccion" TEXT NOT NULL,
    "profesion" TEXT,
    "ocupacion" TEXT,
    "centroTrabajo" TEXT,
    "postgrado" TEXT,

    CONSTRAINT "Conyuge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hijo" (
    "id" SERIAL NOT NULL,
    "personalId" INTEGER NOT NULL,
    "nombres" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "edad" INTEGER NOT NULL,
    "ubigeoId" INTEGER NOT NULL,
    "gradoInstruccion" TEXT NOT NULL,

    CONSTRAINT "Hijo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discapacidad" (
    "id" SERIAL NOT NULL,
    "personalId" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "organoEstructurado" TEXT NOT NULL,
    "condicionLaboral" TEXT NOT NULL,

    CONSTRAINT "Discapacidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estudios" (
    "id" SERIAL NOT NULL,
    "personalId" INTEGER NOT NULL,
    "nivel" TEXT NOT NULL,
    "periodo" TEXT NOT NULL,
    "institucion" TEXT NOT NULL,
    "otrosEstudios" TEXT,

    CONSTRAINT "Estudios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Capacitacion" (
    "id" SERIAL NOT NULL,
    "personalId" INTEGER NOT NULL,
    "centroCapacitacion" TEXT NOT NULL,
    "materia" TEXT NOT NULL,
    "especialidad" TEXT NOT NULL,
    "periodo" TEXT NOT NULL,
    "horasLectivas" INTEGER NOT NULL,
    "fechaEmision" TIMESTAMP(3) NOT NULL,
    "certificadoPdf" TEXT NOT NULL,

    CONSTRAINT "Capacitacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperienciaLaboral" (
    "id" SERIAL NOT NULL,
    "personalId" INTEGER NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "centroLabor" TEXT NOT NULL,
    "dependenciaOficinaId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "periodo" TEXT NOT NULL,
    "fechaEmision" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExperienciaLaboral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HijoToPersonal" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_HijoToPersonal_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "DependenciaOficina_nombre_key" ON "DependenciaOficina"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "DependenciaOficina_codigo_key" ON "DependenciaOficina"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Personal_dni_key" ON "Personal"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Conyuge_personalId_key" ON "Conyuge"("personalId");

-- CreateIndex
CREATE UNIQUE INDEX "Discapacidad_personalId_key" ON "Discapacidad"("personalId");

-- CreateIndex
CREATE INDEX "_HijoToPersonal_B_index" ON "_HijoToPersonal"("B");

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_conyugeId_fkey" FOREIGN KEY ("conyugeId") REFERENCES "Conyuge"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_ubigeoId_fkey" FOREIGN KEY ("ubigeoId") REFERENCES "Ubigeo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_dependenciaOficinaId_fkey" FOREIGN KEY ("dependenciaOficinaId") REFERENCES "DependenciaOficina"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conyuge" ADD CONSTRAINT "Conyuge_ubigeoId_fkey" FOREIGN KEY ("ubigeoId") REFERENCES "Ubigeo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hijo" ADD CONSTRAINT "Hijo_ubigeoId_fkey" FOREIGN KEY ("ubigeoId") REFERENCES "Ubigeo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discapacidad" ADD CONSTRAINT "Discapacidad_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estudios" ADD CONSTRAINT "Estudios_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Capacitacion" ADD CONSTRAINT "Capacitacion_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienciaLaboral" ADD CONSTRAINT "ExperienciaLaboral_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienciaLaboral" ADD CONSTRAINT "ExperienciaLaboral_dependenciaOficinaId_fkey" FOREIGN KEY ("dependenciaOficinaId") REFERENCES "DependenciaOficina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienciaLaboral" ADD CONSTRAINT "ExperienciaLaboral_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HijoToPersonal" ADD CONSTRAINT "_HijoToPersonal_A_fkey" FOREIGN KEY ("A") REFERENCES "Hijo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HijoToPersonal" ADD CONSTRAINT "_HijoToPersonal_B_fkey" FOREIGN KEY ("B") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
