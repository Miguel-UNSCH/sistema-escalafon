"use client";

import { TextField } from "@/components/forms/InputTypes";
import { UploadField } from "@/components/forms/UploadField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { experienciaSchema, ZExperiencia } from "@/lib/schemas/experiencia.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const FormExperiencia = ({ personalId }: { personalId: string }) => {
  const form = useForm<ZExperiencia>({
    resolver: zodResolver(experienciaSchema),
    context: { personalId },
  });

  const onSubmit = (data: ZExperiencia) => console.log(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <UploadField control={form.control} name="documentoSustento" label="Documento de sustento *" />

        <TextField control={form.control} name="centroLabor" label="Centro de Labor *" placeholder="Ingrese el centro labor" />

        <TextField control={form.control} name="dependenciaOficinaId" label="Organo Estructurado *" placeholder="Ingrese el tipo" />

        <TextField control={form.control} name="condicionLaboral" label="Condicion Laboral *" placeholder="Ingrese la condicion laboral" />

        <div className="flex justify-end">
          <Button type="submit" onClick={() => console.log(form.getValues())} className="justify-end bg-maroon hover:bg-red">
            Guardar
          </Button>
        </div>
      </form>
    </Form>
  );
};
