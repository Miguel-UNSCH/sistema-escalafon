import { MenuItem } from "@/interfaces/MenuItem";
import { ChartColumn, IdCard, UserRound, UserRoundCog, UserRoundPlus, UsersRound } from "lucide-react";
import { FaIdCard, FaBriefcase, FaMoneyBill, FaTrophy, FaFileAlt, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";

interface NavigationItems {
  title: string;
  menuItem: MenuItem[];
}

export const navigationItems: NavigationItems[] = [
  {
    title: "inicio",
    menuItem: [
      {
        label: "dashboard",
        icon: <FaTachometerAlt />,
        path: "/dashboard",
        badge: "2",
        submenus: [{ label: "panel", path: "/dashboard/panel" }],
      },
    ],
  },
  {
    title: "gestión de usuarios",
    menuItem: [
      {
        label: "crear usuario",
        icon: <UserRoundPlus size={16} />,
        path: "/dashboard/user/create",
      },
      {
        label: "editar usuario",
        icon: <UsersRound size={16} />,
        path: "/dashboard/user/edit",
      },
      {
        label: "roles y permisos",
        icon: <IdCard size={16} />,
        path: "/dashboard/user/permissions",
      },
    ],
  },
  {
    title: "ficha personal",
    menuItem: [
      {
        label: "información personal",
        icon: <UserRoundCog size={16} />,
        path: "/dashboard/personal-file/personal-information",
        // badge: "0",
        submenus: [
          {
            label: "datos personales",
            path: "/dashboard/personal-file/personal-information/personal-data",
          },
          {
            label: "datos del cónyuge",
            path: "/dashboard/personal-file/personal-information/spouse-data",
          },
          {
            label: "datos de los hijos",
            path: "/dashboard/personal-file/personal-information/children-data",
          },
        ],
      },
      {
        label: "estudios y capacitación",
        icon: <FaBriefcase />,
        path: "/dashboard/personal-file/studies-training",
        submenus: [
          { label: "estudios", path: "/dashboard/personal-file/studies-training/studies" },
          { label: "capacitación", path: "/dashboard/personal-file/studies-training/training" },
        ],
      },
      {
        label: "experiencia laboral",
        icon: <FaBriefcase />,
        path: "/dashboard/personal-file/experience",
      },
      {
        label: "discapacidad",
        icon: <FaIdCard />,
        path: "/dashboard/personal-file/disability",
      },
    ],
  },
  {
    title: "situación laboral",
    menuItem: [
      {
        label: "contratos y nombramiento",
        icon: <FaBriefcase />,
        path: "/dashboard/work-situation/contracts",
      },
      {
        label: "renuncia y liquidación",
        icon: <FaSignOutAlt />,
        path: "/dashboard/work-situation/renunciation",
      },
      {
        label: "desplazamiento",
        icon: <FaBriefcase />,
        path: "/dashboard/work-situation/displacement",
      },
      {
        label: "descanso médico",
        icon: <FaFileAlt />,
        path: "/dashboard/work-situation/medical-rest",
      },
      {
        label: "permisos / licencias / vacaciones",
        icon: <FaFileAlt />,
        path: "/dashboard/work-situation/permissions",
      },
      { label: "ascensos", icon: <FaTrophy />, path: "/dashboard/work-situation/promotions" },
    ],
  },
  {
    title: "bonificaciones y evaluaciones",
    menuItem: [
      {
        label: "bonificaciones",
        icon: <FaMoneyBill />,
        path: "/dashboard/bonuses-evaluations",
        submenus: [
          {
            label: "bonificación personal",
            icon: <FaMoneyBill />,
            path: "/dashboard/bonuses-evaluations/personal",
          },
          {
            label: "bonificación familiar",
            icon: <FaMoneyBill />,
            path: "/dashboard/bonuses-evaluations/family",
          },
        ],
      },
      {
        label: "ficha de evaluación",
        icon: <FaFileAlt />,
        path: "/dashboard/bonuses-evaluations/evaluations",
      },
    ],
  },
  {
    title: "méritos y deméritos",
    menuItem: [
      { label: "méritos", icon: <FaTrophy />, path: "/dashboard/merits-demerits/merits" },
      { label: "deméritos", icon: <FaTrophy />, path: "/dashboard/merits-demerits/demerits" },
    ],
  },
  {
    title: "documentos / otros",
    menuItem: [
      {
        label: "acta de entrega",
        icon: <FaFileAlt />,
        path: "/dashboard/documents",
      },
    ],
  },
  {
    title: "reportes (Solo Admin)",
    menuItem: [
      {
        label: "reportes mensuales",
        icon: <ChartColumn />,
        path: "/dashboard/reports/monthly",
      },
      {
        label: "reportes anuales",
        icon: <ChartColumn />,
        path: "/dashboard/reports/annual",
      },
      {
        label: "reportes personalizados",
        icon: <ChartColumn />,
        path: "/dashboard/reports/defaults",
      },
    ],
  },
  {
    title: "mi cuenta",
    menuItem: [{ label: "configuracion", icon: <UserRound />, path: "/dashboard/settings" }],
  },
];
