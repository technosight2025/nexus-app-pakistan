'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle, Sparkles, ArrowRight, Calendar, Landmark, DollarSign } from 'lucide-react';
import Link from 'next/link';

interface Step {
  id: string;
  title: string;
  desc: string;
}

const STEPS: Step[] = [
  { id: 'venue', title: 'Confirm Venue', desc: 'Secure your dates and venue space with the manager' },
  { id: 'quotes', title: 'Review Initial Quotes', desc: 'Browse and approve itemized quotation options' },
  { id: 'guests', title: 'Upload Guest List', desc: 'Submit guest details to estimate catering and seats' },
  { id: 'payment', title: 'Finalize Payment', desc: 'Clear your booking deposit to secure all assets' },
];

export function OnboardingChecklist({ hasEvents }: { hasEvents: boolean }) {
  const { user } = useUser();
  const [completed, setCompleted] = useState<Record<string, boolean>>({
    venue: false,
    quotes: false,
    guests: false,
    payment: false,
  });

  // Load completed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('nexus_portal_onboarding_steps');
    if (saved) {
      try {
        setCompleted(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse onboarding steps:', e);
      }
    }
  }, []);

  const toggleStep = (stepId: string) => {
    const nextState = {
      ...completed,
      [stepId]: !completed[stepId],
    };
    setCompleted(nextState);
    localStorage.setItem('nexus_portal_onboarding_steps', JSON.stringify(nextState));
  };

  const name = user?.firstName || user?.fullName?.split(' ')[0] || 'Client';
  
  // Calculate progress percentage
  const totalSteps = STEPS.length;
  const completedCount = Object.values(completed).filter(Boolean).length;
  const progressPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  // 1. If user has no events, show Welcome / Setup onboarding screen
  if (!hasEvents) {
    return (
      <Card className="border-[#E6E2DA] bg-[#FFFFFF] shadow-md rounded-2xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.01] pointer-events-none" />
        <CardHeader className="bg-[#FAF7F2] border-b border-[#E6E2DA] p-8 text-center relative">
          <div className="w-12 h-12 rounded-full bg-[#0F5B3E]/10 flex items-center justify-center mx-auto mb-4 border border-[#0F5B3E]/20">
            <Sparkles className="w-6 h-6 text-[#0F5B3E]" />
          </div>
          <CardTitle className="text-2xl font-black text-[#1D1C17] uppercase tracking-wider">
            Welcome home, {name}.
          </CardTitle>
          <CardDescription className="text-sm text-[#5E6460] mt-2 max-w-lg mx-auto">
            Let’s make your celebration unforgettable. Setup your workspace to begin.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 flex flex-col items-center justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl mb-8">
            <div className="p-5 bg-[#FAF7F2] rounded-xl border border-[#E6E2DA] text-center flex flex-col items-center">
              <Calendar className="w-6 h-6 text-[#0F5B3E] mb-3" />
              <h4 className="text-xs font-black text-[#1D1C17] uppercase tracking-wider mb-1">Set Schedule</h4>
              <p className="text-[11px] text-[#5E6460]">Lock in dates and wedding/corporate timelines</p>
            </div>
            <div className="p-5 bg-[#FAF7F2] rounded-xl border border-[#E6E2DA] text-center flex flex-col items-center">
              <Landmark className="w-6 h-6 text-[#0F5B3E] mb-3" />
              <h4 className="text-xs font-black text-[#1D1C17] uppercase tracking-wider mb-1">Secure Venues</h4>
              <p className="text-[11px] text-[#5E6460]">Coordinate banquet spaces & event services</p>
            </div>
            <div className="p-5 bg-[#FAF7F2] rounded-xl border border-[#E6E2DA] text-center flex flex-col items-center">
              <DollarSign className="w-6 h-6 text-[#0F5B3E] mb-3" />
              <h4 className="text-xs font-black text-[#1D1C17] uppercase tracking-wider mb-1">Track Invoices</h4>
              <p className="text-[11px] text-[#5E6460]">Review line-item quotations & make deposits</p>
            </div>
          </div>
          <Link href="/create/event">
            <Button className="bg-[#0F5B3E] hover:bg-[#0A422D] text-white font-bold px-8 h-12 rounded-xl text-xs uppercase tracking-widest flex items-center gap-2 shadow-md">
              Plan An Event Workspace <ArrowRight size={14} />
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  // 2. If user has events, show progress tracker card
  return (
    <Card className="border-[#E6E2DA] bg-[#FFFFFF] shadow-sm rounded-2xl overflow-hidden mb-8">
      <CardHeader className="bg-[#FAF7F2] border-b border-[#E6E2DA] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle className="text-lg font-black text-[#1D1C17] uppercase tracking-wider">
            Welcome home, {name}!
          </CardTitle>
          <CardDescription className="text-xs text-[#5E6460] mt-1">
            Let’s make your celebration unforgettable. Track your milestones below.
          </CardDescription>
        </div>
        <div className="shrink-0 flex items-center gap-3 bg-white border border-[#E6E2DA] px-4 py-2 rounded-xl shadow-sm">
          <div className="text-right">
            <p className="text-[9px] font-black text-[#5E6460] uppercase tracking-widest">Progress</p>
            <p className="text-sm font-black text-[#0F5B3E]">{progressPercent}% Completed</p>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-[#E6E2DA] border-t-[#0F5B3E] flex items-center justify-center font-black text-xs text-[#1D1C17]" style={{ transform: `rotate(${progressPercent * 3.6}deg)` }}>
            <span style={{ transform: `rotate(-${progressPercent * 3.6}deg)` }}>{completedCount}/{totalSteps}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-black text-[#5E6460] uppercase tracking-wider">
            <span>Milestone Tracker</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#FAF7F2] h-2.5 rounded-full border border-[#E6E2DA] overflow-hidden">
            <div 
              className="bg-[#0F5B3E] h-full transition-all duration-500 rounded-full" 
              style={{ width: `${progressPercent}%` }} 
            />
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STEPS.map((step) => {
            const isDone = completed[step.id];
            return (
              <div 
                key={step.id}
                onClick={() => toggleStep(step.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                  isDone 
                    ? 'bg-[#FAF7F2] border-[#0F5B3E]/30 text-slate-500' 
                    : 'bg-[#FFFFFF] border-[#E6E2DA] hover:border-[#0F5B3E]/30'
                }`}
              >
                <button className="shrink-0 mt-0.5 transition-colors">
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-[#0F5B3E]" />
                  ) : (
                    <Circle className="w-5 h-5 text-[#E6E2DA] hover:text-[#0F5B3E]" />
                  )}
                </button>
                <div>
                  <h4 className={`text-xs font-black uppercase tracking-wider ${isDone ? 'line-through text-[#5E6460]/75' : 'text-[#1D1C17]'}`}>
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-[#5E6460] mt-1 font-medium leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
