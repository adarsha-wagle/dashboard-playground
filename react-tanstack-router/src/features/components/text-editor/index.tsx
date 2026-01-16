import PrimaryHeader from '@/components/layouts/authenticated/primary-header'
import TextEditor from '@/components/text-editor/text-editor'

function TextEditorPage() {
  return (
    <>
      <PrimaryHeader
        title="Text Editor"
        description="Lightweight text editors that can be extended easily. Tip Tap Editor"
      />
      <TextEditor />
    </>
  )
}

export default TextEditorPage
