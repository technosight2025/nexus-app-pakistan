'use client';

import React, { useState, useCallback } from 'react';
import { Users, Clock, CheckCircle2, Circle, MapPin, ChefHat, Car, ThermometerSnowflake } from 'lucide-react';

// --- Types ---
interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  completedBy?: string;
  completedAt?: string;
  icon: React.ReactNode;
}

// --- Mock Data ---
const MOCK_STAFF_ID = 'user-staff-789'; // Mock logged-in staff member
const MOCK_STAFF_NAME = 'Ali H.';

const INITIAL_TASKS: Task[] = [
  { id: 't-1', title: 'AC Chillers On (2 Hrs Prior)', isCompleted: true, completedBy: 'Kamran A.', completedAt: '4:30 PM', icon: <ThermometerSnowflake size={18} /> },
  { id: 't-2', title: 'Valet Team Deployed', isCompleted: false, icon: <Car size={18} /> },
  { id: 't-3', title: 'Stage Setup Verified', isCompleted: false, icon: <MapPin size={18} /> },
  { id: 't-4', title: 'Catering Vendor Active', isCompleted: false, icon: <ChefHat size={18} /> },
];

export function MobileFloorOperations() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [guestCount, setGuestCount] = useState(420);
  const [isSyncing, setIsSyncing] = useState<string | null>(null);

  // --- Handlers ---
  const handleToggleTask = useCallback(async (taskId: string) => {
    // 1. Optimistic UI Update
    setTasks(current => current.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
          completedBy: !task.isCompleted ? MOCK_STAFF_NAME : undefined,
          completedAt: !task.isCompleted ? new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : undefined,
        };
      }
      return task;
    }));

    setIsSyncing(taskId);

    // 2. Mock Async Database Sync
    try {
      // In production: await fetch(`/api/floor-ops/tasks/${taskId}`, { method: 'PATCH', body: JSON.stringify({ isCompleted: true, userId: MOCK_STAFF_ID }) })
      await new Promise(resolve => setTimeout(resolve, 600)); // Simulate network latency
      console.log(`[DB SYNC] Task ${taskId} updated by ${MOCK_STAFF_ID}`);
    } catch (error) {
      console.error('Failed to sync task state', error);
      // Revert state in real app
    } finally {
      setIsSyncing(null);
    }
  }, []);

  const handleGuestCountUpdate = (increment: number) => {
    // Simple mock counter, in reality would sync to DB to show on desktop dashboard
    setGuestCount(prev => Math.max(0, prev + increment));
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#FAF7F2] font-sans text-[#1D1C17] h-full min-h-screen pb-24 overflow-y-auto">
      
      {/* 1. Header Information */}
      <div className="bg-[#0F5B3E] text-[#FFFFFF] p-5 pt-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-xl font-black tracking-tight leading-tight">Honeymoon Hall</h1>
            <p className="text-sm font-bold text-[#E6F0EC] uppercase tracking-widest mt-1">Night Slot • Walima</p>
          </div>
          <div className="bg-[#FFFFFF] text-[#0F5B3E] text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-sm shadow-sm">
            LIVE
          </div>
        </div>
        <p className="text-xs text-[#E6F0EC] font-medium">Ahmed & Zara's Event • Client ETA: 7:30 PM</p>
      </div>

      {/* 2. Live Metrics Grid */}
      <div className="p-4 grid grid-cols-2 gap-3 mt-[-16px]">
        
        {/* Guest Count Tracker */}
        <div className="bg-[#FFFFFF] border border-[#E6E2DA] p-3 shadow-sm rounded-sm flex flex-col justify-between h-28">
          <div className="flex items-center gap-1.5 text-[#5E6460]">
            <Users size={14} className="text-[#0F5B3E]" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Guest Count</span>
          </div>
          
          <div className="flex items-end justify-between mt-2">
            <span className="text-3xl font-black text-[#1D1C17] tracking-tighter">{guestCount}</span>
            <span className="text-[10px] font-bold text-[#5E6460] mb-1">/ 600</span>
          </div>
          
          <div className="flex gap-1 mt-2 border-t border-[#E6E2DA] pt-2">
            <button 
              onClick={() => handleGuestCountUpdate(-5)}
              className="flex-1 bg-[#FAF7F2] hover:bg-[#E6E2DA] text-[#1D1C17] text-xs font-black py-1 transition-colors"
            >-5</button>
            <button 
              onClick={() => handleGuestCountUpdate(5)}
              className="flex-1 bg-[#0F5B3E] hover:bg-[#0c4931] text-[#FFFFFF] text-xs font-black py-1 transition-colors"
            >+5</button>
          </div>
        </div>

        {/* Target Serving Time */}
        <div className="bg-[#FFFFFF] border border-[#E6E2DA] p-3 shadow-sm rounded-sm flex flex-col justify-between h-28">
          <div className="flex items-center gap-1.5 text-[#5E6460]">
            <Clock size={14} className="text-[#D9467A]" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Serving Time</span>
          </div>
          <div className="mt-2 flex flex-col">
            <span className="text-3xl font-black text-[#1D1C17] tracking-tighter">9:15</span>
            <span className="text-xs font-bold text-[#D9467A] uppercase tracking-widest mt-1">Target PM</span>
          </div>
        </div>

      </div>

      {/* 3. Operational Checklist Module */}
      <div className="px-4 mt-2">
        <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#5E6460] mb-3 ml-1">Supervisor Checklist</h2>
        
        <div className="space-y-2">
          {tasks.map(task => (
            <button
              key={task.id}
              onClick={() => handleToggleTask(task.id)}
              disabled={isSyncing === task.id}
              className={`w-full flex items-center justify-between p-4 bg-[#FFFFFF] border transition-all duration-200 text-left ${
                task.isCompleted 
                  ? 'border-[#0F5B3E]/30 bg-[#FAF7F2]' 
                  : 'border-[#E6E2DA] hover:border-[#0F5B3E] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`shrink-0 transition-colors ${task.isCompleted ? 'text-[#0F5B3E]' : 'text-[#E6E2DA]'}`}>
                  {task.isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </div>
                
                <div className="flex flex-col">
                  <span className={`text-sm font-bold ${task.isCompleted ? 'text-[#5E6460] line-through decoration-[#0F5B3E]/30' : 'text-[#1D1C17]'}`}>
                    {task.title}
                  </span>
                  
                  {/* Metadata line */}
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] font-medium flex items-center gap-1 ${task.isCompleted ? 'text-[#0F5B3E]' : 'text-[#5E6460]'}`}>
                      {task.icon} 
                      {task.isCompleted && task.completedBy ? `Done by ${task.completedBy} at ${task.completedAt}` : 'Pending Action'}
                    </span>
                    {isSyncing === task.id && (
                      <span className="text-[9px] font-bold text-[#D9467A] uppercase animate-pulse">Syncing...</span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
