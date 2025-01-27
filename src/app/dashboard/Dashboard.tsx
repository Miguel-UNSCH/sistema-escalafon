"use client"

import Navbar from "@/components/layout/NavBar"
import Sidebar from "@/components/layout/Sidebar"
import { useState, useEffect } from "react"

import { ReactNode } from "react";

export default function Dashboard({children}: {children: ReactNode}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="flex h-screen overflow-hidden relative">
      <Sidebar isOpen={isSidebarOpen} isMobile={isMobile} onClose={toggleSidebar} />
      <div
        className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ease-in-out ${isSidebarOpen && !isMobile ? "md:ml-64" : ""}`}
      >
        <Navbar onMenuClick={toggleSidebar} />
        <main
          className={`flex-1 overflow-x-hidden overflow-y-auto p-4 transition-all duration-300 ease-in-out`}
        >
          {children}
        </main>
      </div>
      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar}></div>
      )}
    </div>
  )
}

