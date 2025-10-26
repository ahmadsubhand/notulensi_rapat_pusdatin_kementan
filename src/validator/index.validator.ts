import { z } from 'zod';

export const notulensiSchema = z.object({
  hariTanggal: z
    .string({ message: 'Tanggal tidak valid' })
    .nonempty('Hari/Tanggal wajib diisi.')
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Tanggal tidak valid")
    .refine(
        (value) => !isNaN(Date.parse(value)),
        "Tanggal tidak valid"
    ),

  waktu_mulai: z
    .string()
    .trim()
    .nonempty('Waktu mulai wajib diisi.')
    .regex(/^(?:[01]\d|2[0-3])\.[0-5]\d$/, 'Tidak valid (contoh: 09.00)'),

  waktu_selesai: z.preprocess(
    val => (val === '' ? null : val),
    z
      .string()
      .trim()
      .regex(/^(?:[01]\d|2[0-3])\.[0-5]\d$/, 'Tidak valid (contoh: 10.30)')
      .nullable()
      .optional()
  ),

  tempat: z
    .string()
    .trim()
    .nonempty('Tempat wajib diisi.')
    .max(100, 'Tempat terlalu panjang (maks 100 karakter).'),

  pimpinan: z
    .string()
    .trim()
    .nonempty('Pimpinan rapat wajib diisi.')
    .max(100, 'Pimpinan rapat terlalu panjang (maks 100 karakter).'),
  
  notulen: z
    .string()
    .trim()
    .nonempty('Notulen rapat wajib diisi.')
    .max(100, 'Notulen rapat terlalu panjang (maks 100 karakter).'),

  peserta: z.array(
    z.object({
      nama: z.string().nonempty('Peserta rapat wajib diisi').max(100, 'Peserta rapat terlalu panjang (maks 100 karakter).'),
    })
  ).nonempty('Minimal satu peserta rapat'),

  agenda: z
    .string()
    .trim()
    .nonempty('Agenda wajib diisi.')
    .max(1000, 'Agenda terlalu panjang (maks 1000 karakter).'),

  isi: z
    .string()
    .trim()
    .nonempty('Isi konten wajib diisi.'),

  dokumentasi: z.array(
    z.object({
      url: z.url('Foto dokumentasi rapat wajib diunggah').nonempty('Foto dokumentasi rapat wajib diunggah'),
      width: z.number('Ukuran lebar foto wajib diisi').positive(),
      height: z.number('Ukuran tiggi foto wajib diisi').positive(),
      ratio: z.number().positive(),
    })
  ).nonempty('Minimal satu foto dokumentasi rapat'),

  notulis: z
    .string()
    .trim()
    .nonempty('Notulen wajib diisi.')
    .max(100, 'Notulen terlalu panjang (maks 100 karakter).'),

  tanggal: z.string({ message: 'Tanggal tidak valid' })
    .nonempty('Tanggal ditandatangani wajib diisi.')
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Tanggal tidak valid")
    .refine(
        (value) => !isNaN(Date.parse(value)),
        "Tanggal tidak valid"
    ),

  kota: z
    .string()
    .trim()
    .nonempty('Nama kota tempat ditandatangani wajib diisi.')
    .max(20, 'Nama kota terlalu panjang (maks 20 karakter).'),

  tanda_tangan: z.url('Foto dokumentasi rapat wajib diunggah').nonempty('Foto tanda tangan notulen wajib diunggah'),
})

export type notulensiType = z.infer<typeof notulensiSchema>;