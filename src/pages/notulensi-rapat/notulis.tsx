import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { SectionProps } from "@/types";
import InputField from "@/components/input-field";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { handleImageUpload } from "@/lib/tiptap-utils";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/date-picker";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { notulensiRapat } from "@/lib/default-values";
import { NOTULENSI_KEY } from "@/lib/storage-key";
import { MoveLeft, RefreshCcw } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import type { notulensiType } from "@/validator/notulensi.validator";

export default function Notulen({ form } : SectionProps<notulensiType>) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null | undefined>(form.watch('tanda_tangan'));

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setUploading(true);
      const url = await handleImageUpload(file, ({ progress }) => {
        console.log(`Progress: ${progress}%`);
      });
      form.setValue("tanda_tangan", url, { shouldValidate: true }); // set hasil upload ke form
      setPreview(url); // tampilkan preview
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    localStorage.removeItem(NOTULENSI_KEY);
    form.reset(notulensiRapat);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notulis</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 mb-4">
          <Switch 
            id="active" 
            onCheckedChange={(checked) => form.setValue('isUseNotulis', checked)} 
            checked={form.watch('isUseNotulis')} />
          <Label htmlFor="active">Apakah perlu tanda tangan notulis?</Label>
        </div>

        {form.watch('isUseNotulis') && (
          <>
            <InputField 
              form={form}
              inputName="notulis"
              inputLabel="Nama"
              inputPlaceholder="Nama notulis rapat"
              isRequired
            />
            <InputField 
              form={form}
              inputName="kota"
              inputLabel="Kota"
              inputPlaceholder="Nama kota tempat ditandatangani"
              isRequired
            />
            <DatePicker
              form={form}
              inputName="tanggal"
              inputLabel="Tanggal"
              inputPlaceholder="Tanggal ditandatangani"
              isRequired
            />
            <FormField
              control={form.control}
              name={'tanda_tangan'}
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
          </>
        )}

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