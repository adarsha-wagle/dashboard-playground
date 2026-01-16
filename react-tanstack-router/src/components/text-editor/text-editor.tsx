import { useCallback, useEffect, useState } from 'react'

import { RichTextProvider } from 'reactjs-tiptap-editor'

// Slash Command
import { SlashCommandList } from 'reactjs-tiptap-editor/slashcommand'

// Bubble
import {
  RichTextBubbleColumns,
  RichTextBubbleIframe,
  RichTextBubbleImage,
  RichTextBubbleLink,
  RichTextBubbleMermaid,
  RichTextBubbleTable,
  RichTextBubbleText,
  RichTextBubbleMenuDragHandle,
} from 'reactjs-tiptap-editor/bubble'

import 'easydrawer/styles.css'
import 'prism-code-editor-lightweight/layout.css'
import 'prism-code-editor-lightweight/themes/github-dark.css'
import 'reactjs-tiptap-editor/style.css'

import { EditorContent, useEditor, Editor } from '@tiptap/react'
import { RichTextToolbar } from './toolbar'
import { extensions } from './extension'
import { debounce } from '@/lib/utils'

declare global {
  interface Window {
    editor?: Editor
  }
}

function TextEditor() {
  const [content, setContent] = useState('')

  const onValueChange = useCallback(
    debounce((value: any) => {
      setContent(value)
    }, 100),
    [],
  )

  const editor = useEditor({
    // shouldRerenderOnTransaction:  false,
    textDirection: 'auto', // global text direction
    content,
    extensions: extensions,
    // content,
    immediatelyRender: false, // error duplicate plugin key
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onValueChange(html)
    },
  })

  useEffect(() => {
    // @ts-ignore
    window['editor'] = editor
  }, [editor])

  if (!editor) return null

  return (
    <>
      <div className=" w-full max-w-300 mx-auto my-0">
        <RichTextProvider editor={editor}>
          <div className="overflow-hidden rounded-lg bg-background border! border-border!">
            <div className="flex max-h-full w-full flex-col">
              <RichTextToolbar />

              <EditorContent editor={editor} />

              {/* Bubble */}
              <RichTextBubbleColumns />
              <RichTextBubbleIframe />
              <RichTextBubbleLink />

              <RichTextBubbleImage />

              <RichTextBubbleMermaid />
              <RichTextBubbleTable />
              <RichTextBubbleText />

              {/* Command List */}
              <SlashCommandList />
              <RichTextBubbleMenuDragHandle />
            </div>
          </div>
        </RichTextProvider>
      </div>
    </>
  )
}

export default TextEditor
