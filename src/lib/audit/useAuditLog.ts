'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/app/context/AuthContext'
import { useOrganization } from '@/app/context/OrganizationContext'
import type { AuditLogEntry, AuditAction } from '@/types'

interface UseAuditLogOptions {
  entity?: string
  entityId?: string
  limit?: number
}

interface UseAuditLogReturn {
  entries: AuditLogEntry[]
  loading: boolean
  refresh: () => void
}

/**
 * useAuditLog
 * Reads audit log entries for the current organization.
 * Returns empty array in demo mode.
 *
 * @example
 * const { entries } = useAuditLog({ entity: 'lead', limit: 20 })
 */
export function useAuditLog(options: UseAuditLogOptions = {}): UseAuditLogReturn {
  const { isDemoMode } = useAuth()
  const { organization } = useOrganization()
  const [entries, setEntries] = useState<AuditLogEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [tick, setTick] = useState(0)

  const refresh = useCallback(() => setTick((t) => t + 1), [])

  useEffect(() => {
    if (isDemoMode || !organization?.id) return

    setLoading(true)
    const supabase = createClient()

    let query = supabase
      .from('audit_logs')
      .select('*')
      .eq('organization_id', organization.id)
      .order('created_at', { ascending: false })
      .limit(options.limit ?? 100)

    if (options.entity) query = query.eq('entity', options.entity)
    if (options.entityId) query = query.eq('entity_id', options.entityId)

    query.then(({ data, error }) => {
      if (!error && data) {
        setEntries(
          data.map((e) => ({
            id: e.id,
            organizationId: e.organization_id,
            userId: e.user_id,
            action: e.action as AuditAction,
            entity: e.entity,
            entityId: e.entity_id,
            metadata: (e.metadata as Record<string, unknown>) ?? {},
            createdAt: e.created_at,
          }))
        )
      }
      setLoading(false)
    })
  }, [organization?.id, isDemoMode, options.entity, options.entityId, options.limit, tick])

  return { entries, loading, refresh }
}
