"use client";

import React, { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { ArrowLeft, CloudDownload } from "lucide-react";
import { FnA } from "./fn-a";
import { FnB } from "./fn-b";
import { FnC } from "./fn-c";
import { FnD } from "./fn-d";
import { time_report } from "@/actions/reports-gn-action";
import { FnData, FnRtBResponse } from "@/types/reports";

const page = () => {
  const [user_id, setuser_id] = useState<string>("");
  const [fn_data, setFn_data] = useState<FnData>({
    fnB: {
      data: {} as FnRtBResponse,
      motivo: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  const handleBack = () => setuser_id("");

  const handleClick = () => {
    startTransition(async () => {
      const url = await time_report("time_report", fn_data);
      window.open(url, "_blank");
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
              <FnB
                user_id={user_id}
                setFn_data={(data) => setFn_data((prev) => ({ ...prev, fnB: { ...prev.fnB, data, motivo: prev.fnB?.motivo ?? "" } }))}
                setMotivo={(motivo) => setFn_data((prev) => ({ ...prev, fnB: { ...prev.fnB!, motivo } }))}
              />
              <FnC user_id={user_id} setFn_data={(data) => setFn_data((prev) => ({ ...prev, fnC: data }))} />
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
