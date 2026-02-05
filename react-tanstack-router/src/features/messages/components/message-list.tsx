import { useCallback, useEffect, useMemo, useRef } from 'react'
import { ArrowDown, Loader2 } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

import { cn, getLocalTime } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { MessageBubble } from './message-bubble'

import {
  type IMessage,
  type IUser,
  type TReactionType,
} from '../shared/chat-type'
import { useChatQuery } from '../hooks/use-chat-query'
import { useMessageScroll } from '../hooks/use-message-scroll'

type TMessageListProps = {
  messages: IMessage[]
  isLoading?: boolean
  hasMore?: boolean
  isFetchingMore?: boolean
  onLoadMore?: () => void
  selectedUser: IUser
  currentUser: IUser
}

const shouldShowAvatar = (messages: IMessage[], index: number) => {
  if (index === 0) return true
  const current = messages[index]
  const previous = messages[index - 1]
  if (current.senderId !== previous.senderId) return true
  const timeDiff =
    new Date(current.timestamp).getTime() -
    new Date(previous.timestamp).getTime()
  return timeDiff > 5 * 60 * 1000
}

const groupMessages = (messages: IMessage[]) => {
  const groups: { date: string; messages: IMessage[] }[] = []
  let currentDate = ''

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  )

  sortedMessages.forEach((message) => {
    const messageDate = getLocalTime(message.timestamp)

    if (messageDate !== currentDate) {
      currentDate = messageDate
      groups.push({ date: messageDate, messages: [message] })
    } else {
      groups[groups.length - 1].messages.push(message)
    }
  })

  return groups
}

function MessageList({
  messages,
  isLoading,
  hasMore,
  isFetchingMore,
  onLoadMore,
  selectedUser,
  currentUser,
}: TMessageListProps) {
  const chatQuery = useChatQuery()
  const isInitialLoadRef = useRef<boolean>(true)

  // Use custom scroll hook
  const {
    bottomRef,
    scrollAreaRef,
    scrollToBottom,
    showScrollButton,
    handleScroll,
  } = useMessageScroll({ messages, isFetchingMore })

  const reactToMessageMutation = chatQuery.useReactToMessage(
    selectedUser?.id || '',
    currentUser.id,
  )

  // Use react-intersection-observer for infinite scroll
  const { ref: topSentinelRef } = useInView({
    threshold: 0,
    rootMargin: '100px',
    onChange: (inView) => {
      if (inView && hasMore && !isFetchingMore && onLoadMore) {
        const scrollContainer = scrollAreaRef.current?.querySelector(
          '[data-radix-scroll-area-viewport]',
        ) as HTMLElement

        if (scrollContainer && !isInitialLoadRef.current) {
          // Only trigger if we're actually near the top
          const isNearTop = scrollContainer.scrollTop < 200
          if (isNearTop) {
            onLoadMore()
          }
        }
      }
    },
  })

  const handleReact = useCallback(
    (messageId: string, emoji: string, type: TReactionType) => {
      reactToMessageMutation.mutate({ messageId, emoji, type })
    },
    [reactToMessageMutation],
  )

  const messageGroups = useMemo(() => groupMessages(messages), [messages])

  useEffect(() => {
    if (isInitialLoadRef.current && messages.length > 0) {
      const timer = setTimeout(() => {
        isInitialLoadRef.current = false
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [messages.length])

  if (isLoading && messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="space-y-2 text-center">
          <div className="mb-4 text-4xl">💬</div>
          <p className="text-muted-foreground">
            No messages yet. Start the conversation!
          </p>
        </div>
      </div>
    )
  }

  return (
    <ScrollArea
      ref={scrollAreaRef}
      className="relative h-[80vh] flex-1"
      onScrollCapture={handleScroll}
    >
      <div className="py-4">
        <div ref={topSentinelRef} className="h-1">
          {isFetchingMore && (
            <div className="flex justify-center py-4">
              <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
            </div>
          )}
        </div>

        {hasMore && !isFetchingMore && messages.length > 0 && (
          <div className="flex justify-center py-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onLoadMore}
              className="text-muted-foreground hover:text-foreground text-xs"
            >
              Load older messages
            </Button>
          </div>
        )}

        {messageGroups.map((group, groupIndex) => (
          <div key={`${group.date}-${groupIndex}`}>
            <div className="flex items-center justify-center py-4">
              <span className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs">
                {group.date}
              </span>
            </div>

            <div className="space-y-3 px-4">
              {group.messages.map((message, messageIndex) => (
                <div
                  key={`${message.id}-${messageIndex}`}
                  className={cn(
                    'animate-fade-in',
                    Object.keys(
                      message.reactions.reduce(
                        (acc, r) => {
                          acc[r.emoji] = true
                          return acc
                        },
                        {} as Record<string, boolean>,
                      ),
                    ).length > 0 && 'mb-4',
                  )}
                >
                  <MessageBubble
                    message={message}
                    isOwn={message.senderId === currentUser.id}
                    showAvatar={shouldShowAvatar(group.messages, messageIndex)}
                    receiverId={selectedUser?.id || ''}
                    receieverAvatar={selectedUser?.avatar || ''}
                    onReact={handleReact}
                    currentUserId={currentUser.id}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {showScrollButton && (
          <Button
            variant="secondary"
            size="icon"
            className="fixed right-8 bottom-24 z-50 h-10 w-10 rounded-full shadow-lg"
            onClick={() => scrollToBottom('smooth')}
          >
            <ArrowDown className="h-5 w-5" />
          </Button>
        )}

        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  )
}

export { MessageList }
