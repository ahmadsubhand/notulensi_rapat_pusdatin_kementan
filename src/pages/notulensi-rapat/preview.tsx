import { Page, Text, View, Document, StyleSheet, Image, Font, Link } from '@react-pdf/renderer';
import type { notulensiType } from '../../validator/notulensi.validator';
import type { JSONContent } from '@tiptap/react';
import type { ReactNode } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

Font.register({
  family: 'Arial',
  fonts: [
    {
      src: '/font/arial/ARIAL.TTF', // Regular
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    {
      src: '/font/arial/ARIALI.TTF', // Italic
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
    {
      src: '/font/arial/ARIALBD.TTF', // Bold
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
    {
      src: '/font/arial/ARIALBI.TTF', // Bold Italic
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
    {
      src: '/font/arial/ARIALBLACKITALIC.TTF', // Black Italic (opsional)
      fontWeight: 900,
      fontStyle: 'italic',
    },
    {
      src: '/font/arial/ARIBLK.TTF', // Black
      fontWeight: 900,
      fontStyle: 'normal',
    },
  ],
});

Font.registerHyphenationCallback(word => [word])

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    paddingTop: '50px',
    paddingLeft: '65px',
    paddingRight: '65px',
    paddingBottom: '50px',
    // fontFamily: 'Arial'
  },

  // Type style
  heading: { fontWeight: "bold", marginBottom: '12px' },
  heading1: { fontSize: '16px' },
  heading2: { fontSize: '14px' },
  heading3: { fontSize: '11px' },
  heading4: { fontSize: '11px' },
  paragraph: { marginBottom: '8px' },
  image: { height: 180, marginBottom: '12px', objectFit: 'contain' },

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
    transform: 'translateY(1px)'
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
  text: {
    // fontSize: 10,
    flex: 1,
    paddingBottom: 0,
    marginBottom: 0
  }
})

export default function Preview({ 
  data, isiRapat
}: {
  data: Omit<notulensiType, 'isi'>, isiRapat: JSONContent
}) {
  return (
    <Document>
      <Page size={'A4'} style={[styles.page, { position: 'relative' }]}>
        <View>
          <Image src={'/pusdatin.png'} style={{ width: '185px' }} />
        </View>

        <View style={{ padding: '0 16px', fontSize: '11px', lineHeight: '18px' }}>
          <Text style={{ fontWeight: 'bold', fontSize: '16px', paddingVertical: '12px', borderBottom: '1px solid gray' }}>NOTULENSI RAPAT</Text>

          <View style={{ paddingTop: '12px', paddingBottom: '18px' }}>
            <LayoutInfo title='Hari/Tanggal' content={dayjs(data.hariTanggal).format('dddd, DD MMMM YYYY')} />
            <LayoutInfo title='Waktu' content={`Pukul ${data.waktu_mulai} s.d ${data.waktu_selesai ? data.waktu_selesai : 'selesai'}`} />
            <LayoutInfo title='Tempat' content={data.tempat} />
            <LayoutInfo title='Pimpinan Rapat' content={data.pimpinan} />
            <LayoutInfo title='Peserta' isOnlyText={false} content={
              <View>
                {data.peserta.map((item, i) => (
                  <View style={{ display:'flex', flexDirection: 'row', gap: '5px' }} key={i}>
                    <Text>{i + 1}.</Text>
                    <Text>{item.nama}</Text>
                  </View>
                ))}
              </View>
            } />
            <LayoutInfo title='Agenda' content={data.agenda} />
            <LayoutInfo title='Notulen' content={data.notulen} />
          </View>

          <View>
            {isiRapat?.content && isiRapat.content.map((node, i) => (
              <View key={i}>{renderContent(node)}</View>
            ))}
          </View>

        </View>
        
        {data.isUseNotulis && data.kota && data.tanggal && data.tanda_tangan && data.notulis && (
          <View wrap={false} style={{ 
            paddingVertical: '50px', fontSize: '11px', lineHeight: '18px', textAlign: 'right'
          }}>
            <Text style={[styles.textRight]}>{data.kota}, {dayjs(data.tanggal).format('DD MMMM YYYY')}</Text>
            <Text style={[styles.textRight]}>Notulis,</Text>
            <Image style={{ height: '70px', objectFit: 'contain', objectPosition: 'right' }} src={data.tanda_tangan} />;
            <Text style={[styles.textRight, { marginTop: '4px' }]}>{data.notulis}</Text>
          </View>
        )}
      </Page>
      <Page size={'A4'} style={[styles.page]}>
        <Text style={[styles.heading, styles.heading1, styles.textCenter]}>Dokumentasi</Text>
        <View style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: '12px', alignItems: 'flex-end' }}>
          {data.dokumentasi.map((foto, index) => (
            <Image key={index} style={{ height: foto.height, width: foto.width, objectFit: 'cover' }} src={foto.url} />
          ))}
        </View>
      </Page>
    </Document>
  )
}

function LayoutInfo ({ 
  title, content, isOnlyText=true
} : { 
  title: string, content: ReactNode, isOnlyText?: boolean
}) {
  return (
    <View style={[{ display: 'flex', flexDirection: 'row' }]}>
      <Text style={[{ width: '110px' }]}>{title}</Text>
      <Text style={[{ width: '12px' }]}>:</Text>
      {isOnlyText ? (
        <Text>{content}</Text>
      ) : (
        <View>{content}</View>
      )}
    </View>
  )
}

const renderContent = (node: JSONContent, isList=false, level=0, indexNumber=0): ReactNode => {
  if (!node) return null;

  switch (node.type) {
    case "heading":
      return (
        <Text style={[
          styles.heading,
          ...(
            node.attrs?.level === 1 ? [styles.heading1] : 
            node.attrs?.level === 2 ? [styles.heading2] : 
            node.attrs?.level === 3 ? [styles.heading3] : 
            [styles.heading4]
          ),
          ...(
            node.attrs?.textAlign === 'center' ? [styles.textCenter] : 
            node.attrs?.textAlign === 'right' ? [styles.textRight] : 
            node.attrs?.textAlign === 'justify' ? [styles.textRight] : 
            [styles.textLeft]
          )
        ]
        }>
          {node.content?.map((item) => (
            renderContent(item, isList)
          ))}
        </Text>
      );

    case "paragraph":
      return (
        <Text style={[
          ...(
            node.attrs?.textAlign === 'center' ? [styles.textCenter] : 
            node.attrs?.textAlign === 'right' ? [styles.textRight] : 
            node.attrs?.textAlign === 'justify' ? [styles.textJustify] : 
            [styles.textLeft]
          ),
          ...(
            isList ? [] : [styles.paragraph]
          )
        ]}>
          {node.content?.map((item) => (
            renderContent(item, isList)
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

    case "image":
      return <Image style={styles.image} src={node.attrs?.src} />;

    case "bulletList":
      return (
        <View style={[styles.list, ...(level === 0 ? [{ marginLeft: '16px', marginBottom: '8px' }] : [])]}>
          {node.content?.map((item) => (
            renderContent(item, true, level + 1, 0)
          ))}
        </View>
      );

    case "orderedList":
      return (
        <View style={[styles.list, ...(level === 0 ? [{ marginLeft: '16px', marginBottom: '8px' }] : [])]}>
          {node.content?.map((item, index) => (
            renderContent(item, true, level + 1, index + 1)
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
              renderContent(item, true, level)
            ))}
          </View>
        </View>
      )

    default:
      return node.content?.map((item) => (
        renderContent(item, true)
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