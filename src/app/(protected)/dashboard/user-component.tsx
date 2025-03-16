"use client";

import React from "react";

import { RegisterForm } from "@/components/form-register";
import { CreateEntity } from "@/components/others/create-entity";
import { UserRoundPlus } from "lucide-react";

export const UserComponent = () => {
  return (
    <div className="flex flex-col justify-between items-center gap-5 py-5 w-full h-full">
      <RegisterForm />
      <CreateEntity title="registrar varios usuarios" icon={<UserRoundPlus />} buttonText="crear usuarios" model="usuario" />
    </div>
  );
};
