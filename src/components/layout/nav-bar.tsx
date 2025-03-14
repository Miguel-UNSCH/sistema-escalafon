"use client";

import { AlignJustify, ChevronLeft, ChevronRight, House, Search, UserRound } from "lucide-react";
import { ThemeToggle } from "../theme-provider";
import { LogOutBtn } from "../log-out";
import { Session } from "next-auth";
import { Breadcrumbs } from "./breadcrumb";

interface NavbarProps {
  isSidebarOpen: boolean;
  isMobile: boolean;
  onMenuClick: () => void;
  session: Session | null;
}

export const Navbar = ({ isSidebarOpen, isMobile, onMenuClick, session }: NavbarProps) => {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-30 py-4 px-8 flex items-center justify-between bg-bg-primary/80 backdrop-blur-md transition-all duration-300 ease-in-out ${
        isSidebarOpen && !isMobile ? "md:ml-72" : ""
      }`}
    >
      <div className="flex items-center">
        <button onClick={onMenuClick} className="hover:bg-mantle mr-4 ml-2 p-2 rounded-full transition-all duration-100">
          {isSidebarOpen ? <ChevronLeft strokeWidth={2} className="text-red" size={26} /> : <ChevronRight strokeWidth={1.75} className="text-red" size={26} />}
        </button>

        <Breadcrumbs />
      </div>

      <div className="flex flex-row items-center gap-4">
        <ThemeToggle />

        <div className="flex flex-row items-center gap-2 hover:bg-mantle p-2 rounded-full text-red">
          {session?.user ? <p className="font-primary font-semibold">{session.user.name?.toUpperCase()}</p> : <p>Invitado</p>}
          <UserRound size={18} />
        </div>

        <div className="hover:bg-mantle p-2 rounded-full text-red">
          <LogOutBtn />
        </div>
      </div>
    </nav>
  );
};
