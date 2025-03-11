import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
  try {
    const ubigeoData = JSON.parse(fs.readFileSync("./src/helpers/ubigeo.json", "utf-8"));
    await prisma.ubigeo.createMany({ data: ubigeoData, skipDuplicates: true });

    const cargoData = JSON.parse(fs.readFileSync("./src/helpers/cargo.json", "utf-8"));
    await prisma.cargo.createMany({ data: cargoData, skipDuplicates: true });

    const dependenciaData = JSON.parse(fs.readFileSync("./src/helpers/dependencia.json", "utf-8"));
    await prisma.dependencia.createMany({ data: dependenciaData, skipDuplicates: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
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
