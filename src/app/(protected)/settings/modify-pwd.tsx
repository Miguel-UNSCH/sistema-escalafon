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
import { Key } from "lucide-react";

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
      } catch {
        toast.error("Error al cambiar la contraseña.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <h2 className="py-2 font-primary font-bold text-peach text-2xl">Cambiar contraseña</h2>
      <div className="flex flex-col">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <div className="flex flex-col gap-4 w-full text-[1rem]">
              <div className="flex flex-row-reverse items-center gap-4 w-full">
                <div className="w-full">
                  <InputField control={form.control} name="current_pwd" label="" placeholder="**********" type="password" />
                </div>
                <p className="pl-4 w-1/3 font-primary capitalize">contraseña actual</p>
              </div>
              <div className="flex flex-row-reverse items-center gap-4 w-full">
                <div className="w-full">
                  <InputField control={form.control} name="new_pwd" label="" placeholder="**********" type="password" />
                </div>
                <p className="pl-4 w-1/3 font-primary capitalize">nueva contraseña</p>
              </div>
              <div className="flex flex-row-reverse items-center gap-4 w-full">
                <div className="w-full">
                  <InputField control={form.control} name="repeat_new_pwd" label="" placeholder="**********" type="password" />
                </div>
                <p className="pl-4 w-1/3 font-primary capitalize">repita la nueva contraseña</p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isPending} className="flex flex-row items-center gap-2 font-special">
                <Key />
                {isPending ? "Cargando..." : "Cambiar contraseña"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
