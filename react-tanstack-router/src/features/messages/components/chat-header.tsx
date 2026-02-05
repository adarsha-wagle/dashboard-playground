import { Menu } from 'lucide-react'

import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getTimeAgo } from '@/lib/utils'

import { type IUser } from '../shared/chat-type'
import { useChatContext } from '../shared/chat-provider'

type TChatHeaderProps = {
  selectedUser: IUser
}

function ChatHeader({ selectedUser }: TChatHeaderProps) {
  const { setIsSidebarOpen, isSidebarOpen } = useChatContext()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="border-border flex items-center gap-3 border-b px-4 py-3">
      {/* Sidebar Toggle Button for desktop */}

      <Button
        variant="ghost"
        size="icon"
        className="shrink-0"
        onClick={toggleSidebar}
      >
        <Menu className="size-5" />
      </Button>

      <Avatar className="h-10 w-10">
        <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
        <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <h2 className="text-foreground truncate font-semibold">
          {selectedUser.name}
        </h2>
        <p className="text-muted-foreground text-sm">
          {selectedUser.status === 'online'
            ? 'Online'
            : `Last seen ${getTimeAgo(selectedUser?.lastSeen || '')}`}
        </p>
      </div>
    </div>
  )
}

export { ChatHeader }
