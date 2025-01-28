import { HiOutlineMenuAlt1, HiOutlineSearch } from "react-icons/hi";
import { ThemeToggle } from "../theme-toogle";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <nav className="shadow-md p-4 text-ctp-text">
      <div className="flex items-center justify-between">
        <div className="flex flex-row ">
          <button
            onClick={onMenuClick}
            className="mr-4 border-2 border-transparent hover:border-blue-400 rounded-full p-2"
          >
            <HiOutlineMenuAlt1 className="h-6 w-6" />
          </button>
          <div className="bg-white dark:bg-[#263240] rounded-lg items-center justify-center flex px-2 gap-1">
            <HiOutlineSearch />
            <input
              type="text"
              placeholder="buscar ..."
              className="outline-none border-none rounded-lg bg-transparent placeholder:italic"
            />
          </div>
        </div>

        <ThemeToggle />
      </div>
    </nav>
  );
}
