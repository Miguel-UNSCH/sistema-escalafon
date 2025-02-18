"use client";

import { useEffect, useState } from "react";
import { TableData } from "./TableData";
import { IPersonal } from "@/interfaces";

// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Checkbox } from "@/components/ui/checkbox";

// const TableUsers = () => {
//   const [users, setusers] = useState([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchPersonales = async () => {
//       try {
//         const response = await fetch("/api/personal");
//         if (!response.ok) throw new Error("Error al obtener los datos");

//         const data = await response.json();
//         setusers(data);
//       } catch (error) {
//         console.error("Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPersonales();
//   }, []);

//   if (loading) {
//     return <p>Cargando datos...</p>;
//   }

//   if (users.length === 0) {
//     return <p>No se encontraron datos.</p>;
//   }

//   return (
//     <div className="flex flex-col items-center gap-5 bg-white p-2 rounded-md w-full">
//       <div className="flex flex-row justify-end items-center p-2 w-full">
//         <div></div>
//         <div className="flex flex-row items-center gap-2">
//           <span>1-50</span>
//           <LuChevronLeft />
//           <LuChevronRight />
//         </div>
//       </div>

//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="px-4 py-2"></TableHead>
//             <TableHead className="px-4 py-2">Nombres</TableHead>
//             <TableHead className="px-4 py-2">Apellidos</TableHead>
//             <TableHead className="px-4 py-2">Role</TableHead>
//             <TableHead className="px-4 py-2">Email</TableHead>
//             <TableHead className="px-4 py-2">Discapacidad</TableHead>
//             <TableHead className="px-4 py-2">DNI</TableHead>
//             <TableHead className="px-4 py-2">Sexo</TableHead>
//             <TableHead className="px-4 py-2">Edad</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {users.map(({ id, user, discapacidad, dni, sexo, edad }) => (
//             <TableRow key={id} className="text-sm text-left">
//               <TableCell className="flex flex-row items-center gap-2 px-4 py-2">
//                 <Checkbox />
//                 {id}
//               </TableCell>
//               <TableCell className="px-4 py-2">{user.nombres}</TableCell>
//               <TableCell className="px-4 py-2">{user.apellidos}</TableCell>
//               <TableCell className="px-4 py-2">{user.role}</TableCell>
//               <TableCell className="px-4 py-2">{user.email || `${user.nombres}@regionayacucho.edu`}</TableCell>
//               <TableCell className="px-4 py-2">{discapacidad ? "SI" : "NO"}</TableCell>
//               <TableCell className="px-4 py-2">{dni}</TableCell>
//               <TableCell className="px-4 py-2">{sexo === "M" ? "Masculino" : "Femenino"}</TableCell>
//               <TableCell className="px-4 py-2">{edad}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

const Page = () => {
  const [personales, setpersonales] = useState<IPersonal[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPersonales = async () => {
      try {
        const response = await fetch("/api/personal");
        if (!response.ok) throw new Error("Error al obtener los datos");

        const data = await response.json();
        setpersonales(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonales();
  }, []);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (personales.length === 0) {
    return <p>No se encontraron datos.</p>;
  }
  return (
    <div className="flex flex-row justify-center gap-5 w-full h-full">
      <div className="flex flex-col gap-2 p-2 w-11/12">
        <h3 className="flex font-inter font-bold text-xl text-start uppercase">editar usuario</h3>
        <TableData data={personales} />
      </div>
    </div>
  );
};

export default Page;
