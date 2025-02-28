import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { personalSchema } from "@/lib/schemas/personal.schema";
import { CustomError, handleError } from "@/middleware/errorHandler";
import { BadRequestError, NotFoundError } from "@/utils/customErrors";

export const GET = async (r: NextRequest) => {
  try {
    const { searchParams } = r.nextUrl;
    const sexo = searchParams.get("sexo");
    const dni = searchParams.get("dni");
    const regPen = searchParams.get("regimenPensionario");
    const nombres = searchParams.get("nombres");
    const apellidos = searchParams.get("apellidos");
    const userId = searchParams.get("userId");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (userId) where.userId = userId;
    if (userId) {
      const currentPersonal = await prisma.personal.findUnique({ where: { userId }, include: { dependencia: true, cargo: true, user: true } });
      if (!currentPersonal) throw NotFoundError("Personal no encontrado");
      if (!currentPersonal.user.ubigeoId) throw NotFoundError("Usuario no encontrado");

      const ubigeo = await prisma.ubigeo.findUnique({ where: { id: currentPersonal.user.ubigeoId } });
      if (!ubigeo) throw NotFoundError("Ubigeo no encontrado");

      const data = { ...currentPersonal, ubigeo };
      return NextResponse.json(data, { status: 200 });
    }

    if (sexo) where.sexo = sexo;
    if (dni) where.dni = dni;
    if (regPen) where.regimenPensionario = regPen;

    if (nombres) where.user = { nombres: { contains: nombres, mode: "insensitive" } };
    if (apellidos) where.user = { ...where.user, apellidos: { contains: apellidos, mode: "insensitive" } };

    const personals = await prisma.personal.findMany({ where, include: { user: true, dependencia: true, cargo: true } });

    if (!personals.length) throw NotFoundError("Personal(es) no encontrado(s)");

    return NextResponse.json(personals, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const values = await request.json();

    const result = personalSchema.safeParse(values);
    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message).join(", ");
      throw BadRequestError(errorMessages);
    }

    const validatedPersonal = result.data;

    const ubigeo = await prisma.ubigeo.findFirst({ where: { inei: validatedPersonal.ubigeo.inei } });
    if (!ubigeo) throw BadRequestError("El ubigeo proporcionado no existe.");

    const user = await prisma.user.findUnique({ where: { id: validatedPersonal.userId } });
    if (!user) throw BadRequestError("El usuario especificado no existe.");
    await prisma.user.update({ where: { id: user.id }, data: { ubigeoId: ubigeo.id } });

    let cargo = await prisma.cargo.findUnique({ where: { nombre: validatedPersonal.cargo.nombre } });
    if (!cargo) cargo = await prisma.cargo.create({ data: { nombre: validatedPersonal.cargo.nombre } });

    let dependencia = await prisma.dependencia.findUnique({ where: { nombre: validatedPersonal.dependencia.nombre } });
    if (!dependencia) {
      dependencia = await prisma.dependencia.create({
        data: {
          nombre: validatedPersonal.dependencia.nombre,
          direccion: validatedPersonal.dependencia.direccion,
          codigo: validatedPersonal.dependencia.codigo,
        },
      });
    }

    const personal = await prisma.personal.create({
      data: {
        sexo: validatedPersonal.sexo,
        dni: validatedPersonal.dni,
        nAutogenerado: validatedPersonal.nAutogenerado,
        licenciaConducir: validatedPersonal.licenciaConducir,
        grupoSanguineo: validatedPersonal.grupoSanguineo,
        fechaIngreso: validatedPersonal.fechaIngreso,
        fechaNacimiento: validatedPersonal.fechaNacimiento,
        unidadEstructurada: validatedPersonal.unidadEstructurada,
        nacionalidad: validatedPersonal.nacionalidad,
        domicilio: validatedPersonal.domicilio,
        interiorUrbanizacion: validatedPersonal.interiorUrbanizacion,
        telefono: validatedPersonal.telefono,
        celular: validatedPersonal.celular,
        regimenPensionario: validatedPersonal.regimenPensionario,
        nombreAfp: validatedPersonal.nombreAfp,
        situacionLaboral: validatedPersonal.situacionLaboral,
        estadoCivil: validatedPersonal.estadoCivil,
        discapacidad: validatedPersonal.discapacidad,
        cargoId: cargo.id,
        dependenciaId: dependencia.id,
        userId: user.id,
      },
    });

    return NextResponse.json(personal, { status: 201 });
  } catch (error: unknown) {
    console.log(error);
    return handleError(error as CustomError);
  }
};
