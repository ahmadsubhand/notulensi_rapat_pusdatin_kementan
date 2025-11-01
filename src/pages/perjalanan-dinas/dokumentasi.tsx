import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { handleImageUpload } from "@/lib/tiptap-utils";
import type { SectionProps } from "@/types";
import type { perjalananType } from "@/validator/perjalanan.validator";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { MoveLeft, RefreshCcw } from "lucide-react";
import { PERJALANAN_KEY } from "@/lib/storage-key";
import { perjalananDinas } from "@/lib/default-values";

export default function Dokumentasi({ form } : SectionProps<perjalananType>) {
  const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: 'dokumentasi'
    })
  
  const addRow = () => {
    append({
      url: "",
      width: 1,
      height: 1,
      ratio: 1
    })
  }

  const removeRow = (index: number) => {
    remove(index)
  }

  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setUploading(true);
      const url = await handleImageUpload(file, ({ progress }) => {
        console.log(`Progress: ${progress}%`);
      });
      
      const img = new Image();
      img.onload = () => {
        const ratio = img.width / img.height;

        const newHeight = 68;
        const newWidth = Math.round(newHeight * ratio);

        // Set semua nilai ke form
        form.setValue(`dokumentasi.${index}.url`, url, { shouldValidate: true });
        form.setValue(`dokumentasi.${index}.width`, newWidth, { shouldValidate: true });
        form.setValue(`dokumentasi.${index}.height`, newHeight, { shouldValidate: true });
        form.setValue(`dokumentasi.${index}.ratio`, ratio);
      };
      img.src = url;
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    localStorage.removeItem(PERJALANAN_KEY);
    form.reset(perjalananDinas);
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newWidth = parseFloat(e.target.value);
    const ratio = form.getValues(`dokumentasi.${index}.ratio`);
    if (ratio && newWidth > 0) {
      const newHeight = Math.round(newWidth / ratio);
      form.setValue(`dokumentasi.${index}.width`, newWidth);
      form.setValue(`dokumentasi.${index}.height`, newHeight);
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newHeight = parseFloat(e.target.value);
    const ratio = form.getValues(`dokumentasi.${index}.ratio`);
    if (ratio && newHeight > 0) {
      const newWidth = Math.round(newHeight * ratio);
      form.setValue(`dokumentasi.${index}.height`, newHeight);
      form.setValue(`dokumentasi.${index}.width`, newWidth);
    }
  };

  const dokumentasi = form.watch('dokumentasi') as perjalananType["dokumentasi"];

  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dokumentasi</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FormField 
          control={form.control} 
          name={'dokumentasi'}
          render={() => (
            <FormItem>
              {fields.length > 0 ?
                fields.map((field, index) => (
                  <div className="flex flex-col sm:flex-row gap-4" key={field.id}>
                    <FormField
                      control={form.control}
                      name={`dokumentasi.${index}.url`}
                      render={() => (
                        <FormItem className="w-full">
                          <FormLabel>Foto Dokumentasi <span className='text-red-500'>*</span></FormLabel>
                          <FormControl>
                            <Input 
                              type={'file'}
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, index)}
                              disabled={uploading}
                            />
                          </FormControl>
                          {uploading && <p>Mengupload...</p>}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`dokumentasi.${index}.width`}
                      render={() => (
                        <FormItem className="w-full">
                          <FormLabel>Lebar Foto <span className='text-red-500'>*</span></FormLabel>
                          <FormControl>
                            <Input 
                              value={form.watch(`dokumentasi.${index}.width`)}
                              type={'number'}
                              onChange={(e) => handleWidthChange(e, index)}
                              placeholder="Lebar foto"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`dokumentasi.${index}.height`}
                      render={() => (
                        <FormItem className="w-full">
                          <FormLabel>Tinggi Foto <span className='text-red-500'>*</span></FormLabel>
                          <FormControl>
                            <Input 
                              type={'number'}
                              value={form.watch(`dokumentasi.${index}.height`)}
                              onChange={(e) => handleHeightChange(e, index)}
                              placeholder="Tinggi foto"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button onClick={() => removeRow(index)} type="button" size={'icon'} className="self-end">
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
          Tambah foto dokumentasi <Plus />
        </Button>
        <div className="w-full overflow-x-scroll">
          {dokumentasi && dokumentasi.length > 0 && (
            <div className="flex flex-row flex-wrap gap-3 items-end w-116 border border-gray-300 self-center">
              {dokumentasi.map((image, index) => {
                return image.url ? (
                  <img key={index} className="mt-2 object-cover" 
                  src={image.url} width={image.width} height={image.height} />
                ) : (
                  <Skeleton className="mt-2 h-17 w-25" key={index} /> 
                )
              })}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="gap-4 flex-col sm:flex-row">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type={'button'} variant={'outline'}>
              <RefreshCcw /> Atur ulang seluruh form
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
              <AlertDialogDescription>
                Formulir akan diatur ulang, seluruh kolom yang sudah diisi akan dihapus dan dikembalikan ke kondisi semula. Tindakan ini tidak dapat dikembalikan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel><MoveLeft />Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleClear}>Atur ulang <RefreshCcw /></AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        <Button type={'submit'}>
          Tampilkan pdf
        </Button>
      </CardFooter>
    </Card>
  )
}