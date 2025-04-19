export interface FnRtBResponse {
  name_lastname: string;
  t_contract: string;
  cond_lab: string;
  oficina: string;
  cargo: string;
  profesion: string;
  n_rem: string;
  fecha_nac: string;
  dni: string;
  reg_lab: string;
  meta: string;
  lug_nac: string;
  est_civil: string;
  domicilio: string;
  fecha: string;
}

export type FpData = {
  ip: FnFpIp | null;
  di: FnFpDi | null;
  ec: FnFpEc | null;
  dh: FnFpDh | null;
  et_gr: FnFpEtGr | null;
  et: FnFpEt | null;
  c: FnFpC | null;
};

export type FpDataInput = {
  ip: FnFpIp | null;
  di?: FnFpDi | null;
  ec?: FnFpEc | null;
  dh?: FnFpDh | null;
  et_gr?: FnFpEtGr | null;
  et?: FnFpEt | null;
  c?: FnFpC | null;
};

export type FnFpIp = {
  apellido_paterno: string;
  apellido_materno: string;
  nombres: string;
  sexo: string;
  dni: string;
  edad: number;
  carnet_extranjeria: string;
  autogenerado: string;
  licencia_conducir: string;
  grupo_sanguineo: string;
  fecha_ingreso: string;
  unidad_trabajo: string;
  cargo: string;
  fecha_nacimiento: string;
  distrito: string;
  provincia: string;
  departamento: string;
  domicilio: string;
  celular: string;
  regimen: string;
  discapacidad: string;
  situacion: string;
  correo: string;
};

export type FnFpDi = {
  primaria: string;
  anio_primaria: string;
  secundaria: string;
  anio_secundaria: string;
  cetpro: string;
  anio_cetpro: string;
  educ_sup: string;
  profesion: string;
  facultad: string;
  anio_sup: string;
  universidad_sup: string;
  postgrado: string;
  anio_titulo: string;
  otros_estudios: string;
  universidad_otros: string;
};

export type FnFpEc = {
  estado: string;
  titulo_conyuge: string;
  conyuge_nombre: string;
  conyuge_nacimiento: string;
  conyuge_departamento: string;
  conyuge_provincia: string;
  conyuge_distrito: string;
  conyuge_instruccion: string;
  conyuge_dni: string;
};

export type FnFpDh = {
  n: string[];
  nombre: string[];
  lugar_fecha_nacimiento: string[];
  edad: (string | number)[];
  instruccion: string[];
};

export type FnFpEtGr = {
  centro_trabajo: string[];
  cargo: string[];
  documento: string[];
  periodo: string[];
};

export type FnFpEt = {
  centro_trabajo: string[];
  cargo: string[];
  documento: string[];
  periodo: string[];
};

export type FnFpC = {
  nro: string[];
  descripcion: string[];
  horas: string[];
  duracion: string[];
  periodo: string[];
};
