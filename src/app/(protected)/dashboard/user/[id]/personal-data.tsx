"use client";

import { usePathname } from "next/navigation";
import { ContentData } from "@/app/(protected)/personal-file/personal-information/personal-data/content-data";

export const ModulePersonal = () => {
  const pathname = usePathname();
  const userId = pathname.split("/").pop();

  return <ContentData user_id={userId} />;
};
