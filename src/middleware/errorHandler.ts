import { NextResponse } from "next/server";

export interface CustomError extends Error {
  statusCode: number;
  message: string;
}

export const handleError = (error: CustomError) => {
  // Si el error tiene código de estado y mensaje, retornamos ese error
  if (error.statusCode && error.message) return NextResponse.json({ error: error.message }, { status: error.statusCode });

  // Si el error no tiene una estructura estándar, lo tratamos como un error interno
  console.error(error); // Log para depuración
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
};
