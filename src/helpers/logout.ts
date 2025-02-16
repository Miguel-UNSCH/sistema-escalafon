import { signOut } from "next-auth/react";

const logout = async () => {
  await signOut({
    callbackUrl: "/",
  });
};

export default logout;
