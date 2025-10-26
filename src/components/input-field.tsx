import type { Control, FieldValues, Path  } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from './ui/input';
import type { ReactNode } from 'react';

interface InputFieldProps<T extends FieldValues> {
    form: {
        control: Control<T>;
    };
    inputName: Path<T>;
    inputLabel?: ReactNode;
    inputPlaceholder?: string;
    inputType?: "text" | "number";
    className?: string;
    isRequired?: boolean;
}

export default function InputField<T extends FieldValues>({
    form,
    inputName,
    inputLabel,
    inputPlaceholder,
    inputType = "text",
    className = '',
    isRequired = false,
}: InputFieldProps<T>) {
    return (
        <FormField
            control={form.control}
            name={inputName}
            render={({ field }) => (
                <FormItem className={`${className}`}>
                    {
                        !!inputLabel &&
                        <FormLabel>{inputLabel}<span className='text-red-500'>{isRequired ? '*' : ''}</span></FormLabel>
                    }
                    <FormControl>
                        <Input 
                            type={inputType} 
                            { ...field }
                            {...(inputPlaceholder && { placeholder: inputPlaceholder })} 
                            { ...(inputType === 'number' &&
                                { 
                                    onChange: (e) => field.onChange(parseInt(e.target.value)),
                                }
                            )}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}