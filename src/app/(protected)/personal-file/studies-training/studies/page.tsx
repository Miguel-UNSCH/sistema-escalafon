"use server";

import React from "react";
import { FormData } from "./form-data";
import { TableData } from "./table-data";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();

  if (!session) return <p>No autenticado</p>;
  return (
    <div className="flex justify-center py-2 w-full">
      <div className="flex flex-col gap-5 p-2 w-4/5">
        <p className="font-primary font-semibold text-2xl text-center uppercase">Estudios</p>
        <TableData />
        <FormData />
      </div>
    </div>
  );
};

export default page;
