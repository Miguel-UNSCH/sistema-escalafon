import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { MenuItem } from "@/interfaces/MenuItem";
import { GoDotFill } from "react-icons/go";
import { usePathname } from "next/navigation";

interface SidebarMenuGroupProps {
  title: string;
  items: MenuItem[];
}

const SidebarMenuGroup: React.FC<SidebarMenuGroupProps> = ({
  title,
  items,
}) => {
  return (
    <nav className="mt-4">
      <h2 className="px-4 text-xs font-semibold text-text-section-title uppercase tracking-wide">
        {title}
      </h2>

      <ul className="mt-2 space-y-1">
        {items.map((item, idx) => (
          <SidebarMenuItem key={idx} item={item} />
        ))}
      </ul>
    </nav>
  );
};

export default SidebarMenuGroup;

const SidebarMenuItem: React.FC<{ item: MenuItem }> = ({ item }) => {
  const pathname = usePathname();

  const hasSubmenus = item.submenus && item.submenus.length > 0;
  const isActive = item.path === pathname; 
  const isSubmenuActive = item.submenus?.some((sub) => sub.path === pathname) ?? false;
  const [isOpen, setIsOpen] = useState(isSubmenuActive);

  useEffect(() => {
    if (isSubmenuActive) {
      setIsOpen(true);
    }
  }, [isSubmenuActive]);

  const toggleSubmenu = () => {
    if (hasSubmenus) {
      setIsOpen(!isOpen);
    }
  };

  const parentItemClasses = `
    flex items-center justify-between px-6 py-4 font-medium cursor-pointer text-sm rounded-lg
    ${
      isActive || isSubmenuActive
        ? "bg-link-hover text-link-main" // <-- Estilo "activo"
        : "text-text-link hover:bg-link-hover" // <-- Estilo normal + hover
    }
  `;

  return (
    <li>
      {hasSubmenus ? (
        <>
          {/* Item padre con submenús */}
          <div onClick={toggleSubmenu} className={parentItemClasses}>
            <div className="flex items-center gap-4">
              {item.icon && <span>{item.icon}</span>}
              <span className="text-sm">{item.label}</span>
            </div>

            <div className="flex items-center space-x-2">
              {/* Badge opcional */}
              {item.badge && (
                <span className="inline-block text-xs bg-link-main text-white px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              {/* Icono de despliegue */}
              {isOpen ? (
                <FaChevronDown size={10} className="transition-all duration-200" />
              ) : (
                <FaChevronRight size={10} className="transition-all duration-200" />
              )}
            </div>
          </div>

          {/* Submenús (dropdown) */}
          {isOpen && (
            <ul className="mt-1 ml-4 space-y-1">
              {item.submenus!.map((sub, subIndex) => {
                // Determinar si este submenú está activo
                const isSubItemActive = sub.path === pathname;

                // Clases para submenú activo
                const subItemClasses = `
                  group flex items-center px-4 py-2 text-sm font-medium rounded-lg
                  ${
                    isSubItemActive
                      ? "text-link-main" // <-- estilo para submenú activo
                      : "text-text-link hover:bg-link-hover"
                  }
                `;

                return (
                  <li key={subIndex}>
                    <Link href={sub.path || "#"} className={subItemClasses}>
                      <span className="flex items-center mr-2 group-hover:text-link-main">
                        <GoDotFill className="inline-block text-xs" />
                      </span>
                      {sub.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      ) : (
        // Si NO tiene submenús => es un Link directo
        // Clases condicionales para items sin submenú
        <Link
          href={item.path || "#"}
          className={`
            flex items-center justify-between px-6 py-4 font-medium text-sm rounded-lg
            ${
              isActive
                ? "bg-link-hover text-text-link"
                : "text-text-link hover:bg-link-hover"
            }
          `}
        >
          <div className="flex items-center gap-4">
            {item.icon && <span>{item.icon}</span>}
            <span>{item.label}</span>
          </div>
          {item.badge && (
            <span className="inline-block text-xs bg-link-main text-white px-2 py-0.5 rounded-full">
              {item.badge}
            </span>
          )}
        </Link>
      )}
    </li>
  );
};
