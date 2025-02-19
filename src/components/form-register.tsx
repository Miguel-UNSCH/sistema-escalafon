"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import { registerSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerAction } from "@/actions/auth-action";
import { CircleCheck, CircleX } from "lucide-react";

const FormRegister = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
      nombres: "",
      apellidos: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    startTransition(async () => {
      const response = await registerAction(values);

      if (response.error) {
        setError(response.error);
        setSuccess(null);
      } else {
        setSuccess("Usuario creado con éxito");
        setError(null);
        form.reset();
      }
    });
  };

  return (
    <div className="mx-auto max-w-md">
      <h2 className="font-inter font-bold text-2xl text-center uppercase">registrar</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="nombres"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombres</FormLabel>
                <FormControl>
                  <Input placeholder="nombres" {...field} type="text" />
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
                  <Input placeholder="apellidos" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input placeholder="contraseña" {...field} type="password" />
                </FormControl>
                <FormDescription>
                  La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="repeatPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repertir Contraseña</FormLabel>
                <FormControl>
                  <Input placeholder="repetir contraseña" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <div className="flex flex-row items-center gap-2 bg-[#e64553] bg-opacity-30 p-2 px-4 rounded-lg font-inter text-[#d20f39] text-sm">
              <CircleX size={16} />
              <p className="font-montserrat font-semibold">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex flex-row items-center gap-2 bg-[#a6d189] bg-opacity-30 p-2 px-4 rounded-lg font-inter text-[#40a02b] text-sm">
              <CircleCheck size={16} />
              <p className="font-montserrat font-semibold">{success}</p>
            </div>
          )}
          <div className="flex justify-end">
            <Button type="submit" disabled={isPending} className="justify-end bg-[#d20f39] hover:bg-[#e64553]">
              registrar usuario
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormRegister;
