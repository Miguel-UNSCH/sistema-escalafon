/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "../ui/switch";

interface SelectFieldProps {
  control: any;
  name: string;
  label: string;
  options: { key: string; value: string }[];
  placeholder?: string;
  disabled?: boolean;
}

export const SelectField = ({ control, name, label, options, placeholder = "Seleccione...", disabled = false }: SelectFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.key} value={option.key}>
                  {option.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface SwitchFieldProps {
  control: any;
  name: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export const SwitchField: React.FC<SwitchFieldProps> = ({ control, name, label, description, disabled = false }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row justify-between items-center p-4 border border-transparent hover:border-red rounded-lg">
          <div className="space-y-0.5">
            <FormLabel className="text-text">{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} disabled={disabled} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
