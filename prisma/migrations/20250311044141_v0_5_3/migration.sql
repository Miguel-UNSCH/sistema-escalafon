-- CreateTable
CREATE TABLE "capacitacion" (
    "id" TEXT NOT NULL,
    "centro_capacitacion" CITEXT NOT NULL,
    "materia" CITEXT NOT NULL,
    "especialidad" CITEXT NOT NULL,
    "periodo" JSONB NOT NULL,
    "horas_lectivas" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL DEFAULT 'certificado',
    "file_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "capacitacion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "capacitacion" ADD CONSTRAINT "capacitacion_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capacitacion" ADD CONSTRAINT "capacitacion_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;
