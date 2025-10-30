import type { SectionProps } from "@/types";
import type { perjalananType } from "@/validator/perjalanan.validator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InputField from "@/components/input-field";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { handleImageUpload } from "@/lib/tiptap-utils";


export default function Pelapor({ form } : SectionProps<perjalananType>) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null | undefined>(form.watch('tandaTanganPelapor'));

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setUploading(true);
      const url = await handleImageUpload(file, ({ progress }) => {
        console.log(`Progress: ${progress}%`);
      });
      form.setValue("tandaTanganPelapor", url, { shouldValidate: true }); // set hasil upload ke form
      setPreview(url); // tampilkan preview
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pelapor Perjalanan Dinas</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <InputField
          form={form}
          inputName={"namaPelapor"}
          inputLabel={"Nama"}
          inputPlaceholder={"Nama pelapor"}
          isRequired
        />

        <InputField
          form={form}
          inputName={"nipPelapor"}
          inputLabel={"NIP"}
          inputPlaceholder={"NIP pelapor"}
          isRequired
        />

        <FormField
          control={form.control}
          name={"tandaTanganPelapor"}
          render={() => (
            <FormItem className="flex-1 flex flex-col gap-4">
              <FormLabel>Tanda Tangan <span className='text-red-500'>*</span></FormLabel>
              <FormControl>
                <Input 
                  type={'file'}
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                />
              </FormControl>
              {uploading && <p>Mengupload...</p>}
              {preview && (
                <img src={preview} alt="Preview" className="mt-2 h-30 object-contain object-left" />
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>  
    </Card>
  )
}