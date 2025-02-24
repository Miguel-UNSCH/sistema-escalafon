import { useState, useEffect } from "react";
import { Control, useController } from "react-hook-form";
import { getDependencia } from "@/services/dependenciaService";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface DependenciaFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  disabled?: boolean;
}

export const DependenciaField = ({ control, disabled = false }: DependenciaFieldProps) => {
  const [dependencias, setDependencias] = useState<{ nombre: string; direccion: string; codigo: string }[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchByCode, setSearchByCode] = useState<string>("");
  const [showSuggestionsNombre, setShowSuggestionsNombre] = useState<boolean>(false);
  const [showSuggestionsCodigo, setShowSuggestionsCodigo] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const nombreField = useController({ control, name: "dependencia.nombre" });
  const direccionField = useController({ control, name: "dependencia.direccion" });
  const codigoField = useController({ control, name: "dependencia.codigo" });

  useEffect(() => {
    const fetchDependencias = async () => {
      if (search.length < 2 && searchByCode.length < 2) {
        setDependencias([]);
        return;
      }

      setLoading(true);
      try {
        const params = searchByCode ? { codigo: searchByCode } : { nombre: search };
        const data = await getDependencia(params);
        setDependencias(data);
      } catch (error) {
        console.error("Error al obtener dependencias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDependencias();
  }, [search, searchByCode]);

  return (
    <>
      <FormField
        control={control}
        name="dependencia.nombre"
        render={({ field }) => (
          <FormItem className="relative">
            <FormLabel>Nombre *</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="text"
                value={field.value ?? search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowSuggestionsNombre(true);
                  setShowSuggestionsCodigo(false);
                  field.onChange(e.target.value);
                }}
                onFocus={() => {
                  setShowSuggestionsNombre(true);
                  setShowSuggestionsCodigo(false);
                }}
                onBlur={() => setTimeout(() => setShowSuggestionsNombre(false), 200)}
                placeholder="Escriba el nombre de la dependencia..."
                disabled={disabled}
                className="p-2 border rounded w-full"
              />
            </FormControl>
            <FormMessage />

            {loading && <p className="mt-1 text-gray-500 text-sm">Buscando...</p>}

            {showSuggestionsNombre && dependencias.length > 0 && (
              <ul className="z-10 absolute bg-white shadow-md mt-1 border rounded w-full">
                {dependencias.map((dep) => (
                  <li
                    key={dep.codigo}
                    onClick={() => {
                      nombreField.field.onChange(dep.nombre);
                      direccionField.field.onChange(dep.direccion);
                      codigoField.field.onChange(dep.codigo);
                      setSearch(dep.nombre);
                      setShowSuggestionsNombre(false);
                    }}
                    className="hover:bg-gray-200 p-2 cursor-pointer"
                  >
                    {dep.nombre}
                  </li>
                ))}
              </ul>
            )}
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="dependencia.codigo"
        render={({ field }) => (
          <FormItem className="relative">
            <FormLabel>Código</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="text"
                value={field.value ?? searchByCode}
                onChange={(e) => {
                  setSearchByCode(e.target.value);
                  setShowSuggestionsCodigo(true);
                  setShowSuggestionsNombre(false);
                  field.onChange(e.target.value);
                }}
                onFocus={() => {
                  setShowSuggestionsCodigo(true);
                  setShowSuggestionsNombre(false);
                }}
                onBlur={() => setTimeout(() => setShowSuggestionsCodigo(false), 200)}
                placeholder="Escriba el código de la dependencia..."
                disabled={disabled}
                className="p-2 border rounded w-full"
              />
            </FormControl>
            <FormMessage />

            {showSuggestionsCodigo && dependencias.length > 0 && (
              <ul className="z-10 absolute bg-white shadow-md mt-1 border rounded w-full">
                {dependencias.map((dep) => (
                  <li
                    key={dep.codigo}
                    onClick={() => {
                      nombreField.field.onChange(dep.nombre);
                      direccionField.field.onChange(dep.direccion);
                      codigoField.field.onChange(dep.codigo);
                      setSearchByCode(dep.codigo);
                      setShowSuggestionsCodigo(false);
                    }}
                    className="hover:bg-gray-200 p-2 cursor-pointer"
                  >
                    {dep.codigo}
                  </li>
                ))}
              </ul>
            )}
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="dependencia.direccion"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dirección</FormLabel>
            <FormControl>
              <Input placeholder="Dirección de la dependencia" {...field} type="text" disabled />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default DependenciaField;
