"use client";

import { useState, JSX } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { UserData } from "./user-data";
import { RenderMenuItems } from "@/components/others/render-menu";
import { moduleTree } from "@/utils/module-items";
import { useRouter } from "next/navigation";

export function ContentData({ id }: { id: string }) {
  const [selectedModule, setSelectedModule] = useState<JSX.Element | null>(null);
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between gap-2 w-5/6 h-full">
      <div>
        <UserData userId={id} />

        <div className="flex flex-row items-center gap-4 w-full">
          <p className="font-primary font-semibold text-peach text-xl uppercase">modificar modulos</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Modulos</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72">
              <DropdownMenuGroup>
                <RenderMenuItems items={moduleTree} onSelect={setSelectedModule} />
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {selectedModule && <div className="mt-4 font-code text-sm italic">{selectedModule}</div>}
      <div className="flex flex-row justify-center gap-4">
        <Button onClick={() => router.push("/user")}>Regresar</Button>
        <Button>siguiente</Button>
      </div>
    </div>
  );
}
