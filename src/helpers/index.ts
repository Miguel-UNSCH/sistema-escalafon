type ErrorObject = {
  code: string;
  minimum: number;
  type: string;
  inclusive: boolean;
  exact: boolean;
  message: string;
  path: string[];
};

export const errMessages = (err: { message?: string }): string => {
  // Parseamos el mensaje de error y aseguramos que sea un arreglo de objetos tipo ErrorObject
  const error: ErrorObject[] = JSON.parse(err?.message || "[]"); // Si err.message es undefined, se usa un arreglo vacío

  // Devolvemos el mensaje concatenado de todos los objetos
  return error.map((obj) => obj.message).join(" & ");
};
