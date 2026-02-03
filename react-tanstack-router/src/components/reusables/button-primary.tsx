import React from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { Spinner } from '../ui/spinner'

type TButtonPrimaryProps = React.ComponentProps<typeof Button> & {
  isLoading?: boolean
  loadingText?: string
}

export function ButtonPrimary({
  className,
  children,
  isLoading = false,
  loadingText = 'Loading...',
  ...props
}: TButtonPrimaryProps) {
  return (
    <Button
      className={cn(
        'text-16 text-secondary-lighter flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2',
        className,
      )}
      disabled={isLoading || props.disabled} // disable button when loading
      {...props}
    >
      {isLoading ? (
        <>
          {/* Neo-Brutalism style loader - bouncing squares */}
          <div className="mt-1 flex items-center gap-1">
            <Spinner />
          </div>
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </Button>
  )
}
