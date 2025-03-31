import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
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

    // Crear usuario por defecto (admin)
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

      // oxlint-disable-next-line no-console
      console.log("✅ Usuario admin creado");
    } else {
      // oxlint-disable-next-line no-console
      console.log("Usuario admin ya existe");
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
