"use client";

import { getPerUsers } from "@/actions/user-actions";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

export const ContentData = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleClick = (id: string) => {
    toast.success("Redirigiendo...");
    router.push(`/user/${id}`, { scroll: false });
  };

  const fnUsers = async () => {
    setLoading(true);
    try {
      const response = await getPerUsers();
      if (response.success && response.data) {
        setUsers(response.data);
      } else toast.error(response.message || "No se pudieron obtener los usuarios.");
    } catch (e: unknown) {
      toast.error("Error al obtener los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fnUsers();
  }, []);

  const theadContent = ["DNI", "Nombres", "Apellidos", "Cargo", "Dependencia", "Email", ""];

  return (
    <div className="flex flex-col gap-5 p-2 w-4/5">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Personales</p>
      <div className="relative bg-mantle sm:rounded-md overflow-x-auto">
        {loading ? (
          <p className="py-4 text-subtext0 text-center">Cargando datos...</p>
        ) : users.length === 0 ? (
          <p className="py-4 text-subtext0 text-center">Aún no existen registros.</p>
        ) : (
          <table className="w-full text-text text-sm text-left rtl:text-right">
            <thead className="top-0 z-10 sticky font-primary text-xs uppercase">
              <tr>
                {theadContent.map((thead) => (
                  <th scope="col" className="px-3 py-4 border-b-2 border-base text-sm" key={thead}>
                    {thead}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-text">
              {users.map(({ id, dni, name, last_name, email }) => (
                <tr key={id} className="hover:bg-crust text-subtext0 text-sm cursor-pointer" onClick={() => handleClick(id)}>
                  <td className="px-3 py-3">{dni}</td>
                  <td className="px-3 py-3">{name}</td>
                  <td className="px-3 py-3">{last_name}</td>
                  <td className="px-3 py-3">{"N/A"}</td>
                  <td className="px-3 py-3">{"N/A"}</td>
                  <td className="px-3 py-3">{email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

/** {TContratoOp.find((item) => item.key === tipo_contrato)?.value || "UNKNOWN"} */
