import React from "react";

export const ContentData = ({ user_id }: { user_id: string }) => {
  const formSections = [
    {
      section: "identificacion",
      title: "Identificación del personal",
      rows: [
        [
          { key: "apellido_paterno", label: "Apellido Paterno", value: "jalisto", colSpan: 3 },
          { key: "apellido_materno", label: "Apellido Materno", value: "ataucusi", colSpan: 3 },
          { key: "nombres", label: "Nombres", value: "noemi", colSpan: 4 },
          { key: "sexo", label: "Sexo", value: "M", colSpan: 1 },
          { key: "edad", label: "Edad", value: "22", colSpan: 1 },
        ],
        [
          { key: "dni", label: "D.N.I.", value: "45652514", colSpan: 2 },
          { key: "carnet_extranjeria", label: "Carnet de extranjería", value: "", colSpan: 2 },
          { key: "autogenerado", label: "N° de Autogenerado", value: "4", colSpan: 4 },
          { key: "licencia_conducir", label: "Licencia de Conducir", value: "NO", colSpan: 4 },
        ],
        [
          { key: "grupo_sanguineo", label: "Grupo Sanguíneo", value: "A POSITIVO", colSpan: 2 },
          { key: "fecha_ingreso", label: "Fecha de Ingreso", value: "03/04/2025", colSpan: 3 },
          { key: "unidad_trabajo", label: "Unidad Estructurada donde Trabaja", value: "Unidad de desarrollo civil", colSpan: 4 },
          { key: "cargo", label: "Cargo", value: "asistente del residente", colSpan: 3 },
        ],
        [
          { key: "fecha_nacimiento", label: "Fecha de Nacimiento", value: "03/04/2000", colSpan: 3 },
          { key: "distrito", label: "Distrito", value: "ayacucho", colSpan: 3 },
          { key: "provincia", label: "Provincia", value: "huamanga", colSpan: 3 },
          { key: "departamento", label: "Departamento/Región", value: "ayacucho", colSpan: 3 },
        ],
        [
          { key: "domicilio", label: "Domicilio Av./Jr./Calle", value: "asoc covadonga", colSpan: 4 },
          { key: "celular", label: "Celular", value: "", colSpan: 2 },
          { key: "regimen", label: "Régimen Pensionario", value: "D. L. N° 19990", colSpan: 3 },
          { key: "discapacidad", label: "Personal con discapacidad", value: "no", colSpan: 3 },
        ],
        [
          { key: "situacion", label: "Situación Laboral", value: "Contratado en CAS - Temporal D.L. 1057", colSpan: 6 },
          { key: "correo", label: "Correo Electrónico", value: "noemi.ataucusi@email.com", colSpan: 6 },
        ],
      ],
    },
    {
      section: "instruccion",
      title: "Datos de Instrucción",
      rows: [
        [
          { key: "primaria", label: "Educación Primaria", value: "Educación Primaria", colSpan: 2 },
          { key: "anio_primaria", label: "Año Del - Al", value: "Año Del - Al", colSpan: 2 },
          { key: "secundaria", label: "Educación Secundaria", value: "Educación Secundaria", colSpan: 2 },
          { key: "anio_secundaria", label: "Año Del - Al", value: "Año Del - Al", colSpan: 2 },
          { key: "cetpro", label: "CETPRO", value: "CETPRO", colSpan: 2 },
          { key: "anio_cetpro", label: "Año Del - Al", value: "Año Del - Al", colSpan: 2 },
        ],
        [
          { key: "educ_sup", label: "Educ. Sup./Universitaria/Técnica", value: "Educ. Sup./Universitaria/Técnica", colSpan: 3 },
          { key: "profesion", label: "Profesión", value: "Profesión", colSpan: 2 },
          { key: "facultad", label: "Facultad", value: "Facultad", colSpan: 2 },
          { key: "anio_sup", label: "Anio del - al", value: "Anio del - al", colSpan: 2 },
          { key: "universidad_sup", label: "Universidad / Inst. de A.E", value: "Universidad / Inst. de A.E", colSpan: 3 },
        ],
        [
          { key: "postgrado", label: "Post Grado (Especialización)", value: "Post Grado (Especialización)", colSpan: 4 },
          { key: "anio_titulo", label: "Año / Título", value: "Año / Título", colSpan: 2 },
          { key: "otros_estudios", label: "Otros Estudios con Certificación", value: "Otros Estudios con Certificación", colSpan: 3 },
          { key: "universidad_otros", label: "Universidad / Inst. de A.E", value: "Universidad / Inst. de A.E", colSpan: 3 },
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
        // Encabezado
        [
          { key: "idioma", label: "Idioma", value: "", colSpan: 3 },
          { key: "habla", label: "Habla", value: "", colSpan: 1 },
          { key: "lee", label: "Lee", value: "", colSpan: 1 },
          { key: "escribe", label: "Escribe", value: "", colSpan: 1 },
          { key: "no_sabe", label: "No sabe", value: "", colSpan: 2 },
          { key: "donde", label: "Dónde Aprendió y/o Estudió", value: "", colSpan: 4 },
        ],
        // 3 filas vacías
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

  return (
    <div className="flex flex-col gap-5 p-4 w-full">
      <p>{user_id}</p>

      {formSections.map((section) => (
        <div key={section.section} className="flex flex-col gap-2 p-2 w-full text-xs sm:text-sm">
          <p className="mb-2 font-bold uppercase">{section.title}</p>
          <div className="grid grid-cols-12 border-2 border-surface0">
            {section.rows.map((row, rowIndex) => {
              const isFullRow = row.length === 1 && row[0].colSpan === 12;

              return (
                <React.Fragment key={rowIndex}>
                  {isFullRow ? (
                    <div key={row[0].key} className={`col-span-12 p-2 border-2 font-text uppercase border-surface0`}>
                      {row[0].value}
                    </div>
                  ) : (
                    <>
                      {row.some((cell) => cell.label) &&
                        row.map((cell) =>
                          cell.label ? (
                            <div key={cell.key} className={`col-span-${cell.colSpan} p-1 py-2 border-2  font-semibold text-text border-surface0`}>
                              {cell.label}
                            </div>
                          ) : null
                        )}

                      {row.map((cell) => (
                        <div key={`${cell.key}-value`} className={`col-span-${cell.colSpan} p-2 border-2  border-t-0 text-subtext0 font-text border-surface0 text-xs uppercase`}>
                          {cell.value}
                        </div>
                      ))}
                    </>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
