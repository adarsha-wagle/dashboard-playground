import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn, getTimeAgo } from '@/lib/utils'
import { type IUser } from '../shared/chat-type'

interface UserListProps {
  users: IUser[]
  selectedUserId: string | null
  currentUserId: string
  onSelectUser: (user: IUser) => void
}

const statusColors = {
  online: 'bg-green-500',
  offline: 'bg-muted-foreground/50',
}

export function UserList({
  users,
  selectedUserId,
  currentUserId,
  onSelectUser,
}: UserListProps) {
  const sortedUsers = [...users].sort((a, b) => {
    const statusOrder = { online: 0, offline: 1 }
    return statusOrder[a.status] - statusOrder[b.status]
  })

  return (
    <div className="border-border bg-card flex h-full flex-col border-r">
      {/* Messsages Heading */}
      <div className="border-border h-17 border-b p-2">
        <h2 className="text-foreground text-lg font-semibold">Messages</h2>
        <p className="text-muted-foreground text-sm">
          {
            users.filter((u) => u.status === 'online' && u.id !== currentUserId)
              .length
          }{' '}
          online
        </p>
      </div>

      <ScrollArea className="h-[calc(100vh-68px)]">
        <div className="p-2">
          {sortedUsers.map((user) => {
            if (user.id === currentUserId) {
              return null
            }

            return (
              <button
                key={user.id}
                onClick={() => onSelectUser(user)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors',
                  'hover:bg-accent/50',
                  selectedUserId === user.id && 'bg-accent',
                )}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span
                    className={cn(
                      'border-card absolute right-0 bottom-0 h-3 w-3 rounded-full border-2',
                      statusColors[user.status],
                    )}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground truncate font-medium">
                      {user.name}
                    </span>
                    {(user?.unreadCount || 0) > 0 &&
                      user?.lastMessage &&
                      user.lastMessage.senderId !== selectedUserId && (
                        <Badge
                          variant="default"
                          className="ml-2 h-5 min-w-5 px-1.5"
                        >
                          {user?.unreadCount}
                        </Badge>
                      )}
                  </div>
                  <p className="text-muted-foreground truncate text-sm">
                    {user?.lastMessage
                      ? user?.lastMessage?.senderId === currentUserId
                        ? `You: ${user?.lastMessage?.content}`
                        : `${user?.name}: ${user?.lastMessage?.content}`
                      : user?.status === 'online'
                        ? 'Start a conversation'
                        : `Last seen ${getTimeAgo(user?.lastSeen || '')}`}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
