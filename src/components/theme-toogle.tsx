"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { PiSunDimFill } from "react-icons/pi";
import { IoMdMoon } from "react-icons/io";
import { FcSettings } from "react-icons/fc";

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 hover:bg-icon-hover p-2 rounded-md focus:outline-none text-icon-main transition-all duration-100"
        onClick={toggleDropdown}
      >
        <PiSunDimFill className="w-6 h-6 rotate-0 dark:-rotate-90 scale-100 dark:scale-0 transition-all" />
        <IoMdMoon className="absolute w-6 h-6 rotate-90 dark:rotate-0 scale-0 dark:scale-100 transition-all" />
      </button>

      {isDropdownOpen && (
        <div className="top-12 right-8 absolute bg-bg-dropdown shadow-xl p-2 rounded-xl w-48 overflow-hidden" ref={dropdownRef}>
          <button
            className="flex items-center gap-2 hover:bg-icon-hover px-3 py-2 rounded-md w-full font-medium text-text-secondary text-sm text-left transition-all duration-100"
            onClick={() => {
              setTheme("light");
              setIsDropdownOpen(false);
            }}
          >
            <PiSunDimFill className="w-4 h-4 text-icon-main" /> Claro
          </button>
          <button
            className="flex items-center gap-2 hover:bg-icon-hover px-3 py-2 rounded-md w-full font-medium text-text-secondary text-sm text-left transition-all duration-100"
            onClick={() => {
              setTheme("dark");
              setIsDropdownOpen(false);
            }}
          >
            <IoMdMoon className="w-4 h-4 text-icon-main" /> Oscuro
          </button>
          <button
            className="flex items-center gap-2 hover:bg-icon-hover px-3 py-2 rounded-md w-full font-medium text-text-secondary text-sm text-left transition-all duration-100"
            onClick={() => {
              setTheme("system");
              setIsDropdownOpen(false);
            }}
          >
            <FcSettings className="w-4 h-4 text-icon-main" /> Predeterminado
          </button>
        </div>
      )}
    </div>
  );
}
