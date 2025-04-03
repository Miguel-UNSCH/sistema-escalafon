"use client";

import { ContentData } from "@/app/(protected)/work-situation/renunciation/content-data";
import { usePathname } from "next/navigation";
import React from "react";

export const ModuleRenunciation = () => {
  const pathname = usePathname();
  const userId = pathname.split("/").pop();

  return <ContentData user_id={userId} />;
};
