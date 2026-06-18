'use client';

import React, { useState } from 'react';
import { createEventAction } from './actions';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, Sparkles, Calendar, Users, DollarSign, Tag, Landmark } from 'lucide-react';
import Link from 'next/link';

export default function CreateEventPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    try {
      await createEventAction(formData);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-20 px-4 flex items-center justify-center font-sans">
      <div className="w-full max-w-xl">
        <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black text-[#5E6460] hover:text-[#0F5B3E] transition-colors mb-6 uppercase tracking-widest">
          <ArrowLeft size={12} /> Back to Home
        </Link>

        <Card className="border-[#E6E2DA] shadow-xl bg-[#FFFFFF] rounded-2xl overflow-hidden">
          <CardHeader className="bg-[#FAF7F2] border-b border-[#E6E2DA] p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-[#0F5B3E]/10 flex items-center justify-center mx-auto mb-4 border border-[#0F5B3E]/20">
              <Sparkles className="w-6 h-6 text-[#0F5B3E]" />
            </div>
            <CardTitle className="text-2xl font-black text-[#1D1C17] uppercase tracking-wider">Plan a New Event</CardTitle>
            <CardDescription className="text-sm text-[#5E6460] mt-2">
              Fill in the details below to create your event workspace.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-lg uppercase tracking-wider">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Event Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#5E6460] uppercase tracking-widest flex items-center gap-1.5">
                  <Tag size={12} /> Event Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Ayesha & Bilal Wedding Baraat"
                  className="w-full h-11 px-4 rounded-xl border border-[#E6E2DA] focus:border-[#0F5B3E] focus:ring-1 focus:ring-[#0F5B3E] outline-none text-sm font-medium transition-all bg-white text-[#1D1C17]"
                />
              </div>

              {/* Event Date & Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#5E6460] uppercase tracking-widest flex items-center gap-1.5">
                    <Calendar size={12} /> Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    className="w-full h-11 px-4 rounded-xl border border-[#E6E2DA] focus:border-[#0F5B3E] focus:ring-1 focus:ring-[#0F5B3E] outline-none text-sm font-medium transition-all bg-white text-[#1D1C17]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#5E6460] uppercase tracking-widest flex items-center gap-1.5">
                    <Landmark size={12} /> Event Type
                  </label>
                  <select
                    name="event_type"
                    className="w-full h-11 px-4 rounded-xl border border-[#E6E2DA] focus:border-[#0F5B3E] focus:ring-1 focus:ring-[#0F5B3E] outline-none text-sm font-medium transition-all bg-white text-[#1D1C17]"
                  >
                    <option value="wedding">Wedding / Baraat / Valima</option>
                    <option value="mehndi">Mehndi / Mayun</option>
                    <option value="corporate">Corporate Seminar / Exhibition</option>
                    <option value="birthday">Birthday Party</option>
                    <option value="concert">Concert / Fest</option>
                    <option value="other">Other Celebration</option>
                  </select>
                </div>
              </div>

              {/* Guest Count & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#5E6460] uppercase tracking-widest flex items-center gap-1.5">
                    <Users size={12} /> Expected Guests
                  </label>
                  <input
                    type="number"
                    name="guest_count"
                    placeholder="e.g. 400"
                    min="1"
                    className="w-full h-11 px-4 rounded-xl border border-[#E6E2DA] focus:border-[#0F5B3E] focus:ring-1 focus:ring-[#0F5B3E] outline-none text-sm font-medium transition-all bg-white text-[#1D1C17]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#5E6460] uppercase tracking-widest flex items-center gap-1.5">
                    <DollarSign size={12} /> Estimated Budget (PKR)
                  </label>
                  <input
                    type="number"
                    name="budget"
                    placeholder="e.g. 1500000"
                    min="0"
                    className="w-full h-11 px-4 rounded-xl border border-[#E6E2DA] focus:border-[#0F5B3E] focus:ring-1 focus:ring-[#0F5B3E] outline-none text-sm font-medium transition-all bg-white text-[#1D1C17]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#0F5B3E] hover:bg-[#0A422D] text-white font-bold rounded-xl transition-all shadow-md text-xs uppercase tracking-widest mt-4 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" /> Creating Workspace...
                  </>
                ) : (
                  'Create Event Workspace'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
