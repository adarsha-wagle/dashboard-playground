"use client";

import { quickReactions } from "../_shared/data";
import { cn } from "@/lib/utils";

interface ReactionPickerProps {
  onReact: (emoji: string) => void;
  existingReactions?: string[];
}

export function ReactionPicker({
  onReact,
  existingReactions = [],
}: ReactionPickerProps) {
  return (
    <div className="flex items-center gap-0.5 rounded-full bg-popover border border-border shadow-lg p-1 animate-scale-in">
      {quickReactions.map((emoji) => (
        <button
          key={emoji}
          onClick={() => onReact(emoji)}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full text-base transition-all hover:scale-125 hover:bg-accent",
            existingReactions.includes(emoji) && "bg-accent"
          )}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
