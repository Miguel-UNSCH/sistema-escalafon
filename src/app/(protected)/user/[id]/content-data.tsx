"use client";
"use client";

import { useState, JSX } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ModulePersonal } from "./personal-data";
import { ModuleConyuge } from "./conyuge-data";
import { ModuleChildren } from "./children-data";

type ModuleItem = {
  name: string;
  component?: JSX.Element;
  children?: ModuleItem[];
};

const moduleTree: ModuleItem[] = [
  {
    name: "Ficha Personal",
    children: [
      {
        name: "Informacion Personal",
        children: [
          { name: "Datos Personales", component: <ModulePersonal /> },
          { name: "Datos del Conyugue", component: <ModuleConyuge /> },
          { name: "Datos de los hijos", component: <ModuleChildren /> },
        ],
      },
      {
        name: "Estudios y Capacitacion",
        children: [
          { name: "Estudios", component: <div>Estudios</div> },
          { name: "Capacitacion", component: <div>Capacitacion</div> },
        ],
      },
      { name: "Experiencia Laboral", component: <div>Experiencia Laboral</div> },
      { name: "Discapacidad", component: <div>Discapacidad</div> },
    ],
  },
  {
    name: "Situacion Personal",
    children: [
      { name: "Contratos y Nombramiento", component: <div>Contratos y Nombramiento</div> },
      { name: "Renuncia", component: <div>Renuncia</div> },
      { name: "Desplazamiento", component: <div>Desplazamiento</div> },
      { name: "Descanso Medico", component: <div>Descanso Medico</div> },
      { name: "Permisos / Licencias", component: <div>Permisos / Licencias</div> },
      { name: "Ascensos", component: <div>Ascensos</div> },
    ],
  },
  {
    name: "Bonificaciones y Evaluaciones",
    children: [
      {
        name: "Bonificaciones",
        children: [
          { name: "Bonificaciones Personales", component: <div>Bonificaciones Personales</div> },
          { name: "Bonificaciones Familiares", component: <div>Bonificaciones Familiares</div> },
          { name: "Reconocimientos", component: <div>Reconocimientos</div> },
        ],
      },
      { name: "Evaluaciones", component: <div>Evaluaciones</div> },
    ],
  },
  {
    name: "Meritos y Demeritos",
    children: [
      { name: "Meritos", component: <div>Meritos</div> },
      { name: "Demeritos", component: <div>Demeritos</div> },
    ],
  },
  {
    name: "Documentos / Otros",
    children: [
      { name: "Documentos", component: <div>Documentos</div> },
      { name: "Constancias", component: <div>Constancias</div> },
    ],
  },
];

function RenderMenuItems({ items, onSelect }: { items: ModuleItem[]; onSelect: (component: JSX.Element) => void }) {
  return (
    <>
      {items.map((item) =>
        item.children ? (
          <DropdownMenuSub key={item.name}>
            <DropdownMenuSubTrigger>{item.name}</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <RenderMenuItems items={item.children} onSelect={onSelect} />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        ) : (
          <DropdownMenuItem key={item.name} onClick={() => item.component && onSelect(item.component)}>
            {item.name}
          </DropdownMenuItem>
        )
      )}
    </>
  );
}

export function ContentData({ id }: { id: string }) {
  const [selectedModule, setSelectedModule] = useState<JSX.Element | null>(null);

  return (
    <div className="flex flex-col gap-2 w-5/6 h-full">
      <p className="font-primary font-semibold text-peach text-xl uppercase">Informacion basica del personal</p>
      <div className="flex flex-col p-2">
        <p>nombres</p>
        <p>apellidos</p>
        <p>correo electronico</p>
        <p>role</p>
        <p>contrasenia</p>
      </div>

      <div className="flex flex-row items-center gap-4">
        <p className="font-primary font-semibold text-peach text-xl uppercase">modificar modulos</p>

        <div className="">
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

      <div className="mt-4">{selectedModule ?? <div>Selecciona un módulo para ver los datos. {id}</div>}</div>
    </div>
  );
}
