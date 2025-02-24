import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { createPersonal, getCurrentPersonal } from "@/services/personalService";
import { estadoCivilOptions, grupoSanguineoOptions, rPensionarioOptions, sexoOptions, situacionLaboralOptions } from "@/utils/items";

export const PersonalForm = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [isCompleteFromDB, setIsCompleteFromDB] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ZPersonal>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      userId: "",
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
      nombreAfp: "",
      situacionLaboral: undefined,
      estadoCivil: undefined,
      discapacidad: false,
    },
  });

  useEffect(() => {
    const fetchPersonalData = async () => {
      if (session?.user?.id) {
        form.setValue("userId", session.user.id);
        try {
          const personalData: ZPersonal = await getCurrentPersonal(session.user.id);
          if (personalData) {
            form.reset(personalData);
            setIsCompleteFromDB(true);
          } else setIsCompleteFromDB(false);

          setError(null);
        } catch (err) {
          console.error("Error obteniendo datos personales:", err);
          setError("No se pudo obtener la información personal. Inténtalo más tarde.");
          setIsCompleteFromDB(false);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPersonalData();
  }, [session, form]);

  const onSubmit = async (data: ZPersonal) => {
    try {
      await createPersonal(data);
      console.log("Datos enviados correctamente");
      setIsCompleteFromDB(true);
      setError(null);
    } catch (err) {
      console.error("Error enviando los datos:", err);
      setError("Hubo un problema al guardar los datos. Verifica la información.");
    }
  };

  if (loading) return <p>Cargando datos...</p>;

  return (
    <Form {...form}>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
        <TextField control={form.control} name="nacionalidad" label="Nacionalidad *" placeholder="Nacionalidad" disabled={isCompleteFromDB} />

        <div className="flex flex-col">
          <p className="font-inter font-semibold">Lugar de nacimiento</p>
          <div className="gap-2 grid grid-cols-3">
            <UbigeoForm isCompleteFromDB={isCompleteFromDB} />
          </div>
        </div>

        <div className="gap-2 grid grid-cols-2">
          <TextField control={form.control} name="domicilio" label="Domicilio *" placeholder="Domicilio" disabled={isCompleteFromDB} />
          <TextField control={form.control} name="interiorUrbanizacion" label="Interior - Urbanizacion" placeholder="Interior - Urbanizacion" disabled={isCompleteFromDB} />
        </div>

        <CargoField control={form.control} name="cargo.nombre" disabled={isCompleteFromDB} />

        <div className="flex flex-col">
          <p className="font-inter font-semibold">Dependencia</p>
          <div className="gap-2 grid grid-cols-3">
            <DependenciaField control={form.control} disabled={isCompleteFromDB} />
          </div>
        </div>

        <div className="gap-2 grid grid-cols-2">
          <TextField control={form.control} name="dni" label="dni *" placeholder="Telefono" disabled={isCompleteFromDB} />
          <SelectField control={form.control} name="sexo" label="Sexo *" placeholder="Seleccione su sexo" options={sexoOptions} disabled={isCompleteFromDB} />
        </div>

        <div className="gap-2 grid grid-cols-2">
          <TextField control={form.control} name="nAutogenerado" label="N Autogenerado *" placeholder="numero autogenerado" disabled={isCompleteFromDB} />
          <TextField control={form.control} name="licenciaConducir" label="Licencia de conducir" placeholder="Licencia de conducir" disabled={isCompleteFromDB} />
        </div>

        <SelectField control={form.control} name="grupoSanguineo" label="Grupo sanguíneo *" options={grupoSanguineoOptions} disabled={isCompleteFromDB} />

        <div className="gap-2 grid grid-cols-2">
          <DatePicker control={form.control} name="fechaNacimiento" label="Fecha de nacimiento" disabled={isCompleteFromDB} />
          <DatePicker control={form.control} name="fechaIngreso" label="Fecha de ingreso" disabled={isCompleteFromDB} />
        </div>

        <TextField control={form.control} name="unidadEstructurada" label="Unidad estructurada *" placeholder="Unidad estructurada" disabled={isCompleteFromDB} />

        <div className="gap-2 grid grid-cols-2">
          <TextField control={form.control} name="celular" label="Celular *" placeholder="Celular" disabled={isCompleteFromDB} />
          <TextField control={form.control} name="telefono" label="Telefono" placeholder="Telefono" disabled={isCompleteFromDB} />
        </div>

        <SelectField
          control={form.control}
          name="regimenPensionario"
          label="Régimen pensionario *"
          placeholder="Régimen pensionario"
          options={rPensionarioOptions}
          disabled={isCompleteFromDB}
        />

        <TextField control={form.control} name="nombreAfp" label="Nombre AFP *" placeholder="nombre AFP" disabled={isCompleteFromDB} />

        <SelectField control={form.control} name="situacionLaboral" label="Situación Laboral *" options={situacionLaboralOptions} disabled={isCompleteFromDB} />

        <SelectField control={form.control} name="estadoCivil" label="Estado civil *" options={estadoCivilOptions} disabled={isCompleteFromDB} />

        <SwitchField control={form.control} name="discapacidad" label="Estado civil *" description="Presenta algun tipo de discapacidad." disabled={isCompleteFromDB} />

        <div className="flex justify-end">
          {!isCompleteFromDB && (
            <Button type="submit" onClick={() => console.log(form)} className="justify-end bg-[#d20f39] hover:bg-[#e64553]">
              Guardar
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
