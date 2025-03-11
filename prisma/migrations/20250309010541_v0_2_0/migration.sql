-- DropIndex
DROP INDEX "files_path_key";

-- CreateTable
CREATE TABLE "personales" (
    "id" TEXT NOT NULL,
    "sexo" "Sexo" NOT NULL,
    "grupo_sanguineo" "GrupoSanguineo" NOT NULL,
    "n_autogenerado" TEXT NOT NULL,
    "licencia_conducir" CITEXT,
    "fecha_ingreso" TIMESTAMP(3) NOT NULL,
    "anios_servicio" INTEGER NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "domicilio" CITEXT NOT NULL,
    "numero_contacto" TEXT NOT NULL,
    "unidad_estructurada" CITEXT NOT NULL,
    "regimen_pensionario" "RegimenPensionario" NOT NULL,
    "situacionLaboral" "SituacionLaboral" NOT NULL,
    "estadoCivil" "EstadoCivil" NOT NULL,
    "discapacidad" BOOLEAN NOT NULL DEFAULT false,
    "cargo_id" INTEGER NOT NULL,
    "ubigeo_id" INTEGER NOT NULL,
    "dependencia_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "personales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "personales_user_id_key" ON "personales"("user_id");

-- AddForeignKey
ALTER TABLE "personales" ADD CONSTRAINT "personales_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personales" ADD CONSTRAINT "personales_cargo_id_fkey" FOREIGN KEY ("cargo_id") REFERENCES "cargos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personales" ADD CONSTRAINT "personales_dependencia_id_fkey" FOREIGN KEY ("dependencia_id") REFERENCES "dependencias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personales" ADD CONSTRAINT "personales_ubigeo_id_fkey" FOREIGN KEY ("ubigeo_id") REFERENCES "ubigeos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
