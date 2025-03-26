"use client";

import { Calendar } from "@/components/ui/calendar";
import { es } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DateFieldProps {
  control: any;
  name: string;
  label: string;
  disabled: boolean;
  dateLimit?: "past" | "future" | "any";
}

export const DateField = ({ control, name, label, disabled, dateLimit = "past" }: DateFieldProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  useEffect(() => {
    if (selectedDate) {
      setCurrentYear(selectedDate.getFullYear());
      setCurrentMonth(selectedDate.getMonth());
    }
  }, [selectedDate]);

  const disableDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // para comparación precisa
    if (dateLimit === "past") return date > today;
    if (dateLimit === "future") return date < today;
    return false;
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label} *</FormLabel>
          <Popover>
            <PopoverTrigger asChild disabled={disabled}>
              <FormControl>
                <Button variant="outline" className="pl-3 w-full font-normal text-left" disabled={disabled}>
                  {field.value ? format(new Date(field.value), "PPP", { locale: es }) : <span>Seleccione la fecha</span>}
                  <CalendarIcon className="opacity-50 ml-auto w-4 h-4 text-text" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-auto" align="start">
              <div className="flex justify-between items-center gap-2 px-3 py-2">
                <select className="bg-mantle px-2 py-1 w-1/2 text-sm" value={currentMonth} onChange={(e) => setCurrentMonth(parseInt(e.target.value))}>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={i} className="px-1">
                      {format(new Date(2000, i), "MMMM", { locale: es })}
                    </option>
                  ))}
                </select>
                <select className="bg-mantle px-2 py-1 w-1/2 text-sm" value={currentYear} onChange={(e) => setCurrentYear(parseInt(e.target.value))}>
                  {Array.from({ length: 95 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year} className="hover:bg-maroon">
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>

              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => {
                  setSelectedDate(date);
                  field.onChange(date ? date.toISOString() : "");
                }}
                disabled={disableDate}
                month={new Date(currentYear, currentMonth)}
                onMonthChange={(date) => {
                  setCurrentYear(date.getFullYear());
                  setCurrentMonth(date.getMonth());
                }}
                locale={es}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
