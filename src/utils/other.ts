export const admin_routes = ["/dashboard", "/user", "/merits-demerits/demerits", "/reports"];

export interface BreadcrumbItem {
  label: string;
  path: string;
  items?: BreadcrumbItem[];
}

export const breadcrumbs_options: BreadcrumbItem[] = [
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
      { label: "evaluaciones", path: "/evaluations" },
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
