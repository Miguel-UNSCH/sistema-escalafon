import React from "react";
import { toast } from "react-hot-toast";
import { Dot, Home } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { BreadcrumbItem, breadcrumbs_options } from "@/utils/other";

export const Breadcrumbs: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const findBreadcrumb = (path: string, items: BreadcrumbItem[] = breadcrumbs_options, basePath = ""): BreadcrumbItem[] => {
    for (const item of items) {
      const fullPath = `${basePath}${item.path}`;

      if (path.startsWith(fullPath)) {
        if (path === fullPath) return [{ ...item, path: fullPath }];

        if (item.items) {
          const subBreadcrumb = findBreadcrumb(path, item.items, fullPath);
          if (subBreadcrumb.length) return [{ ...item, path: fullPath }, ...subBreadcrumb];
        }
      }
    }
    return [];
  };
  const breadcrumbItems = findBreadcrumb(pathname);

  const handleNavigation = (path: string): void => {
    toast.success(`Redirigiendo a ${path}`);
    router.push(path);
  };

  return (
    <div className="flex flex-row items-center gap-2 font-special text-mauve">
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="relative flex flex-row items-center transition-colors cursor-pointer" onClick={() => handleNavigation(item.path)}>
          {index > 0 ? <Dot /> : <Home size={14} className="mr-2" />}
          <p className="font-special hover:font-semibold text-xs uppercase">{item.label}</p>
        </div>
      ))}
    </div>
  );
};
