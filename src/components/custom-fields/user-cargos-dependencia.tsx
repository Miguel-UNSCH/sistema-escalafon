"use client";

// eslint-disable no-unused-vars
import { useState, useEffect, useTransition } from "react";
import toast from "react-hot-toast";
import { getCargosPorDependencia, getCargosUser, getDependencia, getDependencias, getDependenciasUser } from "@/actions/others-action";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useController } from "react-hook-form";
import { Input } from "../ui/input";

import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";

interface DependenciasUserFieldProps {
  control: any;
  name: string;
  user_id: string;
  label?: string;
  disabled?: boolean;
}

export const DependenciasUserField = ({ control, name, user_id, label, disabled = false }: DependenciasUserFieldProps) => {
  const { field } = useController({ control, name, defaultValue: "" });

  const [open, setOpen] = useState(false);
  const [dependencias, setDependencias] = useState<{ id: number; nombre: string }[]>([]);
  const [search, setSearch] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  const [isPending, startTransition] = useTransition();

  // Obtener nombre inicial si ya hay valor
  useEffect(() => {
    if (field.value && !selectedLabel) {
      startTransition(async () => {
        try {
          const response = await getDependencia(Number(field.value));
          if (response.success && response.data) {
            setSelectedLabel(response.data.nombre);
          }
        } catch {
          toast.error("No se pudo cargar la dependencia inicial.");
        }
      });
    }
  }, [field.value]);

  // Obtener todas al abrir por primera vez
  useEffect(() => {
    if (dependencias.length === 0 && open && search === "") {
      startTransition(async () => {
        try {
          const response = await getDependenciasUser(user_id, "");
          if (response.success && response.data) {
            setDependencias(response.data);
          }
        } catch {
          toast.error("Error al cargar las dependencias.");
        }
      });
    }
  }, [open]);

  // Buscar al escribir (si son al menos 2 caracteres)
  useEffect(() => {
    if (search.length < 2) return;

    startTransition(async () => {
      try {
        const response = await getDependenciasUser(user_id, search);
        if (response.success && response.data) {
          setDependencias(response.data);
        }
      } catch {
        toast.error("Error al buscar dependencias.");
      }
    });
  }, [search]);

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className="flex flex-col w-full">
          {label && <FormLabel>{label}</FormLabel>}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn("w-full justify-between", disabled && "cursor-not-allowed opacity-70")}
                  disabled={disabled}
                >
                  {selectedLabel || "Seleccione una dependencia..."}
                  <ChevronsUpDown className="opacity-50 ml-2 w-4 h-4 shrink-0" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-full">
              <Command>
                <CommandInput placeholder="Buscar dependencia..." value={search} onValueChange={setSearch} className="h-9" disabled={disabled} />
                <CommandList>
                  {isPending && <p className="px-4 py-2 text-text text-sm">Cargando...</p>}
                  <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                  <CommandGroup>
                    {dependencias.map((dep) => (
                      <CommandItem
                        key={dep.id}
                        value={dep.nombre}
                        onSelect={() => {
                          field.onChange(dep.id.toString());
                          setSelectedLabel(dep.nombre);
                          setOpen(false);
                        }}
                      >
                        {dep.nombre}
                        <Check className={cn("ml-auto h-4 w-4", field.value == dep.id.toString() ? "opacity-100" : "opacity-0")} />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface CargosUserFieldProps {
  control: any;
  name: string;
  user_id: string;
  label?: string;
  disabled?: boolean;
  dependencia_id?: string;
}
export const CargosUserField = ({ control, name, user_id, label = "Cargos disponibles *", disabled = false, dependencia_id }: CargosUserFieldProps) => {
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
          const response = await getCargosUser(user_id, Number(dependencia_id));
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
