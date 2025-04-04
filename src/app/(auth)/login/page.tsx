"use server";

import { FormLogin } from "@/components/form-login";
import React from "react";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();
  return (
    <div className="flex justify-center items-center w-4/5 h-full">
      <FormLogin session={session} />
    </div>
  );
};

export default page;
