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
    <div className="flex flex-col justify-center items-center mb-5 w-full h-full">
      <div className="flex lg:flex-row flex-col justify-center gap-2 lg:gap-5 w-full lg:w-4/5 text-text">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 py-2 px-3 lg:px-5 rounded-full cursor-pointer transition 
            ${activeTab === tab.id ? "bg-red text-text" : "hover:bg-maroon hover:text-text"}`}
          >
            <tab.icon size={20} />
            <p className="font-inter font-semibold text-sm lg:text-lg">{tab.label}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 w-full lg:w-4/5 min-h-[300px]">{tabs.map((tab) => activeTab === tab.id && <tab.component key={tab.id} />)}</div>
    </div>
  );
};

export default Page;
