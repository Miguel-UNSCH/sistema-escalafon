"use client";

import { Label } from "@radix-ui/react-label";
import React from "react";
import { CircleAlert, UserRoundPlus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RegisterForm } from "@/components/form-register";
import Link from "next/link";

export const UserComponent = () => {
  return (
    <div className="flex flex-col justify-between items-center py-5 w-full h-full">
      <RegisterForm />
      <CreateUsersComponent />
    </div>
  );
};

export const CreateUsersComponent = () => {
  return (
    <div className="flex flex-col gap-2 bg-mantle mb-5 p-4 border hover:border-red border-base rounded-lg w-full">
      <div className="flex flex-row items-center gap-2 hover:text-red">
        <p className="font-inter font-semibold uppercase">registrar varios usuarios</p>
        <CircleAlert size={18} />
      </div>

      <div className="flex flex-row items-end gap-2">
        <div className="items-center gap-2 grid w-full">
          <Label htmlFor="file" className="font-semibold capitalize">
            subir archivo
          </Label>
          <Input id="file" type="file" className="cursor-pointer" />
        </div>

        <Button className="font-special text-base">
          <UserRoundPlus />
          <p>crear usuarios</p>
        </Button>
      </div>

      <div className="flex flex-row gap-2 font-special text-xs">
        <Link href="/dashboard/doc" className="hover:font-semibold hover:text-mauve cursor-pointer">
          Conocer mas
        </Link>
        <span className="">acerca del registro de datos?</span>
      </div>
    </div>
  );
};
