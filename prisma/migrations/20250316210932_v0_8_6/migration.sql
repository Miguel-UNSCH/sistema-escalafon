-- CreateTable
CREATE TABLE "rud_access" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rud_access_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rud_access_startTime_endTime_key" ON "rud_access"("startTime", "endTime");
