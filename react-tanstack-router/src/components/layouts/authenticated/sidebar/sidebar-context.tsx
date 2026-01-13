import React, { createContext, useContext, useState, useCallback } from 'react'
import { type SidebarContextType } from './types'

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const useSidebarContext = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebarContext must be used within SidebarProvider')
  }
  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
  defaultExpanded?: boolean
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const [activeItemId, setActiveItemId] = useState<string | null>('dashboard')

  const toggleSidebar = useCallback(() => {
    setIsExpanded((prev) => !prev)
  }, [])

  return (
    <SidebarContext.Provider
      value={{ isExpanded, toggleSidebar, activeItemId, setActiveItemId }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
