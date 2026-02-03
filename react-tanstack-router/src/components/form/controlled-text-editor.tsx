import { type Control, type FieldValues, type Path } from 'react-hook-form'
import { type HTMLProps, useCallback, useEffect } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import { RichTextProvider } from 'reactjs-tiptap-editor'
import { SlashCommandList } from 'reactjs-tiptap-editor/slashcommand'
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

import { cn, debounce } from '../../lib/utils'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'

import 'easydrawer/styles.css'
import 'prism-code-editor-lightweight/layout.css'
import 'prism-code-editor-lightweight/themes/github-dark.css'
import 'reactjs-tiptap-editor/style.css'
import { extensions } from '../text-editor/extension'
import { RichTextToolbar } from '../text-editor/toolbar'

type TControlledTextEditorProps<T extends FieldValues> = {
  name: Path<T>
  label: string
  control: Control<T>
  className?: HTMLProps<HTMLElement>['className']
  editorClassName?: HTMLProps<HTMLElement>['className']
  placeholder?: string
  required?: boolean
  minHeight?: string
}

function ControlledTextEditor<T extends FieldValues>({
  name,
  label,
  control,
  className = '',
  editorClassName = '',
  placeholder = '',
  required = false,
  minHeight = '300px',
}: TControlledTextEditorProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const debouncedOnChange = useCallback(
          debounce((value: string) => {
            field.onChange(value)
          }, 100),
          [field.onChange],
        )

        const editor = useEditor({
          textDirection: 'auto',
          content: field.value || '',
          extensions: extensions,
          immediatelyRender: false,
          onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            debouncedOnChange(html)
          },
        })

        useEffect(() => {
          if (editor && field.value !== editor.getHTML()) {
            editor.commands.setContent(field.value || '')
          }
        }, [field.value, editor])

        return (
          <FormItem className={cn('w-full', className)}>
            <FormLabel>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
            <FormControl>
              <div className={cn('w-full', editorClassName)}>
                {!editor ? (
                  <div
                    className="bg-background border-border flex items-center justify-center overflow-hidden rounded-lg border"
                    style={{ minHeight }}
                  >
                    <span className="text-muted-foreground">
                      Loading editor...
                    </span>
                  </div>
                ) : (
                  <RichTextProvider editor={editor}>
                    <div className="bg-background border-border! overflow-hidden rounded-lg border!">
                      <div className="flex max-h-full w-full flex-col">
                        <RichTextToolbar className="form-texteditor" />

                        <div
                          className="prose prose-sm max-w-none border-0 md:p-4"
                          style={{ minHeight }}
                        >
                          <EditorContent
                            editor={editor}
                            placeholder={placeholder}
                            style={{ border: 0 }}
                          />
                        </div>

                        {/* Bubble Menus */}
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
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export default ControlledTextEditor
