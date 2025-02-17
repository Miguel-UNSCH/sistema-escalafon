"use client";

import React from "react";
import FormLogin from "@/components/form-login";
import { ThemeToggle } from "@/components/theme-toogle";
import Image from "next/image";
import logoLight from "@/assets/logos/inicio_claro.png";

const Page = () => {
  return (
    <div className="flex flex-row justify-between items-center w-4/5 h-4/5">
      <div className="flex flex-col justify-between p-5 h-full">
        <Image src={logoLight} alt="Logo" width={200} height={100} />
        <div className="flex flex-col gap-2">
          <p className="font-bold text-[#e64553] text-3xl text-center">Iniciar Sesión</p>
          <p className="font-semibold text-2xl text-center">Escalafón</p>
        </div>
        <ThemeToggle />
      </div>
      <div className="flex w-96">
        <FormLogin />
      </div>
    </div>
  );
};

export default Page;
