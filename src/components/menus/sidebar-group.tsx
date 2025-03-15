import { Session } from "next-auth";
import { MenuItem } from "@/interfaces";
import { admin_routes } from "@/utils/other";
import { SidebarMenuItem } from "./sidebar-item";

export const SidebarMenuGroup: React.FC<SidebarMenuGroupProps> = ({ title, parentPath, items, openMenu, setOpenMenu, session }) => {
  if (!session) return <p className="px-6 py-2 text-text text-sm">Cargando menú...</p>;

  const isAdminRoute = (path: string) => admin_routes.some((route) => path.startsWith(route));

  const filteredItems = items.filter((item) => {
    const fullPath = `${parentPath}${item.path}`;
    return session?.user.role === "admin" || !isAdminRoute(fullPath);
  });

  if (filteredItems.length === 0) return null;

  return (
    <nav className="mt-4">
      <h2 className="px-4 font-semibold text-text text-xs uppercase tracking-wide">{title}</h2>
      <ul className="space-y-1 mt-2">
        {items.map((item, idx) => (
          <SidebarMenuItem key={idx} item={item} parentPath={parentPath} openMenu={openMenu} setOpenMenu={setOpenMenu} session={session} />
        ))}
      </ul>
    </nav>
  );
};

interface SidebarMenuGroupProps {
  title: string;
  parentPath: string;
  items: MenuItem[];
  openMenu: string | null;
  setOpenMenu: (menu: string | null) => void;
  session: Session | null;
}
