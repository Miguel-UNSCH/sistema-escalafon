-- CreateTable
CREATE TABLE "permisos_licencias_vacaciones" (
    "id" TEXT NOT NULL,
    "tipo" "TipoPermisoLicenciaVacacion" NOT NULL,
    "periodo" JSONB NOT NULL,
    "user_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "cargo_id" INTEGER NOT NULL,
    "dependencia_id" INTEGER NOT NULL,

    CONSTRAINT "permisos_licencias_vacaciones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "permisos_licencias_vacaciones_user_id_file_id_key" ON "permisos_licencias_vacaciones"("user_id", "file_id");

-- AddForeignKey
ALTER TABLE "permisos_licencias_vacaciones" ADD CONSTRAINT "permisos_licencias_vacaciones_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permisos_licencias_vacaciones" ADD CONSTRAINT "permisos_licencias_vacaciones_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permisos_licencias_vacaciones" ADD CONSTRAINT "permisos_licencias_vacaciones_cargo_id_fkey" FOREIGN KEY ("cargo_id") REFERENCES "cargos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permisos_licencias_vacaciones" ADD CONSTRAINT "permisos_licencias_vacaciones_dependencia_id_fkey" FOREIGN KEY ("dependencia_id") REFERENCES "dependencias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
