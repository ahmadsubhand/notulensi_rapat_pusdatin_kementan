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
  isi: {
    type: 'doc',
    content: []
  },
  dokumentasi: [],
  isUseNotulis: false,
  notulis: "",
  kota: "Jakarta",
  tanggal: dayjs().format('YYYY-MM-DD'),
  tanda_tangan: '',
}

export const perjalananDinas: perjalananType = {
  perihal: {
    type: 'doc',
    content: []
  },
  tanggal: dayjs().format('YYYY-MM-DD'),
  rangka: {
    type: 'doc',
    content: []
  },
  lokasi: '',
  pelaksana: [],
  suratTugas: '',
  tanggalSurat: '',
  waktuPelaksanaan: '',
  lokasiPerjalanan: '',
  tujuanPerjalanan: {
    type: 'doc',
    content: []
  },
  latarBelakang: {
    type: 'doc',
    content: []
  },
  fasilitator: [],
  kegiatan: [],
  hasil: {
    type: 'doc',
    content: []
  },
  namaPelapor: '',
  nipPelapor: '',
  tandaTanganPelapor: '',
  dokumentasi: []
}