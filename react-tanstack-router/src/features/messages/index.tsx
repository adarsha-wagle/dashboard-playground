import Main from '@/components/layouts/authenticated/main'
import { ChatProvider } from './shared/chat-provider'
import ChatSidebar from './components/chat-sidebar'
import ChatContainer from './components/chat-container'

function MessagesPage() {
  return (
    <Main>
      <section className="bg-background flex h-screen w-full overflow-hidden">
        <ChatProvider>
          <ChatSidebar />
          <ChatContainer />
        </ChatProvider>
      </section>
    </Main>
  )
}

export default MessagesPage
