import { Page, Text, View, Document, StyleSheet, Image, Font, render, Link } from '@react-pdf/renderer';
import type { JSONContent } from '@tiptap/react';
import type { ReactNode } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import type { perjalananType } from '@/validator/perjalanan.validator';

dayjs.locale('id');

Font.register({
  family: 'Times New Roman',
  fonts: [
    {
      src: '/font/times/times.ttf', // Regular
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    {
      src: '/font/times/timesi.ttf', // Italic
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
    {
      src: '/font/times/timesb.ttf', // Bold
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
    {
      src: '/font/arial/timesbi.ttf', // Bold Italic
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
  ],
});

Font.registerHyphenationCallback(word => [word])

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    paddingTop: '64px',
    paddingLeft: '70px',
    paddingRight: '70px',
    paddingBottom: '64px',
    fontSize: '12px',
    lineHeight: '18px',
    textAlign: 'justify',
    fontFamily: 'Times New Roman'
  },

  heading1: {
    fontSize: '12px',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Marks styles
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  strike: { textDecoration: 'line-through' },
  underline: { textDecoration: 'underline' },
  link: { color: "blue", textDecoration: "underline" },

  // Attr styles
  textLeft: { textAlign: 'left' },
  textRight: { textAlign: 'right' },
  textCenter: { textAlign: 'center' },
  textJustify: { textAlign: 'justify' },

  // List style
  list: {
    display: 'flex',
    flexDirection: 'column',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    // gap: '4px'
  },
  bullet: {
    width: '4px',
    height: '4px',
    transform: 'translateY(4px)'
  },
  bulletLevel1: {
    backgroundColor: 'black',
    borderRadius: '100px',
  },
  bulletLevel2: {
    borderRadius: '100px',
    border: '1px solid black',
  },
  bulletLevel3: {
    backgroundColor: 'black'
  },
})

export default function Preview({ 
  data
}: {
  data: perjalananType
}) {
  return (
    <Document>
      <Page size={'A4'} style={[styles.page, { position: 'relative' }]}>
        <Text style={[styles.heading1]}>MEMORANDUM</Text>
        <View style={{ paddingVertical: '16px', borderBottom: '1px solid black' }}>
          <LayoutInfo title='Yang terhormat' content="Pejabat Pembuat Komitmen Pusat Data dan Sistem Informasi Pertanian" />
          <LayoutInfo title='Dari' content="Pelaksana" />
          <LayoutInfo title='Perihal' content={renderContent(data.perihal)} />
          <LayoutInfo title='Tanggal' content={dayjs(data.tanggal).format('DD MMMM YYYY')} />
        </View>

        <View style={{ paddingVertical: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Text>
            {'Dengan hormat,\n'}
            Bersama ini kami laporkan hasil Perjalanan Dinas dalam rangka {renderContent(data.rangka)} di {data.lokasi}.
          </Text>
          <Text>Demikian laporan ini kami sampaikan untuk dapat dipergunakan sebagaimana mestinya.</Text>
          <Text>Yang Melaksanakan Tugas:</Text>
          <View style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
            {data.pelaksana.map((item, i) => (
              <View style={{ display: 'flex', flexDirection: 'row',  flexWrap: 'wrap', gap: '8px' }} key={i}>
                <Text style={{ width: '20px' }}>{i+1}.</Text>
                <Text style={{ width: '240px' }}>{item.nama}</Text>
                <Text style={{ width: '136px' }}>NIP. {item.nip}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>

      <Page size={'A4'} style={[styles.page, { position: 'relative' }]}>
        <Text style={[styles.heading1, { marginBottom: '32px' }]}>LAPORAN PERJALANAN DINAS</Text>

        <LayoutContent romanNumber='I' title='DASAR HUKUM'>
          <Text>Surat Tugas Nomor: {data.suratTugas}, Tanggal {dayjs(data.tanggalSurat).format('DD MMMM YYYY')}</Text>
        </LayoutContent>

        <LayoutContent romanNumber='II' title='WAKTU PELAKSANAAN'>
          <Text>Perjalanan dinas dilaksanakan pada tanggal {dayjs(data.waktuPelaksanaan).format('DD MMMM YYYY')}</Text>
        </LayoutContent>

        <LayoutContent romanNumber='III' title='LOKASI'>
          <Text>Lokasi Perjalanan: {data.lokasiPerjalanan}</Text>
        </LayoutContent>

        <LayoutContent romanNumber='IV' title='TUJUAN PERJALANAN'>
          <Text>{renderContent(data.tujuanPerjalanan)}</Text>
        </LayoutContent>
        
        <LayoutContent romanNumber='V' title='HASIL PERJALANAN '>
          <View style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
            {
              [
                ...(data.latarBelakang ? [
                  {
                    title: 'Latar Belakang',
                    content: (
                      <Text>{renderContent(data.latarBelakang)}</Text>
                    ),
                  }
                ] : []),
                ...(data.fasilitator ? [
                  {
                    title: 'Fasilitator/Petugas yang ditemui di tempat',
                    content: data.fasilitator.map((item, i) => (
                      <View key={i} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '8px' }}>
                        <View style={{ width: '4px', height: '4px', borderRadius: '100px', backgroundColor: 'black', transform: 'translateY(5px)' }} />
                        <Text style={{ width: '388px' }}>
                          <Text style={styles.bold}>{item.nama}</Text>, {item.deskripsi}
                        </Text>
                      </View>
                    )),
                  }
                ] : []),
                ...(data.kegiatan ? [
                  {
                    title: 'Bentuk Kegiatan',
                    content: data.kegiatan.map((item, i) => (
                      <View key={i} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '8px' }}>
                        <View style={{ width: '4px', height: '4px', borderRadius: '100px', backgroundColor: 'black', transform: 'translateY(5px)' }} />
                        <Text style={{ width: '388px' }}>{item.value}</Text>
                      </View>
                    )),
                  }
                ] : []),
                {
                  title: 'Hasil',
                  content: <View>{renderAdvanceContent(data.hasil)}</View>,
                }
              ].map((section, index) => (
                <LayoutHasil
                  key={index}
                  title={section.title}
                  number={index + 1}
                >
                  {section.content}
                </LayoutHasil>
              ))
            }
          </View>
        </LayoutContent>

        <Text style={{ marginTop: '28px', marginBottom: '20px' }}>
          Demikian laporan ini kami sampaikan untuk dapat dipergunakan sebagaimana mestinya.
        </Text>

        <View style={[styles.textRight]}>
          <Text>Yang Melaporkan,</Text>
          <View style={{ height: '80px' }} />
          <Text>{data.namaPelapor}</Text>
          <Text>NIP. {data.nipPelapor}</Text>
        </View>
      </Page>
      
      {data.dokumentasi && (
        <Page size={'A4'} style={[styles.page, styles.textCenter, { position: 'relative', fontWeight: 'bold', fontSize: '22px' }]}>
          <Text style={{ marginBottom: '16px' }}>LEMBAR</Text>
          <Text style={{ marginBottom: '16px' }}>LAMPIRAN & DOKUMENTASI</Text>
          <View style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: '12px', alignItems: 'flex-end' }}>
            {data.dokumentasi.map((foto, index) => (
              <Image key={index} style={{ height: foto.height, width: foto.width, objectFit: 'cover', padding: '1px' }} src={foto.url} />
            ))}
          </View>
        </Page>
      )}
    </Document>
  )
}

function LayoutInfo ({ 
  title, content
} : { 
  title: string, content: ReactNode
}) {
  return (
    <View style={[{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }]}>
      <Text style={[{ width: '108px' }]}>{title}</Text>
      <Text style={[{ width: '12px' }]}>:</Text>
      <Text style={{ width: '332px' }}>{content}</Text>
    </View>
  )
}

function LayoutContent ({
  romanNumber, title, children
} : {
  romanNumber: string, title: string, children: ReactNode
}) {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
      <View style={[styles.bold, { width: '28px' }]}>
        <Text>{romanNumber}.</Text>
      </View>
      <View style={{ width: '416px' }}>
        <Text style={styles.bold}>{title}</Text>
        {children}
      </View>
    </View>
  )
}

function LayoutHasil ({
  number, title, children
} : {
  number: number, title: string, children: ReactNode
}) {
  return (
    <View style={[{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }]}>
      <Text style={{ width: '16px' }}>{number}.</Text>
      <View style={{ width: '400px' }}>
        <Text>{title}</Text>
        {children}
      </View>
    </View>
  )
}

function renderContent(node: JSONContent): ReactNode {
  if (node.content?.length && node.content[0].type === 'paragraph' && node.content[0].content?.length) {
    return node.content[0].content.map((node, i) => {
      let style = {};
      if (node.marks) {
        node.marks.forEach((mark) => {
          if (mark.type === "bold") style = { ...style, ...styles.bold };
          if (mark.type === "italic") style = { ...style, ...styles.italic };
          if (mark.type === "strike") style = { ...style, ...styles.strike };
          if (mark.type === "underline") style = { ...style, ...styles.underline };
        });
      }
      return <Text style={style} key={i}>{node.text}</Text>;
    })
  }
}

const renderAdvanceContent = (node: JSONContent, isList=false, level=0, indexNumber=0): ReactNode => {
  if (!node) return null;

  switch (node.type) {
    case "paragraph":
      return (
        <Text style={[
          ...(
            node.attrs?.textAlign === 'center' ? [styles.textCenter] : 
            node.attrs?.textAlign === 'right' ? [styles.textRight] : 
            node.attrs?.textAlign === 'justify' ? [styles.textJustify] : 
            [styles.textLeft]
          ),
        ]}>
          {node.content?.map((item) => (
            renderAdvanceContent(item, isList)
          ))}
        </Text>
      );

    case "text": {
      let style = {};
      if (node.marks) {
        node.marks.forEach((mark) => {
          if (mark.type === "bold") style = { ...style, ...styles.bold };
          if (mark.type === "italic") style = { ...style, ...styles.italic };
          if (mark.type === "strike") style = { ...style, ...styles.strike };
          if (mark.type === "underline") style = { ...style, ...styles.underline };
          // superscript dan subscript belum

          if (mark.type === "link") {
            return (
              <Link src={mark.attrs?.href} style={styles.link}>
                {node.text}
              </Link>
            );
          }
        });
      }
      return <Text style={style}>{node.text}</Text>;
    }

    case "bulletList":
      return (
        <View style={[styles.list, ...(level === 0 ? [{ marginLeft: '16px'}] : [])]}>
          {node.content?.map((item) => (
            renderAdvanceContent(item, true, level + 1, 0)
          ))}
        </View>
      );

    case "orderedList":
      return (
        <View style={[styles.list, ...(level === 0 ? [{ marginLeft: '16px'}] : [])]}>
          {node.content?.map((item, index) => (
            renderAdvanceContent(item, true, level + 1, index + 1)
          ))}
        </View>
      );

    case "listItem":
      return (
        <View style={[styles.listItem]} wrap={false}>
          <View style={{ height: '20px', width: '20px', display: 'flex' }}>
            {indexNumber > 0 ? (
              <Text>{getListMarker(level, indexNumber)}</Text>
            ) : (
              <View style={[
                styles.bullet,
                ...(
                  level === 1 ? [styles.bulletLevel1] : 
                  level === 2 ? [styles.bulletLevel2] :
                  [styles.bulletLevel3]
                )
              ]} />
            )}
          </View>
          <View style={[{ display: 'flex', flexDirection: 'column' }]}>
            {node.content?.map((item) => (
              renderAdvanceContent(item, true, level)
            ))}
          </View>
        </View>
      )

    default:
      return node.content?.map((item) => (
        renderAdvanceContent(item, true)
      ))
  }
};

// 🔹 Fungsi bantu: mengubah nomor ke format berbeda
const getListMarker = (level: number, index: number) => {
  if (level === 1) {
    return `${index}.`; // angka arab
  } else if (level === 2) {
    const alphabet = String.fromCharCode(96 + index); // 1 -> a, 2 -> b
    return `${alphabet}.`;
  } else if (level === 3) {
    const toRoman = (num: number): string => {
      const romanMap: [number, string][] = [
        [1000, "m"], [900, "cm"], [500, "d"], [400, "cd"],
        [100, "c"], [90, "xc"], [50, "l"], [40, "xl"],
        [10, "x"], [9, "ix"], [5, "v"], [4, "iv"], [1, "i"]
      ];
      let result = "";
      for (const [value, symbol] of romanMap) {
        while (num >= value) {
          result += symbol;
          num -= value;
        }
      }
      return result;
    };
    return `${toRoman(index)}.`; // angka romawi kecil
  } else {
    return `${index}.`;
  }
};