"use server"

import { createClient } from "@/lib/supabase/server"

export async function getHostEvents() {
  const supabase = await createClient()
  
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { data: null, error: "Not authenticated" }

    const { data, error } = await supabase
      .from('host_events')
      .select('*')
      .eq('user_id', user.id)
      .order('start_date', { ascending: true })

    if (error) {
      console.error("Supabase Error (getHostEvents):", error.message)
      return { data: null, error: error.message }
    }

    return { data, error: null }
  } catch (error: any) {
    console.error("Failed to fetch host events:", error)
    return { data: null, error: "Internal Server Error" }
  }
}

export async function createHostEvent(eventData: {
  name: string
  event_type: string
  start_date: string
  end_date?: string
  guest_count_expected: number
  total_budget: number
}) {
  const supabase = await createClient()
  
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { data: null, error: "Not authenticated" }

    const { data, error } = await supabase
      .from('host_events')
      .insert({
        ...eventData,
        user_id: user.id,
        status: 'Planning'
      })
      .select()
      .single()

    if (error) {
      console.error("Insert Error in createHostEvent:", error)
      return { data: null, error: error.message }
    }
    return { data, error: null }
  } catch (error: any) {
    console.error("Internal Server Error in createHostEvent:", error)
    return { data: null, error: "Internal Server Error" }
  }
}

export async function getHostEventDetails(eventId: string) {
  const supabase = await createClient()
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { data: null, error: "Not authenticated" }

    const { data, error } = await supabase
      .from('host_events')
      .select('*')
      .eq('id', eventId)
      .eq('user_id', user.id)
      .single()

    if (error) return { data: null, error: error.message }
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: "Internal Server Error" }
  }
}

export async function getHostEventMilestones(eventId: string) {
  const supabase = await createClient()
  try {
    const { data, error } = await supabase
      .from('host_event_milestones')
      .select('*')
      .eq('host_event_id', eventId)
      .order('sort_order', { ascending: true })

    if (error) return { data: null, error: error.message }
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: "Internal Server Error" }
  }
}

export async function getHostEventBudgets(eventId: string) {
  const supabase = await createClient()
  try {
    const { data, error } = await supabase
      .from('host_event_budgets')
      .select('*')
      .eq('host_event_id', eventId)

    if (error) return { data: null, error: error.message }
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: "Internal Server Error" }
  }
}

export async function getHostEventTasks(eventId: string) {
  const supabase = await createClient()
  try {
    const { data, error } = await supabase
      .from('host_event_tasks')
      .select('*')
      .eq('host_event_id', eventId)
      .order('due_date', { ascending: true })

    if (error) return { data: null, error: error.message }
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: "Internal Server Error" }
  }
}

export async function getHostEventVendors(eventId: string) {
  const supabase = await createClient()
  try {
    const { data, error } = await supabase
      .from('host_event_vendors')
      .select('*, organizations(name, logo_url)')
      .eq('host_event_id', eventId)

    if (error) return { data: null, error: error.message }
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: "Internal Server Error" }
  }
}

export async function getHostEventGuests(eventId: string) {
  const supabase = await createClient()
  try {
    const { data, error } = await supabase
      .from('host_event_guests')
      .select('*')
      .eq('host_event_id', eventId)
      .order('name', { ascending: true })

    if (error) return { data: null, error: error.message }
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: "Internal Server Error" }
  }
}
