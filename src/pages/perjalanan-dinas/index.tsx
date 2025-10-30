import { Form } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import AppLayout from "@/layout/app-layout";
import { perjalananDinas } from "@/lib/default-values";
import { PERJALANAN_KEY } from "@/lib/storage-key";
import { perjalananSchema, type perjalananType } from "@/validator/perjalanan.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import Memorandum from "./memorandum";
import Detail from "./detail";
import Hasil from "./hasil";
import Pelapor from "./pelapor";

export default function Perjalanan() {
  const form = useForm<perjalananType>({
    resolver: zodResolver(perjalananSchema),
    mode: "onChange",
    defaultValues: perjalananDinas,
  });

  // Backup Local Storage
  
  const { watch, reset } = form;

  useEffect(() => {
    const savedData = localStorage.getItem(PERJALANAN_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData) as perjalananType;
        reset(parsed);
        console.log("Form data loaded from localStorage");
      } catch (err) {
        console.log("Error parsing saved data: ", err);
      }
    }
  }, [reset])

  useEffect(() => {
    const subscription = watch((values) => {
      localStorage.setItem(PERJALANAN_KEY, JSON.stringify(values));
    });

    return () => subscription.unsubscribe();
  }, [watch])

  // Component

  const menus = [
    { value: 'memorandum', label: 'Memorandum', form: <Memorandum form={form} /> },
    { value: 'detail', label: 'Detail', form: <Detail form={form} /> },
    { value: 'hasil', label: 'Hasil', form: <Hasil form={form} /> },
    { value: 'pelapor', label: 'Pelapor', form: <Pelapor form={form} /> },
  ]

  const [fieldToTab] = useState<Record<keyof perjalananType, string>>({
    perihal: menus[0].value,
    tanggal: menus[0].value,
    rangka: menus[0].value,
    lokasi: menus[0].value,
    pelaksana: menus[0].value,

    suratTugas: menus[1].value,
    tanggalSurat: menus[1].value,
    waktuPelaksanaan: menus[1].value,
    lokasiPerjalanan: menus[1].value,
    tujuanPerjalanan: menus[1].value,

    latarBelakang: menus[2].value,
    fasilitator: menus[2].value,
    kegiatan: menus[2].value,
    hasil: menus[2].value,

    namaPelapor: menus[3].value,
    nipPelapor: menus[3].value,
    tandaTanganPelapor: menus[3].value,
  })

  const [step, setStep] = useState(menus[0].value);
  
  function onInvalid(errors: FieldErrors) {
    const firstErrorField = Object.keys(errors)[0] as keyof perjalananType;
    if (firstErrorField) {
      setStep(fieldToTab[firstErrorField]);
    }
  }

  const isNotMobile = useIsMobile();

  return (
    <AppLayout h1Content="Perjalanan Dinas Pusdatin">
      <Form {...form}>
        <form action="">
          <Tabs value={step} onValueChange={setStep} className="flex flex-col gap-4 w-xs sm:min-w-xl overflow-scroll p-2">
            {isNotMobile ? (
              <Select
                value={step}
                onValueChange={setStep}
              >
                <SelectTrigger>
                  <SelectValue placeholder={'Navigasi'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Navigasi</SelectLabel>
                    {menus.map((menu, index) => (
                      <SelectItem value={menu.value} key={index}>{menu.label}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <TabsList>
                {menus.map((menu, index) => (
                  <TabsTrigger value={menu.value} key={index}>{menu.label}</TabsTrigger>
                ))}
              </TabsList>
            )}
            

            {menus.map((menu, index) => (
              <TabsContent value={menu.value} key={index}>
                {menu.form}
              </TabsContent>
            ))}
          </Tabs>
        </form>
      </Form>
    </AppLayout>
  )
}