"use server";

import React from "react";
import { ContentData } from "./content-data";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();

  if (!session) return <p>No autorizado!</p>;

  return (
    <div className="flex justify-center w-full">
      <ContentData userId={session.user.id} />
    </div>
  );
};

export default page;
