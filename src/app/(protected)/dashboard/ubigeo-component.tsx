"use client";

import { getUbigeos } from "@/actions/others-action";
import { Pagination } from "@/components/pagination";
import { Input } from "@/components/ui/input";
import { Ubigeo } from "@prisma/client";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { debounce } from "lodash";

const SearchField = ({ description, placeholder = "Buscar ...", onSearch }: { description: string; placeholder?: string; onSearch: (search: string) => void }) => {
  return (
    <div className="flex flex-col gap-2 pb-4 w-full">
      <div className="relative w-full">
        <Search className="top-1/2 left-3 absolute text-text -translate-y-1/2 transform" />
        <Input className="bg-mantle pl-10 w-full text-text" placeholder={placeholder} onChange={(e) => onSearch(e.target.value)} />
      </div>

      <p className="font-special font-semibold text-xs italic">{description}</p>
    </div>
  );
};

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
    } catch (e: unknown) {
      toast.error("Error al obtener los desplazamientos.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce((query: string) => {
    setSearch(query);
    fnUbigeos(query);
  }, 500);

  useEffect(() => {
    fnUbigeos("");
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const headColum = ["inei", "reniec", "departamento", "provincia", "distrito"];

  const totalPages = Math.ceil(ubigeos.length / itemsPerPage);
  const currentUbigeos = ubigeos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col gap-2 w-full">
      <p className="font-primary font-bold">Ubigeos</p>
      <SearchField description="Buscar ubigeos por INEI, RENIEC, departamento, provincia o distrito" onSearch={debouncedSearch} />

      {loading ? (
        <p className="py-4 text-subtext0 text-center">Cargando datos...</p>
      ) : ubigeos.length === 0 ? (
        <p className="py-4 text-subtext0 text-center">Aún no existen registros.</p>
      ) : (
        <div className="relative border-2 border-mantle sm:rounded-md overflow-x-auto">
          <table className="w-full text-text text-sm text-left rtl:text-right">
            <thead className="top-0 z-10 sticky bg-mantle text-xs uppercase">
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
                  <td className="px-6 py-2">{ubigeo.inei}</td>
                  <th className="px-6 py-2">{ubigeo.reniec}</th>
                  <td className="px-6 py-2">{ubigeo.departamento}</td>
                  <td className="px-6 py-2">{ubigeo.provincia}</td>
                  <td className="px-6 py-2">{ubigeo.distrito}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={ubigeos.length} setCurrentPage={setCurrentPage} />
    </div>
  );
};
