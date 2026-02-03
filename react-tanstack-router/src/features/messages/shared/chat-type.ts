export interface IUser {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline";
  roomId: string;
  socketId?: string;
  lastSeen?: string;
  joinedAt?: string;
  lastMessage?: IMessage;
  unreadCount?: number;
}
export interface IReaction {
  emoji: string;
  userId: string;
  userName: string;
}

export type TReactionType = "add" | "remove";

export type TMessageStatus = "sending" | "sent" | "failed";

export interface IMessage {
  id: string;
  senderId: string;
  receiverId?: string;
  roomId: string;
  content: string;
  status: TMessageStatus;
  isRead: boolean;
  readBy: string[];
  reactions: IReaction[];
  timestamp: string;
}

export interface IConversation {
  id: string;
  participantId: string;
  messages: IMessage[];
  unreadCount: number;
}
