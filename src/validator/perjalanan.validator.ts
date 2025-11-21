import { z } from 'zod';

export const perjalananSchema = z.object({
  perihal: z
    .object({
      type: z.literal('doc'),
      content: z.array(z.object({
        type: z.literal('paragraph'),
        content: z.array(z.any()).optional()
      }))
    })
    .refine(val => val.content[0].content, 'Perihal wajib diisi.'),
  
  tanggal: z
    .string('Tanggal tidak valid.')
    .nonempty('Tanggal wajib diisi.')
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Tanggal tidak valid")
    .refine(
        (value) => !isNaN(Date.parse(value)),
        "Tanggal tidak valid"
    ),

  rangka: z
    .object({
      type: z.literal('doc'),
      content: z.array(z.object({
        type: z.literal('paragraph'),
        content: z.array(z.any()).optional()
      }))
    })
    .refine(val => val.content[0].content, 'Rangka perjalanan dinas wajib diisi.'),

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

  tanggalSurat: z.string('Tanggal surat tugas tidak valid.')
    .nonempty('Tanggal surat tugas wajib diisi.')
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Tanggal surat tugas tidak valid")
    .refine(
        (value) => !isNaN(Date.parse(value)),
        "Tanggal surat tugas tidak valid"
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
    .object({
      type: z.literal('doc'),
      content: z.array(z.object({
        type: z.literal('paragraph'),
        content: z.array(z.any()).optional()
      }))
    })
    .refine(val => val.content[0].content, 'Tujuan perjalanan wajib diisi.'),

  latarBelakang: z
    .object({
      type: z.literal('doc'),
      content: z.array(z.object({
        type: z.literal('paragraph'),
        content: z.array(z.any()).optional()
      }))
    })
    .transform((val) => (val.content[0].content ? val : null))
    .nullable(),
  
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
  .nullable(),

  kegiatan: z.array(
    z.object({
      value: z
        .string('Bentuk kegiatan tidak valid.')
        .nonempty('Bentuk kegiatan wajib diisi.')
        .max(100, 'Bentuk kegiatan terlalu panjang (maks 100 karakter).'),
    })
  ).transform((val) => val.length > 0 ? val : null)
  .nullable(),

  hasil: z
    .object({
      type: z.literal('doc'),
      content: z.array(z.object({
        type: z.literal('paragraph'),
        content: z.array(z.any()).optional()
      }))
    })
    .refine(val => val.content[0].content, 'Hasil wajib diisi.'),

  namaPelapor: z.string('Nama tidak valid.')
    .nonempty('Nama wajib diisi.')
    .max(100, 'Nama terlalu panjang (maks 100 karakter).'),

  nipPelapor: z.string('NIP tidak valid.')
    .nonempty('NIP wajib diisi.')
    .max(100, 'NIP terlalu panjang (maks 100 karakter).'),

  dokumentasi: z.array(
    z.object({
      url: z.url('Foto dokumentasi wajib diunggah').nonempty('Foto dokumentasi wajib diunggah'),
      width: z.number('Ukuran lebar foto wajib diisi').positive(),
      height: z.number('Ukuran tiggi foto wajib diisi').positive(),
      ratio: z.number().positive(),
    })
  ).transform((val) => val.length > 0 ? val : null)
  .nullable(),
  
})

export type perjalananType = z.infer<typeof perjalananSchema>;