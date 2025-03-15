import Link from "next/link";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, Dot } from "lucide-react";

import { MenuItem } from "@/interfaces";
import { Session } from "next-auth";

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ item, parentPath, openMenu, setOpenMenu, session }) => {
  const router = useRouter();
  const pathname = usePathname();
  const hasSubmenus = item.submenus && item.submenus.length > 0;
  const fullPath = `${parentPath}${item.path}`;
  const isActive = fullPath === pathname;
  const isSubmenuActive = item.submenus?.some((sub) => `${fullPath}${sub.path}` === pathname) ?? false;
  const isOpen = openMenu === item.label;

  useEffect(() => {
    if (isSubmenuActive) setOpenMenu(item.label);
  }, [isSubmenuActive, item.label, setOpenMenu]);

  if (!session) return <p className="px-6 py-2 text-subtext1 text-sm">Cargando menú...</p>;

  const shouldRender = item.adm === true ? session.user.role === "admin" : true;
  if (!shouldRender) return null;

  const toggleSubmenu = () => {
    setOpenMenu(isOpen ? null : item.label);
    if (item.path) router.push(fullPath);
  };

  const parentItemClasses = `
    flex items-center justify-between px-6 py-4 font-medium cursor-pointer text-sm rounded-lg
    ${isActive || isSubmenuActive ? "bg-maroon text-base" : "text-mauve hover:text-red"}
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
            <ChevronRight size={16} className={`transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"}`} />
          </div>

          <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${isOpen ? "max-h-[500px]" : "max-h-0"}`}>
            <ul className="space-y-1 mt-1 ml-4">
              {item.submenus!.map((sub, subIndex) => {
                const subFullPath = `${fullPath}${sub.path}`;
                const isSubItemActive = subFullPath === pathname;
                return (
                  <li key={subIndex}>
                    <Link
                      href={subFullPath}
                      className={`group flex items-center px-4 py-2 text-sm font-medium rounded-lg ${isSubItemActive ? "text-red" : "text-subtext1 hover:text-maroon"}`}
                    >
                      <Dot size={24} />
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
          href={fullPath || "#"}
          className={`flex items-center justify-between px-6 py-4 font-medium text-sm rounded-lg
            ${isActive ? "bg-maroon text-base" : "text-subtext1 hover:text-maroon"}`}
        >
          <div className="flex items-center gap-4 overflow-hidden">
            {item.icon && <span>{item.icon}</span>}
            <span className="capitalize text-nowrap">{item.label}</span>
          </div>
        </Link>
      )}
    </li>
  );
};

interface SidebarMenuItemProps {
  item: MenuItem;
  parentPath: string;
  openMenu: string | null;
  setOpenMenu: (menu: string | null) => void;
  session: Session | null;
}
