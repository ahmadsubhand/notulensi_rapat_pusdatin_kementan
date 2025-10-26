import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SectionProps } from "@/types";
import InputField from "@/components/input-field";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

export default function Peserta({ form } : SectionProps) {
  const { fields, append, remove } = useFieldArray({
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
              {fields.length > 0 ?
                fields.map((field, index) => (
                  <div className="flex gap-4" key={field.id}>
                    <InputField
                      form={form}
                      inputName={`peserta.${index}.nama`}
                      className="w-full"
                      inputPlaceholder="Contoh: Ketua Kelompok Data Komoditas"
                    />
                    <Button onClick={() => removeRow(index)} type="button" size={'icon'}>
                      <Trash />
                    </Button>
                  </div>
                )) : (
                  <></>
                )
              }
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