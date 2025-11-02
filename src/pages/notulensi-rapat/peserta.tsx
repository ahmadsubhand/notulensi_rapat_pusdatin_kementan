import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SectionProps } from "@/types";
import InputField from "@/components/input-field";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import type { notulensiType } from "@/validator/notulensi.validator";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "@/components/sortable-item";

export default function Peserta({ form } : SectionProps<notulensiType>) {
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: 'peserta'
  })

  const addRow = () => {
    append({
      nama: ""
    })
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
    <Card>
      <CardHeader>
        <CardTitle>Peserta</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <InputField
          form={form}
          inputName="pimpinan"
          inputLabel="Pimpinan Rapat"
          inputPlaceholder="Contoh: Ketua Tim Kerja PPD"
          isRequired
        />

        <InputField
          form={form}
          inputName="notulen"
          inputLabel="Notulen Rapat"
          inputPlaceholder="Nama notulen rapat"
          isRequired
        />

        <FormField 
          control={form.control} 
          name={'peserta'}
          render={() => (
            <FormItem>
              <FormLabel>Daftar Peserta Rapat <span className='text-red-500'>*</span></FormLabel>
              <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
                  {fields.map((field, index) => (
                    <SortableItem key={field.id} id={field.id}>
                      <InputField
                        form={form}
                        inputName={`peserta.${index}.nama`}
                        className="flex-1"
                        inputPlaceholder="Contoh: Ketua Kelompok Data Komoditas"
                      />
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
      </CardContent>
    </Card>
  )
}