import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react'
import { type ITreeNode } from './types'
import { useRouter } from '@tanstack/react-router'
import { navigationData } from '@/config/sidebar'

interface SidebarContextType {
  isExpanded: boolean
  toggleSidebar: () => void
  activeItemId: string | null
  setActiveItemId: (id: string | null) => void
  isNodeActive: (node: ITreeNode) => boolean
}

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
  const router = useRouter()

  const toggleSidebar = useCallback(() => {
    setIsExpanded((prev) => !prev)
  }, [])

  useEffect(() => {
    const findActiveNode = (nodes: ITreeNode[]): string | null => {
      for (const node of nodes) {
        if (node.to === router.state.location.pathname) return node.id
        if (node.children) {
          const child = findActiveNode(node.children)
          if (child) return child
        }
      }
      return null
    }

    const activeId = findActiveNode(navigationData)
    setActiveItemId(activeId)
  }, [])

  const isNodeActive = useCallback(
    (node: ITreeNode): boolean => {
      if (node.id === activeItemId) return true
      if (!node.children) return false
      return node.children.some(isNodeActive)
    },
    [activeItemId],
  )

  return (
    <SidebarContext.Provider
      value={{
        isExpanded,
        toggleSidebar,
        activeItemId,
        setActiveItemId,
        isNodeActive,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
