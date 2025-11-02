import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useFieldArray, type Control, type FieldValues, type Path, type ArrayPath } from "react-hook-form";
import SortableItem from "./sortable-item";
import { Button } from "./ui/button";
import { Plus, Trash } from "lucide-react";
import type { ReactNode } from "react";

interface InputFieldProps<T extends FieldValues> {
  form: {
    control: Control<T>;
  };
  inputName: ArrayPath<T>;
  isRequired?: boolean;
  inputLabel?: ReactNode;
  defaultValues: any;
  children: ReactNode;
}

export default function ArrayField<T extends FieldValues>({ 
  form, inputName, isRequired = false, inputLabel, defaultValues, children 
} : InputFieldProps<T>) {
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: inputName
  })

  const addRow = () => {
    append(defaultValues)
  }

  const removeRow = (index: number) => {
    remove(index)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = fields.findIndex(f => f.id === active.id);
      const newIndex = fields.findIndex(f => f.id === over.id);
      move(oldIndex, newIndex); // fungsi bawaan react-hook-form
    }
  };

  return (
    <>
    <FormField 
      control={form.control} 
      name={inputName as Path<T>}
      render={() => (
        <FormItem>
          <FormLabel>{inputLabel} {isRequired && (
              <span className='text-red-500'>*</span>
            )}
          </FormLabel>
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
              {fields.map((field, index) => (
                <SortableItem key={field.id} id={field.id}>
                  {children}
                  <Button onClick={() => removeRow(index)} type="button" size={'icon'}>
                    <Trash />
                  </Button>
                </SortableItem>
              ))}
            </SortableContext>
          </DndContext>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button onClick={addRow} type="button">
      Tambah peserta rapat <Plus />
    </Button>
    </>
  )
}