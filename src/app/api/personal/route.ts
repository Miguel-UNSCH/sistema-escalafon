import { prisma } from "@/lib/prisma";
import { personalSchema } from "@/lib/schemas/personal.schema";
import { CustomError, handleError } from "@/middleware/errorHandler";
import { BadRequestError, NotFoundError } from "@/utils/customErrors";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (r: NextRequest) => {
  try {
    const { searchParams } = r.nextUrl;
    const sexo = searchParams.get("sexo");
    const edad = searchParams.get("edad");
    const dni = searchParams.get("dni");
    const gSang = searchParams.get("grupoSanguineo");
    const regPen = searchParams.get("regimenPensionario");
    const sCivil = searchParams.get("estadoCivil");
    const nombres = searchParams.get("nombres");
    const apellidos = searchParams.get("apellidos");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (sexo) where.sexo = sexo;
    if (edad) where.edad = parseInt(edad, 10);
    if (dni) where.dni = dni;
    if (gSang) where.grupoSanguineo = gSang;
    if (regPen) where.regimenPensionario = { contains: regPen };
    if (sCivil) where.estadoCivil = sCivil;

    if (nombres) where.User = { nombres: { contains: nombres, mode: "insensitive" } };

    if (apellidos) where.User = { ...where.User, apellidos: { contains: apellidos, mode: "insensitive" } };

    const personals = await prisma.personal.findMany({
      where,
      include: {
        user: true,
        dependencia: true,
        cargo: true,
        discapacidades: true,
        hijos: true,
        estudios: true,
        capacitaciones: true,
        experiencias: true,
        contratos: true,
        renuncias: true,
        desplazamientos: true,
        descansos: true,
        permisos: true,
        ascensos: true,
        bonificacionesPersonales: true,
        bonificacionesFamiliares: true,
        evaluaciones: true,
        meritos: true,
        demeritos: true,
        actasCreadas: true,
        actasRecibidas: true,
      },
    });

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

    const ubigeo = await prisma.ubigeo.findFirst({
      where: {
        departamento: { equals: validatedPersonal.ubigeo.departamento, mode: "insensitive" },
        provincia: { equals: validatedPersonal.ubigeo.provincia, mode: "insensitive" },
        distrito: { equals: validatedPersonal.ubigeo.distrito, mode: "insensitive" },
      },
    });
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
    console.log(validatedPersonal);

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
    return handleError(error as CustomError);
  }
};
