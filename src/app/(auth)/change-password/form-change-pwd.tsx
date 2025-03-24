"use client";

import { InputField } from "@/components/custom-fields/input-field";
import { Button } from "@/components/ui/button";
import { Form, FormMessage } from "@/components/ui/form";
import { changePwdSchema, ZChangePwdS } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { patchPassword } from "@/actions/auth-action";

export const FormChangePwd = ({ email, role }: { email: string; role: string }) => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<ZChangePwdS>({
    resolver: zodResolver(changePwdSchema),
    defaultValues: {
      pwd: "",
      newPwd: "",
      repeatNewPwd: "",
    },
  });

  const onSubmit = async (data: ZChangePwdS) => {
    setError(null);
    setSuccessMessage(null);

    startTransition(async () => {
      const response = await patchPassword(email, data.pwd, data.newPwd);

      if (response.error) {
        setError(response.error);
        return;
      }

      setSuccessMessage("Contraseña actualizada exitosamente. Redirigiendo...");

      setTimeout(() => {
        router.push(role === "admin" ? "/dashboard" : "/personal-file");
      }, 2000);
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-primary font-bold text-red text-xl uppercase">Cambiar la Contraseña</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
          <InputField control={form.control} name="pwd" label="Contraseña actual" placeholder="Ingresa tu contraseña actual" type="password" />
          <InputField control={form.control} name="newPwd" label="Nueva contraseña" placeholder="Ingresa tu nueva contraseña" type="password" />
          <InputField control={form.control} name="repeatNewPwd" label="Repetir nueva contraseña" placeholder="Repite la nueva contraseña" type="password" />

          {error && <FormMessage className="text-red">{error}</FormMessage>}
          {successMessage && <FormMessage className="text-green">{successMessage}</FormMessage>}

          <Button type="submit" disabled={isPending} className="flex bg-red hover:bg-maroon w-full">
            {isPending ? "Actualizando..." : "Actualizar contraseña"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
