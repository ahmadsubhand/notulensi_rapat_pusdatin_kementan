import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SectionProps } from "@/types";
import InputField from "@/components/input-field";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import type { notulensiType } from "@/validator/notulensi.validator";

export default function Isi({ form } : SectionProps<notulensiType>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Isi</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <InputField
          form={form}
          inputName="agenda"
          inputLabel="Agenda"
          inputPlaceholder="Contoh: Koordinasi Input Usulan Daftar Data Prioritas Tahun 2025"
          isRequired
        />
        <FormField
          control={form.control}
          name={'isi'}
          render={({ field }) => (
            <FormItem className="flex-1 flex flex-col gap-4">
              <FormLabel>Isi Rapat <span className='text-red-500'>*</span></FormLabel>
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