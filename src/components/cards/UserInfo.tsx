/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import { IoFilter, IoSettingsOutline } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { TbLogout2 } from "react-icons/tb";

function UserInfo() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`mr-4 p-4 bg-bg-card rounded-xl border border-border-primary overflow-hidden transition-all duration-400 ${
        isExpanded ? "h-auto" : "h-fit"
      }`}
    >
      <div className="flex items-center justify-between">
        <img
          className="h-12 w-12 rounded-full object-cover"
          src="https://ableproadmin.com/assets/images/user/avatar-2.jpg"
          alt="User Profile Picture"
        />
        <div>
          <h1 className="text-sm font-medium text-text-primary">Juan Perez</h1>
          <p className="text-xs font-medium text-text-secondary">
            Administrador
          </p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 text-xl hover:bg-button-hover rounded-full border border-bg-card hover:border hover:border-border-primary transition-all duration-150"
        >
          <IoFilter />
        </button>
      </div>

      <div
        className={`space-y-2 transition-all duration-400 ${
          isExpanded
            ? "opacity-100 max-h-40"
            : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col gap-4 mt-6">
          <Link href={'#'} className="flex items-center gap-2 text-text-secondary hover:text-text-main transition-all duration-150">
            <LuUser className="text-lg font-bold"/>
            <span className="font-medium text-sm">Mi cuenta</span>
          </Link>
          <Link href={'#'} className="flex items-center gap-2 text-text-secondary hover:text-text-main transition-all duration-150">
            <IoSettingsOutline className="text-lg font-bold"/>
            <span className="font-medium text-sm">Configuraciones</span>
          </Link>
          <Link href={'#'} className="flex items-center gap-2 text-text-secondary hover:text-text-main transition-all duration-150">
            <TbLogout2 className="text-lg font-bold"/>
            <span className="font-medium text-sm">Cerrar sesión</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
