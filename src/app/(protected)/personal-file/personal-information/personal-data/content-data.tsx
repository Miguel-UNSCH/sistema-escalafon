"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { get_current_personal, personalRecord } from "@/actions/personal-action";
import { CreateData } from "./form-data";
import { ModifyData } from "./modify-data";
import { checkEditable } from "@/actions/limit-time";

interface ContentDataProps {
  userId?: string;
  user_id?: string;
}

export const ContentData = ({ userId, user_id }: ContentDataProps) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<personalRecord | null>(null);
  const [canEdit, setCanEdit] = useState<boolean>(false);

  const id = (user_id ?? userId) || "";

  const fnData = async () => {
    setLoading(true);
    try {
      if (!id) return;
      const response = await get_current_personal(id);
      if (response.success && response.data) setItems(response.data);
    } catch {
      toast.error("Error al cargar los datos del personal.");
    } finally {
      setLoading(false);
    }
  };

  const checkEditableClient = async () => {
    if (user_id) {
      setCanEdit(true);
      return;
    }

    try {
      const res = await checkEditable();
      if (res.success && res.editable) setCanEdit(res.editable);
    } catch {
      setCanEdit(false);
    }
  };

  useEffect(() => {
    fnData();
    checkEditableClient();
  }, [id]);

  const handleRefresh = () => {
    fnData();
  };

  if (loading) return <p className="text-subtext0 text-center">Cargando datos...</p>;

  return (
    <div className="flex justify-center py-2 w-full">
      <div className="flex p-2 w-4/5">
        {items ? <ModifyData personalData={items} onRefresh={handleRefresh} edit={canEdit} /> : <CreateData onRefresh={handleRefresh} edit={canEdit} id={id} />}
      </div>
    </div>
  );
};
