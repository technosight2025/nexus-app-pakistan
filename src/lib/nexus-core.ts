/**
 * Nexus Core Functional Routines
 * ==============================
 * Central re-export barrel for all production-grade utility functions
 * defined in the Developer Technical Competency Sheet (skills.md).
 *
 * Import from this file for clean, single-path usage:
 *
 * @example
 * import {
 *   checkDateConflict,
 *   updateMediaStatus,
 *   sendWhatsAppAlert,
 *   toggleAssetVault,
 *   syncLiveDiscussion,
 * } from '@/lib/nexus-core'
 *
 * Environment boundary notes:
 *  - checkDateConflict   → Server-only  (uses cookies/server client)
 *  - updateMediaStatus   → Server-only  (uses cookies/server client)
 *  - sendWhatsAppAlert   → Server-only  (uses process.env secrets)
 *  - toggleAssetVault    → Server-only  (uses cookies/server client)
 *  - syncLiveDiscussion  → Client-only  (uses browser Supabase client + 'use client')
 */

// A. Operational Functions
export { checkDateConflict } from './bookings/check-date-conflict'
export { updateMediaStatus } from './media/update-media-status'

// B. Communication & Delivery Functions
export { sendWhatsAppAlert } from './whatsapp/send-alert'
export { toggleAssetVault } from './assets/toggle-asset-vault'
export { syncLiveDiscussion } from './discussion/sync-live-discussion'
