'use client'

import type { ReactNode } from 'react'
import { usePermission } from '@/lib/rbac/usePermission'
import type { Permission } from '@/lib/rbac/roles'

interface RequirePermissionProps {
  permission: Permission
  children: ReactNode
  /** Rendered when the user does NOT have the permission. Defaults to null. */
  fallback?: ReactNode
}

/**
 * RequirePermission
 * Conditionally renders children based on the current user's permissions.
 *
 * @example
 * <RequirePermission permission="leads:create">
 *   <AddLeadButton />
 * </RequirePermission>
 *
 * @example With fallback
 * <RequirePermission permission="settings:edit" fallback={<ReadOnlyBadge />}>
 *   <EditSettingsForm />
 * </RequirePermission>
 */
export function RequirePermission({ permission, children, fallback = null }: RequirePermissionProps) {
  const hasPermission = usePermission(permission)
  return hasPermission ? <>{children}</> : <>{fallback}</>
}
