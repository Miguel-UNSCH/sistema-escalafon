"use server";

// import { existsSync } from "fs";
// import path from "path";

const HOST_BASE = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function fn_tex_compile(tipoReporte: string, nombreReporte: string): Promise<string> {
  // const zipPath = path.resolve(`src/files/data/reports/${tipoReporte}/${nombreReporte}.zip`);
  // if (!existsSync(zipPath)) throw new Error(`ZIP no encontrado en ${zipPath}`);

  const fileUrl = `${HOST_BASE}/api/reports/${tipoReporte}/${nombreReporte}.zip`;
  console.log(fileUrl);

  const latexUrl = `https://latexonline.cc/compile?url=${encodeURIComponent(fileUrl)}`;

  return latexUrl;
}
