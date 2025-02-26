/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { uploadFile } from "@/services/uploadService";
import { getCurrentPersonal } from "@/services/personalService";

interface UploadFormProps {
  personalId: string;
}
export const UploadForm = ({ personalId }: UploadFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [folder, setFolder] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !personalId) {
      setMessage("El personalId y un archivo son requeridos.");
      return;
    }

    try {
      const params = { personalId, folder: folder || undefined };
      const response = await uploadFile(params, file);
      setMessage(response.message || "Archivo subido con éxito.");
    } catch (error: any) {
      setMessage(error.error || "Error al subir el archivo.");
    }
  };

  return (
    <div className="shadow-md mx-auto p-4 border rounded-md max-w-md">
      <h2 className="mb-4 font-bold text-xl">Subir Archivo</h2>

      <label className="block">Carpeta (opcional)</label>
      <input type="text" value={folder} onChange={(e) => setFolder(e.target.value)} className="p-2 border rounded-md w-full" />

      <label className="block">Archivo</label>
      <input type="file" onChange={handleFileChange} className="p-2 border rounded-md w-full" required />

      <button onClick={handleUpload} className="bg-blue-500 mt-2 p-2 rounded w-full text-white">
        Subir
      </button>

      {message && <p className="mt-2 text-sm text-center">{message}</p>}
    </div>
  );
};

export default function Page() {
  const { data: session, status } = useSession();
  const [personalId, setPersonalId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonalId = async () => {
      if (!session?.user?.id) return;

      setLoading(true);
      setError(null);

      try {
        const data = await getCurrentPersonal(session.user.id);
        if (data?.id) {
          setPersonalId(data.id);
        } else {
          setError("No se encontró el personalId.");
        }
      } catch (err: any) {
        setError("Error al obtener el personalId.");
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalId();
  }, [session]);

  if (status === "loading" || loading) return <div>Cargando sesión...</div>;
  if (!session) return <div>No autenticado</div>;

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {error ? <div className="text-red-500">{error}</div> : personalId && <UploadForm personalId={personalId} />}
      <pre>{JSON.stringify(session, null, 2)}</pre>
      {session.user?.role === "ADMIN" && <div>🔒 Contenido protegido</div>}
    </div>
  );
}
