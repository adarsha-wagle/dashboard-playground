"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Socket } from "socket.io-client";
import { IUser } from "./chat-type";
import {
  IClientToServerEvents,
  IServerToClientEvents,
  useSocketIO,
} from "@/hooks/use-socketio";
import { useLocalStorage } from "@/hooks/use-localstorage";

interface IChatContext {
  selectedUser: IUser | null;
  setSelectedUser: (userId: IUser | null) => void;
  setIsSidebarOpen: (value: boolean) => void;
  isSidebarOpen: boolean;
  socketState: Socket<IServerToClientEvents, IClientToServerEvents> | null;
  currentUser: IUser;
  setCurrentUser: (user: IUser) => void;
  socketError: string | null;
  emitWithQueue: <K extends keyof IClientToServerEvents>(
    event: K,
    data: Parameters<IClientToServerEvents[K]>[0]
  ) => void;
}

const ChatContext = createContext<IChatContext | undefined>(undefined);

interface TChatProviderProps {
  children: ReactNode;
}

// 4. Create typed provider
export function ChatProvider({ children }: TChatProviderProps) {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const { getItem } = useLocalStorage("userInfo");
  const [currentUser, setCurrentUser] = useState<IUser>({
    avatar: getItem()?.avatar || "",
    id: getItem()?.id || "",
    name: getItem()?.name || "",
    status: "online",
    roomId: "general",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const { socket, isConnected, error, emitWithQueue } = useSocketIO();

  useEffect(() => {
    if (!socket || !isConnected) return;

    socket.emit("user:join", {
      user: currentUser,
    });
  }, [socket, isConnected]);

  return (
    <ChatContext.Provider
      value={{
        selectedUser,
        setSelectedUser,
        setIsSidebarOpen,
        isSidebarOpen,
        socketState: socket,
        currentUser,
        setCurrentUser,
        socketError: error,
        emitWithQueue,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext(): IChatContext {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within ChatProvider");
  }
  return context;
}
