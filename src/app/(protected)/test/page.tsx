"use client";

import { useSession } from "next-auth/react";

import { useState } from "react";

export const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [personalId, setPersonalId] = useState("");
  const [folder, setFolder] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!file || !personalId || !folder) {
      alert("Por favor, completa todos los campos");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    // Limpiar comillas dobles si existen
    const cleanPersonalId = personalId.replace(/['"]+/g, "");
    const url = `/api/files?personalId=${encodeURIComponent(cleanPersonalId)}&folder=${encodeURIComponent(folder)}`;

    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message || data.error);
  };

  return (
    <div className="mx-auto p-4 rounded-md">
      <h2 className="mb-4 font-bold text-xl">Subir Archivo</h2>

      <label className="block">ID Personal</label>
      <input type="text" value={personalId} onChange={(e) => setPersonalId(e.target.value)} className="p-2 border w-full" />

      <label className="block">Carpeta</label>
      <input type="text" value={folder} onChange={(e) => setFolder(e.target.value)} className="p-2 border w-full" />

      <label className="block">Archivo</label>
      <input type="file" onChange={handleFileChange} className="p-2 border w-full" />

      <button onClick={uploadFile} className="bg-blue-500 mt-2 p-2 rounded w-full text-white">
        Subir
      </button>
    </div>
  );
};

export default function Page() {
  const { data: session, status } = useSession(); // ✅ Usamos useSession
  console.log("Estado de sesión:", status, session);

  if (status === "loading") return <div>Cargando sesión...</div>;
  if (!session) return <div>No autenticado</div>;

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <UploadForm />
      <pre>{JSON.stringify(session, null, 2)}</pre>
      {session.user?.role === "ADMIN" && <div>🔒 Contenido protegido</div>}
    </div>
  );
}
