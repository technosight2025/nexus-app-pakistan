'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/app/context/AuthContext'
import { useOrganization } from '@/app/context/OrganizationContext'
import type { ModuleActivation } from '@/types'

// Default modules active in demo mode
const DEMO_ACTIVE_MODULE_IDS = [
  'leads', 'payments', 'nexus-apps', 'projects',
  'equipment', 'team-schedule', 'photo-selection',
  'video-review', 'delivery',
]

interface UseModulesReturn {
  activeModuleIds: string[]
  isModuleActive: (moduleId: string) => boolean
  activateModule: (moduleId: string) => Promise<void>
  deactivateModule: (moduleId: string) => Promise<void>
  loading: boolean
}

/**
 * useModules
 * Returns the list of active module IDs for the current organization.
 * Reads from Supabase `module_activations` table with demo fallback.
 */
export function useModules(): UseModulesReturn {
  const { profile, isDemoMode } = useAuth()
  const { organization } = useOrganization()
  const [activeModuleIds, setActiveModuleIds] = useState<string[]>(
    isDemoMode ? DEMO_ACTIVE_MODULE_IDS : []
  )
  const [loading, setLoading] = useState(!isDemoMode)

  const fetchModules = useCallback(async () => {
    if (isDemoMode || !organization?.id) {
      setLoading(false)
      return
    }
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('module_activations')
        .select('module_id')
        .eq('organization_id', organization.id)
        .eq('is_active', true)

      if (error) throw error
      setActiveModuleIds(data.map((m: { module_id: string }) => m.module_id))
    } catch {
      setActiveModuleIds([])
    } finally {
      setLoading(false)
    }
  }, [organization?.id, isDemoMode])

  useEffect(() => {
    fetchModules()
  }, [fetchModules])

  const activateModule = useCallback(async (moduleId: string) => {
    if (isDemoMode) {
      setActiveModuleIds((prev) => [...new Set([...prev, moduleId])])
      return
    }
    if (!organization?.id || !profile?.id) return

    const supabase = createClient()
    await supabase.from('module_activations').upsert({
      organization_id: organization.id,
      module_id: moduleId,
      is_active: true,
      activated_by: profile.id,
      activated_at: new Date().toISOString(),
    })
    setActiveModuleIds((prev) => [...new Set([...prev, moduleId])])
  }, [organization?.id, profile?.id, isDemoMode])

  const deactivateModule = useCallback(async (moduleId: string) => {
    if (isDemoMode) {
      setActiveModuleIds((prev) => prev.filter((id) => id !== moduleId))
      return
    }
    if (!organization?.id) return

    const supabase = createClient()
    await supabase
      .from('module_activations')
      .update({ is_active: false, deactivated_at: new Date().toISOString() })
      .eq('organization_id', organization.id)
      .eq('module_id', moduleId)

    setActiveModuleIds((prev) => prev.filter((id) => id !== moduleId))
  }, [organization?.id, isDemoMode])

  const isModuleActive = useCallback(
    (moduleId: string) => activeModuleIds.includes(moduleId),
    [activeModuleIds]
  )

  return { activeModuleIds, isModuleActive, activateModule, deactivateModule, loading }
}
