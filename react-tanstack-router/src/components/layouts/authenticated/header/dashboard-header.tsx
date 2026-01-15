import React from 'react'
import { motion } from 'framer-motion'
import { Search, Bell, Settings, HelpCircle, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface DashboardHeaderProps {
  title?: string
  subtitle?: string
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title = 'Dashboard',
  subtitle,
}) => {
  return (
    <header className="sticky top-0 z-30 flex h-(--sidebar-header-height) p-(--sidebar-padding) items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur supports-backdrop-filter:bg-background/60  ">
      {/* Left section - Title */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Center section - Search */}
      <div className="hidden flex-1 justify-center px-8 md:flex">
        <motion.div
          className="relative w-full max-w-md"
          whileFocus={{ scale: 1.02 }}
        >
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search anything..."
            className={cn(
              'h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4',
              'text-sm placeholder:text-muted-foreground',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
              'hover:border-muted-foreground/50',
            )}
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 select-none rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block">
            ⌘K
          </kbd>
        </motion.div>
      </div>

      {/* Right section - Actions */}
      <div className="flex items-center gap-2">
        {/* Help button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-lg',
            'text-muted-foreground transition-colors',
            'hover:bg-accent hover:text-accent-foreground',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          )}
          aria-label="Help"
        >
          <HelpCircle className="h-5 w-5" />
        </motion.button>

        {/* Settings button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-lg',
            'text-muted-foreground transition-colors',
            'hover:bg-accent hover:text-accent-foreground',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          )}
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
        </motion.button>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'relative flex h-9 w-9 items-center justify-center rounded-lg',
            'text-muted-foreground transition-colors',
            'hover:bg-accent hover:text-accent-foreground',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          )}
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
        </motion.button>

        {/* Divider */}
        <div className="mx-2 h-6 w-px bg-border" />

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'flex items-center gap-2 rounded-lg p-1.5 pr-2',
                'transition-colors hover:bg-accent',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              )}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left md:block">
                <p className="text-sm font-medium text-foreground">John Doe</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
              <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">
                  john@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Billing</span>
              <Badge variant="secondary" className="ml-auto text-xs">
                Pro
              </Badge>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
