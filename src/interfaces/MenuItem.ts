export interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  adm?: boolean;
  path?: string;
  badge?: string;
  submenus?: MenuItem[];
}
