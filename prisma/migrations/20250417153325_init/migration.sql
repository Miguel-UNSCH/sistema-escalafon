-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "citext";

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'personal');

-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('m', 'f');

-- CreateEnum
CREATE TYPE "GrupoSanguineo" AS ENUM ('a_positivo', 'a_negativo', 'b_positivo', 'b_negativo', 'ab_positivo', 'ab_negativo', 'o_positivo', 'o_negativo');

-- CreateEnum
CREATE TYPE "EstadoCivil" AS ENUM ('s', 'c', 'd', 'v');

-- CreateEnum
CREATE TYPE "GradoInstruccion" AS ENUM ('sin', 'pc', 'pi', 'sc', 'si', 'tec', 'uni', 'pos', 'null');

-- CreateEnum
CREATE TYPE "TDiscapacidad" AS ENUM ('sen', 'mot', 'int', 'psi', 'mul');

-- CreateEnum
CREATE TYPE "TEntCertDic" AS ENUM ('min', 'ess', 'cod');

-- CreateEnum
CREATE TYPE "NivelEducativo" AS ENUM ('p', 's', 't', 'u', 'm', 'd', 'e');

-- CreateEnum
CREATE TYPE "TipoCapacitacion" AS ENUM ('dip', 'cur_cap', 'cert', 'cons');

-- CreateEnum
CREATE TYPE "TContrato" AS ENUM ('dl_276', 'cas', 'pro_inv', 'pra');

-- CreateEnum
CREATE TYPE "CLaboral" AS ENUM ('dl_con', 'dl_nom', 'dl_cps', 'dl_rpmj', 'dl_cpsj', 'cas_ind', 'cas_tem', 'cas_sup', 'cas_tra', 'pi_con', 'pi_prmj', 'pra_pre', 'pra_pro');

-- CreateEnum
CREATE TYPE "RLaboral" AS ENUM ('dl_276', 'cas_1057', 'pi_276', 'pi_728');

-- CreateEnum
CREATE TYPE "TipoDesplazamiento" AS ENUM ('ri', 'rv', 'r', 'd', 'p');

-- CreateEnum
CREATE TYPE "TipoDescanso" AS ENUM ('m', 'p', 'it');

-- CreateEnum
CREATE TYPE "TipoPermisoLicenciaVacacion" AS ENUM ('per_mot', 'per_enf', 'per_hon', 'per_cap', 'per_lac', 'lic_sgh', 'lic_cgh', 'lic_vac', 'vac');

-- CreateEnum
CREATE TYPE "tipo_sancion" AS ENUM ('amo_ver', 'amo_esc', 'sus', 'dest');

-- CreateEnum
CREATE TYPE "tipo_doc" AS ENUM ('mem', 'ofi', 'act');

-- CreateTable
CREATE TABLE "ubigeos" (
    "id" SERIAL NOT NULL,
    "inei" TEXT NOT NULL,
    "reniec" TEXT NOT NULL,
    "departamento" CITEXT NOT NULL,
    "provincia" CITEXT NOT NULL,
    "distrito" CITEXT NOT NULL,

    CONSTRAINT "ubigeos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dependencias" (
    "id" SERIAL NOT NULL,
    "nombre" CITEXT NOT NULL,
    "direccion" CITEXT,
    "codigo" CITEXT NOT NULL,

    CONSTRAINT "dependencias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cargos" (
    "id" SERIAL NOT NULL,
    "nombre" CITEXT NOT NULL,

    CONSTRAINT "cargos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cargos_dependencias" (
    "id" SERIAL NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "dependenciaId" INTEGER NOT NULL,

    CONSTRAINT "cargos_dependencias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario_cargo_dependencias" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "cargoDependenciaId" INTEGER NOT NULL,

    CONSTRAINT "usuario_cargo_dependencias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "extension" TEXT NOT NULL,
    "uploaded_by_id" TEXT NOT NULL,
    "folder" TEXT NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conf_edicion" (
    "id" SERIAL NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conf_edicion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" CITEXT NOT NULL,
    "modification_end_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_name" CITEXT NOT NULL,
    "email" CITEXT NOT NULL,
    "password" TEXT NOT NULL,
    "must_change_pwd" INTEGER NOT NULL DEFAULT 1,
    "dni" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'personal',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personales" (
    "id" TEXT NOT NULL,
    "sexo" "Sexo" NOT NULL,
    "grupo_sanguineo" "GrupoSanguineo" NOT NULL,
    "n_autogenerado" TEXT NOT NULL,
    "licencia_conducir" CITEXT,
    "fecha_ingreso" TIMESTAMP(3) NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "domicilio" CITEXT NOT NULL,
    "numero_contacto" TEXT NOT NULL,
    "estado_civil" "EstadoCivil" NOT NULL,
    "numero_hijos" INTEGER NOT NULL DEFAULT 0,
    "discapacidad" BOOLEAN NOT NULL DEFAULT false,
    "ubigeo_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "conyuge_id" TEXT,

    CONSTRAINT "personales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conyuges" (
    "id" TEXT NOT NULL,
    "nombres" CITEXT NOT NULL,
    "apellidos" CITEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "grado_instruccion" "GradoInstruccion" NOT NULL,
    "ubigeo_id" INTEGER NOT NULL,
    "personal_id" TEXT NOT NULL,

    CONSTRAINT "conyuges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "childrens" (
    "id" TEXT NOT NULL,
    "nombres" CITEXT NOT NULL,
    "apellidos" CITEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "ubigeo_id" INTEGER NOT NULL,
    "grado_instruccion" "GradoInstruccion" NOT NULL,

    CONSTRAINT "childrens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discapacidades" (
    "id" TEXT NOT NULL,
    "tipo" "TDiscapacidad" NOT NULL,
    "discapacidad" CITEXT NOT NULL,
    "entidad_certificadora" "TEntCertDic" NOT NULL,
    "fecha_certificacion" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,

    CONSTRAINT "discapacidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personal_children" (
    "id" TEXT NOT NULL,
    "personal_id" TEXT NOT NULL,
    "children_id" TEXT NOT NULL,

    CONSTRAINT "personal_children_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estudios" (
    "id" TEXT NOT NULL,
    "nivel" "NivelEducativo" NOT NULL,
    "institucion" CITEXT NOT NULL,
    "carrera" CITEXT,
    "periodo" JSONB NOT NULL,
    "tipo" TEXT NOT NULL DEFAULT 'certificado',
    "file_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "estudios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "capacitaciones" (
    "id" TEXT NOT NULL,
    "tipe" "TipoCapacitacion" NOT NULL,
    "centro_capacitacion" CITEXT NOT NULL,
    "materia" CITEXT NOT NULL,
    "especialidad" CITEXT NOT NULL,
    "periodo" JSONB NOT NULL,
    "horas_lectivas" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL DEFAULT 'certificado',
    "file_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "capacitaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experiencias" (
    "id" TEXT NOT NULL,
    "centro_labor" CITEXT NOT NULL,
    "periodo" JSONB NOT NULL,
    "cargo" CITEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,

    CONSTRAINT "experiencias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contratos" (
    "id" TEXT NOT NULL,
    "tipo_contrato" "TContrato" NOT NULL,
    "condicion_laboral" "CLaboral" NOT NULL,
    "regimen_laboral" "RLaboral",
    "resolucion_contrato" CITEXT,
    "nivel_remuneracion" CITEXT,
    "pap" INTEGER,
    "cnp" INTEGER,
    "meta" CITEXT,
    "obra" CITEXT,
    "periodo" JSONB NOT NULL,
    "file_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "ucd_id" INTEGER NOT NULL,

    CONSTRAINT "contratos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "renuncias" (
    "id" TEXT NOT NULL,
    "motivo" CITEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "usuarioCargoDependenciaId" INTEGER NOT NULL,
    "file_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "renuncias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "desplazamientos" (
    "id" TEXT NOT NULL,
    "tipo_desplazamiento" "TipoDesplazamiento" NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "tipo_file" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "currentUCDId" INTEGER NOT NULL,
    "newUCDId" INTEGER NOT NULL,

    CONSTRAINT "desplazamientos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "descansos_medicos" (
    "id" TEXT NOT NULL,
    "detalle" CITEXT NOT NULL,
    "tipo_descanso" "TipoDescanso" NOT NULL,
    "periodo" JSONB NOT NULL,
    "user_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "usuarioCargoDependenciaId" INTEGER NOT NULL,

    CONSTRAINT "descansos_medicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permisos_licencias_vacaciones" (
    "id" TEXT NOT NULL,
    "detalle" CITEXT NOT NULL,
    "tipo" "TipoPermisoLicenciaVacacion" NOT NULL,
    "periodo" JSONB NOT NULL,
    "user_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "usuarioCargoDependenciaId" INTEGER NOT NULL,

    CONSTRAINT "permisos_licencias_vacaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ascensos" (
    "id" TEXT NOT NULL,
    "resolucion_ascenso" CITEXT NOT NULL,
    "nivel_remunerativo" CITEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "cnp" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "currentUCDId" INTEGER NOT NULL,
    "newUCDId" INTEGER NOT NULL,

    CONSTRAINT "ascensos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bonuses_personal" (
    "id" TEXT NOT NULL,
    "tipo" CITEXT NOT NULL,
    "resolucion_bonus" CITEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "usuarioCargoDependenciaId" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,

    CONSTRAINT "bonuses_personal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bonuses_family" (
    "id" TEXT NOT NULL,
    "tipo" CITEXT NOT NULL,
    "resolucion_bonus" CITEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "usuarioCargoDependenciaId" INTEGER NOT NULL,

    CONSTRAINT "bonuses_family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evaluations" (
    "id" TEXT NOT NULL,
    "etapa" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "file_id" TEXT NOT NULL,
    "evaluado_id" TEXT NOT NULL,
    "evaluado_ucd_id" INTEGER NOT NULL,
    "evaluador_id" TEXT NOT NULL,
    "evaluador_ucd_id" INTEGER NOT NULL,

    CONSTRAINT "evaluations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meritos" (
    "id" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "motivo" CITEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "usuarioCargoDependenciaId" INTEGER NOT NULL,

    CONSTRAINT "meritos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "demeritos" (
    "id" TEXT NOT NULL,
    "tipo_sancion" "tipo_sancion" NOT NULL,
    "tipo_documento" CITEXT NOT NULL,
    "asunto" CITEXT NOT NULL,
    "fecha_start" TIMESTAMP(3) NOT NULL,
    "fecha_end" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "ucd_id" INTEGER NOT NULL,

    CONSTRAINT "demeritos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos" (
    "id" TEXT NOT NULL,
    "tipo_documento" "tipo_doc" NOT NULL,
    "asunto" CITEXT NOT NULL,
    "fecha_emision" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "file_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "ucd_id" INTEGER NOT NULL,
    "r_id" TEXT NOT NULL,
    "r_ucd_id" INTEGER NOT NULL,

    CONSTRAINT "documentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "constancias" (
    "id" TEXT NOT NULL,
    "periodo" JSONB NOT NULL,
    "nivel_remunerado" CITEXT NOT NULL,
    "pap" INTEGER NOT NULL,
    "cnp" INTEGER NOT NULL,
    "ucd_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,

    CONSTRAINT "constancias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ubigeos_inei_key" ON "ubigeos"("inei");

-- CreateIndex
CREATE UNIQUE INDEX "ubigeos_reniec_key" ON "ubigeos"("reniec");

-- CreateIndex
CREATE UNIQUE INDEX "dependencias_nombre_key" ON "dependencias"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "dependencias_codigo_key" ON "dependencias"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "cargos_nombre_key" ON "cargos"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "cargos_dependencias_cargoId_dependenciaId_key" ON "cargos_dependencias"("cargoId", "dependenciaId");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_cargo_dependencias_userId_cargoDependenciaId_key" ON "usuario_cargo_dependencias"("userId", "cargoDependenciaId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_dni_key" ON "users"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "personales_n_autogenerado_key" ON "personales"("n_autogenerado");

-- CreateIndex
CREATE UNIQUE INDEX "personales_user_id_key" ON "personales"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "conyuges_dni_key" ON "conyuges"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "conyuges_personal_id_key" ON "conyuges"("personal_id");

-- CreateIndex
CREATE UNIQUE INDEX "childrens_dni_key" ON "childrens"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "discapacidades_user_id_file_id_key" ON "discapacidades"("user_id", "file_id");

-- CreateIndex
CREATE UNIQUE INDEX "personal_children_personal_id_children_id_key" ON "personal_children"("personal_id", "children_id");

-- CreateIndex
CREATE UNIQUE INDEX "estudios_user_id_file_id_key" ON "estudios"("user_id", "file_id");

-- CreateIndex
CREATE UNIQUE INDEX "capacitaciones_user_id_file_id_key" ON "capacitaciones"("user_id", "file_id");

-- CreateIndex
CREATE UNIQUE INDEX "experiencias_user_id_file_id_key" ON "experiencias"("user_id", "file_id");

-- CreateIndex
CREATE UNIQUE INDEX "contratos_user_id_file_id_key" ON "contratos"("user_id", "file_id");

-- CreateIndex
CREATE UNIQUE INDEX "renuncias_user_id_file_id_key" ON "renuncias"("user_id", "file_id");

-- CreateIndex
CREATE UNIQUE INDEX "desplazamientos_user_id_file_id_key" ON "desplazamientos"("user_id", "file_id");

-- CreateIndex
CREATE UNIQUE INDEX "descansos_medicos_user_id_file_id_key" ON "descansos_medicos"("user_id", "file_id");

-- CreateIndex
CREATE UNIQUE INDEX "permisos_licencias_vacaciones_user_id_file_id_key" ON "permisos_licencias_vacaciones"("user_id", "file_id");

-- CreateIndex
CREATE UNIQUE INDEX "ascensos_user_id_file_id_key" ON "ascensos"("user_id", "file_id");

-- CreateIndex
CREATE UNIQUE INDEX "bonuses_personal_user_id_file_id_key" ON "bonuses_personal"("user_id", "file_id");

-- CreateIndex
CREATE UNIQUE INDEX "bonuses_family_user_id_file_id_key" ON "bonuses_family"("user_id", "file_id");

-- CreateIndex
CREATE UNIQUE INDEX "evaluations_evaluado_id_file_id_key" ON "evaluations"("evaluado_id", "file_id");

-- CreateIndex
CREATE UNIQUE INDEX "meritos_user_id_file_id_key" ON "meritos"("user_id", "file_id");

-- CreateIndex
CREATE UNIQUE INDEX "demeritos_user_id_file_id_key" ON "demeritos"("user_id", "file_id");

-- CreateIndex
CREATE UNIQUE INDEX "documentos_user_id_file_id_key" ON "documentos"("user_id", "file_id");

-- CreateIndex
CREATE UNIQUE INDEX "constancias_user_id_file_id_key" ON "constancias"("user_id", "file_id");

-- AddForeignKey
ALTER TABLE "cargos_dependencias" ADD CONSTRAINT "cargos_dependencias_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "cargos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cargos_dependencias" ADD CONSTRAINT "cargos_dependencias_dependenciaId_fkey" FOREIGN KEY ("dependenciaId") REFERENCES "dependencias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_cargo_dependencias" ADD CONSTRAINT "usuario_cargo_dependencias_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_cargo_dependencias" ADD CONSTRAINT "usuario_cargo_dependencias_cargoDependenciaId_fkey" FOREIGN KEY ("cargoDependenciaId") REFERENCES "cargos_dependencias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_uploaded_by_id_fkey" FOREIGN KEY ("uploaded_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personales" ADD CONSTRAINT "personales_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personales" ADD CONSTRAINT "personales_ubigeo_id_fkey" FOREIGN KEY ("ubigeo_id") REFERENCES "ubigeos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conyuges" ADD CONSTRAINT "conyuges_personal_id_fkey" FOREIGN KEY ("personal_id") REFERENCES "personales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conyuges" ADD CONSTRAINT "conyuges_ubigeo_id_fkey" FOREIGN KEY ("ubigeo_id") REFERENCES "ubigeos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "childrens" ADD CONSTRAINT "childrens_ubigeo_id_fkey" FOREIGN KEY ("ubigeo_id") REFERENCES "ubigeos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discapacidades" ADD CONSTRAINT "discapacidades_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discapacidades" ADD CONSTRAINT "discapacidades_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_children" ADD CONSTRAINT "personal_children_personal_id_fkey" FOREIGN KEY ("personal_id") REFERENCES "personales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_children" ADD CONSTRAINT "personal_children_children_id_fkey" FOREIGN KEY ("children_id") REFERENCES "childrens"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estudios" ADD CONSTRAINT "estudios_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estudios" ADD CONSTRAINT "estudios_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capacitaciones" ADD CONSTRAINT "capacitaciones_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capacitaciones" ADD CONSTRAINT "capacitaciones_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiencias" ADD CONSTRAINT "experiencias_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiencias" ADD CONSTRAINT "experiencias_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contratos" ADD CONSTRAINT "contratos_ucd_id_fkey" FOREIGN KEY ("ucd_id") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contratos" ADD CONSTRAINT "contratos_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contratos" ADD CONSTRAINT "contratos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "renuncias" ADD CONSTRAINT "renuncias_usuarioCargoDependenciaId_fkey" FOREIGN KEY ("usuarioCargoDependenciaId") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "renuncias" ADD CONSTRAINT "renuncias_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "renuncias" ADD CONSTRAINT "renuncias_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "desplazamientos" ADD CONSTRAINT "desplazamientos_currentUCDId_fkey" FOREIGN KEY ("currentUCDId") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "desplazamientos" ADD CONSTRAINT "desplazamientos_newUCDId_fkey" FOREIGN KEY ("newUCDId") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "desplazamientos" ADD CONSTRAINT "desplazamientos_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "desplazamientos" ADD CONSTRAINT "desplazamientos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "descansos_medicos" ADD CONSTRAINT "descansos_medicos_usuarioCargoDependenciaId_fkey" FOREIGN KEY ("usuarioCargoDependenciaId") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "descansos_medicos" ADD CONSTRAINT "descansos_medicos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "descansos_medicos" ADD CONSTRAINT "descansos_medicos_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permisos_licencias_vacaciones" ADD CONSTRAINT "permisos_licencias_vacaciones_usuarioCargoDependenciaId_fkey" FOREIGN KEY ("usuarioCargoDependenciaId") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permisos_licencias_vacaciones" ADD CONSTRAINT "permisos_licencias_vacaciones_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permisos_licencias_vacaciones" ADD CONSTRAINT "permisos_licencias_vacaciones_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ascensos" ADD CONSTRAINT "ascensos_currentUCDId_fkey" FOREIGN KEY ("currentUCDId") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ascensos" ADD CONSTRAINT "ascensos_newUCDId_fkey" FOREIGN KEY ("newUCDId") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ascensos" ADD CONSTRAINT "ascensos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ascensos" ADD CONSTRAINT "ascensos_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bonuses_personal" ADD CONSTRAINT "bonuses_personal_usuarioCargoDependenciaId_fkey" FOREIGN KEY ("usuarioCargoDependenciaId") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bonuses_personal" ADD CONSTRAINT "bonuses_personal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bonuses_personal" ADD CONSTRAINT "bonuses_personal_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bonuses_family" ADD CONSTRAINT "bonuses_family_usuarioCargoDependenciaId_fkey" FOREIGN KEY ("usuarioCargoDependenciaId") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bonuses_family" ADD CONSTRAINT "bonuses_family_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bonuses_family" ADD CONSTRAINT "bonuses_family_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_evaluado_ucd_id_fkey" FOREIGN KEY ("evaluado_ucd_id") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_evaluador_ucd_id_fkey" FOREIGN KEY ("evaluador_ucd_id") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_evaluado_id_fkey" FOREIGN KEY ("evaluado_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_evaluador_id_fkey" FOREIGN KEY ("evaluador_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meritos" ADD CONSTRAINT "meritos_usuarioCargoDependenciaId_fkey" FOREIGN KEY ("usuarioCargoDependenciaId") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meritos" ADD CONSTRAINT "meritos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meritos" ADD CONSTRAINT "meritos_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demeritos" ADD CONSTRAINT "demeritos_ucd_id_fkey" FOREIGN KEY ("ucd_id") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demeritos" ADD CONSTRAINT "demeritos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demeritos" ADD CONSTRAINT "demeritos_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_ucd_id_fkey" FOREIGN KEY ("ucd_id") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_r_ucd_id_fkey" FOREIGN KEY ("r_ucd_id") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_r_id_fkey" FOREIGN KEY ("r_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "constancias" ADD CONSTRAINT "constancias_ucd_id_fkey" FOREIGN KEY ("ucd_id") REFERENCES "usuario_cargo_dependencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "constancias" ADD CONSTRAINT "constancias_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "constancias" ADD CONSTRAINT "constancias_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
