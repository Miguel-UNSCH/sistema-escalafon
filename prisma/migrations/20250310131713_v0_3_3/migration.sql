-- AddForeignKey
ALTER TABLE "conyuges" ADD CONSTRAINT "conyuges_ubigeo_id_fkey" FOREIGN KEY ("ubigeo_id") REFERENCES "ubigeos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
