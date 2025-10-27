import dayjs from "dayjs";

export const defaultValues = {
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