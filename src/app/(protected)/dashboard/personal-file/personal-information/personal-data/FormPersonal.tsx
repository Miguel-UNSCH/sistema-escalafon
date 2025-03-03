import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CargoField } from "@/components/forms/CargoForm";
import { DatePicker } from "@/components/forms/DateTypes";
import { TextField } from "@/components/forms/InputTypes";
import { UbigeoForm } from "@/components/forms/UbigeoForm";
import { DependenciaField } from "@/components/forms/DependenciaField";
import { SelectField, SwitchField } from "@/components/forms/SelectTypes";
import { personalSchema, ZPersonal } from "@/lib/schemas/personal.schema";
import { createPersonal, getCurrentPersonal } from "@/services/personalService";
import { estadoCivilOptions, grupoSanguineoOptions, rPensionarioOptions, sexoOptions, situacionLaboralOptions } from "@/utils/items";

export const PersonalForm = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const defaultValues = {
    userId,
    nacionalidad: "",
    ubigeo: {
      inei: "",
      reniec: "",
      departamento: "",
      provincia: "",
      distrito: "",
    },
    domicilio: "",
    interiorUrbanizacion: "",
    cargo: { nombre: "" },
    dependencia: { nombre: "", direccion: "", codigo: "" },
    sexo: undefined,
    dni: "",
    nAutogenerado: "",
    licenciaConducir: "",
    grupoSanguineo: undefined,
    fechaIngreso: undefined,
    fechaNacimiento: undefined,
    unidadEstructurada: "",
    telefono: "",
    celular: "",
    regimenPensionario: undefined,
    aniosServicio: 0,
    nombreAfp: "",
    situacionLaboral: undefined,
    estadoCivil: undefined,
    discapacidad: false,
  };

  const form = useForm<ZPersonal>({ resolver: zodResolver(personalSchema), defaultValues });

  useEffect(() => {
    const fetchPersonalData = async () => {
      try {
        const personalData: ZPersonal & { id: string } = await getCurrentPersonal(userId);
        if (personalData && personalData.id !== null) form.reset({ ...personalData, userId });

        setError(null);
      } catch (err) {
        console.error("Error obteniendo datos personales:", err);
        setError("No se pudo obtener la información personal. Inténtalo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalData();
  }, [userId, form]);

  const onSubmit = async (data: ZPersonal) => {
    try {
      await createPersonal({ ...data, userId });
      setError(null);
    } catch (err) {
      console.error("Error enviando los datos:", err);
      setError("Hubo un problema al guardar los datos. Verifica la información.");
    }
  };

  if (loading) return <p>Cargando datos...</p>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
        <div className="flex flex-col">
          <p className="font-inter font-semibold">Lugar de nacimiento</p>
          <div className="gap-2 grid grid-cols-3">
            <UbigeoForm control={form.control} setValue={form.setValue} watch={form.watch} isCompleteFromDB={false} />
          </div>
        </div>

        <div className="gap-2 grid grid-cols-2">
          <TextField control={form.control} name="domicilio" label="Domicilio *" placeholder="Domicilio" />
          <TextField control={form.control} name="interiorUrbanizacion" label="Interior - Urbanizacion" placeholder="Interior - Urbanizacion" />
        </div>

        <CargoField control={form.control} name="cargo.nombre" disabled={false} />

        <div className="flex flex-col">
          <p className="font-inter font-semibold">Dependencia</p>
          <div className="gap-2 grid grid-cols-3">
            <DependenciaField control={form.control} disabled={false} />
          </div>
        </div>

        <div className="gap-2 grid grid-cols-2">
          <TextField control={form.control} name="dni" label="dni *" placeholder="dni" />
          <SelectField control={form.control} name="sexo" label="Sexo *" placeholder="Seleccione su sexo" options={sexoOptions} disabled={false} />
        </div>

        <div className="gap-2 grid grid-cols-2">
          <TextField control={form.control} name="nAutogenerado" label="N Autogenerado *" placeholder="numero autogenerado" />
          <TextField control={form.control} name="licenciaConducir" label="Licencia de conducir" placeholder="Licencia de conducir" />
        </div>

        <SelectField control={form.control} name="grupoSanguineo" label="Grupo sanguíneo *" options={grupoSanguineoOptions} disabled={false} />

        <div className="gap-2 grid grid-cols-2">
          <DatePicker control={form.control} name="fechaNacimiento" label="Fecha de nacimiento" disabled={false} />
          <DatePicker control={form.control} name="fechaIngreso" label="Fecha de ingreso" disabled={false} />
        </div>

        <TextField control={form.control} name="unidadEstructurada" label="Unidad estructurada *" placeholder="Unidad estructurada" />

        <div className="gap-2 grid grid-cols-2">
          <TextField control={form.control} name="celular" label="Celular *" placeholder="Celular" />
          <TextField control={form.control} name="telefono" label="Telefono" placeholder="Telefono" />
        </div>

        <SelectField
          control={form.control}
          name="regimenPensionario"
          label="Régimen pensionario *"
          placeholder="Régimen pensionario"
          options={rPensionarioOptions}
          disabled={false}
        />

        <TextField control={form.control} name="aniosServicio" label="Anios de Servicio *" placeholder="0" type="number" />

        <TextField control={form.control} name="nombreAfp" label="Nombre AFP *" placeholder="nombre AFP" />

        <SelectField control={form.control} name="situacionLaboral" label="Situación Laboral *" options={situacionLaboralOptions} disabled={false} />

        <SelectField control={form.control} name="estadoCivil" label="Estado civil *" options={estadoCivilOptions} disabled={false} />

        <SwitchField control={form.control} name="discapacidad" label="Discapacidad *" description="Presenta algun tipo de discapacidad." disabled={false} />

        {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
        <div className="flex justify-end">
          <Button type="submit" onClick={() => console.log(form)} className="justify-end bg-maroon hover:bg-red">
            Guardar
          </Button>
        </div>
      </form>
    </Form>
  );
};
