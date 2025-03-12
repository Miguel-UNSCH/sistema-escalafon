-- CreateTable
CREATE TABLE "ascensos" (
    "id" TEXT NOT NULL,
    "resolucion_ascenso" TEXT NOT NULL,
    "nivel_remunerativo" TEXT NOT NULL,
    "periodo" JSONB NOT NULL,
    "cnp" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "current_cargo_id" INTEGER NOT NULL,
    "new_cargo_id" INTEGER NOT NULL,
    "current_dependencia_id" INTEGER NOT NULL,
    "new_dependencia_id" INTEGER NOT NULL,

    CONSTRAINT "ascensos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ascensos_user_id_file_id_key" ON "ascensos"("user_id", "file_id");

-- AddForeignKey
ALTER TABLE "ascensos" ADD CONSTRAINT "ascensos_current_cargo_id_fkey" FOREIGN KEY ("current_cargo_id") REFERENCES "cargos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ascensos" ADD CONSTRAINT "ascensos_new_cargo_id_fkey" FOREIGN KEY ("new_cargo_id") REFERENCES "cargos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ascensos" ADD CONSTRAINT "ascensos_current_dependencia_id_fkey" FOREIGN KEY ("current_dependencia_id") REFERENCES "dependencias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ascensos" ADD CONSTRAINT "ascensos_new_dependencia_id_fkey" FOREIGN KEY ("new_dependencia_id") REFERENCES "dependencias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ascensos" ADD CONSTRAINT "ascensos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ascensos" ADD CONSTRAINT "ascensos_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
