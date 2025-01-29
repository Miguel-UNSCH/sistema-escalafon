import React from "react";
import Link from "next/link";

import { LuDot } from "react-icons/lu";
import { MenuItem } from "@/interfaces/MenuItem";
import { AiOutlineReload } from "react-icons/ai";

interface SidebarMenuItemProps {
  item: MenuItem;
  isActive: boolean;
  isOpen: { nv: number; key: string; value: boolean };
  toggleSubmenu: () => void;
  level: number;
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  item,
  isActive,
  level,
}) => {
  const icon = level === 0 ? item.icon || <AiOutlineReload /> : <LuDot />;

  return (
    <Link
      href={item.path || "#"}
      className={`flex items-center justify-between px-6 py-4 font-medium text-sm rounded-lg ${
        isActive
          ? "bg-link-hover text-text-link"
          : "text-text-link hover:bg-link-hover"
      }`}
    >
      <div className="flex items-center gap-4">
        {icon && <span>{icon}</span>}
        <span className="capitalize">{item.label}</span>
      </div>
    </Link>
  );
};

export default SidebarMenuItem;
