import { createClient } from '@/lib/supabase/server'

/**
 * toggleAssetVault
 * ----------------
 * Server-side financial clearance switch that locks or unlocks the original
 * full-resolution asset files for a given booking inside Supabase Storage.
 *
 * Strategy:
 *  - Locking   (isLocked = true)  → moves asset paths under `vaulted/` prefix
 *    in the `booking_assets` table's `storage_path` column, which the storage
 *    RLS policy treats as inaccessible to non-admin roles.
 *  - Unlocking (isLocked = false) → restores paths to the `originals/` prefix,
 *    making them downloadable by the authorized host/photographer.
 *
 * NOTE: The actual file bytes are NOT moved in the bucket — only the metadata
 * path prefix tracked in the DB changes. Supabase RLS policies on the
 * `booking-assets` bucket enforce access based on the path prefix convention.
 *
 * Supabase bucket name: `booking-assets`
 * Vaulted prefix:       `vaulted/<bookingId>/`
 * Active prefix:        `originals/<bookingId>/`
 *
 * @param bookingId - UUID of the event booking
 * @param isLocked  - true = hide assets (vault), false = reveal assets
 * @returns         - Promise<void> — throws on DB failure
 */
export async function toggleAssetVault(
  bookingId: string,
  isLocked: boolean
): Promise<void> {
  if (!bookingId) {
    throw new Error('[toggleAssetVault] bookingId is required')
  }

  const supabase = await createClient()

  // 1. Update the vault lock flag on the booking record
  const { error: bookingUpdateError } = await supabase
    .from('event_bookings')
    .update({
      assets_locked: isLocked,
      assets_locked_at: isLocked ? new Date().toISOString() : null,
    })
    .eq('id', bookingId)

  if (bookingUpdateError) {
    console.error(
      '[toggleAssetVault] Failed to update event_bookings lock flag:',
      bookingUpdateError.message
    )
    throw new Error(`toggleAssetVault DB error: ${bookingUpdateError.message}`)
  }

  // 2. Bulk-update all asset records for this booking with the new path prefix
  // Fetch current asset paths
  const { data: assets, error: fetchError } = await supabase
    .from('booking_assets')
    .select('id, storage_path')
    .eq('booking_id', bookingId)

  if (fetchError) {
    console.error('[toggleAssetVault] Failed to fetch booking assets:', fetchError.message)
    throw new Error(`toggleAssetVault fetch error: ${fetchError.message}`)
  }

  if (!assets || assets.length === 0) {
    // No assets attached yet — vault flag is set, nothing else to do
    console.info(`[toggleAssetVault] Booking "${bookingId}" has no assets. Flag updated only.`)
    return
  }

  // Swap path prefix for each asset
  const sourcePrefix = isLocked ? `originals/${bookingId}/` : `vaulted/${bookingId}/`
  const targetPrefix = isLocked ? `vaulted/${bookingId}/` : `originals/${bookingId}/`

  const updates = assets
    .filter((a) => a.storage_path?.startsWith(sourcePrefix))
    .map((asset) => ({
      id: asset.id,
      storage_path: asset.storage_path.replace(sourcePrefix, targetPrefix),
    }))

  if (updates.length === 0) {
    console.info(
      `[toggleAssetVault] No assets needed path prefix migration for booking "${bookingId}".`
    )
    return
  }

  // Upsert updated paths back
  const { error: upsertError } = await supabase
    .from('booking_assets')
    .upsert(updates, { onConflict: 'id' })

  if (upsertError) {
    console.error('[toggleAssetVault] Failed to update asset paths:', upsertError.message)
    throw new Error(`toggleAssetVault upsert error: ${upsertError.message}`)
  }

  console.info(
    `[toggleAssetVault] Booking "${bookingId}" assets ${isLocked ? 'LOCKED 🔒' : 'UNLOCKED 🔓'}. ` +
    `${updates.length} asset(s) path-migrated.`
  )
}
