/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IParams {
  params: Promise<{ id: string }>;
}

interface IUsuario {
  id: string;
  nombres: string;
  apellidos: string;
  role: string;
  email: string;
  password: string;
  ubigeoId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface IDependencia {
  id: number;
  nombre: string;
  direccion: string;
  codigo: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface ICargo {
  id: number;
  nombre: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface IDiscapacidad {
  id: number;
  personalId: number;
  tipo: string;
  documentoSustento: string;
  organoEstructurado: string;
  condicionLaboral: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface IHijo {
  id: number;
  userId: string;
  personalId: number;
  fechaNacimiento: string;
  edad: number;
  gradoInstruccion: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPersonal {
  id: number;
  sexo: string;
  edad: number;
  dni: string;
  nAutogenerado: string;
  licenciaConducir: string;
  grupoSanguineo: string;
  fechaIngreso: string;
  unidadEstructurada: string;
  fechaNacimiento: string;
  aniosServicio: number;
  domicilio: string;
  interiorUrbanizacion: string;
  telefono: string;
  celular: string;
  regimenPensionario: string;
  nombreAfp: string;
  situacionLaboral: string;
  estadoCivil: string;
  discapacidad: boolean;
  status: string;
  cargoId: number;
  dependenciaId: number;
  conyugeId: number | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: IUsuario;
  dependencia: IDependencia;
  cargo: ICargo;
  discapacidades: IDiscapacidad[];
  hijos: IHijo[];
  estudios: any[];
  capacitaciones: any[];
  experiencias: any[];
  contratos: any[];
  renuncias: any[];
  desplazamientos: any[];
  descansos: any[];
  permisos: any[];
  ascensos: any[];
  bonificacionesPersonales: any[];
  bonificacionesFamiliares: any[];
  evaluaciones: any[];
  meritos: any[];
  demeritos: any[];
  actasCreadas: any[];
  actasRecibidas: any[];
}
