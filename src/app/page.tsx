import { ThemeToggle } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";
import React from "react";
import logo from "@/assets/logos/gobierno-regional-ayacucho-removebg-preview.png";
import Image from "next/image";
import TextAnimate from "@/components/ui/text-animate";

const page = () => {
  return (
    <div className="flex flex-col justify-between items-center gap-8 row-start-2 bg-background py-5 w-full h-full font-poppins">
      <div className="flex flex-row justify-between items-center p-5 w-4/5">
        <div className="flex flex-row items-center gap-2">
          <Image src={logo} alt="Logo" width={60} height={60} />
          <div className="flex flex-col justify-center font-black">
            <p className="text-xl">Gobierno Regional</p>
            <p className="text-2xl text-center">AYACUCHO</p>
          </div>
        </div>
        <ThemeToggle />
      </div>

      <div className="flex flex-row gap-5 w-2/3 h-full">
        <div className="flex flex-col justify-center gap-5 h-full font-text">
          <div className="flex flex-col gap-2 p-4">
            <p className="font-bold text-mauve text-5xl">Bienvenido a</p>
            <span className="font-bold text-red text-4xl">
              <TextAnimate textList={["Escalafón", "escalafón"]} />
            </span>
            <p className="text-red text-sm">
              Registra tus datos y avanza en tu <span className="font-bold">desarrollo profesional ...</span>
            </p>
          </div>
          <div className="flex flex-row justify-start gap-5 p-4">
            <Link href="/login">
              <Button className="flex flex-row gap-5 bg-maroon hover:bg-red rounded-xl font-primary hover:font-semibold">
                <LogIn />
                Ingresar
              </Button>
            </Link>

            <Button className="flex flex-row gap-5 bg-maroon hover:bg-red rounded-xl font-primary hover:font-semibold" disabled={false}>
              <LogIn />
              Ver Tutorial
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
