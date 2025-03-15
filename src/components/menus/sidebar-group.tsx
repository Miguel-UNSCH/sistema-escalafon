import { MenuItem } from "@/interfaces";
import { Session } from "next-auth";
import { SidebarMenuItem } from "./sidebar-item";

export const SidebarMenuGroup: React.FC<SidebarMenuGroupProps> = ({ title, parentPath, adm = false, items, openMenu, setOpenMenu, session }) => {
  if (!session) return <p className="px-6 py-2 text-text text-sm">Cargando menú...</p>;

  const shouldRender = adm === true ? session.user.role === "admin" : true;
  if (!shouldRender) return null;

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
  adm?: boolean;
  items: MenuItem[];
  openMenu: string | null;
  setOpenMenu: (menu: string | null) => void;
  session: Session | null;
}
