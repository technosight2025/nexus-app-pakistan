import { Home, Calendar, Users, Target, CheckSquare, MessageSquare, LayoutGrid, Settings, FileText, Scale, Package, type LucideIcon } from 'lucide-react';

export type RoleId = 'super_admin' | 'owner' | 'manager' | 'staff' | 'customer';
export type ModuleId = 'crm' | 'venue_management' | 'media_studio' | 'memories' | 'displays';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  requiredRoles?: RoleId[];
  requiredModules?: ModuleId[];
  children?: NavItem[];
}

export const DASHBOARD_NAV: NavItem[] = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'CRM Pipeline',
    href: '/dashboard/crm',
    icon: Target,
    requiredModules: ['crm'],
  },
  {
    title: 'Calendar',
    href: '/dashboard/calendar',
    icon: Calendar,
  },
  {
    title: 'Venue Management',
    href: '/dashboard/venues',
    icon: Calendar,
    requiredModules: ['venue_management'],
  },
  {
    title: 'Media Studio',
    href: '/dashboard/studio',
    icon: LayoutGrid,
    requiredModules: ['media_studio'],
  },
  {
    title: 'Contacts',
    href: '/dashboard/contacts',
    icon: Users,
  },
  {
    title: 'Tasks',
    href: '/dashboard/tasks',
    icon: CheckSquare,
  },
  {
    title: 'Messages',
    href: '/dashboard/messages',
    icon: MessageSquare,
  },
  {
    title: 'Sales',
    href: '/dashboard/sales',
    icon: FileText,
  },
  {
    title: 'Accounting',
    href: '/dashboard/accounting',
    icon: Scale,
  },
  {
    title: 'Products & Services',
    href: '/dashboard/products',
    icon: Package,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    requiredRoles: ['owner', 'super_admin', 'manager'],
  }
];

export const MOBILE_BOTTOM_NAV = [
  { title: 'Home', href: '/dashboard', icon: Home },
  { title: 'CRM', href: '/dashboard/crm', icon: Target },
  { title: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
  { title: 'Sales', href: '/dashboard/sales', icon: FileText },
  { title: 'Settings', href: '/dashboard/settings', icon: Settings },
];
