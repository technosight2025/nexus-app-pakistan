"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, DollarSign, Calculator, Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';

type EventDayInput = { id: string; name: string; date: string; };

type WizardData = {
  name: string;
  contactNumber: string;
  email: string;
  role: 'Host' | 'Bride' | 'Groom' | '';
  date: string;
  isMultiDay: boolean;
  events: EventDayInput[];
  city: string;
  guests: string;
  budget: string;
  partnerEmail: string;
};

const DEFAULT_DATA: WizardData = {
  name: '',
  contactNumber: '',
  email: '',
  role: '',
  date: '',
  isMultiDay: false,
  events: [{ id: '1', name: 'Event Day 1', date: '' }],
  city: '',
  guests: '300',
  budget: '',
  partnerEmail: '',
};

export default function StartPlanningWizard() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(DEFAULT_DATA);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Persistence: Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('nexus_planning_wizard_draft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData(parsed);
      } catch (e) {
        console.error('Failed to parse saved wizard data', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Persistence: Save to localStorage on data change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('nexus_planning_wizard_draft', JSON.stringify(data));
    }
  }, [data, isLoaded]);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      // Clear local draft and all possible old mock data
      localStorage.removeItem('nexus_planning_wizard_draft');
      
      // Clear ALL legacy CRM mock data keys to ensure a blank state
      const keysToRemove = [
        'nexus_crm_tasks', 'nexus_crm_budget_list', 'nexus_crm_guest_list',
        'nexus_crm_wedding_profile', 'nexus_crm_quotations', 'nexus_crm_invoices',
        'nexus_crm_memories_wall', 'nexus_crm_chat_messages', 'nexus_crm_total_budget',
        'nexus_crm_saved_vendors'
      ];
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      const finalEvents = data.isMultiDay 
        ? data.events 
        : [{ id: '1', name: 'Main Event', date: data.date || "TBD" }];
        
      // Set fresh data
      localStorage.setItem("nexus_crm_wedding_profile", JSON.stringify({
        brideName: data.role === 'Bride' ? data.name : (data.role === 'Groom' && data.partnerEmail ? data.partnerEmail.split('@')[0] : "You"),
        groomName: data.role === 'Groom' ? data.name : (data.role === 'Bride' && data.partnerEmail ? data.partnerEmail.split('@')[0] : "Partner"),
        hostName: data.role === 'Host' ? data.name : "",
        weddingDate: data.isMultiDay && data.events.length > 0 ? data.events[0].date : (data.date || "TBD"),
        location: data.city || "Pakistan",
        events: finalEvents
      }));
      if (data.budget) {
        localStorage.setItem("nexus_crm_total_budget", data.budget);
      }
      if (data.guests) {
        localStorage.setItem("nexus_crm_guest_list", JSON.stringify([{ count: parseInt(data.guests, 10) }]));
      }
      
      // Migrate Guest Favorites to CRM Saved Vendors
      const guestFavorites = localStorage.getItem('nexus_guest_favorites');
      if (guestFavorites) {
        localStorage.setItem('nexus_crm_saved_vendors', guestFavorites);
        localStorage.removeItem('nexus_guest_favorites');
      }

      const hostName = data.name || 'Valued Client';
      const email = data.email || 'customer@example.com';
      const eventDateRaw = data.isMultiDay && data.events.length > 0 ? data.events[0].date : data.date;
      const eventDate = eventDateRaw || new Date().toISOString().split('T')[0];
      const budget = data.budget ? parseInt(data.budget, 10) : undefined;
      const hostPhone = data.contactNumber || '00000000000';

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hostName,
          email,
          hostPhone,
          eventDate,
          totalContractAmount: budget
        })
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || 'Failed to initialize booking');
      }

      // Redirect directly to the generated portal dashboard
      router.push(`/portal/${resData.id}`);
    } catch (err: any) {
      console.error('Wizard API provisioning fault:', err);
      alert(`Failed to provision portal: ${err.message}`);
      setIsSubmitting(false);
    }
  };

  const estimateBudget = () => {
    const guestsNum = parseInt(data.guests, 10);
    if (!isNaN(guestsNum) && guestsNum > 0) {
      // Basic estimation: PKR 5000 per guest as a baseline
      const estimated = guestsNum * 5000;
      setData(prev => ({ ...prev, budget: estimated.toString() }));
    }
  };

  if (!isLoaded) return null; // Avoid hydration mismatch

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
      {/* Progress Header */}
      <div className="bg-slate-50 px-8 py-6 border-b border-slate-100">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Start Planning</h2>
            <p className="text-sm text-slate-500 font-medium">Step {step} of 4</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-[#052E20] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
              {step === 1 && "Personal Details"}
              {step === 2 && "Event Details"}
              {step === 3 && "Budget Setup"}
              {step === 4 && "Collaboration"}
            </span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#052E20]"
            initial={{ width: `${((step - 1) / 4) * 100}%` }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8 min-h-[320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* STEP 1: Personal Details */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      value={data.name}
                      onChange={(e) => setData({...data, name: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
                      placeholder="e.g. Ayesha Khan"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Contact Number</label>
                      <input 
                        type="tel" 
                        value={data.contactNumber}
                        onChange={(e) => setData({...data, contactNumber: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
                        placeholder="0300 1234567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        value={data.email}
                        onChange={(e) => setData({...data, email: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
                        placeholder="ayesha@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">My Role</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Host', 'Bride', 'Groom'].map(role => (
                        <button
                          key={role}
                          onClick={() => setData({...data, role: role as 'Host' | 'Bride' | 'Groom'})}
                          className={`py-3 rounded-xl border text-sm font-bold transition-all ${
                            data.role === role ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-300'
                          }`}
                        >
                          I am a {role}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={data.isMultiDay}
                        onChange={(e) => setData({...data, isMultiDay: e.target.checked})}
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-slate-300"
                      />
                      Is this a multi-day event?
                    </label>
                    
                    {!data.isMultiDay ? (
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-emerald-600" /> Event Date
                        </label>
                        <input 
                          type="date" 
                          value={data.date}
                          onChange={(e) => setData({...data, date: e.target.value})}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
                        />
                      </div>
                    ) : (
                      <div className="space-y-3 border border-slate-200 p-4 rounded-xl bg-slate-50/50">
                        {data.events.map((evt, idx) => (
                          <div key={evt.id} className="flex items-center gap-3">
                            <input 
                              type="text"
                              value={evt.name}
                              onChange={(e) => {
                                const newEvts = [...data.events];
                                newEvts[idx].name = e.target.value;
                                setData({...data, events: newEvts});
                              }}
                              placeholder="e.g., Mehndi, Barat, Day 1"
                              className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm font-medium"
                            />
                            <input 
                              type="date"
                              value={evt.date}
                              onChange={(e) => {
                                const newEvts = [...data.events];
                                newEvts[idx].date = e.target.value;
                                setData({...data, events: newEvts});
                              }}
                              className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm font-medium"
                            />
                            {data.events.length > 1 && (
                              <button 
                                onClick={() => setData({...data, events: data.events.filter(e => e.id !== evt.id)})}
                                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                              >
                                <ArrowLeft className="w-4 h-4 rotate-45" /> {/* Using as X icon fallback */}
                              </button>
                            )}
                          </div>
                        ))}
                        <button 
                          onClick={() => setData({
                            ...data, 
                            events: [...data.events, { id: Date.now().toString(), name: `Event Day ${data.events.length + 1}`, date: '' }]
                          })}
                          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 mt-2"
                        >
                          + Add Another Day
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600" /> Primary City
                    </label>
                    <select 
                      value={data.city}
                      onChange={(e) => setData({...data, city: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
                    >
                      <option value="" disabled>Select a city</option>
                      <option value="lahore">Lahore</option>
                      <option value="karachi">Karachi</option>
                      <option value="islamabad">Islamabad</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-600" /> Estimated Guest Count
                    </label>
                    <input 
                      type="number" 
                      min="50"
                      step="50"
                      value={data.guests}
                      onChange={(e) => setData({...data, guests: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
                      placeholder="e.g., 300"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-600" /> Total Budget (PKR)
                  </label>
                  <input 
                    type="number" 
                    value={data.budget}
                    onChange={(e) => setData({...data, budget: e.target.value})}
                    className="w-full px-4 py-4 text-xl bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-bold"
                    placeholder="0"
                  />
                </div>
                
                <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 flex items-start gap-4">
                  <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg shrink-0">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-900 mb-1">Need help estimating?</h4>
                    <p className="text-xs text-emerald-700 mb-3 leading-relaxed">
                      Based on your {data.guests || '0'} guests, we can generate a baseline estimate for a standard Pakistani wedding.
                    </p>
                    <button 
                      onClick={estimateBudget}
                      className="text-xs font-bold bg-white text-emerald-700 border border-emerald-200 px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors shadow-sm"
                    >
                      Calculate Estimate
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="space-y-6 text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Invite Your Partner</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Planning is easier together. Invite your partner to collaborate on the budget, guest list, and vendor selection.
                </p>
                
                <div className="max-w-md mx-auto mt-6 text-left">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Partner's Email Address (Optional)
                  </label>
                  <input 
                    type="email" 
                    value={data.partnerEmail}
                    onChange={(e) => setData({...data, partnerEmail: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
                    placeholder="partner@example.com"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Controls */}
      <div className="bg-slate-50 px-8 py-5 border-t border-slate-100 flex justify-between items-center">
        <button 
          onClick={handleBack}
          disabled={step === 1}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all ${
            step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        
        {step < 4 ? (
          <button 
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-[#052E20] hover:bg-[#042017] text-white rounded-xl font-bold shadow-md shadow-emerald-900/20 transition-all hover:-translate-y-0.5"
          >
            Next Step <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button 
            onClick={handleFinish}
            disabled={isSubmitting}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-md transition-all hover:-translate-y-0.5 ${
              isSubmitting 
                ? 'bg-emerald-400 text-white/80 shadow-emerald-400/30 cursor-wait' 
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
            }`}
          >
            {isSubmitting ? 'Provisioning...' : 'Finish Setup'} <CheckCircle2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
