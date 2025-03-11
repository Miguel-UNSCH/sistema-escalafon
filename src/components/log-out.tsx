"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { useState } from "react";

export const LogOutBtn = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <div onClick={handleClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="flex items-center gap-2 rounded-full cursor-pointer">
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden whitespace-nowrap"
      >
        <p className="font-special">cerrar sesión</p>
      </motion.div>

      <LogOut size={18} />
    </div>
  );
};
