"use server";

import React from "react";
import { auth } from "@/auth";
import { ContentData } from "./content-data";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session || !session?.user?.email) {
    redirect("/login");
  }

  return (
    <div className="flex justify-center w-full">
      <ContentData />
    </div>
  );
};

export default page;
