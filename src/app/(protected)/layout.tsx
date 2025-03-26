"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ContentData } from "./content-dashboard";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session || !session?.user?.email) {
    redirect("/login");
  }

  return <ContentData session={session}>{children}</ContentData>;
}
