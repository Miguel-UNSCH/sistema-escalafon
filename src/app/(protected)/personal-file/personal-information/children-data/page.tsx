"use server";

import React from "react";
import { FormData } from "./form-data";
import { TableData } from "./table-data";

const page = () => {
  return (
    <div className="flex justify-center py-2 w-full">
      <div className="flex flex-col gap-5 p-2 w-4/5">
        <p className="font-primary font-semibold text-2xl text-center uppercase">Datos de los Hijos</p>
        <TableData />
        <FormData />
      </div>
    </div>
  );
};

export default page;
