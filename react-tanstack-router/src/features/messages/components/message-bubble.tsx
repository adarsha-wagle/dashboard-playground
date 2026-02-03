"use client";

import { useState } from "react";
import { Check, CheckCheck } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn, getLocalTime } from "@/lib/utils";
import { ReactionPicker } from "./reaction-picker";
import { IMessage, TReactionType } from "../_shared/chat-type";

interface MessageBubbleProps {
  message: IMessage;
  isOwn: boolean;
  showAvatar: boolean;
  receieverAvatar: string;
  onReact: (messageId: string, emoji: string, type: TReactionType) => void;
  receiverId: string;
  currentUserId: string;
}

export function MessageBubble({
  message,
  isOwn,
  showAvatar,
  receieverAvatar,
  onReact,
  receiverId,
  currentUserId,
}: MessageBubbleProps) {
  const [showReactions, setShowReactions] = useState(false);

  const groupedReactions = message.reactions.reduce((acc, reaction) => {
    if (!acc[reaction.emoji]) {
      acc[reaction.emoji] = [];
    }
    acc[reaction.emoji].push(reaction.userName);
    return acc;
  }, {} as Record<string, string[]>);

  const existingUserReactions = message.reactions
    .filter((r) => r.userId === currentUserId)
    .map((r) => r.emoji);

  return (
    <div
      className={cn(
        "group relative flex gap-2 px-4",
        isOwn ? "flex-row-reverse" : "flex-row"
      )}
      onMouseEnter={() => setShowReactions(true)}
      onMouseLeave={() => setShowReactions(false)}
    >
      {/* Avatar placeholder for alignment */}
      {!isOwn && (
        <div className="w-8 shrink-0 ">
          {showAvatar && (
            <img
              src={receieverAvatar}
              alt="avatar"
              className="h-8 w-8 rounded-full"
            />
          )}
        </div>
      )}

      <div
        className={cn("flex max-w-[70%] flex-col gap-1", isOwn && "items-end")}
      >
        {/* Message bubble */}
        <div
          className={cn(
            "relative rounded-2xl px-4 py-2.5 shadow-sm transition-all",
            isOwn
              ? "bg-primary text-primary-foreground rounded-br-md"
              : "bg-muted text-foreground rounded-bl-md"
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap wrap-break-words">
            {message.content}
          </p>

          {/* Reactions on message */}
          {Object.keys(groupedReactions).length > 0 && (
            <div
              className={cn(
                "absolute -bottom-3 flex gap-1",
                isOwn ? "right-2" : "left-2"
              )}
            >
              {Object.entries(groupedReactions).map(([emoji, users]) => (
                <button
                  key={emoji}
                  onClick={() => onReact(message.id, emoji, "remove")}
                  className="flex items-center gap-0.5 rounded-full bg-background border border-border px-1.5 py-0.5 text-xs shadow-sm hover:bg-accent transition-colors"
                  title={users.join(", ")}
                >
                  <span>{emoji}</span>
                  {users.length > 1 && (
                    <span className="text-muted-foreground">
                      {users.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
          {/* Action buttons */}
          <div
            className={cn(
              "absolute top-0 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100",
              isOwn ? "right-10/12" : "left-10/12"
            )}
          >
            {showReactions && (
              <ReactionPicker
                onReact={(emoji) => onReact(message.id, emoji, "add")}
                existingReactions={existingUserReactions}
              />
            )}
          </div>
        </div>

        {/* Timestamp and read receipt */}
        <div
          className={cn(
            "flex items-center gap-1 text-xs text-muted-foreground",
            isOwn && "flex-row-reverse"
          )}
        >
          <span>{getLocalTime(message.timestamp)}</span>
          {isOwn && (
            <>
              {message.readBy.includes(receiverId) ? (
                <Avatar className="size-4 p-0.5 text-white rounded-full">
                  <AvatarImage src={receieverAvatar} alt="no image" />
                </Avatar>
              ) : message.status === "sent" ? (
                <CheckCheck className="h-3.5 w-3.5" />
              ) : (
                <Check className="h-3.5 w-3.5" />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
