import { useState } from "react";
import SidebarMenuGroup from "../menus/SidebarMenuGroup";
import { navigationItems } from "@/utils/navigation-items";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo_gobierno_regional_claro.webp";

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
}
export default function Sidebar({ isOpen, isMobile }: SidebarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <>
      {isOpen && isMobile && <div className="top-0 left-0 z-40 absolute bg-black/30 backdrop-blur-sm w-full h-full"></div>}
      <aside
        className={`
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        ${isMobile ? "fixed" : "absolute"}
        inset-y-0 left-0 z-50 border-r border-border-primary border-dashed
        w-1/6 bg-[#e6e9ef] text-text-primary transition-transform duration-300 ease-in-out h-full
      `}
      >
        <div className="flex flex-col gap-6 py-4 pl-4 w-full h-full">
          <div className="relative mr-4">
            <Link href={"/"} className="flex flex-row items-center gap-2 bg-[#d20f39] px-2 rounded-md">
              <Image src={logo} alt="Logo Gobierno Regional" className="" width={200} height={100} priority />
            </Link>
          </div>

          <div className={`pr-2 h-full overflow-y-auto`}>
            {navigationItems.map((group, idx) => (
              <SidebarMenuGroup key={idx} title={group.title} adm={group.adm} items={group.menuItem} openMenu={openMenu} setOpenMenu={setOpenMenu} />
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
