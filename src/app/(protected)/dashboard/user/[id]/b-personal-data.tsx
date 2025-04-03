"use client";

import { ContentData } from "@/app/(protected)/bonuses-evaluations/bonuses/personal/content-data";
import { usePathname } from "next/navigation";
import React from "react";

export const ModuleBPersonal = () => {
  const pathname = usePathname();
  const userId = pathname.split("/").pop();

  return <ContentData user_id={userId} />;
};
