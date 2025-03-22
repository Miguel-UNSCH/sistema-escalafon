"use client";

// eslint-disable no-unused-vars
import { useState, useEffect, useTransition } from "react";
import toast from "react-hot-toast";
import { getCargosPorDependencia, getDependencia, getDependencias } from "@/actions/others-action";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useController } from "react-hook-form";
import { Input } from "../ui/input";

import { cn } from "@/lib/utils";

interface DependenciaIdFieldProps {
  control: any;
  name: string;
  label?: string;
  disabled?: boolean;
}

export const DependenciaIdField = ({ control, name, label, disabled = false }: DependenciaIdFieldProps) => {
  const { field } = useController({ control, name, defaultValue: "" });
  const [dependencias, setDependencias] = useState<{ id: number; nombre: string }[]>([]);
  const [search, setSearch] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (field.value && search === "") {
      startTransition(async () => {
        try {
          const response = await getDependencia(Number(field.value));
          if (response.success && response.data) {
            setSearch(response.data.nombre);
          }
        } catch {
          toast.error("No se pudo cargar la dependencia inicial.");
        }
      });
    }
  }, [field.value, search]);

  useEffect(() => {
    if (search.length < 2) {
      setDependencias([]);
      return;
    }

    setLoading(true);
    const delayDebounce = setTimeout(async () => {
      try {
        const response = await getDependencias(search);
        if (response.success && response.data) {
          setDependencias(response.data);
        }
      } catch {
        toast.error("Error al obtener dependencias.");
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className="relative">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Escriba un nombre..."
              disabled={disabled}
              className="p-2 border rounded w-full"
            />
          </FormControl>
          <FormMessage />
          {(loading || isPending) && <p className="mt-1 text-subtext0 text-sm">Cargando...</p>}

          {showSuggestions && dependencias.length > 0 && (
            <ul className="top-14 z-10 absolute bg-mantle shadow-md mt-1 border rounded w-full max-h-64 overflow-y-auto">
              {dependencias.map((dependencia) => (
                <li
                  key={dependencia.id}
                  onClick={() => {
                    field.onChange(dependencia.id.toString());
                    setSearch(dependencia.nombre);
                    setShowSuggestions(false);
                  }}
                  className={cn("p-2 flex cursor-pointer hover:bg-crust")}
                >
                  {dependencia.nombre}
                </li>
              ))}
            </ul>
          )}
        </FormItem>
      )}
    />
  );
};

interface CargoIdDependenciaFieldProps {
  control: any;
  name: string;
  label?: string;
  disabled?: boolean;
  dependencia_id?: string;
}
export const CargoIdDependenciaField = ({ control, name, label = "Cargos disponibles *", disabled = false, dependencia_id }: CargoIdDependenciaFieldProps) => {
  const [cargos, setCargos] = useState<{ id: number; nombre: string }[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!dependencia_id) {
      setCargos([]);
      return;
    }
    startTransition(() => {
      const fetchCargos = async () => {
        try {
          const response = await getCargosPorDependencia(Number(dependencia_id));
          if (!response.success || !response.data || response.data.length === 0) {
            setCargos([]);
            toast.error("No hay cargos para la dependencia seleccionada.");
            return;
          }
          setCargos(response.data.map((cargo) => ({ id: cargo.id, nombre: cargo.nombre })));
          // eslint-disable-next-line no-unused-vars
        } catch (e: unknown) {
          toast.error("Error al obtener los cargos.");
        }
      };
      fetchCargos();
    });
  }, [dependencia_id]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {isPending ? (
              <FormMessage>Seleccione una dependencia...</FormMessage>
            ) : (
              <Select onValueChange={(value) => field.onChange(value)} defaultValue={field.value} disabled={disabled || !dependencia_id}>
                <SelectTrigger aria-label={label}>
                  <SelectValue placeholder="Seleccione un cargo" />
                </SelectTrigger>
                <SelectContent>
                  {cargos.length > 0 ? (
                    cargos.map((cargo) => (
                      <SelectItem key={cargo.id} value={cargo.id.toString()}>
                        {cargo.nombre}
                      </SelectItem>
                    ))
                  ) : (
                    <FormMessage>No hay cargos disponibles.</FormMessage>
                  )}
                </SelectContent>
              </Select>
            )}
          </FormControl>
        </FormItem>
      )}
    />
  );
};
