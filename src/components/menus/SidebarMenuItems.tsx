import React from "react";
import SidebarMenuItem from "./SidebarMenuItem";
import { MenuItem } from "@/interfaces/MenuItem";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

interface SidebarMenuItemsProps {
  item: MenuItem;
  isActive: boolean;
  isOpen: { nv: number; key: string; value: boolean };
  toggleSubmenu: () => void;
  level: number;
}

const SidebarMenuItems: React.FC<SidebarMenuItemsProps> = ({
  item,
  isActive,
  isOpen,
  toggleSubmenu,
  level,
}) => {
  const isItemOpen =
    isOpen.nv === level && isOpen.key === item.path && isOpen.value;

  return (
    <div>
      <div
        onClick={toggleSubmenu}
        className={`flex items-center justify-between px-6 py-4 font-medium cursor-pointer text-sm rounded-lg ${
          isActive
            ? "bg-link-hover text-link-main"
            : "text-text-link hover:bg-link-hover"
        }`}
      >
        <div className="flex items-center gap-4">
          {item.icon && <span>{item.icon}</span>}
          <span className="text-sm capitalize">{item.label}</span>
        </div>
        <div className="flex items-center space-x-2">
          {item?.badge !== 0 && (
            <span className="inline-block bg-link-main px-2 py-0.5 rounded-full text-white text-xs">
              {item.badge}
            </span>
          )}

          {isOpen.value ? (
            <FaChevronDown size={10} className="transition-all duration-200" />
          ) : (
            <FaChevronRight size={10} className="transition-all duration-200" />
          )}
        </div>
      </div>

      {isItemOpen && item.submenus && item.submenus.length > 0 && (
        <ul className="space-y-1 mt-1 ml-4">
          {item.submenus.map((sub, subIndex) => (
            <SidebarMenuItems
              key={subIndex}
              item={sub}
              isActive={sub.path === window.location.pathname}
              isOpen={isOpen}
              toggleSubmenu={toggleSubmenu}
              level={level + 1}
            />
          ))}
        </ul>
      )}

      {isItemOpen && (!item.submenus || item.submenus.length === 0) && (
        <SidebarMenuItem
          item={item}
          isActive={isActive}
          isOpen={isOpen}
          toggleSubmenu={toggleSubmenu}
          level={level}
        />
      )}
    </div>
  );
};

export default SidebarMenuItems;
