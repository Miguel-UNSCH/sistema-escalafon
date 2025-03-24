"use client";

import { InputField } from "@/components/custom-fields/input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { patchPwd } from "@/actions/auth-action";
import { ChangePwd, cPwdSchema } from "@/lib/zod";

type ModifyPwdProps = {
  userId: string;
};

export const ModifyPwd: React.FC<ModifyPwdProps> = ({ userId }) => {
  const [isPending, startTransition] = useTransition();

  const defaultValues: ChangePwd = {
    current_pwd: "",
    new_pwd: "",
    repeat_new_pwd: "",
  };

  const form = useForm<ChangePwd>({
    resolver: zodResolver(cPwdSchema),
    defaultValues,
  });

  const onSubmit = (data: ChangePwd) => {
    startTransition(async () => {
      try {
        const response = await patchPwd(userId, data);
        if (response.error) {
          toast.error(response.error);
        } else {
          toast.success(response.message || "Contraseña actualizada exitosamente.");
          form.reset();
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error("Error al cambiar la contraseña.");
      }
    });
  };

  return (
    <div className="flex flex-col p-4 sm:p-6 md:p-8 w-full">
      <h2 className="py-2 font-primary font-bold text-peach text-2xl sm:text-3xl md:text-4xl">Cambiar contraseña</h2>
      <div className="flex flex-col">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mx-auto w-full max-w-md">
            <InputField control={form.control} name="current_pwd" label="Contraseña Actual" placeholder="**********" type="password" />
            <InputField control={form.control} name="new_pwd" label="Nueva Contraseña" placeholder="**********" type="password" />
            <InputField control={form.control} name="repeat_new_pwd" label="Repita la Nueva Contraseña" placeholder="**********" type="password" />
            <Button type="submit" disabled={isPending} className="flex bg-maroon hover:bg-red px-4 py-2 rounded-md w-full font-primary font-semibold text-sm text-base">
              {isPending ? "Cargando..." : "Cambiar contraseña"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
