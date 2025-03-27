export const estadoCivilOp = [
  { key: "s", value: "SOLTERO" },
  { key: "c", value: "CASADO" },
  { key: "d", value: "DIVORCIADO" },
  { key: "v", value: "VIUDO" },
];

export const grupoSanguineoOp = [
  { key: "a_positivo", value: "A+" },
  { key: "a_negativo", value: "A-" },
  { key: "b_positivo", value: "B+" },
  { key: "b_negativo", value: "B-" },
  { key: "ab_positivo", value: "AB+" },
  { key: "ab_negativo", value: "AB-" },
  { key: "o_positivo", value: "O+" },
  { key: "o_negativo", value: "O-" },
];

export const sexoOp = [
  { key: "m", value: "MASCULINO" },
  { key: "f", value: "FEMENINO" },
];

export const TContratoOp = [
  { key: "dl_276", value: "DL 276" },
  { key: "cas", value: "CAS" },
  { key: "pro_inv", value: "DL 276 PROYECTO DE INVERSION" },
  { key: "pra", value: "PRACTICANTE" },
];

export const cond_lab_op = {
  dl_276: [
    { key: "dl_con", value: "CONTRATADO" },
    { key: "dl_nom", value: "NOMBRADO" },
    { key: "dl_cps", value: "CONTRATADO POR SUPLENCIA" },
    { key: "dl_rpmj", value: "REINCORPORADO POR MANDATO JUDICIAL" },
    { key: "dl_cpsj", value: "CONTRATO PERMANENTE - MANDATATO JUDICIAL" },
  ],
  cas: [
    { key: "cas_ind", value: "INDETERMINADO" },
    { key: "cas_tem", value: "TEMPORAL" },
    { key: "cas_sup", value: "SUPLENCIA" },
    { key: "cas_tra", value: "TRANSITORIA" },
  ],
  pro_inv: [
    { key: "pi_con", value: "CONTRATADO" },
    { key: "pi_prmj", value: "PERSONAL RETORNANTE CON MANDATO JUDICIAL" },
  ],
  pra: [
    { key: "pra_pre", value: "PREPROFESIONAL" },
    { key: "pra_pro", value: "PROFESIONAL" },
  ],
};

export const reg_lab_op = {
  dl_276: [{ key: "dl_276", value: "DL 276" }],
  cas: [{ key: "cas_7057", value: "CAS 7057" }],
  pro_inv: [
    { key: "pi_276", value: "PROYECTO DE INVERSION 276" },
    { key: "pi_728", value: "PROYECTO DE INVERSION 278" },
  ],
};

export const tipoDesplazamientoOp = [
  { key: "ri", value: "ROTACIÓN INTERNA" },
  { key: "rv", value: "ROTACIÓN VOLUNTARIA" },
  { key: "r", value: "REUBICACIÓN" },
  { key: "d", value: "DESTACAMENTO" },
  { key: "p", value: "PERMUTA" },
];

export const tipoDescansoOp = [
  { key: "m", value: "MATERNIDAD" },
  { key: "p", value: "PATERNIDAD" },
  { key: "it", value: "INCAPACIDAD TEMPORAL" },
];

export const tipoPermisoLicenciaVacacionOp = [
  { key: "per_mot", value: "MOTIVO PERSONAL" },
  { key: "per_enf", value: "PERMISO POR ENFERMEDAD (CONYUGE - PARIENTE)" },
  { key: "per_hon", value: "PERMISO POR HONONASTICOS" },
  { key: "per_cap", value: "PERMISO POR CAPACITACION" },
  { key: "per_lac", value: "PERMISO POR LACTANCIA" },
  { key: "lic_sgh", value: "LICENCIA SIN GOCE DE HABERES" },
  { key: "lic_cgh", value: "LICENCIA CON GOCE DE HABERES" },
  { key: "lic_vac", value: "LICENCIA POR VACACIONES" },
  { key: "vac", value: "VACACIONES" },
];

export const gradoInstruccionOp = [
  { key: "sin", value: "SIN INSTRUCCIÓN" },
  { key: "pc", value: "PRIMARIA COMPLETA" },
  { key: "pi", value: "PRIMARIA INCOMPLETA" },
  { key: "sc", value: "SECUNDARIA COMPLETA" },
  { key: "si", value: "SECUNDARIA INCOMPLETA" },
  { key: "tec", value: "TÉCNICO" },
  { key: "uni", value: "UNIVERSITARIO" },
  { key: "pos", value: "POSGRADO" },
  { key: "null", value: "PREFIERO NO DECIRLO" },
];

export const nivelEducativoOp = [
  { key: "p", value: "PRIMARIA" },
  { key: "s", value: "SECUNDARIA" },
  { key: "t", value: "TECNICO" },
  { key: "u", value: "UNIVERSITARIO" },
  { key: "m", value: "MAESTRIA" },
  { key: "d", value: "DOCTORADO" },
  { key: "e", value: "ESPECIALIZACION" },
];

export const tDscapacidadOp = [
  { key: "sen", value: "SENSORIAL" },
  { key: "mot", value: "MOTRIZ" },
  { key: "int", value: "INTELECTUAL" },
  { key: "psi", value: "PSICOLOGICO" },
  { key: "mul", value: "MULTIPLE" },
];

export const tCapacitacionOp = [
  { key: "dip", value: "DIPLOMADO" },
  { key: "cur_cap", value: "CURSOS DE CAPACITACION" },
  { key: "cert", value: "CERTIFICADO" },
  { key: "cons", value: "CONSTANCIA" },
];

export const entidad_certificadoraOp = [
  { key: "min", value: "MINSA" },
  { key: "ess", value: "ESSALUD" },
  { key: "cod", value: "CONADIS" },
];

export const tipo_docOp = [
  { key: "mem", value: "MEMORANDO" },
  { key: "ofi", value: "OFICIO" },
  { key: "act", value: "ACTA" },
];

export const tipo_sancionOp = [
  { key: "amo_ver", value: "AMONESTACIÓN VERBAL" },
  { key: "amo_esc", value: "AMONESTACIÓN ESCRITA" },
  { key: "sus", value: "SUSPENSIÓN DE LABOR SIN GOCE DE HABERES" },
  { key: "dest", value: "DESTITUCIÓN" },
];
