"use client";

import { cargoDependenciaRecord, getCargosDependencias } from "@/actions/others-action";
import { SearchField } from "@/components/custom-fields/search-field";
import { ModifyDependencia } from "@/components/others/modify-cargo-dep";
import { Table } from "@/components/others/table-cargo-dep";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CargoDependencia = () => {
  const [dependencias, setDependencias] = useState<cargoDependenciaRecord[]>([]);
  const [selectedDependencia, setSelectedDependencia] = useState<cargoDependenciaRecord | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  const fetchDependencias = async (query: string) => {
    setLoading(true);
    try {
      const response = await getCargosDependencias(query);
      if (response.success && response.data) setDependencias(response.data);
      else toast.error(response.message || "No se pudieron obtener las dependencias.");
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
      <p className="font-primary font-bold text-lg md:text-xl">Dependencias con cargos</p>
      <SearchField description="Buscar dependencias por nombre o código" value={search} onSearch={handleSearch} />

      <div className="flex flex-col gap-2 w-full">
        <Table loading={loading} dependencias={dependencias} selectedDependencia={selectedDependencia} setSelectedDependencia={setSelectedDependencia} />

        <div className="flex flex-col gap-5 p-4 w-full">
          {selectedDependencia && (
            <ModifyDependencia key={selectedDependencia.id} dependencia={selectedDependencia} onUpdated={handleRefresh} setSelectedDependencia={setSelectedDependencia} />
          )}
        </div>
      </div>
    </div>
  );
};
