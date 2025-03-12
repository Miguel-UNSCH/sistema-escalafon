-- CreateTable
CREATE TABLE "descansos_medicos" (
    "id" TEXT NOT NULL,
    "tipo_descanso" "TipoDescanso" NOT NULL,
    "periodo" JSONB NOT NULL,
    "user_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "cargo_id" INTEGER NOT NULL,
    "dependencia_id" INTEGER NOT NULL,

    CONSTRAINT "descansos_medicos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "descansos_medicos_user_id_file_id_key" ON "descansos_medicos"("user_id", "file_id");

-- AddForeignKey
ALTER TABLE "descansos_medicos" ADD CONSTRAINT "descansos_medicos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "descansos_medicos" ADD CONSTRAINT "descansos_medicos_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "descansos_medicos" ADD CONSTRAINT "descansos_medicos_cargo_id_fkey" FOREIGN KEY ("cargo_id") REFERENCES "cargos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "descansos_medicos" ADD CONSTRAINT "descansos_medicos_dependencia_id_fkey" FOREIGN KEY ("dependencia_id") REFERENCES "dependencias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
