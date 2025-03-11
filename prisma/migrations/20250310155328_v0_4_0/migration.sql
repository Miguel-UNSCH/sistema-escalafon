-- CreateTable
CREATE TABLE "childrens" (
    "id" TEXT NOT NULL,
    "nombre" CITEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "ubigeo_id" INTEGER NOT NULL,

    CONSTRAINT "childrens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personal_children" (
    "id" TEXT NOT NULL,
    "personal_id" TEXT NOT NULL,
    "children_id" TEXT NOT NULL,

    CONSTRAINT "personal_children_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "childrens_dni_key" ON "childrens"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "personal_children_personal_id_children_id_key" ON "personal_children"("personal_id", "children_id");

-- AddForeignKey
ALTER TABLE "childrens" ADD CONSTRAINT "childrens_ubigeo_id_fkey" FOREIGN KEY ("ubigeo_id") REFERENCES "ubigeos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_children" ADD CONSTRAINT "personal_children_personal_id_fkey" FOREIGN KEY ("personal_id") REFERENCES "personales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_children" ADD CONSTRAINT "personal_children_children_id_fkey" FOREIGN KEY ("children_id") REFERENCES "childrens"("id") ON DELETE CASCADE ON UPDATE CASCADE;
