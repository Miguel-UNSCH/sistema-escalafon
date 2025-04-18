"use client";

import React, { useEffect, useState } from "react";

import { Session } from "next-auth";
import { User } from "@prisma/client";
import toast from "react-hot-toast";
import { getUser } from "@/actions/user-actions";
import { ModifyPwd } from "./modify-pwd";
import { EditTime } from "./edit-time";

export const ContentData = ({ session }: { session: Session }) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fnUser = async () => {
      setLoading(true);
      try {
        const response = await getUser();
        if (response.success && response.data) {
          setUser(response.data);
        } else toast.error(response.message || "No se pudieron obtener los datos del usuario.");
        // eslint-disable-next-line no-unused-vars
      } catch (e: unknown) {
        toast.error("Error al obtener los datos del usuario");
      } finally {
        setLoading(false);
      }
    };
    fnUser();
  }, []);

  return (
    <div className="flex flex-col gap-8 p-2 w-4/5">
      {!loading && (
        <div className="flex flex-col gap-2 w-full">
          <h2 className="py-2 font-primary font-bold text-peach text-2xl">Informacion del usuario</h2>

          <div className="flex flex-col gap-4 w-full text-[1rem]">
            <div className="flex flex-row-reverse items-center gap-4 w-full">
              <p className="bg-crust p-2 px-4 rounded-md w-full font-light text-subtext0 uppercase cursor-not-allowed select-none">{user?.name}</p>
              <p className="pl-4 w-1/3 font-primary capitalize">nombres</p>
            </div>

            <div className="flex flex-row-reverse items-center gap-4 w-full">
              <p className="bg-crust p-2 px-4 rounded-md w-full font-light text-subtext0 uppercase cursor-not-allowed select-none">{user?.last_name}</p>
              <p className="pl-4 w-1/3 font-primary capitalize">apellidos</p>
            </div>

            <div className="flex flex-row-reverse items-center gap-4 w-full">
              <p className="bg-crust p-2 px-4 rounded-md w-full font-light text-subtext0 uppercase cursor-not-allowed select-none">{user?.email}</p>
              <p className="pl-4 w-1/3 font-primary capitalize">correo electronico</p>
            </div>

            <div className="flex flex-row-reverse items-center gap-4 w-full">
              <p className="bg-crust p-2 px-4 rounded-md w-full font-light text-subtext0 uppercase cursor-not-allowed select-none">{user?.dni}</p>
              <p className="pl-4 w-1/3 font-primary capitalize">documento de identidad</p>
            </div>
          </div>
        </div>
      )}

      <ModifyPwd userId={session.user.id} />

      {session.user.role === "admin" && <EditTime />}
    </div>
  );
};
