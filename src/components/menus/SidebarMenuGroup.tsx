import React, { useState } from "react";
import Link from "next/link";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { MenuItem } from "@/interfaces/MenuItem";
import { usePathname } from "next/navigation";

interface SidebarMenuItemProps {
  item: MenuItem;
  isActive: boolean;
  isOpen: boolean;
  toggleSubmenu: () => void;
  level: number; // Añadimos un nivel para contar los niveles de submenú
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  item,
  isActive,
  isOpen,
  toggleSubmenu,
  level, // Recibimos el nivel
}) => {
  // Determinamos el ícono, si es el primer nivel se usa el ícono personalizado
  const icon = level === 0 ? item.icon : <LuDot />;

  return (
    <li>
      {item.submenus?.length ? (
        <div>
          <div
            onClick={toggleSubmenu}
            className={`flex items-center justify-between px-6 py-4 font-medium cursor-pointer text-sm rounded-lg ${
              isActive
                ? "bg-link-hover text-link-main"
                : "text-text-link hover:bg-link-hover"
            }`}
          >
            <div className="flex items-center gap-4">
              {icon && <span>{icon}</span>}
              <span className="text-sm capitalize">{item.label}</span>
            </div>
            <div className="flex items-center space-x-2">
              {item.badge && item.badge !== 0 && (
                <span className="inline-block bg-link-main px-2 p-1 rounded-full text-white text-xs">
                  {item.badge}
                </span>
              )}
              {isOpen ? (
                <FaChevronDown
                  size={10}
                  className="transition-all duration-200"
                />
              ) : (
                <FaChevronRight
                  size={10}
                  className="transition-all duration-200"
                />
              )}
            </div>
          </div>
          {isOpen && (
            <ul className="space-y-1 mt-1 ml-4">
              {item.submenus.map((sub, subIndex) => (
                <SidebarMenuItem
                  key={subIndex}
                  item={sub}
                  isActive={sub.path === window.location.pathname}
                  isOpen={isOpen}
                  toggleSubmenu={() => toggleSubmenu()}
                  level={level + 1} // Aumentamos el nivel para los submenús
                />
              ))}
            </ul>
          )}
        </div>
      ) : (
        <Link
          href={item.path || "#"}
          className={`flex items-center justify-between px-6 py-4 font-medium text-sm rounded-lg ${
            isActive
              ? "bg-link-hover text-text-link"
              : "text-text-link hover:bg-link-hover"
          }`}
        >
          <div className="flex items-center gap-4">
            {icon && <span>{icon}</span>}
            <span className="capitalize">{item.label}</span>
          </div>
          {item.badge && (
            <span className="inline-block bg-link-main px-2 py-0.5 rounded-full text-white text-xs">
              {item.badge}
            </span>
          )}
        </Link>
      )}
    </li>
  );
};

interface SidebarMenuGroupProps {
  title: string;
  items: MenuItem[];
}

const SidebarMenuGroup: React.FC<SidebarMenuGroupProps> = ({
  title,
  items,
}) => {
  const pathname = usePathname();

  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleToggleSubmenu = (path: string) => {
    setOpenSubmenu(openSubmenu === path ? null : path); // Toggle open/close
  };

  return (
    <nav className="mt-4">
      <h2 className="px-4 font-semibold text-text-section-title text-xs uppercase tracking-wide">
        {title}
      </h2>
      <ul className="space-y-1 mt-2">
        {items.map((item, idx) => {
          const isActive = item.path === pathname;
          const isOpen = openSubmenu === item.path;

          return (
            <SidebarMenuItem
              key={idx}
              item={item}
              isActive={isActive}
              isOpen={isOpen}
              toggleSubmenu={() => handleToggleSubmenu(item.path as string)}
              level={0} // Iniciamos en nivel 0
            />
          );
        })}
      </ul>
    </nav>
  );
};

export default SidebarMenuGroup;

// // // // import React, { useState } from "react";
// // // // import Link from "next/link";
// // // // import { FaChevronDown, FaChevronRight } from "react-icons/fa";
// // // // import { LuDot } from "react-icons/lu";
// // // // import { MenuItem } from "@/interfaces/MenuItem";
// // // // import { usePathname } from "next/navigation";

// // // // interface SidebarMenuItemProps {
// // // //   item: MenuItem;
// // // //   isActive: boolean;
// // // //   isOpen: boolean;
// // // //   toggleSubmenu: () => void;
// // // //   level: number; // Añadimos un nivel para contar los niveles de submenú
// // // // }

// // // // const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
// // // //   item,
// // // //   isActive,
// // // //   isOpen,
// // // //   toggleSubmenu,
// // // //   level, // Recibimos el nivel
// // // // }) => {
// // // //   // Determinamos el ícono, si es el primer nivel se usa el ícono personalizado
// // // //   const icon = level === 0 ? item.icon : <LuDot />;

// // // //   return (
// // // //     <li>
// // // //       {item.submenus?.length ? (
// // // //         <div>
// // // //           <div
// // // //             onClick={toggleSubmenu}
// // // //             className={`flex items-center justify-between px-6 py-4 font-medium cursor-pointer text-sm rounded-lg ${
// // // //               isActive
// // // //                 ? "bg-link-hover text-link-main"
// // // //                 : "text-text-link hover:bg-link-hover"
// // // //             }`}
// // // //           >
// // // //             <div className="flex items-center gap-4">
// // // //               {icon && <span>{icon}</span>}
// // // //               <span className="text-sm capitalize">{item.label}</span>
// // // //             </div>
// // // //             <div className="flex items-center space-x-2">
// // // //               {item.badge && item.badge !== 0 && (
// // // //                 <span className="inline-block bg-link-main px-2 p-1 rounded-full text-white text-xs">
// // // //                   {item.badge}
// // // //                 </span>
// // // //               )}
// // // //               {isOpen ? (
// // // //                 <FaChevronDown
// // // //                   size={10}
// // // //                   className="transition-all duration-200"
// // // //                 />
// // // //               ) : (
// // // //                 <FaChevronRight
// // // //                   size={10}
// // // //                   className="transition-all duration-200"
// // // //                 />
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //           {isOpen && (
// // // //             <ul className="space-y-1 mt-1 ml-4">
// // // //               {item.submenus.map((sub, subIndex) => (
// // // //                 <SidebarMenuItem
// // // //                   key={subIndex}
// // // //                   item={sub}
// // // //                   isActive={sub.path === window.location.pathname}
// // // //                   isOpen={false}
// // // //                   toggleSubmenu={() => {}}
// // // //                   level={level + 1} // Aumentamos el nivel
// // // //                 />
// // // //               ))}
// // // //             </ul>
// // // //           )}
// // // //         </div>
// // // //       ) : (
// // // //         <Link
// // // //           href={item.path || "#"}
// // // //           className={`flex items-center justify-between px-6 py-4 font-medium text-sm rounded-lg ${
// // // //             isActive
// // // //               ? "bg-link-hover text-text-link"
// // // //               : "text-text-link hover:bg-link-hover"
// // // //           }`}
// // // //         >
// // // //           <div className="flex items-center gap-4">
// // // //             {icon && <span>{icon}</span>}
// // // //             <span className="capitalize">{item.label}</span>
// // // //           </div>
// // // //           {item.badge && (
// // // //             <span className="inline-block bg-link-main px-2 py-0.5 rounded-full text-white text-xs">
// // // //               {item.badge}
// // // //             </span>
// // // //           )}
// // // //         </Link>
// // // //       )}
// // // //     </li>
// // // //   );
// // // // };

// // // // interface SidebarMenuGroupProps {
// // // //   title: string;
// // // //   items: MenuItem[];
// // // // }

// // // // const SidebarMenuGroup: React.FC<SidebarMenuGroupProps> = ({
// // // //   title,
// // // //   items,
// // // // }) => {
// // // //   const pathname = usePathname();

// // // //   const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

// // // //   const handleToggleSubmenu = (path: string) => {
// // // //     setOpenSubmenu(openSubmenu === path ? null : path);
// // // //   };

// // // //   return (
// // // //     <nav className="mt-4">
// // // //       <h2 className="px-4 font-semibold text-text-section-title text-xs uppercase tracking-wide">
// // // //         {title}
// // // //       </h2>
// // // //       <ul className="space-y-1 mt-2">
// // // //         {items.map((item, idx) => {
// // // //           const isActive = item.path === pathname;
// // // //           const isOpen = openSubmenu === item.path;

// // // //           return (
// // // //             <SidebarMenuItem
// // // //               key={idx}
// // // //               item={item}
// // // //               isActive={isActive}
// // // //               isOpen={isOpen}
// // // //               toggleSubmenu={() => handleToggleSubmenu(item.path as string)}
// // // //               level={0} // Iniciamos en nivel 0
// // // //             />
// // // //           );
// // // //         })}
// // // //       </ul>
// // // //     </nav>
// // // //   );
// // // // };

// // // // export default SidebarMenuGroup;
// // // import React, { useState, useEffect } from "react";
// // // import Link from "next/link";
// // // import { FaChevronDown, FaChevronRight } from "react-icons/fa";
// // // import { GoDotFill } from "react-icons/go";
// // // import { MenuItem } from "@/interfaces/MenuItem";
// // // import { usePathname } from "next/navigation";

// // // interface SidebarMenuItemProps {
// // //   item: MenuItem;
// // //   isActive: boolean;
// // //   isOpen: boolean;
// // //   toggleSubmenu: () => void;
// // // }

// // // const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
// // //   item,
// // //   isActive,
// // //   isOpen,
// // //   toggleSubmenu,
// // // }) => {
// // //   return (
// // //     <li>
// // //       {item.submenus?.length ? (
// // //         <div>
// // //           <div
// // //             onClick={toggleSubmenu}
// // //             className={`flex items-center justify-between px-6 py-4 font-medium cursor-pointer text-sm rounded-lg ${
// // //               isActive
// // //                 ? "bg-link-hover text-link-main"
// // //                 : "text-text-link hover:bg-link-hover"
// // //             }`}
// // //           >
// // //             <div className="flex items-center gap-4">
// // //               {item.icon && <span>{item.icon}</span>}
// // //               <span className="text-sm capitalize">{item.label}</span>
// // //             </div>
// // //             <div className="flex items-center space-x-2">
// // //               {item.badge && item.badge !== 0 && (
// // //                 <span className="inline-block bg-link-main px-2 p-1 rounded-full text-white text-xs">
// // //                   {item.badge}
// // //                 </span>
// // //               )}
// // //               {isOpen ? (
// // //                 <FaChevronDown
// // //                   size={10}
// // //                   className="transition-all duration-200"
// // //                 />
// // //               ) : (
// // //                 <FaChevronRight
// // //                   size={10}
// // //                   className="transition-all duration-200"
// // //                 />
// // //               )}
// // //             </div>
// // //           </div>
// // //           {isOpen && (
// // //             <ul className="space-y-1 mt-1 ml-4">
// // //               {item.submenus.map((sub, subIndex) => (
// // //                 <SidebarSubMenuItem
// // //                   key={subIndex}
// // //                   item={sub}
// // //                   isActive={sub.path === window.location.pathname}
// // //                 />
// // //               ))}
// // //             </ul>
// // //           )}
// // //         </div>
// // //       ) : (
// // //         <Link
// // //           href={item.path || "#"}
// // //           className={`flex items-center justify-between px-6 py-4 font-medium text-sm rounded-lg ${
// // //             isActive
// // //               ? "bg-link-hover text-text-link"
// // //               : "text-text-link hover:bg-link-hover"
// // //           }`}
// // //         >
// // //           <div className="flex items-center gap-4">
// // //             {item.icon && <span>{item.icon}</span>}
// // //             <span className="capitalize">{item.label}</span>
// // //           </div>
// // //           {item.badge && (
// // //             <span className="inline-block bg-link-main px-2 py-0.5 rounded-full text-white text-xs">
// // //               {item.badge}
// // //             </span>
// // //           )}
// // //         </Link>
// // //       )}
// // //     </li>
// // //   );
// // // };

// // // const SidebarSubMenuItem: React.FC<{ item: MenuItem; isActive: boolean }> = ({
// // //   item,
// // //   isActive,
// // // }) => {
// // //   return (
// // //     <li>
// // //       <Link
// // //         href={item.path || "#"}
// // //         className={`group flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
// // //           isActive ? "text-link-main" : "text-text-link hover:bg-link-hover"
// // //         }`}
// // //       >
// // //         <span className="group-hover:text-link-main flex items-center mr-2">
// // //           <GoDotFill className="inline-block text-xs" />
// // //         </span>
// // //         <span className="capitalize">{item.label}</span>
// // //       </Link>
// // //     </li>
// // //   );
// // // };

// // // interface SidebarMenuGroupProps {
// // //   title: string;
// // //   items: MenuItem[];
// // // }

// // // const SidebarMenuGroup: React.FC<SidebarMenuGroupProps> = ({
// // //   title,
// // //   items,
// // // }) => {
// // //   const pathname = usePathname();

// // //   const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

// // //   const handleToggleSubmenu = (path: string) => {
// // //     setOpenSubmenu(openSubmenu === path ? null : path);
// // //   };

// // //   return (
// // //     <nav className="mt-4">
// // //       <h2 className="px-4 font-semibold text-text-section-title text-xs uppercase tracking-wide">
// // //         {title}
// // //       </h2>
// // //       <ul className="space-y-1 mt-2">
// // //         {items.map((item, idx) => {
// // //           const isActive = item.path === pathname;
// // //           const isOpen = openSubmenu === item.path;

// // //           return (
// // //             <SidebarMenuItem
// // //               key={idx}
// // //               item={item}
// // //               isActive={isActive}
// // //               isOpen={isOpen}
// // //               toggleSubmenu={() => handleToggleSubmenu(item.path as string)}
// // //             />
// // //           );
// // //         })}
// // //       </ul>
// // //     </nav>
// // //   );
// // // };

// // export default SidebarMenuGroup;

// // import React, { useState, useEffect } from "react";
// // import Link from "next/link";
// // import { FaChevronDown, FaChevronRight } from "react-icons/fa";
// // import { MenuItem } from "@/interfaces/MenuItem";
// // import { GoDotFill } from "react-icons/go";
// // import { usePathname } from "next/navigation";

// // interface SidebarMenuItemProps {
// //   item: MenuItem;
// //   isActive: boolean;
// //   toggleSubmenu?: () => void;
// //   isOpen?: boolean;
// // }

// // const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
// //   item,
// //   isActive,
// //   toggleSubmenu,
// //   isOpen,
// // }) => {
// //   const pathname = usePathname();
// //   return (
// //     <li>
// //       {item.submenus?.length ? (
// //         <div>
// //           <div
// //             onClick={toggleSubmenu}
// //             className={`flex items-center justify-between px-6 py-4 font-medium cursor-pointer text-sm rounded-lg ${
// //               isActive
// //                 ? "bg-link-hover text-link-main"
// //                 : "text-text-link hover:bg-link-hover"
// //             }`}
// //           >
// //             <div className="flex items-center gap-4">
// //               {item.icon && <span>{item.icon}</span>}
// //               <span className="text-sm capitalize">{item.label}</span>
// //             </div>
// //             <div className="flex items-center space-x-2">
// //               {item.badge && item.badge !== 0 && (
// //                 <span className="inline-block bg-link-main px-2 p-1 rounded-full text-white text-xs">
// //                   {item.badge}
// //                 </span>
// //               )}
// //               {isOpen ? (
// //                 <FaChevronDown
// //                   size={10}
// //                   className="transition-all duration-200"
// //                 />
// //               ) : (
// //                 <FaChevronRight
// //                   size={10}
// //                   className="transition-all duration-200"
// //                 />
// //               )}
// //             </div>
// //           </div>
// //           {isOpen && (
// //             <ul className="space-y-1 mt-1 ml-4">
// //               {item.submenus.map((sub, subIndex) => (
// //                 <SidebarSubMenuItem
// //                   key={subIndex}
// //                   item={sub}
// //                   isActive={sub.path === pathname}
// //                 />
// //               ))}
// //             </ul>
// //           )}
// //         </div>
// //       ) : (
// //         <Link
// //           href={item.path || "#"}
// //           className={`flex items-center justify-between px-6 py-4 font-medium text-sm rounded-lg ${
// //             isActive
// //               ? "bg-link-hover text-text-link"
// //               : "text-text-link hover:bg-link-hover"
// //           }`}
// //         >
// //           <div className="flex items-center gap-4">
// //             {item.icon && <span>{item.icon}</span>}
// //             <span className="capitalize">{item.label}</span>
// //           </div>
// //           {item.badge && (
// //             <span className="inline-block bg-link-main px-2 py-0.5 rounded-full text-white text-xs">
// //               {item.badge}
// //             </span>
// //           )}
// //         </Link>
// //       )}
// //     </li>
// //   );
// // };

// // const SidebarSubMenuItem: React.FC<{ item: MenuItem; isActive: boolean }> = ({
// //   item,
// //   isActive,
// // }) => {
// //   return (
// //     <li>
// //       <Link
// //         href={item.path || "#"}
// //         className={`group flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
// //           isActive ? "text-link-main" : "text-text-link hover:bg-link-hover"
// //         }`}
// //       >
// //         <span className="group-hover:text-link-main flex items-center mr-2">
// //           <GoDotFill className="inline-block text-xs" />
// //         </span>
// //         <span className="capitalize">{item.label}</span>
// //       </Link>
// //     </li>
// //   );
// // };

// // interface SidebarMenuGroupProps {
// //   title: string;
// //   items: MenuItem[];
// // }

// // const SidebarMenuGroup: React.FC<SidebarMenuGroupProps> = ({
// //   title,
// //   items,
// // }) => {
// //   const pathname = usePathname();
// //   return (
// //     <nav className="mt-4">
// //       <h2 className="px-4 font-semibold text-text-section-title text-xs uppercase tracking-wide">
// //         {title}
// //       </h2>
// //       <ul className="space-y-1 mt-2">
// //         {items.map((item, idx) => (
// //           <SidebarMenuItem
// //             key={idx}
// //             item={item}
// //             isActive={item.path === pathname}
// //           />
// //         ))}
// //       </ul>
// //     </nav>
// //   );
// // };

// // export default SidebarMenuGroup;

// interface SidebarMenuGroupProps {
//   title: string;
//   items: MenuItem[];
// }

// const SidebarMenuGroup: React.FC<SidebarMenuGroupProps> = ({
//   title,
//   items,
// }) => {
//   return (
//     <nav className="mt-4">
//       <h2 className="px-4 font-semibold text-text-section-title text-xs uppercase tracking-wide">
//         {title}
//       </h2>

//       <ul className="space-y-1 mt-2">
//         {items.map((item, idx) => (
//           <SidebarMenuItem key={idx} item={item} />
//         ))}
//       </ul>
//     </nav>
//   );
// };

// const SidebarMenuItem: React.FC<{ item: MenuItem }> = ({ item }) => {
//   const pathname = usePathname();

//   const hasSubmenus = item.submenus && item.submenus.length > 0;
//   const isActive = item.path === pathname;
//   const isSubmenuActive =
//     item.submenus?.some((sub) => sub.path === pathname) ?? false;
//   const [isOpen, setIsOpen] = useState(isSubmenuActive);

//   useEffect(() => {
//     if (isSubmenuActive) setIsOpen(true);
//   }, [isSubmenuActive]);

//   const toggleSubmenu = () => {
//     if (hasSubmenus) setIsOpen(!isOpen);
//   };

//   const parentItemClasses = `
//     flex items-center justify-between px-6 py-4 font-medium cursor-pointer text-sm rounded-lg
//     ${
//       isActive || isSubmenuActive
//         ? "bg-link-hover text-link-main"
//         : "text-text-link hover:bg-link-hover"
//     }
//   `;

//   return (
//     <li>
//       {hasSubmenus ? (
//         <>
//           <div onClick={toggleSubmenu} className={parentItemClasses}>
//             <div className="flex items-center gap-4">
//               {item.icon && <span>{item.icon}</span>}
//               <span className="text-sm capitalize">{item.label}</span>
//             </div>

//             <div className="flex items-center space-x-2">
//               {typeof item.badge == "number" && item.badge !== 0 && (
//                 <span className="inline-block bg-link-main px-2 p-1 rounded-full text-white text-xs">
//                   {item.badge}
//                 </span>
//               )}

//               {isOpen ? (
//                 <FaChevronDown
//                   size={10}
//                   className="transition-all duration-200"
//                 />
//               ) : (
//                 <FaChevronRight
//                   size={10}
//                   className="transition-all duration-200"
//                 />
//               )}
//             </div>
//           </div>

//           {isOpen && (
//             <ul className="space-y-1 mt-1 ml-4">
//               {item.submenus!.map((sub, subIndex) => {
//                 const isSubItemActive = sub.path === pathname;

//                 const subItemClasses = `
//                   group flex items-center px-4 py-2 text-sm font-medium rounded-lg
//                   ${
//                     isSubItemActive
//                       ? "text-link-main"
//                       : "text-text-link hover:bg-link-hover"
//                   }
//                 `;

//                 return (
//                   <li key={subIndex}>
//                     <Link href={sub.path || "#"} className={subItemClasses}>
//                       <span className="group-hover:text-link-main flex items-center mr-2">
//                         <GoDotFill className="inline-block text-xs" />
//                       </span>
//                       <span className="capitalize">{sub.label}</span>
//                     </Link>
//                   </li>
//                 );
//               })}
//             </ul>
//           )}
//         </>
//       ) : (
//         <Link
//           href={item.path || "#"}
//           className={`
//             flex items-center justify-between px-6 py-4 font-medium text-sm rounded-lg
//             ${
//               isActive
//                 ? "bg-link-hover text-text-link"
//                 : "text-text-link hover:bg-link-hover"
//             }
//           `}
//         >
//           <div className="flex items-center gap-4">
//             {item.icon && <span>{item.icon}</span>}
//             <span className="capitalize">{item.label}</span>
//           </div>
//           {item.badge && (
//             <span className="inline-block bg-link-main px-2 py-0.5 rounded-full text-white text-xs">
//               {item.badge}
//             </span>
//           )}
//         </Link>
//       )}
//     </li>
//   );
// };
