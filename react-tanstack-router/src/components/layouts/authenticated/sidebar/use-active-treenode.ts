import { useRouter } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import type { ITreeNode } from './types'

export const useActiveTreeNode = (nodes: ITreeNode[]) => {
  const router = useRouter()
  const [activeItemId, setActiveItemId] = useState<string | null>(null)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  // Find active node and its parent chain
  const findActive = (nodes: ITreeNode[], parents: string[] = []): boolean => {
    for (const node of nodes) {
      if (node.to === router.state.location.pathname) {
        setActiveItemId(node.id)
        // expand all parents
        setExpandedIds((prev) => new Set([...prev, ...parents]))
        return true
      }
      if (node.children && findActive(node.children, [...parents, node.id])) {
        return true
      }
    }
    return false
  }

  useEffect(() => {
    setExpandedIds(new Set()) // reset on route change
    findActive(nodes)
  }, [router.state.location.pathname, nodes])

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) newSet.delete(id)
      else newSet.add(id)
      return newSet
    })
  }

  const isExpanded = (id: string) => expandedIds.has(id)

  return { activeItemId, toggleExpand, isExpanded }
}
