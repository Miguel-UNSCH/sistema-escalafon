"use server";

import { auth } from "@/auth";
import React from "react";
import { UploadFile } from "./upload-file";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className="flex flex-col items-center gap-5 p-2 font-primary">
      <UploadFile />
      <pre className="bg-crust p-4 rounded-md">{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
