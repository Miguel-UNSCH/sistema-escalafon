import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface InputFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
}

export const InputField = ({ control, name, label, placeholder, description, disabled = false, type = "text" }: InputFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel className="py-1">{label}</FormLabel>}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              type={type}
              disabled={disabled}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(type === "number" ? Number(value) : value);
              }}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
