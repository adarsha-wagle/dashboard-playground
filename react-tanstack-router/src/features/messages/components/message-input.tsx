import { useRef, KeyboardEvent } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EmojiPicker } from "./emoji-picker";
import { useChatContext } from "../_shared/chat-provider";

interface MessageInputProps {
  selectedUserId: string;
  onSend: (content: string) => void;
}

export function MessageInput({ selectedUserId, onSend }: MessageInputProps) {
  // Ref for the textarea
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { socketState, currentUser } = useChatContext();

  const handleSend = () => {
    const message = textareaRef.current?.value.trim();
    if (message) {
      onSend(message);
      if (textareaRef.current) {
        textareaRef.current.value = "";
        textareaRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const text = textareaRef.current.value;
      textareaRef.current.value =
        text.slice(0, start) + emoji + text.slice(end);
      const cursorPos = start + emoji.length;
      textareaRef.current.setSelectionRange(cursorPos, cursorPos);
      textareaRef.current.focus();
    }
  };

  // Emit typing to receiver when user focuses on textarea
  const handleFocus = () => {
    if (socketState && textareaRef.current) {
      const roomId = [currentUser.id, selectedUserId].sort().join("-");
      socketState.emit("typing:start", { roomId });
    }
  };

  // Stop Emitting typing event when sender blurs out
  const handleBlur = () => {
    if (socketState && textareaRef.current) {
      const roomId = [currentUser.id, selectedUserId].sort().join("-");
      socketState.emit("typing:stop", { roomId });
    }
  };

  return (
    <>
      <div className="flex items-end gap-2">
        <div className="relative flex-1">
          <Textarea
            ref={textareaRef}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Type a message..."
            className="min-h-11 max-h-32 resize-none pr-12 py-3"
            rows={1}
          />
          <div className="absolute bottom-1.5 right-1.5">
            <EmojiPicker onEmojiSelect={handleEmojiSelect} />
          </div>
        </div>
        <Button
          onClick={handleSend}
          size="icon"
          className="h-11 w-11 shrink-0 rounded-full"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
}
