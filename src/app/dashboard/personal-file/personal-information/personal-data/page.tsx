"use client";
import { InputTypea } from "@/components/forms/InputTypes";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  lastName: string;
  secondName: string;
};

interface IFormData {
  label: string;
  name: keyof Inputs;
  size?: string;
  type: "input" | "select";
  options: {
    placeholder: string;
  };
}

const FormTemplatea = () => {
  const { control, handleSubmit } = useForm<Inputs>();

  const formData: IFormData[] = [
    {
      label: "nombres",
      name: "name",
      type: "input",
      size: "medium",
      options: {
        placeholder: "ingrese sus nombres",
      },
    },
    {
      label: "apellidos",
      name: "lastName",
      type: "input",
      options: {
        placeholder: "ingrese sus apellidos",
      },
    },
  ];

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formData.map((field, index) => (
        <InputTypea
          key={index}
          label={field.label}
          name={field.name as keyof Inputs}
          type={field.type}
          control={control}
          options={field.options}
        />
      ))}
      <button type="submit">Enviar</button>
    </form>
  );
};

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center font-poppins">
      <div className="flex flex-col">
        <h3 className="font-bold font-montserrat text-xl uppercase">
          Información personal
        </h3>
        <FormTemplatea />
      </div>
    </div>
  );
};

export default page;

// "use client";
// import React from "react";
// import { useForm, SubmitHandler, Controller } from "react-hook-form";

// type Inputs = {
//   firstName: string;
//   secondName: string;
// };

// interface IFormData {
//   label: string;
//   name: keyof Inputs;
//   type: "input" | "select";
//   options?: {
//     placeholder?: string;
//     options?: string[];
//   };
// }

// const FormTemplatea = () => {
//   const { control, handleSubmit } = useForm<Inputs>();

//   const formData: IFormData[] = [
//     {
//       label: "Primer nombre",
//       name: "firstName",
//       type: "input",
//       options: {
//         placeholder: "Ingrese su primer nombre",
//       },
//     },
//     {
//       label: "Segundo nombre",
//       name: "secondName",
//       type: "input",
//       options: {
//         placeholder: "Ingrese su segundo nombre",
//       },
//     },
//   ];

//   const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {formData.map((field, index) => (
//         <div key={index}>
//           <label
//             htmlFor={field.name}
//             className="block mb-2 font-medium text-text-primary"
//           >
//             {field.label}
//           </label>
//           <Controller
//             name={field.name}
//             control={control}
//             render={({ field: controllerField }) => (
//               <input
//                 {...controllerField}
//                 id={field.name}
//                 className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-sm dark:placeholder-gray-400 dark:text-white"
//                 placeholder={field.options?.placeholder}
//                 required
//               />
//             )}
//           />
//         </div>
//       ))}
//       <button type="submit">Enviar</button>
//     </form>
//   );
// };

// const page = () => {
//   return (
//     <div className="flex flex-col justify-center items-center font-poppins">
//       <div className="flex flex-col">
//         <h3 className="font-bold font-montserrat text-xl uppercase">
//           Información personal
//         </h3>
//         <FormTemplatea />
//       </div>
//     </div>
//   );
// };

// export default page;
