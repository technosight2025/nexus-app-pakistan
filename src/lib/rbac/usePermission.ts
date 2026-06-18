'use client'

import { useAuth } from '@/app/context/AuthContext'
import { hasPermission, type Permission, type Role } from './roles'
import { UserRole } from '@/types'

/**
 * usePermission
 * Returns whether the current user has the given permission.
 * Falls back to `true` in demo mode so all UI is accessible.
 *
 * @example
 * const canCreate = usePermission('leads:create')
 */
export function usePermission(permission: Permission): boolean {
  const { profile, isDemoMode } = useAuth()

  // In demo mode, grant everything
  if (isDemoMode) return true

  if (!profile?.role) return false

  return hasPermission(profile.role as Role, permission)
}

/**
 * usePermissions
 * Returns a checker function for multiple permissions.
 *
 * @example
 * const { can } = usePermissions()
 * if (can('leads:create')) { ... }
 */
export function usePermissions() {
  const { profile, isDemoMode } = useAuth()

  const can = (permission: Permission): boolean => {
    if (isDemoMode) return true
    if (!profile?.role) return false
    return hasPermission(profile.role as Role, permission)
  }

  const canAny = (...permissions: Permission[]): boolean =>
    permissions.some(can)

  const canAll = (...permissions: Permission[]): boolean =>
    permissions.every(can)

  return { can, canAny, canAll }
}
