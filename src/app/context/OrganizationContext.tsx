'use client'

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from './AuthContext'
import type { Organization, SubscriptionPlan } from '@/types'

// ─── Mock ─────────────────────────────────────────────────────────────────────
const MOCK_ORGANIZATION: Organization = {
  id: 'zardozi-mock-001',
  name: 'Zardozi Lehnga Boutique',
  slug: 'zardozi-boutique',
  type: 'vendor',
  logoUrl: null,
  plan: 'pro',
  settings: {},
  createdAt: new Date().toISOString(),
}

// ─── Types ────────────────────────────────────────────────────────────────────
export interface OrganizationContextType {
  organization: Organization | null
  loading: boolean
  refreshOrganization: () => Promise<void>
}

// ─── Context ──────────────────────────────────────────────────────────────────
const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined)

// ─── Provider ─────────────────────────────────────────────────────────────────
export function OrganizationProvider({ children }: { children: ReactNode }) {
  const { profile, isDemoMode } = useAuth()
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchOrganization = useCallback(async () => {
    if (isDemoMode) {
      setOrganization(MOCK_ORGANIZATION)
      setLoading(false)
      return
    }

    if (!profile?.organizationId) {
      setOrganization(null)
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', profile.organizationId)
        .single()

      if (error) throw error

      setOrganization({
        id: data.id,
        name: data.name,
        slug: data.slug,
        type: data.type,
        logoUrl: data.logo_url,
        plan: data.plan as SubscriptionPlan,
        settings: (data.settings as Record<string, unknown>) ?? {},
        createdAt: data.created_at,
      })
    } catch {
      setOrganization(null)
    } finally {
      setLoading(false)
    }
  }, [profile?.organizationId, isDemoMode])

  const refreshOrganization = useCallback(async () => {
    setLoading(true)
    await fetchOrganization()
  }, [fetchOrganization])

  useEffect(() => {
    fetchOrganization()
  }, [fetchOrganization])

  return (
    <OrganizationContext.Provider value={{ organization, loading, refreshOrganization }}>
      {children}
    </OrganizationContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useOrganization(): OrganizationContextType {
  const ctx = useContext(OrganizationContext)
  if (!ctx) throw new Error('useOrganization must be used within an OrganizationProvider')
  return ctx
}
