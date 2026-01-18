import Main from '@/components/layouts/authenticated/main'
import PrimaryHeader from '@/components/layouts/authenticated/primary-header'
import TextEditor from '@/components/text-editor/text-editor'

function TextEditorPage() {
  return (
    <Main>
      <PrimaryHeader
        title="Text Editor"
        description="Lightweight text editors that can be extended easily. Tip Tap Editor"
      />
      <TextEditor />
    </Main>
  )
}

export default TextEditorPage
