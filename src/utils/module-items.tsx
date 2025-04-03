import { ModuleChildren } from "@/app/(protected)/dashboard/user/[id]/children-data";
import { ModuleConyuge } from "@/app/(protected)/dashboard/user/[id]/conyuge-data";
import { ModuleDisability } from "@/app/(protected)/dashboard/user/[id]/disability-data";
import { ModuleExp } from "@/app/(protected)/dashboard/user/[id]/exp-data";
import { ModulePersonal } from "@/app/(protected)/dashboard/user/[id]/personal-data";
import { ModuleStudy } from "@/app/(protected)/dashboard/user/[id]/study-data";
import { JSX } from "react";

type ModuleItem = {
  name: string;
  component?: JSX.Element;
  children?: ModuleItem[];
};

export const moduleTree: ModuleItem[] = [
  {
    name: "Ficha Personal",
    children: [
      {
        name: "Informacion Personal",
        children: [
          { name: "Datos Personales", component: <ModulePersonal /> },
          { name: "Datos del Conyugue", component: <ModuleConyuge /> },
          { name: "Datos de los Hijos", component: <ModuleChildren /> },
        ],
      },
      {
        name: "Estudios y Capacitacion",
        children: [
          { name: "Estudios", component: <ModuleStudy /> },
          { name: "Capacitacion", component: <div>Capacitacion</div> },
        ],
      },
      { name: "Experiencia Laboral", component: <ModuleExp /> },
      { name: "Discapacidad", component: <ModuleDisability /> },
    ],
  },
  {
    name: "Situacion Personal",
    children: [
      { name: "Contratos y Nombramiento", component: <div>Contratos y Nombramiento</div> },
      { name: "Renuncia", component: <div>Renuncia</div> },
      { name: "Desplazamiento", component: <div>Desplazamiento</div> },
      { name: "Descanso Medico", component: <div>Descanso Medico</div> },
      { name: "Permisos / Licencias", component: <div>Permisos / Licencias</div> },
      { name: "Ascensos", component: <div>Ascensos</div> },
    ],
  },
  {
    name: "Bonificaciones y Evaluaciones",
    children: [
      {
        name: "Bonificaciones",
        children: [
          { name: "Bonificaciones Personales", component: <div>Bonificaciones Personales</div> },
          { name: "Bonificaciones Familiares", component: <div>Bonificaciones Familiares</div> },
          { name: "Reconocimientos", component: <div>Reconocimientos</div> },
        ],
      },
      { name: "Evaluaciones", component: <div>Evaluaciones</div> },
    ],
  },
  {
    name: "Meritos y Demeritos",
    children: [
      { name: "Meritos", component: <div>Meritos</div> },
      { name: "Demeritos", component: <div>Demeritos</div> },
    ],
  },
  {
    name: "Documentos / Otros",
    children: [
      { name: "Documentos", component: <div>Documentos</div> },
      { name: "Constancias", component: <div>Constancias</div> },
    ],
  },
];
