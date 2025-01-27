import { HiOutlineMenuAlt1 } from "react-icons/hi";

interface NavbarProps {
  onMenuClick: () => void
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <nav className="shadow-md p-4 text-ctp-text">
      <div className="flex items-center">
        <button onClick={onMenuClick} className="mr-4 hover:bg-slate-100 rounded-full p-1">
          <HiOutlineMenuAlt1 className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold">My Dashboard</h1>
      </div>
    </nav>
  )
}