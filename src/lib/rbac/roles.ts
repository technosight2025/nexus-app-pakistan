export type Role =
  | 'super_admin'
  | 'owner'
  | 'manager'
  | 'staff'
  | 'customer'
  | 'freelancer';

export type Permission =
  | 'view_bookings'
  | 'edit_bookings'
  | 'create_quotes'
  | 'manage_staff'
  | 'manage_modules'
  | 'view_analytics'
  | 'manage_settings';

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  super_admin: [
    'view_bookings',
    'edit_bookings',
    'create_quotes',
    'manage_staff',
    'manage_modules',
    'view_analytics',
    'manage_settings',
  ],
  owner: [
    'view_bookings',
    'edit_bookings',
    'create_quotes',
    'manage_staff',
    'manage_modules',
    'view_analytics',
    'manage_settings',
  ],
  manager: [
    'view_bookings',
    'edit_bookings',
    'create_quotes',
    'manage_staff',
    'view_analytics',
  ],
  staff: [
    'view_bookings',
  ],
  customer: [
    'view_bookings',
  ],
  freelancer: [
    'view_bookings',
    'edit_bookings',
  ],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}
