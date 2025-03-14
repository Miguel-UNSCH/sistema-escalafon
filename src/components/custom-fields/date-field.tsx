"use client";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DateField = ({ control, name, label, disabled }: { control: any; name: string; label: string; disabled: boolean }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  useEffect(() => {
    if (selectedDate) {
      setCurrentYear(selectedDate.getFullYear());
      setCurrentMonth(selectedDate.getMonth());
    }
  }, [selectedDate]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label} *</FormLabel>
          <Popover>
            <PopoverTrigger asChild disabled>
              <FormControl>
                <Button variant={"outline"} className="pl-3 font-normal text-left" disabled={disabled}>
                  {field.value ? format(new Date(field.value), "PPP") : <span>Seleccione la fecha</span>}
                  <CalendarIcon className="opacity-50 ml-auto w-4 h-4 text-text" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-auto" align="start">
              <div className="flex justify-between items-center gap-2 px-3 py-2">
                <select className="bg-mantle px-2 py-1 w-1/2 text-sm" value={currentMonth} onChange={(e) => setCurrentMonth(parseInt(e.target.value))}>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={i} className="px-1">
                      {format(new Date(2000, i), "MMMM")}
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
                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                month={new Date(currentYear, currentMonth)}
                onMonthChange={(date) => {
                  setCurrentYear(date.getFullYear());
                  setCurrentMonth(date.getMonth());
                }}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
