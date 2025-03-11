-- CreateEnum
CREATE TYPE "TContrato" AS ENUM ('dl_276', 'cas', 'dl_276_proyecto', 'practicante');

-- CreateEnum
CREATE TYPE "SLaboral" AS ENUM ('nombrado', 'contratado', 'plaza_vacante', 'designado', 'indeterminado', 'eventual', 'reincorporado', 'mandato_judicial', 'profesional', 'preprofesional');

-- CreateEnum
CREATE TYPE "RLaboral" AS ENUM ('dl_276', 'fag_cas', 'fun_276', 'cas', 'regimen_especial');

-- CreateTable
CREATE TABLE "contratos" (
    "id" TEXT NOT NULL,
    "tipo_contrato" "TContrato" NOT NULL,
    "condicion_laboral" "SLaboral" NOT NULL,
    "resolucion_contrato" CITEXT,
    "regimen_laboral" "RLaboral" NOT NULL,
    "nivel_remuneracion" CITEXT,
    "pap" CITEXT,
    "cnp" CITEXT,
    "meta" CITEXT,
    "convenio" CITEXT,
    "fecha_ingreso" TIMESTAMP(3) NOT NULL,
    "fecha_cese" TIMESTAMP(3),
    "cargo_id" INTEGER NOT NULL,
    "dependencia_id" INTEGER NOT NULL,
    "file_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "contratos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contratos" ADD CONSTRAINT "contratos_cargo_id_fkey" FOREIGN KEY ("cargo_id") REFERENCES "cargos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contratos" ADD CONSTRAINT "contratos_dependencia_id_fkey" FOREIGN KEY ("dependencia_id") REFERENCES "dependencias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contratos" ADD CONSTRAINT "contratos_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contratos" ADD CONSTRAINT "contratos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
