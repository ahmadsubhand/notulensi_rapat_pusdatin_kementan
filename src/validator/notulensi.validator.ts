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

  waktu_selesai: z
    .string()
    .trim()
    .regex(/^$|^(?:[01]\d|2[0-3])\.[0-5]\d$/, 'Tidak valid (contoh: 10.30)')
    .transform((val) => (val === '' ? null : val))
    .nullable()
    .optional(),

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
    .object({
      type: z.literal('doc'),
      content: z.array(z.object({
        type: z.literal('paragraph'),
        content: z.array(z.any()).optional()
      }))
    })
    .refine(val => val.content[0].content, 'Isi rapat wajib diisi.'),

  dokumentasi: z.array(
    z.object({
      url: z.url('Foto dokumentasi rapat wajib diunggah').nonempty('Foto dokumentasi rapat wajib diunggah'),
      width: z.number('Ukuran lebar foto wajib diisi').positive(),
      height: z.number('Ukuran tiggi foto wajib diisi').positive(),
      ratio: z.number().positive(),
    })
  ).nonempty('Minimal satu foto dokumentasi rapat'),

  isUseNotulis: z.boolean(),

  notulis: z
    .string()
    .trim()
    .max(100, 'Notulen terlalu panjang (maks 100 karakter).')
    .transform((val) => (val === '' ? null : val))
    .nullable()
    .optional(),

  tanggal: z.string({ message: 'Tanggal tidak valid' })
    .nonempty('Tanggal ditandatangani wajib diisi.')
    .regex(/^$|^\d{4}-\d{2}-\d{2}$/, "Tanggal tidak valid")
    .refine(
      (value) => value === "" || !isNaN(Date.parse(value)),
      "Tanggal tidak valid"
    )
    .transform((val) => (val === '' ? null : val))
    .nullable()
    .optional(),

  kota: z
    .string()
    .trim()
    .max(20, 'Nama kota terlalu panjang (maks 20 karakter).')
    .transform((val) => (val === '' ? null : val))
    .nullable()
    .optional(),

  tanda_tangan: z
    .string()
    .trim()
    .refine(
      (val) => val === "" || /^https?:\/\/.+/.test(val),
      "Foto tanda tangan notulen wajib diunggah"
    )
    .transform((val) => (val === '' ? null : val))
    .nullable()
    .optional(),
})

export type notulensiType = z.infer<typeof notulensiSchema>;