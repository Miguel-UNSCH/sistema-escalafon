-- AlterTable
ALTER TABLE "ascensos" ALTER COLUMN "resolucion_ascenso" SET DATA TYPE CITEXT,
ALTER COLUMN "nivel_remunerativo" SET DATA TYPE CITEXT;

-- CreateTable
CREATE TABLE "bonuses_personal" (
    "id" TEXT NOT NULL,
    "tipo" CITEXT NOT NULL,
    "resolucion_bonus" CITEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "cargo_id" INTEGER NOT NULL,
    "dependencia_id" INTEGER NOT NULL,

    CONSTRAINT "bonuses_personal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bonuses_personal_user_id_file_id_key" ON "bonuses_personal"("user_id", "file_id");

-- AddForeignKey
ALTER TABLE "bonuses_personal" ADD CONSTRAINT "bonuses_personal_cargo_id_fkey" FOREIGN KEY ("cargo_id") REFERENCES "cargos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bonuses_personal" ADD CONSTRAINT "bonuses_personal_dependencia_id_fkey" FOREIGN KEY ("dependencia_id") REFERENCES "dependencias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bonuses_personal" ADD CONSTRAINT "bonuses_personal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bonuses_personal" ADD CONSTRAINT "bonuses_personal_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
