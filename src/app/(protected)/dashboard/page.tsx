"use client";

import { Boxes, MapPin, Package } from "lucide-react";

const Page = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-row justify-evenly w-4/5">
        <div className="flex flex-row items-center gap-2 bg-[#e64553] bg-opacity-75 hover:bg-opacity-100 p-1 pr-7 pl-4 rounded-full">
          <MapPin size={18} />
          <p className="font-inter font-semibold text-lg">Ubigeo</p>
        </div>

        <div className="flex flex-row items-center gap-2 bg-[#179299] bg-opacity-75 hover:bg-opacity-100 p-1 pr-7 pl-4 rounded-full">
          <Package size={18} />
          <p className="font-inter font-semibold text-lg">Cargo</p>
        </div>
        <div className="flex flex-row items-center gap-2 bg-[#7287fd] bg-opacity-75 hover:bg-opacity-100 p-1 pr-7 pl-4 rounded-full">
          <Boxes size={18} />
          <p className="font-inter font-semibold text-lg">Dependencia</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
