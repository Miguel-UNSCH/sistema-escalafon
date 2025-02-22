import { MenuItem } from "@/interfaces/MenuItem";
import { Banknote, BriefcaseBusiness, ChartColumn, File, IdCard, LayoutDashboard, LogOut, Trophy, UserRound, UserRoundCog, UserRoundPlus, UsersRound } from "lucide-react";

interface NavigationItems {
  title: string;
  adm?: boolean;
  menuItem: MenuItem[];
}

export const navigationItems: NavigationItems[] = [
  {
    title: "inicio",
    adm: true,
    menuItem: [
      {
        label: "dashboard",
        icon: <LayoutDashboard size={16} />,
        path: "/dashboard",
        badge: "2",
        submenus: [{ label: "registrar", path: "/dashboard" }],
      },
    ],
  },
  {
    title: "gestión de usuarios",
    adm: true,
    menuItem: [
      { label: "crear usuario", icon: <UserRoundPlus size={16} />, path: "/dashboard/user/create" },
      { label: "editar usuario", icon: <UsersRound size={16} />, path: "/dashboard/user/edit" },
    ],
  },
  {
    title: "ficha personal",
    menuItem: [
      {
        label: "información personal",
        icon: <UserRoundCog size={16} />,
        path: "/dashboard/personal-file/personal-information",
        submenus: [
          { label: "datos personales", path: "/dashboard/personal-file/personal-information/personal-data" },
          { label: "datos del cónyuge", path: "/dashboard/personal-file/personal-information/spouse-data" },
          { label: "datos de los hijos", path: "/dashboard/personal-file/personal-information/children-data" },
        ],
      },
      {
        label: "estudios y capacitación",
        icon: <BriefcaseBusiness size={16} />,
        path: "/dashboard/personal-file/studies-training",
        submenus: [
          { label: "estudios", path: "/dashboard/personal-file/studies-training/studies" },
          { label: "capacitación", path: "/dashboard/personal-file/studies-training/training" },
        ],
      },
      { label: "experiencia laboral", icon: <BriefcaseBusiness size={16} />, path: "/dashboard/personal-file/experience" },
      {
        label: "discapacidad",
        icon: <IdCard size={16} />,
        path: "/dashboard/personal-file/disability",
      },
    ],
  },
  {
    title: "situación laboral",
    menuItem: [
      { label: "contratos y nombramiento", icon: <BriefcaseBusiness size={16} />, path: "/dashboard/work-situation/contracts" },
      { label: "renuncia y liquidación", icon: <LogOut size={16} />, path: "/dashboard/work-situation/renunciation" },
      {
        label: "desplazamiento",
        icon: <BriefcaseBusiness size={16} />,
        path: "/dashboard/work-situation/displacement",
      },
      { label: "descanso médico", icon: <File size={16} />, path: "/dashboard/work-situation/medical-rest" },
      { label: "permisos / licencias", icon: <File size={16} />, path: "/dashboard/work-situation/permissions" },
      { label: "ascensos", icon: <Trophy size={16} />, path: "/dashboard/work-situation/promotions" },
    ],
  },
  {
    title: "bonificaciones y evaluaciones",
    menuItem: [
      {
        label: "bonificaciones",
        icon: <Banknote size={16} />,
        path: "/dashboard/bonuses-evaluations",
        submenus: [
          { label: "bonificación personal", path: "/dashboard/bonuses-evaluations/personal" },
          { label: "bonificación familiar", path: "/dashboard/bonuses-evaluations/family" },
        ],
      },
      { label: "ficha de evaluación", icon: <File size={16} />, path: "/dashboard/bonuses-evaluations/evaluations" },
    ],
  },
  {
    title: "méritos y deméritos",
    menuItem: [
      { label: "méritos", icon: <Trophy size={16} />, path: "/dashboard/merits-demerits/merits" },
      { label: "deméritos", adm: true, icon: <Trophy size={16} />, path: "/dashboard/merits-demerits/demerits" },
    ],
  },
  {
    title: "documentos / otros",
    menuItem: [{ label: "acta de entrega", icon: <File size={16} />, path: "/dashboard/documents" }],
  },
  {
    title: "reportes",
    menuItem: [
      { label: "reportes mensuales", icon: <ChartColumn size={16} />, path: "/dashboard/reports/monthly" },
      { label: "reportes anuales", icon: <ChartColumn size={16} />, path: "/dashboard/reports/annual" },
      { label: "reportes personalizados", icon: <ChartColumn size={16} />, path: "/dashboard/reports/defaults" },
    ],
  },
  { title: "mi cuenta", menuItem: [{ label: "configuracion", icon: <UserRound size={16} />, path: "/dashboard/settings" }] },
];
