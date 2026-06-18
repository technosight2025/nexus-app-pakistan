'use client'

import type { ReactNode } from 'react'
import { useFeatureFlag } from '@/lib/flags/useFeatureFlag'
import type { FeatureFlagKey } from '@/lib/flags/featureFlags'

interface FeatureFlagProps {
  flag: FeatureFlagKey
  children: ReactNode
  fallback?: ReactNode
}

/**
 * FeatureFlag
 * Renders children only when the named feature flag is enabled.
 *
 * @example
 * <FeatureFlag flag="ai_assistant">
 *   <AIAssistantButton />
 * </FeatureFlag>
 */
export function FeatureFlag({ flag, children, fallback = null }: FeatureFlagProps) {
  const enabled = useFeatureFlag(flag)
  return enabled ? <>{children}</> : <>{fallback}</>
}
