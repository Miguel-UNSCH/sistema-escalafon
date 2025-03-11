"use server";
import React from "react";
import { FormData } from "./form-data";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();

  if (!session) return <p>No autenticado</p>;

  return (
    <div className="flex justify-center py-2 w-full">
      <div className="flex p-2 w-4/5">
        <FormData session={session} />
      </div>
    </div>
  );
};

export default page;
