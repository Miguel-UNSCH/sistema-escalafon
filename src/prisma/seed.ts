import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
  // Leer el archivo JSON
  const ubigeoData = JSON.parse(fs.readFileSync("./src/helpers/ubigeo.json", "utf-8"));

  console.log(`Cargando ${ubigeoData.length} registros de Ubigeo...`);

  // Insertar datos en la base de datos
  await prisma.ubigeo.createMany({
    data: ubigeoData,
    skipDuplicates: true, // Evita errores si los datos ya existen
  });

  // await Promise.all(
  //   ubigeoData.map(async (ubigeo) => {
  //     await prisma.ubigeo.upsert({
  //       where: { inei: ubigeo.inei },
  //       update: ubigeo, // Si existe, actualiza los datos
  //       create: ubigeo, // Si no existe, crea el registro
  //     });
  //   })
  // );

  console.log("Carga de Ubigeo completada.");
}

main()
  .catch((e) => {
    console.error("Error al ejecutar el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

/**
 * Ejecutar el seed en desarrollo
 * Corre el comando para ejecutar la semilla:
 * npx prisma db seed
 *
 * Si necesitas resetear la base de datos y volver a correr el seed:
 * npx prisma migrate reset
 * Esto eliminará todos los datos y volverá a migrar y ejecutar el seed.
 */

/**
 * Ejecutar el seed en producción
 * Cuando hagas un despliegue, puedes agregar este comando después de correr las migraciones en tu CI/CD:
 * npx prisma migrate deploy && npx prisma db seed
 * Si usas Vercel, Railway o Docker, asegúrate de que el comando de seed se ejecute después de aplicar las migraciones.
 */
