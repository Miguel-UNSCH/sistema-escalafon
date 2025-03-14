"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Dot, Home } from "lucide-react";
import { toast } from "react-hot-toast";

export const Breadcrumbs: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const findBreadcrumb = (path: string, items: BreadcrumbItem[] = breadcrumbsOp, basePath = ""): BreadcrumbItem[] => {
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

interface BreadcrumbItem {
  label: string;
  path: string;
  items?: BreadcrumbItem[];
}

const breadcrumbsOp: BreadcrumbItem[] = [
  {
    label: "Inicio",
    path: "/dashboard",
    items: [{ label: "documentación", path: "/doc" }],
  },
  {
    label: "Gestión de Usuarios",
    path: "/user",
    items: [{ label: "administrar usuario", path: "" }],
  },
  {
    label: "ficha personal",
    path: "/personal-file",
    items: [
      {
        label: "información personal",
        path: "/personal-information",
        items: [
          { label: "datos personales", path: "/personal-data" },
          { label: "datos del cónyuge", path: "/spouse-data" },
          { label: "datos de los hijos", path: "/children-data" },
        ],
      },
      {
        label: "estudios y capacitación",
        path: "/studies-training",
        items: [
          { label: "estudios", path: "/studies" },
          { label: "capacitación", path: "/training" },
        ],
      },
      { label: "experiencia laboral", path: "/experience" },
      { label: "discapacidad", path: "/disability" },
    ],
  },
  {
    label: "situación laboral",
    path: "/work-situation",
    items: [
      { label: "contratos y nombramiento", path: "/contracts" },
      { label: "renuncia", path: "/renunciation" },
      { label: "desplazamiento", path: "/displacement" },
      { label: "descanso médico", path: "/medical-rest" },
      { label: "permisos / licencias", path: "/permissions" },
      { label: "ascensos", path: "/promotions" },
    ],
  },
  {
    label: "bonificaciones y evaluaciones",
    path: "/bonuses-evaluations",
    items: [
      {
        label: "bonificaciones",
        path: "",
        items: [
          { label: "bonificación personal", path: "/personal" },
          { label: "bonificación familiar", path: "/family" },
        ],
      },
      { label: "ficha de evaluación", path: "/evaluations" },
    ],
  },
  {
    label: "méritos y deméritos",
    path: "/merits-demerits",
    items: [
      { label: "méritos", path: "/merits" },
      { label: "deméritos", path: "/demerits" },
    ],
  },
  {
    label: "documentos / otros",
    path: "/documents",
    items: [{ label: "documentos", path: "" }],
  },
  {
    label: "reportes",
    path: "/report",
    items: [
      { label: "reportes mensuales", path: "/monthly" },
      { label: "reportes anuales", path: "/annual" },
      { label: "reportes personalizados", path: "/defaults" },
    ],
  },
  {
    label: "mi cuenta",
    path: "/settings",
    items: [{ label: "configuracion", path: "/settings" }],
  },
];
