"use client";

import { useEffect, useState } from "react";
import { TableData } from "./TableData";
import { IPersonal } from "@/interfaces";

const Page = () => {
  const [personales, setpersonales] = useState<IPersonal[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPersonales = async () => {
      try {
        const response = await fetch("/api/personal");
        if (!response.ok) throw new Error("Error al obtener los datos");

        const data = await response.json();
        setpersonales(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonales();
  }, []);

  if (loading) return <p>Cargando datos...</p>;

  if (personales.length === 0) return <p>No se encontraron datos.</p>;

  return (
    <div className="flex flex-row justify-center gap-5 w-full h-full">
      <div className="flex flex-col gap-2 p-2 w-11/12">
        <h3 className="flex font-inter font-bold text-xl text-start uppercase">editar usuario</h3>
        <TableData data={personales} />
      </div>
    </div>
  );
};

export default Page;
