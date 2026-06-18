'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { createClient } from '@/lib/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Trash2, GripVertical, Plus, AlignLeft, LibraryBig, LayoutList, ChevronDown, Search, RefreshCcw, ArrowLeft, Printer, Download, Check } from 'lucide-react';
import type { Database } from '@/types/supabase';

type EventRow = Database['public']['Tables']['events']['Row'] & {
  contact_events?: {
    contacts?: { name: string; phone: string | null; office_address: string | null } | null;
  }[] | null;
};

type OrderLine = {
  id: string;
  type: 'product' | 'section' | 'note';
  name: string;
  description: string;
  quantity: number;
  unit_price: number;
  tax: number;
  subtotal: number;
};

const MOCK_CATALOG = [
  { id: '1', name: 'Marquee / Hall Rental', description: 'Exclusive Venue Reservation - A premium, climate-controlled setting for an unforgettable 3-hour experience.', type: 'rental', unit_price: 150000, tax_rate: 16, is_active: true },
  { id: '2', name: 'Standard Menu (Per Head)', description: 'Curated Signature Menu featuring locally sourced ingredients: Chicken Karahi, Biryani, Naan, Fresh Greens, Mint Raita, and Artisanal Gulab Jamun', type: 'package', unit_price: 3500, tax_rate: 16, is_active: true },
  { id: '3', name: 'Premium Stage Decor', description: 'Bespoke Floral Stage Artistry - Custom-designed fresh floral arrangements paired with ambient premium lighting', type: 'product', unit_price: 150000, tax_rate: 16, is_active: true },
  { id: '4', name: 'Live DJ & Sound', description: 'Immersive Audio Experience - Professional-grade acoustic sound system managed by our expert DJ', type: 'service', unit_price: 35000, tax_rate: 16, is_active: true },
];

export function ERPSalesOrderConsole() {
  const { organizationId } = useDashboard();
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const printRef = useRef<HTMLDivElement>(null);

  const [docStatus, setDocStatus] = useState<'draft' | 'under_review' | 'approved' | 'converted'>('draft');
  const [isProcessing, setIsProcessing] = useState(false);
  const [viewMode, setViewMode] = useState<'configure' | 'preview'>('configure');
  const [existingQuoteId, setExistingQuoteId] = useState<string | null>(null);

  const [addonsOpen, setAddonsOpen] = useState(true);
  const [termsOpen, setTermsOpen] = useState(false);

  const [events, setEvents] = useState<EventRow[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [allContacts, setAllContacts] = useState<any[]>([]);

  const [catalog, setCatalog] = useState<any[]>([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const [formData, setFormData] = useState({
    customerName: '',
    customerAddress: '',
    customerPhone: '',
    customerEmail: '',
    targetHall: '',
    eventDate: '',
    eventType: 'Wedding (Barat/Walima)',
    expirationDate: '',
    pricelistTier: 'Standard PKR Pricelist',
    paymentTerms: '50% Advance Booking / 50% Before Event',
    menuItems: '',
    internalNotes: `TERMS & CONDITIONS
1. The Grand Investment: The total amount reflects your investment in a premium, stress-free event experience managed entirely by our expert team.
2. Cancellation Policy: Cancellations made 30 days prior to the event are eligible for a 50% refund. Cancellations within 30 days are non-refundable.
3. Force Majeure: Antigravity is not liable for disruptions caused by unforeseen natural disasters, government mandates, or emergencies beyond our control.
4. Responsibility for Damages: The client assumes full responsibility for any structural or aesthetic damages to the venue caused by guests or external vendors.
5. Why Antigravity?: Seamless end-to-end management, dedicated event coordinator support, and a commitment to flawless execution.`,
  });

  const [optionalProducts, setOptionalProducts] = useState([
    { id: 'op1', product: 'Premium Stage Decor', description: 'Bespoke Floral Stage Artistry - Custom-designed arrangements', quantity: 1, unit_price: 150000 },
    { id: 'op2', product: 'Live DJ & Sound', description: 'Immersive Audio Experience - Managed by our expert DJ', quantity: 1, unit_price: 35000 },
    { id: 'op3', product: 'Photography / Videography', description: 'Cinematic Visual Storytelling - Drone coverage and cinematic video', quantity: 1, unit_price: 80000 }
  ]);

  const [orderLines, setOrderLines] = useState<OrderLine[]>([
    { id: 'sec1', type: 'section', name: 'Venue Booking', description: '', quantity: 0, unit_price: 0, tax: 0, subtotal: 0 },
    { id: '1', type: 'product', name: 'Marquee / Hall Rental', description: 'Exclusive Venue Reservation - A premium, climate-controlled setting for an unforgettable 3-hour experience.', quantity: 1, unit_price: 150000, tax: 16, subtotal: 150000 },
    { id: 'blank1', type: 'product', name: '', description: '', quantity: 1, unit_price: 0, tax: 16, subtotal: 0 },
    { id: 'sec2', type: 'section', name: 'Catering Services', description: '', quantity: 0, unit_price: 0, tax: 0, subtotal: 0 },
    { id: '2', type: 'product', name: 'Standard Menu (Per Head)', description: 'Curated Signature Menu featuring locally sourced ingredients: Chicken Karahi, Biryani, Naan, Fresh Greens, Mint Raita, and Artisanal Gulab Jamun', quantity: 500, unit_price: 3500, tax: 16, subtotal: 1750000 },
    { id: 'blank2', type: 'product', name: '', description: '', quantity: 1, unit_price: 0, tax: 16, subtotal: 0 }
  ]);

  const [showTaxColumn, setShowTaxColumn] = useState(true);
  const [discountType, setDiscountType] = useState<'none' | 'percentage' | 'lumpsum'>('none');
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [couponCode, setCouponCode] = useState<string>('');
  
  const [discountPopoverOpen, setDiscountPopoverOpen] = useState(false);
  const [couponPopoverOpen, setCouponPopoverOpen] = useState(false);

  // Autosave states
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'edited'>('saved');
  const isInitialMount = useRef(true);

  const loadCatalog = useCallback(async () => {
    if (!organizationId) {
      setCatalog(MOCK_CATALOG);
      return;
    }
    try {
      const { data: prodData, error: prodErr } = await supabase
        .from('products')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('is_active', true);

      // Fetch venues/halls by first getting branch IDs to avoid join relationship cache issues
      const { data: branchData } = await supabase
        .from('branches')
        .select('id')
        .eq('organization_id', organizationId);

      let venuesData: any = null;
      let venuesErr: any = null;
      
      if (branchData && branchData.length > 0) {
        const branchIds = branchData.map(b => b.id);
        const res = await supabase
          .from('rooms')
          .select('*')
          .in('branch_id', branchIds);
        venuesData = res.data;
        venuesErr = res.error;
      }

      const combined: any[] = [];
      if (!prodErr && prodData) combined.push(...prodData);
      
      if (!venuesErr && venuesData) {
        const mappedVenues = venuesData.map((v: any) => ({
          id: v.id,
          name: v.name,
          type: 'hall',
          description: `Venue Booking - Capacity: ${v.capacity || 'N/A'}`,
          unit_price: v.settings?.base_price || 0,
          tax_rate: 0
        }));
        combined.push(...mappedVenues);
      }

      if (combined.length > 0) {
        setCatalog(combined);
      } else {
        setCatalog(MOCK_CATALOG);
      }
    } catch (err) {
      setCatalog(MOCK_CATALOG);
    }
  }, [organizationId, supabase]);

  useEffect(() => {
    async function fetchData() {
      if (!organizationId) {
        setCatalog(MOCK_CATALOG);
        return;
      }

      const { data } = await supabase
        .from('events')
        .select(`*, contact_events(contacts(name, phone, office_address))`)
        .eq('organization_id', organizationId)
        .order('start_datetime', { ascending: false });

      if (data) setEvents(data as unknown as EventRow[]);

      const { data: contactsData } = await supabase
        .from('contacts')
        .select('*')
        .eq('organization_id', organizationId)
        .order('name', { ascending: true });

      if (contactsData) setAllContacts(contactsData);

      await loadCatalog();
    }
    fetchData();
  }, [organizationId, supabase, loadCatalog]);

  const editId = searchParams?.get('id');
  useEffect(() => {
    if (editId) {
      setExistingQuoteId(editId);
      supabase.from('quotations').select('*').eq('id', editId).single().then(({ data }) => {
        if (data) {
          setDocStatus(data.status as any);
          if (data.menu_tier_details) {
            const m = data.menu_tier_details as any;
            setFormData({
              customerName: m.customer_name || '',
              customerAddress: m.customer_address || '',
              customerPhone: m.customer_phone || '',
              customerEmail: m.customer_email || '',
              targetHall: m.target_hall || '',
              eventDate: m.event_date || '',
              eventType: m.event_type || 'Wedding (Barat/Walima)',
              expirationDate: m.expiration_date || '',
              pricelistTier: m.pricelist_tier || 'Standard PKR Pricelist',
              paymentTerms: m.payment_terms || '50% Advance Booking / 50% Before Event',
              internalNotes: m.internal_notes || '1. Event time is strictly 3 hours.\n2. Outside catering is not allowed.\n3. Fireworks are strictly prohibited inside the hall.',
              menuItems: m.menu_items || '',
            });
            if (m.order_lines) setOrderLines(m.order_lines);
          }
          if (data.event_id) setSelectedEventId(data.event_id);
        }
      });
    }
  }, [editId, supabase]);

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
        customerAddress: contact?.office_address || '',
        customerPhone: contact?.phone || '',
        eventDate: dateStr,
        targetHall: ev.name || ''
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => {
        const next = { ...prev, [name]: value };
        
        // Auto-fill details if they pick a known customer
        if (name === 'customerName' && value.trim()) {
          const contact = allContacts.find(c => c.name?.toLowerCase() === value.toLowerCase());
          if (contact) {
            if (contact.phone && !prev.customerPhone) next.customerPhone = contact.phone;
            if (contact.office_address && !prev.customerAddress) next.customerAddress = contact.office_address;
          }
        }
        
        return next;
      });
    }
  };

  const handleCustomerDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === 'NEW_CUSTOMER') {
      window.open('/dashboard/contacts', '_blank');
      return;
    }
    
    const contact = allContacts.find(c => c.name === val);
    if (contact) {
      setFormData(prev => ({
        ...prev,
        customerName: contact.name || val,
        customerPhone: contact.phone || contact.personal_phone || '',
        customerEmail: contact.email || '',
        customerAddress: contact.office_address || contact.home_address || ''
      }));
    } else {
      setFormData(prev => ({ ...prev, customerName: val }));
    }
  };

  const handleAddLine = (type: 'product' | 'section' | 'note') => {
    setOrderLines(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        type,
        name: type === 'section' ? 'New Section' : type === 'note' ? 'Internal Note...' : 'New Product',
        description: '',
        quantity: type === 'product' ? 1 : 0,
        unit_price: type === 'product' ? 0 : 0,
        tax: type === 'product' ? 16 : 0,
        subtotal: 0
      }
    ]);
  };

  const handleRemoveLine = (id: string) => {
    setOrderLines(prev => prev.filter(line => line.id !== id));
  };

  const [draggedLineId, setDraggedLineId] = useState<string | null>(null);
  const [dragOverLineId, setDragOverLineId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedLineId(id);
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverLineId !== id && draggedLineId !== id) {
      setDragOverLineId(id);
    }
  };

  const handleDragEnd = () => {
    setDraggedLineId(null);
    setDragOverLineId(null);
  };

  const handleDrop = (e: React.DragEvent, dropTargetId: string) => {
    e.preventDefault();
    if (!draggedLineId || draggedLineId === dropTargetId) {
      handleDragEnd();
      return;
    }

    setOrderLines(prev => {
      const draggedIdx = prev.findIndex(l => l.id === draggedLineId);
      const dropIdx = prev.findIndex(l => l.id === dropTargetId);
      
      if (draggedIdx === -1 || dropIdx === -1) return prev;
      
      const newLines = [...prev];
      const [draggedItem] = newLines.splice(draggedIdx, 1);
      
      // Insert at the new index
      newLines.splice(dropIdx, 0, draggedItem);
      
      return newLines;
    });
    
    handleDragEnd();
  };

  const insertLineBelow = (targetId: string, type: OrderLine['type'] = 'product') => {
    setOrderLines(prev => {
      const idx = prev.findIndex(l => l.id === targetId);
      if (idx === -1) return prev;
      const newLines = [...prev];
      newLines.splice(idx + 1, 0, {
        id: Math.random().toString(36).substr(2, 9),
        type,
        name: '',
        description: '',
        quantity: 1,
        unit_price: 0,
        tax: 16,
        subtotal: 0
      });
      return newLines;
    });
  };

  const handleLineChange = (id: string, field: keyof OrderLine, value: any) => {
    setOrderLines(prev => prev.map(line => {
      if (line.id === id) {
        const updated = { ...line, [field]: value };
        if (updated.type === 'product' && (field === 'quantity' || field === 'unit_price')) {
          updated.subtotal = Number(updated.quantity) * Number(updated.unit_price);
        }
        return updated;
      }
      return line;
    }));
  };

  const computeTotals = () => {
    let subtotal = 0;
    let taxAmount = 0;
    orderLines.forEach(line => {
      if (line.type === 'product') {
        const lineSub = line.subtotal || 0;
        subtotal += lineSub;
        if (showTaxColumn) {
          taxAmount += lineSub * ((line.tax || 0) / 100);
        }
      }
    });

    let discountAmount = 0;
    if (discountType === 'percentage') {
      discountAmount = subtotal * ((discountValue || 0) / 100);
    } else if (discountType === 'lumpsum') {
      discountAmount = discountValue || 0;
    }

    return { subtotal, taxAmount, discountAmount, grandTotal: subtotal + taxAmount - discountAmount };
  };

  const { subtotal, taxAmount, discountAmount, grandTotal } = computeTotals();

  const handleSaveQuote = async (statusOverride?: string, showNotification = true) => {
    if (!organizationId) return null;
    setIsProcessing(true);

    const targetStatus = statusOverride || docStatus;

    const payload: any = {
      organization_id: organizationId,
      grand_total: grandTotal,
      tax_amount: taxAmount,
      total_amount: subtotal,
      subtotal: subtotal,
      status: targetStatus,
      event_id: selectedEventId || null,
      menu_tier_details: {
        customer_name: formData.customerName,
        customer_phone: formData.customerPhone,
        customer_email: formData.customerEmail,
        customer_address: formData.customerAddress,
        target_hall: formData.targetHall,
        event_date: formData.eventDate,
        event_type: formData.eventType,
        expiration_date: formData.expirationDate,
        pricelist_tier: formData.pricelistTier,
        payment_terms: formData.paymentTerms,
        internal_notes: formData.internalNotes,
        order_lines: orderLines
      }
    };

    let newQuoteId = existingQuoteId;
    if (existingQuoteId) {
      await supabase.from('quotations').update(payload).eq('id', existingQuoteId);
    } else {
      payload.quote_number = `QT-${Date.now().toString().slice(-6)}`;
      const { data } = await supabase.from('quotations').insert(payload).select().single();
      if (data) {
        newQuoteId = data.id;
        setExistingQuoteId(data.id);
      }
    }
    
    setDocStatus(targetStatus as any);
    setIsProcessing(false);
    
    if (showNotification) {
      alert(`Quotation ${targetStatus === 'draft' ? 'Draft Saved' : 'Updated to ' + targetStatus.replace('_', ' ')}`);
    }
    return { quoteId: newQuoteId, payload };
  };

  const handleConvertToInvoice = async () => {
    // First ensure it's saved as converted
    const result = await handleSaveQuote('converted', false);
    if (!result) return;
    
    setIsProcessing(true);
    const invPayload = {
      ...result.payload,
      quotation_id: result.quoteId,
      invoice_number: `INV-${Date.now().toString().slice(-6)}`,
      status: 'unpaid'
    };
    delete invPayload.quote_number;
    await supabase.from('invoices').insert(invPayload);

    setIsProcessing(false);
    alert('Converted to Invoice successfully! You can find it in the Invoices section.');
  };

  const isLocked = docStatus === 'approved' || docStatus === 'converted';
  const formatPKR = (amt: number) => 'Rs: ' + new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(Math.round(amt));

  // Autosave Hook
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    if (isLocked) return;

    setSaveStatus('edited');
    const timeoutId = setTimeout(() => {
      setSaveStatus('saving');
      handleSaveQuote(docStatus, false).then(() => {
        setSaveStatus('saved');
      });
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [formData, orderLines, selectedEventId, showTaxColumn, discountType, discountValue, couponCode, isLocked, docStatus]);

  // Chevron rendering logic
  const stages = ['Quotation', 'Quotation Sent', 'Sales Order'];
  const currentStageIndex = (docStatus === 'approved' || docStatus === 'converted') ? 2 : docStatus === 'under_review' ? 1 : 0;

  // Filter logic for Customer -> Events
  const uniqueCustomers = Array.from(new Set(allContacts.map(c => c.name).filter(Boolean)));
  const filteredEvents = formData.customerName 
    ? events.filter(ev => ev.contact_events?.[0]?.contacts?.name === formData.customerName)
    : events;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 font-sans pb-32">

      {/* Top-Edge Action Ribbon & Chevron Pipeline */}
      {/* Top-Edge Action Ribbon & Chevron Pipeline (Odoo Style) */}
      <div className="bg-white border-b border-slate-200 flex flex-col md:flex-row justify-between items-center px-6 py-3 shrink-0 print:hidden sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto">
          {/* Autosave Status */}
          <div className="mr-2 flex items-center min-w-[90px]">
            {saveStatus === 'saving' && <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium"><RefreshCcw size={12} className="animate-spin" /> Saving...</span>}
            {saveStatus === 'saved' && <span className="text-[11px] text-emerald-600 flex items-center gap-1 font-medium"><Check size={12} /> Saved</span>}
            {saveStatus === 'edited' && <span className="text-[11px] text-slate-400 font-medium">Unsaved changes</span>}
          </div>

          {/* Primary Actions */}
          <button 
            onClick={() => handleSaveQuote('under_review')} 
            disabled={isProcessing} 
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-[13px] font-medium rounded shadow-sm transition-colors whitespace-nowrap disabled:opacity-50"
          >
            Send by Email
          </button>
          <button 
            onClick={() => handleSaveQuote('under_review')}
            disabled={isProcessing} 
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-[13px] font-medium rounded shadow-sm transition-colors whitespace-nowrap disabled:opacity-50"
          >
            Send by WhatsApp
          </button>
          
          {/* Secondary Actions */}
          <button 
            onClick={() => handleSaveQuote('approved')} 
            disabled={isProcessing} 
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-4 py-2 text-[13px] font-medium rounded shadow-sm transition-colors whitespace-nowrap disabled:opacity-50 ml-1"
          >
            Confirm
          </button>
          <button 
            onClick={() => setViewMode(viewMode === 'preview' ? 'configure' : 'preview')} 
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-4 py-2 text-[13px] font-medium rounded shadow-sm transition-colors whitespace-nowrap ml-1"
          >
            {viewMode === 'preview' ? 'Exit Preview' : 'Preview'}
          </button>
        </div>

        {/* Odoo Style Arrowhead Pipeline */}
        <div className="hidden lg:flex items-stretch text-[13px] font-medium mt-4 md:mt-0 h-[34px]">
          {stages.map((stage, i) => {
            const isFirst = i === 0;
            const isLast = i === stages.length - 1;
            const isActive = i === currentStageIndex;
            
            // Odoo arrowhead geometry
            const clipPath = isFirst 
              ? 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)'
              : isLast 
              ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 12px 50%)'
              : 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%, 12px 50%)';

            return (
              <div 
                key={stage} 
                className={`relative flex items-stretch transition-colors ${!isFirst ? '-ml-[12px]' : ''}`}
                style={{ zIndex: 10 - i }}
              >
                {/* Outer Border Layer */}
                <div 
                  className={`flex items-center px-6 ${isActive ? 'bg-[#017e84]' : 'bg-white'}`}
                  style={{ clipPath }}
                >
                  <span className="opacity-0 px-2">{stage}</span>
                </div>

                {/* Inner Fill Layer */}
                <div 
                  className={`absolute top-[1px] bottom-[1px] right-[1px] ${isFirst ? 'left-[1px]' : 'left-0'} flex items-center justify-center ${isActive ? 'bg-[#ebf8f8] text-[#017e84] font-semibold' : 'bg-[#e9ecef] text-[#666666]'}`}
                  style={{ clipPath }}
                >
                  <span className={`px-2 whitespace-nowrap ${!isFirst ? 'pl-4' : ''}`}>{stage}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 lg:p-8">
        {viewMode === 'configure' && (
          <div className="max-w-[1400px] mx-auto w-full space-y-8 print:hidden">

            {/* Massive Title */}
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">{formData.customerName || 'New Quotation'}</h1>
              <p className="text-sm text-slate-500">Configure event details and construct the sales order below.</p>
            </div>

            {/* Step 1: Event & Customer Metadata */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Step 1: Event & Customer Details</h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-4">

                {/* Event Linkage */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Link Event (Project) <span className="text-rose-500">*</span></label>
                  <select
                    value={selectedEventId}
                    onChange={handleEventSelect}
                    disabled={isLocked}
                    className="bg-white border border-slate-200 focus:border-emerald-500 px-3 py-2 text-sm focus:outline-none rounded-md disabled:opacity-50 transition-colors text-slate-800"
                  >
                    <option value="">Select Project/Contact...</option>
                    {filteredEvents.map(ev => <option key={ev.id} value={ev.id}>{ev.name} ({ev.start_datetime?.split('T')[0] || 'TBD'})</option>)}
                  </select>
                </div>

                {/* Customer Core */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Customer Name <span className="text-rose-500">*</span></label>
                  <select
                    value={uniqueCustomers.includes(formData.customerName) ? formData.customerName : ''}
                    onChange={handleCustomerDropdownChange}
                    disabled={isLocked}
                    className="bg-white border border-slate-200 focus:border-emerald-500 px-3 py-2 text-sm focus:outline-none rounded-md disabled:opacity-50 transition-colors text-slate-800"
                  >
                    <option value="">Select an existing customer...</option>
                    {uniqueCustomers.map(c => <option key={c} value={c}>{c}</option>)}
                    <option value="NEW_CUSTOMER" className="font-bold text-emerald-600">+ Add New Customer...</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Phone <span className="text-rose-500">*</span></label>
                  <input type="text" name="customerPhone" value={formData.customerPhone} onChange={handleInputChange} disabled={isLocked} className="bg-white border border-slate-200 focus:border-emerald-500 px-3 py-2 text-sm focus:outline-none rounded-md disabled:opacity-50 transition-colors text-slate-800" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Email</label>
                  <input type="email" name="customerEmail" value={formData.customerEmail} onChange={handleInputChange} disabled={isLocked} className="bg-white border border-slate-200 focus:border-emerald-500 px-3 py-2 text-sm focus:outline-none rounded-md disabled:opacity-50 transition-colors text-slate-800" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Mailing Address</label>
                  <textarea name="customerAddress" value={formData.customerAddress} onChange={handleInputChange} disabled={isLocked} rows={1} className="bg-white border border-slate-200 focus:border-emerald-500 px-3 py-2 text-sm focus:outline-none rounded-md disabled:opacity-50 transition-colors text-slate-800 resize-none" />
                </div>

                {/* Target Data */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Target Hall / Marquee <span className="text-rose-500">*</span></label>
                  <input type="text" name="targetHall" value={formData.targetHall} onChange={handleInputChange} disabled={isLocked} className="bg-white border border-slate-200 focus:border-emerald-500 px-3 py-2 text-sm focus:outline-none rounded-md disabled:opacity-50 transition-colors text-slate-800" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Event Date <span className="text-rose-500">*</span></label>
                  <input type="date" name="eventDate" value={formData.eventDate} onChange={handleInputChange} disabled={isLocked} className="bg-white border border-slate-200 focus:border-emerald-500 px-3 py-2 text-sm focus:outline-none rounded-md disabled:opacity-50 transition-colors text-slate-800" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Event Type</label>
                  <select name="eventType" value={formData.eventType} onChange={handleInputChange} disabled={isLocked} className="bg-white border border-slate-200 focus:border-emerald-500 px-3 py-2 text-sm focus:outline-none rounded-md disabled:opacity-50 transition-colors text-slate-800">
                    <option value="Wedding (Barat/Walima)">Wedding (Barat/Walima)</option>
                    <option value="Mehndi / Mayoun">Mehndi / Mayoun</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Birthday / Party">Birthday / Party</option>
                  </select>
                </div>

                {/* Financial/Meta Terms */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Payment Terms</label>
                  <select name="paymentTerms" value={formData.paymentTerms} onChange={handleInputChange} disabled={isLocked} className="bg-white border border-slate-200 focus:border-emerald-500 px-3 py-2 text-sm focus:outline-none rounded-md disabled:opacity-50 transition-colors text-slate-800">
                    <option value="50% Advance Booking / 50% Before Event">50% Advance Booking / 50% Before Event</option>
                    <option value="100% Advance Payment">100% Advance Payment</option>
                    <option value="Net 15 Days Corporate">Net 15 Days Corporate</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Expiration Date</label>
                  <input type="date" name="expirationDate" value={formData.expirationDate} onChange={handleInputChange} disabled={isLocked} className="bg-white border border-slate-200 focus:border-emerald-500 px-3 py-2 text-sm focus:outline-none rounded-md disabled:opacity-50 transition-colors text-slate-800" />
                </div>

              </div>
            </div>

            {/* Step 2: Main Order Lines */}
            <div className="flex flex-col border border-slate-200 rounded-xl shadow-sm overflow-hidden bg-white">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2"><LayoutList size={16} className="text-emerald-600" /> Step 2: Main Order Lines</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wide font-bold text-slate-500 bg-white">
                      <th className="py-4 px-4 w-10"></th>
                      <th className="py-4 px-4 w-48">Product / Service</th>
                      <th className="py-4 px-4 w-64">Description</th>
                      <th className="py-4 px-4 text-right w-24">Quantity</th>
                      <th className="py-4 px-4 text-right w-32">Unit Price</th>
                      {showTaxColumn && <th className="py-4 px-4 text-center w-20">Taxes</th>}
                      <th className="py-4 px-4 text-right w-36">Subtotal</th>
                      <th className="py-4 px-4 w-12"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {orderLines.map((line) => (
                      <tr 
                        key={line.id} 
                        draggable={!isLocked}
                        onDragStart={(e) => handleDragStart(e, line.id)}
                        onDragOver={(e) => handleDragOver(e, line.id)}
                        onDragEnd={handleDragEnd}
                        onDrop={(e) => handleDrop(e, line.id)}
                        className={`group transition-all ${line.type === 'section' ? 'bg-slate-50 font-bold border-y border-slate-200' : line.type === 'note' ? 'italic text-slate-500' : 'text-slate-800 hover:bg-slate-50'} ${dragOverLineId === line.id ? 'border-t-2 border-t-emerald-500 bg-emerald-50/50' : ''} ${draggedLineId === line.id ? 'opacity-30' : ''}`}
                      >
                        <td className="py-4 px-2 text-center w-10">
                          <div className="flex flex-col items-center justify-center gap-1">
                            <span className="text-slate-300 group-hover:text-slate-500 cursor-grab"><GripVertical size={16} /></span>
                            {!isLocked && (
                              <button onClick={() => insertLineBelow(line.id, 'product')} className="text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 p-1 rounded transition-colors opacity-0 group-hover:opacity-100" title="Add line below">
                                <Plus size={14} />
                              </button>
                            )}
                          </div>
                        </td>

                        {line.type === 'section' ? (
                          <td colSpan={showTaxColumn ? 6 : 5} className="py-4 px-4">
                            <div className="flex items-center gap-2 group/section">
                              <input
                                type="text"
                                value={line.name}
                                onChange={(e) => handleLineChange(line.id, 'name', e.target.value)}
                                disabled={isLocked}
                                className="w-full bg-transparent font-bold focus:outline-none focus:border-b-2 border-emerald-500 text-slate-800 disabled:opacity-70 transition-colors"
                                placeholder="Section Name"
                              />
                              <button 
                                onClick={() => insertLineBelow(line.id, 'product')}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-all flex-shrink-0 border border-emerald-100 shadow-sm"
                                title="Add product under this section"
                              >
                                <Plus size={14} /> Add Line
                              </button>
                            </div>
                          </td>
                        ) : line.type === 'note' ? (
                          <td colSpan={showTaxColumn ? 6 : 5} className="py-4 px-4">
                            <input
                              type="text"
                              value={line.name}
                              onChange={(e) => handleLineChange(line.id, 'name', e.target.value)}
                              disabled={isLocked}
                              className="w-full bg-transparent focus:outline-none focus:border-b border-emerald-500 disabled:opacity-70 transition-colors"
                              placeholder="Type a note..."
                            />
                          </td>
                        ) : (
                          <>
                            <td className="py-4 px-4">
                              <select 
                                value={line.name || ''} 
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (val === '__add_custom__') {
                                    window.open('/dashboard/products/new', '_blank');
                                    handleLineChange(line.id, 'name', '');
                                    return;
                                  }
                                  handleLineChange(line.id, 'name', val);
                                  const wasEmpty = !line.name;
                                  const selectedItem = catalog.find(c => c.name === val);
                                  
                                  if (selectedItem) {
                                    handleLineChange(line.id, 'description', selectedItem.description || '');
                                    handleLineChange(line.id, 'unit_price', selectedItem.unit_price);
                                    handleLineChange(line.id, 'tax', selectedItem.tax_rate || 0);
                                    handleLineChange(line.id, 'quantity', 1); // Reset quantity
                                  }
                                  
                                  // UX Improvement: Auto-append new row directly below if this row was empty
                                  if (wasEmpty && val) {
                                    const currentIndex = orderLines.findIndex(l => l.id === line.id);
                                    const nextLine = orderLines[currentIndex + 1];
                                    const isNextLineBlank = nextLine && nextLine.type === 'product' && !nextLine.name;
                                    
                                    if (!isNextLineBlank) {
                                      insertLineBelow(line.id, 'product');
                                    }
                                  }
                                }}
                                disabled={isLocked}
                                className="w-full bg-transparent font-medium focus:outline-none border-b border-transparent hover:border-slate-300 focus:border-emerald-500 text-slate-800 disabled:opacity-70 transition-colors cursor-pointer pr-6 truncate"
                              >
                                <option value="" disabled>Select item...</option>
                                <option value="__add_custom__" className="font-bold text-emerald-600">+ Add Custom Item...</option>
                                {line.name && !catalog.some(c => c.name === line.name) && (
                                  <option value={line.name}>{line.name}</option>
                                )}
                                {catalog.map(item => (
                                  <option key={item.id} value={item.name}>{item.name}</option>
                                ))}
                              </select>
                            </td>
                            <td className="py-4 px-4">
                              <textarea
                                value={line.description}
                                onChange={(e) => handleLineChange(line.id, 'description', e.target.value)}
                                disabled={isLocked}
                                rows={1}
                                className="w-full bg-slate-50 focus:bg-white focus:outline-none border border-slate-200 focus:border-emerald-500 text-slate-700 disabled:opacity-70 resize-none overflow-hidden transition-colors rounded px-2 py-1"
                              />
                            </td>
                            <td className="py-4 px-4">
                              <input
                                type="number"
                                value={line.quantity}
                                onChange={(e) => handleLineChange(line.id, 'quantity', Number(e.target.value))}
                                disabled={isLocked}
                                className="w-full bg-slate-50 focus:bg-white text-right font-medium focus:outline-none border border-slate-200 focus:border-emerald-500 text-slate-800 disabled:opacity-70 transition-colors rounded px-2 py-1"
                              />
                            </td>
                            <td className="py-4 px-4">
                              <input
                                type="number"
                                value={line.unit_price}
                                onChange={(e) => handleLineChange(line.id, 'unit_price', Number(e.target.value))}
                                disabled={isLocked}
                                className="w-full bg-slate-50 focus:bg-white text-right font-medium focus:outline-none border border-slate-200 focus:border-emerald-500 text-slate-800 disabled:opacity-70 transition-colors rounded px-2 py-1"
                              />
                            </td>
                            {showTaxColumn && (
                              <td className="py-4 px-4 text-center">
                                <div className="relative inline-block w-16">
                                  <input
                                    type="number"
                                    value={line.tax}
                                    onChange={(e) => handleLineChange(line.id, 'tax', Number(e.target.value))}
                                    disabled={isLocked}
                                    className="w-full bg-slate-50 focus:bg-white text-right font-medium focus:outline-none border border-slate-200 focus:border-emerald-500 text-slate-800 disabled:opacity-70 transition-colors rounded px-2 py-1 pr-6"
                                  />
                                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold pointer-events-none">%</span>
                                </div>
                              </td>
                            )}
                            <td className="py-4 px-4 text-right font-bold text-slate-800 whitespace-nowrap">
                              {formatPKR(line.subtotal)}
                            </td>
                          </>
                        )}

                        <td className="py-4 px-4 text-right">
                          {!isLocked && (
                            <button onClick={() => handleRemoveLine(line.id)} className="text-slate-400 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-rose-50" title="Remove line">
                              <Trash2 size={16} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* UX Improvement 3: Refactored Action Links into Secondary Buttons */}
              {!isLocked && (
                <div className="bg-white px-6 py-5 flex flex-wrap items-center gap-3 border-t border-slate-200">
                  <button onClick={() => handleAddLine('product')} className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 border border-slate-200 rounded-md hover:bg-slate-200 transition-all shadow-sm">
                    <Plus size={16} /> Add Product
                  </button>
                  <button onClick={() => handleAddLine('section')} className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 border border-slate-200 rounded-md hover:bg-slate-200 transition-all shadow-sm">
                    <LayoutList size={16} /> Add Section
                  </button>
                  <button onClick={() => handleAddLine('note')} className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 border border-slate-200 rounded-md hover:bg-slate-200 transition-all shadow-sm">
                    <AlignLeft size={16} /> Add Note
                  </button>
                  <div className="relative ml-auto flex items-center gap-2">
                    <button onClick={loadCatalog} className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-all shadow-sm" title="Refresh Product List">
                      <RefreshCcw size={15} />
                    </button>
                    <button onClick={() => setPickerOpen(!pickerOpen)} className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-all shadow-sm">
                      <LibraryBig size={16} /> Open Catalog <ChevronDown size={14} className={`transition-transform ${pickerOpen ? 'rotate-180' : ''}`}/>
                    </button>
                    {pickerOpen && (
                      <div className="absolute right-0 bottom-full mb-2 w-[350px] bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden z-50 flex flex-col">
                        <div className="p-3 border-b border-slate-100 bg-slate-50 flex gap-2">
                          <div className="relative flex-1">
                            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input type="text" placeholder="Search catalog..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                          </div>
                          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="text-xs border border-slate-300 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                            <option value="all">All</option>
                            <option value="product">Products</option>
                            <option value="service">Services</option>
                            <option value="rental">Rentals</option>
                            <option value="package">Packages</option>
                          </select>
                        </div>
                        <div className="max-h-60 overflow-y-auto p-1.5">
                          {catalog.filter(c =>
                            (typeFilter === 'all' || c.type === typeFilter) &&
                            c.name.toLowerCase().includes(searchQuery.toLowerCase())
                          ).map(item => (
                            <button key={item.id} onClick={() => {
                              setOrderLines(prev => [...prev, {
                                id: Math.random().toString(36).substr(2, 9),
                                type: 'product',
                                name: item.name,
                                description: item.description || '',
                                quantity: 1,
                                unit_price: item.unit_price,
                                tax: item.tax_rate || 0,
                                subtotal: item.unit_price
                              }]);
                              setPickerOpen(false);
                            }} className="w-full flex items-center justify-between text-left px-3 py-2 rounded hover:bg-emerald-50 hover:text-emerald-700 transition-colors group">
                              <div className="flex flex-col">
                                <span className="text-xs font-semibold text-slate-800 group-hover:text-emerald-700">{item.name}</span>
                                <span className="text-[10px] text-slate-400 capitalize">{item.type}</span>
                              </div>
                              <span className="text-xs font-bold">{formatPKR(item.unit_price)}</span>
                            </button>
                          ))}
                          {catalog.length === 0 && <p className="text-xs text-center text-slate-400 py-4">No products in catalog.</p>}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ACCORDION STACK FOR EXTRA TERMS */}
            <div className="space-y-4">
              {/* Step 3: Add-on Services Matrix */}
              <div className="flex flex-col border border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden">
                <button
                  onClick={() => setAddonsOpen(!addonsOpen)}
                  className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between w-full text-left hover:bg-slate-100 transition-colors"
                >
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Step 3: Add-ons & Cross-Sells</h3>
                    <p className="text-xs text-slate-500 mt-1 font-normal">Suggest related services to increase total order value.</p>
                  </div>
                  <ChevronDown size={20} className={`text-slate-400 transition-transform ${addonsOpen ? 'rotate-180' : ''}`} />
                </button>
                {addonsOpen && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <tbody className="divide-y divide-slate-100">
                        {optionalProducts.map((line) => (
                          <tr key={line.id} className="text-slate-800 hover:bg-slate-50 transition-colors group">
                            <td className="py-4 px-6">
                              <p className="font-bold">{line.product}</p>
                              <p className="text-slate-500 text-xs mt-0.5">{line.description}</p>
                            </td>
                            <td className="py-4 px-6 text-right font-medium">{formatPKR(line.unit_price)}</td>
                            <td className="py-4 px-6 text-right w-32">
                              <button
                                disabled={isLocked}
                                className="flex items-center justify-end gap-1.5 text-emerald-600 hover:text-emerald-700 font-bold text-sm disabled:opacity-50 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => {
                                  setOrderLines(prev => [...prev, {
                                    id: Math.random().toString(36).substr(2, 9),
                                    type: 'product',
                                    name: line.product,
                                    description: line.description,
                                    quantity: line.quantity,
                                    unit_price: line.unit_price,
                                    tax: 16,
                                    subtotal: line.quantity * line.unit_price
                                  }]);
                                }}
                              >
                                <Plus size={16} /> Add
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Notes & Terms */}
              <div className="flex flex-col border border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden">
                <button
                  onClick={() => setTermsOpen(!termsOpen)}
                  className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between w-full text-left hover:bg-slate-100 transition-colors"
                >
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Terms & Conditions</h3>
                    <p className="text-xs text-slate-500 mt-1 font-normal">These notes will appear on the final customer quotation.</p>
                  </div>
                  <ChevronDown size={20} className={`text-slate-400 transition-transform ${termsOpen ? 'rotate-180' : ''}`} />
                </button>
                {termsOpen && (
                  <textarea
                    name="internalNotes"
                    value={formData.internalNotes}
                    onChange={handleInputChange}
                    disabled={isLocked}
                    placeholder="Enter event policies, payment terms, or custom notes here..."
                    rows={6}
                    className="w-full bg-white p-6 text-sm focus:outline-none text-slate-700 disabled:opacity-50 resize-y"
                  />
                )}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* UX Improvement 4: Cleaner Sticky Summary Dock */}
      {viewMode === 'configure' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.1)] z-40 print:hidden pl-0 lg:pl-64 pr-24">
          <div className="max-w-[1400px] mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">

            {/* Quick Modifiers */}
            <div className="flex gap-2 text-sm font-medium order-2 md:order-1 relative">
              <button 
                onClick={() => setShowTaxColumn(!showTaxColumn)}
                disabled={isLocked}
                className={`px-4 py-2 border rounded-md transition-colors shadow-sm disabled:opacity-50 ${!showTaxColumn ? 'bg-slate-800 text-white border-slate-800' : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'}`}
              >
                {showTaxColumn ? 'Hide Tax' : 'Show Tax'}
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => { setCouponPopoverOpen(!couponPopoverOpen); setDiscountPopoverOpen(false); }}
                  disabled={isLocked}
                  className={`px-4 py-2 border rounded-md transition-colors shadow-sm disabled:opacity-50 ${couponCode ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'}`}
                >
                  Coupon Code
                </button>
                {couponPopoverOpen && !isLocked && (
                  <div className="absolute bottom-full left-0 mb-2 w-64 bg-white border border-slate-200 shadow-xl rounded-xl p-4 z-50">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Enter Coupon</label>
                    <div className="flex gap-2">
                      <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} placeholder="e.g. SUMMER20" className="flex-1 bg-slate-50 border border-slate-200 focus:border-emerald-500 px-3 py-1.5 text-sm focus:outline-none rounded-md" />
                      <button onClick={() => setCouponPopoverOpen(false)} className="bg-emerald-600 text-white px-3 py-1.5 text-sm font-bold rounded hover:bg-emerald-700">Apply</button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => { setDiscountPopoverOpen(!discountPopoverOpen); setCouponPopoverOpen(false); }}
                  disabled={isLocked}
                  className={`px-4 py-2 border rounded-md transition-colors shadow-sm disabled:opacity-50 ${discountType !== 'none' && discountValue > 0 ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'}`}
                >
                  Discount
                </button>
                {discountPopoverOpen && !isLocked && (
                  <div className="absolute bottom-full left-0 mb-2 w-72 bg-white border border-slate-200 shadow-xl rounded-xl p-4 z-50 flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Discount Type</label>
                      <select value={discountType} onChange={(e) => setDiscountType(e.target.value as any)} className="bg-slate-50 border border-slate-200 focus:border-emerald-500 px-3 py-1.5 text-sm focus:outline-none rounded-md">
                        <option value="none">No Discount</option>
                        <option value="percentage">Percentage (%)</option>
                        <option value="lumpsum">Lumpsum (PKR)</option>
                      </select>
                    </div>
                    {discountType !== 'none' && (
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Discount Value</label>
                        <input type="number" value={discountValue} onChange={(e) => setDiscountValue(Number(e.target.value))} className="bg-slate-50 border border-slate-200 focus:border-emerald-500 px-3 py-1.5 text-sm focus:outline-none rounded-md" />
                      </div>
                    )}
                    <button onClick={() => setDiscountPopoverOpen(false)} className="w-full mt-1 bg-slate-800 text-white px-3 py-2 text-sm font-bold rounded hover:bg-slate-900">Done</button>
                  </div>
                )}
              </div>
            </div>

            {/* Live Financial Ledger */}
            <div className="flex items-center gap-8 order-1 md:order-2">
              <div className="flex flex-col text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Untaxed</span>
                <span className="text-base font-semibold text-slate-700">{formatPKR(subtotal)}</span>
              </div>
              {showTaxColumn && (
                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Taxes</span>
                  <span className="text-base font-semibold text-slate-700">{formatPKR(taxAmount)}</span>
                </div>
              )}
              {discountAmount > 0 && (
                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">Discount</span>
                  <span className="text-base font-semibold text-rose-500">-{formatPKR(discountAmount)}</span>
                </div>
              )}
              <div className="w-px h-10 bg-slate-200 mx-2"></div>
              <div className="flex flex-col text-right">
                <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mb-0.5">Your Event Investment</span>
                <span className="text-2xl font-extrabold text-emerald-600 leading-none">{formatPKR(grandTotal)}</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {viewMode === 'preview' && (
        <div className="fixed inset-0 z-[100] bg-[#525659] flex flex-col font-sans">
          
          {/* PDF Viewer Header */}
          <div className="bg-[#323639] text-white px-4 py-2 flex justify-between items-center shadow-md shrink-0">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setViewMode('configure')} 
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center"
                title="Back to Document Builder"
              >
                <ArrowLeft size={20} className="text-slate-300" />
              </button>
              <div className="flex flex-col">
                <span className="text-[13px] font-medium tracking-wide leading-tight">{formData.customerName ? `${formData.customerName} - ` : ''}{docStatus === 'draft' ? 'Quotation' : 'Sales Order'}.pdf</span>
                <span className="text-[10px] text-slate-400">1 / 1</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => window.print()} 
                className="p-2 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center text-slate-300"
                title="Print Document"
              >
                <Printer size={18} />
              </button>
              <button 
                onClick={() => window.print()} 
                className="p-2 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center text-slate-300"
                title="Download PDF"
              >
                <Download size={18} />
              </button>
              <div className="w-px h-6 bg-slate-600 mx-2"></div>
              <button 
                onClick={() => handleSaveQuote('under_review')}
                disabled={isProcessing}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 text-xs font-bold rounded transition-colors ml-2 shadow-sm"
              >
                Send to Client
              </button>
            </div>
          </div>

          {/* Document Viewer Area */}
          <div className="flex-1 overflow-auto p-8 flex justify-center items-start print:p-0 print:bg-white print:overflow-visible">
            
            {/* The Physical A4 Page */}
            <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl print:shadow-none print:m-0 text-slate-800 relative shrink-0">
              
              {/* Elegant Header Border */}
              <div className="h-2 w-full bg-emerald-600 absolute top-0 left-0 print:hidden"></div>

            {/* Document Header */}
            <div className="p-12 pb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-4xl font-black text-slate-900 tracking-tighter">ANTIGRAVITY</h1>
                  <p className="text-xs font-bold text-emerald-600 mt-1 uppercase tracking-[0.2em]">Event Management & Design</p>
                  <div className="mt-8 text-[13px] text-slate-500 leading-relaxed">
                    <p>123 Nexus Boulevard</p>
                    <p>Tech District, Metropolis</p>
                    <p>hello@antigravity.events</p>
                    <p>+92 300 1234567</p>
                  </div>
                </div>
                <div className="text-right">
                  <h2 className="text-4xl font-light text-slate-300 uppercase tracking-widest mb-8">
                    {docStatus === 'draft' || docStatus === 'under_review' ? 'Quotation' : 'Sales Order'}
                  </h2>
                  <div className="text-[13px] bg-slate-50 p-4 rounded-lg inline-block text-left min-w-[200px]">
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-400 font-medium">Date:</span> 
                      <span className="text-slate-800 font-semibold">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-400 font-medium">Ref:</span> 
                      <span className="text-slate-800 font-semibold">{docStatus === 'draft' ? 'DRAFT' : `SO-${Date.now().toString().slice(-6)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Valid Until:</span> 
                      <span className="text-slate-800 font-semibold">{new Date(Date.now() + 14 * 86400000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer & Event Info */}
            <div className="px-12 py-6 flex justify-between border-y border-slate-100 bg-slate-50/50">
              <div className="w-1/2 pr-4">
                <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Prepared For</h3>
                <p className="text-base font-bold text-slate-800">{formData.customerName || 'Client Name'}</p>
                {formData.customerEmail && <p className="text-[13px] text-slate-600 mt-1">{formData.customerEmail}</p>}
                {formData.customerPhone && <p className="text-[13px] text-slate-600 mt-1">{formData.customerPhone}</p>}
                {formData.customerAddress && <p className="text-[13px] text-slate-600 mt-1 whitespace-pre-wrap">{formData.customerAddress}</p>}
              </div>
              {(formData.eventDate || formData.targetHall || formData.eventType) && (
                <div className="w-1/2 pl-4 border-l border-slate-200 flex flex-col gap-1">
                  <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Event Details</h3>
                  {formData.eventDate && <p className="text-[13px] text-slate-800 flex justify-between"><span className="text-slate-500 font-medium shrink-0">Date:</span> <span className="text-right font-medium">{new Date(formData.eventDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span></p>}
                  {formData.eventType && <p className="text-[13px] text-slate-800 flex justify-between"><span className="text-slate-500 font-medium shrink-0">Event Type:</span> <span className="text-right font-medium">{formData.eventType}</span></p>}
                  {formData.targetHall && <p className="text-[13px] text-slate-800 flex justify-between"><span className="text-slate-500 font-medium shrink-0">Venue:</span> <span className="text-right font-medium">{formData.targetHall}</span></p>}
                </div>
              )}
            </div>

            {/* Line Items Table */}
            <div className="px-12 py-10">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-800">
                    <th className="py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-1/2">Description</th>
                    <th className="py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Qty</th>
                    <th className="py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Unit Price</th>
                    {showTaxColumn && <th className="py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Tax</th>}
                    <th className="py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {(!orderLines || orderLines.length === 0) ? (
                    <tr>
                      <td colSpan={showTaxColumn ? 5 : 4} className="py-8 text-center text-sm text-slate-400 italic">No items configured yet.</td>
                    </tr>
                  ) : orderLines.map((line) => {
                    if (line.type === 'section') {
                      return (
                        <tr key={line.id} className="border-b border-slate-300">
                          <td colSpan={showTaxColumn ? 5 : 4} className="py-6 pt-10 text-[12px] font-black text-emerald-800 uppercase tracking-widest">{line.name}</td>
                        </tr>
                      );
                    }
                    if (line.type === 'note') {
                      return (
                        <tr key={line.id}>
                          <td colSpan={showTaxColumn ? 5 : 4} className="py-3 text-[12px] italic text-slate-500 whitespace-pre-wrap">{line.name}</td>
                        </tr>
                      );
                    }
                    if (!line.name) return null;

                    return (
                      <tr key={line.id} className="border-b border-slate-100 align-top group">
                        <td className="py-5 pr-6">
                          <p className="text-[13px] font-bold text-slate-800">{line.name}</p>
                          {line.description && <p className="text-[12px] text-slate-500 mt-1 whitespace-pre-wrap leading-relaxed">{line.description}</p>}
                        </td>
                        <td className="py-5 text-center text-[13px] font-medium text-slate-600">{line.quantity}</td>
                        <td className="py-5 text-right text-[13px] text-slate-600">{formatPKR(line.unit_price)}</td>
                        {showTaxColumn && <td className="py-5 text-right text-[13px] text-slate-600">{line.tax}%</td>}
                        <td className="py-5 text-right text-[13px] font-bold text-slate-800">{formatPKR(line.subtotal)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="px-12 pb-12 flex justify-end">
              <div className="w-[350px]">
                <div className="flex justify-between py-2 text-[13px]">
                  <span className="text-slate-500 font-medium">Subtotal</span>
                  <span className="text-slate-800 font-semibold">{formatPKR(subtotal)}</span>
                </div>
                {showTaxColumn && taxAmount > 0 && (
                  <div className="flex justify-between py-2 text-[13px] border-t border-slate-100">
                    <span className="text-slate-500 font-medium">Taxes & Duties</span>
                    <span className="text-slate-800 font-semibold">{formatPKR(taxAmount)}</span>
                  </div>
                )}
                {discountAmount > 0 && (
                  <div className="flex justify-between py-2 text-[13px] border-t border-slate-100">
                    <span className="text-slate-500 font-medium">Discount</span>
                    <span className="text-rose-500 font-semibold">-{formatPKR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between py-5 mt-2 border-t-2 border-slate-800 bg-slate-50 px-4 -mx-4 rounded-lg">
                  <span className="text-sm font-bold text-slate-800 uppercase tracking-widest mt-1">Grand Total</span>
                  <span className="text-2xl font-extrabold text-emerald-600">{formatPKR(grandTotal)}</span>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            {formData.internalNotes && (
              <div className="px-12 py-10 mt-auto border-t border-slate-200 bg-slate-50/50">
                <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">Terms & Conditions</h3>
                <div className="text-[11px] text-slate-500 whitespace-pre-wrap leading-relaxed">
                  {formData.internalNotes}
                </div>
              </div>
            )}
            
            {/* Footer */}
            <div className="absolute bottom-6 left-0 w-full text-center">
              <p className="text-[10px] text-slate-400 font-medium">Thank you for choosing Antigravity. We look forward to making your event unforgettable.</p>
            </div>

          </div>
        </div>
      </div>
      )}
    </div>
  );
}
