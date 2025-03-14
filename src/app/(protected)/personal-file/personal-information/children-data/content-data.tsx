"use client";

import toast from "react-hot-toast";
import { Children } from "@prisma/client";
import React, { useEffect, useState } from "react";

import { FormData } from "./form-data";
import { TableData } from "./table-data";
import { getChilds } from "@/actions/children-action";

export const ContentData = () => {
  const [children, setChildren] = useState<Children[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchChildren = async () => {
    setLoading(true);
    try {
      const response = await getChilds();
      if (response.success && response.data) {
        setChildren(response.data);
      } else toast.error(response.message || "No se pudieron obtener los hijos.");

      // eslint-disable-next-line no-unused-vars
    } catch (e: unknown) {
      toast.error("Error al obtener los hijos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  return (
    <div className="flex flex-col gap-5 p-2 w-4/5">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Datos de los Hijos</p>
      <TableData children={children} loading={loading} />
      <FormData fetchChildren={fetchChildren} />
    </div>
  );
};
