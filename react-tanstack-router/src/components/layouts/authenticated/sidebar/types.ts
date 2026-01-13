import { type LucideIcon } from 'lucide-react'

export interface TreeNode {
  id: string
  label: string
  icon?: LucideIcon
  href?: string
  children?: TreeNode[]
  badge?: string | number
}

export interface SidebarContextType {
  isExpanded: boolean
  toggleSidebar: () => void
  activeItemId: string | null
  setActiveItemId: (id: string | null) => void
}
