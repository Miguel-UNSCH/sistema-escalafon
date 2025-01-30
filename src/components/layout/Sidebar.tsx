import { useState } from "react";
import UserInfo from "../cards/UserInfo";
import SidebarMenuGroup from "../menus/SidebarMenuGroup";
import { navigationItems } from "@/utils/navigation-items";

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
}
export default function Sidebar({ isOpen, isMobile }: SidebarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  return (
    <>
      {isOpen && isMobile && (
        <div className="absolute bg-black/30 backdrop-blur-sm top-0 left-0 w-full h-full z-40"></div>
      )}
      <aside
        className={`
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        ${isMobile ? "fixed" : "absolute"}
        inset-y-0 left-0 z-50 border-r border-border-primary border-dashed
        w-72 bg-bg-primary text-text-primary transition-transform duration-300 ease-in-out h-full
      `}
      >
        <div className="py-4 pl-4 gap-6 h-full flex flex-col w-full">
          <div className="relative mr-4">
            <h1 className="text-xl font-bold text-text-primary">WorkTrace</h1>
            <span className="absolute top-0 left-28 py-1 px-2 text-button-confirm bg-green-700/15 rounded-full text-xs font-medium">
              v1.0.0
            </span>
          </div>
          <UserInfo />
          <div className="overflow-y-auto h-full pr-2">
            {navigationItems.map((group, idx) => (
              <SidebarMenuGroup
                key={idx}
                title={group.title}
                items={group.menuItem}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
              />
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
