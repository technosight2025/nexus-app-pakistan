'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useDashboard } from '@/contexts/DashboardContext';
import { useRouter } from 'next/navigation';
import { Loader2, Search, Plus, X, Users, History, Mail, Phone, Calendar, Building, User, Briefcase } from 'lucide-react';
import type { Database } from '@/types/supabase';

type ContactRow = Database['public']['Tables']['contacts']['Row'] & {
  contact_events?: { count: number }[];
};

type EventHistoryDetail = {
  events: Database['public']['Tables']['events']['Row'] & {
    bookings: Database['public']['Tables']['bookings']['Row'][];
    payments: Database['public']['Tables']['payments']['Row'][];
  };
};

export function ContactDirectoryTable() {
  const { organizationId } = useDashboard();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  // Data State
  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Inline Form State
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [newContactForm, setNewContactForm] = useState({ 
    name: '', email: '', phone: '', type: 'individual',
    cnic: '', office_address: '', home_address: '', 
    tax_number: '', gst_number: '',
    company_name: '', company_info: '', designation: '', personal_phone: '',
    isEmployed: false,
    bank_accounts: [{ bank_name: '', account_title: '', iban: '' }]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    async function fetchContacts() {
      if (!organizationId) return;
      setIsLoading(true);

      const { data, error } = await supabase
        .from('contacts')
        .select(`
          *,
          contact_events (count)
        `)
        .eq('organization_id', organizationId)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setContacts(data as unknown as ContactRow[]);
      }
      setIsLoading(false);
    }
    fetchContacts();
  }, [organizationId, supabase]);

  const handleAddContact = async () => {
    if (!organizationId || !newContactForm.name) return;
    setIsSubmitting(true);

    const { data, error } = await supabase
      .from('contacts')
      .insert({
        organization_id: organizationId,
        name: newContactForm.name,
        email: newContactForm.email || null,
        phone: newContactForm.phone || null,
        contact_type: newContactForm.type,
        cnic: newContactForm.cnic || null,
        office_address: newContactForm.office_address || null,
        home_address: newContactForm.home_address || null,
        tax_number: newContactForm.tax_number || null,
        gst_number: newContactForm.gst_number || null,
        company_name: newContactForm.company_name || null,
        company_info: newContactForm.company_info || null,
        designation: newContactForm.designation || null,
        personal_phone: newContactForm.personal_phone || null,
        bank_accounts: newContactForm.bank_accounts
      })
      .select(`
        *,
        contact_events (count)
      `)
      .single();

    if (!error && data) {
      setContacts(prev => [data as unknown as ContactRow, ...prev]);
      setNewContactForm({ 
        name: '', email: '', phone: '', type: 'individual',
        cnic: '', office_address: '', home_address: '', 
        tax_number: '', gst_number: '',
        company_name: '', company_info: '', designation: '', personal_phone: '',
        isEmployed: false,
        bank_accounts: [{ bank_name: '', account_title: '', iban: '' }]
      });
      setIsAddingContact(false);
    } else {
      console.error('Failed to add contact:', error);
    }
    setIsSubmitting(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatCurrency = (val: number) => {
    return 'Rs: ' + new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(val);
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (c.phone && c.phone.includes(searchQuery))
  );

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'company':
      case 'vendor':
        return <Building size={14} className="text-[#0F5B3E]" />;
      case 'employee':
      case 'freelancer':
        return <Briefcase size={14} className="text-[#0F5B3E]" />;
      default:
        return <User size={14} className="text-[#0F5B3E]" />;
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center bg-[#FAF7F2]">
        <Loader2 className="animate-spin text-[#0F5B3E] w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-[#FAF7F2] font-sans relative overflow-hidden">
      
      {/* MAIN DATA DIRECTORY */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isAddingContact ? 'pr-[400px]' : ''}`}>
        <div className="p-8 max-w-7xl mx-auto w-full flex-1 flex flex-col">
          
          <div className="mb-8">
            <h1 className="text-2xl font-black text-[#1D1C17] uppercase tracking-wider mb-2">Master Contacts Directory</h1>
            <p className="text-xs font-bold text-[#5E6460] uppercase tracking-wider">Manage Accounts, Vendors & Historical Interactions</p>
          </div>

          {/* Top Action & Search Strip */}
          <div className="flex items-center justify-between mb-6 bg-[#FFFFFF] border border-[#E6E2DA] p-4 shrink-0">
            <div className="relative w-96">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5E6460]" />
              <input 
                type="text" 
                placeholder="Search by name or phone..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm font-bold border border-[#E6E2DA] focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2] text-[#1D1C17] rounded-none transition-colors"
              />
            </div>
            <button 
              onClick={() => setIsAddingContact(true)}
              className="bg-[#0F5B3E] text-white text-xs font-black uppercase tracking-wider px-6 py-3 flex items-center gap-2 hover:bg-[#0c4931] transition-colors"
            >
              <Plus size={14} /> Add Contact
            </button>
          </div>

          {/* High-Density Master Data Table */}
          <div className="bg-[#FFFFFF] border border-[#E6E2DA] flex-1 overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#FAF7F2] border-b border-[#E6E2DA] sticky top-0 z-10">
                <tr>
                  <th className="p-4 text-[10px] font-black tracking-widest text-[#5E6460] uppercase w-[30%]">Contact Name & Type</th>
                  <th className="p-4 text-[10px] font-black tracking-widest text-[#5E6460] uppercase w-[30%]">Contact Info</th>
                  <th className="p-4 text-[10px] font-black tracking-widest text-[#5E6460] uppercase w-[15%]">Date Added</th>
                  <th className="p-4 text-[10px] font-black tracking-widest text-[#5E6460] uppercase w-[10%] text-center">Events</th>
                  <th className="p-4 w-[15%]"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E2DA]">

                {filteredContacts.length === 0 && !isAddingContact ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-xs font-bold text-[#5E6460]">
                      No contacts found in the directory.
                    </td>
                  </tr>
                ) : (
                  filteredContacts.map(contact => {
                    const eventCount = contact.contact_events?.[0]?.count || 0;
                    return (
                      <tr 
                        key={contact.id} 
                        onClick={() => router.push(`/dashboard/contacts/${contact.id}`)}
                        className="hover:bg-[#FAF7F2] transition-colors group cursor-pointer"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#E6F0EC] text-[#0F5B3E] flex items-center justify-center font-black text-xs shrink-0" title={contact.contact_type}>
                              {getContactIcon(contact.contact_type)}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-black text-[#1D1C17]">{contact.name}</span>
                              <span className="text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mt-0.5">{contact.contact_type}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col gap-1">
                            {contact.phone ? (
                              <span className="text-xs font-bold text-[#1D1C17] flex items-center gap-1.5">
                                <Phone size={12} className="text-[#5E6460]" /> {contact.phone}
                              </span>
                            ) : null}
                            {contact.email ? (
                              <span className="text-[10px] font-bold text-[#5E6460] flex items-center gap-1.5">
                                <Mail size={12} /> {contact.email}
                              </span>
                            ) : null}
                            {!contact.phone && !contact.email && (
                              <span className="text-[10px] font-bold text-[#5E6460] italic">No contact provided</span>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-[10px] font-bold text-[#5E6460] uppercase tracking-wider">
                          {formatDate(contact.created_at)}
                        </td>
                        <td className="p-4 text-center">
                          <span className="inline-block bg-[#E6E2DA]/50 text-[#1D1C17] text-xs font-black px-2 py-0.5">
                            {eventCount}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            className="text-[10px] font-black text-[#0F5B3E] uppercase tracking-wider px-3 py-1.5 border border-[#0F5B3E] hover:bg-[#0F5B3E] hover:text-white transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SIDE DRAWER: Add Contact */}
      <div 
        className={`fixed top-16 right-0 bottom-0 w-[400px] bg-[#FFFFFF] border-l border-[#E6E2DA] shadow-2xl transition-transform duration-300 ease-in-out z-40 flex flex-col ${
          isAddingContact ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-20 shrink-0 border-b border-[#E6E2DA] px-6 flex items-center justify-between bg-[#FAF7F2]">
          <div>
            <h2 className="text-sm font-black text-[#1D1C17] uppercase tracking-wider flex items-center gap-2">
              <Plus size={16} className="text-[#0F5B3E]" /> Add New Contact
            </h2>
            <p className="text-[10px] font-bold text-[#5E6460] uppercase tracking-wider mt-1">Unified Data Entry</p>
          </div>
          <button 
            onClick={() => setIsAddingContact(false)}
            className="p-2 text-[#5E6460] hover:bg-[#E6E2DA] transition-colors rounded-none"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-[#FFFFFF] space-y-6">
          
          {/* Section: Core Identity */}
          <div>
            <h3 className="text-[10px] font-black text-[#5E6460] uppercase tracking-wider mb-3 border-b border-[#E6E2DA] pb-1">Core Identity</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Contact Type</label>
                <select
                  value={newContactForm.type}
                  onChange={e => setNewContactForm({ ...newContactForm, type: e.target.value })}
                  className="w-full border border-[#E6E2DA] p-2 text-xs font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2] rounded-none uppercase"
                >
                  <option value="individual">Individual</option>
                  <option value="company">Company</option>
                  <option value="vendor">Vendor</option>
                  <option value="employee">Employee</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">
                  {newContactForm.type === 'company' ? 'Company Name *' : 'Full Legal Name *'}
                </label>
                <input 
                  type="text" 
                  value={newContactForm.name}
                  onChange={e => setNewContactForm({ ...newContactForm, name: e.target.value })}
                  className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2] rounded-none"
                  autoFocus
                />
              </div>

              {newContactForm.type === 'company' && (
                <div>
                  <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Company Information</label>
                  <textarea 
                    rows={2}
                    value={newContactForm.company_info}
                    onChange={e => setNewContactForm({ ...newContactForm, company_info: e.target.value })}
                    className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2] rounded-none resize-none"
                    placeholder="Industry, Registration Details, Notes..."
                  />
                </div>
              )}

              {newContactForm.type === 'individual' && (
                <label className="flex items-center gap-2 cursor-pointer mt-2 mb-2">
                  <input 
                    type="checkbox" 
                    checked={newContactForm.isEmployed}
                    onChange={e => setNewContactForm({ ...newContactForm, isEmployed: e.target.checked })}
                    className="w-3 h-3 border border-[#E6E2DA] checked:bg-[#0F5B3E] cursor-pointer"
                  />
                  <span className="text-[10px] font-bold text-[#5E6460] uppercase tracking-wider">Associated with a Company?</span>
                </label>
              )}

              {(newContactForm.type === 'employee' || (newContactForm.type === 'individual' && newContactForm.isEmployed)) && (
                <div className="bg-[#FAF7F2] border border-[#E6E2DA] p-3 space-y-3 mt-2">
                  <h4 className="text-[9px] font-black text-[#1D1C17] uppercase tracking-wider">Company Link</h4>
                  <div>
                    <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Company Name</label>
                    <input 
                      type="text" 
                      value={newContactForm.company_name}
                      onChange={e => setNewContactForm({ ...newContactForm, company_name: e.target.value })}
                      className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FFFFFF] rounded-none"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#E6E2DA]">
                <div>
                  <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Designation / Role</label>
                  <input 
                    type="text" 
                    value={newContactForm.designation}
                    onChange={e => setNewContactForm({ ...newContactForm, designation: e.target.value })}
                    className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2] rounded-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Personal Phone</label>
                  <input 
                    type="text" 
                    value={newContactForm.personal_phone}
                    onChange={e => setNewContactForm({ ...newContactForm, personal_phone: e.target.value })}
                    className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2] rounded-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">National ID (CNIC)</label>
                <input 
                  type="text" 
                  value={newContactForm.cnic}
                  onChange={e => setNewContactForm({ ...newContactForm, cnic: e.target.value })}
                  className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2] rounded-none"
                  placeholder="XXXXX-XXXXXXX-X"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Tax Number (NTN)</label>
                  <input 
                    type="text" 
                    value={newContactForm.tax_number}
                    onChange={e => setNewContactForm({ ...newContactForm, tax_number: e.target.value })}
                    className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2] rounded-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">GST Number</label>
                  <input 
                    type="text" 
                    value={newContactForm.gst_number}
                    onChange={e => setNewContactForm({ ...newContactForm, gst_number: e.target.value })}
                    className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2] rounded-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Contact & Location */}
          <div>
            <h3 className="text-[10px] font-black text-[#5E6460] uppercase tracking-wider mb-3 border-b border-[#E6E2DA] pb-1">Contact & Location</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Phone</label>
                  <input 
                    type="text" 
                    value={newContactForm.phone}
                    onChange={e => setNewContactForm({ ...newContactForm, phone: e.target.value })}
                    className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2] rounded-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Email</label>
                  <input 
                    type="email" 
                    value={newContactForm.email}
                    onChange={e => setNewContactForm({ ...newContactForm, email: e.target.value })}
                    className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2] rounded-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Office Address</label>
                <textarea 
                  rows={2}
                  value={newContactForm.office_address}
                  onChange={e => setNewContactForm({ ...newContactForm, office_address: e.target.value })}
                  className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2] rounded-none resize-none"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Home Address</label>
                <textarea 
                  rows={2}
                  value={newContactForm.home_address}
                  onChange={e => setNewContactForm({ ...newContactForm, home_address: e.target.value })}
                  className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2] rounded-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section: Banking */}
          <div>
            <div className="flex items-center justify-between border-b border-[#E6E2DA] pb-1 mb-3">
              <h3 className="text-[10px] font-black text-[#5E6460] uppercase tracking-wider">Banking</h3>
              <button 
                onClick={() => setNewContactForm({ ...newContactForm, bank_accounts: [...newContactForm.bank_accounts, { bank_name: '', account_title: '', iban: '' }] })}
                className="text-[9px] font-black text-[#0F5B3E] uppercase tracking-wider hover:underline"
              >
                + Add Account
              </button>
            </div>
            
            <div className="space-y-4">
              {newContactForm.bank_accounts.map((acc, idx) => (
                <div key={idx} className="bg-[#FAF7F2] border border-[#E6E2DA] p-3 relative">
                  {newContactForm.bank_accounts.length > 1 && (
                    <button 
                      onClick={() => setNewContactForm({ ...newContactForm, bank_accounts: newContactForm.bank_accounts.filter((_, i) => i !== idx) })}
                      className="absolute top-2 right-2 text-[#D9467A] hover:bg-[#D9467A]/10 p-1"
                    >
                      <X size={12} />
                    </button>
                  )}
                  <div className="space-y-3 mt-1">
                    <div>
                      <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Bank Name</label>
                      <input 
                        type="text" 
                        value={acc.bank_name}
                        onChange={e => {
                          const newAccs = [...newContactForm.bank_accounts];
                          newAccs[idx].bank_name = e.target.value;
                          setNewContactForm({ ...newContactForm, bank_accounts: newAccs });
                        }}
                        className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FFFFFF] rounded-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Account Title</label>
                      <input 
                        type="text" 
                        value={acc.account_title}
                        onChange={e => {
                          const newAccs = [...newContactForm.bank_accounts];
                          newAccs[idx].account_title = e.target.value;
                          setNewContactForm({ ...newContactForm, bank_accounts: newAccs });
                        }}
                        className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FFFFFF] rounded-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">IBAN</label>
                      <input 
                        type="text" 
                        value={acc.iban}
                        onChange={e => {
                          const newAccs = [...newContactForm.bank_accounts];
                          newAccs[idx].iban = e.target.value;
                          setNewContactForm({ ...newContactForm, bank_accounts: newAccs });
                        }}
                        className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FFFFFF] rounded-none"
                        placeholder="PK00XXXX0000000000000000"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="p-6 border-t border-[#E6E2DA] bg-[#FAF7F2] flex justify-end gap-3 shrink-0">
          <button 
            onClick={() => setIsAddingContact(false)}
            className="px-4 py-2 text-xs font-black text-[#5E6460] uppercase tracking-wider hover:bg-[#E6E2DA] transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleAddContact}
            disabled={!newContactForm.name || isSubmitting}
            className="px-6 py-2 bg-[#0F5B3E] text-white text-xs font-black uppercase tracking-wider hover:bg-[#0c4931] disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {isSubmitting && <Loader2 size={12} className="animate-spin" />} Save Contact
          </button>
        </div>
      </div>
      
    </div>
  );
}
