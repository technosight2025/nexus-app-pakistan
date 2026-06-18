'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useOrganization } from '@/app/context/OrganizationContext'
import { FLAG_DEFAULTS, type FeatureFlagKey } from './featureFlags'

// In-memory cache to avoid repeated DB reads per session
const flagCache = new Map<string, boolean>()

/**
 * useFeatureFlag
 * Returns the value of a feature flag for the current org.
 *
 * Resolution order:
 * 1. Org-level DB override (from `feature_flags` table)
 * 2. Default value from `FLAG_DEFAULTS`
 *
 * @example
 * const isAIEnabled = useFeatureFlag('ai_assistant')
 */
export function useFeatureFlag(flag: FeatureFlagKey): boolean {
  const { organization } = useOrganization()
  const cacheKey = `${organization?.id ?? 'global'}:${flag}`

  const [value, setValue] = useState<boolean>(() => {
    // Serve from cache immediately if available
    if (flagCache.has(cacheKey)) return flagCache.get(cacheKey)!
    return FLAG_DEFAULTS[flag] ?? false
  })

  useEffect(() => {
    const isDummy = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('dummy')
    if (isDummy || !organization?.id) return

    // Avoid duplicate fetches
    if (flagCache.has(cacheKey)) return

    const supabase = createClient()
    supabase
      .from('feature_flags')
      .select('override_value, default_value')
      .eq('key', flag)
      .or(`organization_id.eq.${organization.id},organization_id.is.null`)
      .order('organization_id', { ascending: false }) // org override first
      .limit(1)
      .single()
      .then(({ data }) => {
        if (!data) return
        const resolved = data.override_value ?? data.default_value ?? FLAG_DEFAULTS[flag]
        flagCache.set(cacheKey, resolved)
        setValue(resolved)
      })
  }, [flag, organization?.id, cacheKey])

  return value
}

/**
 * useFeatureFlags
 * Returns multiple flag values at once.
 *
 * @example
 * const { 'ai_assistant': aiEnabled, 'beta_dashboard': betaEnabled } = useFeatureFlags(['ai_assistant', 'beta_dashboard'])
 */
export function useFeatureFlags(flags: FeatureFlagKey[]): Record<FeatureFlagKey, boolean> {
  const results = flags.map((flag) => ({ flag, value: useFeatureFlag(flag) }))
  return Object.fromEntries(results.map(({ flag, value }) => [flag, value])) as Record<FeatureFlagKey, boolean>
}
