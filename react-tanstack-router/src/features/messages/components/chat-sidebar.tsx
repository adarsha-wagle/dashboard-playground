import { useCallback, useEffect, useState } from 'react'
import { Menu } from 'lucide-react'

import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import { useLocalStorage } from '@/hooks/use-localstorage'
import { UserList } from './user-list'
import { type IUser } from '../shared/chat-type'
import { useChatContext } from '../shared/chat-provider'

function ChatSidebar() {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    setSelectedUser,
    selectedUser,
    socketState,
    currentUser,
    setCurrentUser,
  } = useChatContext()
  const isMobile = useIsMobile()
  const [users, setUsers] = useState<IUser[]>([])
  const { setItem } = useLocalStorage('userInfo')

  const handleSelectUser = useCallback(
    (user: IUser) => {
      setSelectedUser(user)
      setIsSidebarOpen(false)
      // Emit Active room
      if (socketState) {
        socketState.emit('room:active', {
          roomId: [currentUser.id, user.id].sort().join('-'),
        })
      }
    },
    [socketState, currentUser.id],
  )

  useEffect(() => {
    if (!socketState) return
    socketState.on('contacts:update', (data) => {
      setUsers(data.contacts)
    })
    socketState.on('user:joined', (data) => {
      setUsers(data.contacts)
      // update local storage
      setItem(data.user)
      // update current user
      setCurrentUser(data.user)
    })
    return () => {
      socketState.off('contacts:update')
      socketState.off('user:joined')
    }
  }, [socketState])

  const sidebar = (
    <UserList
      users={users || []}
      currentUserId={currentUser.id}
      selectedUserId={selectedUser?.id || ''}
      onSelectUser={handleSelectUser}
    />
  )

  return (
    <div>
      {/* Toggle Button For mobile */}
      {isMobile && !selectedUser && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 block md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="size-5" />
        </Button>
      )}
      {/* Desktop User List */}
      {!isMobile && !isSidebarOpen && (
        <div className="hidden w-72 shrink-0 translate-x-0 transform transition-transform duration-300 ease-in-out md:block lg:w-80">
          {sidebar}
        </div>
      )}

      {/* Mobile User List */}
      <Sheet
        open={isSidebarOpen && isMobile}
        onOpenChange={setIsSidebarOpen}
        aria-describedby="Online Users"
      >
        <SheetContent side="left" className="block w-80 p-0">
          <SheetTitle className="hidden" aria-label="All Users">
            All Users
          </SheetTitle>
          {sidebar}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default ChatSidebar
