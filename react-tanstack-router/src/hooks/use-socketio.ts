import { useEffect, useRef, useState, useCallback } from 'react'
import {
  io,
  Socket,
  type ManagerOptions,
  type SocketOptions,
} from 'socket.io-client'
import {
  type IMessage,
  type IReaction,
  type IUser,
} from '@/features/messages/shared/chat-type'
import { CONFIG } from '@/config/constant'

// Define your custom events interface
export interface IServerToClientEvents {
  'user:joined': (data: { user: IUser; contacts: IUser[] }) => void
  'contacts:update': (data: { contacts: IUser[] }) => void
  'message:sent': (data: { message: IMessage; tempId: string }) => void
  'message:received': (data: { message: IMessage }) => void
  'message:read': (data: {
    messageId: string
    userId: string
    readBy: string[]
  }) => void
  'messages:readAll': (data: { readBy: string[] }) => void
  'message:reactionUpdated': (data: {
    messageId: string
    reactions: IReaction[]
    action: 'add' | 'remove'
  }) => void
  'typing:update': (data: {
    isTyping: boolean
    roomId: string
    typingUsers: string[]
    userId: string
  }) => void
}

export interface IClientToServerEvents {
  'user:join': (data: { user: IUser }) => void
  'message:send': (data: { msg: Partial<IMessage>; tempId?: string }) => void
  'message:read': (data: { messageId: string; roomId?: string }) => void
  'messages:readAll': (data: { roomId: string }) => void
  'message:reaction': (data: {
    messageId: string
    emoji: string
    type: 'add' | 'remove'
  }) => void
  'room:active': (data: { roomId: string }) => void
  'typing:start': (data: { roomId: string }) => void
  'typing:stop': (data: { roomId: string }) => void
}

type UseSocketIOOptions = Partial<ManagerOptions & SocketOptions>

interface QueuedEvent {
  event: keyof IClientToServerEvents
  data: any
  timestamp: number
  retries: number
}

interface IUseSocketIOReturn {
  socket: Socket<IServerToClientEvents, IClientToServerEvents> | null
  isConnected: boolean
  error: string | null
  queueSize: number
  emitWithQueue: <K extends keyof IClientToServerEvents>(
    event: K,
    data: Parameters<IClientToServerEvents[K]>[0],
  ) => void
}

const MAX_QUEUE_SIZE = 100
const MAX_RETRIES = 3
const QUEUE_PROCESS_DELAY = 100 // ms between processing queued items

export const useSocketIO = (
  options: UseSocketIOOptions = {},
): IUseSocketIOReturn => {
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [queueSize, setQueueSize] = useState(0)

  const socketRef = useRef<Socket<
    IServerToClientEvents,
    IClientToServerEvents
  > | null>(null)
  const isInitialized = useRef<boolean>(false)
  const messageQueue = useRef<QueuedEvent[]>([])
  const isProcessingQueue = useRef(false)

  // Process queued messages
  const processQueue = useCallback(async () => {
    if (
      isProcessingQueue.current ||
      !socketRef.current?.connected ||
      messageQueue.current.length === 0
    ) {
      return
    }

    isProcessingQueue.current = true

    while (messageQueue.current.length > 0 && socketRef.current?.connected) {
      const queuedEvent = messageQueue.current[0]

      try {
        // Emit the event
        socketRef.current.emit(queuedEvent.event as any, queuedEvent.data)

        // Remove from queue on success
        messageQueue.current.shift()
        setQueueSize(messageQueue.current.length)

        // Small delay between emissions to avoid overwhelming the server
        await new Promise((resolve) => setTimeout(resolve, QUEUE_PROCESS_DELAY))
      } catch (err) {
        console.error('Error processing queued event:', err)

        // Increment retry count
        queuedEvent.retries++

        if (queuedEvent.retries >= MAX_RETRIES) {
          // Remove if max retries reached
          console.error('Max retries reached for event:', queuedEvent.event)
          messageQueue.current.shift()
        } else {
          // Move to end of queue for retry
          messageQueue.current.shift()
          messageQueue.current.push(queuedEvent)
        }

        setQueueSize(messageQueue.current.length)
        break // Stop processing on error
      }
    }

    isProcessingQueue.current = false
  }, [])

  // Emit with queue support
  const emitWithQueue = useCallback(
    <K extends keyof IClientToServerEvents>(
      event: K,
      data: Parameters<IClientToServerEvents[K]>[0],
    ) => {
      const socket = socketRef.current

      if (!socket) {
        console.warn('Socket not initialized')
        return
      }

      // If connected, emit directly
      if (socket.connected) {
        socket.emit(event as any, data)
        return
      }

      // If disconnected, add to queue
      if (messageQueue.current.length >= MAX_QUEUE_SIZE) {
        console.warn('Message queue is full, dropping oldest message')
        messageQueue.current.shift()
      }

      messageQueue.current.push({
        event,
        data,
        timestamp: Date.now(),
        retries: 0,
      })

      setQueueSize(messageQueue.current.length)
      console.log(
        `Queued ${event} event (queue size: ${messageQueue.current.length})`,
      )
    },
    [],
  )

  useEffect(() => {
    if (isInitialized.current || socketRef.current) return
    isInitialized.current = true

    const newSocket: Socket<IServerToClientEvents, IClientToServerEvents> = io(
      CONFIG.API_URL,
      {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: Infinity,
        transports: ['polling', 'websocket'],
        ...options,
      },
    )

    socketRef.current = newSocket

    // Connection Event Handlers
    newSocket.on('connect', () => {
      console.log('Socket.io Connected')
      setIsConnected(true)
      setError(null)

      // Process queued messages after reconnection
      if (messageQueue.current.length > 0) {
        console.log(`Processing ${messageQueue.current.length} queued messages`)
        processQueue()
      }
    })

    newSocket.on('disconnect', (reason) => {
      console.log('Socket.io Disconnected:', reason)
      setIsConnected(false)
    })

    newSocket.io.on('error', (err) => {
      console.error('Connection Error:', err.message)
      setError(err.message)
      setIsConnected(false)
    })

    newSocket.io.on('reconnect', (attemptNumber) => {
      console.log('Reconnected after', attemptNumber, 'attempts')
      setIsConnected(true)
      setError(null)

      // Process queued messages after reconnection
      if (messageQueue.current.length > 0) {
        console.log(
          `Processing ${messageQueue.current.length} queued messages after reconnect`,
        )
        processQueue()
      }
    })

    newSocket.io.on('reconnect_attempt', (attemptNumber) => {
      console.log('Reconnection attempt:', attemptNumber)
    })

    newSocket.io.on('reconnect_error', (err) => {
      console.error('Reconnection error:', err.message)
      setError(err.message)
    })

    newSocket.io.on('reconnect_failed', () => {
      console.error('Reconnection failed')
      setError('Failed to reconnect to server')
    })

    return () => {
      isInitialized.current = false

      // Clear queue on unmount
      messageQueue.current = []
      setQueueSize(0)

      newSocket.close()
      socketRef.current = null
    }
  }, [processQueue])

  return {
    socket: socketRef.current,
    isConnected,
    error,
    queueSize,
    emitWithQueue,
  }
}
