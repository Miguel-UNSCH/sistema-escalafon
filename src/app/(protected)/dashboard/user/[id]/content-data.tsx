"use client";

import { useState, JSX } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { UserData } from "./user-data";
import { RenderMenuItems } from "@/components/others/render-menu";
import { moduleTree } from "@/utils/module-items";
import { useRouter } from "next/navigation";
import { Boxes, MoveLeft } from "lucide-react";
import { ModulePersonal } from "./personal-data";

export function ContentData({ id }: { id: string }) {
  const [selectedModule, setSelectedModule] = useState<JSX.Element | null>(<ModulePersonal />);
  const [selectedModuleName, setSelectedModuleName] = useState<string | null>("Datos Personales");
  const [activeSection, setActiveSection] = useState<"user" | "modules">("user");
  const router = useRouter();

  const isUserActive = activeSection === "user";
  const isModulesActive = activeSection === "modules";

  const asctiveClass = "font-bold text-peach border-b-4 border-peach";
  const inactiveClass = "font-medium text-peach hover:font-bold hover:border-b-4 hover:border-peach";

  return (
    <div className="flex flex-col justify-between gap-2 w-5/6 h-full">
      <div className="flex flex-row gap-8">
        {" "}
        <p onClick={() => setActiveSection("user")} className={`pb-2 cursor-pointer font-primary text-lg uppercase transition-all ${isUserActive ? asctiveClass : inactiveClass}`}>
          Información básica del personal
        </p>
        <p
          onClick={() => setActiveSection("modules")}
          className={`pb-2 cursor-pointer font-primary text-lg uppercase transition-all ${isModulesActive ? asctiveClass : inactiveClass}`}
        >
          Modificar módulos
        </p>
      </div>

      {isUserActive && (
        <div className="flex flex-col gap-4 w-full">
          <UserData userId={id} />
        </div>
      )}

      {isModulesActive && (
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row items-center gap-5">
            <p className="font-text">Seleccione un módulo</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 font-special uppercase">
                  <Boxes />
                  {selectedModuleName ?? "Módulos disponibles"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72">
                <DropdownMenuGroup>
                  <RenderMenuItems
                    items={moduleTree}
                    onSelect={(name, component) => {
                      setSelectedModuleName(name);
                      setSelectedModule(component);
                    }}
                  />
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {selectedModule && <div className="mt-4 font-code text-sm italic">{selectedModule}</div>}
        </div>
      )}

      <div className="flex flex-row justify-end gap-4">
        <Button onClick={() => router.push("/dashboard/user")} className="bg-mantle hover:bg-crust font-special text-text uppercase">
          <MoveLeft />
          <p>volver</p>
        </Button>
      </div>
    </div>
  );
}
