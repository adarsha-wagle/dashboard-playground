import React, { useState } from 'react'
import {
  motion,
  AnimatePresence,
  type Variants,
  type Transition,
} from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useSidebarContext } from './sidebar-context'
import { cn } from '@/lib/utils'
import type { ITreeNode } from './types'

interface TreePopoverProps {
  node: ITreeNode
}

const treeHeightSpring: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 40,
}

const childrenVariants: Variants = {
  initial: {
    height: 0,
    opacity: 0,
  },
  animate: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: treeHeightSpring,
      opacity: {
        duration: 0.15,
        delay: 0.05,
      },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: treeHeightSpring,
      opacity: {
        duration: 0.1,
      },
    },
  },
}

// Recursive component for popover tree items
const PopoverTreeItem: React.FC<{
  node: ITreeNode
  level?: number
}> = ({ node, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { activeItemId, setActiveItemId } = useSidebarContext()
  const hasChildren = node.children && node.children.length > 0
  const isActive = activeItemId === node.id
  const Icon = node.icon

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen)
    } else {
      setActiveItemId(node.id)
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className={cn(
          'group flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-sm transition-colors',
          isActive
            ? 'bg-sidebar-active text-sidebar-text-active font-medium'
            : 'text-sidebar-text hover:bg-sidebar-hover hover:text-sidebar-text-active',
        )}
        style={{ paddingLeft: `${10 + level * 12}px` }}
      >
        {hasChildren && (
          <motion.span
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <ChevronRight className="text-sidebar-icon h-3.5 w-3.5" />
          </motion.span>
        )}
        {Icon && !hasChildren && <Icon className="text-sidebar-icon h-4 w-4" />}
        <span className="truncate">{node.label}</span>
        {node.badge && (
          <span className="bg-primary/10 text-primary ml-auto rounded-full px-1.5 py-0.5 text-xs font-medium">
            {node.badge}
          </span>
        )}
      </button>

      <AnimatePresence initial={false}>
        {hasChildren && isOpen && (
          <motion.div
            variants={childrenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="overflow-hidden"
          >
            {node.children!.map((child) => (
              <PopoverTreeItem key={child.id} node={child} level={level + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const popoverVariants: Variants = {
  initial: { opacity: 0, x: -8, scale: 0.96 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    x: -8,
    scale: 0.96,
    transition: { duration: 0.15 },
  },
}

export const TreePopover: React.FC<TreePopoverProps> = ({ node }) => {
  const { activeItemId, setActiveItemId } = useSidebarContext()
  const hasChildren = node.children && node.children.length > 0
  const isActive = activeItemId === node.id
  const Icon = node.icon

  // Check if any child is active
  const isChildActive = (n: ITreeNode): boolean => {
    if (n.id === activeItemId) return true
    if (n.children) {
      return n.children.some(isChildActive)
    }
    return false
  }

  const hasActiveChild = hasChildren && node.children!.some(isChildActive)

  const handleClick = () => {
    if (!hasChildren) {
      setActiveItemId(node.id)
    }
  }

  if (!hasChildren) {
    return (
      <button
        onClick={handleClick}
        className={cn(
          'group relative flex w-full items-center justify-center rounded-lg p-3 transition-colors duration-150',
          'focus-visible:ring-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          isActive
            ? 'bg-sidebar-active text-sidebar-text-active'
            : 'text-sidebar-text hover:bg-sidebar-hover hover:text-sidebar-text-active',
        )}
        title={node.label}
      >
        {isActive && (
          <motion.div
            layoutId="activeIndicatorCollapsed"
            className="bg-sidebar-active-border absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-r-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
        {Icon && (
          <Icon
            className={cn(
              'h-5 w-5 transition-colors',
              isActive
                ? 'text-sidebar-icon-active'
                : 'text-sidebar-icon group-hover:text-sidebar-icon-active',
            )}
          />
        )}
      </button>
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'group relative flex w-full items-center justify-center rounded-lg p-3 transition-colors duration-150',
            'focus-visible:ring-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            hasActiveChild
              ? 'bg-sidebar-active text-sidebar-text-active'
              : 'text-sidebar-text hover:bg-sidebar-hover hover:text-sidebar-text-active',
          )}
          title={node.label}
        >
          {hasActiveChild && (
            <motion.div
              className="bg-sidebar-active-border absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-r-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}
          {Icon && (
            <Icon
              className={cn(
                'h-5 w-5 transition-colors',
                hasActiveChild
                  ? 'text-sidebar-icon-active'
                  : 'text-sidebar-icon group-hover:text-sidebar-icon-active',
              )}
            />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="start"
        sideOffset={8}
        className="shadow-popover w-56 p-2"
        asChild
      >
        <motion.div
          variants={popoverVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="text-muted-foreground mb-2 px-2 text-xs font-semibold tracking-wider uppercase">
            {node.label}
          </div>
          {node.children!.map((child) => (
            <PopoverTreeItem key={child.id} node={child} />
          ))}
        </motion.div>
      </PopoverContent>
    </Popover>
  )
}
