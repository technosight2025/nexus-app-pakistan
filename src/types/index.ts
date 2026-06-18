// ─────────────────────────────────────────────────────────────────────────────
// NEXUS — Unified Domain Types
// Single source of truth for all business-layer types used across the app.
// These are derived from / compatible with the Database types in supabase.ts
// ─────────────────────────────────────────────────────────────────────────────

// We define these types directly since they are missing from the generated supabase.ts
export type OrgType = 'venue' | 'vendor' | 'studio' | 'planner' | 'caterer';
export type UserRole = 'owner' | 'admin' | 'manager' | 'staff';
export type SubscriptionPlan = 'free' | 'starter' | 'basic' | 'pro' | 'premium' | 'enterprise';
export type SubscriptionStatus = 'active' | 'past_due' | 'canceled' | 'trialing';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'won' | 'lost';
export type NotificationType = 'lead' | 'message' | 'system' | 'payment';
export type AuditAction = 'create' | 'update' | 'delete' | 'login';

// ─── Organization ─────────────────────────────────────────────────────────────
export interface Organization {
  id: string
  name: string
  slug: string
  type: OrgType
  logoUrl: string | null
  plan: SubscriptionPlan
  settings: Record<string, unknown>
  createdAt: string
}

// ─── User Profile ─────────────────────────────────────────────────────────────
export interface UserProfile {
  id: string
  organizationId: string | null
  role: UserRole
  fullName: string | null
  email: string | null
  avatarUrl: string | null
  isActive: boolean
}

// ─── Subscription ─────────────────────────────────────────────────────────────
export interface Subscription {
  id: string
  organizationId: string
  plan: SubscriptionPlan
  status: SubscriptionStatus
  trialEndsAt: string | null
  currentPeriodEnd: string | null
}

// ─── Notification ─────────────────────────────────────────────────────────────
export interface Notification {
  id: string
  organizationId: string
  userId: string
  type: NotificationType
  title: string
  body: string | null
  link: string | null
  read: boolean
  metadata: Record<string, unknown>
  createdAt: string
}

// ─── Audit Log Entry ──────────────────────────────────────────────────────────
export interface AuditLogEntry {
  id: string
  organizationId: string
  userId: string | null
  action: AuditAction
  entity: string
  entityId: string | null
  metadata: Record<string, unknown>
  createdAt: string
}

// ─── Module ───────────────────────────────────────────────────────────────────
export interface ModuleActivation {
  organizationId: string
  moduleId: string
  isActive: boolean
  activatedAt: string
  settings: Record<string, unknown>
}

// ─── Feature Flag ─────────────────────────────────────────────────────────────
export interface FeatureFlag {
  key: string
  name: string
  value: boolean
}

// ─── Plan Limits ──────────────────────────────────────────────────────────────
export interface PlanLimits {
  maxUsers: number
  maxModules: number
  maxStorageGB: number
  hasCustomBranding: boolean
  hasApiAccess: boolean
  hasPrioritySupport: boolean
  hasAuditLogs: boolean
  hasAdvancedReports: boolean
}
