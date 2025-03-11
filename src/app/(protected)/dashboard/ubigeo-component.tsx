"use client";

import { getUbigeos } from "@/actions/others-action";
import { Pagination } from "@/components/pagination";
import { ZUbigeo } from "@/lib/schemas/others-schema";
import { useEffect, useState } from "react";

export const UbigeoComponent = () => {
  const [ubigeos, setUbigeos] = useState<ZUbigeo[]>([]);

  useEffect(() => {
    async function fetchUbigeos() {
      const data = await getUbigeos({});
      if (!data) return;
      setUbigeos(data);
    }
    fetchUbigeos();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const headColum = ["inei", "reniec", "departamento", "provincia", "distrito"];

  const totalPages = Math.ceil(ubigeos.length / itemsPerPage);
  const currentUbigeos = ubigeos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col gap-2 w-full">
      <p className="font-primary font-bold">Ubigeos</p>
      <p>Buscar ubigeos por inei, reniec, departamento, provincia o distrito</p>
      <div className="relative sm:rounded-md overflow-x-auto">
        <table className="w-full text-text text-sm text-left rtl:text-right">
          <thead className="top-0 z-10 sticky text-xs uppercase">
            <tr>
              {headColum.map((head, i) => (
                <th scope="col" className="px-6 py-3 text-sm" key={i}>
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentUbigeos.map((ubigeo) => (
              <tr key={ubigeo.inei} className="hover:bg-crust text-xs">
                <td className="px-6 py-4">{ubigeo.inei}</td>
                <th className="px-6 py-4">{ubigeo.reniec}</th>
                <td className="px-6 py-4">{ubigeo.departamento}</td>
                <td className="px-6 py-4">{ubigeo.provincia}</td>
                <td className="px-6 py-4">{ubigeo.distrito}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  );
};
