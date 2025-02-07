import { MenuItem } from "@/interfaces/MenuItem";
import {
  FaUserCog,
  FaUsers,
  FaIdCard,
  FaBriefcase,
  FaMoneyBill,
  FaTrophy,
  FaFileAlt,
  FaChartBar,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";

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
    title: "gestión de usuarios (only admin)",
    menuItem: [
      {
        label: "crear usuario",
        icon: <FaUserCog />,
        path: "/usuarios/crear",
      },
      {
        label: "editar usuario",
        icon: <FaUsers />,
        path: "/usuarios/editar",
      },
      {
        label: "roles y permisos",
        icon: <FaIdCard />,
        path: "/usuarios/roles",
      },
    ],
  },
  {
    title: "ficha personal",
    menuItem: [
      {
        label: "información personal",
        icon: <FaIdCard />,
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
        path: "/documentos/acta-entrega",
      },
      {
        label: "constancia de pagos",
        icon: <FaFileAlt />,
        path: "/documentos/constancia-pagos",
      },
    ],
  },
  {
    title: "reportes (Solo Admin)",
    menuItem: [
      {
        label: "reportes mensuales",
        icon: <FaChartBar />,
        path: "/reports/mensuales",
      },
      {
        label: "reportes anuales",
        icon: <FaChartBar />,
        path: "/reports/anuales",
      },
      {
        label: "reportes personalizados",
        icon: <FaChartBar />,
        path: "/reports/personalizados",
      },
    ],
  },
];
