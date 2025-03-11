"use client";

import { uploadFile } from "@/service/file-service";
import React, { useState } from "react";

export const UploadFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setSuccess(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Por favor, selecciona un archivo");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // const uploadedFile = await uploadFile(file, "conf");
      const uploadedFile = await uploadFile(file, "data", "capacitacion");
      setSuccess(`Archivo subido: ${uploadedFile.data?.name}`);
    } catch (err: any) {
      setError(err.message || "Error al subir el archivo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-mantle p-4 rounded-lg">
      <h2 className="mb-2 font-semibold text-lg">Subir Archivo</h2>

      <input type="file" onChange={handleFileChange} className="bg-crust mx-2 mb-2 p-2 rounded text-text" lang="spanish" />

      {error && <p className="text-red">{error}</p>}
      {success && <p className="text-green">{success}</p>}

      <button onClick={handleUpload} disabled={loading} className="bg-blue disabled:bg-mantle px-4 py-2 rounded text-base">
        {loading ? "Subiendo..." : "Subir Archivo"}
      </button>
    </div>
  );
};
