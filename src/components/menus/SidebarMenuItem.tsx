import React from "react";
import Link from "next/link";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { MenuItem } from "@/interfaces/MenuItem";

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
  isOpen,
  toggleSubmenu,
  level,
}) => {
  const icon = level === 0 ? item.icon : <LuDot />;

  const isItemOpen =
    isOpen.nv === level && isOpen.key === item.path && isOpen.value;

  return (
    <li>
      {item.submenus?.length ? (
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
              {icon && <span>{icon}</span>}
              <span className="text-sm capitalize">{item.label}</span>
            </div>
            <div className="flex items-center space-x-2">
              {item.badge && item.badge !== 0 && (
                <span className="inline-block bg-link-main px-2 p-1 rounded-full text-white text-xs">
                  {item.badge}
                </span>
              )}
              {isItemOpen ? (
                <FaChevronDown
                  size={10}
                  className="transition-all duration-200"
                />
              ) : (
                <FaChevronRight
                  size={10}
                  className="transition-all duration-200"
                />
              )}
            </div>
          </div>
          {isItemOpen && (
            <ul className="space-y-1 mt-1 ml-4">
              {item.submenus.map((sub, subIndex) => (
                <SidebarMenuItem
                  key={subIndex}
                  item={sub}
                  isActive={sub.path === window.location.pathname}
                  isOpen={isOpen}
                  toggleSubmenu={() => toggleSubmenu()}
                  level={level + 1}
                />
              ))}
            </ul>
          )}
        </div>
      ) : (
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
          {item.badge && (
            <span className="inline-block bg-link-main px-2 py-0.5 rounded-full text-white text-xs">
              {item.badge}
            </span>
          )}
        </Link>
      )}
    </li>
  );
};

export default SidebarMenuItem;
