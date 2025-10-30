import type { SectionProps } from "@/types";
import type { perjalananType } from "@/validator/perjalanan.validator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/date-picker";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import RichField from "@/components/rich-field";
import InputField from "@/components/input-field";
import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

export default function Memorandum({ form } : SectionProps<perjalananType>) {
  const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: 'pelaksana'
    })
  
  const addRow = () => {
    append({
      nama: "",
      nip: ""
    })
  }

  const removeRow = (index: number) => {
    remove(index)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Memorandum</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <RichField 
          form={form}
          inputName="perihal"
          inputLabel="Perihal"
          inputPlaceholder="Perihal kegiatan"
          isRequired
        />
        
        <DatePicker 
          form={form}
          inputName={"tanggal"}
          inputLabel="Tanggal"
          inputPlaceholder="Contoh: 2025-10-26"
          isRequired
        />

        <RichField 
          form={form}
          inputName="rangka"
          inputLabel="Rangka Perjalanan Dinas"
          inputPlaceholder="Perjalanan dinas dalam rangka"
          isRequired
        />

        <InputField 
          form={form}
          inputName="lokasi"
          inputLabel="Lokasi"
          inputPlaceholder="Contoh: Hotel Westin, Jakarta Selatan"
          isRequired
        />

        <FormField 
          control={form.control} 
          name={'pelaksana'}
          render={() => (
            <FormItem>
              <FormLabel>Daftar Peserta Pelaksana <span className='text-red-500'>*</span></FormLabel>
              {fields.length > 0 &&
                fields.map((field, index) => (
                  <div className="flex gap-4" key={field.id}>
                    <InputField
                      form={form}
                      inputName={`pelaksana.${index}.nama`}
                      className="w-full"
                      inputPlaceholder="Nama peserta pelaksana"
                    />
                    <InputField
                      form={form}
                      inputName={`pelaksana.${index}.nip`}
                      className="w-full"
                      inputPlaceholder="NIP peserta pelaksana"
                    />
                    <Button onClick={() => removeRow(index)} type="button" size={'icon'}>
                      <Trash />
                    </Button>
                  </div>
                ))
              }
              <FormMessage />
            </FormItem>
          )}
        />
        <Button onClick={addRow} type="button">
          Tambah peserta pelaksana <Plus />
        </Button>
      </CardContent>
    </Card>
  )
}