import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import type { Control, FieldValues, Path } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useState } from "react";
import type { ReactNode } from "react";
import dayjs from "dayjs";

interface DatePickerFieldProps<T extends FieldValues> {
  form: { control: Control<T> };
  inputName: Path<T>;
  inputLabel?: ReactNode;
  inputPlaceholder?: string;
  className?: string;
  isRequired?: boolean;
}

export function DatePicker<T extends FieldValues>({
    form,
    inputName,
    inputLabel,
    inputPlaceholder = "yyyy-mm-dd",
    className = "",
    isRequired = false,
}: DatePickerFieldProps<T>) {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [month, setMonth] = useState<Date | undefined>(undefined);

    return (
        <FormField
            control={form.control}
            name={inputName}
            render={({ field }) => (
                <div className="flex flex-col gap-2">
                    <FormItem className={`flex flex-col gap-2 ${className}`}>
                        {inputLabel && <FormLabel>{inputLabel}<span className='text-red-500'>{isRequired ? '*' : ''}</span></FormLabel>}

                        {/* Container untuk input + button */}
                        <div className="relative flex flex-col justify-center">
                            <Input
                                {...(field.value && { value: field.value })}
                                placeholder={inputPlaceholder}
                                className="pr-10"
                                onChange={(e) => {
                                    const date = new Date(e.target.value);
                                    field.onChange(e.target.value);
                                    if (!isNaN(date.getTime())) {
                                        setDate(date);
                                        setMonth(date);
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "ArrowDown") {
                                        e.preventDefault();
                                        setOpen(true);
                                    }
                                }}
                            />

                            {/* Popover Trigger */}
                            <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="absolute right-2 h-8 w-8 p-0"
                                >
                                    <CalendarIcon className="h-4 w-4" />
                                    <span className="sr-only">Pilih tanggal</span>
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent
                                className="w-auto p-0"
                                align="end"
                                sideOffset={10}
                            >
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    month={month}
                                    onMonthChange={setMonth}
                                    onSelect={(date) => {
                                        field.onChange(dayjs(date).format('YYYY-MM-DD'));
                                        setDate(date);
                                        setMonth(date);
                                        setOpen(false);
                                    }}
                                    captionLayout="dropdown"
                                />
                            </PopoverContent>
                            </Popover>
                        </div>
                    </FormItem>
                    <FormMessage />
                </div>
            )}
        />
    );
}
