-- CreateTable
CREATE TABLE "renuncias" (
    "id" TEXT NOT NULL,
    "motivo" CITEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "cargo_id" INTEGER NOT NULL,
    "dependencia_id" INTEGER NOT NULL,
    "file_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "renuncias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "renuncias_user_id_file_id_key" ON "renuncias"("user_id", "file_id");

-- AddForeignKey
ALTER TABLE "renuncias" ADD CONSTRAINT "renuncias_cargo_id_fkey" FOREIGN KEY ("cargo_id") REFERENCES "cargos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "renuncias" ADD CONSTRAINT "renuncias_dependencia_id_fkey" FOREIGN KEY ("dependencia_id") REFERENCES "dependencias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "renuncias" ADD CONSTRAINT "renuncias_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "renuncias" ADD CONSTRAINT "renuncias_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
