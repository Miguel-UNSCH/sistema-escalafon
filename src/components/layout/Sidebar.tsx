import UserInfo from "../cards/UserInfo";

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
}

const Navigation = () => {
  const items: string[] = [
    "navigation",
    "widget",
    "admin panel",
    "ui components",
    "forms",
    "panels",
    "chart & maps",
    "application",
    "pages",
    "other",
  ];
  return (
    <div className="flex flex-col">
      {items.map((i) => (
        <p key={i} className="py-1 font-bold text-xs uppercase">
          {i}
        </p>
      ))}
    </div>
  );
};

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
          <Navigation />
        </div>
      </aside>
    </>
  );
}
