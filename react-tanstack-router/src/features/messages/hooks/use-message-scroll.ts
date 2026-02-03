import { useCallback, useEffect, useRef, useState } from "react";

interface UseMessageScrollOptions {
  messages: any[];
  isFetchingMore?: boolean;
}

export function useMessageScroll({
  messages,
  isFetchingMore,
}: UseMessageScrollOptions) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Track scroll state
  const previousScrollHeight = useRef(0);
  const previousScrollTop = useRef(0);
  const isInitialLoad = useRef(true);
  const lastMessageCount = useRef(0);
  const isRestoring = useRef(false);

  const getScrollContainer = useCallback(() => {
    return scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLElement | null;
  }, []);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    bottomRef.current?.scrollIntoView({ behavior });
  }, []);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const isNearBottom =
      target.scrollHeight - target.scrollTop - target.clientHeight < 600;
    setShowScrollButton(!isNearBottom);
  }, []);

  // Auto-scroll to bottom on first load or when new messages arrive
  useEffect(() => {
    if (messages.length === 0) return;

    const scrollContainer = getScrollContainer();
    if (!scrollContainer) return;

    // Initial load - scroll instantly to bottom
    if (isInitialLoad.current) {
      // Use multiple attempts to ensure scroll happens after DOM updates
      const scrollAttempts = [0, 50, 100, 200];
      scrollAttempts.forEach((delay) => {
        setTimeout(() => {
          scrollToBottom("instant");
        }, delay);
      });

      isInitialLoad.current = false;
      lastMessageCount.current = messages.length;
      return;
    }

    // New message arrived - only scroll if user is near bottom
    if (messages.length > lastMessageCount.current) {
      const isNearBottom =
        scrollContainer.scrollHeight -
          scrollContainer.scrollTop -
          scrollContainer.clientHeight <
        300;

      // If user is near bottom, scroll to new message
      if (isNearBottom) {
        setTimeout(() => scrollToBottom("smooth"), 100);
      }

      lastMessageCount.current = messages.length;
    }
  }, [messages.length, scrollToBottom, getScrollContainer]);

  // Maintain scroll position after loading more messages - IMPROVED
  useEffect(() => {
    const scrollContainer = getScrollContainer();
    if (!scrollContainer) return;

    // Save scroll state before fetching
    if (isFetchingMore && !isRestoring.current) {
      previousScrollHeight.current = scrollContainer.scrollHeight;
      previousScrollTop.current = scrollContainer.scrollTop;
      return;
    }

    // Restore scroll position after fetching
    if (
      !isFetchingMore &&
      previousScrollHeight.current > 0 &&
      !isRestoring.current
    ) {
      isRestoring.current = true;

      // Use multiple restoration attempts with requestAnimationFrame
      const restoreScroll = () => {
        const currentScrollHeight = scrollContainer.scrollHeight;
        const heightDifference =
          currentScrollHeight - previousScrollHeight.current;

        if (heightDifference > 0) {
          // Calculate new scroll position to maintain user's view
          const newScrollTop = previousScrollTop.current + heightDifference;
          scrollContainer.scrollTop = newScrollTop;
        }
      };

      // Trying multiple times to ensure it works
      requestAnimationFrame(() => {
        restoreScroll();
        requestAnimationFrame(() => {
          restoreScroll();
          setTimeout(() => {
            restoreScroll();
            isRestoring.current = false;
            previousScrollHeight.current = 0;
            previousScrollTop.current = 0;
          }, 50);
        });
      });
    }
  }, [isFetchingMore, messages.length, getScrollContainer]);

  return {
    bottomRef,
    scrollAreaRef,
    scrollToBottom,
    showScrollButton,
    handleScroll,
  };
}
