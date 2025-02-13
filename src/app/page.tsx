import { ThemeToggle } from "@/components/theme-toogle";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

export default function Home() {
  return (
    <main className="flex flex-col items-center sm:items-start gap-8 row-start-2 w-full">
      <div className="flex flex-row justify-evenly items-center w-full">
        <div className="flex flex-row items-center">
          <div className="flex flex-col font-inter font-bold">
            <p className="text-lg capitalize">gobierno regional</p>
            <p className="text-2xl uppercase">ayacucho</p>
          </div>
        </div>
        <div>
          <ThemeToggle />
        </div>
      </div>

      <Link href={"/login"} className="flex flex-row items-center gap-2 bg-bg-card p-2 px-4 rounded-lg text-xl">
        <p className="font-bold">iniciar sesión</p>
        <LuArrowRight className="text-lg" />
      </Link>
    </main>
  );
}
