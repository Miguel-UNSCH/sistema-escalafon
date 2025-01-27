import Link from "next/link";
import { FaChartBar } from "react-icons/fa6";

interface SidebarProps {
  isOpen: boolean
  isMobile: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, isMobile, onClose }: SidebarProps) {
  return (
    <aside
      className={`
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        ${isMobile ? "fixed" : "absolute"}
        inset-y-0 left-0 z-50
        w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out
      `}
    >
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link href={'#'} className="w-full flex items-center p-2 rounded-md hover:bg-gray-700">
                <FaChartBar className="mr-2 h-4 w-4" />
                <span>Panel</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {isMobile && (
        <button className="absolute top-2 right-2" onClick={onClose}>
          X
        </button>
      )}
    </aside>
  )
}

