import { cn } from '@/lib/utils'
import React, { type HTMLProps } from 'react'

type TMainProps = {
  children: React.ReactNode
  className?: HTMLProps<HTMLDivElement>['className']
}

function Main({ children, className }: TMainProps) {
  return (
    <main
      className={cn(
        'scrollbar-thin p-layout-padding bg-background space-y-8 overflow-y-scroll',
        className,
      )}
    >
      {children}
    </main>
  )
}

export default Main
