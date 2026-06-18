'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useDashboard } from '@/contexts/DashboardContext';
import { useUser } from '@clerk/nextjs';
import {
  Loader2, ArrowRight, AlertCircle, TrendingUp, Calendar,
  Users, DollarSign, Star, Target, FileText, Plus, ClipboardList, CheckSquare, Sparkles, PlusCircle, CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import type { Database } from '@/types/supabase';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { PipelineChart } from './PipelineChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type LeadRow = Database['public']['Tables']['leads']['Row'];
type BookingRow = Database['public']['Tables']['bookings']['Row'] & {
  events?: { name: string; id: string; guest_count: number | null; budget: number | null } | null;
  rooms?: { name: string } | null;
};

const PILL_TABS = [
  { label: 'Overview',    href: '/dashboard',          icon: <TrendingUp size={13} /> },
  { label: 'CRM Board',   href: '/dashboard/crm',      icon: <Target size={13} /> },
  { label: 'Calendar',    href: '/dashboard/calendar', icon: <Calendar size={13} /> },
  { label: 'Sales',       href: '/dashboard/sales',    icon: <FileText size={13} /> },
];

const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function getGreeting(name: string) {
  const hour = new Date().getHours();
  const salutation = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  return `${salutation}${name ? `, ${name}` : ''}! 👋`;
}

export function DashboardOverviewHome() {
  const { branchId, organizationId } = useDashboard();
  const { user: clerkUser } = useUser();
  const supabase = createClient();

  const [isLoading, setIsLoading]         = useState(true);
  const [userName, setUserName]           = useState('');
  const [activeInquiries, setActiveInquiries]       = useState(0);
  const [occupancyRate, setOccupancyRate]           = useState(0);
  const [grossPipeline, setGrossPipeline]           = useState(0);
  const [actionRequiredCount, setActionRequiredCount] = useState(0);
  const [pipelineData, setPipelineData] = useState<any[]>([]);
  const [upcomingBookings, setUpcomingBookings]     = useState<BookingRow[]>([]);
  const [recentLeads, setRecentLeads]               = useState<LeadRow[]>([]);
  const [monthlyRevenue, setMonthlyRevenue]         = useState<{ month: string; val: number }[]>([]);
  const [pendingTasksCount, setPendingTasksCount]   = useState(0);
  const [pendingTasks, setPendingTasks]             = useState<any[]>([]);
  const chartAnimated = useRef(false);

  // Set name from Clerk user
  useEffect(() => {
    if (clerkUser) {
      const first = clerkUser.firstName || clerkUser.fullName?.split(' ')[0] || clerkUser.primaryEmailAddress?.emailAddress?.split('@')[0] || '';
      setUserName(first);
    }
  }, [clerkUser]);

  useEffect(() => {
    async function fetchAll() {
      setIsLoading(true);

      if (!branchId || !organizationId) {
        // demo data
        setMonthlyRevenue([
          { month: 'Jan', val: 420000 }, { month: 'Feb', val: 680000 },
          { month: 'Mar', val: 520000 }, { month: 'Apr', val: 890000 },
          { month: 'May', val: 750000 }, { month: 'Jun', val: 1100000 },
          { month: 'Jul', val: 980000 },
        ]);
        setPendingTasksCount(3);
        setPendingTasks([
          { id: '1', title: 'Confirm catering with Pearl Continental', due_time: '2026-06-10T12:00:00' },
          { id: '2', title: 'Send quotation to Ali Ahmed', due_time: '2026-06-09T18:00:00' },
          { id: '3', title: 'Coordinate salon booking for bride', due_time: '2026-06-11T10:00:00' },
        ]);
        setIsLoading(false);
        return;
      }

      const today = new Date();
      const tzOffset = today.getTimezoneOffset() * 60000;
      const localToday = new Date(today.getTime() - tzOffset).toISOString().slice(0, 10);
      const localFourteen = new Date(today.getTime() + 14 * 86400000 - tzOffset).toISOString().slice(0, 10);

      const [leadsRes, eventsRes, roomsRes, bookingsRes, quotesRes, tasksRes] = await Promise.all([
        supabase.from('leads').select('status, is_urgent, created_at, name, event_date, id')
          .eq('organization_id', organizationId).order('created_at', { ascending: false }),
        supabase.from('events').select('budget, status')
          .eq('organization_id', organizationId).eq('branch_id', branchId),
        supabase.from('rooms').select('id, name').eq('branch_id', branchId),
        supabase.from('bookings').select('*, events(*), rooms(*)')
          .eq('status', 'confirmed').gte('booking_date', localToday)
          .order('booking_date', { ascending: true }),
        supabase.from('quotations').select('grand_total, created_at, status')
          .eq('organization_id', organizationId),
        supabase.from('tasks').select('*')
          .eq('organization_id', organizationId)
          .eq('is_completed', false)
          .order('created_at', { ascending: false })
      ]);

      if (leadsRes.data) {
        setActiveInquiries(leadsRes.data.filter((l: any) => l.status === 'new' || l.status === 'visiting').length);
        setActionRequiredCount(leadsRes.data.filter((l: any) => l.is_urgent && l.status !== 'booked' && l.status !== 'lost').length);
        setRecentLeads(leadsRes.data.slice(0, 5) as unknown as LeadRow[]);
      }
      if (eventsRes.data) {
        setGrossPipeline(eventsRes.data.reduce((s, e) => s + (e.budget || 0), 0));
        const counts = eventsRes.data.reduce((acc: any, curr: any) => {
          const status = curr.status || 'unknown';
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});
        setPipelineData(Object.keys(counts).map(key => ({
          name: key.charAt(0).toUpperCase() + key.slice(1),
          count: counts[key]
        })));
      }
      if (roomsRes.data && bookingsRes.data) {
        const totalSlots = roomsRes.data.length * 14 * 2;
        const next14 = bookingsRes.data.filter(b => b.booking_date >= localToday && b.booking_date < localFourteen);
        setOccupancyRate(totalSlots > 0 ? Math.round((next14.length / totalSlots) * 100) : 0);
        setUpcomingBookings(bookingsRes.data.slice(0, 5) as unknown as BookingRow[]);
      }

      if (tasksRes.data) {
        setPendingTasksCount(tasksRes.data.length);
        setPendingTasks(tasksRes.data.slice(0, 5));
      }

      // Build monthly revenue from quotations
      if (quotesRes.data) {
        const byMonth: Record<number, number> = {};
        quotesRes.data.forEach(q => {
          const m = new Date(q.created_at).getMonth();
          byMonth[m] = (byMonth[m] || 0) + q.grand_total;
        });
        const now = new Date().getMonth();
        const chart = [];
        for (let i = 6; i >= 0; i--) {
          const m = (now - i + 12) % 12;
          chart.push({ month: MONTHS_SHORT[m], val: byMonth[m] || 0 });
        }
        setMonthlyRevenue(chart);
      }

      setIsLoading(false);
    }
    fetchAll();
  }, [branchId, organizationId]);

  // Animate chart bars after data loads
  useEffect(() => {
    if (!isLoading && monthlyRevenue.length > 0 && !chartAnimated.current) {
      chartAnimated.current = true;
      setTimeout(() => {
        document.querySelectorAll<HTMLElement>('.revenue-bar').forEach(bar => {
          bar.style.height = bar.dataset.target ?? '0%';
        });
      }, 200);
    }
  }, [isLoading, monthlyRevenue]);

  const fmtCurrency = (v: number) =>
    'Rs: ' + new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(v);

  const fmtDate = (d: string | null) => {
    if (!d) return 'TBD';
    return new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="w-full h-full min-h-[600px] flex items-center justify-center text-[#0F5B3E] bg-[#FAF7F2]">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 bg-[#FAF7F2] font-sans p-6 md:p-10 min-h-full pb-24 md:pb-10">

      {/* ── High-Level Summary Bar ── */}
      <div className="w-full bg-[#0F5B3E] text-white p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-[0_8px_30px_rgb(15,91,62,0.08)] border border-[#0d5036]">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-xl border border-white/10 shrink-0">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-0.5">Gross Pipeline Value</p>
            <p className="text-2xl font-black tracking-tight">{fmtCurrency(grossPipeline)}</p>
          </div>
        </div>
        
        <div className="hidden sm:block h-12 w-[1px] bg-white/10 self-center" />
        
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-xl border border-white/10 shrink-0">
            <ClipboardList className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-0.5">Pending Operational Tasks</p>
            <p className="text-2xl font-black tracking-tight">{pendingTasksCount} Tasks Active</p>
          </div>
        </div>
      </div>

      {/* ── Greeting & Mobile Pill-Tab Navigation ── */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#1D1C17] tracking-tight leading-none">
              {getGreeting(userName)}
            </h1>
            <p className="text-sm text-[#5E6460] mt-2 font-medium">Your centralized event operations and lead hub.</p>
          </div>
          
          {/* Quick Action Grid (Mobile-First responsive quick buttons) */}
          <div className="grid grid-cols-3 md:flex gap-3 w-full md:w-auto">
            <Link
              href="/dashboard/crm"
              className="flex items-center justify-center gap-2 bg-[#0F5B3E] text-white text-xs font-black px-4 py-3 rounded-xl hover:bg-[#0c4931] transition-all shadow-sm active:scale-95"
            >
              <Plus size={14} /> <span className="hidden sm:inline">Add</span> Lead
            </Link>
            <Link
              href="/dashboard/sales"
              className="flex items-center justify-center gap-2 bg-[#FFFFFF] border border-[#E6E2DA] text-[#1D1C17] text-xs font-black px-4 py-3 rounded-xl hover:bg-slate-50 transition-all shadow-sm active:scale-95"
            >
              <FileText size={14} /> <span className="hidden sm:inline">Create</span> Quote
            </Link>
            <Link
              href="/dashboard/calendar"
              className="flex items-center justify-center gap-2 bg-[#FFFFFF] border border-[#E6E2DA] text-[#1D1C17] text-xs font-black px-4 py-3 rounded-xl hover:bg-slate-50 transition-all shadow-sm active:scale-95"
            >
              <Calendar size={14} /> <span className="hidden sm:inline">Add</span> Task
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide md:hidden">
          {PILL_TABS.map(tab => (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full whitespace-nowrap text-[12px] font-bold bg-[#FFFFFF] text-[#5E6460] border border-[#E6E2DA] hover:border-[#0F5B3E] hover:text-[#0F5B3E] transition-colors shadow-sm flex-shrink-0"
            >
              {tab.icon}
              {tab.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Main Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* ── LEFT COLUMN: FINANCES & ANALYTICS (7 cols) ── */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          {/* Revenue Chart Card */}
          <Card className="border-[#E6E2DA] shadow-sm bg-white rounded-2xl overflow-hidden">
            <CardHeader className="bg-[#FAF7F2] border-b border-[#E6E2DA] pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-black text-[#1D1C17] uppercase tracking-widest">Monthly Revenue Engine</CardTitle>
                  <CardDescription className="text-xs text-[#5E6460] mt-0.5">Quotation pipeline aggregates by month</CardDescription>
                </div>
                <span className="text-[9px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-md uppercase tracking-wider">
                  PKR Thousands
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyRevenue} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#5E6460', fontSize: 10, fontStyle: 'normal', fontWeight: 'bold' }} 
                      dy={10} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#5E6460', fontSize: 10, fontStyle: 'normal', fontWeight: 'bold' }} 
                      tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
                    />
                    <RechartsTooltip 
                      cursor={{ fill: '#E6F0EC', opacity: 0.4 }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold', color: '#1D1C17' }}
                      formatter={(value: any) => [`PKR ${Number(value).toLocaleString()}`, 'Revenue']}
                    />
                    <Bar dataKey="val" radius={[6, 6, 0, 0]}>
                      {monthlyRevenue.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={index === monthlyRevenue.length - 1 ? '#0F5B3E' : '#E6F0EC'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="flex gap-4 mt-6 border-t border-[#E6E2DA] pt-4">
                <span className="flex items-center gap-1.5 text-[10px] text-[#5E6460] font-bold uppercase tracking-wider">
                  <span className="w-3 h-3 rounded bg-[#0F5B3E] inline-block" /> Current Month
                </span>
                <span className="flex items-center gap-1.5 text-[10px] text-[#5E6460] font-bold uppercase tracking-wider">
                  <span className="w-3 h-3 rounded bg-[#E6F0EC] inline-block" /> Past Months
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Event Pipeline Status Card */}
          <Card className="border-[#E6E2DA] shadow-sm bg-white rounded-2xl overflow-hidden">
            <CardHeader className="bg-[#FAF7F2] border-b border-[#E6E2DA] pb-4">
              <CardTitle className="text-sm font-black text-[#1D1C17] uppercase tracking-widest">Event Pipeline Breakdown</CardTitle>
              <CardDescription className="text-xs text-[#5E6460] mt-0.5">Current lead status distribution in sales funnel</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <PipelineChart data={pipelineData} />
            </CardContent>
          </Card>

          {/* Bookings / Manifest Card */}
          <Card className="border-[#E6E2DA] shadow-sm bg-white rounded-2xl overflow-hidden">
            <CardHeader className="bg-[#FAF7F2] border-b border-[#E6E2DA] pb-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-black text-[#1D1C17] uppercase tracking-widest">Upcoming Event Manifest</CardTitle>
                <CardDescription className="text-xs text-[#5E6460] mt-0.5">Confirmed bookings schedule overview</CardDescription>
              </div>
              <span className="text-[10px] font-black text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-md uppercase tracking-wider">
                {occupancyRate}% Occupied
              </span>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#FAF7F2]/50 border-b border-[#E6E2DA]">
                    <tr>
                      {['Date & Slot', 'Hall/Space', 'Event Name', 'Guests'].map(h => (
                        <th key={h} className="p-4 text-[9px] font-black tracking-widest text-[#5E6460] uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E6E2DA]">
                    {upcomingBookings.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-xs font-bold text-[#5E6460]">
                          No upcoming confirmed bookings.
                        </td>
                      </tr>
                    ) : upcomingBookings.map(b => (
                      <tr key={b.id} className="hover:bg-[#FAF7F2]/55 transition-colors">
                        <td className="p-4 text-xs font-bold text-[#1D1C17]">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#0F5B3E] rounded-sm shrink-0" />
                            {fmtDate(b.booking_date)}
                            <span className="text-[9px] uppercase text-[#0F5B3E] font-black px-1.5 py-0.5 bg-[#E6F0EC] rounded">
                              {b.slot}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-xs font-black text-[#5E6460] uppercase tracking-wider">{b.rooms?.name || '—'}</td>
                        <td className="p-4 text-sm font-black text-[#1D1C17]">{b.events?.name || 'Unnamed'}</td>
                        <td className="p-4 text-xs font-bold text-[#1D1C17] text-right">{b.events?.guest_count || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* ── RIGHT COLUMN: LEADS & TASKS (5 cols) ── */}
        <div className="lg:col-span-5 flex flex-col gap-8">

          {/* CRM Leads Card */}
          <Card className="border-[#E6E2DA] shadow-sm bg-white rounded-2xl overflow-hidden">
            <CardHeader className="bg-[#FAF7F2] border-b border-[#E6E2DA] pb-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-black text-[#1D1C17] uppercase tracking-widest">Recent Lead Influx</CardTitle>
                <CardDescription className="text-xs text-[#5E6460] mt-0.5">Most recent incoming customer inquiries</CardDescription>
              </div>
              <Link href="/dashboard/crm" className="text-[9px] font-black text-[#0F5B3E] hover:underline uppercase tracking-wider bg-[#E6F0EC] px-2 py-1 rounded">
                CRM Board →
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              {actionRequiredCount > 0 && (
                <div className="bg-[#D9467A]/5 border-b border-[#D9467A]/20 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#D9467A] text-xs font-black uppercase tracking-wider">
                    <AlertCircle size={14} /> {actionRequiredCount} Urgent Leads Need Action
                  </div>
                </div>
              )}
              <div className="flex flex-col divide-y divide-[#E6E2DA]">
                {recentLeads.length === 0 ? (
                  <div className="p-8 text-center text-xs font-bold text-[#5E6460]">No recent leads found.</div>
                ) : recentLeads.map(lead => (
                  <div key={lead.id} className="p-4 hover:bg-[#FAF7F2]/40 transition-colors flex justify-between items-center group">
                    <div>
                      <h3 className="text-sm font-black text-[#1D1C17]">{lead.name}</h3>
                      <p className="text-[10px] font-bold text-[#5E6460] uppercase tracking-wider mt-1 flex items-center gap-1.5">
                        Target Date: <span className="text-[#1D1C17]">{fmtDate(lead.event_date)}</span>
                        {lead.is_urgent && <span className="bg-[#D9467A]/10 text-[#D9467A] text-[8px] font-black px-1.5 py-0.2 rounded uppercase">Urgent</span>}
                      </p>
                    </div>
                    <Link
                      href={`/dashboard/crm?highlight=${lead.id}`}
                      className="opacity-0 group-hover:opacity-100 transition-all bg-[#0F5B3E] hover:bg-[#0c4931] text-white p-2 rounded-lg"
                    >
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Tasks Card */}
          <Card className="border-[#E6E2DA] shadow-sm bg-white rounded-2xl overflow-hidden">
            <CardHeader className="bg-[#FAF7F2] border-b border-[#E6E2DA] pb-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-black text-[#1D1C17] uppercase tracking-widest">Active Operations Checklist</CardTitle>
                <CardDescription className="text-xs text-[#5E6460] mt-0.5">Tasks required for event fulfillment</CardDescription>
              </div>
              <span className="text-[9px] font-black text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded-md uppercase tracking-wider">
                {pendingTasksCount} Active
              </span>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col divide-y divide-[#E6E2DA]">
                {pendingTasks.length === 0 ? (
                  <div className="p-8 text-center text-xs font-bold text-[#5E6460] flex flex-col items-center gap-2">
                    <CheckCircle2 className="w-8 h-8 text-[#0F5B3E]/30" />
                    No active tasks pending.
                  </div>
                ) : pendingTasks.map(task => (
                  <div key={task.id} className="p-4 hover:bg-[#FAF7F2]/40 transition-colors flex items-start gap-3">
                    <div className="p-1 rounded bg-[#FAF7F2] border border-[#E6E2DA] shrink-0 mt-0.5">
                      <CheckCircle2 size={14} className="text-slate-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-black text-[#1D1C17] leading-snug">{task.title}</h4>
                      {task.due_time && (
                        <p className="text-[9px] font-bold text-[#D9467A] uppercase tracking-wider mt-1">
                          Due: {new Date(task.due_time).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
}
