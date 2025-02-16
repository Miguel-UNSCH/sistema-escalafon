"use client";
import { useEffect, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const TableUsers = () => {
  const [users, setusers] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  console.log(users);

  useEffect(() => {
    const fetchPersonales = async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) throw new Error("Error al obtener los datos");

        const data = await response.json();
        setusers(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonales();
  }, []);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (users.length === 0) {
    return <p>No se encontraron datos.</p>;
  }

  return (
    <div className="flex flex-col items-center gap-5 bg-white p-2 rounded-md w-full">
      <div className="flex flex-row justify-end items-center p-2 w-full">
        <div></div>
        <div className="flex flex-row items-center gap-2">
          <span>1-50</span>
          <LuChevronLeft />
          <LuChevronRight />
        </div>
      </div>
      <table className="w-full table-auto">
        <thead className="border">
          <tr className="font-medium text-[#4c4f69] text-sm text-left uppercase">
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2">nombres</th>
            <th className="px-4 py-2">apellidos</th>
            <th className="px-4 py-2">role</th>
            <th className="px-4 py-2">email</th>
          </tr>
        </thead>
        <tbody className="border">
          {users.map(({ id, nombres, apellidos, role, email }) => (
            <tr key={id} className="text-sm text-left">
              <td className="px-4 py-2">{id}</td>
              <td className="px-4 py-2">{nombres} </td>
              <td className="px-4 py-2">{apellidos}</td>
              <td className="px-4 py-2">{role}</td>
              <td className="px-4 py-2">{email || "---"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Page = () => {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="flex font-inter font-bold text-xl text-start uppercase">editar usuario</h3>
      <TableUsers />
    </div>
  );
};

export default Page;
