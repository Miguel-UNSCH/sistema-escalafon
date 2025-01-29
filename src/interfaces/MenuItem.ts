export interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  path?: string;
  badge?: number;
  submenus?: MenuItem[];
}