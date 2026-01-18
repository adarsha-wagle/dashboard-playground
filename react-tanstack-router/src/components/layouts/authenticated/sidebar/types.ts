import type { LinkProps } from '@tanstack/react-router'
import { type LucideIcon } from 'lucide-react'

export interface ITreeNode {
  id: string
  label: string
  icon?: LucideIcon
  to?: LinkProps['to']
  children?: ITreeNode[]
  badge?: string | number
}
