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
          <tr>
            <th className="px-4 py-2 font-medium text-gray-700 text-sm text-left"></th>
            <th className="px-4 py-2 font-medium text-gray-700 text-sm text-left">nombres</th>
            <th className="px-4 py-2 font-medium text-gray-700 text-sm text-left">apellidos</th>
            <th className="px-4 py-2 font-medium text-gray-700 text-sm text-left">dni</th>
            <th className="px-4 py-2 font-medium text-gray-700 text-sm text-left">sexo</th>
            <th className="px-4 py-2 font-medium text-gray-700 text-sm text-left">situacion laboral</th>
            <th className="px-4 py-2 font-medium text-gray-700 text-sm text-left">celular</th>
            <th className="px-4 py-2 font-medium text-gray-700 text-sm text-left">unidad estructurada</th>
          </tr>
        </thead>
        <tbody className="border">
          {personales.map((personal) => (
            <tr key={personal.id}>
              <td className="px-4 py-2 text-sm text-left">{personal.id}</td>
              <td className="px-4 py-2 text-sm text-left">{personal.nombres} </td>
              <td className="px-4 py-2 text-sm text-left">
                {personal.apellidoPaterno} {personal.apellidoMaterno}
              </td>
              <td className="px-4 py-2 text-sm text-left">{personal.dni}</td>
              <td className="px-4 py-2 text-sm text-left">{personal.sexo}</td>
              <td className="px-4 py-2 text-sm text-left">{personal.situacionLaboral}</td>
              <td className="px-4 py-2 text-sm text-left">{personal.celular}</td>
              <td className="px-4 py-2 text-sm text-left">{personal.unidadEstructurada}</td>
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
