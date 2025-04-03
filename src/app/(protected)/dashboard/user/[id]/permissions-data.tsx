"use client";

import { ContentData } from "@/app/(protected)/work-situation/permissions/content-data";
import { usePathname } from "next/navigation";
import React from "react";

export const ModulePermissions = () => {
  const pathname = usePathname();
  const userId = pathname.split("/").pop();

  return <ContentData user_id={userId} />;
};
