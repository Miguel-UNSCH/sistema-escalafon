"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getCargo } from "@/services/cargoService";
import { getDependencia } from "@/services/dependenciaService";
import { getUbigeo } from "@/services/ubigeoService";
import { useEffect, useState } from "react";

const DataUbigeo = () => {
  const [ubigeos, setUbigeos] = useState<{ id: number; inei: string; reniec: string; departamento: string; provincia: string; distrito: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUbigeos = async () => {
      setLoading(true);
      try {
        const response = await getUbigeo();
        if (response?.error) {
          setError(response.error);
        } else {
          setUbigeos(response);
        }
      } catch (err) {
        setError("Error al obtener los ubigeos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUbigeos();
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
                  <TableHead className="font-inter font-bold text-base text-left">INEI</TableHead>
                  <TableHead className="font-inter font-bold text-base text-left">RENIEC</TableHead>
                  <TableHead className="font-inter font-bold text-base text-left">Departamento</TableHead>
                  <TableHead className="font-inter font-bold text-base text-left">Provincia</TableHead>
                  <TableHead className="font-inter font-bold text-base text-left">Distrito</TableHead>
                </TableRow>
              </TableHeader>
            </Table>
          </div>

          <div className="max-h-72 overflow-y-auto">
            <Table className="w-full">
              <TableBody>
                {ubigeos.length > 0 ? (
                  ubigeos.map((ubi) => (
                    <TableRow key={ubi.id}>
                      <TableCell className="text-left">{ubi.inei}</TableCell>
                      <TableCell className="text-left">{ubi.reniec}</TableCell>
                      <TableCell className="text-left">{ubi.departamento}</TableCell>
                      <TableCell className="text-left">{ubi.provincia}</TableCell>
                      <TableCell className="text-left">{ubi.distrito}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-gray-500 text-center">
                      No hay ubigeos registrados.
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

const DataDependencia = () => {
  const [dependencias, setDependencias] = useState<{ id: number; nombre: string; direccion?: string; codigo: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDependencias = async () => {
      setLoading(true);
      try {
        const response = await getDependencia();
        if (response?.error) {
          setError(response.error);
        } else {
          setDependencias(response);
        }
      } catch (err) {
        setError("Error al obtener las dependencias.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDependencias();
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
                  <TableHead className="font-inter font-bold text-base text-left">Código</TableHead>
                  <TableHead className="font-inter font-bold text-base text-left">Nombre</TableHead>
                  <TableHead className="font-inter font-bold text-base text-right">Dirección</TableHead>
                </TableRow>
              </TableHeader>
            </Table>
          </div>

          <div className="max-h-72 overflow-y-auto">
            <Table className="w-full">
              <TableBody>
                {dependencias.length > 0 ? (
                  dependencias.map((dep) => (
                    <TableRow key={dep.id}>
                      <TableCell className="text-left">{dep.codigo}</TableCell>
                      <TableCell className="text-left">{dep.nombre}</TableCell>
                      <TableCell className="text-left">{dep.direccion || "N/A"}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-gray-500 text-center">
                      No hay dependencias registradas.
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
                <TableRow className="">
                  <TableHead className="w-auto font-inter font-bold text-base">N</TableHead>
                  <TableHead className="font-inter font-bold text-base text-left">Cargo Estructural</TableHead>
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
      <div className="flex flex-col gap-4 px-2 w-full">
        <div className="">
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
