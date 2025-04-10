"use client";

// oxlint-disable-next-line no-unused-vars
export const FnC = ({ user_id }: FnProps) => {
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
      <table className="w-full text-xs md:text-sm text-center">
        <thead className="bg-mantle">
          <tr className="font-bold text-text uppercase">
            <th rowSpan={2} className="px-2">
              Documento Sustentatorio de la Condición Laboral
            </th>
            <th rowSpan={2} className="px-2">
              Fecha de Inicio
            </th>
            <th rowSpan={2} className="px-2">
              Fecha de Término
            </th>

            <th colSpan={3} className="px-2">
              Total
            </th>

            <th rowSpan={2} className="px-2">
              Observaciones
            </th>
          </tr>
          <tr className="font-bold text-text uppercase">
            <th className="px-2 py-2">Años</th>
            <th className="px-2 py-2">Meses</th>
            <th className="px-2 py-2">Días</th>
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
            <td className="px-2 py-1 border-crust border-b-2">0</td>
            <td className="px-2 py-1 border-crust border-b-2">4</td>
            <td className="px-2 py-1 border-crust border-b-2">21</td>
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
