-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PERSONAL');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ENABLED', 'DISABLED');

-- CreateEnum
CREATE TYPE "EstadoCivil" AS ENUM ('S', 'C', 'D', 'V');

-- CreateEnum
CREATE TYPE "GrupoSanguineo" AS ENUM ('A_POSITIVO', 'A_NEGATIVO', 'B_POSITIVO', 'B_NEGATIVO', 'AB_POSITIVO', 'AB_NEGATIVO', 'O_POSITIVO', 'O_NEGATIVO');

-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('M', 'F');

-- CreateEnum
CREATE TYPE "TipoContrato" AS ENUM ('DECRETO_LEGISLATIVO_276', 'CAS', 'PROYECTO_INVERSION', 'PRACTICANTE');

-- CreateEnum
CREATE TYPE "TipoDesplazamiento" AS ENUM ('ROTACION_INTERNA', 'ROTACION_VOLUNTARIA', 'REASIGNACION', 'DESIGNACION', 'DESTACADO', 'PERMUTA', 'ENCARGAR');

-- CreateEnum
CREATE TYPE "TipoDescanso" AS ENUM ('MEDICO', 'PARTICULAR', 'PRE_POSTNATAL');

-- CreateEnum
CREATE TYPE "TipoPermisoLicenciaVacacion" AS ENUM ('PARTICULAR', 'VACACIONES', 'PERMISO_FAMILIAR');

-- CreateTable
CREATE TABLE "Ubigeo" (
    "id" SERIAL NOT NULL,
    "inei" TEXT NOT NULL,
    "reniec" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "distrito" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ubigeo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dependencia" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT,
    "codigo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dependencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cargo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cargo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Archivo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Archivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'PERSONAL',
    "email" TEXT,
    "password" TEXT,
    "ubigeoId" INTEGER,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Personal" (
    "id" TEXT NOT NULL,
    "sexo" "Sexo" NOT NULL,
    "dni" TEXT NOT NULL,
    "nAutogenerado" TEXT NOT NULL,
    "licenciaConducir" TEXT,
    "grupoSanguineo" "GrupoSanguineo" NOT NULL,
    "fechaIngreso" TIMESTAMP(3) NOT NULL,
    "unidadEstructurada" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "nacionalidad" TEXT NOT NULL,
    "domicilio" TEXT NOT NULL,
    "interiorUrbanizacion" TEXT,
    "telefono" TEXT,
    "celular" TEXT NOT NULL,
    "regimenPensionario" TEXT NOT NULL,
    "nombreAfp" TEXT,
    "situacionLaboral" TEXT NOT NULL,
    "estadoCivil" "EstadoCivil" NOT NULL,
    "discapacidad" BOOLEAN NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',
    "cargoId" INTEGER NOT NULL,
    "dependenciaId" INTEGER NOT NULL,
    "conyugeId" INTEGER,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Personal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conyuge" (
    "id" SERIAL NOT NULL,
    "personalId" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "ubigeoId" INTEGER NOT NULL,
    "gradoInstruccion" TEXT NOT NULL,
    "ocupacion" TEXT NOT NULL,
    "profesion" TEXT,
    "postgrado" TEXT,
    "centroTrabajo" TEXT,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Conyuge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hijo" (
    "id" SERIAL NOT NULL,
    "personalId" TEXT NOT NULL,
    "ubigeoId" INTEGER NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "gradoInstruccion" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hijo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discapacidad" (
    "id" SERIAL NOT NULL,
    "personalId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "organoEstructurado" TEXT NOT NULL,
    "condicionLaboral" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Discapacidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estudios" (
    "id" SERIAL NOT NULL,
    "personalId" TEXT NOT NULL,
    "nivel" TEXT NOT NULL,
    "periodo" JSONB NOT NULL,
    "institucion" TEXT NOT NULL,
    "otrosEstudios" TEXT,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Estudios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Capacitacion" (
    "id" SERIAL NOT NULL,
    "personalId" TEXT NOT NULL,
    "centroCapacitacion" TEXT NOT NULL,
    "materia" TEXT NOT NULL,
    "especialidad" TEXT NOT NULL,
    "periodo" TEXT NOT NULL,
    "horasLectivas" INTEGER NOT NULL,
    "fechaEmision" TIMESTAMP(3) NOT NULL,
    "certificadoPdf" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Capacitacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperienciaLaboral" (
    "id" SERIAL NOT NULL,
    "personalId" TEXT NOT NULL,
    "dependenciaId" INTEGER,
    "cargoId" INTEGER,
    "documentoSustento" TEXT NOT NULL,
    "centroLabor" TEXT NOT NULL,
    "periodo" TEXT NOT NULL,
    "fechaEmision" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExperienciaLaboral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contrato" (
    "id" SERIAL NOT NULL,
    "tipoContrato" "TipoContrato" NOT NULL,
    "condicionLaboral" TEXT NOT NULL,
    "resolucionNombramiento" TEXT,
    "regimenLaboral" TEXT NOT NULL,
    "nivelRemuneracion" TEXT,
    "pap" INTEGER NOT NULL,
    "cnp" INTEGER NOT NULL,
    "fechaIngreso" TIMESTAMP(3) NOT NULL,
    "fechaCese" TIMESTAMP(3),
    "aniosServicio" INTEGER,
    "personalId" TEXT NOT NULL,
    "dependenciaId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contrato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Renuncia" (
    "id" SERIAL NOT NULL,
    "documentoRenuncia" TEXT NOT NULL,
    "motivoRenuncia" TEXT NOT NULL,
    "fechaRenuncia" TIMESTAMP(3) NOT NULL,
    "personalId" TEXT NOT NULL,
    "dependenciaId" INTEGER,
    "cargoId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Renuncia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Desplazamiento" (
    "id" SERIAL NOT NULL,
    "tipoDesplazamiento" "TipoDesplazamiento" NOT NULL,
    "documentoRotacion" TEXT NOT NULL,
    "fechaDesplazamiento" TIMESTAMP(3) NOT NULL,
    "personalId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Desplazamiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DescansoMedico" (
    "id" SERIAL NOT NULL,
    "tipoDescanso" "TipoDescanso" NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "periodo" TEXT NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "dependenciaId" INTEGER NOT NULL,
    "personalId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DescansoMedico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermisoLicenciaVacacion" (
    "id" SERIAL NOT NULL,
    "tipoPermisoLicenciaVacacion" "TipoPermisoLicenciaVacacion" NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "periodo" TEXT NOT NULL,
    "dependenciaId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "personalId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PermisoLicenciaVacacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ascenso" (
    "id" SERIAL NOT NULL,
    "resolucionAscenso" TEXT NOT NULL,
    "nivelRemunerativo" TEXT NOT NULL,
    "pap" INTEGER NOT NULL,
    "cnp" TEXT NOT NULL,
    "personalId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ascenso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BonificacionPersonal" (
    "id" SERIAL NOT NULL,
    "tipoBonificacion" TEXT NOT NULL,
    "resolucionBonificacion" TEXT NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "personalId" TEXT NOT NULL,
    "dependenciaId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BonificacionPersonal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BonificacionFamiliar" (
    "id" SERIAL NOT NULL,
    "tipoBonificacion" TEXT NOT NULL,
    "resolucionBonificacion" TEXT NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "dependenciaId" INTEGER NOT NULL,
    "personalId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BonificacionFamiliar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FichaEvaluacion" (
    "id" SERIAL NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "fechaEvaluacion" TIMESTAMP(3) NOT NULL,
    "personalId" TEXT NOT NULL,
    "dependenciaId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FichaEvaluacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Merito" (
    "id" SERIAL NOT NULL,
    "personalId" TEXT NOT NULL,
    "dependenciaId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Merito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Demerito" (
    "id" SERIAL NOT NULL,
    "personalId" TEXT NOT NULL,
    "dependenciaId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "tipoSancion" TEXT NOT NULL,
    "fechaSancion" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Demerito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActaEntrega" (
    "id" SERIAL NOT NULL,
    "actaEntregadoPorId" TEXT NOT NULL,
    "dependenciaOficinaId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "dependenciaId" INTEGER NOT NULL,
    "documentoSustento" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActaEntrega_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActaEntregaDestinatario" (
    "id" SERIAL NOT NULL,
    "actaId" INTEGER NOT NULL,
    "destinatarioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActaEntregaDestinatario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DependenciasDesplazamiento" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DependenciasDesplazamiento_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CargosDesplazamiento" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CargosDesplazamiento_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CargosAscenso" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CargosAscenso_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_DependenciasAscenso" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DependenciasAscenso_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ubigeo_inei_key" ON "Ubigeo"("inei");

-- CreateIndex
CREATE UNIQUE INDEX "Ubigeo_reniec_key" ON "Ubigeo"("reniec");

-- CreateIndex
CREATE UNIQUE INDEX "Dependencia_nombre_key" ON "Dependencia"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Dependencia_codigo_key" ON "Dependencia"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Cargo_nombre_key" ON "Cargo"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Personal_dni_key" ON "Personal"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Personal_conyugeId_key" ON "Personal"("conyugeId");

-- CreateIndex
CREATE UNIQUE INDEX "Personal_userId_key" ON "Personal"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Conyuge_personalId_key" ON "Conyuge"("personalId");

-- CreateIndex
CREATE UNIQUE INDEX "Contrato_pap_key" ON "Contrato"("pap");

-- CreateIndex
CREATE UNIQUE INDEX "Contrato_cnp_key" ON "Contrato"("cnp");

-- CreateIndex
CREATE UNIQUE INDEX "Ascenso_pap_key" ON "Ascenso"("pap");

-- CreateIndex
CREATE INDEX "_DependenciasDesplazamiento_B_index" ON "_DependenciasDesplazamiento"("B");

-- CreateIndex
CREATE INDEX "_CargosDesplazamiento_B_index" ON "_CargosDesplazamiento"("B");

-- CreateIndex
CREATE INDEX "_CargosAscenso_B_index" ON "_CargosAscenso"("B");

-- CreateIndex
CREATE INDEX "_DependenciasAscenso_B_index" ON "_DependenciasAscenso"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_ubigeoId_fkey" FOREIGN KEY ("ubigeoId") REFERENCES "Ubigeo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conyuge" ADD CONSTRAINT "Conyuge_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conyuge" ADD CONSTRAINT "Conyuge_ubigeoId_fkey" FOREIGN KEY ("ubigeoId") REFERENCES "Ubigeo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hijo" ADD CONSTRAINT "Hijo_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hijo" ADD CONSTRAINT "Hijo_ubigeoId_fkey" FOREIGN KEY ("ubigeoId") REFERENCES "Ubigeo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discapacidad" ADD CONSTRAINT "Discapacidad_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estudios" ADD CONSTRAINT "Estudios_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Capacitacion" ADD CONSTRAINT "Capacitacion_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienciaLaboral" ADD CONSTRAINT "ExperienciaLaboral_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienciaLaboral" ADD CONSTRAINT "ExperienciaLaboral_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienciaLaboral" ADD CONSTRAINT "ExperienciaLaboral_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renuncia" ADD CONSTRAINT "Renuncia_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renuncia" ADD CONSTRAINT "Renuncia_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renuncia" ADD CONSTRAINT "Renuncia_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Desplazamiento" ADD CONSTRAINT "Desplazamiento_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DescansoMedico" ADD CONSTRAINT "DescansoMedico_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DescansoMedico" ADD CONSTRAINT "DescansoMedico_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DescansoMedico" ADD CONSTRAINT "DescansoMedico_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermisoLicenciaVacacion" ADD CONSTRAINT "PermisoLicenciaVacacion_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermisoLicenciaVacacion" ADD CONSTRAINT "PermisoLicenciaVacacion_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermisoLicenciaVacacion" ADD CONSTRAINT "PermisoLicenciaVacacion_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ascenso" ADD CONSTRAINT "Ascenso_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonificacionPersonal" ADD CONSTRAINT "BonificacionPersonal_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonificacionPersonal" ADD CONSTRAINT "BonificacionPersonal_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonificacionPersonal" ADD CONSTRAINT "BonificacionPersonal_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonificacionFamiliar" ADD CONSTRAINT "BonificacionFamiliar_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonificacionFamiliar" ADD CONSTRAINT "BonificacionFamiliar_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonificacionFamiliar" ADD CONSTRAINT "BonificacionFamiliar_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FichaEvaluacion" ADD CONSTRAINT "FichaEvaluacion_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FichaEvaluacion" ADD CONSTRAINT "FichaEvaluacion_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FichaEvaluacion" ADD CONSTRAINT "FichaEvaluacion_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Merito" ADD CONSTRAINT "Merito_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Merito" ADD CONSTRAINT "Merito_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Merito" ADD CONSTRAINT "Merito_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demerito" ADD CONSTRAINT "Demerito_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demerito" ADD CONSTRAINT "Demerito_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demerito" ADD CONSTRAINT "Demerito_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActaEntrega" ADD CONSTRAINT "ActaEntrega_actaEntregadoPorId_fkey" FOREIGN KEY ("actaEntregadoPorId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActaEntrega" ADD CONSTRAINT "ActaEntrega_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "Dependencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActaEntrega" ADD CONSTRAINT "ActaEntrega_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActaEntregaDestinatario" ADD CONSTRAINT "ActaEntregaDestinatario_actaId_fkey" FOREIGN KEY ("actaId") REFERENCES "ActaEntrega"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActaEntregaDestinatario" ADD CONSTRAINT "ActaEntregaDestinatario_destinatarioId_fkey" FOREIGN KEY ("destinatarioId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DependenciasDesplazamiento" ADD CONSTRAINT "_DependenciasDesplazamiento_A_fkey" FOREIGN KEY ("A") REFERENCES "Dependencia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DependenciasDesplazamiento" ADD CONSTRAINT "_DependenciasDesplazamiento_B_fkey" FOREIGN KEY ("B") REFERENCES "Desplazamiento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CargosDesplazamiento" ADD CONSTRAINT "_CargosDesplazamiento_A_fkey" FOREIGN KEY ("A") REFERENCES "Cargo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CargosDesplazamiento" ADD CONSTRAINT "_CargosDesplazamiento_B_fkey" FOREIGN KEY ("B") REFERENCES "Desplazamiento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CargosAscenso" ADD CONSTRAINT "_CargosAscenso_A_fkey" FOREIGN KEY ("A") REFERENCES "Ascenso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CargosAscenso" ADD CONSTRAINT "_CargosAscenso_B_fkey" FOREIGN KEY ("B") REFERENCES "Cargo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DependenciasAscenso" ADD CONSTRAINT "_DependenciasAscenso_A_fkey" FOREIGN KEY ("A") REFERENCES "Ascenso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DependenciasAscenso" ADD CONSTRAINT "_DependenciasAscenso_B_fkey" FOREIGN KEY ("B") REFERENCES "Dependencia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
