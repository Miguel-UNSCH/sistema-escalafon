"use client";

import { useState } from "react";
import { Boxes, MapPin, Package, UserRoundPlus } from "lucide-react";
import { UbigeoComponent } from "./ubigeo-component";
import { CargoComponent } from "./cargo-component";
import { DependenciaComponent } from "./dependencia-component";
import { UserComponent } from "./user-component";

const Page = () => {
  const [activeTab, setActiveTab] = useState("Ubigeo");

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex flex-row justify-center gap-5 w-4/5 text-text">
        <div
          onClick={() => setActiveTab("Ubigeo")}
          className={`flex flex-row items-center gap-2 p-1 px-4 rounded-full cursor-pointer ${activeTab === "Ubigeo" ? "bg-red text-base" : "hover:bg-maroon hover:text-base"}`}
        >
          <MapPin size={16} />
          <p className="font-inter font-semibold">Ubigeo</p>
        </div>

        <div
          onClick={() => setActiveTab("Cargo")}
          className={`flex flex-row items-center gap-2 p-1 px-4 rounded-full cursor-pointer ${activeTab === "Cargo" ? "bg-red text-base" : "hover:bg-maroon hover:text-base"}`}
        >
          <Package size={16} />
          <p className="font-inter font-semibold text-lg">Cargo</p>
        </div>

        <div
          onClick={() => setActiveTab("dep")}
          className={`flex flex-row items-center gap-2 p-1 px-4 rounded-full cursor-pointer ${activeTab === "dep" ? "bg-red text-base" : "hover:bg-maroon hover:text-base"}`}
        >
          <Boxes size={16} />
          <p className="font-inter font-semibold text-lg">Dependencia</p>
        </div>

        <div
          onClick={() => setActiveTab("user")}
          className={`flex flex-row items-center gap-2 p-1 px-4 rounded-full cursor-pointer ${activeTab === "user" ? "bg-red text-base" : "hover:bg-maroon hover:text-base"}`}
        >
          <UserRoundPlus size={16} />
          <p className="font-inter font-semibold text-lg">Usuario</p>
        </div>
      </div>

      <div className="flex justify-center mt-4 w-4/5 h-full">
        {activeTab === "Ubigeo" && <UbigeoComponent />}
        {activeTab === "Cargo" && <CargoComponent />}
        {activeTab === "dep" && <DependenciaComponent />}
        {activeTab === "user" && <UserComponent />}
      </div>
    </div>
  );
};

export default Page;
