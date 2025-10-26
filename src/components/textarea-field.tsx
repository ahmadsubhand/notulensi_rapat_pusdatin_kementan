import type { Control, FieldValues, Path } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import type { ReactNode } from 'react';
import { Textarea } from './ui/textarea';

interface TextareaFieldProps<T extends FieldValues> {
    form: {
        control: Control<T>;
    };
    inputName: Path<T>;
    inputLabel?: ReactNode;
    inputPlaceholder?: string;
    className?: string;
}

export default function TextareaField<T extends FieldValues>({
    form,
    inputName,
    inputLabel,
    inputPlaceholder = '',
    className = '',
}: TextareaFieldProps<T>) {
    return (
        <FormField
            control={form.control}
            name={inputName}
            render={({ field }) => (
                <FormItem className={`flex flex-col gap-2 ${className}`}>
                    {
                        !!inputLabel &&
                        <FormLabel>{inputLabel}</FormLabel>
                    }
                    <FormControl>
                        <Textarea
                            placeholder={inputPlaceholder}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
