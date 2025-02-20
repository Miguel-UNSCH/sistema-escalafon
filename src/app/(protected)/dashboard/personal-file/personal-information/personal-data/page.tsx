"use client";

import { PersonalForm } from "./FormPersonal";

const page = () => {
  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex flex-col gap-2 w-4/5">
        <p className="font-inter font-bold text-2xl text-center uppercase">Información Personal</p>
        <PersonalForm />
      </div>
    </div>
  );
};

export default page;
