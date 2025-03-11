"use client";

import React, { useState, useTransition } from "react";
import { registerSchema, ZRegisterS } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormMessage } from "@/components/ui/form";
import { registerAction } from "@/actions/auth-action";
import { UserRoundPlus } from "lucide-react";
import { InputField } from "./custom-fields/input-field";

export const RegisterForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ZRegisterS>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      lastName: "",
      dni: "",
      email: "",
    },
  });

  const onSubmit = async (data: ZRegisterS) => {
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const response = await registerAction(data);

      if (response.error) {
        setError(response.error);
      } else if (response.success) {
        setSuccess(response.message || "Usuario creado con éxito.");
        form.reset();

        setTimeout(() => setSuccess(null), 2000);
      }
    });
  };

  return (
    <div className="flex flex-col gap-2 w-1/3">
      <p className="py-2 font-primary font-semibold text-text text-center uppercase">Registrar nuevo usuario</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <InputField control={form.control} name="name" label="Nombres" placeholder="Ingrese el nombre" type="text" />
          <InputField control={form.control} name="lastName" label="Apellidos" placeholder="Ingrese el apellido" type="text" />
          <InputField control={form.control} name="dni" label="DNI" placeholder="Digite su DNI" type="text" />
          <InputField control={form.control} name="email" label="Correo Electrónico" placeholder="Ingrese su email" type="email" />

          {error && <FormMessage className="text-red">{error}</FormMessage>}
          {success && <FormMessage className="text-green">{success}</FormMessage>}

          <Button type="submit" disabled={isPending} className="bg-red hover:bg-maroon w-full text-base">
            <UserRoundPlus size={18} />
            {isPending ? "Registrando..." : "Registrar Usuario"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
