"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { hijoSchema } from "@/lib/schemas/hijo.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormHijo = () => {
  const form = useForm<z.infer<typeof hijoSchema>>({
    resolver: zodResolver(hijoSchema),
    defaultValues: {
      nombres: "",
      apellidos: "",
      fechaNacimiento: "",
    },
  });

  const onSubmit = (data: z.infer<typeof hijoSchema>) => console.log(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="gap-2 grid grid-cols-2">
          <FormField
            control={form.control}
            name="nombres"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombres</FormLabel>
                <FormControl>
                  <Input placeholder="Ingresen sus nombres" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apellidos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellidos</FormLabel>
                <FormControl>
                  <Input placeholder="Ingresen sus apellidos" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col">
          <p className="font-inter font-semibold">Lugar de nacimiento</p>
          <div className="gap-2 grid grid-cols-3">
            <FormField
              control={form.control}
              name="departamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departamento</FormLabel>
                  <FormControl>
                    <Input placeholder="AYACUCHO" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="provincia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provincia</FormLabel>
                  <FormControl>
                    <Input placeholder="HUAMANGA" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="distrito"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distrito</FormLabel>
                  <FormControl>
                    <Input placeholder="AYACUCHO" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="gradoInstruccion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grado de instruccion</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Grado de instruccion" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sin instruccion">Sin Instruccion</SelectItem>
                  <SelectItem value="primaria completa">Primaria Completa</SelectItem>
                  <SelectItem value="primaria incompleta">Primaria Incompleta</SelectItem>
                  <SelectItem value="secundaria completa">Secundaria Completa</SelectItem>
                  <SelectItem value="secundaria incompleta">Secundaria Incompleta</SelectItem>
                  <SelectItem value="tecnivo">Tecnico</SelectItem>
                  <SelectItem value="universitario">Universitario</SelectItem>
                  <SelectItem value="posgrado">Posgrado</SelectItem>
                  <SelectItem value="null">Prefiero no decirlo</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" className="justify-end bg-[#d20f39] hover:bg-[#e64553]">
            Guardar
          </Button>
        </div>
      </form>
    </Form>
  );
};

const page = () => {
  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex flex-col gap-2 w-3/4">
        <p className="font-inter font-bold text-2xl text-center uppercase">Datos de los Hijos</p>
        <FormHijo />
      </div>
    </div>
  );
};

export default page;
