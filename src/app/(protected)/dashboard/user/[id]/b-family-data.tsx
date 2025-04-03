"use client";

import { ContentData } from "@/app/(protected)/bonuses-evaluations/bonuses/family/content-data";
import { usePathname } from "next/navigation";
import React from "react";

export const ModuleBFamily = () => {
  const pathname = usePathname();
  const userId = pathname.split("/").pop();

  return <ContentData user_id={userId} />;
};
