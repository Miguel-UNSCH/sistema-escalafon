import { MenuItem } from "@/interfaces/MenuItem";
import {
  FaUserCog,
  FaUsers,
  FaIdCard,
  FaBriefcase,
  FaMoneyBill,
  FaTrophy,
  FaFileAlt,
  FaCogs,
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
        submenus: [
          { label: "panel", path: "/dashboard/panel" },
          { label: "reportes", path: "/dashboard/reports" },
        ],
      },
    ],
  },
  {
    title: "Gestión de Usuarios",
    menuItem: [
      {
        label: "Crear Usuario",
        icon: <FaUserCog />,
        path: "/usuarios/crear",
        submenus: [{ label: "Submenu 1", path: "/usuarios/crear/submenu1" }],
      },
      {
        label: "Editar Usuario",
        icon: <FaUsers />,
        path: "/usuarios/editar",
        submenus: [{ label: "Submenu 2", path: "/usuarios/editar/submenu2" }],
      },
      {
        label: "Roles y Permisos",
        icon: <FaIdCard />,
        path: "/usuarios/roles",
      },
    ],
  },
  {
    title: "Ficha Personal",
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
        label: "Estudios y Capacitación",
        icon: <FaBriefcase />,
        path: "/personal-file/estudios",
      },
      {
        label: "Experiencia Laboral",
        icon: <FaBriefcase />,
        path: "/personal-file/experiencia",
      },
      {
        label: "Discapacidad",
        icon: <FaIdCard />,
        path: "/personal-file/discapacidad",
      },
    ],
  },
  {
    title: "Situación Laboral",
    menuItem: [
      {
        label: "Contratos y Nombramiento",
        icon: <FaBriefcase />,
        path: "/situacion/contratos",
      },
      {
        label: "Renuncia y Liquidación",
        icon: <FaSignOutAlt />,
        path: "/situacion/renuncia",
      },
      {
        label: "Desplazamiento",
        icon: <FaBriefcase />,
        path: "/situacion/desplazamiento",
      },
      {
        label: "Descanso Médico",
        icon: <FaFileAlt />,
        path: "/situacion/descanso-medico",
      },
      {
        label: "Permisos / Licencias / Vacaciones",
        icon: <FaFileAlt />,
        path: "/situacion/permisos",
      },
      { label: "Ascensos", icon: <FaTrophy />, path: "/situacion/ascensos" },
    ],
  },
  {
    title: "Bonificaciones y Evaluaciones",
    menuItem: [
      {
        label: "Bonificación Personal",
        icon: <FaMoneyBill />,
        path: "/bonificaciones/personal",
      },
      {
        label: "Bonificación Familiar",
        icon: <FaMoneyBill />,
        path: "/bonificaciones/familiar",
      },
      {
        label: "Ficha de Evaluación",
        icon: <FaFileAlt />,
        path: "/evaluaciones/ficha",
      },
    ],
  },
  {
    title: "Méritos y Deméritos",
    menuItem: [
      { label: "Méritos", icon: <FaTrophy />, path: "/meritos" },
      { label: "Deméritos", icon: <FaTrophy />, path: "/demeritos" },
    ],
  },
  {
    title: "Documentos / Otros",
    menuItem: [
      {
        label: "Acta de Entrega",
        icon: <FaFileAlt />,
        path: "/documentos/acta-entrega",
      },
      {
        label: "Constancia de Pagos",
        icon: <FaFileAlt />,
        path: "/documentos/constancia-pagos",
      },
    ],
  },
  {
    title: "Reportes (Solo Admin)",
    menuItem: [
      {
        label: "Reportes Mensuales",
        icon: <FaChartBar />,
        path: "/reportes/mensuales",
      },
      {
        label: "Reportes Anuales",
        icon: <FaChartBar />,
        path: "/reportes/anuales",
      },
      {
        label: "Reportes Personalizados",
        icon: <FaChartBar />,
        path: "/reportes/personalizados",
      },
    ],
  },
  {
    title: "Configuración",
    menuItem: [
      {
        label: "Perfil / Mi Cuenta",
        icon: <FaCogs />,
        path: "/configuracion/perfil",
      },
      {
        label: "Cambiar Contraseña",
        icon: <FaCogs />,
        path: "/configuracion/cambiar-contraseña",
      },
      {
        label: "Preferencias",
        icon: <FaCogs />,
        path: "/configuracion/preferencias",
      },
    ],
  },
];
