"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TableData } from "./table-data";
import { FormData } from "./form-data";
import { getMeritos, meritoRecord } from "@/actions/m-d-action";
import { debounce, set } from "lodash";

export const ContentData = () => {
  const [meritos, setMeritos] = useState<meritoRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMerito, setSelectedMerito] = useState<meritoRecord | null>(null);

  const fnMeritos = async () => {
    setLoading(true);
    try {
      const response = await getMeritos();
      if (response.success && response.data) {
        setMeritos(response.data);
      } else toast.error(response.message || "No se pudieron obtener los méritos.");

      // eslint-disable-next-line no-unused-vars
    } catch (e: unknown) {
      toast.error("Error al obtener los méritos.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFnMeritos = debounce(fnMeritos, 500);

  useEffect(() => {
    fnMeritos();
  }, []);

  const handleRefresh = () => {
    fnMeritos();
    setSelectedMerito(null);
  };

  return (
    <div className="flex flex-col gap-5 p-2 w-4/5">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Méritos</p>
      {meritos.length ? <TableData meritos={meritos} loading={loading} /> : <div className="bg-mantle p-4 rounded-md font-text font-semibold text-lavender">No hay resgistros</div>}

      <FormData fetchMeritos={fnMeritos} />
    </div>
  );
};
