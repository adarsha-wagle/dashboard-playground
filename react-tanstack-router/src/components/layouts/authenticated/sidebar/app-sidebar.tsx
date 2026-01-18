import React from 'react'
import { motion, type Transition, type Variants } from 'framer-motion'
import { PanelLeftClose, PanelLeft } from 'lucide-react'
import { useSidebarContext } from './sidebar-context'
import { TreeItem } from './treeitem'
import { TreePopover } from './treepopover'
import { cn } from '@/lib/utils'
import type { ITreeNode } from './types'
import { SidebarFooter } from './sidebar-footer'

interface AnimatedSidebarProps {
  navigation: ITreeNode[]
}

// Spring animation for sidebar width
const sidebarSpring: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 35,
}

const sidebarVariants: Variants = {
  expanded: {
    width: 'var(--sidebar-width)',
    transition: sidebarSpring,
  },
  collapsed: {
    width: 'var(--sidebar-width-collapsed)',
    transition: sidebarSpring,
  },
}

export const AnimatedSidebar: React.FC<AnimatedSidebarProps> = ({
  navigation,
}) => {
  const { isExpanded, toggleSidebar } = useSidebarContext()

  return (
    <motion.aside
      variants={sidebarVariants}
      initial={false}
      animate={isExpanded ? 'expanded' : 'collapsed'}
      className={cn(
        'bg-background-secondary relative flex h-screen flex-col border-r',
        'border-border',
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Header */}
      <div className="h-header-height border-border px-surface-padding flex items-center justify-between border-b">
        {isExpanded && (
          <motion.div
            initial={false}
            animate={{ opacity: isExpanded ? 1 : 0 }}
            className="flex items-center gap-2 overflow-hidden"
          >
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <span className="text-primary-foreground text-sm font-bold">
                AW
              </span>
            </div>
          </motion.div>
        )}

        {/* Toggle button */}
        <motion.button
          onClick={toggleSidebar}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
            'text-sidebar-icon hover:bg-sidebar-hover hover:text-sidebar-text-active',
            'focus-visible:ring-primary focus:outline-none focus-visible:ring-2',
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
      <nav className="scrollbar-thin p-surface-padding flex-1 overflow-x-hidden overflow-y-auto">
        <div role="tree" aria-label="Navigation tree">
          {isExpanded
            ? navigation.map((node) => <TreeItem key={node.id} node={node} />)
            : navigation.map((node) => (
                <TreePopover key={node.id} node={node} />
              ))}
        </div>
      </nav>

      <div className="border-sidebar-border p-surface-padding h-header-height flex items-center justify-center border-t">
        <SidebarFooter />
      </div>
    </motion.aside>
  )
}
