"use client";

import { ContentData } from "@/app/(protected)/bonuses-evaluations/evaluations/content-data";
import { usePathname } from "next/navigation";
import React from "react";

export const ModuleEvaluations = () => {
  const pathname = usePathname();
  const userId = pathname.split("/").pop();

  return <ContentData user_id={userId} />;
};
