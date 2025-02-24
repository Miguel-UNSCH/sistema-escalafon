/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface UploadFieldProps {
  control: any;
  name: string;
  label?: string;
  disabled?: boolean;
  onFileSelect?: (file: File | null) => void;
}

export const UploadField = ({ control, name, label, disabled = false, onFileSelect }: UploadFieldProps) => {
  const [fileName, setFileName] = useState<string | null>(null);

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
              accept="image/*,application/pdf"
              disabled={disabled}
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setFileName(file ? file.name : null);
                onChange(file); // ✅ No asignamos una cadena vacía
                if (onFileSelect) onFileSelect(file);
              }}
              {...rest} // ✅ No pasamos `value`
            />
          </FormControl>
          {fileName && <p className="mt-1 text-gray-500 text-sm">Archivo seleccionado: {fileName}</p>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
