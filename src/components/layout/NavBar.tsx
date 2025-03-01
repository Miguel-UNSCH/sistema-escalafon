import { RiSearch2Line } from "react-icons/ri";
import { AlignJustify, Bell } from "lucide-react";
import { ThemeToggle } from "../theme-toogle";
import UserCard from "../cards/UserCard";

interface NavbarProps {
  isSidebarOpen: boolean;
  isMobile: boolean;
  onMenuClick: () => void;
}

const Navbar = ({ isSidebarOpen, isMobile, onMenuClick }: NavbarProps) => {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-30 py-4 px-8 flex items-center justify-between bg-bg-primary/80 backdrop-blur-md transition-all duration-300 ease-in-out ${
        isSidebarOpen && !isMobile ? "md:ml-72" : ""
      }`}
    >
      <div className="flex items-center">
        <button onClick={onMenuClick} className="hover:bg-icon-hover mr-4 p-2 rounded-md transition-all duration-100">
          <AlignJustify strokeWidth={1.75} className="text-red" size={26} />
        </button>

        <form className="hidden sm:block mx-auto max-w-md">
          <label className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 flex items-center ps-3 pointer-events-none start-0">
              <RiSearch2Line className="text-red text-lg" />
            </div>
            <input
              type="search"
              id="default-search"
              className="block bg-mantle p-3 pl-10 border-none rounded-lg ring-1 ring-maroon focus:ring-red w-full text-text text-sm transition-all duration-250"
              placeholder="Search..."
              required
            />
          </div>
        </form>
      </div>

      <div className="flex flex-row items-center gap-4">
        <ThemeToggle />

        <div className="hover:bg-mantle p-2 rounded-full">
          <Bell size={26} className="rounded-full text-red" />
        </div>
        <UserCard />
      </div>
    </nav>
  );
};
export default Navbar;
