import { ModuleBFamily } from "@/app/(protected)/dashboard/user/[id]/b-family-data";
import { ModuleBPersonal } from "@/app/(protected)/dashboard/user/[id]/b-personal-data";
import { ModuleChildren } from "@/app/(protected)/dashboard/user/[id]/children-data";
import { ModuleContracts } from "@/app/(protected)/dashboard/user/[id]/contracts-data";
import { ModuleConyuge } from "@/app/(protected)/dashboard/user/[id]/conyuge-data";
import { ModuleDisability } from "@/app/(protected)/dashboard/user/[id]/disability-data";
import { ModuleDisplacement } from "@/app/(protected)/dashboard/user/[id]/displacement-data";
import { ModuleEvaluations } from "@/app/(protected)/dashboard/user/[id]/evaluations-data";
import { ModuleExp } from "@/app/(protected)/dashboard/user/[id]/exp-data";
import { ModuleMedicalRest } from "@/app/(protected)/dashboard/user/[id]/medical-rest-data";
import { ModulePermissions } from "@/app/(protected)/dashboard/user/[id]/permissions-data";
import { ModulePersonal } from "@/app/(protected)/dashboard/user/[id]/personal-data";
import { ModulePromotions } from "@/app/(protected)/dashboard/user/[id]/promotions-data";
import { ModuleRenunciation } from "@/app/(protected)/dashboard/user/[id]/renunciation-data";
import { ModuleStudy } from "@/app/(protected)/dashboard/user/[id]/study-data";
import { ModuleTraining } from "@/app/(protected)/dashboard/user/[id]/training-data";
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
          { name: "Capacitacion", component: <ModuleTraining /> },
        ],
      },
      { name: "Experiencia Laboral", component: <ModuleExp /> },
      { name: "Discapacidad", component: <ModuleDisability /> },
    ],
  },
  {
    name: "Situacion Personal",
    children: [
      { name: "Contratos y Nombramiento", component: <ModuleContracts /> },
      { name: "Renuncia", component: <ModuleRenunciation /> },
      { name: "Desplazamiento", component: <ModuleDisplacement /> },
      { name: "Descanso Medico", component: <ModuleMedicalRest /> },
      { name: "Permisos / Licencias", component: <ModulePermissions /> },
      { name: "Ascensos", component: <ModulePromotions /> },
    ],
  },
  {
    name: "Bonificaciones y Evaluaciones",
    children: [
      {
        name: "Bonificaciones",
        children: [
          { name: "Bonificaciones Personales", component: <ModuleBPersonal /> },
          { name: "Bonificaciones Familiares", component: <ModuleBFamily /> },
          { name: "Reconocimientos", component: <div>Reconocimientos</div> },
        ],
      },
      { name: "Evaluaciones", component: <ModuleEvaluations /> },
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
