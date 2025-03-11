import { getUbigeos } from "@/actions/others-action";
import { ZUbigeo } from "@/lib/schemas/others-schema";
import React, { useEffect, useState } from "react";
import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { SelectField } from "./select-field";

interface UbigeoFieldProps {
  control: Control<any>;
  isCompleteFromDB: boolean;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}

export const UbigeoField = ({ control, isCompleteFromDB, setValue, watch }: UbigeoFieldProps) => {
  const [departamentos, setDepartamentos] = useState<string[]>([]);
  const [provincias, setProvincias] = useState<string[]>([]);
  const [distritos, setDistritos] = useState<string[]>([]);

  const selectedDepartamento = watch("ubigeo.departamento");
  const selectedProvincia = watch("ubigeo.provincia");
  const selectedDistrito = watch("ubigeo.distrito");

  const convertArrayToObjects = (arr: string[]) => arr.map((item) => ({ key: item, value: item }));

  useEffect(() => {
    const fetchDepartamentos = async () => {
      const data: ZUbigeo[] = await getUbigeos({});
      const uniqueDepartamentos = Array.from(new Set(data.map((ubi) => ubi.departamento)));
      setDepartamentos(uniqueDepartamentos);
    };
    fetchDepartamentos();
  }, []);

  useEffect(() => {
    const fetchProvincias = async () => {
      if (selectedDepartamento) {
        const data: ZUbigeo[] = await getUbigeos({ departamento: selectedDepartamento });
        const uniqueProvincias = Array.from(new Set(data.map((ubi) => ubi.provincia)));
        setProvincias(uniqueProvincias);
        setDistritos([]);

        if (!uniqueProvincias.includes(selectedProvincia)) {
          setValue("ubigeo.provincia", "");
          setValue("ubigeo.distrito", "");
        }
      }
    };
    fetchProvincias();
  }, [selectedDepartamento, selectedProvincia, setValue]);

  useEffect(() => {
    const fetchDistritos = async () => {
      if (selectedDepartamento && selectedProvincia) {
        const data: ZUbigeo[] = await getUbigeos({ departamento: selectedDepartamento, provincia: selectedProvincia });
        const uniqueDistritos = Array.from(new Set(data.map((ubi) => ubi.distrito)));
        setDistritos(uniqueDistritos);

        if (!uniqueDistritos.includes(selectedDistrito)) {
          setValue("ubigeo.distrito", "");
        }
      }
    };
    fetchDistritos();
  }, [selectedProvincia, selectedDepartamento, selectedDistrito, setValue]);

  useEffect(() => {
    const fetchUbigeoDetails = async () => {
      if (selectedDepartamento && selectedProvincia && selectedDistrito) {
        const data = await getUbigeos({ departamento: selectedDepartamento, provincia: selectedProvincia, distrito: selectedDistrito });
        if (data.length > 0) {
          setValue("ubigeo.inei", data[0].inei);
          setValue("ubigeo.reniec", data[0].reniec);
        }
      }
    };
    fetchUbigeoDetails();
  }, [selectedDistrito, selectedProvincia, selectedDepartamento, setValue]);

  useEffect(() => {
    const initializeUbigeo = async () => {
      if (selectedDepartamento && !provincias.length) {
        const data: ZUbigeo[] = await getUbigeos({ departamento: selectedDepartamento });
        setProvincias(Array.from(new Set(data.map((ubi) => ubi.provincia))));
      }
      if (selectedProvincia && !distritos.length) {
        const data: ZUbigeo[] = await getUbigeos({ departamento: selectedDepartamento, provincia: selectedProvincia });
        setDistritos(Array.from(new Set(data.map((ubi) => ubi.distrito))));
      }
    };
    initializeUbigeo();
  }, [distritos.length, provincias.length, selectedDepartamento, selectedProvincia]);

  return (
    <>
      <SelectField
        control={control}
        name="ubigeo.departamento"
        label="Departamento *"
        options={convertArrayToObjects(departamentos)}
        placeholder="Seleccione el departamento"
        disabled={isCompleteFromDB}
      />
      <SelectField
        control={control}
        name="ubigeo.provincia"
        label="Provincia *"
        options={convertArrayToObjects(provincias)}
        placeholder="Seleccione la provincia"
        disabled={isCompleteFromDB || !selectedDepartamento}
      />
      <SelectField
        control={control}
        name="ubigeo.distrito"
        label="Distrito *"
        options={convertArrayToObjects(distritos)}
        placeholder="Seleccione el distrito"
        disabled={isCompleteFromDB || !selectedProvincia || distritos.length === 0}
      />
    </>
  );
};
