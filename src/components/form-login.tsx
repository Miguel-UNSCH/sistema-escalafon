"use client";

import { z } from "zod";
import { loginSchema } from "@/lib/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginAction } from "@/actions/auth-action";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { TextField } from "./forms/InputTypes";

const FormLogin = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    startTransition(async () => {
      const response = await loginAction(values);

      if (response.error) {
        setError(response.error);
      } else {
        const userRole = response.role; // ✅ Obtener el rol del usuario

        if (userRole === "ADMIN") {
          router.push("/dashboard");
        } else if (userRole === "PERSONAL") {
          router.push("/dashboard/personal-file/personal-information/personal-data");
        } else {
          setError("Rol no reconocido, contacta con el administrador.");
        }
      }
    });
  };
  return (
    <div className="mx-auto w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <TextField control={form.control} name="email" label="Email" placeholder="jdoe@regionayacucho.edu" />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="**********" {...field} type={showPassword ? "text" : "password"} className="pr-10" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="top-1/2 right-2 absolute bg-transparent hover:bg-transparent -translate-y-1/2 transform"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <div className="font-inter text-red text-sm">{error}</div>}
          <Button type="submit" disabled={isPending} className="bg-red hover:bg-maroon w-full">
            Iniciar Sesión
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormLogin;
