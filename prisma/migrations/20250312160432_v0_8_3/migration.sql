-- CreateTable
CREATE TABLE "documentos" (
    "id" TEXT NOT NULL,
    "numero_documento" TEXT NOT NULL,
    "tipo_documento" TEXT NOT NULL,
    "asunto" TEXT NOT NULL,
    "fecha_emision" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "file_id" TEXT NOT NULL,
    "emisor_id" TEXT NOT NULL,
    "receptor_id" TEXT NOT NULL,
    "cargo_emisor_id" INTEGER NOT NULL,
    "cargo_receptor_id" INTEGER NOT NULL,
    "dependencia_emisor_id" INTEGER NOT NULL,
    "dependencia_receptor_id" INTEGER NOT NULL,

    CONSTRAINT "documentos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "documentos_numero_documento_key" ON "documentos"("numero_documento");

-- CreateIndex
CREATE UNIQUE INDEX "documentos_emisor_id_file_id_key" ON "documentos"("emisor_id", "file_id");

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_emisor_id_fkey" FOREIGN KEY ("emisor_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_receptor_id_fkey" FOREIGN KEY ("receptor_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_cargo_emisor_id_fkey" FOREIGN KEY ("cargo_emisor_id") REFERENCES "cargos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_cargo_receptor_id_fkey" FOREIGN KEY ("cargo_receptor_id") REFERENCES "cargos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_dependencia_emisor_id_fkey" FOREIGN KEY ("dependencia_emisor_id") REFERENCES "dependencias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_dependencia_receptor_id_fkey" FOREIGN KEY ("dependencia_receptor_id") REFERENCES "dependencias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
