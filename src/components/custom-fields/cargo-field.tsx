/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import { getCargos } from "@/actions/others-action";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

export const CargoField = ({
  control,
  name,
  label = "Cargo *",
  placeholder = "Buscar cargo",
  disabled = false,
}: {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}) => {
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
        const response = await getCargos(search);
        if (!response.success || !response.data) return;
        const uniqueCargos: string[] = Array.from(new Set(response.data.map((cargo) => cargo.nombre)));
        setCargos(uniqueCargos);
        // eslint-disable-next-line no-unused-vars
      } catch (e: unknown) {
        toast.error("Error al obtener los cargos.");
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
          <FormLabel>{label}</FormLabel>
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
              placeholder={placeholder}
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
