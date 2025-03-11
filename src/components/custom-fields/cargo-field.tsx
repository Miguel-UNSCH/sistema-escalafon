/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ZCargo } from "@/lib/schemas/others-schema";
import { getAllCargos } from "@/actions/others-action";

export const CargoField = ({ control, name, placeholder = "Cargo *", disabled = false }: { control: any; name: string; placeholder?: string; disabled?: boolean }) => {
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
        const data = await getAllCargos(search);
        if (!data) return;
        const uniqueCargos: string[] = Array.from(new Set(data.map((cargo: ZCargo) => cargo.nombre)));
        setCargos(uniqueCargos);
      } catch (error) {
        // eslint-disable-next-line no-console
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
          <FormLabel>{placeholder}</FormLabel>
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
              className="p-2 border rounded w-full font-text"
            />
          </FormControl>
          <FormMessage />

          {loading && <p className="mt-1 text-subtext0 text-sm">Buscando...</p>}

          {showSuggestions && cargos.length > 0 && (
            <ul className="top-14 z-10 absolute bg-mantle shadow-md mt-1 p-1 border rounded w-full">
              {cargos.map((cargo) => (
                <li
                  key={cargo}
                  onClick={() => {
                    field.onChange(cargo);
                    setSearch(cargo);
                    setShowSuggestions(false);
                  }}
                  className="hover:bg-maroon p-1 rounded-md hover:text-base cursor-pointer"
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
