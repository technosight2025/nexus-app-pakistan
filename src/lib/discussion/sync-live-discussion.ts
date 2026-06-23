'use client'

import { createClient } from '@/lib/supabase/client'
import type { RealtimeChannel } from '@supabase/supabase-js'

// Registry to prevent duplicate channel subscriptions across component mounts
const activeChannels = new Map<string, RealtimeChannel>()

/**
 * syncLiveDiscussion
 * ------------------
 * Client-side initializer that establishes a Supabase Realtime channel for
 * the shared booking discussion thread. Enables optimistic UI rendering across
 * all connected parties — host, photographer, and admin console — without
 * requiring any manual refresh.
 *
 * Channel naming convention:  `discussion:${bookingId}`
 * Postgres table listened to:  `booking_discussions`
 *
 * Lifecycle:
 *  - Call once per booking view mount (e.g. in a useEffect).
 *  - Returns a cleanup function — call it on component unmount to avoid leaks.
 *  - Idempotent: calling again for the same bookingId reuses the existing channel.
 *
 * Usage example:
 * ```ts
 * useEffect(() => {
 *   const cleanup = syncLiveDiscussion(bookingId)
 *   return cleanup
 * }, [bookingId])
 * ```
 *
 * @param bookingId - UUID of the booking whose discussion to sync
 * @returns          Cleanup function — call on component unmount
 */
export function syncLiveDiscussion(bookingId: string): () => void {
  if (!bookingId) {
    console.error('[syncLiveDiscussion] bookingId is required')
    return () => {}
  }

  const channelKey = `discussion:${bookingId}`

  // Idempotency guard — don't double-subscribe for the same booking
  if (activeChannels.has(channelKey)) {
    console.info(`[syncLiveDiscussion] Channel "${channelKey}" already active. Reusing.`)
    return () => cleanupChannel(channelKey)
  }

  const supabase = createClient()

  const channel = supabase
    .channel(channelKey)

    // ── Listen to new messages inserted into booking_discussions ──────────
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'booking_discussions',
        filter: `booking_id=eq.${bookingId}`,
      },
      (payload) => {
        // Dispatch a custom DOM event that any UI component can listen to
        // This decouples the Realtime layer from React state management
        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('nexus:discussion:message', {
              detail: { bookingId, message: payload.new },
            })
          )
        }
      }
    )

    // ── Listen to message status updates (e.g. read receipts) ────────────
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'booking_discussions',
        filter: `booking_id=eq.${bookingId}`,
      },
      (payload) => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('nexus:discussion:updated', {
              detail: { bookingId, message: payload.new },
            })
          )
        }
      }
    )

    // ── Presence: track who is currently viewing the discussion ──────────
    .on('presence', { event: 'sync' }, () => {
      const state = channel.presenceState()
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('nexus:discussion:presence', {
            detail: { bookingId, state },
          })
        )
      }
    })

    .subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.info(`[syncLiveDiscussion] ✅ Realtime channel "${channelKey}" active.`)

        // Announce this client's presence in the discussion
        channel.track({
          online_at: new Date().toISOString(),
          booking_id: bookingId,
        })
      }

      if (status === 'CHANNEL_ERROR') {
        console.error(`[syncLiveDiscussion] ❌ Channel "${channelKey}" encountered an error.`)
      }

      if (status === 'TIMED_OUT') {
        console.warn(`[syncLiveDiscussion] ⏳ Channel "${channelKey}" timed out. Will auto-retry.`)
      }
    })

  activeChannels.set(channelKey, channel)

  // Return cleanup function for use in useEffect return
  return () => cleanupChannel(channelKey)
}

// ---------------------------------------------------------------------------
// Internal Helpers
// ---------------------------------------------------------------------------

async function cleanupChannel(channelKey: string): Promise<void> {
  const channel = activeChannels.get(channelKey)
  if (!channel) return

  const supabase = createClient()
  await supabase.removeChannel(channel)
  activeChannels.delete(channelKey)
  console.info(`[syncLiveDiscussion] 🔌 Channel "${channelKey}" removed.`)
}
