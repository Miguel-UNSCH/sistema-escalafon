import { FnFpDi, FnFpIp } from "@/actions/reports-action";

export const buildSections = (fp_ip: FnFpIp, fp_di?: FnFpDi | null) => [
  {
    section: "identificacion",
    title: "Identificación del personal",
    rows: [
      [
        { key: "apellido_paterno", label: "Apellido Paterno", value: fp_ip?.apellido_paterno, colSpan: 3 },
        { key: "apellido_materno", label: "Apellido Materno", value: fp_ip?.apellido_materno, colSpan: 3 },
        { key: "nombres", label: "Nombres", value: fp_ip?.nombres, colSpan: 4 },
        { key: "sexo", label: "Sexo", value: fp_ip?.sexo, colSpan: 1 },
        { key: "edad", label: "Edad", value: fp_ip?.edad, colSpan: 1 },
      ],
      [
        { key: "dni", label: "D.N.I.", value: fp_ip?.dni, colSpan: 2 },
        { key: "carnet_extranjeria", label: "Carnet de extranjería", value: fp_ip?.carnet_extranjeria, colSpan: 2 },
        { key: "autogenerado", label: "N° de Autogenerado", value: fp_ip?.autogenerado, colSpan: 4 },
        { key: "licencia_conducir", label: "Licencia de Conducir", value: fp_ip?.licencia_conducir, colSpan: 4 },
      ],
      [
        { key: "grupo_sanguineo", label: "Grupo Sanguíneo", value: fp_ip?.grupo_sanguineo, colSpan: 2 },
        { key: "fecha_ingreso", label: "Fecha de Ingreso", value: fp_ip?.fecha_ingreso, colSpan: 3 },
        { key: "unidad_trabajo", label: "Unidad Estructurada donde Trabaja", value: fp_ip?.unidad_trabajo, colSpan: 4 },
        { key: "cargo", label: "Cargo", value: fp_ip?.cargo, colSpan: 3 },
      ],
      [
        { key: "fecha_nacimiento", label: "Fecha de Nacimiento", value: fp_ip?.fecha_nacimiento, colSpan: 3 },
        { key: "distrito", label: "Distrito", value: fp_ip?.distrito, colSpan: 3 },
        { key: "provincia", label: "Provincia", value: fp_ip?.provincia, colSpan: 3 },
        { key: "departamento", label: "Departamento/Región", value: fp_ip?.departamento, colSpan: 3 },
      ],
      [
        { key: "domicilio", label: "Domicilio Av./Jr./Calle", value: fp_ip?.domicilio, colSpan: 4 },
        { key: "celular", label: "Celular", value: fp_ip?.celular, colSpan: 2 },
        { key: "regimen", label: "Régimen Laboral", value: fp_ip?.regimen, colSpan: 3 },
        { key: "discapacidad", label: "Personal con discapacidad", value: fp_ip?.discapacidad, colSpan: 3 },
      ],
      [
        { key: "situacion", label: "Condición Laboral", value: fp_ip?.situacion, colSpan: 6 },
        { key: "correo", label: "Correo Electrónico", value: fp_ip?.correo, colSpan: 6 },
      ],
    ],
  },
  {
    section: "instruccion",
    title: "Datos de Instrucción",
    rows: [
      [
        { key: "primaria", label: "Educación Primaria", value: fp_di?.primaria ?? "", colSpan: 2 },
        { key: "anio_primaria", label: "Año Del - Al", value: fp_di?.anio_primaria ?? "", colSpan: 2 },
        { key: "secundaria", label: "Educación Secundaria", value: fp_di?.secundaria ?? "", colSpan: 2 },
        { key: "anio_secundaria", label: "Año Del - Al", value: fp_di?.anio_secundaria ?? "", colSpan: 2 },
        { key: "cetpro", label: "CETPRO", value: fp_di?.cetpro ?? "", colSpan: 2 },
        { key: "anio_cetpro", label: "Año Del - Al", value: fp_di?.anio_cetpro ?? "", colSpan: 2 },
      ],
      [
        { key: "educ_sup", label: "Educ. Sup./Universitaria/Técnica", value: fp_di?.educ_sup ?? "", colSpan: 3 },
        { key: "profesion", label: "Profesión", value: fp_di?.profesion ?? "", colSpan: 2 },
        { key: "facultad", label: "Facultad", value: fp_di?.facultad ?? "", colSpan: 2 },
        { key: "anio_sup", label: "Anio del - al", value: fp_di?.anio_sup ?? "", colSpan: 2 },
        { key: "universidad_sup", label: "Universidad / Inst. de A.E", value: fp_di?.universidad_sup ?? "", colSpan: 3 },
      ],
      [
        { key: "postgrado", label: "Post Grado (Especialización)", value: fp_di?.postgrado ?? "", colSpan: 4 },
        { key: "anio_titulo", label: "Año / Título", value: fp_di?.anio_titulo ?? "", colSpan: 2 },
        { key: "otros_estudios", label: "Otros Estudios con Certificación", value: fp_di?.otros_estudios ?? "", colSpan: 3 },
        { key: "universidad_otros", label: "Universidad / Inst. de A.E", value: fp_di?.universidad_otros ?? "", colSpan: 3 },
      ],
    ],
  },
  {
    section: "estado_civil",
    title: "Estado civil",
    rows: [
      [{ key: "estado", label: "", value: "casado", colSpan: 12 }],
      [{ key: "titulo_conyuge", label: "", value: "datos del conyuge", colSpan: 12 }],
      [
        { key: "conyuge_nombre", label: "Apellidos y nombres", value: "Apellidos y nombres", colSpan: 3 },
        { key: "conyuge_nacimiento", label: "Lugar y fecha de nacimiento", value: "lugar y fecha de nacimiento", colSpan: 3 },
        { key: "conyuge_departamento", label: "Depto/Región", value: "depto/region", colSpan: 2 },
        { key: "conyuge_provincia", label: "Provincia", value: "provincia", colSpan: 2 },
        { key: "conyuge_distrito", label: "Distrito", value: "distrito", colSpan: 2 },
      ],
      [
        { key: "conyuge_instruccion", label: "Grado de instrucción", value: "grado de instruccion", colSpan: 6 },
        { key: "conyuge_dni", label: "DNI", value: "dni", colSpan: 6 },
      ],
    ],
  },
  {
    section: "datos_hijos",
    title: "Datos de los hijos",
    rows: [
      [
        { key: "n", label: "Nº", value: "", colSpan: 1 },
        { key: "nombre", label: "Apellidos y Nombres", value: "", colSpan: 4 },
        { key: "lugar_fecha_nacimiento", label: "Lugar y fecha de nacimiento", value: "", colSpan: 4 },
        { key: "edad", label: "Edad", value: "", colSpan: 1 },
        { key: "instruccion", label: "Grado de Instrucción", value: "", colSpan: 2 },
      ],
      ...Array.from({ length: 5 }).map((_, i) => [
        { key: `n-${i}`, label: "", value: `${i + 1}`, colSpan: 1 },
        { key: `nombre-${i}`, label: "", value: "", colSpan: 4 },
        { key: `lugar_fecha_nacimiento-${i}`, label: "", value: "", colSpan: 4 },
        { key: `edad-${i}`, label: "", value: "", colSpan: 1 },
        { key: `instruccion-${i}`, label: "", value: "", colSpan: 2 },
      ]),
    ],
  },
  {
    section: "experiencia_trabajo",
    title: "Experiencia de trabajo",
    rows: [
      [
        { key: "centro_trabajo", label: "Centro de Trabajo", value: "", colSpan: 3 },
        { key: "cargo", label: "Cargo", value: "", colSpan: 3 },
        { key: "documento", label: "Documento que sustenta", value: "", colSpan: 4 },
        { key: "anio", label: "Año que laboró", value: "", colSpan: 2 },
      ],
      ...Array.from({ length: 5 }).map((_, i) => [
        { key: `centro-${i}`, label: "", value: "", colSpan: 3 },
        { key: `cargo-${i}`, label: "", value: "", colSpan: 3 },
        { key: `documento-${i}`, label: "", value: "", colSpan: 4 },
        { key: `anio-${i}`, label: "", value: "", colSpan: 2 },
      ]),
    ],
  },
  {
    section: "idiomas",
    title: "Idiomas",
    rows: [
      [
        { key: "idioma", label: "Idioma", value: "", colSpan: 3 },
        { key: "habla", label: "Habla", value: "", colSpan: 1 },
        { key: "lee", label: "Lee", value: "", colSpan: 1 },
        { key: "escribe", label: "Escribe", value: "", colSpan: 1 },
        { key: "no_sabe", label: "No sabe", value: "", colSpan: 2 },
        { key: "donde", label: "Dónde Aprendió y/o Estudió", value: "", colSpan: 4 },
      ],
      ...Array.from({ length: 3 }).map((_, i) => [
        { key: `idioma-${i}`, label: "", value: "", colSpan: 3 },
        { key: `habla-${i}`, label: "", value: "", colSpan: 1 },
        { key: `lee-${i}`, label: "", value: "", colSpan: 1 },
        { key: `escribe-${i}`, label: "", value: "", colSpan: 1 },
        { key: `no_sabe-${i}`, label: "", value: "", colSpan: 2 },
        { key: `donde-${i}`, label: "", value: "", colSpan: 4 },
      ]),
    ],
  },
  {
    section: "capacitacion_reciente",
    title: "Capacitación de los dos últimos años",
    rows: [
      [
        { key: "nro", label: "Nº", value: "", colSpan: 1 },
        { key: "descripcion", label: "Descripción", value: "", colSpan: 5 },
        { key: "horas", label: "Horas Lectivas", value: "", colSpan: 2 },
        { key: "duracion", label: "Duración", value: "", colSpan: 2 },
        { key: "fecha", label: "Fecha", value: "", colSpan: 2 },
      ],
      ...Array.from({ length: 5 }).map((_, i) => [
        { key: `nro-${i}`, label: "", value: `${i + 1}`, colSpan: 1 },
        { key: `descripcion-${i}`, label: "", value: "", colSpan: 5 },
        { key: `horas-${i}`, label: "", value: "", colSpan: 2 },
        { key: `duracion-${i}`, label: "", value: "", colSpan: 2 },
        { key: `fecha-${i}`, label: "", value: "", colSpan: 2 },
      ]),
    ],
  },
];
