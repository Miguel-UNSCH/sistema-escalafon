"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { conyugeSchema } from "@/lib/schemas/conyuge.schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ConyugeForm = () => {
  const form = useForm<z.infer<typeof conyugeSchema>>({
    resolver: zodResolver(conyugeSchema),
    defaultValues: {
      nombres: "",
      apellidos: "",
      ocupacion: "",
    },
  });

  const onSubmit = (data: z.infer<typeof conyugeSchema>) => console.log(data);

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
          name="fechaNacimiento"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha de nacimiento</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant={"outline"} className={cn(" pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                      {field.value ? format(field.value, "PPP") : <span>Seleccione la fecha</span>}
                      <CalendarIcon className="opacity-50 ml-auto w-4 h-4" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-auto" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date);
                    }}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <FormField
          control={form.control}
          name="profesion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profesion</FormLabel>
              <FormControl>
                <Input placeholder="profesion" {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ocupacion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ocupacion</FormLabel>
              <FormControl>
                <Input placeholder="ocupacion" {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="centroTrabajo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Centro de trabajo</FormLabel>
              <FormControl>
                <Input placeholder="centro de trabajo" {...field} type="text" />
              </FormControl>
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
      <div className="flex flex-col gap-2 w-4/5">
        <p className="font-inter font-bold text-2xl text-center uppercase">datos del conyuge</p>
        <ConyugeForm />
      </div>
    </div>
  );
};

export default page;
