import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
  try {
    // Cargar datos de Ubigeo
    const ubigeoData = JSON.parse(fs.readFileSync("./src/helpers/ubigeo.json", "utf-8"));
    console.log(`Cargando ${ubigeoData.length} registros de Ubigeo...`);
    await prisma.ubigeo.createMany({ data: ubigeoData, skipDuplicates: true });
    console.log("Carga de Ubigeo completada.");

    // Cargar datos de Cargo
    const cargoData = JSON.parse(fs.readFileSync("./src/helpers/cargo.json", "utf-8"));
    console.log(`Cargando ${cargoData.length} registros de Cargo...`);
    await prisma.cargo.createMany({ data: cargoData, skipDuplicates: true });
    console.log("Carga de Cargo completada.");

    // Cargar datos de Dependencia
    const dependenciaData = JSON.parse(fs.readFileSync("./src/helpers/dependencia.json", "utf-8"));
    console.log(`Cargando ${dependenciaData.length} registros de Dependencia...`);
    await prisma.dependencia.createMany({ data: dependenciaData, skipDuplicates: true });
    console.log("Carga de Dependencia completada.");
  } catch (error) {
    console.error("Error al ejecutar el seed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

/**
 * Ejecutar el seed en desarrollo:
 * npx prisma db seed
 *
 * Resetear la base de datos y volver a correr el seed:
 * npx prisma migrate reset
 *
 * Ejecutar el seed en producción:
 * npx prisma migrate deploy && npx prisma db seed
 */
