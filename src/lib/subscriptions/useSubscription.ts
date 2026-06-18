'use client'

import { useOrganization } from '@/app/context/OrganizationContext'
import { getLimits, planMeetsRequirement } from './plans'
import type { SubscriptionPlan, PlanLimits } from '@/types'

interface UseSubscriptionReturn {
  plan: SubscriptionPlan
  limits: PlanLimits
  isOnPlan: (required: SubscriptionPlan) => boolean
  canUseFeature: (feature: keyof PlanLimits) => boolean
}

/**
 * useSubscription
 * Returns the current org's subscription plan and helpers.
 *
 * @example
 * const { plan, isOnPlan } = useSubscription()
 * if (!isOnPlan('pro')) return <UpgradePrompt />
 */
export function useSubscription(): UseSubscriptionReturn {
  const { organization } = useOrganization()
  const plan: SubscriptionPlan = organization?.plan ?? 'free'
  const limits = getLimits(plan)

  const isOnPlan = (required: SubscriptionPlan) =>
    planMeetsRequirement(plan, required)

  const canUseFeature = (feature: keyof PlanLimits): boolean => {
    const value = limits[feature]
    if (typeof value === 'boolean') return value
    if (typeof value === 'number') return value > 0
    return false
  }

  return { plan, limits, isOnPlan, canUseFeature }
}
