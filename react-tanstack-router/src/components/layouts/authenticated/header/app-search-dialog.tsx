import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useMemo, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import type { ITreeNode } from '../sidebar/types'
import { navigationData } from '@/config/sidebar'
import { ArrowRight, ChevronDown, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface SearchResult {
  id: string
  label: string
  path: string[]
  icon?: any
  to?: string
  badge?: number
}

const flattenNavigationData = (
  data: ITreeNode[],
  path: string[] = [],
): SearchResult[] => {
  const results: SearchResult[] = []

  data.forEach((item) => {
    const currentPath = [...path, item.label]

    if (item.to) {
      results.push({
        id: item.id,
        label: item.label,
        path: currentPath,
        icon: item.icon,
        to: item.to,
      })
    }

    if (item.children) {
      results.push(...flattenNavigationData(item.children, currentPath))
    }
  })

  return results
}

export const AppSearchDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const allPages = useMemo(() => flattenNavigationData(navigationData), [])

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return allPages

    const query = searchQuery.toLowerCase()
    return allPages.filter(
      (page) =>
        page.label.toLowerCase().includes(query) ||
        page.path.some((p) => p.toLowerCase().includes(query)),
    )
  }, [searchQuery, allPages])

  useEffect(() => {
    setSelectedIndex(0)
  }, [searchQuery])

  useEffect(() => {
    if (!open) {
      setSearchQuery('')
      setSelectedIndex(0)
    }
  }, [open])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % filteredResults.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(
        (prev) => (prev - 1 + filteredResults.length) % filteredResults.length,
      )
    } else if (e.key === 'Enter' && filteredResults[selectedIndex]) {
      handleResultClick(filteredResults[selectedIndex])
    }
  }

  const handleResultClick = (result: SearchResult) => {
    console.log('Navigate to:', result.to)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl gap-0 overflow-hidden p-0">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center border-b px-4 py-3">
            <Search className="text-muted-foreground mr-3 h-5 w-5" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search pages, components, analytics..."
              className="border-0 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
              autoFocus
            />
            <kbd className="bg-muted text-muted-foreground ml-2 hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium select-none sm:inline-flex">
              ESC
            </kbd>
          </div>

          <div className="max-h-[400px] overflow-y-auto p-2">
            {filteredResults.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 text-center"
              >
                <p className="text-muted-foreground text-sm">
                  No results found
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Try searching for something else
                </p>
              </motion.div>
            ) : (
              <div className="space-y-1">
                <AnimatePresence mode="popLayout">
                  {filteredResults.map((result, index) => {
                    const Icon = result.icon
                    return (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.15, delay: index * 0.02 }}
                        onClick={() => handleResultClick(result)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={cn(
                          'flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-all',
                          'hover:bg-accent group',
                          selectedIndex === index && 'bg-accent',
                        )}
                      >
                        {Icon && (
                          <div
                            className={cn(
                              'flex h-9 w-9 items-center justify-center rounded-md transition-colors',
                              selectedIndex === index
                                ? 'bg-primary/10 text-primary'
                                : 'bg-muted text-muted-foreground',
                            )}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-sm font-medium">
                              {result.label}
                            </p>
                            {result.badge && (
                              <Badge
                                variant="secondary"
                                className="h-5 text-xs"
                              >
                                {result.badge}
                              </Badge>
                            )}
                          </div>
                          <div className="text-muted-foreground mt-0.5 flex items-center gap-1 text-xs">
                            {result.path.slice(0, -1).map((pathItem, idx) => (
                              <React.Fragment key={idx}>
                                <span>{pathItem}</span>
                                {idx < result.path.length - 2 && (
                                  <ChevronDown className="h-3 w-3 rotate-[-90deg]" />
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{
                            opacity: selectedIndex === index ? 1 : 0,
                            x: selectedIndex === index ? 0 : -10,
                          }}
                          transition={{ duration: 0.15 }}
                        >
                          <ArrowRight className="text-muted-foreground h-4 w-4" />
                        </motion.div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="bg-muted/50 border-t px-4 py-2">
            <div className="text-muted-foreground flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="bg-background inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] select-none">
                    ↑↓
                  </kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="bg-background inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] select-none">
                    ↵
                  </kbd>
                  Select
                </span>
              </div>
              <span>{filteredResults.length} results</span>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
