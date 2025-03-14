"use server";

import { auth } from "@/auth";
import { Dashboard } from "./content-dashboard";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return <Dashboard session={session}>{children}</Dashboard>;
}
