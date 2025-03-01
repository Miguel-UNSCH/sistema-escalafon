"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toogle";
import logoLight from "@/assets/logos/inicio_claro.png";
import logoDark from "@/assets/logos/inicio_oscuro.png";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme } = useTheme();
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function fetchSession() {
      const res = await fetch("/api/session");
      const data = await res.json();
      setSession(data);
    }
    fetchSession();
  }, []);

  return (
    <main className="flex flex-col justify-between items-center gap-8 row-start-2 bg-background py-5 w-full h-full font-poppins">
      <div className="flex flex-row justify-between items-center p-5 w-4/5">
        <Image src={theme === "light" ? logoLight : logoDark} alt="Logo" width={200} height={100} />

        <ThemeToggle />
      </div>

      <div className="flex flex-row gap-5 w-2/3 h-full">
        <div className="flex flex-col justify-center gap-5 h-full">
          <div className="flex flex-col gap-2 p-4">
            <p className="font-bold text-5xl">Bienvenido a</p>
            <p className="font-bold text-red text-4xl">Escalafón</p>
            <p className="font-montserrat text-lg">
              Registra tus datos y avanza en tu <span className="font-bold">desarrollo profesional</span>
            </p>
          </div>
          <div className="flex flex-row justify-start gap-5 p-4 font-inter">
            <Link href={session ? "/dashboard" : "/login"}>
              <Button className="flex flex-row gap-5 bg-maroon hover:bg-red rounded-xl">
                <LogIn />
                Ingresar
              </Button>
            </Link>

            <Button className="flex flex-row gap-5 bg-maroon hover:bg-red rounded-xl" disabled={false}>
              <LogIn />
              Ver Tutorial
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
