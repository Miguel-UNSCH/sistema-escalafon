"use client";

import { useSession } from "next-auth/react";
import { PersonalForm } from "./FormPersonal";

const Page = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <p className="text-gray-500 text-center">Cargando...</p>;

  if (!session?.user?.id) return <p className="font-bold text-red-500 text-lg text-center">Usuario no autenticado</p>;

  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex flex-col gap-2 w-4/5">
        <p className="font-inter font-bold text-2xl text-center uppercase">Información Personal</p>
        <PersonalForm userId={session.user.id} />
      </div>
    </div>
  );
};

export default Page;
