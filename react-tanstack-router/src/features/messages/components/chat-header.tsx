"use client";

import { Menu } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getTimeAgo } from "@/lib/utils";

import { IUser } from "../_shared/chat-type";
import { useChatContext } from "../_shared/chat-provider";

type TChatHeaderProps = {
  selectedUser: IUser;
};

function ChatHeader({ selectedUser }: TChatHeaderProps) {
  const { setIsSidebarOpen, isSidebarOpen } = useChatContext();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex items-center gap-3 border-b border-border px-4 py-3">
      {/* Sidebar Toggle Button for desktop */}

      <Button
        variant="ghost"
        size="icon"
        className="shrink-0"
        onClick={toggleSidebar}
      >
        <Menu className="size-5" />
      </Button>

      <Avatar className="h-10 w-10">
        <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
        <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <h2 className="font-semibold text-foreground truncate">
          {selectedUser.name}
        </h2>
        <p className="text-sm text-muted-foreground">
          {selectedUser.status === "online"
            ? "Online"
            : `Last seen ${getTimeAgo(selectedUser?.lastSeen || "")}`}
        </p>
      </div>
    </div>
  );
}

export { ChatHeader };
