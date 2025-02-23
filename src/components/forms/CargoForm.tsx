/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { getCargo } from "@/services/cargoService";
import { ZCargo } from "@/lib/schemas/cargo.schema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CargoFieldProps {
  control: any;
  name: string;
  disabled?: boolean;
}

export const CargoField = ({ control, name, disabled = false }: CargoFieldProps) => {
  const [cargos, setCargos] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCargos = async () => {
      if (search.length < 2) {
        setCargos([]);
        return;
      }
      setLoading(true);
      try {
        const data = await getCargo({ nombre: search });
        const uniqueCargos: string[] = Array.from(new Set(data.map((cargo: ZCargo) => cargo.nombre)));
        setCargos(uniqueCargos);
      } catch (error) {
        console.error("Error al obtener cargos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCargos();
  }, [search]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative">
          <FormLabel>Cargo *</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="text"
              value={field.value ?? search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowSuggestions(true);
                field.onChange(e.target.value);
              }}
              placeholder="Escriba el cargo..."
              disabled={disabled}
              className="p-2 border rounded w-full"
            />
          </FormControl>
          <FormMessage />

          {loading && <p className="mt-1 text-gray-500 text-sm">Buscando...</p>}

          {showSuggestions && cargos.length > 0 && (
            <ul className="z-10 absolute bg-white shadow-md mt-1 border rounded w-full">
              {cargos.map((cargo) => (
                <li
                  key={cargo}
                  onClick={() => {
                    field.onChange(cargo);
                    setSearch(cargo);
                    setShowSuggestions(false);
                  }}
                  className="hover:bg-gray-200 p-2 cursor-pointer"
                >
                  {cargo}
                </li>
              ))}
            </ul>
          )}
        </FormItem>
      )}
    />
  );
};
