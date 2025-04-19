"use client";

import React, { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { ArrowLeft, CloudDownload } from "lucide-react";
import { FnA } from "./fn-a";
import { FnB, report_timeSchema } from "./fn-b";
import { FnC } from "./fn-c";
import { FnD } from "./fn-d";
import { ContractReportItem, FnData, FnRtBResponse } from "@/types/reports";
import { fn_report_time } from "@/actions/reports-action";
import { z } from "zod";
import toast from "react-hot-toast";

const page = () => {
  const [user_id, setuser_id] = useState<string>("");
  const [fn_data, setFn_data] = useState<FnData>({
    fnB: {} as FnRtBResponse,
    fnC: [] as ContractReportItem[],
  });
  const [formValues, setFormValues] = useState<z.infer<typeof report_timeSchema>>({
    motivo: "sin especificar",
    init: undefined,
    end: undefined,
  });
  const [isPending, startTransition] = useTransition();

  const handleBack = () => setuser_id("");

  const handleClick = () => {
    startTransition(async () => {
      const res = await fn_report_time(user_id, fn_data);
      if (res.success && res.url) {
        window.open(res.url, "_blank");
        toast.success("PDF generado correctamente");
      } else toast.error(res.message || "Error al generar el PDF");
    });
  };

  return (
    <div className="p-5 w-full h-full">
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col items-center py-5 text-text">
          <h2 className="hover:border-text hover:border-b-4 font-primary font-bold text-2xl uppercase">computo de tiempo</h2>
        </div>

        <div className="flex flex-col gap-4 p-4 px-8">
          {!user_id && <FnA setuser_id={setuser_id} />}

          {user_id && (
            <>
              <FnB user_id={user_id} setFnDataFull={({ data }) => setFn_data((prev) => ({ ...prev, fnB: data }))} setFormValues={setFormValues} />
              <FnC user_id={user_id} setFn_data={(data) => setFn_data((prev) => ({ ...prev, fnC: data }))} formValues={formValues ?? undefined} />
              <FnD />
              <div className="flex flex-row justify-end gap-5 font-special text-xs">
                <Button onClick={handleBack} className="bg-mantle px-4 py-2 text-text hover:text-base">
                  <ArrowLeft />
                  Regresar
                </Button>

                <Button className="flex flex-row items-center bg-mantle hover:bg-green px-4 py-2 text-text hover:text-base" onClick={handleClick} disabled={isPending}>
                  <CloudDownload />
                  {isPending ? "Generando PDF..." : "Generar PDF"}
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
