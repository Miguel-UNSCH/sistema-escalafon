"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Session } from "next-auth";
import { getCurrentPersonal, personalRecord } from "@/actions/personal-action";
import { CreateData } from "./form-data";
import { ModifyData } from "./modify-data";

export const ContentData = ({ session }: { session: Session }) => {
  const [loading, setLoading] = useState(true);
  const [personalData, setPersonalData] = useState<personalRecord | null>(null);

  const fetchPersonalData = async () => {
    setLoading(true);
    try {
      if (!session?.user?.email) return;
      const response = await getCurrentPersonal(session.user.email);
      if (response.success && response.data) {
        setPersonalData(response.data);
      }
      // eslint-disable-next-line no-unused-vars
    } catch (e: unknown) {
      toast.error("Error al cargar los datos del personal.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonalData();
  }, [session?.user?.email]);

  const handleRefresh = () => {
    fetchPersonalData();
  };

  if (loading) return <p className="text-subtext0 text-center">Cargando datos...</p>;

  return (
    <div className="flex justify-center py-2 w-full">
      <div className="flex p-2 w-4/5">{personalData ? <ModifyData personalData={personalData} onRefresh={handleRefresh} /> : <CreateData onRefresh={handleRefresh} />}</div>
    </div>
  );
};
