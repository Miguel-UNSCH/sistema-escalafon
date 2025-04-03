"use client";

import { ContentData } from "@/app/(protected)/personal-file/studies-training/training/content-data";
import { usePathname } from "next/navigation";
import React from "react";

export const ModuleTraining = () => {
  const pathname = usePathname();
  const userId = pathname.split("/").pop();

  return <ContentData user_id={userId} />;
};
