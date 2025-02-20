import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { getUser } from "@/services/userService";
import { UserRound, CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import logout from "@/helpers/logout";

interface IUser {
  id: string;
  nombres: string;
  apellidos: string;
  role: string;
  email: string;
  password: string;
  ubigeoId: number;
  status: string;
  updatedAt: Date;
  createdAt: Date;
}

const UserCard = () => {
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!session.data?.user?.id) return;
        setIsLoading(true);
        const userData = await getUser(session.data.user.id);
        setUser(userData);
      } catch (error) {
        console.error("Error al obtener usuario", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [session]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleCard = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <div className="hover:bg-[#ccd0da] p-2 rounded-full cursor-pointer" onClick={toggleCard}>
        <UserRound className="rounded-full text-[#d20f39]" size={26} />
      </div>

      {isOpen && (
        <div ref={cardRef} className="top-12 right-0 absolute bg-[#dce0e8] shadow-lg p-4 rounded-lg w-auto font-poppins">
          {isLoading ? (
            <p className="text-gray-600 text-center">Cargando usuario...</p>
          ) : user ? (
            <>
              <div className="flex flex-col justify-center items-center gap-2">
                <CircleUserRound size={96} />
                <p className="bg-[#209fb5] p-1 px-4 rounded-full font-montserrat text-[#dce0e8] text-sm">{user.role}</p>
                <p className="font-semibold text-[#d20f39] text-lg">
                  {user.nombres} {user.apellidos}
                </p>
              </div>
              <p className="text-gray-700">
                <span className="font-medium">{user.email}</span>
              </p>
              <Button onClick={logout} className="bg-[#d20f39] hover:bg-[#b10d30] mt-3 py-2 rounded-lg w-full text-white transition">
                Cerrar sesión
              </Button>
            </>
          ) : (
            <p className="text-red-500 text-center">No se encontró usuario.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCard;
