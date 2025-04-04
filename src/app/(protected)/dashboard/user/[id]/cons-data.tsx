"use client";

import { ContentData } from "@/app/(protected)/documents/cons/content-data";
import { usePathname } from "next/navigation";
import React from "react";

export const ModuleCons = () => {
  const pathname = usePathname();
  const userId = pathname.split("/").pop();

  return <ContentData user_id={userId} />;
};
