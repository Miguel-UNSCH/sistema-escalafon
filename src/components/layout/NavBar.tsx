import { ThemeToggle } from "../theme-toogle";
import { FiMenu } from "react-icons/fi";
import { RiSearch2Line } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import UserCard from "../cards/UserCard";

interface NavbarProps {
  isSidebarOpen: boolean;
  isMobile: boolean;
  onMenuClick: () => void;
}

export default function Navbar({ isSidebarOpen, isMobile, onMenuClick }: NavbarProps) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-30 py-4 px-8 flex items-center justify-between bg-bg-primary/80 backdrop-blur-md transition-all duration-300 ease-in-out ${
      isSidebarOpen && !isMobile ? "md:ml-72" : ""
    }`}>
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="mr-4 hover:bg-icon-hover p-2 rounded-md transition-all duration-100"
        >
          <FiMenu className="h-6 w-6 text-icon-main" />
        </button>

        <form className="max-w-md mx-auto hidden sm:block">
          <label className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <RiSearch2Line className="text-lg text-icon-main" />
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-3 pl-10 bg-bg-card text-sm text-text-primary border-none ring-1 rounded-lg ring-border-primary focus:ring-border-focus transition-all duration-250"
              placeholder="Search..."
              required
            />
          </div>
        </form>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="hover:bg-icon-hover p-2 rounded-md transition-all duration-100"
          >
            <IoSettings className="h-5 w-5 text-icon-main" />
          </button>
          <button
            className="hover:bg-icon-hover p-2 rounded-md transition-all duration-100"
          >
            <FaBell className="h-5 w-5 text-icon-main" />
          </button>
        </div>
        <UserCard />
      </div>
    </nav>
  );
}
