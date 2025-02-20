"use client";

import React, { useEffect, useRef, useState } from "react";
import { CircleUserRound, Dot, UserRound } from "lucide-react";
import logout from "@/helpers/logout";
import { Button } from "@/components/ui/button";

const UserCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const toggleCard = () => setIsOpen(!isOpen);
  const user = {
    nombres: "Miguel",
    apellidos: "Gómez",
    email: "mgomez@example.com",
    cargo: {
      nombre: "Desarrollador",
    },
    dependencia: {
      nombre: "Desarrolladores",
      direccion: "Av. Libertador 123",
      codigo: "001",
    },
    role: "administrador",
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div className="hover:bg-[#ccd0da] p-2 rounded-full cursor-pointer" onClick={toggleCard}>
        <UserRound className="rounded-full text-[#d20f39]" size={26} />
      </div>

      {isOpen && (
        <div ref={cardRef} className="top-12 right-0 absolute bg-[#dce0e8] shadow-lg p-4 rounded-lg w-auto font-poppins">
          <div className="flex flex-col justify-center items-center gap-2">
            <CircleUserRound size={96} className="" />
            <p className="bg-[#209fb5] p-1 px-4 rounded-full font-montserrat text-[#dce0e8] text-sm">{user.role}</p>
            <p className="font-semibold text-[#d20f39] text-lg">
              {user.nombres} {user.apellidos}
            </p>
          </div>
          <p className="text-gray-700">
            <span className="font-medium">{user.email}</span>
          </p>
          <div className="flex flex-row items-center text-sm">
            <p>{user.cargo.nombre}</p>
            <Dot />
            <p>{user.dependencia.nombre}</p>
          </div>
          <Button onClick={logout} className="bg-[#d20f39] hover:bg-[#b10d30] mt-3 py-2 rounded-lg w-full text-white transition">
            Cerrar sesión
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserCard;
