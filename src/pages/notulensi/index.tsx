import { PDFViewer } from "@react-pdf/renderer";
import Preview from "./preview";
import { useForm, type FieldErrors } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { notulensiSchema } from "@/validator/index.validator";
import type { notulensiType } from "@/validator/index.validator";
import { createRoot } from "react-dom/client";
import { Form } from "@/components/ui/form";
import { Editor } from "@tiptap/react";
import extensionEditor from "@/components/tiptap-templates/simple/extension-editor";
import AppLogo from "@/components/app-logo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Peserta from "./peserta";
import Pelaksanaan from "./pelaksanaan";
import Isi from "./isi";
import Dokumentasi from "./dokumentasi";
import Notulen from "./notulen";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { defaultValues } from "@/lib/default-values";
import { STORAGE_KEY } from "@/lib/storage-key";

export default function Notulensi() {
  // Form

  const form = useForm<notulensiType>({
    resolver: zodResolver(notulensiSchema),
    mode: "onChange",
    defaultValues: defaultValues,
  });

  const onSubmit = (values: notulensiType) => {
    const editor = new Editor({
      extensions: extensionEditor(),
      content: values.isi
    })

    const newWindow = window.open("", "_blank");
    if (newWindow) {
      // buat root React di window baru
      const root = createRoot(newWindow.document.body);

      // atur style agar fullscreen & bersih
      newWindow.document.title = "Notulensi Rapat - PDF";
      newWindow.document.body.style.margin = "0";
      newWindow.document.body.style.padding = "10px";
      newWindow.document.body.style.height = "95vh";

      // render PDF di window baru
      root.render(
        <PDFViewer width="100%" height="100%">
          <Preview data={values} isiRapat={editor.getJSON()}/>
        </PDFViewer>
      );
    }
  }

  // Backup Local Storage

  const { watch, reset } = form;

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData) as notulensiType;
        reset(parsed);
        console.log("Form data loaded from localStorage");
      } catch (err) {
        console.log("Error parsing saved data: ", err);
      }
    }
  }, [reset])

  useEffect(() => {
    const subscription = watch((values) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    });

    return () => subscription.unsubscribe();
  }, [watch])

  // Component 

  const menus = [
    { value: 'pelaksanaan', label: 'Pelaksanaan', form: <Pelaksanaan form={form} /> },
    { value: 'peserta', label: 'Peserta', form: <Peserta form={form} /> },
    { value: 'isi', label: 'Isi', form: <Isi form={form} /> },
    { value: 'dokumentasi', label: 'Dokumentasi', form: <Dokumentasi form={form} /> },
    { value: 'notulis', label: 'Notulis', form: <Notulen form={form} /> },
  ];

  const [fieldToTab] = useState<Record<keyof notulensiType, string>>({
    hariTanggal: menus[0].value,
    waktu_mulai: menus[0].value,
    waktu_selesai: menus[0].value,
    tempat: menus[0].value,

    pimpinan: menus[1].value,
    notulen: menus[1].value,
    peserta: menus[1].value,

    agenda: menus[2].value,
    isi: menus[2].value,

    dokumentasi: menus[3].value,

    isUseNotulis: menus[4].value,
    notulis: menus[4].value,
    tanggal: menus[4].value,
    kota: menus[4].value,
    tanda_tangan: menus[4].value
  })

  const [step, setStep] = useState(menus[0].value);

  function onInvalid(errors: FieldErrors) {
    const firstErrorField = Object.keys(errors)[0] as keyof notulensiType;
    if (firstErrorField) {
      setStep(fieldToTab[firstErrorField]);
    }
  }

  const isNotMobile = useIsMobile();

  // const isi = form.watch('isi');
  // useEffect(() => {
  //   const editor = new Editor({
  //     extensions: extensionEditor(),
  //     content: isi
  //   })
  //   console.log(editor.getJSON());
  // }, [isi])

  // const dokumentasi = form.watch('dokumentasi');
  useEffect(() => {
    console.log(form.formState.errors);
  }, [form.formState.errors])

  return (
    <div className="w-full">
      {/* Form Input */}
      <div className="flex gap-2 m-6">
        <AppLogo fullText={true} />
      </div>

      <div className="flex flex-col justify-center items-center gap-6">
        <h1 className="font-bold text-xl">Notulensi Rapat Pusdatin</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          >
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
      </div>
    </div>
  )
}