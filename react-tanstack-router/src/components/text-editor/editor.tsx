import { useCallback, useEffect, useState } from 'react'

import { RichTextProvider } from 'reactjs-tiptap-editor'

// Bubble
import {
  RichTextBubbleIframe,
  RichTextBubbleImage,
  RichTextBubbleLink,
  RichTextBubbleTable,
  RichTextBubbleText,
  RichTextBubbleCallout,
} from 'reactjs-tiptap-editor/bubble'

import { extensions } from './toolbar'

// import 'prism-code-editor-lightweight/layout.css'
// import 'prism-code-editor-lightweight/themes/github-dark.css'
import 'reactjs-tiptap-editor/style.css'

import {
  Editor,
  EditorContent,
  useEditor,
  type Editor as EditorType,
} from '@tiptap/react'
import { RichTextToolbar } from './toolbar'
import { debounce } from '@/lib/utils'

declare global {
  interface Window {
    editor: EditorType | null
  }
}

const DEFAULT = ''

function TextEditor() {
  const [content, setContent] = useState(DEFAULT)

  const onValueChange = useCallback(
    debounce((value: any) => {
      setContent(value)
    }, 50),
    [],
  )

  const editor = useEditor({
    // shouldRerenderOnTransaction:  false,
    textDirection: 'auto', // global text direction
    content,
    extensions,
    // content,
    immediatelyRender: false, // error duplicate plugin key
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onValueChange(html)
    },
  })

  useEffect(() => {
    window['editor'] = editor
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <>
      <div className=" w-full max-w-7xl mx-auto my-0 px-4">
        <RichTextProvider editor={editor as Editor}>
          <div className="overflow-hidden rounded-xl bg-background border! border-border!">
            <div className="flex max-h-full w-full flex-col">
              <RichTextToolbar />

              <EditorContent editor={editor} />

              {/* Bubble */}
              <RichTextBubbleIframe />
              <RichTextBubbleLink />

              <RichTextBubbleImage />

              <RichTextBubbleTable />
              <RichTextBubbleText />
              <RichTextBubbleCallout />

              {/* Command List */}
              {/* <SlashCommandList /> */}
              {/* <RichTextBubbleMenuDragHandle /> */}
            </div>

            {/* <Count editor={editor} limit={LIMIT} /> */}
          </div>
        </RichTextProvider>
      </div>
    </>
  )
}

export default TextEditor
