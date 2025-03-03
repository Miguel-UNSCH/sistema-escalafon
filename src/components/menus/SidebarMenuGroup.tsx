import Link from "next/link";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ChevronRight, Dot } from "lucide-react";

import { MenuItem } from "@/interfaces/MenuItem";

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ item, openMenu, setOpenMenu }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const hasSubmenus = item.submenus && item.submenus.length > 0;
  const isActive = item.path === pathname;
  const isSubmenuActive = item.submenus?.some((sub) => sub.path === pathname) ?? false;
  const isOpen = openMenu === item.label;

  useEffect(() => {
    if (isSubmenuActive) setOpenMenu(item.label);
  }, [isSubmenuActive, item.label, setOpenMenu]);

  if (status === "loading") return <p className="px-6 py-2 text-subtext1 text-sm">Cargando menú...</p>;

  const shouldRender = item.adm === true ? session?.user?.role === "ADMIN" : true;
  if (!shouldRender) return null;

  const toggleSubmenu = () => setOpenMenu(isOpen ? null : item.label);

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
            <div className="flex items-center space-x-2">
              <ChevronRight size={16} className={`transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"}`} />
            </div>
          </div>

          <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${isOpen ? "max-h-[500px]" : "max-h-0"}`}>
            <ul className="space-y-1 mt-1 ml-4">
              {item.submenus!.map((sub, subIndex) => {
                const isSubItemActive = sub.path === pathname;
                const subItemClasses = `
                  group flex items-center px-4 py-2 text-sm font-medium rounded-lg
                  ${isSubItemActive ? "text-red" : "text-subtext1 hover:text-maroon"}
                `;
                return (
                  <li key={subIndex}>
                    <Link href={sub.path || "#"} className={subItemClasses}>
                      <span className="flex items-center">
                        <Dot size={24} />
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
  openMenu: string | null;
  setOpenMenu: (menu: string | null) => void;
}

const SidebarMenuGroup: React.FC<SidebarMenuGroupProps> = ({ title, adm, items, openMenu, setOpenMenu }) => {
  const { data: session, status } = useSession();

  if (status === "loading") return <p className="px-6 py-2 text-text text-sm">Cargando menú...</p>;

  const shouldRender = adm === true ? session?.user?.role === "ADMIN" : true;
  if (!shouldRender) return null;

  return (
    <nav className="mt-4">
      <h2 className="px-4 font-semibold text-text text-xs uppercase tracking-wide">{title}</h2>
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
