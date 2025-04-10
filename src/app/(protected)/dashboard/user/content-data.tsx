"use client";

import { getPerUsers } from "@/actions/user-actions";
import { SearchField } from "@/components/custom-fields/search-field";
import { getLatestUCDInfo } from "@/helpers/ucd-helper";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type UserWithUCD = User & { cargo?: string; dependencia?: string };

export const ContentData = () => {
  const router = useRouter();
  const [users, setUsers] = useState<UserWithUCD[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  const handleClick = (id: string) => {
    toast.success("Redirigiendo...");
    router.push(`/dashboard/user/${id}`, { scroll: false });
  };

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
        setUsers(enrichedUsers);
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

  useEffect(() => {
    fnUsers();
  }, []);

  const tableHeaders = ["DNI", "Nombres", "Apellidos", "Cargo", "Dependencia", "Email"];

  return (
    <div className="flex flex-col gap-5 p-2 w-4/5">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Personales</p>
      <SearchField description="Buscar por nombre, apellido o DNI" value={search} onSearch={handleSearch} />

      <div className="relative bg-mantle sm:rounded-md overflow-x-auto">
        {loading ? (
          <p className="py-4 text-subtext0 text-center">Cargando datos...</p>
        ) : users.length === 0 ? (
          <p className="py-4 text-subtext0 text-center">Aún no existen registros.</p>
        ) : (
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
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-maroon text-subtext0 hover:text-crust text-sm cursor-pointer" onClick={() => handleClick(user.id)}>
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
        )}
      </div>
    </div>
  );
};
