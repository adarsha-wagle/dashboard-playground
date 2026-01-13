import {
  LayoutDashboard,
  Users,
  FolderKanban,
  FileText,
  Settings,
  BarChart3,
  MessageSquare,
  HelpCircle,
  Calendar,
  Mail,
  Bell,
  Shield,
  Palette,
  Database,
  Webhook,
  CreditCard,
} from 'lucide-react'
import { type TreeNode } from './types'

export const navigationData: TreeNode[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: FolderKanban,
    badge: 12,
    children: [
      {
        id: 'projects-active',
        label: 'Active Projects',
        badge: 8,
        children: [
          { id: 'project-alpha', label: 'Project Alpha' },
          { id: 'project-beta', label: 'Project Beta' },
          { id: 'project-gamma', label: 'Project Gamma' },
        ],
      },
      {
        id: 'projects-archived',
        label: 'Archived',
        badge: 4,
        children: [
          { id: 'project-old-1', label: 'Legacy System' },
          { id: 'project-old-2', label: 'V1 Migration' },
        ],
      },
      { id: 'projects-templates', label: 'Templates' },
    ],
  },
  {
    id: 'team',
    label: 'Team',
    icon: Users,
    children: [
      { id: 'team-members', label: 'Members', badge: 24 },
      { id: 'team-groups', label: 'Groups' },
      { id: 'team-roles', label: 'Roles & Permissions' },
      { id: 'team-invites', label: 'Pending Invites', badge: 3 },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    children: [
      { id: 'analytics-overview', label: 'Overview' },
      { id: 'analytics-reports', label: 'Reports' },
      { id: 'analytics-realtime', label: 'Real-time' },
      { id: 'analytics-exports', label: 'Exports' },
    ],
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: FileText,
    href: '/documents',
  },
  {
    id: 'calendar',
    label: 'Calendar',
    icon: Calendar,
    href: '/calendar',
  },
  {
    id: 'messages',
    label: 'Messages',
    icon: MessageSquare,
    badge: 5,
    href: '/messages',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    href: '/notifications',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    children: [
      {
        id: 'settings-general',
        label: 'General',
        icon: Settings,
      },
      {
        id: 'settings-appearance',
        label: 'Appearance',
        icon: Palette,
      },
      {
        id: 'settings-security',
        label: 'Security',
        icon: Shield,
        children: [
          { id: 'settings-2fa', label: 'Two-Factor Auth' },
          { id: 'settings-sessions', label: 'Active Sessions' },
          { id: 'settings-api-keys', label: 'API Keys' },
        ],
      },
      {
        id: 'settings-integrations',
        label: 'Integrations',
        icon: Webhook,
        children: [
          { id: 'settings-webhooks', label: 'Webhooks' },
          { id: 'settings-oauth', label: 'OAuth Apps' },
          { id: 'settings-database', label: 'Database', icon: Database },
        ],
      },
      {
        id: 'settings-billing',
        label: 'Billing',
        icon: CreditCard,
      },
    ],
  },
  {
    id: 'help',
    label: 'Help & Support',
    icon: HelpCircle,
    href: '/help',
  },
]
