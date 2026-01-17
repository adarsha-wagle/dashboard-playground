import type { ITreeNode } from '@/components/layouts/authenticated/sidebar/types'
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  BarChart3,
  MessageSquare,
  HelpCircle,
  Shield,
  Palette,
  Database,
  Webhook,
  CreditCard,
  LogInIcon,
} from 'lucide-react'

export const navigationData: ITreeNode[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    to: '/dashboard',
  },
  {
    id: 'components',
    label: 'Components',
    icon: FolderKanban,
    children: [
      {
        id: 'components-table',
        label: 'Server Side Table',
        to: '/components/table',
      },
      {
        id: 'components-server-autocomplete',
        label: 'Server Side Autocomplete',
        to: '/components/server-autocomplete',
      },
      {
        id: 'components-input-fields',
        label: 'Form Fields',
        to: '/components/input-fields',
      },
      {
        id: 'components-text-editor',
        label: 'Text Editor',
        to: '/components/text-editor',
      },
    ],
  },

  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    children: [
      {
        id: 'analytics-piechart',
        label: 'Pie Chart',
        to: '/analytics/pie-chart',
      },
      {
        id: 'analytics-areachart',
        label: 'Area Chart',
        to: '/analytics/area-chart',
      },
      {
        id: 'analytics-linechart',
        label: 'Line Chart',
        to: '/analytics/line-chart',
      },
      {
        id: 'analytics-bargraph',
        label: 'Bar Graph',
        to: '/analytics/bar-chart',
      },
      {
        id: 'analytics-composedchart',
        label: 'Composed Chart',
        to: '/analytics/composed-chart',
      },
      {
        id: 'analytics-scatterchart',
        label: 'Scatter Chart',
        to: '/analytics/scatter-chart',
      },
      {
        id: 'analytics-radarchart',
        label: 'Radar Chart',
        to: '/analytics/radar-chart',
      },
    ],
  },

  {
    id: 'messages',
    label: 'Messages',
    icon: MessageSquare,
    badge: 5,
    to: '/messages',
  },

  {
    id: 'auth',
    label: 'Authentication',
    icon: LogInIcon,
    children: [
      {
        id: 'auth-login',
        label: 'Login',
        to: '/dashboard-auth/login',
      },
      {
        id: 'auth-signup',
        label: 'Sign-up',
        to: '/dashboard-auth/register',
      },
      {
        id: 'auth-implementation',
        label: 'ImplementationDetails',
        to: '/dashboard-auth/implementation',
      },
    ],
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
    id: 'setup',
    label: 'Help & Support',
    icon: HelpCircle,
    to: '/setup',
  },
]
