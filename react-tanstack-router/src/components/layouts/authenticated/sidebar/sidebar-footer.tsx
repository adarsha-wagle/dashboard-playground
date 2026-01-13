import { User, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSidebarContext } from './sidebar-context'

const SidebarFooter = () => {
  const { isExpanded } = useSidebarContext()

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
        <User className="h-4 w-4 text-primary" />
      </div>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 'auto' }}
          exit={{ opacity: 0, width: 0 }}
          className="flex flex-1 items-center justify-between overflow-hidden"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              John Doe
            </p>
            <p className="truncate text-xs text-muted-foreground">
              john@example.com
            </p>
          </div>
          <button
            className="ml-2 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-sidebar-hover hover:text-foreground"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </div>
  )
}

export { SidebarFooter }
