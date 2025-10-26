import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/date-picker";
import { FieldWrapper } from "@/components/field-wrapper";
import type { SectionProps } from "@/types";
import InputField from "@/components/input-field";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Pelaksanaan({ form } : SectionProps) {
  const isMobile = useIsMobile();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pelaksanaan</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <DatePicker 
          form={form}
          inputName="hariTanggal"
          inputLabel="Hari / Tanggal"
          inputPlaceholder="Contoh: 2025-10-26"
          isRequired
        />

        <FieldWrapper isMobile={isMobile}>
          <InputField
            form={form}
            inputName="waktu_mulai"
            inputLabel="Waktu Mulai"
            inputPlaceholder="Contoh: 09.00"
            className="w-full"
            isRequired
          />

          <InputField
            form={form}
            inputName="waktu_selesai"
            inputLabel="Waktu Selesai"
            inputPlaceholder="Contoh: 10.30"
            className="w-full"
          />
        </FieldWrapper>

        <InputField
          form={form}
          inputName="tempat"
          inputLabel="Tempat"
          inputPlaceholder="Contoh: Ruang Rapat A Pusdatin"
          isRequired
        />
      </CardContent>
    </Card>
  )
}