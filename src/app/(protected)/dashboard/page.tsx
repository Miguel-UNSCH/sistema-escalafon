"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getCargo } from "@/services/cargoService";
import { useEffect, useState } from "react";

const DataUbigeo = () => {
  return <div>datos de ubigeo</div>;
};

const DataDependencia = () => {
  return <div>datos de dependencia</div>;
};

const DataCargo = () => {
  const [cargos, setCargos] = useState<{ id: number; nombre: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCargos = async () => {
      setLoading(true);
      try {
        const response = await getCargo();
        if (response?.error) {
          setError(response.error);
        } else {
          setCargos(response);
        }
      } catch (err) {
        setError("Error al obtener los cargos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCargos();
  }, []);

  return (
    <div className="p-4">
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="shadow-md border rounded-sm w-full">
          <div className="overflow-hidden">
            <Table className="w-full">
              <TableHeader className="top-0 z-10 sticky bg-gray-200">
                <TableRow>
                  <TableHead className="font-inter font-bold text-base">N</TableHead>
                  <TableHead className="font-inter font-bold text-base">Cargo Estructural</TableHead>
                </TableRow>
              </TableHeader>
            </Table>
          </div>

          <div className="max-h-72 overflow-y-auto">
            <Table className="w-full">
              <TableBody>
                {cargos.length > 0 ? (
                  cargos.map((cargo) => (
                    <TableRow key={cargo.id}>
                      <TableCell>{cargo.id}</TableCell>
                      <TableCell>{cargo.nombre}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-gray-500 text-center">
                      No hay cargos registrados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

const Page = () => {
  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex flex-row gap-4 px-2 w-full">
        <div className="w-1/2">
          <p className="font-inter font-semibold text-lg">Ubigeo</p>
          <DataUbigeo />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <p className="font-inter font-semibold text-lg">Dependencia</p>
            <DataDependencia />
          </div>
          <div>
            <p className="font-inter font-semibold text-lg">Cargo</p>
            <DataCargo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
