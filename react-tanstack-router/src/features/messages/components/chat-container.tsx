"use client";

import { cn } from "@/lib/utils";
import { useChatContext } from "../_shared/chat-provider";
import { ChatArea } from "./chat-area";

function ChatContainer() {
  const { selectedUser, socketState, currentUser, socketError, emitWithQueue } =
    useChatContext();

  if (!selectedUser) {
    return (
      <div className={cn("flex-1 min-w-0")}>
        <div className="flex h-full flex-col items-center justify-center bg-background">
          <div className="text-center">
            <div className="mb-4 text-6xl">💬</div>
            <h2 className="text-xl font-semibold text-foreground">
              Select a conversation
            </h2>
            <p className="text-muted-foreground">
              Choose a contact to start messaging
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!socketState)
    return (
      <div className={cn("flex-1 min-w-0")}>
        <div className="flex h-full flex-col items-center justify-center bg-background">
          <div className="text-center">
            <div className="mb-4 text-6xl">💬</div>
            <h2 className="text-xl font-semibold text-foreground">
              Therre was an Error connecting to the socket
            </h2>
            <p className="text-muted-foreground">
              {socketError || "Please refresh the page and try again."}
            </p>
          </div>
        </div>
      </div>
    );

  return (
    <ChatArea
      selectedUser={selectedUser}
      socketState={socketState}
      currentUser={currentUser}
      emitWithQueue={emitWithQueue}
    />
  );
}

export default ChatContainer;
