import { getUbigeosField } from "@/actions/others-action";
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
      const response = await getUbigeosField({});
      if (response.success && response.data) {
        const uniqueDepartamentos = Array.from(new Set(response.data.map((ubi) => ubi.departamento)));
        setDepartamentos(uniqueDepartamentos);
      }
    };
    fetchDepartamentos();
  }, []);

  useEffect(() => {
    const fetchProvincias = async () => {
      if (selectedDepartamento) {
        const response = await getUbigeosField({ departamento: selectedDepartamento });
        if (response.success && response.data) {
          const uniqueProvincias = Array.from(new Set(response.data.map((ubi) => ubi.provincia)));
          setProvincias(uniqueProvincias);
          setDistritos([]);

          if (!uniqueProvincias.includes(selectedProvincia)) {
            setValue("ubigeo.provincia", "");
            setValue("ubigeo.distrito", "");
          }
        }
      }
    };
    fetchProvincias();
  }, [selectedDepartamento, selectedProvincia, setValue]);

  useEffect(() => {
    const fetchDistritos = async () => {
      if (selectedDepartamento && selectedProvincia) {
        const response = await getUbigeosField({ departamento: selectedDepartamento, provincia: selectedProvincia });
        if (response.success && response.data) {
          const uniqueDistritos = Array.from(new Set(response.data.map((ubi) => ubi.distrito)));
          setDistritos(uniqueDistritos);

          if (!uniqueDistritos.includes(selectedDistrito)) {
            setValue("ubigeo.distrito", "");
          }
        }
      }
    };
    fetchDistritos();
  }, [selectedProvincia, selectedDepartamento, selectedDistrito, setValue]);

  useEffect(() => {
    const fetchUbigeoDetails = async () => {
      if (selectedDepartamento && selectedProvincia && selectedDistrito) {
        const response = await getUbigeosField({ departamento: selectedDepartamento, provincia: selectedProvincia, distrito: selectedDistrito });
        if (response.success && response.data && response.data.length > 0) {
          setValue("ubigeo.inei", response.data[0].inei);
          setValue("ubigeo.reniec", response.data[0].reniec);
        }
      }
    };
    fetchUbigeoDetails();
  }, [selectedDistrito, selectedProvincia, selectedDepartamento, setValue]);

  useEffect(() => {
    const initializeUbigeo = async () => {
      if (selectedDepartamento && !provincias.length) {
        const response = await getUbigeosField({ departamento: selectedDepartamento });
        if (response.success && response.data) {
          setProvincias(Array.from(new Set(response.data.map((ubi) => ubi.provincia))));
        }
      }
      if (selectedProvincia && !distritos.length) {
        const response = await getUbigeosField({ departamento: selectedDepartamento, provincia: selectedProvincia });
        if (response.success && response.data) {
          setDistritos(Array.from(new Set(response.data.map((ubi) => ubi.distrito))));
        }
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
