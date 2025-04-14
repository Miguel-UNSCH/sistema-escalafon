"use client";

import { ContractReportItem, fn_rt_c } from "@/actions/reports-action";
import { useEffect, useState } from "react";

export const FnC = ({ user_id }: FnProps) => {
  const [data, setData] = useState<ContractReportItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const tabsRow = [
    {
      label: "Documento Sustentatorio de la Condición Laboral",
      props: { rowSpan: 2 },
    },
    { label: "Fecha de Inicio", props: { rowSpan: 2 } },
    { label: "Fecha de Término", props: { rowSpan: 2 } },
    { label: "Total", props: { colSpan: 3 } },
    { label: "Observaciones", props: { rowSpan: 2 } },
  ];

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const res = await fn_rt_c(user_id);
      if (res.success && res.data) setData(res.data);

      setIsLoading(false);
    };

    loadData();
  }, [user_id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-6">
        <div className="border-mantle border-b-2 rounded-full w-8 h-8 animate-spin" />
        <span className="ml-3 text-text text-sm">Cargando datos...</span>
      </div>
    );
  }

  if (!data) return <p className="p-4 text-red">No se pudieron cargar los datos.</p>;

  const total = data.reduce(
    (acc, item) => ({
      anios: acc.anios + Number(item.anios),
      meses: acc.meses + Number(item.meses),
      dias: acc.dias + Number(item.dias),
    }),
    { anios: 0, meses: 0, dias: 0 }
  );

  const emptyRowCount = Math.max(0, 10 - data.length);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[768px] text-xs sm:text-sm text-center">
        <thead className="bg-mantle">
          <tr className="font-bold text-text uppercase">
            {tabsRow.map((tab, i) => (
              <th key={i} {...tab.props} className="px-2 py-1 whitespace-nowrap">
                {tab.label}
              </th>
            ))}
          </tr>
          <tr className="font-bold text-text uppercase">
            <th className="px-2 py-2">Años</th>
            <th className="px-2 py-2">Meses</th>
            <th className="px-2 py-2">Días</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="text-subtext1">
              <td className="px-2 py-1 whitespace-nowrap">{row.documento}</td>
              <td className="px-2 py-1 whitespace-nowrap">{row.inicio}</td>
              <td className="px-2 py-1 whitespace-nowrap">{row.termino}</td>
              <td className="px-2 py-1">{row.anios}</td>
              <td className="px-2 py-1">{row.meses}</td>
              <td className="px-2 py-1">{row.dias}</td>
              <td className="px-2 py-1 whitespace-nowrap">{row.cargo}</td>
            </tr>
          ))}

          {Array.from({ length: emptyRowCount }).map((_, i) => (
            <tr key={`empty-${i}`}>
              {Array.from({ length: 7 }).map((_, j) => (
                <td key={j} className="px-2 py-1">
                  &nbsp;
                </td>
              ))}
            </tr>
          ))}

          <tr className="font-semibold uppercase">
            <td colSpan={3} className="px-2 py-1 border-crust border-t-2 text-right">
              &nbsp;
            </td>
            <td className="px-2 py-1 border-crust border-t-2">Años</td>
            <td className="px-2 py-1 border-crust border-t-2">Meses</td>
            <td className="px-2 py-1 border-crust border-t-2">Días</td>
            <td className="px-2 py-1 border-crust border-t-2">&nbsp;</td>
          </tr>
          <tr className="font-semibold uppercase">
            <td colSpan={3} className="px-2 py-1 border-crust border-b-2 text-right">
              Total de Tiempo de Servicio
            </td>
            <td className="px-2 py-1 border-crust border-b-2">{total.anios}</td>
            <td className="px-2 py-1 border-crust border-b-2">{total.meses}</td>
            <td className="px-2 py-1 border-crust border-b-2">{total.dias}</td>
            <td className="px-2 py-1 border-crust border-b-2">&nbsp;</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export type FnProps = {
  user_id: string;
};
