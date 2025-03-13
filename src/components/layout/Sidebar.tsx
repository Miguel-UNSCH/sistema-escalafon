import { useState } from "react";
import SidebarMenuGroup from "../menus/SidebarMenuGroup";
import Link from "next/link";
import { navigationItems } from "@/utils/navigation-items";
import Image from "next/image";
import logo from "@/assets/logo_gobierno_regional_claro.webp";
import { Session } from "next-auth";

export const Sidebar = ({ isOpen, isMobile, session }: { isOpen: boolean; isMobile: boolean; onClose: () => void; session: Session | null }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <>
      {isOpen && isMobile && <div className="top-0 left-0 z-40 absolute bg-black/30 backdrop-blur-xs w-full h-full"></div>}
      <aside
        className={`
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        ${isMobile ? "fixed" : "absolute"}
        inset-y-0 left-0 z-50 border-r border-crust border-dashed 
        w-80 bg-base text-text transition-transform duration-300 ease-in-out h-full
      `}
      >
        <div className="flex flex-col gap-6 py-4 pl-4 w-full h-full">
          <div className="relative mr-4">
            <Link href={"/"} className="flex flex-row items-center gap-2 bg-red px-2 rounded-md">
              <Image
                src={logo}
                alt="gobierno regional de ayacucho"
                // width={500} automatically provided
                // height={500} automatically provided
                // blurDataURL="data:..." automatically provided
                // placeholder="blur" // Optional blur-up while loading
              />
            </Link>
          </div>

          <div className={`pr-2 h-full overflow-y-auto mb-5`}>
            {navigationItems.map((group, idx) => (
              <SidebarMenuGroup key={idx} title={group.title} adm={group.adm} items={group.menuItem} openMenu={openMenu} setOpenMenu={setOpenMenu} session={session} />
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};
