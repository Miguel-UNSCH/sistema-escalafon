import React, { useState } from "react";
import { MenuItem } from "@/interfaces/MenuItem";
import { usePathname } from "next/navigation";
import SidebarMenuItem from "./SidebarMenuItem";
import SidebarMenuItems from "./SidebarMenuItems";

interface SidebarMenuGroupProps {
  title: string;
  items: MenuItem[];
}
const SidebarMenuGroup: React.FC<SidebarMenuGroupProps> = ({
  title,
  items,
}) => {
  const pathname = usePathname();
  const lengtArr = items.length;
  console.log(lengtArr);

  const [isOpen, setIsOpen] = useState<{
    nv: number;
    key: string;
    value: boolean;
  }>({
    nv: -1,
    key: "",
    value: false,
  });

  const handleToggleSubmenu = (path: string, level: number) => {
    setIsOpen((prev) => {
      if (prev.key === path && prev.nv === level) {
        return { nv: level, key: path, value: !prev.value };
      }
      return { nv: level, key: path, value: true };
    });
  };

  return (
    <nav className="mt-4">
      <h2 className="px-4 font-semibold text-text-section-title text-xs uppercase tracking-wide">
        {title}
      </h2>
      <ul className="space-y-1 mt-2">
        {items.map((item, idx) => {
          const isActive = item.path === pathname;
          return (
            <li key={idx}>
              {item.submenus && item.submenus.length > 0 ? (
                <SidebarMenuItems
                  item={item}
                  isActive={isActive}
                  isOpen={isOpen}
                  toggleSubmenu={() =>
                    handleToggleSubmenu(item.path as string, 0)
                  }
                  level={0}
                />
              ) : (
                <SidebarMenuItem
                  item={item}
                  isActive={isActive}
                  isOpen={isOpen}
                  toggleSubmenu={() =>
                    handleToggleSubmenu(item.path as string, 0)
                  }
                  level={0}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SidebarMenuGroup;
