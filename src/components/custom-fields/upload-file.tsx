/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { mimeTypes } from "@/utils";

interface UploadFieldProps {
  control: any;
  name: string;
  label?: string;
  disabled?: boolean;
  onFileSelect?: (file: File | null) => void;
  allowedTypes?: string[];
}

export const UploadField = ({ control, name, label, disabled = false, onFileSelect, allowedTypes = ["pdf", "doc", "docx", "xls", "xlsx", "json"] }: UploadFieldProps) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const generateAcceptString = () => {
    return allowedTypes
      .map((type) => mimeTypes[type])
      .filter(Boolean)
      .join(",");
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value, ...rest } }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              type="file"
              accept={generateAcceptString()}
              disabled={disabled}
              onChange={(e) => {
                const file = e.target.files?.[0] || null;

                if (file) {
                  const fileExtension = file.name.split(".").pop()?.toLowerCase();
                  if (!fileExtension || !allowedTypes.includes(fileExtension)) {
                    toast.error(`Formato de archivo no permitido. Solo se aceptan: ${allowedTypes.join(", ")}`);
                    setFileName(null);
                    onChange(null);
                    if (onFileSelect) onFileSelect(null);
                    return;
                  }

                  setFileName(file.name);
                  onChange(file);
                  if (onFileSelect) onFileSelect(file);
                } else {
                  setFileName(null);
                  onChange(null);
                  if (onFileSelect) onFileSelect(null);
                }
              }}
              {...rest}
            />
          </FormControl>
          {fileName && <p className="mt-1 text-subtext0 text-sm">Archivo seleccionado: {fileName}</p>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
