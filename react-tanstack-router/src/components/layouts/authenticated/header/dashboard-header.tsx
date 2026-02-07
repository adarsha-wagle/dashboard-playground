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

import SecondaryHeader from '../secondary-header'
import { AppSearchDialog } from './app-search-dialog'

export const DashboardHeader = () => {
  return (
    <header className="border-border bg-background-secondary h-header-height p-layout-padding sticky top-0 z-30 flex items-center justify-between border-b">
      {/* Left section - Title */}
      <div className="flex items-center gap-4">
        <SecondaryHeader title="Dashboard" description="Welcome back, John" />
      </div>

      {/* Center section - Search */}
      <div className="hidden flex-1 justify-center px-8 md:flex">
        <AppSearchDialog />
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
            'focus-visible:ring-ring focus:outline-none focus-visible:ring-2',
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
            'focus-visible:ring-ring focus:outline-none focus-visible:ring-2',
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
            'focus-visible:ring-ring focus:outline-none focus-visible:ring-2',
          )}
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
            <span className="bg-primary relative inline-flex h-2 w-2 rounded-full" />
          </span>
        </motion.button>

        {/* Divider */}
        <div className="bg-border mx-2 h-6 w-px" />

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'flex items-center gap-2 rounded-lg p-1.5 pr-2',
                'hover:bg-accent transition-colors',
                'focus-visible:ring-ring focus:outline-none focus-visible:ring-2',
              )}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left md:block">
                <p className="text-foreground text-sm font-medium">John Doe</p>
                <p className="text-muted-foreground text-xs">Admin</p>
              </div>
              <ChevronDown className="text-muted-foreground hidden h-4 w-4 md:block" />
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-muted-foreground text-xs">
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
