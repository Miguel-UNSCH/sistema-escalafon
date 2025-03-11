export const mimeTypes: { [key: string]: string } = {
  pdf: "application/pdf",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  json: "application/json",
};

export const getMimeValues = (): string[] => Object.values(mimeTypes);
