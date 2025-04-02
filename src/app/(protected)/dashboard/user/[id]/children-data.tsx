"use client";

import { ContentData } from "@/app/(protected)/personal-file/personal-information/children-data/content-data";
import { usePathname } from "next/navigation";
import React from "react";

export const ModuleChildren = () => {
  const pathname = usePathname();
  const userId = pathname.split("/").pop();

  return (
    <div>
      <ContentData user_id={userId} />
    </div>
  );
};
