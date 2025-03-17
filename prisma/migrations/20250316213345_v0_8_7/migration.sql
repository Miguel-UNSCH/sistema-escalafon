/*
  Warnings:

  - You are about to drop the column `endTime` on the `rud_access` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `rud_access` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[start_time,end_time]` on the table `rud_access` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `end_time` to the `rud_access` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `rud_access` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "rud_access_startTime_endTime_key";

-- AlterTable
ALTER TABLE "rud_access" DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "end_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "rud_access_start_time_end_time_key" ON "rud_access"("start_time", "end_time");
