"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/custom-fields/input-field";
import { Hexagon, KeyRound } from "lucide-react";
import { getUserById, restorePwd, updateUser } from "@/actions/user-actions";
import toast from "react-hot-toast";
import { User } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";

const userSchema = z.object({
  name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  dni: z.string(),
});

export type ZUser = z.infer<typeof userSchema>;

export const UserData = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isPending, startTransition] = useTransition();
  const [showRestorePwd, setShowRestorePwd] = useState(false);

  const form = useForm<ZUser>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      last_name: "",
      email: "",
      dni: "",
    },
  });

  useEffect(() => {
    startTransition(() => {
      getUserById(userId).then((res) => {
        if (res.success && res.data) {
          setUser(res.data);
          setShowRestorePwd(res.data.must_change_pwd === 0);

          form.reset({
            name: res.data.name,
            last_name: res.data.last_name,
            email: res.data.email,
            dni: res.data.dni,
          });
        }
      });
    });
  }, [userId, form]);

  const handleRestorePassword = () => {
    startTransition(async () => {
      try {
        const res = await restorePwd(userId);
        if (res.success) {
          toast.success("Contraseña restaurada con éxito");
          setShowRestorePwd(false);
        } else {
          toast.error(res.message ?? "Error al restaurar contraseña");
        }
      } catch {
        toast.error("Ocurrió un error inesperado");
      }
    });
  };

  const onSubmit = (data: ZUser) => {
    startTransition(async () => {
      try {
        const res = await updateUser(userId, data);
        if (res.success) {
          toast.success("Datos actualizados correctamente");
          setUser((prev) => (prev ? { ...prev, ...data } : null));
        } else {
          toast.error(res.message ?? "Error al actualizar los datos");
        }
      } catch {
        toast.error("Ocurrió un error al actualizar los datos");
      }
    });
  };

  if (!user) {
    return <p className="text-muted-foreground text-center">Cargando datos del usuario...</p>;
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <p className="pb-2 font-primary font-semibold text-peach text-xl uppercase">Información básica del personal</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="flex flex-row-reverse items-center gap-4 w-full">
            <div className="w-full">
              <InputField control={form.control} name="name" placeholder="nombres" type="text" />
            </div>
            <p className="pl-4 w-1/4 font-primary">Nombres</p>
          </div>

          <div className="flex flex-row-reverse items-center gap-4 w-full">
            <div className="w-full">
              <InputField control={form.control} name="last_name" placeholder="apellidos" type="text" />
            </div>
            <p className="pl-4 w-1/4 font-primary">Apellidos</p>
          </div>

          <div className="flex flex-row-reverse items-center gap-4 w-full">
            <div className="w-full">
              <InputField control={form.control} name="email" placeholder="correo electrónico" type="email" />
            </div>
            <p className="pl-4 w-1/4 font-primary">Correo Electrónico</p>
          </div>

          <div className="flex flex-row-reverse items-center gap-4 w-full">
            <div className="w-full">
              <InputField control={form.control} name="dni" placeholder="DNI" type="text" />
            </div>
            <p className="pl-4 w-1/4 font-primary">DNI</p>
          </div>

          <div className="flex justify-end gap-4 p-2">
            {showRestorePwd && (
              <Button type="button" onClick={handleRestorePassword} disabled={isPending} className="flex flex-row items-center gap-2 font-special">
                <KeyRound />
                {isPending ? "Cargando..." : "Restablecer contraseña"}
              </Button>
            )}
            <Button type="submit" disabled={isPending} className="flex flex-row items-center gap-2 font-special">
              <Hexagon />
              {isPending ? "Cargando..." : "Actualizar datos"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
