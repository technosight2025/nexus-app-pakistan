'use client'

import type { ReactNode } from 'react'
import { useSubscription } from '@/lib/subscriptions/useSubscription'
import type { SubscriptionPlan } from '@/types'

interface RequirePlanProps {
  plan: SubscriptionPlan
  children: ReactNode
  fallback?: ReactNode
}

/**
 * RequirePlan
 * Renders children only if the current org's plan meets or exceeds `plan`.
 *
 * @example
 * <RequirePlan plan="pro" fallback={<UpgradeCard />}>
 *   <AdvancedAnalyticsModule />
 * </RequirePlan>
 */
export function RequirePlan({ plan, children, fallback = null }: RequirePlanProps) {
  const { isOnPlan } = useSubscription()
  return isOnPlan(plan) ? <>{children}</> : <>{fallback}</>
}
