"use client";

import React, { useState, useTransition } from "react";
import { FnA } from "../time/fn-a";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CloudDownload } from "lucide-react";
import { ContentData } from "./content-data";
import { fn_report_fp } from "@/actions/reports-action";

const page = () => {
  const [user_id, setuser_id] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const handleBack = () => setuser_id("");

  const handleClick = () => {
    startTransition(async () => {
      const res = await fn_report_fp(user_id);
      if (res.success && res.url) {
        window.open(res.url, "_blank");
      }
    });
  };

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

                <Button className="flex flex-row items-center bg-mantle hover:bg-green px-4 py-2 text-text hover:text-base" onClick={handleClick} disabled={isPending}>
                  <CloudDownload />
                  {isPending ? "Generando..." : "Descargar Reporte"}
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
