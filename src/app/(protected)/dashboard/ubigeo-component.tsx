"use client";

import { getUbigeos } from "@/actions/others-action";
import { Pagination } from "@/components/pagination";
import { Ubigeo } from "@prisma/client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { debounce } from "lodash";
import { SearchField } from "@/components/custom-fields/search-field";

export const UbigeoComponent = () => {
  const [ubigeos, setUbigeos] = useState<Ubigeo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  const fnUbigeos = async (search: string) => {
    setLoading(true);
    try {
      const response = await getUbigeos(search);
      if (response.success && response.data) {
        setUbigeos(response.data);
      } else {
        toast.error(response.message || "No se pudieron obtener los ubigeos.");
      }
    } catch {
      toast.error("Error al obtener los desplazamientos.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFnUbigeos = debounce(fnUbigeos, 500);

  const handleSearch = (query: string) => {
    setSearch(query);
    debouncedFnUbigeos(query);
  };

  useEffect(() => {
    fnUbigeos("");
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(ubigeos.length / itemsPerPage);
  const currentUbigeos = ubigeos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col gap-2 w-full">
      <p className="font-primary font-bold">Ubigeos</p>
      <SearchField description="Buscar ubigeos por INEI, RENIEC, departamento, provincia o distrito" value={search} onSearch={handleSearch} />

      <div className="flex flex-col gap-2 border-2 border-mantle rounded-md w-full">
        {loading ? (
          <p className="py-4 text-subtext0 text-center">Cargando datos...</p>
        ) : ubigeos.length === 0 ? (
          <p className="py-4 text-subtext0 text-center">Aún no existen registros.</p>
        ) : (
          <div className="relative sm:rounded-md overflow-x-auto">
            <table className="w-full text-text text-sm text-left rtl:text-right">
              <thead className="top-0 z-10 sticky bg-mantle text-xs uppercase">
                <tr>
                  <th scope="col" className="hidden lg:table-cell px-6 py-3 text-sm">
                    INEI
                  </th>
                  <th scope="col" className="px-6 py-3 text-sm">
                    RENIEC
                  </th>
                  <th scope="col" className="px-6 py-3 text-sm">
                    Departamento
                  </th>
                  <th scope="col" className="px-6 py-3 text-sm">
                    Provincia
                  </th>
                  <th scope="col" className="px-6 py-3 text-sm">
                    Distrito
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUbigeos.map((ubigeo) => (
                  <tr key={ubigeo.inei} className="hover:bg-crust text-xs">
                    <td className="hidden lg:table-cell px-6 py-3">{ubigeo.inei}</td>
                    <td className="px-6 py-3">{ubigeo.reniec}</td>
                    <td className="px-6 py-3">{ubigeo.departamento}</td>
                    <td className="px-6 py-3">{ubigeo.provincia}</td>
                    <td className="px-6 py-3">{ubigeo.distrito}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={ubigeos.length} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};
