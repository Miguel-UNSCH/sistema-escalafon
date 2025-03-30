export const canEdit = (modificationStart: Date, modificationEnd: Date): boolean => {
  const now = new Date();
  return now >= modificationStart && now <= modificationEnd;
};
