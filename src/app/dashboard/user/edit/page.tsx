"use client";
import { personales } from "@/db";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const TableUsers = () => {
  console.log(personales);
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
            <th className="px-4 py-2">dni</th>
            <th className="px-4 py-2">sexo</th>
            <th className="px-4 py-2">situacion laboral</th>
            <th className="px-4 py-2">celular</th>
            <th className="px-4 py-2">unidad estructurada</th>
          </tr>
        </thead>
        <tbody className="border">
          {personales.map((personal) => (
            <tr key={personal.id} className="text-sm text-left">
              <td className="px-4 py-2">{personal.id}</td>
              <td className="px-4 py-2">{personal.nombres} </td>
              <td className="px-4 py-2">
                {personal.apellidoPaterno} {personal.apellidoMaterno}
              </td>
              <td className="px-4 py-2">{personal.dni}</td>
              <td className="px-4 py-2">{personal.sexo}</td>
              <td className="px-4 py-2">{personal.situacionLaboral}</td>
              <td className="px-4 py-2">{personal.celular}</td>
              <td className="px-4 py-2">{personal.unidadEstructurada}</td>
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
