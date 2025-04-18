import { FpDataInput } from "@/types/reports";

export const buildSections = ({ ip, di, ec, dh, et_gr, et, c }: FpDataInput) => {
  if (!ip) return [];

  const sections = [];

  sections.push({
    section: "identificacion",
    title: "Identificación del personal",
    rows: [
      [
        { key: "apellido_paterno", label: "Apellido Paterno", value: ip.apellido_paterno, colSpan: 3 },
        { key: "apellido_materno", label: "Apellido Materno", value: ip.apellido_materno, colSpan: 3 },
        { key: "nombres", label: "Nombres", value: ip.nombres, colSpan: 4 },
        { key: "sexo", label: "Sexo", value: ip.sexo, colSpan: 1 },
        { key: "edad", label: "Edad", value: ip.edad, colSpan: 1 },
      ],
      [
        { key: "dni", label: "D.N.I.", value: ip.dni, colSpan: 2 },
        { key: "carnet_extranjeria", label: "Carnet de extranjería", value: ip.carnet_extranjeria, colSpan: 2 },
        { key: "autogenerado", label: "N° de Autogenerado", value: ip.autogenerado, colSpan: 4 },
        { key: "licencia_conducir", label: "Licencia de Conducir", value: ip.licencia_conducir, colSpan: 4 },
      ],
      [
        { key: "grupo_sanguineo", label: "Grupo Sanguíneo", value: ip.grupo_sanguineo, colSpan: 2 },
        { key: "fecha_ingreso", label: "Fecha de Ingreso", value: ip.fecha_ingreso, colSpan: 3 },
        { key: "unidad_trabajo", label: "Unidad Estructurada donde Trabaja", value: ip.unidad_trabajo, colSpan: 4 },
        { key: "cargo", label: "Cargo", value: ip.cargo, colSpan: 3 },
      ],
      [
        { key: "fecha_nacimiento", label: "Fecha de Nacimiento", value: ip.fecha_nacimiento, colSpan: 3 },
        { key: "distrito", label: "Distrito", value: ip.distrito, colSpan: 3 },
        { key: "provincia", label: "Provincia", value: ip.provincia, colSpan: 3 },
        { key: "departamento", label: "Departamento/Región", value: ip.departamento, colSpan: 3 },
      ],
      [
        { key: "domicilio", label: "Domicilio Av./Jr./Calle", value: ip.domicilio, colSpan: 4 },
        { key: "celular", label: "Celular", value: ip.celular, colSpan: 2 },
        { key: "regimen", label: "Régimen Laboral", value: ip.regimen, colSpan: 3 },
        { key: "discapacidad", label: "Personal con discapacidad", value: ip.discapacidad, colSpan: 3 },
      ],
      [
        { key: "situacion", label: "Condición Laboral", value: ip.situacion, colSpan: 6 },
        { key: "correo", label: "Correo Electrónico", value: ip.correo, colSpan: 6 },
      ],
    ],
  });

  if (di) {
    sections.push({
      section: "instruccion",
      title: "Datos de Instrucción",
      rows: [
        [
          { key: "primaria", label: "Educación Primaria", value: di.primaria, colSpan: 2 },
          { key: "anio_primaria", label: "Año Del - Al", value: di.anio_primaria, colSpan: 2 },
          { key: "secundaria", label: "Educación Secundaria", value: di.secundaria, colSpan: 2 },
          { key: "anio_secundaria", label: "Año Del - Al", value: di.anio_secundaria, colSpan: 2 },
          { key: "cetpro", label: "CETPRO", value: di.cetpro, colSpan: 2 },
          { key: "anio_cetpro", label: "Año Del - Al", value: di.anio_cetpro, colSpan: 2 },
        ],
        [
          { key: "educ_sup", label: "Educ. Sup./Universitaria/Técnica", value: di.educ_sup, colSpan: 3 },
          { key: "profesion", label: "Profesión", value: di.profesion, colSpan: 2 },
          { key: "facultad", label: "Facultad", value: di.facultad, colSpan: 2 },
          { key: "universidad_sup", label: "Universidad / Inst. de A.E", value: di.universidad_sup, colSpan: 3 },
          { key: "anio_sup", label: "Anio del - al", value: di.anio_sup, colSpan: 2 },
        ],
        [
          { key: "postgrado", label: "Post Grado (Especialización)", value: di.postgrado, colSpan: 4 },
          { key: "anio_titulo", label: "Año / Título", value: di.anio_titulo, colSpan: 2 },
          { key: "otros_estudios", label: "Otros Estudios con Certificación", value: di.otros_estudios, colSpan: 3 },
          { key: "universidad_otros", label: "Universidad / Inst. de A.E", value: di.universidad_otros, colSpan: 3 },
        ],
      ],
    });
  }

  if (ec) {
    sections.push({
      section: "estado_civil",
      title: "Estado civil",
      rows: [
        [{ key: "estado", label: "", value: ec.estado, colSpan: 12 }],
        [{ key: "titulo_conyuge", label: "", value: ec.titulo_conyuge, colSpan: 12 }],
        [
          { key: "conyuge_nombre", label: "Apellidos y nombres", value: ec.conyuge_nombre, colSpan: 3 },
          { key: "conyuge_nacimiento", label: "Lugar y fecha de nacimiento", value: ec.conyuge_nacimiento, colSpan: 3 },
          { key: "conyuge_departamento", label: "Depto/Región", value: ec.conyuge_departamento, colSpan: 2 },
          { key: "conyuge_provincia", label: "Provincia", value: ec.conyuge_provincia, colSpan: 2 },
          { key: "conyuge_distrito", label: "Distrito", value: ec.conyuge_distrito, colSpan: 2 },
        ],
        [
          { key: "conyuge_instruccion", label: "Grado de instrucción", value: ec.conyuge_instruccion, colSpan: 6 },
          { key: "conyuge_dni", label: "DNI", value: ec.conyuge_dni, colSpan: 6 },
        ],
      ],
    });
  }

  if (dh) {
    sections.push({
      section: "datos_hijos",
      title: "Datos de los hijos",
      table: [
        { key: "n", label: "Nº", value: dh.n, colSpan: 1 },
        { key: "nombre", label: "Apellidos y Nombres", value: dh.nombre, colSpan: 4 },
        { key: "lugar_fecha_nacimiento", label: "Lugar y fecha de nacimiento", value: dh.lugar_fecha_nacimiento, colSpan: 4 },
        { key: "edad", label: "Edad", value: dh.edad, colSpan: 1 },
        { key: "instruccion", label: "Grado de Instrucción", value: dh.instruccion, colSpan: 2 },
      ],
    });
  }

  if (et_gr) {
    sections.push({
      section: "experiencia_trabajo_gr",
      title: "Experiencia de trabajo dentro del gobierno regional",
      table: [
        { key: "centro_trabajo", label: "dependencia / oficina", value: et_gr.centro_trabajo, colSpan: 3 },
        { key: "cargo", label: "cargo", value: et_gr.cargo, colSpan: 3 },
        { key: "documento", label: "documento que sustenta", value: et_gr.documento, colSpan: 4 },
        { key: "periodo", label: "periodo", value: et_gr.periodo, colSpan: 2 },
      ],
    });
  }

  if (et) {
    sections.push({
      section: "experiencia_trabajo",
      title: "Experiencia de trabajo",
      table: [
        { key: "centro_trabajo", label: "Centro de Trabajo", value: et.centro_trabajo, colSpan: 3 },
        { key: "cargo", label: "Cargo", value: et.cargo, colSpan: 2 },
        { key: "documento", label: "Documento que sustenta", value: et.documento, colSpan: 4 },
        { key: "periodo", label: "Año que laboró", value: et.periodo, colSpan: 3 },
      ],
    });
  }

  if (c) {
    sections.push({
      section: "capacitacion_reciente",
      title: "Capacitación de los dos últimos años",
      table: [
        { key: "nro", label: "Nº", value: c.nro, colSpan: 1 },
        { key: "descripcion", label: "Descripción", value: c.descripcion, colSpan: 5 },
        { key: "horas", label: "Horas Lectivas", value: c.horas, colSpan: 1 },
        { key: "duracion", label: "Duración", value: c.duracion, colSpan: 2 },
        { key: "periodo", label: "Periodo", value: c.periodo, colSpan: 3 },
      ],
    });
  }

  return sections;
};

/** {section: "idiomas",title: "Idiomas",rows: [[{ key: "idioma", label: "Idioma", value: "", colSpan: 3 },{ key: "habla", label: "Habla", value: "", colSpan: 1 },{ key: "lee", label: "Lee", value: "", colSpan: 1 },{ key: "escribe", label: "Escribe", value: "", colSpan: 1 },{ key: "no_sabe", label: "No sabe", value: "", colSpan: 2 },{ key: "donde", label: "Dónde Aprendió y/o Estudió", value: "", colSpan: 4 },],...Array.from({ length: 3 }).map((_, i) => [{ key: `idioma-${i}`, label: "", value: "", colSpan: 3 },{ key: `habla-${i}`, label: "", value: "", colSpan: 1 },{ key: `lee-${i}`, label: "", value: "", colSpan: 1 },{ key: `escribe-${i}`, label: "", value: "", colSpan: 1 },{ key: `no_sabe-${i}`, label: "", value: "", colSpan: 2 },{ key: `donde-${i}`, label: "", value: "", colSpan: 4 },]),],},  */
