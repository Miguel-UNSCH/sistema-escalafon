"use client";

import { useState, useEffect } from "react";
import { Control, useController } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { getUsers } from "@/actions/user-actions";
import { User } from "@prisma/client";
import { cn } from "@/lib/utils";

interface UserFieldProps {
  control: Control<any>;
  name: string;
  label?: string;
  disabled?: boolean;
  desc?: string;
}

export const UserField = ({ control, name, label, disabled = false, desc }: UserFieldProps) => {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { field } = useController({
    control,
    name,
    defaultValue: { name: "", dni: "", id: "" },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      if (search.length < 2) {
        setUsers([]);
        return;
      }

      setLoading(true);
      try {
        const response = await getUsers(search);
        if (response.success && response.data) setUsers(response.data);
      } catch (error) {
        // oxlint-disable-next-line no-console
        console.error("Error al obtener usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
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
              value={field.value?.name ?? search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowSuggestions(true);
                field.onChange({ name: e.target.value, dni: "", id: "" });
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Escriba un nombre..."
              disabled={disabled}
              className="p-2 border rounded w-full"
            />
          </FormControl>

          {desc && <FormDescription>{desc}</FormDescription>}

          <FormMessage />

          {loading && <p className="mt-1 text-text text-sm">Cargando...</p>}

          {showSuggestions && users.length > 0 && (
            <ul className="top-14 z-10 absolute bg-mantle shadow-md mt-1 border rounded w-full max-h-40 overflow-y-auto">
              {users.map((user) => (
                <li
                  key={user.id}
                  onClick={() => {
                    field.onChange({ name: user.name, dni: user.dni, id: user.id });
                    setSearch(user.name);
                    setShowSuggestions(false);
                  }}
                  className={cn("p-2 flex flex-row cursor-pointer hover:bg-crust gap-4")}
                >
                  <span>{user.dni}</span>
                  <span>{user.name}</span>
                  <span>{user.last_name}</span>
                </li>
              ))}
            </ul>
          )}
        </FormItem>
      )}
    />
  );
};
