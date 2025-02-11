import { auth } from "@/auth";
import LogoutButtom from "@/components/logout-buttom";

const Page = async () => {
  const session = await auth();
  if (session?.user?.role !== "PERSONAL") {
    return <div>admin only show</div>;
  }
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <LogoutButtom />
    </div>
  );
};
export default Page;
