import { auth } from "@/auth";
import { ThemeToggle } from "@/components/theme-toogle";
import { LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logoLight from "@/assets/logos/inicio_claro.png";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex flex-col justify-between items-center gap-8 row-start-2 bg-[#eff1f5] py-5 w-full h-full font-poppins text-[#4c4f69]">
      <div className="flex flex-row justify-between items-center p-5 w-4/5">
        <Image src={logoLight} alt="Logo" width={200} height={100} />
        <ThemeToggle />
      </div>

      <div className="flex flex-row gap-5 w-2/3 h-full">
        <div className="flex flex-col justify-center gap-5 h-full">
          <div className="flex flex-col gap-2 p-4">
            <p className="font-bold text-5xl">Bienvenido a</p>
            <p className="font-bold text-[#d20f39] text-4xl">Escalafón</p>
            <p className="font-montserrat text-lg">
              Registra tus datos y avanza en tu <span className="font-bold">desarrollo profesional</span>
            </p>
          </div>
          <div className="flex flex-row justify-start gap-5 p-4">
            <Link href={`${!session ? "/login" : "/dashboard"}`}>
              <Button className="flex flex-row gap-5 bg-[#e64553] hover:bg-[#d20f39] rounded-xl">
                <LogIn />
                Ingresar
              </Button>
            </Link>
            <Link href={`${!session ? "#" : "#"}`}>
              <Button className="flex flex-row gap-5 bg-[#e64553] hover:bg-[#d20f39] rounded-xl">
                <LogIn />
                Ver tutorial
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

/**
 * https://gra.regionayacucho.gob.pe/otic
 */
