import Link from "next/link";
import { HiClock, HiViewGrid } from "react-icons/hi";

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, isMobile, onClose }: SidebarProps) {
  const itemsMenu = {
    report: { name: "reportes", options: ["ver historial", "generar"] },
  };
  return (
    <aside
      className={`
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        ${isMobile ? "fixed" : "absolute"}
        inset-y-0 left-0 z-50 border-r-2 border-[#242d39]
        w-64 bg-ctp-base text-white transition-transform duration-300 ease-in-out
      `}
    >
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                href={"#"}
                className="w-full flex items-center p-2 rounded-md hover:bg-gray-700"
              >
                <HiViewGrid className="mr-2 h-4 w-4" />
                <span>Panel</span>
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                className="w-full flex items-center p-2 rounded-md hover:bg-gray-700"
              >
                <span className="text-base font-bold uppercase text-ctp-text">
                  {itemsMenu.report.name}
                </span>
              </Link>
              <ul className="space-y-2 px-2">
                {itemsMenu.report.options.map((option, index) => (
                  <li key={index}>
                    <Link
                      href={"#"}
                      className="w-full flex items-center gap-1 py-1 rounded-md hover:bg-gray-700"
                    >
                      <HiClock className="" />
                      <span className="text-sm text-ctp-subtext0">
                        {option}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
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
  );
}
