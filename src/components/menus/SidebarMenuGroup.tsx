import React, { useEffect } from "react";
import Link from "next/link";
import { Dot } from "lucide-react";
import { usePathname } from "next/navigation";
import { FaChevronRight } from "react-icons/fa";

import { MenuItem } from "@/interfaces/MenuItem";
import { useAuth } from "@/hooks/useAuth";

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ item, openMenu, setOpenMenu }) => {
  const { session } = useAuth();
  const pathname = usePathname();
  const hasSubmenus = item.submenus && item.submenus.length > 0;
  const isActive = item.path === pathname;
  const isSubmenuActive = item.submenus?.some((sub) => sub.path === pathname) ?? false;
  const isOpen = openMenu === item.label;

  useEffect(() => {
    if (isSubmenuActive) setOpenMenu(item.label);
  }, [isSubmenuActive, item.label, setOpenMenu]);

  const shouldRender = item.adm === true ? session?.user?.role === "ADMIN" : true;
  if (!shouldRender) return null;

  const toggleSubmenu = () => {
    setOpenMenu(isOpen ? null : item.label);
  };

  const parentItemClasses = `
    flex items-center justify-between px-6 py-4 font-medium cursor-pointer text-sm rounded-lg
    ${isActive || isSubmenuActive ? "bg-[#e64553] bg-opacity-20 text-[#d20f39]" : "text-text-link hover:bg-link-hover"}
  `;

  return (
    <li>
      {hasSubmenus ? (
        <>
          <div onClick={toggleSubmenu} className={parentItemClasses}>
            <div className="flex items-center gap-4">
              {item.icon && <span>{item.icon}</span>}
              <span className="font-inter text-sm capitalize">{item.label}</span>
            </div>
            <div className="flex items-center space-x-2">
              {item.badge && <span className="inline-block bg-[#e64553] p-1 px-2 rounded-full text-white text-xs">{item.badge}</span>}
              <FaChevronRight size={10} className={`transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"}`} />
            </div>
          </div>

          <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${isOpen ? "max-h-[500px]" : "max-h-0"}`}>
            <ul className="space-y-1 mt-1 ml-4">
              {item.submenus!.map((sub, subIndex) => {
                const isSubItemActive = sub.path === pathname;
                const subItemClasses = `
                  group flex items-center px-4 py-2 text-sm font-medium rounded-lg
                  ${isSubItemActive ? "text-[#d20f39]" : "text-[#5c5f77] hover:text-[#e64553]"}
                `;
                return (
                  <li key={subIndex}>
                    <Link href={sub.path || "#"} className={subItemClasses}>
                      <span className="flex items-center">
                        <Dot className="" size={24} />
                      </span>
                      <p className="capitalize">{sub.label}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      ) : (
        <Link
          href={item.path || "#"}
          className={`
            flex items-center justify-between px-6 py-4 font-medium text-sm rounded-lg
            ${isActive ? "bg-[#e64553] bg-opacity-20 text-[#d20f39]" : "text-[#5c5f77] hover:text-[#e64553]"}
          `}
        >
          <div className="flex items-center gap-4 overflow-hidden">
            {item.icon && <span>{item.icon}</span>}
            <span className="capitalize text-nowrap">{item.label}</span>
          </div>
          {item.badge && <span className="inline-block bg-link-main px-2 py-0.5 rounded-full text-white text-xs">{item.badge}</span>}
        </Link>
      )}
    </li>
  );
};

interface SidebarMenuItemProps {
  item: MenuItem;
  openMenu: string | null;
  setOpenMenu: (menu: string | null) => void;
}

const SidebarMenuGroup: React.FC<SidebarMenuGroupProps> = ({ title, adm, items, openMenu, setOpenMenu }) => {
  const { session } = useAuth();

  const shouldRender = adm === true ? session?.user?.role === "ADMIN" : true;

  if (!shouldRender) return null;

  return (
    <nav className="mt-4">
      <h2 className="px-4 font-semibold text-[#4c4f69] text-xs uppercase tracking-wide">{title}</h2>
      <ul className="space-y-1 mt-2">
        {items.map((item, idx) => (
          <SidebarMenuItem key={idx} item={item} openMenu={openMenu} setOpenMenu={setOpenMenu} />
        ))}
      </ul>
    </nav>
  );
};

export default SidebarMenuGroup;

interface SidebarMenuGroupProps {
  title: string;
  adm?: boolean;
  items: MenuItem[];
  openMenu: string | null;
  setOpenMenu: (menu: string | null) => void;
}
