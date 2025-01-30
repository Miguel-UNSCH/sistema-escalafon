import React, { useEffect } from "react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { MenuItem } from "@/interfaces/MenuItem";
import { GoDotFill } from "react-icons/go";
import { usePathname } from "next/navigation";

interface SidebarMenuGroupProps {
  title: string;
  items: MenuItem[];
  openMenu: string | null;
  setOpenMenu: (menu: string | null) => void;
}

const SidebarMenuGroup: React.FC<SidebarMenuGroupProps> = ({ title, items, openMenu, setOpenMenu }) => {
  return (
    <nav className="mt-4">
      <h2 className="px-4 text-xs font-semibold text-text-section-title uppercase tracking-wide">
        {title}
      </h2>
      <ul className="mt-2 space-y-1">
        {items.map((item, idx) => (
          <SidebarMenuItem key={idx} item={item} openMenu={openMenu} setOpenMenu={setOpenMenu} />
        ))}
      </ul>
    </nav>
  );
};

export default SidebarMenuGroup;

const SidebarMenuItem: React.FC<{ item: MenuItem; openMenu: string | null; setOpenMenu: (menu: string | null) => void }> = ({ item, openMenu, setOpenMenu }) => {
  const pathname = usePathname();
  const hasSubmenus = item.submenus && item.submenus.length > 0;
  const isActive = item.path === pathname;
  const isSubmenuActive = item.submenus?.some((sub) => sub.path === pathname) ?? false;
  const isOpen = openMenu === item.label;

  useEffect(() => {
    if (isSubmenuActive) {
      setOpenMenu(item.label);
    }
  }, [isSubmenuActive, item.label, setOpenMenu]);

  const toggleSubmenu = () => {
    setOpenMenu(isOpen ? null : item.label);
  };

  const parentItemClasses = `
    flex items-center justify-between px-6 py-4 font-medium cursor-pointer text-sm rounded-lg
    ${
      isActive || isSubmenuActive
        ? "bg-link-active text-link-main"
        : "text-text-link hover:bg-link-hover"
    }
  `;

  return (
    <li>
      {hasSubmenus ? (
        <>
          <div onClick={toggleSubmenu} className={parentItemClasses}>
            <div className="flex items-center gap-4">
              {item.icon && <span>{item.icon}</span>}
              <span className="text-sm">{item.label}</span>
            </div>
            <div className="flex items-center space-x-2">
              {item.badge && (
                <span className="inline-block text-xs bg-link-main text-white px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              <FaChevronRight size={10} className={`transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"}`} />
            </div>
          </div>
          <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${isOpen ? "max-h-[500px]" : "max-h-0"}`}>
            <ul className="mt-1 ml-4 space-y-1">
              {item.submenus!.map((sub, subIndex) => {
                const isSubItemActive = sub.path === pathname;
                const subItemClasses = `
                  group flex items-center px-4 py-2 text-sm font-medium rounded-lg
                  ${
                    isSubItemActive
                      ? "text-link-main"
                      : "text-text-link hover:bg-link-hover"
                  }
                `;
                return (
                  <li key={subIndex}>
                    <Link href={sub.path || "#"} className={subItemClasses}>
                      <span className="flex items-center mr-2 group-hover:text-link-main">
                        <GoDotFill className="inline-block text-xs" />
                      </span>
                      {sub.label}
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
            ${
              isActive
                ? "bg-link-active text-text-main"
                : "text-text-link hover:bg-link-hover"
            }
          `}
        >
          <div className="flex items-center gap-4">
            {item.icon && <span>{item.icon}</span>}
            <span>{item.label}</span>
          </div>
          {item.badge && (
            <span className="inline-block text-xs bg-link-main text-white px-2 py-0.5 rounded-full">
              {item.badge}
            </span>
          )}
        </Link>
      )}
    </li>
  );
};
