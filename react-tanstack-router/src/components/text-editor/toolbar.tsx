// build extensions
import { RichTextAttachment } from 'reactjs-tiptap-editor/attachment'
import { RichTextBlockquote } from 'reactjs-tiptap-editor/blockquote'
import { RichTextBold } from 'reactjs-tiptap-editor/bold'
import { RichTextBulletList } from 'reactjs-tiptap-editor/bulletlist'
import { RichTextClear } from 'reactjs-tiptap-editor/clear'
import { RichTextColor } from 'reactjs-tiptap-editor/color'

import { RichTextExportPdf } from 'reactjs-tiptap-editor/exportpdf'
import { RichTextExportWord } from 'reactjs-tiptap-editor/exportword'
import { RichTextFontFamily } from 'reactjs-tiptap-editor/fontfamily'
import { RichTextFontSize } from 'reactjs-tiptap-editor/fontsize'
import { RichTextHeading } from 'reactjs-tiptap-editor/heading'
import { RichTextHighlight } from 'reactjs-tiptap-editor/highlight'

import { RichTextHorizontalRule } from 'reactjs-tiptap-editor/horizontalrule'
import { RichTextIframe } from 'reactjs-tiptap-editor/iframe'
import { RichTextImage } from 'reactjs-tiptap-editor/image'
import { RichTextImportWord } from 'reactjs-tiptap-editor/importword'
import { RichTextIndent } from 'reactjs-tiptap-editor/indent'
import { RichTextItalic } from 'reactjs-tiptap-editor/italic'
import { RichTextLineHeight } from 'reactjs-tiptap-editor/lineheight'
import { RichTextLink } from 'reactjs-tiptap-editor/link'
import { RichTextOrderedList } from 'reactjs-tiptap-editor/orderedlist'
import { RichTextSearchAndReplace } from 'reactjs-tiptap-editor/searchandreplace'
import { RichTextStrike } from 'reactjs-tiptap-editor/strike'
import { RichTextTable } from 'reactjs-tiptap-editor/table'
import { RichTextAlign } from 'reactjs-tiptap-editor/textalign'
import { RichTextTextDirection } from 'reactjs-tiptap-editor/textdirection'
import { RichTextUnderline } from 'reactjs-tiptap-editor/textunderline'

export const RichTextToolbar = () => {
  return (
    <div className="flex items-center p-1! gap-2 flex-wrap border-b! border-solid border-border!">
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
      <RichTextTable />
      <RichTextIframe />
      <RichTextExportPdf />
      <RichTextImportWord />
      <RichTextExportWord />
      <RichTextTextDirection />
      <RichTextAttachment />
    </div>
  )
}
