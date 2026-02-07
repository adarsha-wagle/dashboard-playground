import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useId,
  useCallback,
} from 'react'
import { Slot } from '@radix-ui/react-slot'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import {
  motion,
  AnimatePresence,
  type Variants,
  type Transition,
} from 'motion/react'
import { cn } from '@/lib/utils'
import { usePreventScroll } from '@/hooks/usePreventScroll'

/* ---------------------------------------------------------
 * Context
 * -------------------------------------------------------- */

type AnimationPreset = 'zoom' | 'fade' | 'slide-up' | 'morph'

const presetVariants: Record<AnimationPreset, Variants> = {
  zoom: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  'slide-up': {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 40 },
  },

  // ⭐ Morph placeholder (actual morph logic computed dynamically)
  morph: {
    initial: {},
    animate: {},
    exit: {},
  },
}

const defaultTransition: Transition = {
  duration: 0.22,
  ease: 'easeOut',
}

type DialogContextType = {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
  dialogRef: React.RefObject<HTMLDialogElement | null>
  triggerRect: DOMRect | null
  registerTriggerRef: (el: HTMLElement | null) => void
  ids: { dialog: string; title: string; description: string }
  variants: Variants
  transition: Transition
  closeOnOutsideClick: boolean
  returnFocus: boolean
  morphing: boolean
}

const DialogContext = createContext<DialogContextType | null>(null)

/* ---------------------------------------------------------
 * Root
 * -------------------------------------------------------- */

export interface DialogProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (v: boolean) => void

  animation?: AnimationPreset
  variants?: Variants
  transition?: Transition

  morphing?: boolean
  trapFocus?: boolean
  returnFocus?: boolean
  closeOnOutsideClick?: boolean
}

export function Dialog({
  children,
  open,
  defaultOpen,
  onOpenChange,

  animation = 'zoom',
  variants,
  transition = defaultTransition,

  morphing = false,
  closeOnOutsideClick = true,
  returnFocus = true,
}: DialogProps) {
  const [_open, _setOpen] = React.useState(defaultOpen || false)
  const isOpen = open !== undefined ? open : _open
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const [triggerRect, setTriggerRect] = React.useState<DOMRect | null>(null)

  usePreventScroll({ isDisabled: !isOpen })

  const registerTriggerRef = (el: HTMLElement | null) => {
    triggerRef.current = el
  }

  const setIsOpen = useCallback(
    (v: boolean) => {
      if (v && triggerRef.current) {
        setTriggerRect(triggerRef.current.getBoundingClientRect())
      }
      _setOpen(v)
      onOpenChange?.(v)
    },
    [onOpenChange],
  )

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    // Only open manually; closing is handled by AnimatePresence exit
    if (isOpen && !dialog.open) dialog.showModal()
  }, [isOpen])

  const baseId = useId()
  const ids = {
    dialog: `dialog-${baseId}`,
    title: `dialog-title-${baseId}`,
    description: `dialog-desc-${baseId}`,
  }

  return (
    <DialogContext.Provider
      value={{
        isOpen,
        setIsOpen,
        dialogRef,
        triggerRect,
        registerTriggerRef,
        ids,
        variants: variants || presetVariants[animation],
        transition,
        closeOnOutsideClick,
        returnFocus,
        morphing,
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}

/* ---------------------------------------------------------
 * Trigger
 * -------------------------------------------------------- */

export interface DialogTriggerProps {
  asChild?: boolean
  children: React.ReactNode
}

export function DialogTrigger({ asChild, children }: DialogTriggerProps) {
  const ctx = useContext(DialogContext)
  if (!ctx) throw new Error('DialogTrigger must be inside <Dialog>')

  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      ref={(el: HTMLElement | null) => ctx.registerTriggerRef(el)}
      onClick={() => ctx.setIsOpen(true)}
      aria-haspopup="dialog"
      aria-expanded={ctx.isOpen}
    >
      {children}
    </Comp>
  )
}

/* ---------------------------------------------------------
 * Portal
 * -------------------------------------------------------- */

function DialogPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  return createPortal(children, document.body)
}

/* ---------------------------------------------------------
 * Content (with morph-from-trigger)
 * -------------------------------------------------------- */

export interface DialogContentProps {
  children: React.ReactNode
  className?: string
}

export function DialogContent({ children, className }: DialogContentProps) {
  const ctx = useContext(DialogContext)
  if (!ctx) throw new Error('DialogContent must be inside <Dialog>')

  const {
    isOpen,
    setIsOpen,
    dialogRef,
    variants,
    transition,
    triggerRect,
    morphing,
  } = ctx

  const [dialogRect, setDialogRect] = React.useState<DOMRect | null>(null)

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (!ctx.closeOnOutsideClick) return
    if (e.target === dialogRef.current) setIsOpen(false)
  }

  // Compute final dialog rect when opened
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      setTimeout(() => {
        const rect = dialogRef.current!.getBoundingClientRect()
        setDialogRect(rect)
      }, 0)
    }
  }, [isOpen])

  // Compute morph animation positions
  const morphVariants: Variants =
    morphing && triggerRect && dialogRect
      ? {
          initial: {
            opacity: 0,
            x: triggerRect.left - dialogRect.left,
            y: triggerRect.top - dialogRect.top,
            scaleX: triggerRect.width / dialogRect.width,
            scaleY: triggerRect.height / dialogRect.height,
            borderRadius: 20,
          },
          animate: {
            opacity: 1,
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            borderRadius: 16,
          },
          exit: {
            opacity: 0,
            x: triggerRect.left - dialogRect.left,
            y: triggerRect.top - dialogRect.top,
            scaleX: triggerRect.width / dialogRect.width,
            scaleY: triggerRect.height / dialogRect.height,
            borderRadius: 20,
          },
        }
      : variants

  return (
    <DialogPortal>
      <AnimatePresence
        onExitComplete={() => {
          const dialog = dialogRef.current
          if (dialog?.open) dialog.close()
        }}
      >
        {isOpen && (
          <motion.dialog
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={ctx.ids.title}
            aria-describedby={ctx.ids.description}
            className={cn(
              'fixed top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2',
              'bg-background rounded-xl border p-6 shadow-lg',
              'open:flex open:flex-col',
              'origin-top-left backdrop:bg-white/60 backdrop:backdrop-blur-xs',
              className,
            )}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={morphVariants}
            transition={transition}
            onClick={handleOverlayClick}
          >
            {children}
          </motion.dialog>
        )}
      </AnimatePresence>
    </DialogPortal>
  )
}

/* ---------------------------------------------------------
 * Sub-components
 * -------------------------------------------------------- */

export function DialogHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-1.5 p-4', className)}>{children}</div>
  )
}

export function DialogTitle({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ctx = useContext(DialogContext)
  if (!ctx) throw new Error('DialogTitle must be inside <Dialog>')

  return (
    <h2 id={ctx.ids.title} className={cn('text-base font-medium', className)}>
      {children}
    </h2>
  )
}

export function DialogDescription({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ctx = useContext(DialogContext)
  if (!ctx) throw new Error('DialogDescription must be inside <Dialog>')

  return (
    <p
      id={ctx.ids.description}
      className={cn('text-muted-foreground text-sm', className)}
    >
      {children}
    </p>
  )
}

export function DialogFooter({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'bg-muted/30 flex items-center justify-end gap-2 p-4',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function DialogClose({
  children,
  asChild,
  className,
}: {
  children?: React.ReactNode
  asChild?: boolean
  className?: string
}) {
  const ctx = useContext(DialogContext)
  if (!ctx) throw new Error('DialogClose must be inside <Dialog>')

  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(
        'absolute top-3 right-3 opacity-70 hover:opacity-100 focus:outline-none',
        className,
      )}
      onClick={() => ctx.setIsOpen(false)}
    >
      {children || <X className="h-4 w-4" />}
      <span className="sr-only">Close</span>
    </Comp>
  )
}
