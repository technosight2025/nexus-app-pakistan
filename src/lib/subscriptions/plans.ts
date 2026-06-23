import type { SubscriptionPlan, PlanLimits } from '@/types'

// ─────────────────────────────────────────────────────────────────────────────
// Plan Definitions
// ─────────────────────────────────────────────────────────────────────────────
export const PLAN_NAMES: Record<SubscriptionPlan, string> = {
  free: 'Free',
  starter: 'Starter',
  basic: 'Basic',
  premium: 'Premium',
  pro: 'Pro',
  enterprise: 'Enterprise',
}

export const PLAN_LIMITS: Record<SubscriptionPlan, PlanLimits> = {
  free: {
    maxUsers: 2,
    maxModules: 3,
    maxStorageGB: 1,
    hasCustomBranding: false,
    hasApiAccess: false,
    hasPrioritySupport: false,
    hasAuditLogs: false,
  },
  starter: {
    maxUsers: 5,
    maxModules: 6,
    maxStorageGB: 10,
    hasCustomBranding: false,
    hasApiAccess: false,
    hasPrioritySupport: false,
    hasAuditLogs: false,

  },
  basic: {
    maxUsers: 10,
    maxModules: 10,
    maxStorageGB: 25,
    hasCustomBranding: false,
    hasApiAccess: false,
    hasPrioritySupport: true,
    hasAuditLogs: false,
  },
  premium: {
    maxUsers: 50,
    maxModules: 30,
    maxStorageGB: 250,
    hasCustomBranding: true,
    hasApiAccess: true,
    hasPrioritySupport: true,
    hasAuditLogs: true,

  },
  pro: {
    maxUsers: 25,
    maxModules: 20,
    maxStorageGB: 100,
    hasCustomBranding: true,
    hasApiAccess: true,
    hasPrioritySupport: true,
    hasAuditLogs: true,

  },
  enterprise: {
    maxUsers: Infinity,
    maxModules: Infinity,
    maxStorageGB: Infinity,
    hasCustomBranding: true,
    hasApiAccess: true,
    hasPrioritySupport: true,
    hasAuditLogs: true,

  },
}

// Plan hierarchy for comparisons
const PLAN_ORDER: SubscriptionPlan[] = ['free', 'starter', 'basic', 'pro', 'premium', 'enterprise']

/** Returns true if `plan` meets or exceeds `required` */
export function planMeetsRequirement(plan: SubscriptionPlan, required: SubscriptionPlan): boolean {
  return PLAN_ORDER.indexOf(plan) >= PLAN_ORDER.indexOf(required)
}

/** Get limits for a given plan */
export function getLimits(plan: SubscriptionPlan): PlanLimits {
  return PLAN_LIMITS[plan]
}
