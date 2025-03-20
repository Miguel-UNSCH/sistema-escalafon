/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

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
        <FormItem className="flex flex-row justify-between items-center bg-mantle p-4 border border-transparent hover:border-red rounded-lg">
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
