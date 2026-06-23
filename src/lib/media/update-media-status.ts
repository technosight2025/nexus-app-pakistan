import { createClient } from '@/lib/supabase/server'

type MediaStatus = 'approved' | 'rejected'

/**
 * updateMediaStatus
 * -----------------
 * Updates a specific media asset's approval status in the `media_assets` table
 * and broadcasts a real-time payload to both the host and admin dashboard
 * channels so they can reflect the state change without a full page reload.
 *
 * Real-time broadcast channel convention:
 *   `media:${mediaId}` — listened to by both host and admin UIs
 *
 * @param mediaId - UUID of the media asset node
 * @param status  - 'approved' | 'rejected'
 * @returns       - Promise<void> — throws on unrecoverable DB failure
 */
export async function updateMediaStatus(
  mediaId: string,
  status: MediaStatus
): Promise<void> {
  if (!mediaId || !status) {
    throw new Error('[updateMediaStatus] mediaId and status are required')
  }

  const supabase = await createClient()

  // 1. Persist the status change to the database
  const { error: updateError } = await supabase
    .from('media_assets')
    .update({
      status,
      reviewed_at: new Date().toISOString(),
    })
    .eq('id', mediaId)

  if (updateError) {
    console.error('[updateMediaStatus] DB update failed:', updateError.message, updateError.code)
    throw new Error(`Failed to update media status: ${updateError.message}`)
  }

  // 2. Broadcast real-time state change to connected clients
  // Both host and admin interfaces subscribe to this channel by mediaId
  const channel = supabase.channel(`media:${mediaId}`)

  const broadcastError = await channel.send({
    type: 'broadcast',
    event: 'status_changed',
    payload: {
      mediaId,
      status,
      timestamp: new Date().toISOString(),
    },
  })

  // Broadcast failure is non-fatal — DB write already succeeded
  if (broadcastError !== 'ok') {
    console.warn(
      `[updateMediaStatus] Realtime broadcast for media "${mediaId}" returned: ${broadcastError}. ` +
      'Connected clients may need to refresh manually.'
    )
  }

  // Cleanup: remove the ephemeral broadcast channel
  await supabase.removeChannel(channel)
}
