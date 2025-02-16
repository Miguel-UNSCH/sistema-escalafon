import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;
  if (session?.user?.role !== "PERSONAL") return <div>admin only show</div>;

  return <pre>{JSON.stringify(session, null, 2)}</pre>;
}
