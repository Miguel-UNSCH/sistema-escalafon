"use client";

import { TextField } from "@/components/forms/InputTypes";
import { UploadField } from "@/components/forms/UploadField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { discapacidadSchema, ZDiscapacidad } from "@/lib/schemas/discapaciad.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const FormDisability = ({ personalId }: { personalId: string }) => {
  const form = useForm<ZDiscapacidad>({
    resolver: zodResolver(discapacidadSchema),
    context: { personalId },
  });

  const onSubmit = (data: ZDiscapacidad) => console.log(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <TextField control={form.control} name="tipo" label="Tipo *" placeholder="Ingrese el tipo" />

        <TextField control={form.control} name="organoEstructurado" label="Organo Estructurado *" placeholder="Ingrese el tipo" />

        <UploadField control={form.control} name="documentoSustento" label="Documento de sustento *" />

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
