'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useDashboard } from '@/contexts/DashboardContext';
import { Loader2, Calendar, Clock, CheckSquare, Square, AlertTriangle } from 'lucide-react';
import type { Database } from '@/types/supabase';

type BookingWithEvent = Database['public']['Tables']['bookings']['Row'] & {
  events?: { id: string; name: string; start_datetime: string | null } | null;
  rooms?: { name: string } | null;
};

type TaskRow = Database['public']['Tables']['tasks']['Row'];

export function OperationalTaskManager() {
  const { branchId, organizationId } = useDashboard();
  const [isLoading, setIsLoading] = useState(true);
  
  // Left Pane: Bookings/Events
  const [activeBookings, setActiveBookings] = useState<BookingWithEvent[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Right Pane: Tasks
  const [tasks, setTasks] = useState<TaskRow[]>([]);
  const [isTasksLoading, setIsTasksLoading] = useState(false);

  const supabase = createClient();

  // Initial Fetch: Get all upcoming confirmed bookings for this branch
  useEffect(() => {
    async function fetchEvents() {
      if (!branchId || !organizationId) return;
      setIsLoading(true);

      const today = new Date();
      const tzOffset = today.getTimezoneOffset() * 60000;
      const localToday = new Date(today.getTime() - tzOffset).toISOString().slice(0, 10);

      const { data, error } = await supabase
        .from('bookings')
        .select('*, events(id, name, start_datetime), rooms(name)')
        .eq('status', 'confirmed')
        .gte('booking_date', localToday)
        .order('booking_date', { ascending: true });

      if (error) {
        console.error('Error fetching bookings:', error);
      } else if (data) {
        setActiveBookings(data as unknown as BookingWithEvent[]);
        if (data.length > 0 && data[0].events?.id) {
          setSelectedEventId(data[0].events.id);
        }
      }

      setIsLoading(false);
    }
    fetchEvents();
  }, [branchId, organizationId, supabase]);

  // Secondary Fetch: Get tasks when an event is selected
  useEffect(() => {
    async function fetchTasks() {
      if (!selectedEventId || !organizationId || !branchId) return;
      setIsTasksLoading(true);

      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('event_id', selectedEventId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching tasks:', error);
      } else if (data) {
        // If there are no tasks, auto-generate standard template tasks for demo purposes
        if (data.length === 0) {
          const templates = [
            { category: 'Hall Setup', title: 'Stage Carpeting Cleared', due_time: '5 Hours Prior' },
            { category: 'Hall Setup', title: 'AC Chillers On', due_time: '3 Hours Prior' },
            { category: 'Hall Setup', title: 'Lighting Rig Tested', due_time: '2 Hours Prior' },
            { category: 'Catering & Menu', title: 'Kitchen Prep Initiated', due_time: '6 Hours Prior' },
            { category: 'Catering & Menu', title: 'Buffet Stations Clothed', due_time: '2 Hours Prior' },
            { category: 'Catering & Menu', title: 'Cutlery Polished & Placed', due_time: '1 Hour Prior' },
            { category: 'Logistics & Valet', title: 'VIP Valet Cones Deployed', due_time: '1 Hour Prior' },
            { category: 'Logistics & Valet', title: 'Security Gates Manned', due_time: '2 Hours Prior' },
          ];

          const inserts = templates.map(t => ({
            organization_id: organizationId,
            branch_id: branchId,
            event_id: selectedEventId,
            category: t.category,
            title: t.title,
            due_time: t.due_time,
            is_completed: false
          }));

          const { data: newTasks } = await supabase.from('tasks').insert(inserts).select();
          if (newTasks) setTasks(newTasks);
        } else {
          setTasks(data);
        }
      }
      setIsTasksLoading(false);
    }
    fetchTasks();
  }, [selectedEventId, organizationId, branchId, supabase]);

  const toggleTask = async (taskId: string, currentStatus: boolean) => {
    // Optimistic update
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, is_completed: !currentStatus } : t));

    const { error } = await supabase
      .from('tasks')
      .update({ is_completed: !currentStatus })
      .eq('id', taskId);

    if (error) {
      console.error('Failed to update task:', error);
      // Revert if error
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, is_completed: currentStatus } : t));
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const isUrgent = (bookingDate: string) => {
    const bDate = new Date(bookingDate);
    const today = new Date();
    const diffHours = Math.abs(bDate.getTime() - today.getTime()) / (1000 * 60 * 60);
    return diffHours < 48;
  };

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center text-[#0F5B3E] bg-[#FAF7F2]">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  // Get active selected booking details for urgency checks
  const selectedBooking = activeBookings.find(b => b.events?.id === selectedEventId);
  const urgentEventMode = selectedBooking ? isUrgent(selectedBooking.booking_date) : false;

  // Group tasks by category
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.category]) acc[task.category] = [];
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, TaskRow[]>);

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-[#FAF7F2] font-sans">
      {/* LEFT PANE: Active Event Select (35%) */}
      <div className="w-[35%] border-r border-[#E6E2DA] bg-[#FFFFFF] flex flex-col h-full">
        <div className="h-16 shrink-0 border-b border-[#E6E2DA] px-6 flex items-center bg-[#FAF7F2]">
          <h2 className="text-sm font-black text-[#1D1C17] uppercase tracking-wider flex items-center gap-2">
            <Calendar size={16} className="text-[#0F5B3E]" /> Active Event Manifest
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#FAF7F2]">
          {activeBookings.length === 0 ? (
            <div className="text-xs font-bold text-[#5E6460] text-center p-8 border border-dashed border-[#E6E2DA]">
              No confirmed upcoming events found.
            </div>
          ) : (
            activeBookings.map((booking) => {
              const isSelected = booking.events?.id === selectedEventId;
              const urgent = isUrgent(booking.booking_date);
              
              return (
                <div 
                  key={booking.id}
                  onClick={() => booking.events?.id && setSelectedEventId(booking.events.id)}
                  className={`cursor-pointer border p-4 transition-colors ${
                    isSelected ? 'border-[#0F5B3E] bg-[#0F5B3E] shadow-md' : 'border-[#E6E2DA] bg-[#FFFFFF] hover:border-[#0F5B3E]/50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 ${
                      isSelected ? 'bg-[#E6F0EC] text-[#0F5B3E]' : 'bg-[#FAF7F2] text-[#5E6460]'
                    }`}>
                      {formatDate(booking.booking_date)} • {booking.slot}
                    </span>
                    {urgent && (
                      <span className="text-[10px] font-black text-[#D9467A] flex items-center gap-1 uppercase tracking-wider">
                        <AlertTriangle size={12} /> &lt;48H
                      </span>
                    )}
                  </div>
                  <h3 className={`text-sm font-black truncate ${isSelected ? 'text-white' : 'text-[#1D1C17]'}`}>
                    {booking.events?.name || 'Unnamed Event'}
                  </h3>
                  <p className={`text-[10px] font-bold mt-1 uppercase tracking-wider ${isSelected ? 'text-[#E6F0EC]' : 'text-[#5E6460]'}`}>
                    Hall: {booking.rooms?.name || 'Unassigned'}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* RIGHT PANE: Event Deliverables Checklist (65%) */}
      <div className="w-[65%] bg-[#FFFFFF] flex flex-col h-full">
        <div className="h-16 shrink-0 border-b border-[#E6E2DA] px-8 flex items-center justify-between bg-[#FAF7F2]">
          <h2 className="text-sm font-black text-[#1D1C17] uppercase tracking-wider flex items-center gap-2">
            <CheckSquare size={16} className="text-[#0F5B3E]" /> Deliverables Checklist
          </h2>
          {selectedBooking && (
            <span className="text-[10px] font-black text-[#5E6460] uppercase tracking-wider bg-[#E6E2DA] px-2 py-1">
              {selectedBooking.events?.name}
            </span>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 bg-[#FFFFFF]">
          {!selectedEventId ? (
            <div className="h-full flex items-center justify-center text-xs font-bold text-[#5E6460] uppercase tracking-wider">
              Select an event from the manifest
            </div>
          ) : isTasksLoading ? (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="animate-spin text-[#0F5B3E] w-8 h-8" />
            </div>
          ) : tasks.length === 0 ? (
            <div className="h-full flex items-center justify-center text-xs font-bold text-[#5E6460] uppercase tracking-wider">
              No operational tasks defined for this event.
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedTasks).map(([category, catTasks]) => (
                <div key={category}>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xs font-black text-[#1D1C17] uppercase tracking-widest bg-[#FAF7F2] px-3 py-1 border border-[#E6E2DA]">
                      {category}
                    </h3>
                    <div className="h-px flex-1 bg-[#E6E2DA]"></div>
                  </div>
                  
                  <div className="space-y-3 pl-2">
                    {catTasks.map(task => {
                      // Apply urgent border if unchecked and event is < 48h away
                      const showUrgentWarning = !task.is_completed && urgentEventMode;
                      
                      return (
                        <div 
                          key={task.id} 
                          onClick={() => toggleTask(task.id, task.is_completed)}
                          className={`flex items-center justify-between p-4 border bg-[#FFFFFF] cursor-pointer transition-colors hover:bg-[#FAF7F2] ${
                            showUrgentWarning ? 'border-l-4 border-l-[#D9467A] border-y-[#E6E2DA] border-r-[#E6E2DA]' : 'border-[#E6E2DA]'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <button className="text-[#0F5B3E] transition-transform hover:scale-110 focus:outline-none">
                              {task.is_completed ? (
                                <CheckSquare size={20} className="fill-[#0F5B3E] text-white" />
                              ) : (
                                <Square size={20} className="text-[#E6E2DA]" />
                              )}
                            </button>
                            <span className={`text-sm font-bold ${task.is_completed ? 'text-[#5E6460] line-through' : 'text-[#1D1C17]'}`}>
                              {task.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#5E6460] bg-[#FAF7F2] px-2 py-1 border border-[#E6E2DA] uppercase tracking-wider">
                            <Clock size={10} />
                            {task.due_time || 'TBD'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
