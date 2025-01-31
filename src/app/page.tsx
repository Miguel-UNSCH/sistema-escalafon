import { ThemeToggle } from "@/components/theme-toogle";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

export default function Home() {
  return (
    <div className="justify-items-center items-center gap-16 grid grid-rows-[20px_1fr_20px] p-8 sm:p-20 pb-20 min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center sm:items-start gap-8 row-start-2">
        <ThemeToggle />

        <Link
          href={"/dashboard"}
          className="flex flex-row items-center gap-2 bg-bg-card px-4 p-2 rounded-lg text-xl"
        >
          <p className="font-bold">comenzar</p>
          <LuArrowRight className="text-lg" />
        </Link>
      </main>
    </div>
  );
}
