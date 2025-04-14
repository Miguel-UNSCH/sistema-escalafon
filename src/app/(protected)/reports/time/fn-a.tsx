"use client";

import { getPerUsers } from "@/actions/user-actions";
import { SearchField } from "@/components/custom-fields/search-field";
import { Pagination } from "@/components/pagination";
import { getLatestUCDInfo } from "@/helpers/ucd-helper";
import { User } from "@prisma/client";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

type UserWithUCD = User & { cargo?: string; dependencia?: string };
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
