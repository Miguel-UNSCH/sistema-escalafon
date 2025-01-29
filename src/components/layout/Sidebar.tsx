<<<<<<< HEAD
import { LuDot } from "react-icons/lu";
import UserInfo from "../cards/UserInfo";
import { ImStatsDots } from "react-icons/im";
=======
import { MenuItem } from "@/interfaces/MenuItem";
import UserInfo from "../cards/UserInfo";
import {
  FaTachometerAlt,
  FaFileAlt,
} from "react-icons/fa";
import SidebarMenuGroup from "../menus/SidebarMenuGroup";
>>>>>>> origin/main

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
}

<<<<<<< HEAD
const Navigation = () => {
  // const items: string[] = [
  //   "navigation",
  //   "widget",
  //   "admin panel",
  //   "ui components",
  //   "forms",
  //   "panels",
  //   "chart & maps",
  //   "application",
  //   "pages",
  //   "other",
  // ];
  const items = [
    {
      title: "navigation",
      options: [
        {
          icon: <ImStatsDots />,
          title: "dashboard",
          subOptions: ["default", "analytics", "finance"],
        },
        {
          icon: <LuDot />,
          title: "layouts",
          subOptions: ["vertical", "horizontal", "layouts 2", "compact", "tab"],
        },
      ],
    },
    {
      title: "widget",
      options: [
        {
          icon: "",
          title: "statistics",
        },
        {
          icon: "",
          title: "data",
        },
        {
          icon: "",
          title: "chart",
        },
      ],
    },
  ];
  return (
    <div className="flex flex-col">
      {items.map((i) => (
        <div key={i.title} className="flex flex-col">
          <p className="py-1 font-bold text-text-primary text-xs uppercase">
            {i.title}
          </p>
          {i.options.map(({ icon, title }) => (
            <div
              className="flex flex-row items-center gap-2 text-[#898C90]"
              key={title}
            >
              {icon}
              <span className="">{title}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

=======
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
>>>>>>> origin/main
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
<<<<<<< HEAD
          <Navigation />
=======
          <SidebarMenuGroup title="INICIO" items={navigationItems} />
>>>>>>> origin/main
        </div>
      </aside>
    </>
  );
}
