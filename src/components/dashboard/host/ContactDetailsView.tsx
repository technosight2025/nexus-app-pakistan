'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowLeft, Trash2, Edit2, Save, X, History, Calendar, Phone, Mail, Building, Briefcase, User } from 'lucide-react';
import type { Database } from '@/types/supabase';

type ContactRow = Database['public']['Tables']['contacts']['Row'];

type EventHistoryDetail = {
  events: Database['public']['Tables']['events']['Row'] & {
    bookings: Database['public']['Tables']['bookings']['Row'][];
    payments: Database['public']['Tables']['payments']['Row'][];
  };
};

export function ContactDetailsView({ contactId }: { contactId: string }) {
  const router = useRouter();
  const supabase = createClient();

  const [isLoading, setIsLoading] = useState(true);
  const [contact, setContact] = useState<ContactRow | null>(null);
  const [history, setHistory] = useState<EventHistoryDetail[]>([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const { data: contactData, error: contactError } = await supabase
        .from('contacts')
        .select('*')
        .eq('id', contactId)
        .single();

      if (contactError || !contactData) {
        console.error(contactError);
        router.push('/dashboard/contacts');
        return;
      }

      setContact(contactData);
      setEditForm(contactData);

      const { data: historyData, error: historyError } = await supabase
        .from('contact_events')
        .select(`
          events (
            *,
            bookings (*),
            payments (*)
          )
        `)
        .eq('contact_id', contactId);

      if (!historyError && historyData) {
        const validHistory = (historyData as any[]).filter(d => d.events) as EventHistoryDetail[];
        setHistory(validHistory);
      }

      setIsLoading(false);
    }

    fetchData();
  }, [contactId, router, supabase]);

  const handleUpdate = async () => {
    setIsSaving(true);
    const { data, error } = await supabase
      .from('contacts')
      .update({
        name: editForm.name,
        email: editForm.email || null,
        phone: editForm.phone || null,
        contact_type: editForm.contact_type,
        cnic: editForm.cnic || null,
        office_address: editForm.office_address || null,
        home_address: editForm.home_address || null,
        tax_number: editForm.tax_number || null,
        gst_number: editForm.gst_number || null,
        company_name: editForm.company_name || null,
        company_info: editForm.company_info || null,
        designation: editForm.designation || null,
        personal_phone: editForm.personal_phone || null,
        bank_accounts: editForm.bank_accounts || []
      })
      .eq('id', contactId)
      .select()
      .single();

    if (!error && data) {
      setContact(data);
      setIsEditing(false);
    } else {
      console.error(error);
      alert("Failed to update contact.");
    }
    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (history.length > 0) {
      alert("Cannot delete this contact because they are linked to historical events or projects. For data integrity, they must remain in the system.");
      return;
    }

    if (!window.confirm("Are you sure you want to permanently delete this contact?")) return;

    setIsDeleting(true);
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', contactId);

    if (!error) {
      router.push('/dashboard/contacts');
    } else {
      console.error(error);
      alert("Failed to delete contact. It may be linked to other records.");
      setIsDeleting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatCurrency = (val: number) => {
    return 'Rs: ' + new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(val);
  };

  if (isLoading || !contact) {
    return (
      <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center bg-[#FAF7F2]">
        <Loader2 className="animate-spin text-[#0F5B3E] w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FAF7F2] font-sans p-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header Strip */}
        <div className="flex items-center justify-between bg-white border border-[#E6E2DA] p-4 shrink-0">
          <button
            onClick={() => router.push('/dashboard/contacts')}
            className="text-xs font-black text-[#5E6460] uppercase tracking-wider hover:text-[#1D1C17] flex items-center gap-2 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Directory
          </button>

          <div className="flex items-center gap-3">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-[#E6F0EC] text-[#0F5B3E] border border-[#0F5B3E] text-xs font-black uppercase tracking-wider px-6 py-2 flex items-center gap-2 hover:bg-[#0F5B3E] hover:text-white transition-colors"
                >
                  <Edit2 size={14} /> Edit Details
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-[#FFF0F0] text-[#D9467A] border border-[#D9467A] text-xs font-black uppercase tracking-wider px-6 py-2 flex items-center gap-2 hover:bg-[#D9467A] hover:text-white disabled:opacity-50 transition-colors"
                >
                  {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />} Delete
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { setIsEditing(false); setEditForm(contact); }}
                  className="text-xs font-black text-[#5E6460] uppercase tracking-wider px-6 py-2 hover:bg-[#E6E2DA] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={isSaving}
                  className="bg-[#0F5B3E] text-white text-xs font-black uppercase tracking-wider px-6 py-2 flex items-center gap-2 hover:bg-[#0c4931] disabled:opacity-50 transition-colors"
                >
                  {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Changes
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">

          {/* LEFT COLUMN: Contact Details Form/View */}
          <div className="col-span-2 space-y-6">
            <div className="bg-white border border-[#E6E2DA] p-8">
              <div className="mb-8 border-b border-[#E6E2DA] pb-4">
                <h1 className="text-2xl font-black text-[#1D1C17] uppercase tracking-wider">{isEditing ? 'Edit Contact Profile' : contact.name}</h1>
                <p className="text-xs font-bold text-[#5E6460] uppercase tracking-wider mt-1">Core Identity & Contact Information</p>
              </div>

              {isEditing ? (
                <div className="space-y-6">
                  {/* EDIT FORM */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Contact Type</label>
                      <select
                        value={editForm.contact_type}
                        onChange={e => setEditForm({ ...editForm, contact_type: e.target.value })}
                        className="w-full border border-[#E6E2DA] p-2 text-xs font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2]"
                      >
                        <option value="individual">Individual</option>
                        <option value="company">Company</option>
                        <option value="vendor">Vendor</option>
                        <option value="employee">Employee</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Full Name</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Phone</label>
                      <input
                        type="text"
                        value={editForm.phone || ''}
                        onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                        className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Email</label>
                      <input
                        type="email"
                        value={editForm.email || ''}
                        onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2]"
                      />
                    </div>
                    <div className="col-span-2 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Office Address</label>
                        <textarea
                          rows={2}
                          value={editForm.office_address || ''}
                          onChange={e => setEditForm({ ...editForm, office_address: e.target.value })}
                          className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2] resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Home Address</label>
                        <textarea
                          rows={2}
                          value={editForm.home_address || ''}
                          onChange={e => setEditForm({ ...editForm, home_address: e.target.value })}
                          className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2] resize-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">National ID (CNIC)</label>
                      <input
                        type="text"
                        value={editForm.cnic || ''}
                        onChange={e => setEditForm({ ...editForm, cnic: e.target.value })}
                        className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Tax Number (NTN)</label>
                      <input
                        type="text"
                        value={editForm.tax_number || ''}
                        onChange={e => setEditForm({ ...editForm, tax_number: e.target.value })}
                        className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">GST Number</label>
                      <input
                        type="text"
                        value={editForm.gst_number || ''}
                        onChange={e => setEditForm({ ...editForm, gst_number: e.target.value })}
                        className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Company Name</label>
                      <input
                        type="text"
                        value={editForm.company_name || ''}
                        onChange={e => setEditForm({ ...editForm, company_name: e.target.value })}
                        className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Designation</label>
                      <input
                        type="text"
                        value={editForm.designation || ''}
                        onChange={e => setEditForm({ ...editForm, designation: e.target.value })}
                        className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Company Info</label>
                      <input
                        type="text"
                        value={editForm.company_info || ''}
                        onChange={e => setEditForm({ ...editForm, company_info: e.target.value })}
                        className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Personal Phone</label>
                      <input
                        type="text"
                        value={editForm.personal_phone || ''}
                        onChange={e => setEditForm({ ...editForm, personal_phone: e.target.value })}
                        className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2]"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                  {/* VIEW MODE */}
                  <div>
                    <span className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Contact Type</span>
                    <span className="text-sm font-black text-[#1D1C17] uppercase">{contact.contact_type}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Date Added</span>
                    <span className="text-sm font-bold text-[#1D1C17]">{formatDate(contact.created_at)}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Phone</span>
                    <span className="text-sm font-bold text-[#1D1C17] flex items-center gap-2"><Phone size={14} className="text-[#5E6460]" /> {contact.phone || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Email</span>
                    <span className="text-sm font-bold text-[#1D1C17] flex items-center gap-2"><Mail size={14} className="text-[#5E6460]" /> {contact.email || 'N/A'}</span>
                  </div>
                  <div className="col-span-2 grid grid-cols-2 gap-y-6 gap-x-12">
                    <div>
                      <span className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Office Address</span>
                      <span className="text-sm font-bold text-[#1D1C17]">{contact.office_address || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Home Address</span>
                      <span className="text-sm font-bold text-[#1D1C17]">{contact.home_address || 'N/A'}</span>
                    </div>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">National ID (CNIC)</span>
                    <span className="text-sm font-bold text-[#1D1C17]">{contact.cnic || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Tax Number (NTN)</span>
                    <span className="text-sm font-bold text-[#1D1C17]">{contact.tax_number || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">GST Number</span>
                    <span className="text-sm font-bold text-[#1D1C17]">{contact.gst_number || 'N/A'}</span>
                  </div>
                  {contact.company_name && (
                    <>
                      <div>
                        <span className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Company Name</span>
                        <span className="text-sm font-bold text-[#1D1C17] flex items-center gap-2"><Building size={14} className="text-[#5E6460]" /> {contact.company_name}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Company Info</span>
                        <span className="text-sm font-bold text-[#1D1C17]">{contact.company_info || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Designation</span>
                        <span className="text-sm font-bold text-[#1D1C17] flex items-center gap-2"><Briefcase size={14} className="text-[#5E6460]" /> {contact.designation || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Personal Phone</span>
                        <span className="text-sm font-bold text-[#1D1C17] flex items-center gap-2"><Phone size={14} className="text-[#5E6460]" /> {contact.personal_phone || 'N/A'}</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Banking Accounts Section */}
            <div className="bg-white border border-[#E6E2DA] p-8 mt-6">
              <div className="flex items-center justify-between mb-6 border-b border-[#E6E2DA] pb-4">
                <h2 className="text-xl font-black text-[#1D1C17] uppercase tracking-wider">Banking Details</h2>
                {isEditing && (
                  <button
                    onClick={() => setEditForm({ ...editForm, bank_accounts: [...(editForm.bank_accounts || []), { bank_name: '', account_title: '', iban: '' }] })}
                    className="text-[10px] font-black text-[#0F5B3E] uppercase tracking-wider hover:underline"
                  >
                    + Add Account
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  {(editForm.bank_accounts || []).map((acc: any, idx: number) => (
                    <div key={idx} className="bg-[#FAF7F2] border border-[#E6E2DA] p-4 relative">
                      <button
                        onClick={() => setEditForm({ ...editForm, bank_accounts: editForm.bank_accounts.filter((_: any, i: number) => i !== idx) })}
                        className="absolute top-2 right-2 text-[#D9467A] hover:bg-[#D9467A]/10 p-1 transition-colors"
                      >
                        <X size={14} />
                      </button>
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        <div>
                          <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Bank Name</label>
                          <input
                            type="text"
                            value={acc.bank_name}
                            onChange={e => {
                              const newAccs = [...editForm.bank_accounts];
                              newAccs[idx].bank_name = e.target.value;
                              setEditForm({ ...editForm, bank_accounts: newAccs });
                            }}
                            className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FFFFFF]"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Account Title</label>
                          <input
                            type="text"
                            value={acc.account_title}
                            onChange={e => {
                              const newAccs = [...editForm.bank_accounts];
                              newAccs[idx].account_title = e.target.value;
                              setEditForm({ ...editForm, bank_accounts: newAccs });
                            }}
                            className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FFFFFF]"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">IBAN</label>
                          <input
                            type="text"
                            value={acc.iban}
                            onChange={e => {
                              const newAccs = [...editForm.bank_accounts];
                              newAccs[idx].iban = e.target.value;
                              setEditForm({ ...editForm, bank_accounts: newAccs });
                            }}
                            className="w-full border border-[#E6E2DA] p-2 text-sm font-bold text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E] bg-[#FFFFFF]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {(!editForm.bank_accounts || editForm.bank_accounts.length === 0) && (
                    <p className="text-xs text-[#5E6460] italic text-center py-4 border border-dashed border-[#E6E2DA]">No bank accounts. Click + Add Account to create one.</p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {(contact.bank_accounts as any[] || []).length > 0 ? (
                    (contact.bank_accounts as any[]).map((acc, idx) => (
                      <div key={idx} className="bg-[#FAF7F2] border border-[#E6E2DA] p-4 grid grid-cols-3 gap-4">
                        <div>
                          <span className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Bank Name</span>
                          <span className="text-sm font-bold text-[#1D1C17]">{acc.bank_name || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">Account Title</span>
                          <span className="text-sm font-bold text-[#1D1C17]">{acc.account_title || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-1">IBAN</span>
                          <span className="text-sm font-bold text-[#1D1C17]">{acc.iban || 'N/A'}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs font-bold text-[#5E6460] text-center p-4">No banking details provided.</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: History Timeline */}
          <div className="col-span-1 space-y-6">
            <div className="bg-white border border-[#E6E2DA] p-6 h-full min-h-[500px]">
              <h2 className="text-sm font-black text-[#1D1C17] uppercase tracking-wider flex items-center gap-2 border-b border-[#E6E2DA] pb-4 mb-6">
                <History size={16} className="text-[#0F5B3E]" /> Interaction History
              </h2>

              {history.length === 0 ? (
                <div className="text-center p-8 border border-dashed border-[#E6E2DA] bg-[#FAF7F2]">
                  <p className="text-xs font-bold text-[#5E6460]">No historical events found for this contact.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {history.map((h, idx) => {
                    const event = h.events;
                    const bookings = event.bookings || [];
                    const payments = event.payments || [];
                    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

                    return (
                      <div key={event.id || idx} className="border border-[#E6E2DA] bg-[#FAF7F2] p-5">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-sm font-black text-[#1D1C17]">{event.name}</h3>
                          <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 ${event.status === 'cancelled' ? 'bg-[#D9467A]/10 text-[#D9467A]' : 'bg-[#E6F0EC] text-[#0F5B3E]'
                            }`}>
                            {event.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <span className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-0.5">Budget</span>
                            <span className="text-xs font-black text-[#1D1C17]">{formatCurrency(event.budget || 0)}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-0.5">Total Paid</span>
                            <span className="text-xs font-black text-[#0F5B3E]">{formatCurrency(totalPaid)}</span>
                          </div>
                        </div>

                        {bookings.length > 0 && (
                          <div className="border-t border-[#E6E2DA] pt-3 mt-3">
                            <span className="block text-[9px] font-bold text-[#5E6460] uppercase tracking-wider mb-2 flex items-center gap-1">
                              <Calendar size={10} /> Associated Bookings
                            </span>
                            <div className="space-y-1">
                              {bookings.map(b => (
                                <div key={b.id} className="flex justify-between items-center text-[10px] font-bold text-[#1D1C17] bg-[#FFFFFF] border border-[#E6E2DA] px-2 py-1">
                                  <span>{formatDate(b.booking_date)}</span>
                                  <span className="uppercase text-[#5E6460]">{b.slot}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
