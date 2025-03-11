-- AlterTable
ALTER TABLE "personales" ADD COLUMN     "conyuge_id" TEXT;

-- CreateTable
CREATE TABLE "conyuges" (
    "id" TEXT NOT NULL,
    "nombres" CITEXT NOT NULL,
    "apellidos" CITEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "ubigeo_id" TEXT NOT NULL,
    "gradoInstruccion" "GradoInstruccion" NOT NULL,
    "personal_id" TEXT NOT NULL,

    CONSTRAINT "conyuges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "conyuges_dni_key" ON "conyuges"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "conyuges_personal_id_key" ON "conyuges"("personal_id");

-- AddForeignKey
ALTER TABLE "conyuges" ADD CONSTRAINT "conyuges_personal_id_fkey" FOREIGN KEY ("personal_id") REFERENCES "personales"("id") ON DELETE CASCADE ON UPDATE CASCADE;
