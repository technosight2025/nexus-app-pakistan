import { createClient } from '@/lib/supabase/client'
import type { AuditAction } from '@/types'

interface LogEventOptions {
  organizationId: string
  userId?: string
  action: AuditAction
  entity: string
  entityId?: string
  metadata?: Record<string, unknown>
}

/**
 * logAuditEvent
 * Writes a single audit log entry to the `audit_logs` table.
 * Silently no-ops when:
 * - Running in demo mode (dummy Supabase credentials)
 * - The DB call fails (never throws to avoid breaking user flows)
 *
 * @example
 * await logAuditEvent({
 *   organizationId: org.id,
 *   userId: user.id,
 *   action: 'create',
 *   entity: 'lead',
 *   entityId: lead.id,
 *   metadata: { clientName: lead.clientName },
 * })
 */
export async function logAuditEvent(options: LogEventOptions): Promise<void> {
  const isDummy = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('dummy')
  if (isDummy) return // No-op in demo mode

  try {
    const supabase = createClient()
    await supabase.from('audit_logs').insert({
      organization_id: options.organizationId,
      user_id: options.userId ?? null,
      action: options.action,
      entity: options.entity,
      entity_id: options.entityId ?? null,
      metadata: options.metadata ?? {},
      created_at: new Date().toISOString(),
    })
  } catch {
    // Audit logging must never break the user's primary action.
    // Errors are silently swallowed here.
    // In production, pipe to an error tracking service (e.g. Sentry).
    if (process.env.NODE_ENV === 'development') {
      console.warn('[AuditLog] Failed to write audit event:', options)
    }
  }
}

/**
 * withAuditLog
 * Higher-order helper: runs an async action and logs it on success.
 *
 * @example
 * await withAuditLog(
 *   () => supabase.from('leads').insert(data),
 *   { organizationId, userId, action: 'create', entity: 'lead' }
 * )
 */
export async function withAuditLog<T>(
  action: () => Promise<T>,
  logOptions: LogEventOptions
): Promise<T> {
  const result = await action()
  // Log after success (fire-and-forget)
  logAuditEvent(logOptions).catch(() => {})
  return result
}
