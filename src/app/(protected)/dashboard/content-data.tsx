"use client";

import { useState } from "react";
import { Boxes, Combine, MapPin, Package, UserRoundPlus } from "lucide-react";
import { UbigeoComponent } from "./ubigeo-component";
import { CargoComponent } from "./cargo-component";
import { DependenciaComponent } from "./dependencia-component";
import { CargoDependencia } from "./cargo-dependencia";
import { UserComponent } from "./user-component";

const tabs = [
  { id: "ubigeo", label: "Ubigeo", icon: MapPin, component: UbigeoComponent },
  { id: "cargo", label: "Cargo", icon: Package, component: CargoComponent },
  { id: "dependencia", label: "Dependencia", icon: Boxes, component: DependenciaComponent },
  { id: "cargo-dependencia", label: "cargo dependencia", icon: Combine, component: CargoDependencia },
  { id: "user", label: "Usuario", icon: UserRoundPlus, component: UserComponent },
];
export const ContentData = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="flex flex-col justify-center items-center mb-5 w-full h-full">
      <div className="flex lg:flex-row flex-col justify-center gap-2 lg:gap-5 w-full lg:w-4/5 text-text">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 py-2 px-3 lg:px-5 rounded-full cursor-pointer transition 
            ${activeTab === tab.id ? "bg-red text-crust" : "hover:bg-maroon hover:text-text"}`}
          >
            <tab.icon size={20} />
            <p className="font-inter font-semibold lg:text-l text-sm text-nowrap">{tab.label}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 md:p-8 lg:p-4 xl:p-2 w-full lg:w-4/5 min-h-[300px]">{tabs.map((tab) => activeTab === tab.id && <tab.component key={tab.id} />)}</div>
    </div>
  );
};
