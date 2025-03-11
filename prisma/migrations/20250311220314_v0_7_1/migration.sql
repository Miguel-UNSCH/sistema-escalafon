-- CreateTable
CREATE TABLE "desplazamientos" (
    "id" TEXT NOT NULL,
    "tipo_desplazamiento" "TipoDesplazamiento" NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "tipo_file" TEXT NOT NULL,
    "current_cargo_id" INTEGER NOT NULL,
    "new_cargo_id" INTEGER NOT NULL,
    "current_dependencia_id" INTEGER NOT NULL,
    "new_dependencia_id" INTEGER NOT NULL,
    "file_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "desplazamientos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "desplazamientos_user_id_file_id_key" ON "desplazamientos"("user_id", "file_id");

-- AddForeignKey
ALTER TABLE "desplazamientos" ADD CONSTRAINT "desplazamientos_current_cargo_id_fkey" FOREIGN KEY ("current_cargo_id") REFERENCES "cargos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "desplazamientos" ADD CONSTRAINT "desplazamientos_new_cargo_id_fkey" FOREIGN KEY ("new_cargo_id") REFERENCES "cargos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "desplazamientos" ADD CONSTRAINT "desplazamientos_current_dependencia_id_fkey" FOREIGN KEY ("current_dependencia_id") REFERENCES "dependencias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "desplazamientos" ADD CONSTRAINT "desplazamientos_new_dependencia_id_fkey" FOREIGN KEY ("new_dependencia_id") REFERENCES "dependencias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "desplazamientos" ADD CONSTRAINT "desplazamientos_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "desplazamientos" ADD CONSTRAINT "desplazamientos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
