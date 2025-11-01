import type { Control, FieldValues, Path  } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import type { ReactNode } from 'react';
import { MinimalisEditor } from './tiptap-templates/minimalis/minimalis-editor';

interface RichFieldProps<T extends FieldValues> {
    form: {
        control: Control<T>;
    };
    inputName: Path<T>;
    inputLabel: ReactNode;
    inputPlaceholder?: string;
    isRequired?: boolean;
    isPargraphAllowed?: boolean;
}

export default function RichField<T extends FieldValues>({
    form,
    inputName,
    inputLabel,
    inputPlaceholder,
    isRequired = false,
    isPargraphAllowed = false,
}: RichFieldProps<T>) {
    return (
        <FormField
            control={form.control}
            name={inputName}
            render={({ field }) => (
            <FormItem className="flex-1 flex flex-col gap-2">
                <FormLabel>{inputLabel} 
                    {isRequired && (
                        <span className='text-red-500'>*</span>
                    )}
                </FormLabel>
                <FormControl>
                <MinimalisEditor
                    { ...field }
                    content={field.value} onChange={field.onChange} 
                    className="max-h-full"
                    placeHolderText={inputPlaceholder}
                    isPargraphAllowed={isPargraphAllowed}
                />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
    )
}