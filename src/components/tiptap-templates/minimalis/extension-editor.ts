import Typography from "@tiptap/extension-typography";
import StarterKit from "@tiptap/starter-kit";

export default function extensionEditor() {
  return [
    StarterKit.configure({
      horizontalRule: false,
      code: false,
      codeBlock: false,
      blockquote: false,
      heading: false,
      // listItem: false,
      // link: false,
    }),
    Typography,
  ]
}