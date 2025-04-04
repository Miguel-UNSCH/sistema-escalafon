"use client";

import { loginSchema, ZLoginS } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormMessage } from "@/components/ui/form";
import { loginAction } from "@/actions/auth-action";
import { useRouter } from "next/navigation";
import { InputField } from "./custom-fields/input-field";
import { Session } from "next-auth";

export const FormLogin = ({ session }: { session: Session | null }) => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push(session.user.role === "admin" ? "/dashboard" : "/personal-file");
    }
  }, [session, router]);

  if (session) {
    return <div>Cargando...</div>;
  }

  const form = useForm<ZLoginS>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: ZLoginS) => {
    setError(null);

    startTransition(async () => {
      const response = await loginAction(data);

      if (response.message) {
        setError(response.message);
        return;
      }

      if (response.success) {
        if (response.must_change_pwd) {
          router.push("/change-password");
        } else {
          router.push(response.role === "admin" ? "/dashboard" : "/personal-file");
        }
      }
    });
  };

  return (
    <div className="flex flex-col items-center gap-8 w-1/4">
      <p className="font-primary font-bold text-red text-2xl">Iniciar Sesión</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <InputField control={form.control} name="email" label="Email" placeholder="john_doe@gmail.com" />
          <InputField control={form.control} name="password" label="Contraseña" placeholder="**********" type="password" />

          {error && <FormMessage className="text-red">{error}</FormMessage>}
          <Button type="submit" disabled={isPending} className="flex bg-red hover:bg-maroon w-full">
            {isPending ? "Cargando..." : "Iniciar sesión"}
          </Button>
        </form>
      </Form>
      <p
        className="hover:border-mauve hover:border-b-2 font-special hover:font-semibold hover:text-mauve text-sm cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      >
        Regresar a la pagina principal
      </p>
    </div>
  );
};
