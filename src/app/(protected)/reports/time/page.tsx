"use client";
import { getPerUsers } from "@/actions/user-actions";
import { SearchField } from "@/components/custom-fields/search-field";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { getLatestUCDInfo } from "@/helpers/ucd-helper";
import { User } from "@prisma/client";
import { ArrowLeft, CloudDownload } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

type UserWithUCD = User & { cargo?: string; dependencia?: string };
const page = () => {
  const [user_id, setuser_id] = useState<string>("");

  const handleBack = () => setuser_id("");

  return (
    <div className="p-5 w-full h-full">
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col items-center py-5 text-text">
          <h2 className="hover:border-text hover:border-b-4 font-primary font-bold text-2xl uppercase">computo de tiempo</h2>
        </div>

        <div className="flex flex-col gap-4 p-4 px-8">
          {!user_id ? (
            <FnA setuser_id={setuser_id} />
          ) : (
            <div className="flex flex-row justify-end gap-5 font-special text-xs">
              <Button onClick={handleBack} className="bg-mantle px-4 py-2 text-text hover:text-base">
                <ArrowLeft />
                Regresar
              </Button>

              <Button className="flex flex-row items-center bg-mantle hover:bg-green px-4 py-2 text-text hover:text-base">
                <CloudDownload />
                Descargar Reporte
              </Button>
            </div>
          )}

          {user_id && (
            <>
              <FnB user_id={user_id} />
              <FnC user_id={user_id} />
              <FnD />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

type FnAProps = {
  setuser_id: (id: string) => void;
};

export const FnA = ({ setuser_id }: FnAProps) => {
  const [items, setItems] = useState<UserWithUCD[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const tableHeaders = ["DNI", "Nombres", "Apellidos", "Cargo", "Dependencia", "Email"];

  const fnUsers = async (query = "") => {
    setLoading(true);
    try {
      const response = await getPerUsers(query);
      if (response.success && response.data) {
        const enrichedUsers: UserWithUCD[] = await Promise.all(
          response.data.map(async (user) => {
            const info = await getLatestUCDInfo(user);
            return {
              ...user,
              cargo: info?.cargo || "N/A",
              dependencia: info?.dependencia || "N/A",
            };
          })
        );
        setItems(enrichedUsers);
      } else {
        toast.error(response.message || "No se pudieron obtener los usuarios.");
      }
    } catch {
      toast.error("Error al obtener los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    fnUsers(value);
  };

  const paginatedItems = useMemo(() => items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), [items, currentPage]);

  useEffect(() => {
    fnUsers();
  }, []);

  return (
    <div className="flex flex-col p-4">
      <SearchField description="Buscar por nombre, apellido o DNI" value={search} onSearch={handleSearch} />

      <div className="relative bg-mantle sm:rounded-md overflow-x-auto">
        {loading ? (
          <p className="py-4 text-subtext0 text-center">Cargando datos...</p>
        ) : items.length === 0 ? (
          <p className="py-4 text-subtext0 text-center">Aún no existen registros.</p>
        ) : (
          <>
            <table className="w-full text-text text-sm text-left">
              <thead className="top-0 z-10 sticky bg-crust text-xs uppercase">
                <tr>
                  {tableHeaders.map((header, index) => (
                    <th key={index} className="px-4 lg:px-6 py-3 text-xs lg:text-sm">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-mantle font-text">
                {paginatedItems.map((user) => (
                  <tr key={user.id} className="hover:bg-maroon text-subtext0 hover:text-crust text-sm cursor-pointer" onClick={() => setuser_id(user.id)}>
                    <td className="px-4 lg:px-6 py-3">{user.dni}</td>
                    <td className="px-4 lg:px-6 py-3">{user.name}</td>
                    <td className="px-4 lg:px-6 py-3">{user.last_name}</td>
                    <td className="px-4 lg:px-6 py-3">{user.cargo}</td>
                    <td className="px-4 lg:px-6 py-3">{user.dependencia}</td>
                    <td className="px-4 lg:px-6 py-3">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="bg-crust">
              <Pagination currentPage={currentPage} totalPages={Math.ceil(items.length / itemsPerPage)} setCurrentPage={setCurrentPage} totalItems={items.length} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const FnB = ({ user_id }: FnProps) => {
  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 p-4 w-full">
      <div className="flex flex-col gap-4">
        {[
          ["Apellidos y Nombres", "Aguilar Trujillano William"],
          ["Condición Laboral", "Contratado en Proyecto de Inversión"],
          ["Oficina", "Meta - 164"],
          ["Cargo", "Asistente Legal"],
          ["Profesión", ""],
          ["Nivel Remunerativo", ""],
          ["Fecha de Nacimiento", "Fecha de nacimiento"],
          ["DNI", "40962870"],
        ].map(([label, value], i) => (
          <div key={i} className="flex sm:flex-row flex-col sm:items-center sm:gap-4">
            <p className="w-48 font-primary font-semibold text-sm uppercase text-nowrap">{label}</p>
            <p className="font-special text-xs uppercase">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {[
          ["Reg. Lab.", ""],
          ["Reg. Pens.", ""],
          ["Lug. Nac.", ""],
          [".Est Civil", ""],
          ["Domic.", "Psj. Raul Yangali S/N Huanta"],
          ["", ""],
          ["Motivo", "Pago de Vacaciones Truncas"],
          ["Fecha", "05 de febrero del 2025"],
        ].map(([label, value], i) => (
          <div key={i} className="flex sm:flex-row flex-col sm:items-center sm:gap-4">
            <p className="w-40 font-primary font-semibold text-sm uppercase">{label}</p>
            <p className="font-special text-xs uppercase">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const FnC = ({ user_id }: FnProps) => {
  const rows = [
    {
      documento: "RES. DIREC. N° 2104-2023-GRA/GR-GG-ORADM-ORH",
      inicio: "10/08/2023",
      termino: "31/10/2023",
      anios: "0",
      meses: "2",
      dias: "21",
      cargo: "VIGILANCIA",
    },
    {
      documento: "RES. DIREC. N° 332-2023-GRA/GR-GG-ORADM-ORH",
      inicio: "01/11/2023",
      termino: "31/12/2023",
      anios: "0",
      meses: "2",
      dias: "0",
      cargo: "VIGILANCIA",
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <table className="border-overlay1 border-y-2 w-full text-xs md:text-sm text-center">
        <thead className="bg-mantle">
          <tr className="font-bold text-text uppercase">
            <th rowSpan={2} className="px-2 border-2 border-overlay1">
              Documento Sustentatorio de la Condición Laboral
            </th>
            <th rowSpan={2} className="px-2 border-2 border-overlay1">
              Fecha de Inicio
            </th>
            <th rowSpan={2} className="px-2 border-2 border-overlay1">
              Fecha de Término
            </th>

            <th colSpan={3} className="px-2 border-overlay1 border-t-2">
              Total
            </th>

            <th rowSpan={2} className="px-2 border-2 border-overlay1">
              Observaciones
            </th>
          </tr>
          <tr className="font-bold text-text uppercase">
            <th className="px-2 py-2 border-overlay1 border-b-2">Años</th>
            <th className="px-2 py-2 border-overlay1 border-b-2">Meses</th>
            <th className="px-2 py-2 border-overlay1 border-b-2">Días</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="text-subtext1">
              <td className="px-2 py-1">{row.documento}</td>
              <td className="px-2 py-1">{row.inicio}</td>
              <td className="px-2 py-1">{row.termino}</td>
              <td className="px-2 py-1">{row.anios}</td>
              <td className="px-2 py-1">{row.meses}</td>
              <td className="px-2 py-1">{row.dias}</td>
              <td className="px-2 py-1">{row.cargo}</td>
            </tr>
          ))}

          {Array.from({ length: 3 }).map((_, i) => (
            <tr key={`empty-${i}`}>
              <td className="px-2 py-1">&nbsp;</td>
              <td className="px-2 py-1">&nbsp;</td>
              <td className="px-2 py-1">&nbsp;</td>
              <td className="px-2 py-1">&nbsp;</td>
              <td className="px-2 py-1">&nbsp;</td>
              <td className="px-2 py-1">&nbsp;</td>
              <td className="px-2 py-1">&nbsp;</td>
            </tr>
          ))}

          <tr className="font-semibold uppercase">
            <td colSpan={3} className="px-2 py-1 border-overlay1 border-t-2 text-right">
              &nbsp;
            </td>
            <td className="px-2 py-1 border-overlay1 border-t-2">Años</td>
            <td className="px-2 py-1 border-overlay1 border-t-2">Meses</td>
            <td className="px-2 py-1 border-overlay1 border-t-2">Días</td>
            <td className="px-2 py-1 border-overlay1 border-t-2">&nbsp;</td>
          </tr>
          <tr className="font-semibold uppercase">
            <td colSpan={3} className="px-2 py-1 border-overlay1 border-b-2 text-right">
              Total de Tiempo de Servicio
            </td>
            <td className="px-2 py-1 border-overlay1 border-b-2">0</td>
            <td className="px-2 py-1 border-overlay1 border-b-2">4</td>
            <td className="px-2 py-1 border-overlay1 border-b-2">21</td>
            <td className="px-2 py-1 border-overlay1 border-b-2">&nbsp;</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const FnD = () => {
  return (
    <div className="flex flex-col items-center gap-5 py-5 font-text font-semibold text-text">
      <div className="flex flex-col items-center">
        <p className="capitalize">gobierno regional de ayacucho</p>
        <p className="capitalize">dirección regional de recursos humanos</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="capitalize">fredy almicar navarro ramos</p>
        <p className="font-light text-subtext1 capitalize">Resp. de Escalafón</p>
      </div>
    </div>
  );
};

export type FnProps = {
  user_id: string;
};

export default page;
