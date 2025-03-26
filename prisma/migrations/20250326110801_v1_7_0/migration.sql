-- CreateTable
CREATE TABLE "conf_edicion" (
    "id" SERIAL NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conf_edicion_pkey" PRIMARY KEY ("id")
);
