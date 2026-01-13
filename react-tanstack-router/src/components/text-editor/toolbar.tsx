import { Document } from '@tiptap/extension-document'
import { HardBreak } from '@tiptap/extension-hard-break'
import { ListItem } from '@tiptap/extension-list'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { TextStyle } from '@tiptap/extension-text-style'
import {
  Dropcursor,
  Gapcursor,
  Placeholder,
  TrailingNode,
} from '@tiptap/extensions'
import { CharacterCount } from '@tiptap/extensions'

// build extensions
import {
  Attachment,
  RichTextAttachment,
} from 'reactjs-tiptap-editor/attachment'
import {
  Blockquote,
  RichTextBlockquote,
} from 'reactjs-tiptap-editor/blockquote'
import { Bold, RichTextBold } from 'reactjs-tiptap-editor/bold'
import {
  BulletList,
  RichTextBulletList,
} from 'reactjs-tiptap-editor/bulletlist'
import { Clear, RichTextClear } from 'reactjs-tiptap-editor/clear'
import { Code, RichTextCode } from 'reactjs-tiptap-editor/code'
import { CodeBlock, RichTextCodeBlock } from 'reactjs-tiptap-editor/codeblock'
import { Color, RichTextColor } from 'reactjs-tiptap-editor/color'

import { ExportPdf, RichTextExportPdf } from 'reactjs-tiptap-editor/exportpdf'
import {
  ExportWord,
  RichTextExportWord,
} from 'reactjs-tiptap-editor/exportword'
import {
  FontFamily,
  RichTextFontFamily,
} from 'reactjs-tiptap-editor/fontfamily'
import { FontSize, RichTextFontSize } from 'reactjs-tiptap-editor/fontsize'
import { Heading, RichTextHeading } from 'reactjs-tiptap-editor/heading'
import { Highlight, RichTextHighlight } from 'reactjs-tiptap-editor/highlight'

import {
  HorizontalRule,
  RichTextHorizontalRule,
} from 'reactjs-tiptap-editor/horizontalrule'
import { Iframe, RichTextIframe } from 'reactjs-tiptap-editor/iframe'
import { Image, RichTextImage } from 'reactjs-tiptap-editor/image'
import {
  ImportWord,
  RichTextImportWord,
} from 'reactjs-tiptap-editor/importword'
import { Indent, RichTextIndent } from 'reactjs-tiptap-editor/indent'
import { Italic, RichTextItalic } from 'reactjs-tiptap-editor/italic'
import {
  LineHeight,
  RichTextLineHeight,
} from 'reactjs-tiptap-editor/lineheight'
import { Link, RichTextLink } from 'reactjs-tiptap-editor/link'
import {
  OrderedList,
  RichTextOrderedList,
} from 'reactjs-tiptap-editor/orderedlist'
import {
  RichTextSearchAndReplace,
  SearchAndReplace,
} from 'reactjs-tiptap-editor/searchandreplace'
import { RichTextStrike, Strike } from 'reactjs-tiptap-editor/strike'
import { RichTextTable, Table } from 'reactjs-tiptap-editor/table'
import { RichTextAlign, TextAlign } from 'reactjs-tiptap-editor/textalign'
import {
  RichTextTextDirection,
  TextDirection,
} from 'reactjs-tiptap-editor/textdirection'
import {
  RichTextUnderline,
  TextUnderline,
} from 'reactjs-tiptap-editor/textunderline'
import { RichTextCallout, Callout } from 'reactjs-tiptap-editor/callout'

export const RichTextToolbar = () => {
  return (
    <div className="flex items-center !p-1 gap-2 flex-wrap !border-b !border-solid !border-border">
      <RichTextSearchAndReplace />
      <RichTextClear />
      <RichTextFontFamily />
      <RichTextHeading />
      <RichTextFontSize />
      <RichTextBold />
      <RichTextItalic />
      <RichTextUnderline />
      <RichTextStrike />
      <RichTextColor />
      <RichTextHighlight />
      <RichTextBulletList />
      <RichTextOrderedList />
      <RichTextAlign />
      <RichTextIndent />
      <RichTextLineHeight />
      <RichTextLink />
      <RichTextImage />
      <RichTextBlockquote />
      <RichTextHorizontalRule />
      <RichTextCode />
      <RichTextCodeBlock />
      <RichTextTable />
      <RichTextIframe />
      <RichTextExportPdf />
      <RichTextImportWord />
      <RichTextExportWord />
      <RichTextTextDirection />
      <RichTextAttachment />
      <RichTextCallout />
    </div>
  )
}

function convertBase64ToBlob(base64: string) {
  const arr = base64.split(',')
  const mime = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

// custom document to support columns
const DocumentColumn = /* @__PURE__ */ Document.extend({
  content: '(block)+',
})

const BaseKit = [
  DocumentColumn,
  Text,
  Dropcursor.configure({
    class: 'reactjs-tiptap-editor-theme',
    color: 'hsl(var(--primary))',
    width: 2,
  }),
  Gapcursor,
  HardBreak,
  Paragraph,
  TrailingNode,
  ListItem,
  TextStyle,
  Placeholder.configure({
    placeholder: "Press '/' for commands",
  }),
]

const LIMIT = 2505

export const extensions = [
  ...BaseKit,
  CharacterCount.configure({
    limit: LIMIT,
  }),

  SearchAndReplace,
  Clear,
  FontFamily,
  Heading,
  FontSize,
  Bold,
  Italic,
  TextUnderline,
  Strike,
  Color,
  Highlight,
  BulletList,
  OrderedList,
  TextAlign,
  Indent,
  LineHeight,
  Link,
  Image.configure({
    upload: (files: File) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(URL.createObjectURL(files))
        }, 300)
      })
    },
  }),

  Blockquote,
  HorizontalRule,
  Code,
  CodeBlock,

  Table,
  Iframe,
  ExportPdf,
  ImportWord,
  ExportWord,
  TextDirection,
  Attachment.configure({
    upload: (file: any) => {
      // fake upload return base 64
      const reader = new FileReader()
      reader.readAsDataURL(file)

      return new Promise((resolve) => {
        setTimeout(() => {
          const blob = convertBase64ToBlob(reader.result as string)
          resolve(URL.createObjectURL(blob))
        }, 300)
      })
    },
  }),

  FontFamily.configure({
    fontFamilyList: [
      {
        name: 'Arial',
        value: 'Arial',
      },
    ],
  }),

  Callout,
]
