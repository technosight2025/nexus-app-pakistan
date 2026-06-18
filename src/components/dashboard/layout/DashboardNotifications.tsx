'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bell, Check, Clock } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useDashboard } from '@/contexts/DashboardContext';
import { useRouter } from 'next/navigation';
import type { Database } from '@/types/supabase';

type NotificationRow = Database['public']['Tables']['notifications']['Row'];

export function DashboardNotifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationRow[]>([]);
  const { organizationId } = useDashboard();
  const supabase = createClient();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close the dropdown securely
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch initial notifications and hook up real-time stream
  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel>;
    let isMounted = true;

    async function setupNotifications() {
      if (!organizationId) return;

      const { data: { user } } = await supabase.auth.getUser();
      if (!isMounted) return;

      // Query active notifications for the tenant
      let query = supabase
        .from('notifications')
        .select('*')
        .eq('organization_id', organizationId)
        .order('created_at', { ascending: false })
        .limit(30);

      // Filter by user ID context if authenticated
      if (user) {
        query = query.eq('user_id', user.id);
      }

      const { data, error } = await query;
      if (!isMounted) return;
      
      if (!error && data) {
        setNotifications(data);
      }

      // Initialize Supabase Postgres Channel for real-time unread alerts
      // Use a unique channel name to prevent conflicts during React StrictMode re-renders
      const channelName = `notifications-${organizationId}-${Date.now()}-${Math.random()}`;
      channel = supabase
        .channel(channelName)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'notifications',
            filter: `organization_id=eq.${organizationId}`
          },
          (payload) => {
            const newNotif = payload.new as NotificationRow;
            // Only optimistically push if it matches the current user constraint
            if (!user || newNotif.user_id === user.id) {
              setNotifications(prev => [newNotif, ...prev]);
            }
          }
        )
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'notifications',
            filter: `organization_id=eq.${organizationId}`
          },
          (payload) => {
            const updatedNotif = payload.new as NotificationRow;
            setNotifications(prev => prev.map(n => n.id === updatedNotif.id ? updatedNotif : n));
          }
        )
        .subscribe();
    }

    setupNotifications();

    return () => {
      isMounted = false;
      if (channel) supabase.removeChannel(channel);
    };
  }, [organizationId, supabase]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = async (notif: NotificationRow) => {
    if (!notif.read) {
      // Optimistically flip status on the UI instantly
      setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
      // Dispatch database update
      await supabase.from('notifications').update({ read: true }).eq('id', notif.id);
    }
    
    setIsOpen(false);
    
    // Route forward
    if (notif.link) {
      router.push(notif.link);
    }
  };

  const markAllAsRead = async () => {
    const unreadIds = notifications.filter(n => !n.read).map(n => n.id);
    if (unreadIds.length === 0) return;

    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    await supabase.from('notifications').update({ read: true }).in('id', unreadIds);
  };

  const getTimeAgo = (dateStr: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-none transition-colors border ${
          isOpen ? 'bg-[#FAF7F2] border-[#E6E2DA] text-[#1D1C17]' : 'bg-transparent border-transparent text-[#5E6460] hover:bg-[#FAF7F2]'
        }`}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#D9467A] rounded-full border border-[#FFFFFF]"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 md:w-[400px] bg-[#FFFFFF] border border-[#E6E2DA] shadow-none z-50 flex flex-col max-h-[80vh]">
          
          {/* Dropdown Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#E6E2DA] bg-[#FAF7F2] shrink-0">
            <h3 className="text-sm font-black text-[#1D1C17] uppercase tracking-wider flex items-center gap-2">
              Notifications
              {unreadCount > 0 && (
                <span className="bg-[#D9467A] text-white text-[9px] px-1.5 py-0.5 rounded-none font-bold">
                  {unreadCount} NEW
                </span>
              )}
            </h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-[10px] font-bold text-[#0F5B3E] uppercase tracking-widest hover:underline flex items-center gap-1"
              >
                <Check size={12} /> Mark all as read
              </button>
            )}
          </div>

          {/* High-Density Stream Area */}
          <div className="overflow-y-auto flex-1 divide-y divide-[#E6E2DA]">
            {notifications.length === 0 ? (
              <div className="p-8 text-center bg-[#FFFFFF]">
                <p className="text-xs font-bold text-[#5E6460] uppercase tracking-wider">No active notifications</p>
              </div>
            ) : (
              notifications.map(notif => (
                <button
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`w-full text-left p-4 transition-colors relative flex items-start gap-3 hover:bg-[#FAF7F2] ${
                    !notif.read ? 'bg-[#FFFFFF]' : 'bg-[#FAF7F2] opacity-80'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-black uppercase tracking-widest text-[#0F5B3E] bg-[#E6F0EC] px-1.5 py-0.5 border border-[#0F5B3E]/20">
                        {notif.type}
                      </span>
                      <span className="text-[10px] font-bold text-[#5E6460] flex items-center gap-1 shrink-0">
                        <Clock size={10} /> {getTimeAgo(notif.created_at)}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-[#1D1C17] truncate">{notif.title}</p>
                    <p className="text-xs text-[#5E6460] line-clamp-2 mt-1 leading-snug">{notif.body}</p>
                  </div>
                  
                  {/* Rose Pink Unread Indicator Dot */}
                  {!notif.read && (
                    <div className="w-2 h-2 bg-[#D9467A] shrink-0 mt-1 mr-1"></div>
                  )}
                </button>
              ))
            )}
          </div>
          
          {/* Footer */}
          <div className="p-2.5 border-t border-[#E6E2DA] bg-[#FFFFFF] shrink-0 text-center">
            <button className="text-[10px] font-black text-[#5E6460] uppercase tracking-widest hover:text-[#0F5B3E] transition-colors">
              View Complete Ledger
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
