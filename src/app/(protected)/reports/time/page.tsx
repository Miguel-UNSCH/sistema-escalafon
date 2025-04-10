"use client";
import { fn_tex_compile } from "@/actions/tex-action";
import { Button } from "@/components/ui/button";
import { generateLatexZip } from "@/utils/zip-reporter";
import { ArrowLeft, CloudDownload } from "lucide-react";
import React, { useState } from "react";
import { FnA } from "./fn-a";
import { FnB } from "./fn-b";
import { FnC } from "./fn-c";
import { FnD } from "./fn-d";

const page = () => {
  const [user_id, setuser_id] = useState<string>("");

  const handleBack = () => setuser_id("");

  const handleTexToPdf = async () => {
    const tipo = "time";
    const nombre = "usuario123";

    await generateLatexZip(nombre);

    const url = await fn_tex_compile(tipo, nombre);

    window.open(url, "_blank");
  };

  const handleZipGenerate = async () => {
    await generateLatexZip("usuario123");
  };

  return (
    <div className="p-5 w-full h-full">
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col items-center py-5 text-text">
          <h2 className="hover:border-text hover:border-b-4 font-primary font-bold text-2xl uppercase">computo de tiempo</h2>
        </div>

        <div className="flex flex-row items-end gap-4">
          <Button onClick={handleTexToPdf}>generar reporte</Button>
          <Button onClick={handleZipGenerate}>generar zip</Button>
        </div>

        <div className="flex flex-col gap-4 p-4 px-8">
          {!user_id ? (
            <FnA setuser_id={setuser_id} />
          ) : (
            <div className="flex flex-row justify-end gap-5 font-special text-xs">
              <Button onClick={handleBack} className="bg-mantle px-4 py-2 text-text hover:text-base">
                <ArrowLeft />
                Regresar
              </Button>

              <Button className="flex flex-row items-center bg-mantle hover:bg-green px-4 py-2 text-text hover:text-base">
                <CloudDownload />
                Descargar Reporte
              </Button>
            </div>
          )}

          {user_id && (
            <>
              <FnB user_id={user_id} />
              <FnC user_id={user_id} />
              <FnD />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
