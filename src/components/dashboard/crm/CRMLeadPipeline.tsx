'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, Calendar, Users, DollarSign, GripVertical, Check, X, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useDashboard } from '@/contexts/DashboardContext';
import type { Database } from '@/types/supabase';

type LeadRow = Database['public']['Tables']['leads']['Row'];
type StageId = 'new' | 'visiting' | 'quoted' | 'deposit_pending';

interface Stage {
  id: StageId;
  title: string;
}

const STAGES: Stage[] = [
  { id: 'new', title: 'New Inquiries' },
  { id: 'visiting', title: 'Site Visit Scheduled' },
  { id: 'quoted', title: 'Quotation Sent' },
  { id: 'deposit_pending', title: 'Deposit Pending' },
];

export function CRMLeadPipeline() {
  const { organizationId } = useDashboard();
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Inline edit state
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState('');

  const supabase = createClient();

  useEffect(() => {
    async function fetchLeads() {
      if (!organizationId) return;
      setIsLoading(true);

      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('organization_id', organizationId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching leads:', error);
      } else if (data) {
        setLeads(data);
      }
      setIsLoading(false);
    }
    fetchLeads();
  }, [organizationId, supabase]);

  // --- Handlers ---
  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData('leadId', leadId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = async (e: React.DragEvent, stageId: StageId) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('leadId');
    if (!leadId) return;

    // Optimistic UI update
    setLeads(current => 
      current.map(lead => 
        lead.id === leadId ? { ...lead, status: stageId } : lead
      )
    );

    // Persist to Supabase
    const { error } = await supabase
      .from('leads')
      .update({ status: stageId })
      .eq('id', leadId);
      
    if (error) {
      console.error('Failed to update lead status:', error);
      // Revert logic would go here
    }
  };

  const startEditingNote = (lead: LeadRow) => {
    setEditingNoteId(lead.id);
    setTempNote(lead.next_action_note || '');
  };

  const saveNote = async (leadId: string) => {
    // Optimistic UI update
    setLeads(current => current.map(l => l.id === leadId ? { ...l, next_action_note: tempNote } : l));
    setEditingNoteId(null);

    // Persist to Supabase
    const { error } = await supabase
      .from('leads')
      .update({ next_action_note: tempNote })
      .eq('id', leadId);

    if (error) {
      console.error('Failed to save note:', error);
    }
  };

  const formatCurrency = (val: number | null) => {
    if (!val) return '-';
    return 'Rs: ' + new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(val);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'TBD';
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="w-full h-full min-h-[600px] flex items-center justify-center text-[#0F5B3E] bg-[#FAF7F2]">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  // --- Renderers ---
  const renderLeadCard = (lead: LeadRow) => {
    const isUrgent = lead.is_urgent;
    const borderClass = isUrgent ? 'border-[#D9467A]' : 'border-[#E6E2DA] hover:border-[#0F5B3E]/40';

    return (
      <div 
        key={lead.id}
        draggable
        onDragStart={(e) => handleDragStart(e, lead.id)}
        className={`bg-[#FFFFFF] border ${borderClass} p-3 transition-colors cursor-grab active:cursor-grabbing flex flex-col gap-2 relative`}
      >
        <div className="flex justify-between items-start pt-1">
          <div className="flex items-start gap-1">
            <GripVertical size={14} className="text-[#E6E2DA] mt-0.5 shrink-0" />
            <div>
              <h4 className="text-[13px] font-bold text-[#1D1C17] leading-tight font-sans">{lead.name}</h4>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11px] font-medium text-[#5E6460] font-sans">{lead.phone || 'No phone'}</span>
                {lead.phone && (
                  <a 
                    href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[#0F5B3E] hover:bg-[#E6F0EC] p-0.5 rounded-sm transition-colors"
                    onClick={(e) => e.stopPropagation()} 
                    title="Open in WhatsApp"
                  >
                    <MessageCircle size={12} />
                  </a>
                )}
              </div>
            </div>
          </div>
          {/* Source Tag */}
          {lead.source && (
            <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 border ${
              lead.source.toLowerCase() === 'whatsapp' 
                ? 'text-[#0F5B3E] bg-[#E6F0EC] border-[#0F5B3E]/20' 
                : lead.source.toLowerCase() === 'walk-in'
                ? 'text-[#B45309] bg-[#FEF3C7] border-[#B45309]/20'
                : 'text-[#5E6460] bg-[#FAF7F2] border-[#E6E2DA]'
            }`}>
              {lead.source}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-[10px] font-bold text-[#5E6460] mt-1 border-y border-[#E6E2DA] py-2 bg-[#FAF7F2]/50">
          <div className="flex items-center gap-1"><Calendar size={12} className="text-[#1D1C17]" /> {formatDate(lead.event_date)}</div>
          <div className="flex items-center gap-1"><Users size={12} className="text-[#1D1C17]" /> {lead.guest_count ? `${lead.guest_count} guests` : '-'}</div>
          <div className="flex items-center gap-1"><DollarSign size={12} className="text-[#1D1C17]" /> {formatCurrency(lead.budget)}</div>
        </div>

        {/* Inline Editable Note */}
        <div className="mt-1 bg-[#FAF7F2] border border-[#E6E2DA] p-2 group relative">
          {editingNoteId === lead.id ? (
            <div className="flex items-start gap-1">
              <textarea 
                autoFocus
                value={tempNote}
                onChange={(e) => setTempNote(e.target.value)}
                className="w-full text-[10px] bg-transparent border-none p-0 focus:ring-0 resize-none h-10 text-[#1D1C17]"
                placeholder="Type update..."
              />
              <div className="flex flex-col gap-1 shrink-0">
                <button onClick={() => saveNote(lead.id)} className="text-[#0F5B3E] hover:bg-[#E6F0EC] p-0.5 border border-transparent hover:border-[#0F5B3E]/20"><Check size={12} /></button>
                <button onClick={() => setEditingNoteId(null)} className="text-[#D9467A] hover:bg-[#FCEEF3] p-0.5 border border-transparent hover:border-[#D9467A]/20"><X size={12} /></button>
              </div>
            </div>
          ) : (
            <div 
              onClick={() => startEditingNote(lead)}
              className="text-[10px] text-[#5E6460] cursor-text min-h-[20px] pr-4 line-clamp-2"
            >
              <span className="font-bold text-[#1D1C17]">Note:</span> {lead.next_action_note || 'Click to add note...'}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full font-sans">
      <div className="flex-1 overflow-x-auto p-4 flex gap-4 items-start min-h-[600px] bg-[#FAF7F2]">
        {STAGES.map(stage => {
          const stageLeads = leads.filter(l => l.status === stage.id);
          return (
            <div 
              key={stage.id} 
              className="flex flex-col shrink-0 w-[280px] bg-[#FAF7F2] border border-[#E6E2DA] max-h-full"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.id)}
            >
              {/* Column Header */}
              <div className="bg-[#FFFFFF] p-3 border-b border-[#E6E2DA] flex justify-between items-center sticky top-0 z-10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#1D1C17]">{stage.title}</h3>
                <span className="bg-[#FAF7F2] border border-[#E6E2DA] text-[#5E6460] text-[10px] font-black px-2 py-0.5">
                  {stageLeads.length}
                </span>
              </div>
              
              {/* Cards Container */}
              <div className="p-2 space-y-2 overflow-y-auto flex-1 min-h-[150px]">
                {stageLeads.map(renderLeadCard)}
                {stageLeads.length === 0 && (
                  <div className="text-center p-4 border-2 border-dashed border-[#E6E2DA] text-[#5E6460] text-[10px] font-bold uppercase tracking-wider bg-[#FFFFFF]/50">
                    Drop Leads Here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
