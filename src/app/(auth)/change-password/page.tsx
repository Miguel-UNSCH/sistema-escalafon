"use server";

import React from "react";
import { FormChangePwd } from "./form-change-pwd";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();

  if (!session) return <div>Not authenticated</div>;
  if (!session.user || !session.user.email) return <div>Necesitas iniciar sesión</div>;
  return (
    <div>
      <FormChangePwd email={session.user.email} role={session.user.role ?? "personal"} />
    </div>
  );
};

export default page;
