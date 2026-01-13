import React from 'react'
import { motion, type Transition, type Variants } from 'framer-motion'
import { PanelLeftClose, PanelLeft } from 'lucide-react'
import { useSidebarContext } from './sidebar-context'
import { TreeItem } from './treeitem'
import { TreePopover } from './treepopover'
import { type TreeNode } from './types'
import { cn } from '@/lib/utils'

interface AnimatedSidebarProps {
  navigation: TreeNode[]
  header?: React.ReactNode
  footer?: React.ReactNode
}

// Spring animation for sidebar width
const sidebarSpring: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 35,
}

const sidebarVariants: Variants = {
  expanded: {
    width: 260,
    transition: sidebarSpring,
  },
  collapsed: {
    width: 64,
    transition: sidebarSpring,
  },
}

export const AnimatedSidebar: React.FC<AnimatedSidebarProps> = ({
  navigation,
  header,
  footer,
}) => {
  const { isExpanded, toggleSidebar } = useSidebarContext()

  return (
    <motion.aside
      variants={sidebarVariants}
      initial={false}
      animate={isExpanded ? 'expanded' : 'collapsed'}
      className={cn(
        'relative flex h-screen flex-col border-r bg-sidebar',
        'border-sidebar-border',
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {header || (
          <motion.div
            initial={false}
            animate={{ opacity: isExpanded ? 1 : 0 }}
            className="flex items-center gap-2 overflow-hidden"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">
                L
              </span>
            </div>
            <span className="whitespace-nowrap font-semibold text-foreground">
              AW
            </span>
          </motion.div>
        )}

        {/* Toggle button */}
        <motion.button
          onClick={toggleSidebar}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
            'text-sidebar-icon hover:bg-sidebar-hover hover:text-sidebar-text-active',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isExpanded ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeft className="h-5 w-5" />
          )}
        </motion.button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3">
        <div role="tree" aria-label="Navigation tree">
          {isExpanded
            ? navigation.map((node) => <TreeItem key={node.id} node={node} />)
            : navigation.map((node) => (
                <TreePopover key={node.id} node={node} />
              ))}
        </div>
      </nav>

      {/* Footer */}
      {footer && (
        <div className="border-t border-sidebar-border p-3">{footer}</div>
      )}
    </motion.aside>
  )
}
