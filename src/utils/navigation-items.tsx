import { MenuItem } from "@/interfaces";
import { Banknote, BriefcaseBusiness, ChartColumn, File, FileScan, IdCard, LayoutDashboard, LogOut, Trophy, UserRound, UserRoundCog, UsersRound } from "lucide-react";

interface NavigationItems {
  title: string;
  path: string;
  menuItem: MenuItem[];
}

export const navigationItems: NavigationItems[] = [
  {
    title: "Inicio",
    path: "/dashboard",
    menuItem: [
      { label: "Dashboard", icon: <LayoutDashboard size={16} />, path: "/", submenus: [{ label: "Documentación", path: "/doc" }] },
      { label: "Administrar Usuario", icon: <UsersRound size={16} />, path: "/user" },
    ],
  },
  {
    title: "Ficha Personal",
    path: "/personal-file",
    menuItem: [
      {
        label: "Información Personal",
        icon: <UserRoundCog size={16} />,
        path: "/personal-information",
        submenus: [
          { label: "Datos Personales", path: "/personal-data" },
          { label: "Datos del Cónyuge", path: "/spouse-data" },
          { label: "Datos de los Hijos", path: "/children-data" },
        ],
      },
      {
        label: "Estudios y Capacitación",
        icon: <BriefcaseBusiness size={16} />,
        path: "/studies-training",
        submenus: [
          { label: "Estudios", path: "/studies" },
          { label: "Capacitación", path: "/training" },
        ],
      },
      { label: "Experiencia Laboral", icon: <BriefcaseBusiness size={16} />, path: "/experience" },
      { label: "Discapacidad", icon: <IdCard size={16} />, path: "/disability" },
    ],
  },
  {
    title: "Situación Laboral",
    path: "/work-situation",
    menuItem: [
      { label: "Contratos y Nombramiento", icon: <BriefcaseBusiness size={16} />, path: "/contracts" },
      { label: "Renuncia", icon: <LogOut size={16} />, path: "/renunciation" },
      { label: "Desplazamiento", icon: <BriefcaseBusiness size={16} />, path: "/displacement" },
      { label: "Descanso Médico", icon: <File size={16} />, path: "/medical-rest" },
      { label: "Permisos / Licencias", icon: <File size={16} />, path: "/permissions" },
      { label: "Ascensos", icon: <Trophy size={16} />, path: "/promotions" },
    ],
  },
  {
    title: "Bonificaciones y Evaluaciones",
    path: "/bonuses-evaluations",
    menuItem: [
      {
        label: "Bonificaciones",
        icon: <Banknote size={16} />,
        path: "/bonuses",
        submenus: [
          { label: "Bonificación Personal", path: "/personal" },
          { label: "Bonificación Familiar", path: "/family" },
          { label: "Reconocimientos", path: "/acknowledgment" },
        ],
      },
      { label: "evaluaciones", icon: <File size={16} />, path: "/evaluations" },
    ],
  },
  {
    title: "méritos y deméritos",
    path: "/merits-demerits",
    menuItem: [
      { label: "Méritos", icon: <Trophy size={16} />, path: "/merits" },
      { label: "Deméritos", icon: <Trophy size={16} />, path: "/demerits" },
    ],
  },
  {
    title: "Documentos / Otros",
    path: "/documents",
    menuItem: [
      { label: "Documentos", icon: <FileScan size={16} />, path: "/doc" },
      { label: "Constancias", icon: <File size={16} />, path: "/cons" },
    ],
  },
  {
    title: "reportes",
    path: "/reports",
    menuItem: [
      { label: "reportes mensuales", icon: <ChartColumn size={16} />, path: "/monthly" },
      { label: "reportes anuales", icon: <ChartColumn size={16} />, path: "/annual" },
      { label: "reportes personalizados", icon: <ChartColumn size={16} />, path: "/defaults" },
    ],
  },
  { title: "Mi Cuenta", path: "/settings", menuItem: [{ label: "Configuración", icon: <UserRound size={16} />, path: "/" }] },
];
