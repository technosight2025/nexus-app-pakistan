'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/app/context/AuthContext'
import { useOrganization } from '@/app/context/OrganizationContext'
import type { Notification, NotificationType } from '@/types'

// ─── Mock notifications for demo mode ────────────────────────────────────────
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    organizationId: 'mock-org-001',
    userId: 'mock-user-001',
    type: 'lead',
    title: 'New Lead from Sarah Ahmed',
    body: 'Wedding event on Dec 15 for Grand Ballroom',
    link: '/dashboard/vendor/leads',
    read: false,
    metadata: {},
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    organizationId: 'mock-org-001',
    userId: 'mock-user-001',
    type: 'payment',
    title: 'Payment Received',
    body: 'PKR 250,000 advance received via Bank Transfer',
    link: '/dashboard/vendor/quotations',
    read: false,
    metadata: {},
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    organizationId: 'mock-org-001',
    userId: 'mock-user-001',
    type: 'message',
    title: 'New Message',
    body: "Kamran Ali: 'Is the hall available on 25th Dec?'",
    link: '/dashboard/vendor',
    read: true,
    metadata: {},
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
]

interface UseNotificationsReturn {
  notifications: Notification[]
  unreadCount: number
  loading: boolean
  markAsRead: (id: string) => Promise<void>
  markAllAsRead: () => Promise<void>
}

/**
 * useNotifications
 * Returns notifications for the current user with real-time updates.
 * Falls back to mock data in demo mode.
 */
export function useNotifications(): UseNotificationsReturn {
  const { profile, isDemoMode } = useAuth()
  const { organization } = useOrganization()
  const [notifications, setNotifications] = useState<Notification[]>(
    isDemoMode ? MOCK_NOTIFICATIONS : []
  )
  const [loading, setLoading] = useState(!isDemoMode)

  // Initial fetch
  useEffect(() => {
    if (isDemoMode || !profile?.id || !organization?.id) {
      setLoading(false)
      return
    }

    const supabase = createClient()

    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', profile.id)
        .eq('organization_id', organization.id)
        .order('created_at', { ascending: false })
        .limit(50)

      if (!error && data) {
        setNotifications(
          data.map((n) => ({
            id: n.id,
            organizationId: n.organization_id,
            userId: n.user_id,
            type: n.type as NotificationType,
            title: n.title,
            body: n.body,
            link: n.link,
            read: n.read,
            metadata: (n.metadata as Record<string, unknown>) ?? {},
            createdAt: n.created_at,
          }))
        )
      }
      setLoading(false)
    }

    fetchNotifications()

    // Real-time subscription
    const channel = supabase
      .channel(`notifications:${profile.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${profile.id}`,
        },
        (payload) => {
          const n = payload.new as Record<string, unknown>
          setNotifications((prev) => [
            {
              id: n.id as string,
              organizationId: n.organization_id as string,
              userId: n.user_id as string,
              type: n.type as NotificationType,
              title: n.title as string,
              body: n.body as string | null,
              link: n.link as string | null,
              read: false,
              metadata: (n.metadata as Record<string, unknown>) ?? {},
              createdAt: n.created_at as string,
            },
            ...prev,
          ])
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [profile?.id, organization?.id, isDemoMode])

  const markAsRead = useCallback(async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
    if (isDemoMode) return
    const supabase = createClient()
    await supabase.from('notifications').update({ read: true }).eq('id', id)
  }, [isDemoMode])

  const markAllAsRead = useCallback(async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    if (isDemoMode || !profile?.id) return
    const supabase = createClient()
    await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', profile.id)
      .eq('read', false)
  }, [isDemoMode, profile?.id])

  const unreadCount = notifications.filter((n) => !n.read).length

  return { notifications, unreadCount, loading, markAsRead, markAllAsRead }
}
