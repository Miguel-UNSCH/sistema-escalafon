export const canEdit = (modificationStart: Date, modificationEnd: Date): boolean => {
  const now = new Date();
  return now >= modificationStart && now <= modificationEnd;
};

export const fn_date = (fechaISO: Date) => {
  return new Date(fechaISO).toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" });
};
