import { quickReactions } from '../shared/data'
import { cn } from '@/lib/utils'

interface ReactionPickerProps {
  onReact: (emoji: string) => void
  existingReactions?: string[]
}

export function ReactionPicker({
  onReact,
  existingReactions = [],
}: ReactionPickerProps) {
  return (
    <div className="bg-popover border-border animate-scale-in flex items-center gap-0.5 rounded-full border p-1 shadow-lg">
      {quickReactions.map((emoji) => (
        <button
          key={emoji}
          onClick={() => onReact(emoji)}
          className={cn(
            'hover:bg-accent flex h-7 w-7 items-center justify-center rounded-full text-base transition-all hover:scale-125',
            existingReactions.includes(emoji) && 'bg-accent',
          )}
        >
          {emoji}
        </button>
      ))}
    </div>
  )
}
