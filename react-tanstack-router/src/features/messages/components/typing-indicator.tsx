import { type HTMLProps } from 'react'

import { cn } from '@/lib/utils'

interface TypingIndicatorProps {
  userName: string
  className?: HTMLProps<HTMLElement>['className']
}

export function TypingIndicator({ userName, className }: TypingIndicatorProps) {
  return (
    <div
      className={cn(
        'text-muted-foreground animate-fade-in flex items-center gap-2 px-4 text-sm',
        className,
      )}
    >
      <span>{userName} is typing</span>
      <span className="flex gap-1">
        <span className="bg-muted-foreground h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:0ms]" />
        <span className="bg-muted-foreground h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:150ms]" />
        <span className="bg-muted-foreground h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:300ms]" />
      </span>
    </div>
  )
}
