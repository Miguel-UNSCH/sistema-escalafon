"use server";

import React from "react";
import { auth } from "@/auth";
import { ContentData } from "./content-data";

const page = async () => {
  const session = await auth();

  if (!session) return <p>No autenticado</p>;

  return (
    <div className="flex justify-center py-2 w-full">
      <div className="flex p-2 w-4/5">
        <ContentData session={session} />
      </div>
    </div>
  );
};

export default page;
