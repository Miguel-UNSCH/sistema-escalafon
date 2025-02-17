"use client";

import Navbar from "@/components/layout/NavBar";
import Sidebar from "@/components/layout/Sidebar";
import { useState, useEffect } from "react";

import { ReactNode } from "react";

export default function Dashboard({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative flex bg-[#eff1f5] h-screen overflow-hidden font-poppins">
      <Sidebar isOpen={isSidebarOpen} isMobile={isMobile} onClose={toggleSidebar} />
      <div
        className={`relative flex flex-col flex-1 overflow-hidden transition-all duration-300 ease-in-out ${
          isSidebarOpen && !isMobile ? "md:ml-72" : ""
        }`}
      >
        <Navbar onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} isMobile={isMobile} />
        <main className={`flex-1 overflow-x-hidden overflow-y-auto py-4 px-8 transition-all duration-300 ease-in-out pt-20`}>{children}</main>
      </div>
      {isMobile && isSidebarOpen && <div className="z-40 fixed inset-0 bg-[#e6e9ef] bg-opacity-50" onClick={toggleSidebar}></div>}
    </div>
  );
}
