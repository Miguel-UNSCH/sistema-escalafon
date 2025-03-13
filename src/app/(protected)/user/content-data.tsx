"use client";

import { getPerUsers, UserPerRecord } from "@/actions/user-actions";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

export const ContentData = () => {
  const router = useRouter();
  const [users, setUsers] = useState<UserPerRecord[]>([]);
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
        toast.success(response.message || "Usuarios actualizados correctamente.");
      } else toast.error(response.message || "No se pudieron obtener los usuarios.");

      // eslint-disable-next-line no-unused-vars
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
                  <th scope="col" className="px-3 py-3 border-b-2 border-base text-sm" key={thead}>
                    {thead}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-text">
              {users.map(({ id, dni, name, last_name, personal, email }) => (
                <tr key={id} className="hover:bg-crust text-subtext0 text-sm cursor-pointer" onClick={() => handleClick(id)}>
                  <td className="px-3 py-2">{dni}</td>
                  <td className="px-3 py-2">{name}</td>
                  <td className="px-3 py-2">{last_name}</td>
                  <td className="px-3 py-2">{personal?.cargo?.nombre || "N/A"}</td>
                  <td className="px-3 py-2">{personal?.dependencia?.nombre || "N/A"}</td>
                  <td className="px-3 py-2">{email}</td>
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
