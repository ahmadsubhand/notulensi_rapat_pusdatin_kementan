import type { SectionProps } from "@/types";
import type { perjalananType } from "@/validator/perjalanan.validator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InputField from "@/components/input-field";
import RichField from "@/components/rich-field";
import { useFieldArray } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "@/components/sortable-item";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

export default function Hasil({ form } : SectionProps<perjalananType>) {
  const fasilitatorField = useFieldArray({
    control: form.control,
    name: 'fasilitator'
  })

  const bentukKegiatanField = useFieldArray({
    control: form.control,
    name: 'kegiatan'
  })
  
  // const addRow = () => {
  //   append({
  //     nama: "",
  //     nip: ""
  //   })
  // }

  // const removeRow = (index: number) => {
  //   remove(index)
  // }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hasil Perjalanan Dinas</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <RichField 
          form={form}
          inputName={"latarBelakang"}
          inputLabel={"Latar Belakang"}
          inputPlaceholder={"Latar belakang perjalanan dinas"}
          isPargraphAllowed
        />

        <FormField
          control={form.control} 
          name={'fasilitator'}
          render={() => (
            <FormItem>
              <FormLabel>Daftar Fasilitator/Petugas yang Ditemui</FormLabel>
              <DndContext collisionDetection={closestCenter} onDragEnd={(event) => {
                const { active, over } = event;

                if (!over) return;

                if (active.id !== over.id) {
                  const oldIndex = fasilitatorField.fields.findIndex(f => f.id === active.id);
                  const newIndex = fasilitatorField.fields.findIndex(f => f.id === over.id);
                  fasilitatorField.move(oldIndex, newIndex);
                }
              }}>
                <SortableContext items={fasilitatorField.fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
                  {fasilitatorField.fields.map((field, index) => (
                    <SortableItem key={field.id} id={field.id}>
                      <InputField
                        form={form}
                        inputName={`fasilitator.${index}.nama`}
                        className="flex-1"
                        inputPlaceholder="Nama"
                        isRequired
                      />
                      <InputField
                        form={form}
                        inputName={`fasilitator.${index}.deskripsi`}
                        className="flex-1"
                        inputPlaceholder="Deskripsi"
                        isRequired
                      />
                      <Button onClick={() => fasilitatorField.remove(index)} type="button" size={'icon'}>
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
        <Button onClick={() => fasilitatorField.append({
          nama: '',
          deskripsi: ''
        })} type="button">
          Tambah fasilitator/petugas <Plus />
        </Button>

        <FormField
          control={form.control} 
          name={'kegiatan'}
          render={() => (
            <FormItem>
              <FormLabel>Bentuk Kegiatan</FormLabel>
              <DndContext collisionDetection={closestCenter} onDragEnd={(event) => {
                const { active, over } = event;

                if (!over) return;

                if (active.id !== over.id) {
                  const oldIndex = bentukKegiatanField.fields.findIndex(f => f.id === active.id);
                  const newIndex = bentukKegiatanField.fields.findIndex(f => f.id === over.id);
                  bentukKegiatanField.move(oldIndex, newIndex);
                }
              }}>
                <SortableContext items={bentukKegiatanField.fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
                  {bentukKegiatanField.fields.map((field, index) => (
                    <SortableItem key={field.id} id={field.id}>
                      <InputField
                        form={form}
                        inputName={`kegiatan.${index}.value`}
                        className="flex-1"
                        inputPlaceholder="Bentuk kegiatan"
                        isRequired
                      />
                      <Button onClick={() => bentukKegiatanField.remove(index)} type="button" size={'icon'}>
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
        <Button onClick={() => bentukKegiatanField.append({
          value: ''
        })} type="button">
          Tambah bentuk kegiatan <Plus />
        </Button>

        <FormField
          control={form.control}
          name={'hasil'}
          render={({ field }) => (
            <FormItem className="flex-1 flex flex-col gap-4">
              <FormLabel>Hasil <span className='text-red-500'>*</span></FormLabel>
              <FormControl>
                <SimpleEditor
                  content={field.value} onChange={field.onChange} 
                  className="max-h-full overflow-scroll"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}