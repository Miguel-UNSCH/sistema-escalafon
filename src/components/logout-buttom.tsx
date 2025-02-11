"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const LogoutButtom = () => {
  const handleClick = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };
  return <Button onClick={handleClick}>LogOut</Button>;
};

export default LogoutButtom;
