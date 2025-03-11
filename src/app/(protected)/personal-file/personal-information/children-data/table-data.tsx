// eslint-disable no-unused-vars
"use client";

import { getChilds } from "@/actions/children-action";
import { gradoInstruccionOp } from "@/utils/options";
import { Children } from "@prisma/client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const TableData = () => {
  const [child, setChild] = useState<Children[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchChildren = async () => {
    setLoading(true);
    try {
      const response = await getChilds();
      if (response.success && response.data) {
        setChild(response.data);
        toast.success("Hijos cargados correctamente.");
      } else {
        toast.error(response.message || "No se pudieron obtener los hijos.");
      }
    } catch (e: unknown) {
      toast.error("Error al obtener los hijos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  const theadContent = ["Nombres", "Apellidos", "DNI", "Fecha de Nacimiento", "Grado de Instrucción"];

  return (
    <div className="relative bg-mantle sm:rounded-md overflow-x-auto">
      {loading ? (
        <p className="py-4 text-subtext0 text-center">Cargando datos...</p>
      ) : child.length === 0 ? (
        <p className="py-4 text-subtext0 text-center">Aún no existen registros.</p>
      ) : (
        <table className="w-full text-text text-sm text-left rtl:text-right">
          <thead className="top-0 z-10 sticky text-xs uppercase">
            <tr>
              {theadContent.map((thead) => (
                <th scope="col" className="px-3 py-3 border-b-2 border-base text-sm" key={thead}>
                  {thead}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {child.map(({ id, nombres, apellidos, dni, fecha_nacimiento, grado_instruccion }) => (
              <tr key={id} className="hover:bg-crust text-subtext0 text-sm cursor-pointer" onClick={() => toast.success(`ID: ${id}`)}>
                <td className="px-3 py-4">{nombres}</td>
                <td className="px-3 py-4">{apellidos}</td>
                <td className="px-3 py-4">{dni}</td>
                <td className="px-3 py-4">{new Date(fecha_nacimiento).toLocaleDateString()}</td>
                <td className="px-3 py-4">{gradoInstruccionOp.find((item) => item.key === grado_instruccion)?.value || "DESCONOCIDO"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
