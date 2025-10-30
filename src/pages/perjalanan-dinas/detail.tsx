import type { SectionProps } from "@/types";
import type { perjalananType } from "@/validator/perjalanan.validator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InputField from "@/components/input-field";
import { DatePicker } from "@/components/date-picker";
import { FieldWrapper } from "@/components/field-wrapper";

export default function Detail({ form } : SectionProps<perjalananType>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detail Perjalanan Dinas</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldWrapper>
          <InputField 
            form={form}
            inputName={"suratTugas"}
            inputLabel={"Surat Tugas"}
            inputPlaceholder={"Surat tugas nomor"}
            isRequired
          />

          <DatePicker 
            form={form}
            inputName={"tanggalSurat"}
            inputLabel={"Tanggal Surat tugas"}
            inputPlaceholder={"Contoh: 2025-10-26"}
            isRequired
          />
        </FieldWrapper>

        <DatePicker 
          form={form}
          inputName={"waktuPelaksanaan"}
          inputLabel={"Waktu Pelaksanaan"}
          inputPlaceholder={"Contoh: 2025-10-26"}
          isRequired
        />

        <InputField 
          form={form}
          inputName={"lokasiPerjalanan"}
          inputLabel={"Lokasi"}
          inputPlaceholder={"Contoh: The Westin Hotel, Jakarta"}
          isRequired
        />

        <InputField 
          form={form}
          inputName={"tujuanPerjalanan"}
          inputLabel={"Tujuan Perjalanan"}
          inputPlaceholder={"Tujuan dilaksakan perjalanan dinas"}
          isRequired
        />

        
      </CardContent>
    </Card>
  )
}