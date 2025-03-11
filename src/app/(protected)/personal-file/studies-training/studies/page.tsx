"use server";

import React from "react";
import { auth } from "@/auth";
import { ContentData } from "./content-data";

const page = async () => {
  const session = await auth();

  if (!session) return <p>No autenticado</p>;
  return (
    <div className="flex justify-center py-2 w-full">
      <ContentData />
    </div>
  );
};

export default page;
