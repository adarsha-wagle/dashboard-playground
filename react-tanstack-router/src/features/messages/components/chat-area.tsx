import React, { useCallback, useEffect, useState } from 'react'

import { Socket } from 'socket.io-client'
import {
  type IClientToServerEvents,
  type IServerToClientEvents,
} from '@/hooks/use-socketio'

import { MessageInput } from './message-input'
import { ChatHeader } from './chat-header'
import { type IUser } from '../shared/chat-type'
import { MessageList } from './message-list'
import { useChatQuery } from '../hooks/use-chat-query'
import { TypingIndicator } from './typing-indicator'

const MemoizedMessageInput = React.memo(MessageInput)
const MemoizedMessageList = React.memo(MessageList)
const MemoizedChatHeader = React.memo(ChatHeader)

type TChatAreaProps = {
  selectedUser: IUser
  socketState: Socket<IServerToClientEvents, IClientToServerEvents>
  currentUser: IUser
  emitWithQueue: <K extends keyof IClientToServerEvents>(
    event: K,
    data: Parameters<IClientToServerEvents[K]>[0],
  ) => void
}

export function ChatArea({
  selectedUser,
  socketState,
  currentUser,
  emitWithQueue,
}: TChatAreaProps) {
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const chatQuery = useChatQuery()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = chatQuery.useConversationMessages(selectedUser?.id, currentUser.id)

  const sendMessageMutation = chatQuery.useSendMessage(
    currentUser.id,
    selectedUser.id,
  )
  const updateMessageStatusMutation = chatQuery.useUpdateMessageStatus(
    selectedUser.id,
  )
  const addReceivedMessageMutation = chatQuery.useAddReceivedMessage()

  // Mark all messages as read after some delay when conversation is opened
  useEffect(() => {
    if (!selectedUser?.id || isLoading) return

    const timer = setTimeout(() => {
      emitWithQueue('messages:readAll', {
        roomId: [currentUser.id, selectedUser.id].sort().join('-'),
      })
    }, 300)

    return () => clearTimeout(timer)
  }, [selectedUser?.id, currentUser.id, isLoading, emitWithQueue])

  // Listen for message sent & read confirmation
  useEffect(() => {
    // Listen for message sent confirmation
    socketState.on('message:sent', (data) => {
      updateMessageStatusMutation.mutate({
        tempId: data.tempId,
        serverId: data.message.id,
        case: 'msgStatus',
      })
    })
    // Listen for message read event when other user reads single message
    socketState.on('message:read', (data) => {
      updateMessageStatusMutation.mutate({
        serverId: data.messageId,
        isRead: true,
        readBy: data.readBy,
        case: 'read',
      })
    })
    // Listen for messages readBy when the other user loads all the messages and update all the messages
    socketState.on('messages:readAll', (data) => {
      updateMessageStatusMutation.mutate({
        readBy: data.readBy,
        case: 'readAll',
      })
    })

    // Listen For Message reaction change
    socketState.on('message:reactionUpdated', (data) => {
      updateMessageStatusMutation.mutate({
        serverId: data.messageId,
        reactions: data.reactions,
        case: 'reaction',
      })
    })

    // Cleanup
    return () => {
      socketState?.off('message:sent')
      socketState?.off('message:read')
      socketState?.off('messages:readAll')
      socketState?.off('message:reactionUpdated')
    }
  }, [socketState, updateMessageStatusMutation])

  useEffect(() => {
    // Listen for incoming message
    socketState.on('message:received', (data) => {
      // After receiving message emit it as read to other user
      if (selectedUser.id === data.message.senderId) {
        socketState.emit('message:read', {
          messageId: data.message.id,
          roomId: data.message.roomId,
        })
      }
      addReceivedMessageMutation.mutate(data.message)
    })

    return () => {
      socketState?.off('message:received')
    }
  }, [socketState, addReceivedMessageMutation, selectedUser.id])

  useEffect(() => {
    // Listen For Typing Events
    socketState.on('typing:update', (data) => {
      setIsTyping(data.isTyping)
    })
    return () => {
      socketState?.off('typing:update')
    }
  }, [socketState])

  const handleSend = useCallback(
    (content: string) => {
      sendMessageMutation.mutate({
        content,
        receiverId: selectedUser.id,
      })
    },
    [selectedUser.id],
  )

  return (
    <div className="bg-background flex h-full w-full flex-col">
      {/* Header */}
      <MemoizedChatHeader selectedUser={selectedUser} />

      {/* Messages */}
      <MemoizedMessageList
        messages={data?.messages || []}
        isLoading={isLoading || isFetching}
        hasMore={hasNextPage}
        isFetchingMore={isFetchingNextPage || isFetching}
        onLoadMore={fetchNextPage}
        selectedUser={selectedUser}
        currentUser={currentUser}
      />

      {/* Input */}
      <div className="border-border bg-card relative border-t p-4">
        {isTyping && (
          <TypingIndicator
            userName={selectedUser?.name || ''}
            className="bg-card absolute -top-4 left-4"
          />
        )}
        <MemoizedMessageInput
          selectedUserId={selectedUser?.id}
          onSend={handleSend}
        />
      </div>
    </div>
  )
}
