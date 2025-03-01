"use client";

import React from "react";
import Image from "next/image";

import FormLogin from "@/components/form-login";
import { ThemeToggle } from "@/components/theme-toogle";
import Link from "next/link";
import logo from "@/assets/logos/gobierno-regional-ayacucho-removebg-preview.png";

const Page = () => {
  return (
    <div className="flex flex-row justify-between items-center w-4/5 h-4/5">
      <div className="flex flex-col justify-between p-5 h-full">
        <Link href={"/"}>
          <div className="flex flex-row items-center gap-2">
            <Image src={logo} alt="Logo" width={60} height={60} />
            <div className="flex flex-col justify-center font-black">
              <p className="text-xl">Gobierno Regional</p>
              <p className="text-2xl text-center">AYACUCHO</p>
            </div>
          </div>
        </Link>

        <div className="flex flex-col gap-2">
          <p className="font-bold text-red text-3xl text-center">Iniciar Sesión</p>
          <p className="font-semibold text-2xl text-center">Escalafón</p>
        </div>
        <div>
          <ThemeToggle />
        </div>
      </div>
      <div className="flex w-96">
        <FormLogin />
      </div>
    </div>
  );
};

export default Page;
