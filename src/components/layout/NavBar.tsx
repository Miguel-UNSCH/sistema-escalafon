import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { ThemeToggle } from "../theme-toogle";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <nav className="sticky top-0 left-0 right-0 z-50 shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center">
        <button onClick={onMenuClick} className="mr-4">
          <HiOutlineMenuAlt1 className="h-6 w-6 text-[#5B6B79] dark:text-[#6F747F]" />
        </button>
      </div>
      <div>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
