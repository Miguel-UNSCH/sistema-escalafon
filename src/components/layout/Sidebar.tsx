import { MenuItem } from "@/interfaces/MenuItem";
import UserInfo from "../cards/UserInfo";
import {
  FaTachometerAlt,
  FaFileAlt,
} from "react-icons/fa";
import SidebarMenuGroup from "../menus/SidebarMenuGroup";

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
}

const navigationItems: MenuItem[] = [
  {
    label: "Dashboard",
    icon: <FaTachometerAlt />,
    badge: "2",
    path: "/dashboard",
    submenus: [
      { label: "Default", path: "/dashboard/default" },
      { label: "Analytics", path: "/dashboard/analytics" },
      { label: "Finance", path: "/dashboard/finance" },
    ],
  },
  {
    label: "Layouts",
    icon: <FaFileAlt />,
    path: "/layouts",
    badge: "1"
  },
];
export default function Sidebar({ isOpen, isMobile }: SidebarProps) {
  return (
    <>
      {isOpen && isMobile && (
        <div className="absolute bg-black/30 backdrop-blur-sm top-0 left-0 w-full h-full z-40"></div>
      )}
      <aside
        className={`
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        ${isMobile ? "fixed" : "absolute"}
        inset-y-0 left-0 z-50 border-r border-border-primary border-dashed
        w-72 bg-bg-primary text-text-primary transition-transform duration-300 ease-in-out
      `}
      >
        <div className="p-6 space-y-6">
          <div className="relative">
            <h1 className="text-xl font-bold text-text-primary">WorkTrace</h1>
            <span className="absolute top-0 left-28 py-1 px-2 text-button-confirm bg-green-700/15 rounded-full text-xs font-medium">
              v1.0.0
            </span>
          </div>
          <UserInfo />
          <SidebarMenuGroup title="INICIO" items={navigationItems} />
        </div>
      </aside>
    </>
  );
}
