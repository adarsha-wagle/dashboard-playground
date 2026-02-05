'use client'

import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query'
import {
  type IMessage,
  type IConversation,
  type IReaction,
  type TReactionType,
} from '../shared/chat-type'
import { useChatContext } from '../shared/chat-provider'
import { CONFIG } from '@/config/constant'

// Query Keys
export const chatKeys = {
  all: ['chat'] as const,
  conversations: () => [...chatKeys.all, 'conversations'] as const,
  conversation: (participantId: string) =>
    [...chatKeys.conversations(), participantId] as const,
  messages: (participantId: string) =>
    [...chatKeys.conversation(participantId), 'messages'] as const,
}

// Types
interface SendMessageData {
  content: string
  receiverId: string
}

interface IOptimisticMessage extends IMessage {
  tempId: string
}

interface MessageHistoryResponse {
  messages: IMessage[]
  hasMore: boolean
  total: number
  page: number
  limit: number
}

const fetchMessagesFromServer = async (
  roomId: string,
  page: number,
  limit: number = 40,
): Promise<MessageHistoryResponse> => {
  const response = await fetch(
    `${CONFIG.API_URL}/api/messages?roomId=${roomId}&page=${page}&limit=${limit}`,
  )
  if (!response.ok) {
    throw new Error('Failed to fetch messages')
  }
  return response.json()
}

// Custom hook for chat queries
export const useChatQuery = () => {
  const queryClient = useQueryClient()

  const { emitWithQueue } = useChatContext()

  // Get conversation messages
  const useConversationMessages = (
    participantId: string | undefined,
    currentUserId: string,
  ) => {
    const roomId =
      participantId && currentUserId
        ? [currentUserId, participantId].sort().join('-')
        : 'general'

    return useInfiniteQuery({
      queryKey: chatKeys.messages(participantId || ''),
      queryFn: ({ pageParam = 1 }) =>
        fetchMessagesFromServer(roomId, pageParam, 20),
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.page + 1 : undefined,
      initialPageParam: 1,
      enabled: !!participantId,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false, // Prevent refetch on window focus
      refetchOnMount: false, // Prevent refetch on mount after initial load
      select: (data) => ({
        pages: data.pages,
        pageParams: data.pageParams,
        // Flatten all messages from all pages
        messages: data.pages.flatMap((page) => page.messages),
      }),
    })
  }

  // Send message mutation with optimistic update
  const useSendMessage = (currentUserId: string, participantId: string) => {
    const tempId = crypto.randomUUID()
    return useMutation({
      mutationFn: async (data: SendMessageData) => {
        const optimisticMessage: IOptimisticMessage = {
          id: tempId,
          tempId,
          senderId: currentUserId,
          receiverId: data.receiverId,
          content: data.content,
          timestamp: new Date().toISOString(),
          isRead: false,
          reactions: [],
          roomId: '',
          status: 'sending',
          readBy: [currentUserId],
        }

        emitWithQueue('message:send', {
          msg: optimisticMessage,
          tempId,
        })

        // // Emit via Socket.io
        // socketState?.emit("message:send", {
        //   msg: optimisticMessage,
        //   tempId,
        // });

        return { optimisticMessage, tempId }
      },
      onMutate: async (data) => {
        // Cancel outgoing refetches
        await queryClient.cancelQueries({
          queryKey: chatKeys.messages(participantId),
        })

        // Snapshot previous value
        const previousData = queryClient.getQueryData(
          chatKeys.messages(participantId),
        )

        // Create optimistic message
        const optimisticMessage: IOptimisticMessage = {
          id: tempId,
          tempId,
          senderId: currentUserId,
          receiverId: data.receiverId,
          content: data.content,
          timestamp: new Date().toISOString(),
          isRead: false,
          reactions: [],
          roomId: 'general',
          status: 'sending',
          readBy: [currentUserId],
        }

        // Optimistically update cache for infinite query
        queryClient.setQueryData(
          chatKeys.messages(participantId),
          (old: any) => {
            if (!old) return old
            return {
              ...old,
              pages: old.pages.map(
                (page: MessageHistoryResponse, idx: number) =>
                  idx === 0
                    ? {
                        ...page,
                        messages: [...page.messages, optimisticMessage],
                      }
                    : page,
              ),
            }
          },
        )

        // Update conversations cache
        queryClient.setQueryData<IConversation[]>(
          chatKeys.conversations(),
          (old = []) => {
            const existingConv = old.find(
              (c) => c.participantId === participantId,
            )
            if (existingConv) {
              return old.map((conv) =>
                conv.participantId === participantId
                  ? {
                      ...conv,
                      messages: [...conv.messages, optimisticMessage],
                    }
                  : conv,
              )
            }
            return [
              ...old,
              {
                id: `conv-${Date.now()}`,
                participantId,
                messages: [optimisticMessage],
                unreadCount: 0,
              },
            ]
          },
        )

        return { previousData, tempId }
      },
      onError: (err, variables, context) => {
        // Rollback on error
        if (context?.previousData) {
          queryClient.setQueryData(
            chatKeys.messages(participantId),
            context.previousData,
          )
        }
        console.error('Failed to send message:', err)
      },
    })
  }

  // Update message status mutation
  const useUpdateMessageStatus = (participantId: string) => {
    return useMutation({
      mutationFn: async ({
        serverId,
        tempId,
        isRead,
      }: {
        serverId?: string
        tempId?: string
        isRead?: boolean
        readBy?: string[]
        case: 'read' | 'readAll' | 'msgStatus' | 'reaction'
        reactions?: IReaction[]
      }) => {
        return { tempId, serverId, isRead }
      },
      onMutate: async ({
        case: case_,
        serverId = '',
        tempId = '',
        isRead = false,
        readBy = [],
        reactions = [],
      }) => {
        await queryClient.cancelQueries({
          queryKey: chatKeys.messages(participantId),
        })

        queryClient.setQueryData(
          chatKeys.messages(participantId),
          (old: any) => {
            if (!old) return old
            return {
              ...old,
              pages: old.pages.map((page: MessageHistoryResponse) => ({
                ...page,
                messages: page.messages.map((msg) => {
                  const optMsg = msg as IOptimisticMessage
                  if (case_ === 'read' && isRead) {
                    return {
                      ...msg,
                      readBy: [...msg.readBy, ...readBy],
                    }
                  } else if (
                    (case_ === 'msgStatus' && optMsg.tempId === tempId) ||
                    optMsg.id === tempId
                  ) {
                    return {
                      ...msg,
                      id: serverId,
                      status: 'sent',
                    }
                  } else if (case_ === 'readAll') {
                    return {
                      ...msg,
                      readBy: [...msg.readBy, ...readBy],
                    }
                  } else if (case_ === 'reaction' && optMsg.id === serverId) {
                    return {
                      ...msg,
                      id: serverId,
                      reactions: reactions,
                    }
                  }
                  return msg
                }),
              })),
            }
          },
        )

        // Update in conversations cache too
        queryClient.setQueryData<IConversation[]>(
          chatKeys.conversations(),
          (old = []) =>
            old.map((conv) =>
              conv.participantId === participantId
                ? {
                    ...conv,
                    messages: conv.messages.map((msg) => {
                      const optMsg = msg as IOptimisticMessage
                      if (optMsg.tempId === tempId) {
                        return {
                          ...msg,
                          id: serverId,
                        }
                      }
                      return msg
                    }),
                  }
                : conv,
            ),
        )
      },
    })
  }

  // Add received message mutation
  const useAddReceivedMessage = () => {
    return useMutation({
      mutationFn: async (message: IMessage) => message,
      onSuccess: (message) => {
        // Determine which conversation this belongs to
        const participantId = message.senderId

        // Update infinite query cache
        queryClient.setQueryData(
          chatKeys.messages(participantId),
          (old: any) => {
            if (!old) return old

            // Check if message already exists
            const messageExists = old.pages.some(
              (page: MessageHistoryResponse) =>
                page.messages.some((m) => m.id === message.id),
            )

            if (messageExists) return old

            return {
              ...old,
              pages: old.pages.map(
                (page: MessageHistoryResponse, idx: number) =>
                  idx === 0
                    ? {
                        ...page,
                        messages: [...page.messages, message],
                      }
                    : page,
              ),
            }
          },
        )

        // Update conversations cache
        queryClient.setQueryData<IConversation[]>(
          chatKeys.conversations(),
          (old = []) => {
            const existingConv = old.find(
              (c) => c.participantId === participantId,
            )
            if (existingConv) {
              return old.map((conv) =>
                conv.participantId === participantId
                  ? {
                      ...conv,
                      messages: [
                        ...conv.messages.filter((m) => m.id !== message.id),
                        message,
                      ],
                      unreadCount: conv.unreadCount + 1,
                    }
                  : conv,
              )
            }
            return [
              ...old,
              {
                id: `conv-${Date.now()}`,
                participantId,
                messages: [message],
                unreadCount: 1,
              },
            ]
          },
        )
      },
    })
  }

  // React to message mutation - FIXED to prevent infinite fetching
  const useReactToMessage = (participantId: string, currentUserId: string) => {
    return useMutation({
      mutationFn: async ({
        messageId,
        emoji,
        type,
      }: {
        messageId: string
        emoji: string
        type: TReactionType
      }) => {
        // Emit Message reaction
        emitWithQueue?.('message:reaction', {
          emoji,
          messageId,
          type,
        })
        return { messageId, emoji, type }
      },

      onMutate: async ({ messageId, emoji, type }) => {
        await queryClient.cancelQueries({
          queryKey: chatKeys.messages(participantId),
        })

        const previousData = queryClient.getQueryData(
          chatKeys.messages(participantId),
        )

        queryClient.setQueryData(
          chatKeys.messages(participantId),
          (old: any) => {
            if (!old) return old

            return {
              ...old,
              pages: old.pages.map((page: MessageHistoryResponse) => ({
                ...page,
                messages: page.messages.map((msg) => {
                  if (msg.id !== messageId) return msg

                  // ADD reaction
                  if (type === 'add') {
                    const alreadyExists = msg.reactions.some(
                      (r) => r.userId === currentUserId && r.emoji === emoji,
                    )

                    if (alreadyExists) return msg

                    return {
                      ...msg,
                      reactions: [
                        ...msg.reactions,
                        {
                          emoji,
                          userId: currentUserId,
                          userName: 'You',
                        },
                      ],
                    }
                  }

                  // REMOVE reaction
                  if (type === 'remove') {
                    return {
                      ...msg,
                      reactions: msg.reactions.filter(
                        (r) =>
                          !(r.userId === currentUserId && r.emoji === emoji),
                      ),
                    }
                  }

                  return msg
                }),
              })),
              pageParams: old.pageParams,
            }
          },
        )

        return { previousData }
      },

      onError: (_err, _variables, context) => {
        if (context?.previousData) {
          queryClient.setQueryData(
            chatKeys.messages(participantId),
            context.previousData,
          )
        }
      },

      onSettled: () => {
        // Intentionally no refetch
      },
    })
  }

  return {
    useConversationMessages,
    useSendMessage,
    useUpdateMessageStatus,
    useAddReceivedMessage,
    useReactToMessage,
  }
}
