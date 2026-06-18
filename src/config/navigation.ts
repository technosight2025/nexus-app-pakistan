import { Role, Permission } from '@/lib/rbac/roles';
import { Home, Users, Building2, CalendarDays, Settings, Image as ImageIcon, Monitor, Search } from 'lucide-react';

export type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  allowedRoles?: Role[];
  requiredPermissions?: Permission[];
  requiredModule?: string;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export const DASHBOARD_NAVIGATION: NavGroup[] = [
  {
    title: 'Core',
    items: [
      {
        title: 'Home',
        href: '/dashboard',
        icon: Home,
      },
      {
        title: 'Events',
        href: '/dashboard/events',
        icon: CalendarDays,
        allowedRoles: ['super_admin', 'owner', 'manager', 'staff'],
      },
    ],
  },
  {
    title: 'CRM',
    items: [
      {
        title: 'Leads',
        href: '/dashboard/crm/leads',
        icon: Search,
        allowedRoles: ['super_admin', 'owner', 'manager'],
        requiredModule: 'crm',
      },
      {
        title: 'Contacts',
        href: '/dashboard/contacts',
        icon: Users,
        allowedRoles: ['super_admin', 'owner', 'manager', 'staff'],
        requiredModule: 'crm',
      },
    ],
  },
  {
    title: 'Platform Apps',
    items: [
      {
        title: 'Venue Management',
        href: '/dashboard/venues',
        icon: Building2,
        requiredModule: 'venue_management',
        allowedRoles: ['super_admin', 'owner', 'manager'],
      },
      {
        title: 'Memories',
        href: '/dashboard/memories',
        icon: ImageIcon,
        requiredModule: 'memories',
      },
      {
        title: 'Displays',
        href: '/dashboard/displays',
        icon: Monitor,
        requiredModule: 'displays',
      },
    ],
  },
  {
    title: 'Administration',
    items: [
      {
        title: 'Settings',
        href: '/dashboard/settings',
        icon: Settings,
        allowedRoles: ['super_admin', 'owner'],
        requiredPermissions: ['manage_settings'],
      },
    ],
  },
];
