import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useMemo, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { ITreeNode } from '../sidebar/types'
import { navigationData } from '@/config/sidebar'
import { ArrowRight, ChevronDown, Search, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Kbd } from '@/components/ui/kbd'
import { useRouter } from '@tanstack/react-router'

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

export const AppSearchDialog = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const router = useRouter()

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
    if (!open) {
      setSearchQuery('')
      setSelectedIndex(0)
    }
  }, [open])

  const handleResultClick = (result: SearchResult) => {
    setOpen(false)
    router.navigate({ to: result.to })
  }

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

  return (
    <Dialog open={open} onOpenChange={setOpen} morphing animation="morph">
      <DialogTrigger asChild>
        <InputGroup
          className="form-input w-full max-w-md shadow-xs"
          onClick={() => setOpen(true)}
        >
          <InputGroupInput placeholder="Search Anything" />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Kbd />
          </InputGroupAddon>
        </InputGroup>
      </DialogTrigger>
      <DialogContent className="w-full max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center border-b px-4 py-3">
            <InputGroup className="form-input w-full">
              <InputGroupInput
                placeholder="Search Anything"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <Kbd />
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="scrollbar-thin max-h-100 overflow-x-hidden overflow-y-auto p-2">
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
                              'flex size-8 items-center justify-center rounded-md transition-colors',
                              selectedIndex === index
                                ? 'bg-primary/10 text-primary'
                                : 'bg-muted text-muted-foreground',
                            )}
                          >
                            <Icon className="size-4" />
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
                                  <ChevronDown className="h-3 w-3 -rotate-90" />
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
        </motion.div>
        <DialogClose>
          <X className="size-5" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
