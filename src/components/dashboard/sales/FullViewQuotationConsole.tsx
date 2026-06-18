'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { Printer, Download, MessageCircle, Save, ArrowLeft, Link as LinkIcon, Send, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/types/supabase';

type EventRow = Database['public']['Tables']['events']['Row'] & {
  contact_events?: {
    contacts?: { name: string; phone: string | null } | null;
  }[] | null;
};

type ContactRow = Database['public']['Tables']['contacts']['Row'];

const PREDEFINED_MENUS = [
  {
    id: 'standard',
    name: 'Standard Package (PKR 3,500)',
    rate: 3500,
    items: 'Welcome Drink (Mint Margarita)\nChicken Karahi\nChicken Biryani\nNaan / Roti\nFresh Salad\nRaita\nGulab Jamun'
  },
  {
    id: 'gold',
    name: 'Gold Package (PKR 5,000)',
    rate: 5000,
    items: 'Welcome Drink (Pina Colada)\nMutton Karahi\nChicken Qorma\nChicken Biryani\nSeekh Kebab\nNaan / Roti\nFresh Russian Salad\nRaita\nKheer & Gulab Jamun'
  },
  {
    id: 'platinum',
    name: 'Platinum Package (PKR 8,500)',
    rate: 8500,
    items: 'Assorted Mocktails\nMutton Joint Roast\nMutton Qorma\nChicken Reshmi Kebab\nFish Tikka\nSpecial Mutton Biryani\nAssorted Naan (Garlic, Roghni)\nSalad Bar (6 types)\nRaita\nShahi Tukda\nIce Cream Bar'
  }
];

export function FullViewQuotationConsole() {
  const { organizationId, branchId } = useDashboard();
  const router = useRouter();
  const supabase = createClient();
  const printRef = useRef<HTMLDivElement>(null);

  const [isConfiguring, setIsConfiguring] = useState(true);
  const [mode, setMode] = useState<'QUOTATION' | 'INVOICE'>('QUOTATION');
  const [docStatus, setDocStatus] = useState<'draft' | 'under_review' | 'converted'>('draft');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [events, setEvents] = useState<EventRow[]>([]);
  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [selectedMenuId, setSelectedMenuId] = useState<string>('');
  const [existingQuoteId, setExistingQuoteId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    eventDate: '',
    targetHall: '',
    guestsCount: 100,
    baseRate: 5000,
    taxPercentage: 16,
    menuItems: 'Welcome Drinks\nAssorted Starters\nMain Course Buffet\nDesserts Station'
  });

  useEffect(() => {
    async function fetchData() {
      if (!organizationId) return;
      
      const [eventsRes, contactsRes] = await Promise.all([
        supabase
          .from('events')
          .select(`*, contact_events (contacts (name, phone))`)
          .eq('organization_id', organizationId)
          .order('start_datetime', { ascending: false }),
          
        supabase
          .from('contacts')
          .select('*')
          .eq('organization_id', organizationId)
          .order('name', { ascending: true })
      ]);

      if (!eventsRes.error && eventsRes.data) {
        setEvents(eventsRes.data as unknown as EventRow[]);
      }
      if (!contactsRes.error && contactsRes.data) {
        setContacts(contactsRes.data as ContactRow[]);
      }
    }
    fetchData();
  }, [organizationId, supabase]);

  const handleEventSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const eventId = e.target.value;
    setSelectedEventId(eventId);
    if (!eventId) return;

    const ev = events.find(x => x.id === eventId);
    if (ev) {
      const contact = ev.contact_events?.find(ce => ce.contacts?.name)?.contacts;
      const dateStr = ev.start_datetime ? ev.start_datetime.split('T')[0] : '';
      
      setFormData(prev => ({
        ...prev,
        customerName: contact?.name || '',
        customerPhone: contact?.phone || '',
        eventDate: dateStr,
        guestsCount: ev.guest_count || prev.guestsCount,
        targetHall: ev.name // Fallback for target hall
      }));
    }
  };

  const handleMenuSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const menuId = e.target.value;
    setSelectedMenuId(menuId);
    
    if (menuId) {
      const menu = PREDEFINED_MENUS.find(m => m.id === menuId);
      if (menu) {
        setFormData(prev => ({
          ...prev,
          baseRate: menu.rate,
          menuItems: menu.items
        }));
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Math Calculations
  const guests = Number(formData.guestsCount) || 0;
  const rate = Number(formData.baseRate) || 0;
  const taxPct = Number(formData.taxPercentage) || 0;
  
  const subtotal = guests * rate;
  const taxAmount = subtotal * (taxPct / 100);
  const grandTotal = subtotal + taxAmount;

  const formatPKR = (amount: number) => {
    return 'Rs: ' + new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(amount);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Item Description,Quantity,Unit Rate,Total Amount\n"
      + `Event Catering - ${formData.targetHall},${guests},${rate},${subtotal}\n`
      + `Menu Items: ${formData.menuItems.replace(/\n/g, ' | ')},,,`
      + `\n\nSubtotal,,,${subtotal}\n`
      + `GST (${taxPct}%),,,${taxAmount}\n`
      + `Grand Total,,,${grandTotal}\n`;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${mode}_${formData.customerName || 'Draft'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWhatsAppShare = () => {
    const text = `*NEXUS OPERATING SYSTEM*\n\n`
      + `Document: *${mode}*\n`
      + `Customer: ${formData.customerName}\n`
      + `Event Date: ${formData.eventDate}\n`
      + `Hall: ${formData.targetHall}\n\n`
      + `Guests: ${guests}\n`
      + `Base Rate: PKR ${rate.toLocaleString()}\n`
      + `*Subtotal:* PKR ${subtotal.toLocaleString()}\n`
      + `*Tax (${taxPct}%):* PKR ${taxAmount.toLocaleString()}\n`
      + `*GRAND TOTAL:* PKR ${grandTotal.toLocaleString()}\n\n`
      + `Thank you for your business.`;

    const url = `https://wa.me/${formData.customerPhone || ''}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const commitDataToDB = async (overrideStatus?: string) => {
    if (!organizationId) return null;
    
    const targetStatus = overrideStatus || docStatus;
    const targetTable = mode === 'QUOTATION' ? 'quotations' : 'invoices';
    
    const payload: any = {
      organization_id: organizationId,
      grand_total: grandTotal,
      tax_amount: taxAmount,
      total_amount: subtotal,
      status: targetStatus,
      event_id: selectedEventId || null,
      menu_tier_details: {
        items: formData.menuItems.split('\n'),
        target_hall: formData.targetHall,
        event_date: formData.eventDate,
        customer_name: formData.customerName,
        customer_phone: formData.customerPhone
      }
    };

    if (mode === 'QUOTATION') {
      payload.subtotal = subtotal;
      payload.estimated_guests = guests;
      if (!existingQuoteId) payload.quote_number = `QT-${Date.now().toString().slice(-6)}`;
    } else {
      payload.invoice_number = `INV-${Date.now().toString().slice(-6)}`;
    }

    let response;
    if (existingQuoteId && mode === 'QUOTATION') {
      response = await supabase.from('quotations').update(payload).eq('id', existingQuoteId).select().single();
    } else {
      response = await supabase.from(targetTable).insert(payload).select().single();
    }
    
    if (response.error) {
      console.error('Failed to commit document:', response.error);
      return null;
    }
    
    if (mode === 'QUOTATION' && !existingQuoteId && response.data) {
      setExistingQuoteId(response.data.id);
    }
    setDocStatus(targetStatus as any);
    return response.data;
  };

  const handleSubmitForReview = async () => {
    setIsProcessing(true);
    const data = await commitDataToDB('under_review');
    setIsProcessing(false);
    if (data) {
      alert('Document submitted for review and locked.');
      setIsConfiguring(false); // Move to preview mode
    }
  };

  const handleApproveAndCreateInvoice = async () => {
    setIsProcessing(true);
    // 1. Update quotation to converted
    if (existingQuoteId) {
      await supabase.from('quotations').update({ status: 'converted' }).eq('id', existingQuoteId);
    }
    
    // 2. Insert into Invoices
    setMode('INVOICE');
    const invData = await commitDataToDB('unpaid');
    setIsProcessing(false);
    if (invData) {
      alert('Invoice created successfully!');
      router.push('/dashboard/sales');
    }
  };

  const isLocked = docStatus === 'under_review' || docStatus === 'converted';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] font-sans">
      
      {/* Global Header Action Toolbar Layout */}
      <div className="bg-[#FFFFFF] border-b border-[#E6E2DA] px-6 py-4 flex flex-col md:flex-row md:items-center justify-between shrink-0 gap-4 print:hidden z-10 sticky top-0">
        
        <div className="flex items-center gap-6 flex-1">
          <button onClick={() => router.back()} className="text-[#5E6460] hover:text-[#1D1C17] transition-colors shrink-0">
            <ArrowLeft size={20} />
          </button>
          
          <h1 className="text-xl font-black text-[#1D1C17] uppercase tracking-wider shrink-0">DOCUMENT COMPOSITION MATRIX</h1>
          
          <div className="h-8 w-px bg-[#E6E2DA] hidden md:block"></div>
          
          <div className="flex items-center gap-3 bg-[#FAF7F2] border border-[#E6E2DA] p-1 flex-1 max-w-md">
            <LinkIcon size={14} className="text-[#0F5B3E] ml-2 shrink-0" />
            <select 
              value={selectedEventId}
              onChange={handleEventSelect}
              disabled={isLocked}
              className="w-full bg-transparent text-sm font-bold text-[#1D1C17] focus:outline-none uppercase tracking-widest disabled:opacity-50"
            >
              <option value="">Auto-Fill from Project/Event</option>
              {events.map(ev => (
                <option key={ev.id} value={ev.id}>{ev.name} ({ev.start_datetime?.split('T')[0] || 'TBD'})</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={handlePrint} className="bg-[#FFFFFF] text-[#0F5B3E] px-4 py-2 text-[10px] font-black uppercase tracking-wider flex items-center gap-2 hover:bg-[#FAF7F2] transition-colors border border-[#E6E2DA]">
            <Printer size={14} /> Print / Save PDF
          </button>
          <button onClick={handleDownloadCSV} className="bg-[#FFFFFF] text-[#0F5B3E] px-4 py-2 text-[10px] font-black uppercase tracking-wider flex items-center gap-2 hover:bg-[#FAF7F2] transition-colors border border-[#E6E2DA]">
            <Download size={14} /> Download CSV
          </button>
          <button onClick={handleWhatsAppShare} className="bg-[#FFFFFF] text-[#0F5B3E] px-4 py-2 text-[10px] font-black uppercase tracking-wider flex items-center gap-2 hover:bg-[#FAF7F2] transition-colors border border-[#E6E2DA]">
            <MessageCircle size={14} /> Share WhatsApp
          </button>
          {!isLocked && (
            <button 
              onClick={handleSubmitForReview} 
              disabled={isProcessing} 
              className="bg-[#0F5B3E] text-white px-6 py-2 text-[10px] font-black uppercase tracking-wider flex items-center gap-2 hover:bg-[#0A422D] transition-colors border border-[#0F5B3E] disabled:opacity-50 ml-2"
            >
              <Send size={14} /> {isProcessing ? 'Processing...' : 'Submit for Review'}
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* CONFIGURATION STEP */}
        {isConfiguring && (
          <div className="w-full flex-1 bg-[#FAF7F2] overflow-y-auto print:hidden p-6 lg:p-12">
            <div className="max-w-6xl mx-auto w-full bg-[#FFFFFF] border border-[#E6E2DA] p-8 lg:p-12 shadow-none">
              
              <div className="space-y-10">
                
                {/* Mode Selector */}
                <div>
                  <h2 className="text-sm font-black text-[#1D1C17] uppercase tracking-widest border-b border-[#1D1C17] pb-3 mb-6">Document Classification</h2>
                  <div className="flex gap-3 max-w-sm">
                    <button 
                      onClick={() => setMode('QUOTATION')}
                      disabled={isLocked}
                      className={`flex-1 py-3 text-xs font-black uppercase tracking-widest border transition-colors ${mode === 'QUOTATION' ? 'bg-[#0F5B3E] text-white border-[#0F5B3E]' : 'bg-[#FAF7F2] text-[#5E6460] border-[#E6E2DA] hover:border-[#0F5B3E]/50'} disabled:opacity-50`}
                    >
                      Quotation
                    </button>
                    <button 
                      onClick={() => setMode('INVOICE')}
                      disabled={isLocked}
                      className={`flex-1 py-3 text-xs font-black uppercase tracking-widest border transition-colors ${mode === 'INVOICE' ? 'bg-[#0F5B3E] text-white border-[#0F5B3E]' : 'bg-[#FAF7F2] text-[#5E6460] border-[#E6E2DA] hover:border-[#0F5B3E]/50'} disabled:opacity-50`}
                    >
                      Invoice
                    </button>
                  </div>
                </div>

                {/* Client Details */}
                <div>
                  <h2 className="text-sm font-black text-[#1D1C17] uppercase tracking-widest border-b border-[#1D1C17] pb-3 mb-6">Linked Client Details & Event Targeting</h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-[#5E6460] uppercase tracking-wider mb-2">Customer Name</label>
                      <input 
                        type="text" 
                        name="customerName" 
                        value={formData.customerName} 
                        onChange={handleInputChange} 
                        disabled={isLocked}
                        list="contacts-list"
                        className="w-full bg-[#FAF7F2] border border-[#E6E2DA] p-3 text-base font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] rounded-none disabled:opacity-60 disabled:cursor-not-allowed" 
                        placeholder="Select or type..." 
                      />
                      <datalist id="contacts-list">
                        {contacts.map(c => (
                          <option key={c.id} value={c.name} />
                        ))}
                      </datalist>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-[#5E6460] uppercase tracking-wider mb-2">Phone Contact</label>
                      <input type="text" name="customerPhone" value={formData.customerPhone} onChange={handleInputChange} disabled={isLocked} className="w-full bg-[#FAF7F2] border border-[#E6E2DA] p-3 text-base font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] rounded-none disabled:opacity-60 disabled:cursor-not-allowed" placeholder="+92 300 0000000" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-[#5E6460] uppercase tracking-wider mb-2">Target Hall</label>
                      <input type="text" name="targetHall" value={formData.targetHall} onChange={handleInputChange} disabled={isLocked} className="w-full bg-[#FAF7F2] border border-[#E6E2DA] p-3 text-base font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] rounded-none disabled:opacity-60 disabled:cursor-not-allowed" placeholder="E.g. Grand Emerald" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-[#5E6460] uppercase tracking-wider mb-2">Event Date</label>
                      <input type="date" name="eventDate" value={formData.eventDate} onChange={handleInputChange} disabled={isLocked} className="w-full bg-[#FAF7F2] border border-[#E6E2DA] p-3 text-base font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] rounded-none disabled:opacity-60 disabled:cursor-not-allowed" />
                    </div>
                  </div>
                </div>

                {/* Financial Parameters */}
                <div>
                  <h2 className="text-sm font-black text-[#1D1C17] uppercase tracking-widest border-b border-[#1D1C17] pb-3 mb-6">Financial Parameters Grid</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-[#5E6460] uppercase tracking-wider mb-2">Guest Volume</label>
                      <input type="number" name="guestsCount" value={formData.guestsCount} onChange={handleInputChange} disabled={isLocked} className="w-full bg-[#FAF7F2] border border-[#E6E2DA] p-4 text-2xl font-black text-[#0F5B3E] focus:outline-none focus:border-[#0F5B3E] rounded-none disabled:opacity-60 disabled:cursor-not-allowed" min="1" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#5E6460] uppercase tracking-wider mb-2">Per-Head Rate Base (PKR)</label>
                      <input type="number" name="baseRate" value={formData.baseRate} onChange={handleInputChange} disabled={isLocked} className="w-full bg-[#FAF7F2] border border-[#E6E2DA] p-4 text-2xl font-black text-[#0F5B3E] focus:outline-none focus:border-[#0F5B3E] rounded-none disabled:opacity-60 disabled:cursor-not-allowed" min="0" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#D9467A] uppercase tracking-wider mb-2">GST Tax Percentage (%)</label>
                      <input type="number" name="taxPercentage" value={formData.taxPercentage} onChange={handleInputChange} disabled={isLocked} className="w-full bg-[#FFF0F5] border border-[#D9467A]/30 p-4 text-2xl font-black text-[#D9467A] focus:outline-none focus:border-[#D9467A] rounded-none disabled:opacity-60 disabled:cursor-not-allowed" min="0" max="100" />
                    </div>
                  </div>
                </div>

                {/* Menu Specifications */}
                <div>
                  <div className="flex justify-between items-end border-b border-[#1D1C17] pb-3 mb-6">
                    <h2 className="text-sm font-black text-[#1D1C17] uppercase tracking-widest">Itemized Menu & Specification Grid</h2>
                    
                    <div className="w-64">
                      <select 
                        value={selectedMenuId}
                        onChange={handleMenuSelect}
                        disabled={isLocked}
                        className="w-full bg-[#FAF7F2] border border-[#E6E2DA] p-2 text-[10px] font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] rounded-none uppercase tracking-widest cursor-pointer disabled:opacity-50"
                      >
                        <option value="">-- Apply Pre-defined Package --</option>
                        {PREDEFINED_MENUS.map(m => (
                          <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#5E6460] uppercase tracking-wider mb-2">Specification Grid (One per line)</label>
                    <textarea 
                      name="menuItems" 
                      value={formData.menuItems} 
                      onChange={handleInputChange} 
                      disabled={isLocked}
                      rows={8}
                      className="w-full bg-[#FAF7F2] border border-[#E6E2DA] p-5 text-sm font-medium text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] rounded-none resize-none leading-relaxed disabled:opacity-60 disabled:cursor-not-allowed" 
                    />
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-[#E6E2DA] flex justify-end">
                  <button 
                    onClick={() => setIsConfiguring(false)}
                    className="bg-[#1D1C17] text-white px-10 py-5 text-sm font-black uppercase tracking-widest hover:bg-[#333129] transition-colors border border-[#1D1C17] shadow-none"
                  >
                    Finalize & Preview Document
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* PREVIEW & STATE STEP */}
        <div className={`w-full flex-1 bg-[#FAF7F2] overflow-y-auto p-8 flex flex-col items-center print:p-0 print:block print:bg-white print:overflow-visible ${isConfiguring ? 'hidden print:block' : 'flex'}`}>
          
          {!isConfiguring && (
            <div className="w-full max-w-[850px] mb-6 flex justify-start print:hidden">
              <button 
                onClick={() => setIsConfiguring(true)}
                className="bg-[#FFFFFF] text-[#1D1C17] px-6 py-3 text-xs font-black uppercase tracking-widest border border-[#1D1C17] hover:bg-[#FAF7F2] transition-colors shadow-none"
              >
                &larr; Return to Configuration Step
              </button>
            </div>
          )}

          {/* Workflow Approval Box */}
          {!isConfiguring && docStatus === 'under_review' && (
            <div className="w-full max-w-[850px] mb-6 bg-[#E6F0EC] border-2 border-[#0F5B3E] p-6 flex items-center justify-between print:hidden">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-[#0F5B3E] w-8 h-8" />
                <div>
                  <h3 className="text-sm font-black text-[#0F5B3E] uppercase tracking-wider">Pending Approval Review</h3>
                  <p className="text-xs font-bold text-[#0F5B3E]/80 uppercase mt-0.5">This quotation is locked for administrative review.</p>
                </div>
              </div>
              <button 
                onClick={handleApproveAndCreateInvoice}
                disabled={isProcessing}
                className="bg-[#0F5B3E] text-[#FFFFFF] px-6 py-3 text-xs font-black uppercase tracking-widest border border-[#0F5B3E] hover:bg-[#0A422D] transition-colors shadow-none disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'APPROVE & CREATE INVOICE'}
              </button>
            </div>
          )}
          
          <div ref={printRef} className="w-full max-w-[850px] bg-[#FFFFFF] border border-[#E6E2DA] shadow-none p-12 min-h-[1056px] flex flex-col print:border-none print:shadow-none print:m-0 print:p-0 relative">
            
            {/* Document Header Block */}
            <div className="flex justify-between items-start border-b-2 border-[#1D1C17] pb-8 mb-8">
              <div>
                <h1 className="text-3xl font-black text-[#1D1C17] tracking-tighter" style={{ fontFamily: 'var(--font-plus-jakarta-sans, sans-serif)' }}>
                  NEXUS OPERATING SYSTEM
                </h1>
                <p className="text-xs font-bold text-[#5E6460] uppercase tracking-widest mt-2">
                  Global Enterprise Branch • Document Control
                </p>
                <div className="mt-8">
                  <h3 className="text-[10px] font-black text-[#5E6460] uppercase tracking-widest mb-1">Billed To</h3>
                  <p className="text-lg font-black text-[#1D1C17] uppercase tracking-wider">{formData.customerName || 'N/A'}</p>
                  <p className="text-sm text-[#5E6460] font-medium mt-1">Phone: {formData.customerPhone || 'N/A'}</p>
                  <p className="text-sm text-[#5E6460] font-medium mt-1">Event Target: {formData.targetHall || 'TBD'}</p>
                  <p className="text-sm text-[#5E6460] font-medium">Date: {formData.eventDate || 'TBD'}</p>
                </div>
              </div>
              <div className="text-right">
                <h2 className="text-4xl font-black text-[#0F5B3E] uppercase tracking-tighter mb-4">{mode}</h2>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-[#5E6460] uppercase tracking-wider">
                    <span className="inline-block w-24 text-[#1D1C17]">Ref Number:</span> 
                    DOC-{Date.now().toString().slice(-6)}
                  </p>
                  <p className="text-xs font-bold text-[#5E6460] uppercase tracking-wider">
                    <span className="inline-block w-24 text-[#1D1C17]">Issue Date:</span> 
                    {new Date().toLocaleDateString('en-US')}
                  </p>
                  <p className="text-xs font-bold text-[#5E6460] uppercase tracking-wider">
                    <span className="inline-block w-24 text-[#1D1C17]">Status:</span> 
                    <span className={docStatus === 'under_review' ? 'text-[#D9467A]' : 'text-[#0F5B3E]'}>{docStatus.replace('_', ' ')}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Document Mid Section Data Grid */}
            <div className="flex-1">
              <table className="w-full text-left border-collapse mb-8">
                <thead>
                  <tr className="border-y-2 border-[#1D1C17] bg-[#FAF7F2]">
                    <th className="py-3 px-4 text-[10px] font-black text-[#1D1C17] uppercase tracking-widest w-1/2">Item Description</th>
                    <th className="py-3 px-4 text-[10px] font-black text-[#1D1C17] uppercase tracking-widest text-center">Qty/Guests</th>
                    <th className="py-3 px-4 text-[10px] font-black text-[#1D1C17] uppercase tracking-widest text-right">Unit Rate</th>
                    <th className="py-3 px-4 text-[10px] font-black text-[#1D1C17] uppercase tracking-widest text-right">Total Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E2DA]">
                  <tr>
                    <td className="py-6 px-4 align-top">
                      <p className="text-sm font-black text-[#1D1C17] mb-2 uppercase tracking-wide">Event Catering Services</p>
                      <ul className="text-xs text-[#5E6460] space-y-1.5 list-disc pl-4 font-medium">
                        {formData.menuItems.split('\n').map((item, idx) => item.trim() && <li key={idx}>{item}</li>)}
                      </ul>
                    </td>
                    <td className="py-6 px-4 align-top text-sm font-bold text-[#1D1C17] text-center">{guests}</td>
                    <td className="py-6 px-4 align-top text-sm font-bold text-[#1D1C17] text-right">{rate.toLocaleString()}</td>
                    <td className="py-6 px-4 align-top text-sm font-black text-[#1D1C17] text-right">{subtotal.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Document Bottom Total Ledger Grid */}
            <div className="w-[350px] self-end mt-auto">
              <div className="border-t-2 border-[#1D1C17] pt-4 space-y-3">
                <div className="flex justify-between items-center text-sm font-bold text-[#5E6460]">
                  <span className="uppercase tracking-wider">Subtotal</span>
                  <span>{formatPKR(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-[#D9467A]">
                  <span className="uppercase tracking-wider">Calculated Tax ({taxPct}%)</span>
                  <span>{formatPKR(taxAmount)}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-[#E6E2DA]">
                  <span className="text-lg font-black text-[#1D1C17] uppercase tracking-wider">Grand Total</span>
                  <span className="text-xl font-black text-[#0F5B3E] bg-[#E6F0EC] px-3 py-1 border border-[#0F5B3E]/20">
                    {formatPKR(grandTotal)}
                  </span>
                </div>
              </div>
            </div>

            {/* Document Footer */}
            <div className="mt-16 pt-8 border-t border-[#E6E2DA] text-center">
              <p className="text-[9px] font-black text-[#5E6460] uppercase tracking-widest">
                This document is generated by NEXUS OS and is electronically validated. No physical signature is required.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
