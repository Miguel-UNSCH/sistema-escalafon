"use client";

import { TextField } from "@/components/forms/InputTypes";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cargoSchema, ZCargo } from "@/lib/schemas/cargo.schema";
import { createCargo, getCargo } from "@/services/cargoService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const DataUbigeo = () => {
  return <div>datos de ubigeo</div>;
};

const FormUbigeo = () => {
  return <div>formulario de ubigeo</div>;
};

const DataDependencia = () => {
  return <div>datos de dependencia</div>;
};

const FormDependencia = () => {
  return <div>formulario de dependencia</div>;
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
        <div className="shadow-md border rounded-md w-full">
          <div className="overflow-hidden">
            {/* Cabecera fija */}
            <Table className="w-full">
              <TableHeader className="top-0 z-10 sticky bg-gray-200">
                <TableRow>
                  <TableHead className="font-inter font-bold text-base">N</TableHead>
                  <TableHead className="font-inter font-bold text-base">Cargo Estructural</TableHead>
                </TableRow>
              </TableHeader>
            </Table>
          </div>

          {/* Cuerpo scrollable */}
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

const FormCargo = () => {
  const form = useForm<ZCargo>({
    resolver: zodResolver(cargoSchema),
    defaultValues: {
      nombre: "",
    },
  });

  const onSubmit = async (values: ZCargo) => {
    const uppercaseNombre = values.nombre.toUpperCase(); // Convertir a mayúsculas
    const response = await createCargo({ nombre: uppercaseNombre });

    if (response?.error) {
      console.error("Error al crear el cargo:", response.error);
    } else {
      console.log("Cargo creado con éxito:", response);
      form.reset(); // Limpiar formulario tras éxito
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row items-end gap-2">
          <TextField control={form.control} name="nombre" label="Registrar nuevo cargo" placeholder="Nombre del cargo" disabled={false} />

          <Button type="submit" className="justify-end bg-[#d20f39] hover:bg-[#e64553]">
            Guardar
          </Button>
        </form>
      </Form>
    </div>
  );
};

const Page = () => {
  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex flex-row gap-4 w-4/5">
        <div className="w-1/2">
          <p className="font-inter font-semibold text-lg">Ubigeo</p>
          <DataUbigeo />
          <FormUbigeo />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <p className="font-inter font-semibold text-lg">Dependencia</p>
            <DataDependencia />
            <FormDependencia />
          </div>
          <div>
            <p className="font-inter font-semibold text-lg">Cargo</p>
            <DataCargo />
            <FormCargo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
