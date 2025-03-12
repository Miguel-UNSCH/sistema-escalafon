-- CreateTable
CREATE TABLE "bonuses_family" (
    "id" TEXT NOT NULL,
    "tipo" CITEXT NOT NULL,
    "resolucion_bonus" CITEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "cargo_id" INTEGER NOT NULL,
    "dependencia_id" INTEGER NOT NULL,

    CONSTRAINT "bonuses_family_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bonuses_family_user_id_file_id_key" ON "bonuses_family"("user_id", "file_id");

-- AddForeignKey
ALTER TABLE "bonuses_family" ADD CONSTRAINT "bonuses_family_cargo_id_fkey" FOREIGN KEY ("cargo_id") REFERENCES "cargos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bonuses_family" ADD CONSTRAINT "bonuses_family_dependencia_id_fkey" FOREIGN KEY ("dependencia_id") REFERENCES "dependencias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bonuses_family" ADD CONSTRAINT "bonuses_family_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bonuses_family" ADD CONSTRAINT "bonuses_family_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
