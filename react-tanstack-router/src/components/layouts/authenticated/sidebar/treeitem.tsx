import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { useSidebarContext } from './sidebar-context'
import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import type { ITreeNode } from './types'

interface TreeItemProps {
  node: ITreeNode
  level?: number
}

// ---------------- Animations ----------------

const itemVariants = {
  initial: { opacity: 0, x: -8 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -8 },
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
      height: { type: 'spring', stiffness: 500, damping: 40 },
      opacity: { duration: 0.2, delay: 0.05 },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { type: 'spring', stiffness: 500, damping: 40 },
      opacity: { duration: 0.1 },
    },
  },
}

const chevronVariants = {
  closed: { rotate: 0 },
  open: { rotate: 90 },
}

// ---------------- Component ----------------

export const TreeItem: React.FC<TreeItemProps> = ({ node, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { isExpanded, activeItemId, setActiveItemId } = useSidebarContext()

  const hasChildren = !!node.children?.length
  const Icon = node.icon

  // -------- Recursive active detection --------
  const isNodeActive = (n: ITreeNode): boolean => {
    if (n.id === activeItemId) return true
    if (!n.children) return false
    return n.children.some(isNodeActive)
  }

  const isActive = isNodeActive(node)

  // -------- Auto-open parent if child is active --------
  useEffect(() => {
    if (hasChildren && isActive) {
      setIsOpen(true)
    }
  }, [hasChildren, isActive])

  // -------- Handlers --------
  const handleClick = () => {
    if (hasChildren) {
      setIsOpen((prev) => !prev)
    } else {
      setActiveItemId(node.id)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
    if (e.key === 'ArrowRight' && hasChildren && !isOpen) {
      setIsOpen(true)
    }
    if (e.key === 'ArrowLeft' && hasChildren && isOpen) {
      setIsOpen(false)
    }
  }

  return (
    <div role="treeitem" aria-expanded={hasChildren ? isOpen : undefined}>
      <motion.button
        variants={itemVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'group relative flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150',
          'focus-visible:ring-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          isActive
            ? 'bg-primary-lighter text-primary-dark'
            : 'text-sidebar-text hover:bg-sidebar-hover hover:text-primary-main',
          level > 0 && 'ml-4',
        )}
        style={{ paddingLeft: isExpanded ? `${12 + level * 12}px` : '12px' }}
        aria-current={isActive ? 'page' : undefined}
      >
        {/* Active indicator */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              className="bg-primary absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-r-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </AnimatePresence>

        {/* Icon */}
        {Icon && (
          <Icon
            className={cn(
              'h-5 w-5 shrink-0 transition-colors duration-150',
              isActive
                ? 'text-primary'
                : 'text-sidebar-icon group-hover:text-primary',
            )}
          />
        )}

        {/* Label */}
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 truncate text-left font-medium"
            >
              {node.to ? (
                <Link
                  to={node.to}
                  className="block w-full"
                  onClick={() => {
                    if (!hasChildren) setActiveItemId(node.id)
                  }}
                >
                  {node.label}
                </Link>
              ) : (
                node.label
              )}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Chevron */}
        {hasChildren && isExpanded && (
          <motion.span
            variants={chevronVariants}
            animate={isOpen ? 'open' : 'closed'}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="shrink-0"
          >
            <ChevronRight className="text-sidebar-icon h-4 w-4" />
          </motion.span>
        )}

        {/* Badge */}
        {node.badge && isExpanded && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-primary/10 text-primary ml-auto rounded-full px-2 py-0.5 text-xs font-medium"
          >
            {node.badge}
          </motion.span>
        )}
      </motion.button>

      {/* Children */}
      <AnimatePresence initial={false}>
        {hasChildren && isOpen && isExpanded && (
          <motion.div
            variants={childrenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="overflow-hidden"
            role="group"
          >
            {node.children!.map((child) => (
              <TreeItem key={child.id} node={child} level={level + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
