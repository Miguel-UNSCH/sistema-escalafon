/*
  Warnings:

  - A unique constraint covering the columns `[user_id,file_id]` on the table `capacitaciones` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,file_id]` on the table `contratos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,file_id]` on the table `estudios` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,file_id]` on the table `experiencias` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "discapacidades" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "discapacidad" CITEXT NOT NULL,
    "entidad_certificadora" CITEXT,
    "fecha_certificacion" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,

    CONSTRAINT "discapacidades_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "discapacidades_user_id_file_id_key" ON "discapacidades"("user_id", "file_id");

-- CreateIndex
CREATE UNIQUE INDEX "capacitaciones_user_id_file_id_key" ON "capacitaciones"("user_id", "file_id");

-- CreateIndex
CREATE UNIQUE INDEX "contratos_user_id_file_id_key" ON "contratos"("user_id", "file_id");

-- CreateIndex
CREATE UNIQUE INDEX "estudios_user_id_file_id_key" ON "estudios"("user_id", "file_id");

-- CreateIndex
CREATE UNIQUE INDEX "experiencias_user_id_file_id_key" ON "experiencias"("user_id", "file_id");

-- AddForeignKey
ALTER TABLE "discapacidades" ADD CONSTRAINT "discapacidades_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discapacidades" ADD CONSTRAINT "discapacidades_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
