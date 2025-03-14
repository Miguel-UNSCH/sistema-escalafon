import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Dependencia } from "@prisma/client";
import { Control, useController } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { getDependencias } from "@/actions/others-action";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

export const DependenciaField = ({ control, name = "dependencia", disabled = false }: { control: Control<any>; name?: string; disabled?: boolean }) => {
  const [dependencias, setDependencias] = useState<Dependencia[]>([]);
  const [search, setSearch] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const nombreField = useController({ control, name: `${name}.nombre` });
  const codigoField = useController({ control, name: `${name}.codigo` });
  const direccionField = useController({ control, name: `${name}.direccion` });

  useEffect(() => {
    const fetchDependencias = async () => {
      if (search.length < 2) {
        setDependencias([]);
        return;
      }

      setLoading(true);
      try {
        const response = await getDependencias(search);
        if (response.success && response.data) {
          setDependencias(response.data);
        }
      } catch (error) {
        toast.error("Error al obtener dependencias.");
      } finally {
        setLoading(false);
      }
    };

    fetchDependencias();
  }, [search]);

  return (
    <>
      <FormField
        control={control}
        name={`${name}.nombre`}
        render={({ field }) => (
          <FormItem className="relative">
            <FormLabel className="font-primary text-subtext0">Nombre *</FormLabel>
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
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Escriba el nombre de la dependencia..."
                disabled={disabled}
                className="p-2 border rounded w-full font-text"
              />
            </FormControl>
            <FormMessage />

            {loading && <p className="mt-1 text-text text-sm">Buscando...</p>}

            {showSuggestions && dependencias.length > 0 && (
              <ul className="top-14 z-10 absolute bg-mantle mt-1 p-1 border rounded-md w-full max-h-72 overflow-y-auto">
                {dependencias.map((dep) => (
                  <li
                    key={dep.id}
                    onClick={() => {
                      nombreField.field.onChange(dep.nombre);
                      codigoField.field.onChange(dep.codigo);
                      direccionField.field.onChange(dep.direccion);
                      setSearch(dep.nombre);
                      setShowSuggestions(false);
                    }}
                    className="hover:bg-maroon p-1 rounded-md hover:text-base cursor-pointer"
                  >
                    {dep.nombre}
                  </li>
                ))}
              </ul>
            )}
          </FormItem>
        )}
      />

      <InputField control={control} name={`${name}.codigo`} label="Código *" placeholder="Código de la dependencia" />
      <InputField control={control} name={`${name}.direccion`} label="Dirección *" placeholder="Dirección de la dependencia" />
    </>
  );
};

export const InputField = ({ control, name, label, placeholder }: { control: any; name: string; label: string; placeholder: string }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-primary text-subtext0">{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} type="text" disabled />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
