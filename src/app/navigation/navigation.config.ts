// src/app/navigation/navigation.config.ts
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  permissionKey?: string;
  children?: NavItem[];
}

export const navigationItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: null,
    permissionKey: "dashboard:read",
  },
  {
    label: "Vendors",
    href: "/dashboard/vendor",
    icon: null,
    permissionKey: "vendor:read",
    children: [
      { label: "Overview", href: "/dashboard/vendor", permissionKey: "vendor:overview" },
      { label: "Portfolio", href: "/dashboard/vendor/portfolio", permissionKey: "vendor:portfolio" },
      { label: "Packages", href: "/dashboard/vendor/packages", permissionKey: "vendor:packages" },
      { label: "Analytics", href: "/dashboard/vendor/analytics", permissionKey: "vendor:analytics" },
    ],
  },
  {
    label: "Settings",
    href: "/settings",
    icon: null,
    permissionKey: "settings:read",
  },
];
