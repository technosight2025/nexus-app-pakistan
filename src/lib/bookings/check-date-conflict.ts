import { createClient } from '@/lib/supabase/server'

/**
 * checkDateConflict
 * -----------------
 * Validates whether a given date is already occupied for a specific venue
 * before a new row is inserted into `event_bookings`.
 *
 * Checks only active booking statuses ('confirmed', 'pending_venue') and
 * ignores cancelled or rejected records to avoid false positives.
 *
 * @param date     - ISO date string (YYYY-MM-DD)
 * @param venueId  - UUID of the venue being booked
 * @returns        - Promise<boolean>: true = conflict exists, false = slot is free
 */
export async function checkDateConflict(
  date: string,
  venueId: string
): Promise<boolean> {
  // Validate input shape before hitting the DB
  if (!date || !venueId) {
    console.error('[checkDateConflict] Missing required parameters: date or venueId')
    // Fail-safe: block booking if params are invalid
    return true
  }

  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!isoDateRegex.test(date)) {
    console.error(`[checkDateConflict] Invalid date format received: "${date}". Expected YYYY-MM-DD.`)
    return true
  }

  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('event_bookings')
      .select('id', { count: 'exact', head: true }) // head: true = count only, no rows returned
      .eq('venue_id', venueId)
      .eq('event_date', date)
      .in('order_status', ['confirmed', 'pending_venue'])

    if (error) {
      // Log but fail-safe (block) to prevent double bookings on DB errors
      console.error('[checkDateConflict] Supabase query error:', error.message, error.code)
      return true
    }

    const count = (data as unknown as { count: number } | null)?.count ?? 0
    return count > 0
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[checkDateConflict] Unexpected runtime error:', message)
    return true
  }
}
