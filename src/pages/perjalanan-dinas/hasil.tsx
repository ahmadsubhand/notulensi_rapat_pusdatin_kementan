import type { SectionProps } from "@/types";
import type { perjalananType } from "@/validator/perjalanan.validator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InputField from "@/components/input-field";
import RichField from "@/components/rich-field";
import { useFieldArray } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

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
              {fasilitatorField.fields.length > 0 &&
                fasilitatorField.fields.map((field, index) => (
                  <div className="flex gap-4" key={field.id}>
                    <InputField
                      form={form}
                      inputName={`pelaksana.${index}.nama`}
                      className="w-full"
                      inputPlaceholder="Nama peserta pelaksana"
                      isRequired
                    />
                    <InputField
                      form={form}
                      inputName={`pelaksana.${index}.nip`}
                      className="w-full"
                      inputPlaceholder="NIP peserta pelaksana"
                      isRequired
                    />
                    <Button onClick={() => fasilitatorField.remove(index)} type="button" size={'icon'}>
                      <Trash />
                    </Button>
                  </div>
                ))
              }
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
              {bentukKegiatanField.fields.length > 0 &&
                bentukKegiatanField.fields.map((field, index) => (
                  <div className="flex gap-4" key={field.id}>
                    <InputField
                      form={form}
                      inputName={`kegiatan.${index}.value`}
                      className="w-full"
                      inputPlaceholder="Bentuk kegiatan"
                      isRequired
                    />
                    <Button onClick={() => bentukKegiatanField.remove(index)} type="button" size={'icon'}>
                      <Trash />
                    </Button>
                  </div>
                ))
              }
              <FormMessage />
            </FormItem>
          )}
        />
        <Button onClick={() => bentukKegiatanField.append({
          value: ''
        })} type="button">
          Tambah fasilitator/petugas <Plus />
        </Button>

        <RichField 
          form={form}
          inputName={"hasil"}
          inputLabel={"Hasil"}
          inputPlaceholder={"Hasil perjalanan dinas"}
          isPargraphAllowed
          isRequired
        />
      </CardContent>
    </Card>
  )
}