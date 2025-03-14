"use client";

import { useState } from "react";
import { Boxes, MapPin, Package, UserRoundPlus } from "lucide-react";

import { UserComponent } from "./user-component";
import { CargoComponent } from "./cargo-component";
import { UbigeoComponent } from "./ubigeo-component";
import { DependenciaComponent } from "./dependencia-component";

const tabs = [
  { id: "ubigeo", label: "Ubigeo", icon: MapPin, component: UbigeoComponent },
  { id: "cargo", label: "Cargo", icon: Package, component: CargoComponent },
  { id: "dependencia", label: "Dependencia", icon: Boxes, component: DependenciaComponent },
  { id: "user", label: "Usuario", icon: UserRoundPlus, component: UserComponent },
];

const Page = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex flex-row justify-center gap-5 w-4/5 text-text">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-row items-center gap-2 py-1  px-5 rounded-full cursor-pointer 
            ${activeTab === tab.id ? "bg-red text-base" : "hover:bg-maroon hover:text-base"}`}
          >
            <tab.icon size={16} />
            <p className="font-inter font-semibold text-lg">{tab.label}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 w-4/5 h-full">{tabs.map((tab) => activeTab === tab.id && <tab.component key={tab.id} />)}</div>
    </div>
  );
};

export default Page;
