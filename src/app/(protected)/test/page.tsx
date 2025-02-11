import { auth } from "@/auth";
import LogoutButtom from "@/components/logout-buttom";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className="container">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <LogoutButtom />
    </div>
  );
}
/** this file only for protected routes */
