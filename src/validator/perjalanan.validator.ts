import { z } from 'zod';

export const perjalananSchema = z.object({
  perihal: z
    .string('Perihal tidak valid.')
    .nonempty('Perihal wajib diisi.')
    .max(255, 'Perihal terlalu panjang (maks 255 karakter).'),
  
  tanggal: z
    .string('Tanggal tidak valid.')
    .nonempty('Tanggal wajib diisi.')
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Tanggal tidak valid")
    .refine(
        (value) => !isNaN(Date.parse(value)),
        "Tanggal tidak valid"
    ),

  rangka: z
    .string('Rangka perjalanan dinas tidak valid.')
    .nonempty('Rangka perjalanan dinas wajib diisi.')
    .max(255, 'Rangka perjalanan dinas terlalu panjang (maks 255 karakter).'),

  lokasi: z
    .string('Lokasi tidak valid.')
    .nonempty('Lokasi wajib diisi.')
    .max(100, 'Lokasi terlalu panjang (maks 100 karakter).'),
  
  pelaksana: z.array(
    z.object({
      nama: z.string('Nama tidak valid.').nonempty('Nama wajib diisi.').max(100, 'Nama terlalu panjang (maks 100 karakter).'),
      nip: z.string('NIP tidak valid.').nonempty('NIP wajib diisi.').max(100, 'NIP terlalu panjang (maks 100 karakter).'),
    })
  ).nonempty('Minimal satu pelaksana perjalanan dinas'),

  suratTugas: z
    .string('Surat tugas tidak valid.')
    .nonempty('Surat tugas wajib diisi.')
    .max(100, 'Surat tugas terlalu panjang (maks 100 karakter).'),

  tanggalSurat: z.string('Tanggal tidak valid.')
    .nonempty('Tanggal wajib diisi.')
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Tanggal tidak valid")
    .refine(
        (value) => !isNaN(Date.parse(value)),
        "Tanggal tidak valid"
    ),

  waktuPelaksanaan: z.string('Waktu pelaksanaan tidak valid.')
    .nonempty('Waktu pelaksanaan wajib diisi.')
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Waktu pelaksanaan tidak valid")
    .refine(
        (value) => !isNaN(Date.parse(value)),
        "Waktu pelaksanaan tidak valid"
    ),

  lokasiPerjalanan: z
    .string('Lokasi perjalanan tidak valid.')
    .nonempty('Lokasi perjalanan wajib diisi.')
    .max(100, 'Lokasi perjalanan terlalu panjang (maks 100 karakter).'),

  tujuanPerjalanan: z
    .string('Tujuan perjalanan tidak valid.')
    .nonempty('Tujuan perjalanan wajib diisi.')
    .max(255, 'Tujuan perjalanan terlalu panjang (maks 255 karakter).'),

  latarBelakang: z
    .string('Latar belakang tidak valid.')
    .trim()
    .transform((val) => (val === '' ? null : val))
    .nullable()
    .optional(),
  
  fasilitator: z.array(
    z.object({
      nama: z
        .string('Nama tidak valid.')
        .nonempty('Nama wajib diisi.')
        .max(100, 'Nama terlalu panjang (maks 100 karakter).'),
      deskripsi: z.string('Deskripsi tidak valid.')
        .nonempty('Deskripsi wajib diisi.')
        .max(255, 'Deskripsi terlalu panjang (maks 255 karakter).'),
    })
  ).transform((val) => val.length > 0 ? val : null)
  .nullable()
  .optional(),

  kegiatan: z.array(
    z.object({
      value: z
        .string('Bentuk kegiatan tidak valid.')
        .nonempty('Bentuk kegiatan wajib diisi.')
        .max(100, 'Bentuk kegiatan terlalu panjang (maks 100 karakter).'),
    })
  ).transform((val) => val.length > 0 ? val : null)
  .nullable()
  .optional(),

  hasil: z
    .string('Hasil tidak valid.')
    .trim()
    .nonempty('Hasil wajib diisi.'),

  namaPelapor: z.string('Nama tidak valid.')
    .nonempty('Nama wajib diisi.')
    .max(100, 'Nama terlalu panjang (maks 100 karakter).'),

  nipPelapor: z.string('NIP tidak valid.')
    .nonempty('NIP wajib diisi.')
    .max(100, 'NIP terlalu panjang (maks 100 karakter).'),

  tandaTanganPelapor: z
    .url("Foto tanda tangan pelapor wajib diunggah")
})

export type perjalananType = z.infer<typeof perjalananSchema>;