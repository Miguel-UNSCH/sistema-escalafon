import { format } from "date-fns";
import { es } from "date-fns/locale";

export const canEdit = (modificationStart: Date, modificationEnd: Date): boolean => {
  const now = new Date();
  return now >= modificationStart && now <= modificationEnd;
};

export const fn_date = (fechaISO: Date) => format(new Date(fechaISO), "d 'de' MMMM 'del' yyyy", { locale: es });
