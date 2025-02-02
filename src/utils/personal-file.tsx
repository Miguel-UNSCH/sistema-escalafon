import { IFormData } from "@/types";
import { LuUserRound } from "react-icons/lu";

/** /dashboard/personal-file/personal-information/personal-data */

/** /dashboard/personal-file/personal-information/spouse-data */

/** /dashboard/personal-file/personal-information/children-data */

/** /dashboard/personal-file/studies-training */
export const studiesTraining: IFormData[] = [
  {
    type: "BasicInput",
    fields: [
      {
        label: "Apellidos y nombres",
        name: "fullName",
        placeholder: "Ingrese sus apellidos y nombres",
        icon: <LuUserRound />,
        required: true,
      },
    ],
  },
  {
    type: "BasicInput",
    fields: [
      {
        label: "Nombres",
        name: "names",
        placeholder: "Ingrese sus  nombres",
      },
      {
        label: "apellidos",
        name: "lastName",
        placeholder: "Ingrese sus apellidos",
        icon: <LuUserRound />,
      },
    ],
  },
  {
    type: "BasicSelect",
    fields: [
      {
        label: "Nombres",
        name: "selecttest",
        icon: <LuUserRound />,
        required: true,
        defaultValue: "default",
        options: [
          { value: "default", label: "Seleccione una opción" },
          { value: "option1", label: "Opción 1" },
          { value: "option2", label: "Opción 2" },
          { value: "option3", label: "Opción 3" },
        ],
      },
    ],
  },
];
