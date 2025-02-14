import { errMessages } from "@/helpers";
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
        User: true,
        DependenciaOficina: true,
        Cargo: true,
        Discapacidad: true,
        hijos: true,
        estudios: true,
        capacitaciones: true,
        experiencias: true,
        contratos: true,
        RenunciaLiquidacion: true,
        Desplazamiento: true,
        DescansoMedico: true,
        PermisoLicenciaVacacion: true,
        Ascenso: true,
        BonificacionPersonal: true,
        BonificacionFamiliar: true,
        FichaEvaluacion: true,
        Merito: true,
        Demerito: true,
        actasEntregadas: true,
        actasRecibidas: true,
      },
    });

    if (!personals.length) throw NotFoundError("Personal(es) no encontrado(s)");

    return NextResponse.json(personals, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};

export const POST = async (r: NextRequest) => {
  try {
    const values = await r.json();

    const { data, success, error } = personalSchema.safeParse(values);
    if (!success) throw BadRequestError(errMessages(error));

    const currentUser = await prisma.user.findFirst({ where: { nombres: data.nombres } });
    if (!currentUser) throw BadRequestError("El usuario no existe");

    let ubigeoId = null;
    if (data.departamento && data.provincia && data.distrito) {
      const ubigeo = await prisma.ubigeo.findFirst({
        where: { departamento: data.departamento, provincia: data.provincia, distrito: data.distrito },
      });
      if (!ubigeo) throw BadRequestError("Ubigeo no encontrado");
      ubigeoId = ubigeo.id;
    } else if (data.inei || data.reniec) {
      const ubigeo = await prisma.ubigeo.findFirst({ where: { inei: data.inei || undefined, reniec: data.reniec || undefined } });
      if (!ubigeo) throw BadRequestError("Ubigeo no encontrado por INEI/RENIEC");
      ubigeoId = ubigeo.id;
    }

    await prisma.user.update({ where: { id: currentUser.id }, data: { ubigeoId } });

    const dependenciaOficina = await prisma.dependenciaOficina.findFirst({ where: { nombre: data.dependencia } });
    if (!dependenciaOficina) throw BadRequestError("Dependencia no encontrada");

    const cargo = await prisma.cargo.findFirst({ where: { nombre: data.cargo } });
    if (!cargo) throw BadRequestError("Cargo no encontrado");

    const personalData = {
      userId: currentUser.id,
      cargoId: cargo.id,
      dependenciaOficinaId: dependenciaOficina.id,
      sexo: data.sexo,
      edad: data.edad,
      dni: data.dni,
      nAutogenerado: data.nAutogenerado,
      licenciaConducir: data.licenciaConducir,
      grupoSanguineo: data.grupoSanguineo,
      fechaIngreso: data.fechaIngreso,
      unidadEstructurada: data.unidadEstructurada,
      fechaNacimiento: data.fechaNacimiento,
      nacionalidad: data.nacionalidad,
      domicilio: data.domicilio,
      interiorUrbanizacion: data.interiorUrbanizacion,
      telefono: data.telefono,
      celular: data.celular,
      regimenPensionario: data.regimenPensionario,
      nombreAfp: data.nombreAfp,
      situacionLaboral: data.situacionLaboral,
      estadoCivil: data.estadoCivil,
      discapacidad: data.discapacidad,
    };

    const personal = await prisma.personal.create({ data: personalData });

    await prisma.user.update({ where: { id: currentUser.id }, data: { personalId: personal.id } });

    return NextResponse.json(personal, { status: 201 });
  } catch (error: unknown) {
    console.error("Error:", error);
    return handleError(error as CustomError);
  }
};
