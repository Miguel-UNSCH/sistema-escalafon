"use client";

import { ContentData } from "@/app/(protected)/personal-file/studies-training/studies/content-data";
import { usePathname } from "next/navigation";
import React from "react";

export const ModuleStudy = () => {
  const pathname = usePathname();
  const userId = pathname.split("/").pop();

  return <ContentData user_id={userId} />;
};
