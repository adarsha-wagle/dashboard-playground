"use client";

import { HTMLProps } from "react";

import { cn } from "@/lib/utils";

interface TypingIndicatorProps {
  userName: string;
  className?: HTMLProps<HTMLElement>["className"];
}

export function TypingIndicator({ userName, className }: TypingIndicatorProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 text-sm text-muted-foreground animate-fade-in ",
        className
      )}
    >
      <span>{userName} is typing</span>
      <span className="flex gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
      </span>
    </div>
  );
}
