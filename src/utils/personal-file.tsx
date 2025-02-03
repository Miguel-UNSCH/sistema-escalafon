import { IFormData } from "@/types";
import { LuUserRound } from "react-icons/lu";

/** /dashboard/personal-file/personal-information/personal-data */

/** /dashboard/personal-file/personal-information/spouse-data */

/** /dashboard/personal-file/personal-information/children-data */

/** /dashboard/personal-file/studies-training */

// only data for training, [fix latter]
export interface IStudiesTraining {
  names: string;
  lastName: string;
  trainingCenter: string;
  subject: string;
  professionOrSpecialty: string;
  period: string;
  hours: number;
  issueDate: string;
  certificatePdf: string;
}
export const studiesTraining: IFormData[] = [
  {
    type: "BasicInput",
    fields: [
      {
        label: "nombres",
        name: "names",
        placeholder: "Ingrese sus nombres",
        icon: <LuUserRound />,
        required: true,
      },
      {
        label: "apellidos",
        name: "lastName",
        placeholder: "ingrese sus apellidos",
        icon: <LuUserRound />,
        required: true,
      },
    ],
  },
  {
    type: "BasicInput",
    fields: [
      {
        label: "centro de formación",
        name: "trainingCenter",
        placeholder: "ingrese el centro de formación profesional",
        icon: <LuUserRound />,
        required: true,
      },
    ],
  },
  {
    type: "BasicInput",
    fields: [
      {
        label: "asignatura",
        name: "subject",
        placeholder: "ingrese la asignatura",
        icon: <LuUserRound />,
        required: true,
      },

      {
        label: "profesión o especialidad",
        name: "professionOrSpecialty",
        placeholder: "ingrese la profesión o especialidad",
        icon: <LuUserRound />,
        required: true,
      },
    ],
  },
  {
    type: "BasicInput",
    fields: [
      {
        label: "Periodo",
        name: "period",
        placeholder: "Ingrese el periodo [fix - create a BasicDate component]",
        icon: <LuUserRound />,
        required: true,
      },
    ],
  },
  {
    type: "BasicInput",
    fields: [
      {
        label: "horas lectivas",
        name: "hours",
        placeholder: "ingrese las horas lectivas",
        icon: <LuUserRound />,
        required: true,
      },
    ],
  },
  {
    type: "BasicInput",
    fields: [
      {
        label: "fecha de emisión",
        name: "issueDate",
        placeholder: "ingrese la fecha de emisión",
        icon: <LuUserRound />,
        required: true,
      },
    ],
  },
  {
    type: "BasicInput",
    fields: [
      {
        label: "certificado PDF",
        name: "certificatePdf",
        placeholder: "ingrese el certificado PDF [fix - create a BasicFile component]",
        icon: <LuUserRound />,
        required: true,
      },
    ],
  },
];
