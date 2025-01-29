import UserInfo from "../cards/UserInfo";
import { MenuItem } from "@/interfaces/MenuItem";
import { FaTachometerAlt, FaFileAlt } from "react-icons/fa";
import SidebarMenuGroup from "../menus/SidebarMenuGroup";

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
}

const navigationItems: MenuItem[] = [
  {
    label: "test",
    icon: <FaTachometerAlt />,
    badge: 3,
    path: "/test",
    submenus: [
      {
        label: "subtest",
        path: "/test/subtest",
        badge: 2,
        submenus: [
          {
            label: "subsubtest",
            path: "/test/subtest/subsubtest",
            submenus: [
              { label: "subsubtest1", path: "/test/subtest/subsubtest1" },
              { label: "subsubtest2", path: "/test/subtest/subsubtest2" },
              { label: "subsubtest3", path: "/test/subtest/subsubtest3" },
            ],
          },
        ],
      },
    ],
  },
  /* 2 levels SidebarMenuItems */
  {
    label: "minted",
    icon: <FaTachometerAlt />,
    badge: 0,
    path: "/minted",
    submenus: [
      {
        label: "subitem",
        path: "/minted/subitem",
        submenus: [
          { label: "subsubitem1", path: "/minted/subitem/subsubitem1" },
          { label: "subsubitem2", path: "/minted/subitem/subsubitem2" },
          { label: "subsubitem3", path: "/minted/subitem/subsubitem3" },
        ],
      },
    ],
  },
  /* 1 levels SidebarMenuItems */
  {
    label: "widget",
    icon: <FaTachometerAlt />,
    badge: 0,
    path: "/widget",
    submenus: [
      { label: "default", path: "/widget/default" },
      { label: "analytics", path: "/widget/analytics" },
      { label: "finance", path: "/widget/finance" },
    ],
  },
  /* 0 levels -- SidebarMenuItem */
  { label: "chart", icon: <FaFileAlt />, badge: 0, path: "/widget/chart" },
];

export default function Sidebar({ isOpen, isMobile }: SidebarProps) {
  return (
    <>
      {isOpen && isMobile && (
        <div className="top-0 left-0 z-40 absolute bg-black/30 backdrop-blur-sm w-full h-full"></div>
      )}
      <aside
        className={`
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        ${isMobile ? "fixed" : "absolute"}
        inset-y-0 left-0 z-50 border-r border-border-primary border-dashed
        w-72 bg-bg-primary text-text-primary transition-transform duration-300 ease-in-out
      `}
      >
        <div className="space-y-6 p-6">
          <div className="relative">
            <h1 className="font-bold text-text-primary text-xl">WorkTrace</h1>
            <span className="top-0 left-28 absolute bg-green-700/15 px-2 py-1 rounded-full font-medium text-button-confirm text-xs">
              v1.0.0
            </span>
          </div>
          <UserInfo />
          <SidebarMenuGroup title="inicio" items={navigationItems} />
        </div>
      </aside>
    </>
  );
}
