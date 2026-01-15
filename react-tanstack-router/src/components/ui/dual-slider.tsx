'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/lib/utils'

interface DualRangeSliderProps extends React.ComponentProps<
  typeof SliderPrimitive.Root
> {
  labelPosition?: 'top' | 'bottom'
  label?: (value: number) => React.ReactNode
}

const DualRangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  DualRangeSliderProps
>(({ className, label, labelPosition = 'top', value, ...props }, ref) => {
  const values = Array.isArray(value) ? value : []

  return (
    <SliderPrimitive.Root
      ref={ref}
      value={values}
      className={cn(
        'relative flex w-full touch-none select-none items-center',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>

      {values.map((val, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className="relative block h-4 w-4 rounded-full border-2 border-primary bg-background
                     ring-offset-background transition-colors
                     focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span
            className={cn(
              'absolute left-1/2 -translate-x-1/2 text-xs whitespace-nowrap',
              labelPosition === 'top' && '-top-7',
              labelPosition === 'bottom' && 'top-5',
            )}
            style={{
              left: '50%',
              transform: `translateX(${
                index === 0
                  ? 'max(-50%, calc(-100% + 8px))'
                  : index === values.length - 1
                    ? 'min(-50%, calc(8px - 0%))'
                    : '-50%'
              })`,
            }}
          >
            {val}
          </span>
        </SliderPrimitive.Thumb>
      ))}
    </SliderPrimitive.Root>
  )
})

DualRangeSlider.displayName = 'DualRangeSlider'

export { DualRangeSlider }
