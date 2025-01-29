export interface MenuItem {
  label: string;
  icon?: React.ReactNode;   // Ícono opcional
  path?: string;            // Ruta para el <Link> (si no hay submenus)
  badge?: string;           // Texto que se mostrará en un "chip" o badge
  submenus?: MenuItem[];    // Submenús (dropdown)
}