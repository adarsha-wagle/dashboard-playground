"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, getTimeAgo } from "@/lib/utils";
import { IUser } from "../_shared/chat-type";

interface UserListProps {
  users: IUser[];
  selectedUserId: string | null;
  currentUserId: string;
  onSelectUser: (user: IUser) => void;
}

const statusColors = {
  online: "bg-green-500",
  offline: "bg-muted-foreground/50",
};

export function UserList({
  users,
  selectedUserId,
  currentUserId,
  onSelectUser,
}: UserListProps) {
  const sortedUsers = [...users].sort((a, b) => {
    const statusOrder = { online: 0, offline: 1 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <div className="flex h-full flex-col border-r border-border bg-card">
      {/* Messsages Heading */}
      <div className="border-b border-border h-17 p-2">
        <h2 className="text-lg font-semibold text-foreground">Messages</h2>
        <p className="text-sm text-muted-foreground">
          {
            users.filter((u) => u.status === "online" && u.id !== currentUserId)
              .length
          }{" "}
          online
        </p>
      </div>

      <ScrollArea className="h-[calc(100vh-68px)]">
        <div className="p-2">
          {sortedUsers.map((user) => {
            if (user.id === currentUserId) {
              return null;
            }

            return (
              <button
                key={user.id}
                onClick={() => onSelectUser(user)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors",
                  "hover:bg-accent/50",
                  selectedUserId === user.id && "bg-accent"
                )}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span
                    className={cn(
                      "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card",
                      statusColors[user.status]
                    )}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="truncate font-medium text-foreground">
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
                  <p className="truncate text-sm text-muted-foreground">
                    {user?.lastMessage
                      ? user?.lastMessage?.senderId === currentUserId
                        ? `You: ${user?.lastMessage?.content}`
                        : `${user?.name}: ${user?.lastMessage?.content}`
                      : user?.status === "online"
                      ? "Start a conversation"
                      : `Last seen ${getTimeAgo(user?.lastSeen || "")}`}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
