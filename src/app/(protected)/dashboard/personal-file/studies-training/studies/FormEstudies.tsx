import { DatePicker } from "@/components/forms/DateTypes";
import { TextField } from "@/components/forms/InputTypes";
import { SelectField } from "@/components/forms/SelectTypes";
import { UploadField } from "@/components/forms/UploadField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { estudioSchema, ZEstudio } from "@/lib/schemas/estudio.schema";
import { formacionAcademicaOptions } from "@/utils/items";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface FormEstudiesProps {
  personalId: number;
}
export const FormEstudies = ({ personalId }: FormEstudiesProps) => {
  const form = useForm<ZEstudio>({
    resolver: zodResolver(estudioSchema),
    defaultValues: {
      personalId,
      nivel: "",
      periodo: {
        from: undefined,
        to: undefined,
      },
      institucion: "",
      otrosEstudios: undefined,
    },
  });

  const onSubmit = async (data: ZEstudio) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <SelectField control={form.control} name="nivel" label="Formacion academica *" options={formacionAcademicaOptions} />

        <TextField control={form.control} name="institucion" label="Institucion *" placeholder="ingrese la institucion" />

        <div className="gap-4 grid grid-cols-2">
          <DatePicker control={form.control} name="periodo.from" label="Fecha de inicio" disabled={false} />
          <DatePicker control={form.control} name="periodo.to" label="Fecha de culminacion" disabled={false} />
        </div>

        <UploadField control={form.control} name="otrosEstudios" label="Subir Archivo *" />

        <div className="flex justify-end">
          <Button type="submit" onClick={() => console.log(form.getValues())} className="justify-end bg-[#d20f39] hover:bg-[#e64553]">
            Guardar
          </Button>
        </div>
      </form>
    </Form>
  );
};
