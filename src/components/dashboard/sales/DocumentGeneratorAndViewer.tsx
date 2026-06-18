'use client';

import React, { useState, useRef } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { Printer, Download, MessageCircle, Save, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function DocumentGeneratorAndViewer() {
  const { organizationId } = useDashboard();
  const router = useRouter();
  const supabase = createClient();
  const printRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<'QUOTATION' | 'INVOICE'>('QUOTATION');
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    customerName: '',
    eventDate: '',
    targetHall: '',
    guestsCount: 100,
    baseRate: 5000,
    taxPercentage: 16,
    menuItems: 'Welcome Drinks\nAssorted Starters\nMain Course Buffet\nDesserts Station'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleSaveRecord = async () => {
    if (!organizationId) return;
    setIsSaving(true);
    
    const targetTable = mode === 'QUOTATION' ? 'quotations' : 'invoices';
    
    const payload: any = {
      organization_id: organizationId,
      grand_total: grandTotal,
      tax_amount: taxAmount,
      total_amount: subtotal,
      status: mode === 'QUOTATION' ? 'draft' : 'unpaid',
      menu_tier_details: {
        items: formData.menuItems.split('\n'),
        target_hall: formData.targetHall,
        event_date: formData.eventDate,
        customer_name: formData.customerName
      }
    };

    if (mode === 'QUOTATION') {
      payload.quote_number = `QT-${Date.now().toString().slice(-6)}`;
      payload.subtotal = subtotal;
      payload.estimated_guests = guests;
    } else {
      payload.invoice_number = `INV-${Date.now().toString().slice(-6)}`;
    }

    const { error } = await supabase.from(targetTable).insert(payload);
    
    if (error) {
      console.error('Failed to save document:', error);
      alert('Failed to save document');
    } else {
      alert(`${mode} saved successfully!`);
      router.push('/dashboard/sales');
    }
    
    setIsSaving(false);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#FAF7F2] font-sans">
      
      {/* Utility Toolbar Options - Hidden on Print */}
      <div className="bg-[#FFFFFF] border-b border-[#E6E2DA] px-6 py-4 flex items-center justify-between shrink-0 print:hidden">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="text-[#5E6460] hover:text-[#1D1C17] transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-black text-[#1D1C17] uppercase tracking-wider">Document Builder Workspace</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={handlePrint} className="bg-[#FAF7F2] text-[#0F5B3E] px-4 py-2 text-[10px] font-black uppercase tracking-wider flex items-center gap-2 hover:bg-[#E6F0EC] transition-colors border border-[#0F5B3E]/20">
            <Printer size={14} /> Print / Save PDF
          </button>
          <button onClick={handleDownloadCSV} className="bg-[#FAF7F2] text-[#0F5B3E] px-4 py-2 text-[10px] font-black uppercase tracking-wider flex items-center gap-2 hover:bg-[#E6F0EC] transition-colors border border-[#0F5B3E]/20">
            <Download size={14} /> Download CSV
          </button>
          <button onClick={handleWhatsAppShare} className="bg-[#FAF7F2] text-[#0F5B3E] px-4 py-2 text-[10px] font-black uppercase tracking-wider flex items-center gap-2 hover:bg-[#E6F0EC] transition-colors border border-[#0F5B3E]/20">
            <MessageCircle size={14} /> Share WhatsApp
          </button>
          <button onClick={handleSaveRecord} disabled={isSaving} className="bg-[#0F5B3E] text-white px-6 py-2 text-[10px] font-black uppercase tracking-wider flex items-center gap-2 hover:bg-[#0A422D] transition-colors border border-[#0F5B3E] disabled:opacity-50">
            <Save size={14} /> {isSaving ? 'Saving...' : 'Save Record'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT COLUMN: Document Configurator Form - Hidden on Print */}
        <div className="w-[40%] bg-[#FFFFFF] border-r border-[#E6E2DA] flex flex-col h-full overflow-y-auto print:hidden">
          <div className="p-6 space-y-6">
            
            <div className="space-y-4">
              <h2 className="text-xs font-black text-[#1D1C17] uppercase tracking-widest border-b border-[#E6E2DA] pb-2">Document Configuration</h2>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setMode('QUOTATION')}
                  className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest border transition-colors ${mode === 'QUOTATION' ? 'bg-[#0F5B3E] text-white border-[#0F5B3E]' : 'bg-[#FAF7F2] text-[#5E6460] border-[#E6E2DA] hover:border-[#0F5B3E]/50'}`}
                >
                  Quotation
                </button>
                <button 
                  onClick={() => setMode('INVOICE')}
                  className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest border transition-colors ${mode === 'INVOICE' ? 'bg-[#0F5B3E] text-white border-[#0F5B3E]' : 'bg-[#FAF7F2] text-[#5E6460] border-[#E6E2DA] hover:border-[#0F5B3E]/50'}`}
                >
                  Invoice
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1.5">Customer Name</label>
                <input type="text" name="customerName" value={formData.customerName} onChange={handleInputChange} className="w-full bg-[#FAF7F2] border border-[#E6E2DA] p-2.5 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] rounded-none" placeholder="E.g. Nexus Enterprises" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1.5">Event Date</label>
                  <input type="date" name="eventDate" value={formData.eventDate} onChange={handleInputChange} className="w-full bg-[#FAF7F2] border border-[#E6E2DA] p-2.5 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] rounded-none" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1.5">Target Hall</label>
                  <input type="text" name="targetHall" value={formData.targetHall} onChange={handleInputChange} className="w-full bg-[#FAF7F2] border border-[#E6E2DA] p-2.5 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] rounded-none" placeholder="E.g. Grand Emerald" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xs font-black text-[#1D1C17] uppercase tracking-widest border-b border-[#E6E2DA] pb-2">Financials & Tiers</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1.5">Estimated Guests</label>
                  <input type="number" name="guestsCount" value={formData.guestsCount} onChange={handleInputChange} className="w-full bg-[#FAF7F2] border border-[#E6E2DA] p-2.5 text-sm font-black text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] rounded-none" min="1" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1.5">Per-Head Rate (PKR)</label>
                  <input type="number" name="baseRate" value={formData.baseRate} onChange={handleInputChange} className="w-full bg-[#FAF7F2] border border-[#E6E2DA] p-2.5 text-sm font-black text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] rounded-none" min="0" />
                </div>
              </div>
              
              <div>
                <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1.5">Tax Percentage (GST %)</label>
                <input type="number" name="taxPercentage" value={formData.taxPercentage} onChange={handleInputChange} className="w-full bg-[#FAF7F2] border border-[#E6E2DA] p-2.5 text-sm font-black text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] rounded-none" min="0" max="100" />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xs font-black text-[#1D1C17] uppercase tracking-widest border-b border-[#E6E2DA] pb-2">Menu Specifications</h2>
              <div>
                <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1.5">Menu Items (One per line)</label>
                <textarea 
                  name="menuItems" 
                  value={formData.menuItems} 
                  onChange={handleInputChange} 
                  rows={6}
                  className="w-full bg-[#FAF7F2] border border-[#E6E2DA] p-2.5 text-sm font-medium text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] rounded-none resize-none leading-relaxed" 
                />
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Live Ledger Document Sheet */}
        <div className="flex-1 bg-[#FAF7F2] overflow-y-auto p-8 flex justify-center print:p-0 print:block print:bg-white print:overflow-visible">
          
          <div ref={printRef} className="w-full max-w-[850px] bg-[#FFFFFF] border border-[#E6E2DA] shadow-sm p-12 min-h-[1056px] flex flex-col print:border-none print:shadow-none print:m-0 print:p-0">
            
            {/* Top Header Block */}
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
                </div>
              </div>
            </div>

            {/* Mid Section Data Grid */}
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

            {/* Bottom Total Ledger Grid */}
            <div className="w-[350px] self-end mt-auto">
              <div className="border-t-2 border-[#1D1C17] pt-4 space-y-3">
                <div className="flex justify-between items-center text-sm font-bold text-[#5E6460]">
                  <span className="uppercase tracking-wider">Subtotal</span>
                  <span>{formatPKR(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-[#5E6460]">
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

            {/* Footer */}
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
