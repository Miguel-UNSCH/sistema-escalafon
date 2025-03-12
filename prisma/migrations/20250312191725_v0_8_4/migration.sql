-- CreateTable
CREATE TABLE "demeritos" (
    "id" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "tipo_sancion" CITEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "cargo_id" INTEGER NOT NULL,
    "dependencia_id" INTEGER NOT NULL,

    CONSTRAINT "demeritos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "demeritos_user_id_file_id_key" ON "demeritos"("user_id", "file_id");

-- AddForeignKey
ALTER TABLE "demeritos" ADD CONSTRAINT "demeritos_cargo_id_fkey" FOREIGN KEY ("cargo_id") REFERENCES "cargos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demeritos" ADD CONSTRAINT "demeritos_dependencia_id_fkey" FOREIGN KEY ("dependencia_id") REFERENCES "dependencias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demeritos" ADD CONSTRAINT "demeritos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demeritos" ADD CONSTRAINT "demeritos_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
