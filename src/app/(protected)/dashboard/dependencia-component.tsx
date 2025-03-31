"use client";

import { getDependencias } from "@/actions/others-action";
import { SearchField } from "@/components/custom-fields/search-field";
import { CreateDependencia } from "@/components/others/create-dependencia";
import { CreateEntity } from "@/components/others/create-entity";
import { ModifyDependencia } from "@/components/others/modify-dependencia";
import { Table } from "@/components/others/table-dependencia";
import { Dependencia } from "@prisma/client";
import { debounce } from "lodash";
import { Boxes } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

export const DependenciaComponent = () => {
  const [dependencias, setDependencias] = useState<Dependencia[]>([]);
  const [selectedDependencia, setSelectedDependencia] = useState<Dependencia | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  const fetchDependencias = async (query: string) => {
    setLoading(true);
    try {
      const response = await getDependencias(query);
      if (response.success && response.data) {
        setDependencias(response.data);
      } else {
        toast.error(response.message || "No se pudieron obtener las dependencias.");
      }
    } catch {
      toast.error("Error al obtener las dependencias.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchDependencias = useCallback(debounce(fetchDependencias, 500), []);

  const handleSearch = (query: string) => {
    setSearch(query);
    debouncedFetchDependencias(query);
  };

  useEffect(() => {
    fetchDependencias("");
  }, []);

  const handleRefresh = () => {
    setSearch("");
    fetchDependencias("");
    setSelectedDependencia(null);
  };

  return (
    <div className="flex flex-col gap-2 py-4 w-full">
      <p className="font-primary font-bold text-lg md:text-xl">Dependencias</p>
      <SearchField description="Buscar dependencias por nombre o código" value={search} onSearch={handleSearch} />

      <div className="flex flex-col gap-2 w-full">
        <Table loading={loading} dependencias={dependencias} selectedDependencia={selectedDependencia} setSelectedDependencia={setSelectedDependencia} />

        <div className="flex flex-col gap-5 p-4 w-full">
          <CreateDependencia onDependenciaCreated={handleRefresh} setSelectedDependencia={setSelectedDependencia} />
          {selectedDependencia && (
            <ModifyDependencia key={selectedDependencia.id} dependencia={selectedDependencia} onUpdated={handleRefresh} setSelectedDependencia={setSelectedDependencia} />
          )}
        </div>
      </div>

      <CreateEntity title="Registrar varias dependencias" icon={<Boxes />} buttonText="Crear Dependencias" model="dependencia" />
    </div>
  );
};
