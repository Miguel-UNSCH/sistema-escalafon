import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "fs";

const prisma = new PrismaClient();

function getInitials(text: string) {
  return text
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

async function main() {
  try {
    const ubigeoData = JSON.parse(fs.readFileSync("./src/helpers/ubigeo.json", "utf-8"));
    await prisma.ubigeo.createMany({ data: ubigeoData, skipDuplicates: true });

    const cargoData = JSON.parse(fs.readFileSync("./src/helpers/cargo.json", "utf-8"));
    await prisma.cargo.createMany({ data: cargoData, skipDuplicates: true });

    const dependenciaData = JSON.parse(fs.readFileSync("./src/helpers/dependencia.json", "utf-8"));
    await prisma.dependencia.createMany({ data: dependenciaData, skipDuplicates: true });

    const existingAdmin = await prisma.user.findUnique({
      where: { email: "ADMIN@REGIONAYACUCHO.EDU" },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);

      await prisma.user.create({
        data: {
          name: "ADMIN",
          last_name: "SISTEMA",
          email: "ADMIN@REGIONAYACUCHO.EDU",
          dni: "00000000",
          password: hashedPassword,
          role: "admin",
          must_change_pwd: 0,
          modification_end_time: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        },
      });
    }

    // 2. Cargar archivo de cargo-dependencias
    const cdData: {
      dependencia: string;
      cargos: string[];
    }[] = JSON.parse(fs.readFileSync("./src/helpers/cargo-dependencias.json", "utf-8"));

    for (const item of cdData) {
      const { dependencia, cargos } = item;

      const dependenciaNombre = dependencia.trim();

      // Buscar si ya existe la dependencia por nombre
      let dependenciaDb = await prisma.dependencia.findUnique({
        where: { nombre: dependenciaNombre },
      });

      if (!dependenciaDb) {
        let dependenciaCodigo = getInitials(dependenciaNombre);

        // Verificar si ya existe el mismo codigo
        const existingCodigo = await prisma.dependencia.findUnique({
          where: { codigo: dependenciaCodigo },
        });

        // Si ya existe un dependencia con ese código, agregamos un sufijo
        if (existingCodigo) {
          dependenciaCodigo = `${dependenciaCodigo}_${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
        }

        dependenciaDb = await prisma.dependencia.create({
          data: {
            nombre: dependenciaNombre,
            codigo: dependenciaCodigo,
            direccion: "sede central",
          },
        });
      }

      for (const cargoNombreRaw of cargos) {
        const cargoNombre = cargoNombreRaw.trim();

        // Buscar o crear cargo
        const cargoDb = await prisma.cargo.upsert({
          where: { nombre: cargoNombre },
          update: {},
          create: { nombre: cargoNombre },
        });

        // Asociar cargo y dependencia si no existe aún
        await prisma.cargoDependencia.upsert({
          where: {
            cargoId_dependenciaId: {
              cargoId: cargoDb.id,
              dependenciaId: dependenciaDb.id,
            },
          },
          update: {},
          create: {
            cargoId: cargoDb.id,
            dependenciaId: dependenciaDb.id,
          },
        });
      }
    }
  } catch (error) {
    // oxlint-disable-next-line no-console
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
