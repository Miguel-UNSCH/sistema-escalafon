"use client";

import { Cargo } from "@prisma/client";
import { Package } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

import { getCargos } from "@/actions/others-action";
import toast from "react-hot-toast";
import { debounce } from "lodash";
import { SearchField } from "@/components/custom-fields/search-field";
import { CreateCargoComponent } from "@/components/others/create-cargo";
import { ModifyCargoComponent } from "@/components/others/modify-cargo";
import { CreateEntity } from "@/components/others/create-entity";
import { Table } from "@/components/others/table-cargo";

export const CargoComponent = () => {
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [selectedCargo, setSelectedCargo] = useState<Cargo | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchCargos = async (query: string) => {
    setLoading(true);
    try {
      const response = await getCargos(query);
      if (response.success && response.data) {
        setCargos(response.data);
      } else {
        toast.error(response.message || "No se pudieron obtener los cargos.");
      }
    } catch {
      toast.error("Error al obtener los cargos.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchCargos = useCallback(debounce(fetchCargos, 500), []);

  const handleSearch = (query: string) => {
    setSearch(query);
    debouncedFetchCargos(query);
  };

  useEffect(() => {
    fetchCargos("");
  }, []);

  const handleRefresh = () => {
    setSearch("");
    fetchCargos("");
    setSelectedCargo(null);
  };

  return (
    <div className="flex flex-col gap-2 py-4 w-full">
      <p className="font-primary font-bold text-lg md:text-xl">Cargos</p>
      <SearchField description="Buscar cargos por nombre" value={search} onSearch={handleSearch} />

      <div className="flex xl:flex-row flex-col gap-2 w-full">
        <Table loading={loading} cargos={cargos} selectedCargo={selectedCargo} setSelectedCargo={setSelectedCargo} />

        <div className="flex flex-col gap-5 p-4 w-full xl:w-1/2">
          <CreateCargoComponent onCargoCreated={handleRefresh} setSelectedCargo={setSelectedCargo} />
          {selectedCargo && <ModifyCargoComponent key={selectedCargo.id} cargo={selectedCargo} onUpdated={handleRefresh} setSelectedCargo={setSelectedCargo} />}
        </div>
      </div>

      <CreateEntity title="Registrar varios cargos" icon={<Package />} buttonText="Crear Cargos" model="cargo" />
    </div>
  );
};
