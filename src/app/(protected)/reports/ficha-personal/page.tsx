"use client";

import React, { useState } from "react";
import { FnA } from "../time/fn-a";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CloudDownload } from "lucide-react";
import { ContentData } from "./content-data";

const page = () => {
  const [user_id, setuser_id] = useState<string>("");

  const handleBack = () => setuser_id("");

  return (
    <div className="p-5 w-full h-full">
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col items-center py-5 text-text">
          <h2 className="hover:border-text hover:border-b-4 font-primary font-bold text-2xl uppercase">ficha de datos personales</h2>
        </div>

        <div className="flex flex-col gap-4 p-4 px-8">
          {!user_id && <FnA setuser_id={setuser_id} />}

          {user_id && (
            <>
              <ContentData user_id={user_id} />
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
