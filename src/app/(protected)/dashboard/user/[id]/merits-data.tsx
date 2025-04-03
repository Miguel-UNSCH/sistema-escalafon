"use client";

import { ContentData } from "@/app/(protected)/merits-demerits/merits/content-data";
import { usePathname } from "next/navigation";
import React from "react";

export const ModuleMerits = () => {
  const pathname = usePathname();
  const userId = pathname.split("/").pop();

  return <ContentData user_id={userId} />;
};
