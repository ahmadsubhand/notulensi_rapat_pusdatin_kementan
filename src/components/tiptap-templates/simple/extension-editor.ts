import { TaskItem } from "@tiptap/extension-list";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import { Selection } from "@tiptap/extensions";
import StarterKit from "@tiptap/starter-kit";

export default function extensionEditor() {
  return [
    StarterKit.configure({
      horizontalRule: false,
      code: false,
      codeBlock: false,
      blockquote: false,
      link: {
        openOnClick: false,
        enableClickSelection: true,
      },
    }),
    TextAlign.configure({ 
      types: ["heading", "paragraph"],
      alignments: ["left", "center", "right", "justify"]
    }),
    TaskItem.configure({ nested: true }),
    // Image,
    Typography,
    Superscript,
    Subscript,
    Selection,
    // ImageUploadNode.configure({
    //   accept: "image/*",
    //   maxSize: MAX_FILE_SIZE,
    //   limit: 3,
    //   upload: handleImageUpload,
    //   onError: (error) => console.error("Upload failed:", error),
    // }),
  ]
}