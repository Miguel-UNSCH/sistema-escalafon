"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { PiSunDimFill } from "react-icons/pi";
import { IoMdMoon } from "react-icons/io";
import { FcSettings } from "react-icons/fc";

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded-full px-3 py-2 focus:outline-none"
        onClick={toggleDropdown}
      >
        <PiSunDimFill className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <IoMdMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg">
          <button
            className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => {
              setTheme("light");
              setIsDropdownOpen(false);
            }}
          >
            <PiSunDimFill className="h-4 w-4" /> Light
          </button>
          <button
            className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => {
              setTheme("dark");
              setIsDropdownOpen(false);
            }}
          >
            <IoMdMoon className="h-4 w-4" /> Dark
          </button>
          <button
            className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => {
              setTheme("system");
              setIsDropdownOpen(false);
            }}
          >
            <FcSettings className="h-4 w-4" /> System
          </button>
        </div>
      )}
    </div>
  );
}
