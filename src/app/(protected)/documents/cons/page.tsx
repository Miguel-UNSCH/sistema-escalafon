"use server";

import React from "react";
import { auth } from "@/auth";
import { ContentData } from "./content-data";

const page = async () => {
  const session = await auth();

  if (!session || !session?.user?.email) return <p>No autorizado!</p>;
  return (
    <div className="flex justify-center w-full">
      <ContentData session={session} />
    </div>
  );
};

export default page;
