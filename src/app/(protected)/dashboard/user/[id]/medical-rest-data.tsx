"use client";

import { ContentData } from "@/app/(protected)/work-situation/medical-rest/content-data";
import { usePathname } from "next/navigation";
import React from "react";

export const ModuleMedicalRest = () => {
  const pathname = usePathname();
  const userId = pathname.split("/").pop();

  return <ContentData user_id={userId} />;
};
