"use client";

import React from "react";
import { FormHijo } from "./FormChildren";

const page = () => {
  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex flex-col gap-2 w-3/4">
        <p className="font-inter font-bold text-2xl text-center uppercase">Datos de los Hijos</p>
        <FormHijo />
      </div>
    </div>
  );
};

export default page;
