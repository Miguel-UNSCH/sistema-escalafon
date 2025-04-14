export const getDuration = (from: Date, to: Date) => {
  const start = new Date(from);
  const end = new Date(to);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return {
    anios: String(years),
    meses: String(months),
    dias: String(days),
  };
};

export const formatDate = (d: Date | string): string => {
  const date = new Date(d);
  return date.toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" });
};
