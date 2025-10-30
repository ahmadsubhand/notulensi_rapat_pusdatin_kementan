import type { notulensiType } from "@/validator/notulensi.validator";
import type { perjalananType } from "@/validator/perjalanan.validator";
import dayjs from "dayjs";

export const notulensiRapat: notulensiType = {
  hariTanggal: dayjs().format('YYYY-MM-DD'),
  waktu_mulai: dayjs().format('HH.mm'),
  waktu_selesai: '',
  tempat: "Ruang Rapat A Pusdatin",
  pimpinan: "",
  notulen: "",
  peserta: [],
  agenda: "",
  isi: "",
  dokumentasi: [],
  isUseNotulis: false,
  notulis: "",
  kota: "Jakarta",
  tanggal: dayjs().format('YYYY-MM-DD'),
  tanda_tangan: '',
}

export const perjalananDinas: perjalananType = {
  perihal: '',
  tanggal: dayjs().format('YYYY-MM-DD'),
  rangka: '',
  lokasi: '',
  pelaksana: [],
  suratTugas: '',
  tanggalSurat: '',
  waktuPelaksanaan: '',
  lokasiPerjalanan: '',
  tujuanPerjalanan: '',
  latarBelakang: '',
  fasilitator: [],
  kegiatan: [],
  hasil: '',
  namaPelapor: '',
  nipPelapor: '',
  tandaTanganPelapor: ''
}