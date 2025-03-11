-- CreateEnum
CREATE TYPE "NivelEducativo" AS ENUM ('p', 's', 't', 'u', 'm', 'd', 'e');

-- DropEnum
DROP TYPE "FormacionAcademica";

-- CreateTable
CREATE TABLE "estudios" (
    "id" TEXT NOT NULL,
    "personal_id" TEXT NOT NULL,
    "nivel" "NivelEducativo" NOT NULL,
    "institucion" TEXT NOT NULL,
    "carrera" TEXT,
    "periodo" JSONB NOT NULL,
    "certificado" TEXT,

    CONSTRAINT "estudios_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "estudios" ADD CONSTRAINT "estudios_personal_id_fkey" FOREIGN KEY ("personal_id") REFERENCES "personales"("id") ON DELETE CASCADE ON UPDATE CASCADE;
