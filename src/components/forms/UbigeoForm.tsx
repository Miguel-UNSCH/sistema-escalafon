import { useEffect, useState } from "react";
import { SelectField } from "./SelectTypes";
import { ZUbigeo } from "@/lib/schemas/ubigeo.schema";
import { getUbigeo } from "@/services/ubigeoService";
import { useFormContext } from "react-hook-form";

export const UbigeoForm = ({ isCompleteFromDB }: { isCompleteFromDB: boolean }) => {
  const { control, setValue, watch } = useFormContext();

  const [departamentos, setDepartamentos] = useState<string[]>([]);
  const [provincias, setProvincias] = useState<string[]>([]);
  const [distritos, setDistritos] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ubigeoData, setUbigeoData] = useState<any[]>([]);

  const selectedDepartamento = watch("ubigeo.departamento");
  const selectedProvincia = watch("ubigeo.provincia");
  const selectedDistrito = watch("ubigeo.distrito");

  const convertArrayToObjects = (arr: string[]) => arr.map((item) => ({ key: item, value: item }));

  useEffect(() => {
    const fetchDepartamentos = async () => {
      const data: ZUbigeo[] = await getUbigeo({});
      setUbigeoData(data);

      const uniqueDepartamentos = Array.from(new Set(data.map((ubi) => ubi.departamento)));
      setDepartamentos(uniqueDepartamentos);
    };
    fetchDepartamentos();
  }, []);

  useEffect(() => {
    if (selectedDepartamento) {
      const filteredData = ubigeoData.filter((ubi) => ubi.departamento === selectedDepartamento);
      const uniqueProvincias = Array.from(new Set(filteredData.map((ubi) => ubi.provincia)));
      setProvincias(uniqueProvincias);
      setValue("ubigeo.provincia", "");
      setDistritos([]);
    }
  }, [selectedDepartamento, setValue, ubigeoData]);

  useEffect(() => {
    if (selectedProvincia) {
      const filteredData = ubigeoData.filter((ubi) => ubi.departamento === selectedDepartamento && ubi.provincia === selectedProvincia);
      const uniqueDistritos = Array.from(new Set(filteredData.map((ubi) => ubi.distrito)));
      setDistritos(uniqueDistritos);
      setValue("ubigeo.distrito", "");
    }
  }, [selectedProvincia, selectedDepartamento, setValue, ubigeoData]);

  useEffect(() => {
    if (selectedDistrito) {
      const selectedUbigeo = ubigeoData.find((ubi) => ubi.departamento === selectedDepartamento && ubi.provincia === selectedProvincia && ubi.distrito === selectedDistrito);

      if (selectedUbigeo) {
        setValue("ubigeo.inei", selectedUbigeo.inei);
        setValue("ubigeo.reniec", selectedUbigeo.reniec);
      }
    }
  }, [selectedDistrito, selectedProvincia, selectedDepartamento, setValue, ubigeoData]);

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
        disabled={isCompleteFromDB || !selectedProvincia}
      />
    </>
  );
};
