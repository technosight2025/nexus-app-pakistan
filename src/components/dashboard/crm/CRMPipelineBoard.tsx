'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, Plus, Calendar, Users, DollarSign, GripVertical, Check, X, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

// --- Types ---
type StageId = 'new' | 'visit' | 'quote' | 'negotiation' | 'won';

interface Stage {
  id: StageId;
  title: string;
}

interface Lead {
  id: string;
  status: StageId;
  name: string;
  phone: string;
  event_date: string | null;
  budget: number | null;
  guest_count: number | null;
  next_action_note: string | null;
  is_urgent: boolean;
}

interface BoardProps {
  organization_id: string;
}

// --- Constants ---
const STAGES: Stage[] = [
  { id: 'new', title: 'New Inquiries' },
  { id: 'visit', title: 'Site Visit Scheduled' },
  { id: 'quote', title: 'Quotation Sent' },
  { id: 'negotiation', title: 'Negotiation / Follow-up' },
  { id: 'won', title: 'Booking Confirmed' },
];

export function CRMPipelineBoard({ organization_id }: BoardProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [showQuickLog, setShowQuickLog] = useState(false);
  const [quickLogData, setQuickLogData] = useState({ name: '', phone: '', event_date: '' });

  // Inline edit state
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState('');

  const supabase = createClient();

  useEffect(() => {
    async function fetchLeads() {
      if (!organization_id) return;
      setIsLoading(true);

      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('organization_id', organization_id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching leads:', error);
      } else if (data) {
        // Map database records to our Lead type
        const mappedLeads: Lead[] = data.map(d => ({
          id: d.id,
          status: (d.status as StageId) || 'new',
          name: d.name,
          phone: d.phone || '',
          event_date: d.event_date ? new Date(d.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : null,
          budget: d.budget,
          guest_count: d.guest_count,
          next_action_note: d.next_action_note,
          is_urgent: d.is_urgent || false
        }));
        setLeads(mappedLeads);
      }
      setIsLoading(false);
    }
    fetchLeads();
  }, [organization_id]);

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
      // Ideally revert state here on failure
    }
  };

  const handleQuickLogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickLogData.name || !quickLogData.phone || !organization_id) return;

    const insertPayload = {
      organization_id,
      name: quickLogData.name,
      phone: quickLogData.phone,
      event_date: quickLogData.event_date ? new Date(quickLogData.event_date).toISOString() : null,
      status: 'new',
      next_action_note: 'New inquiry logged'
    };

    // Persist to Supabase
    const { data, error } = await supabase
      .from('leads')
      .insert(insertPayload)
      .select()
      .single();

    if (error) {
      console.error('Failed to quick-log lead:', error);
      return;
    }

    if (data) {
      const newLead: Lead = {
        id: data.id,
        status: 'new',
        name: data.name,
        phone: data.phone || '',
        event_date: data.event_date ? new Date(data.event_date).toLocaleDateString() : null,
        budget: data.budget,
        guest_count: data.guest_count,
        next_action_note: data.next_action_note,
        is_urgent: data.is_urgent || false
      };
      setLeads([newLead, ...leads]);
    }

    setQuickLogData({ name: '', phone: '', event_date: '' });
    setShowQuickLog(false);
  };

  const startEditingNote = (lead: Lead) => {
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

  if (isLoading) {
    return (
      <div className="w-full h-[600px] bg-[#FAF7F2] border border-[#E6E2DA] flex items-center justify-center text-[#0F5B3E]">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  // --- Renderers ---
  const renderLeadCard = (lead: Lead) => (
    <div 
      key={lead.id}
      draggable
      onDragStart={(e) => handleDragStart(e, lead.id)}
      className="bg-[#FFFFFF] border border-[#E6E2DA] p-3 shadow-sm hover:border-[#0F5B3E]/40 transition-colors cursor-grab active:cursor-grabbing flex flex-col gap-2 relative"
    >
      {/* Urgent Marker */}
      {lead.is_urgent && <div className="absolute top-0 left-0 w-full h-1 bg-[#D9467A]"></div>}

      <div className="flex justify-between items-start pt-1">
        <div className="flex items-start gap-1">
          <GripVertical size={14} className="text-[#E6E2DA] mt-0.5 shrink-0" />
          <div>
            <h4 className="text-[13px] font-bold text-[#1D1C17] leading-tight">{lead.name}</h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[11px] font-medium text-[#5E6460]">{lead.phone}</span>
              {lead.phone && (
                <a 
                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-green-600 hover:text-green-700 bg-green-50 p-1 rounded-md"
                  onClick={(e) => e.stopPropagation()} // Prevent drag when clicking link
                  title="Open in WhatsApp"
                >
                  <MessageCircle size={12} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 text-[10px] font-bold text-[#5E6460] mt-1 border-y border-[#E6E2DA] py-2 bg-[#FAF7F2]/50">
        <div className="flex items-center gap-1"><Calendar size={12} /> {lead.event_date || 'TBD'}</div>
        <div className="flex items-center gap-1"><Users size={12} /> {lead.guest_count || '-'}</div>
        <div className="flex items-center gap-1"><DollarSign size={12} /> {lead.budget ? (lead.budget >= 1000000 ? `${(lead.budget / 1000000).toFixed(1)}M` : `${(lead.budget / 1000).toFixed(0)}k`) : '-'}</div>
      </div>

      {/* Inline Editable Note */}
      <div className="mt-1 bg-[#FAF7F2] border border-[#E6E2DA] p-2 rounded-sm group relative">
        {editingNoteId === lead.id ? (
          <div className="flex items-start gap-1">
            <textarea 
              autoFocus
              value={tempNote}
              onChange={(e) => setTempNote(e.target.value)}
              className="w-full text-[10px] bg-transparent border-none p-0 focus:ring-0 resize-none h-10 text-[#1D1C17]"
            />
            <div className="flex flex-col gap-1 shrink-0">
              <button onClick={() => saveNote(lead.id)} className="text-[#0F5B3E] hover:bg-[#E6F0EC] p-0.5"><Check size={12} /></button>
              <button onClick={() => setEditingNoteId(null)} className="text-[#D9467A] hover:bg-[#FCEEF3] p-0.5"><X size={12} /></button>
            </div>
          </div>
        ) : (
          <div 
            onClick={() => startEditingNote(lead)}
            className="text-[10px] text-[#5E6460] cursor-text min-h-[20px] pr-4 line-clamp-2"
          >
            <span className="font-bold text-[#1D1C17]">Next:</span> {lead.next_action_note || 'Add note...'}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#FAF7F2] font-sans text-[#1D1C17]">
      {/* Top Bar */}
      <div className="bg-[#FFFFFF] border-b border-[#E6E2DA] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Lead Pipeline</h2>
          <p className="text-xs text-[#5E6460] font-medium mt-0.5">Drag and drop leads to update stages</p>
        </div>
        <button 
          onClick={() => setShowQuickLog(!showQuickLog)}
          className="flex items-center justify-center gap-2 bg-[#0F5B3E] text-white px-4 py-2 rounded-sm text-sm font-bold hover:bg-[#0c4931] transition-colors whitespace-nowrap"
        >
          <Plus size={16} /> Quick-Log Lead
        </button>
      </div>

      {/* Quick-Log Input Bar */}
      {showQuickLog && (
        <form onSubmit={handleQuickLogSubmit} className="bg-[#E6F0EC] border-b border-[#0F5B3E]/20 p-3 flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0F5B3E] mb-1">Client Name</label>
            <input type="text" required value={quickLogData.name} onChange={e => setQuickLogData({...quickLogData, name: e.target.value})} className="w-full h-9 px-3 border border-[#0F5B3E]/20 focus:outline-none focus:border-[#0F5B3E] text-sm bg-[#FFFFFF]" placeholder="e.g. Usman Tariq" />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0F5B3E] mb-1">WhatsApp / Phone</label>
            <input type="tel" required value={quickLogData.phone} onChange={e => setQuickLogData({...quickLogData, phone: e.target.value})} className="w-full h-9 px-3 border border-[#0F5B3E]/20 focus:outline-none focus:border-[#0F5B3E] text-sm bg-[#FFFFFF]" placeholder="+92 3..." />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0F5B3E] mb-1">Target Date</label>
            <input type="date" value={quickLogData.event_date} onChange={e => setQuickLogData({...quickLogData, event_date: e.target.value})} className="w-full h-9 px-3 border border-[#0F5B3E]/20 focus:outline-none focus:border-[#0F5B3E] text-sm bg-[#FFFFFF]" />
          </div>
          <button type="submit" className="h-9 bg-[#0F5B3E] text-white px-6 font-bold text-sm hover:bg-[#0c4931] shrink-0 border border-[#0F5B3E]">
            Save
          </button>
        </form>
      )}

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto p-4 flex gap-4 items-start min-h-[600px]">
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
                <span className="bg-[#FAF7F2] border border-[#E6E2DA] text-[#5E6460] text-[10px] font-black px-2 py-0.5 rounded-full">
                  {stageLeads.length}
                </span>
              </div>
              
              {/* Cards Container */}
              <div className="p-2 space-y-2 overflow-y-auto flex-1 min-h-[150px]">
                {stageLeads.map(renderLeadCard)}
                {stageLeads.length === 0 && (
                  <div className="text-center p-4 border-2 border-dashed border-[#E6E2DA] text-[#5E6460] text-[10px] font-bold uppercase tracking-wider">
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
