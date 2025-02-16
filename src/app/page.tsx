import { auth } from "@/auth";
import { ThemeToggle } from "@/components/theme-toogle";
import { LogIn } from "lucide-react";
import Link from "next/link";
import img from "@/assets/images/landing-page.webp";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex flex-col justify-between items-center gap-8 row-start-2 bg-[#eff1f5] p-5 w-full h-full font-poppins text-[#4c4f69]">
      <div className="flex flex-row justify-around items-center bg-[#ccd0da] p-5 rounded-lg w-full">
        <div>
          <p className="font-inter font-black text-lg uppercase">goierno regional ayacucho</p>
        </div>
        <div className="flex flex-row items-center gap-2 font-semibold">
          <p className="hover:bg-[#e6e9ef] p-1 px-2 rounded-md hover:text-[#e64553]">Tutoriales</p>
          <p className="hover:bg-[#e6e9ef] p-1 px-2 rounded-md hover:text-[#e64553]">Documentación</p>
          <ThemeToggle />
        </div>
      </div>

      <div className="flex flex-row gap-5 h-full">
        <div className="flex flex-col justify-center gap-5 pl-24 w-1/2 h-full">
          <div className="flex flex-col p-4">
            <p className="py-2 font-bold text-2xl uppercase">escalafón</p>
            <p className="font-montserrat text-lg">
              Una plataforma para gestionar y actualizar información laboral, permitiendo a empleados y administradores registrar, revisar y generar
              reportes fácilmente.
            </p>
          </div>
          <div className="flex p-4">
            <Link
              href={`${!session ? "/login" : "/dashboard"}`}
              className="flex flex-row items-center gap-2 bg-[#e64553] hover:bg-[#d20f39] p-2 px-4 rounded-lg text-[#eff1f5]"
            >
              <LogIn />
              <p className="pr-4 font-semibold text-base uppercase">ingresar</p>
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-center w-1/2">
          <Image src={img} alt="Picture of the author" className="rounded-lg w-3/4" />
        </div>
      </div>

      <div className="flex flex-row justify-center items-center gap-2 bg-[#ccd0da] p-5 rounded-lg w-full font-semibold">
        <p className="text-[#4c4f69]">
          © Copyright 2025
          <span className="px-2 hover:underline">Gobierno Regional de Ayacucho.</span>
          Oficina de Tecnologias de Información y Comunicaciones.
        </p>
      </div>
    </main>
  );
}

/**
 * https://gra.regionayacucho.gob.pe/otic
 */
