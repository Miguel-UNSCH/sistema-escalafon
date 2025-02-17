import { NextResponse } from "next/server";

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const handleError = (error: CustomError) =>
  NextResponse.json({ error: error.message || "Internal Server Error" }, { status: error.statusCode || 500 });
