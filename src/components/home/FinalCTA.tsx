"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Users, MapPin, Search, Sparkles } from 'lucide-react';

export default function FinalCTA() {
  const router = useRouter();
  const [eventType, setEventType] = useState('');
  const [city, setCity] = useState('');
  const [guests, setGuests] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      eventType,
      city,
      guests,
      date
    }).toString();
    router.push(`/create-event?${query}`);
  };

  return (
    <section className="w-full bg-white px-4 py-16 overflow-hidden">
      <div className="max-w-[1280px] mx-auto bg-[#0F5B3E] rounded-[32px] p-8 md:p-12 relative shadow-[0_20px_50px_rgba(5,46,32,0.15)] overflow-hidden">
        
        {/* Background Decorative Rings/Glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-[#D4AF37]/20 to-transparent blur-3xl rounded-full -z-10 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-emerald-900/45 blur-3xl rounded-full -z-10 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center mb-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[10px] md:text-[11px] font-[700] tracking-[0.1em] text-white uppercase">Start Your Journey</span>
          </div>

          {/* Heading */}
          <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-[700] text-white font-serif tracking-tight leading-tight max-w-[800px] mb-4">
            Ready to Bring Your Event to Life?
          </h2>
          
          <p className="text-[14px] sm:text-[16px] text-[#E6F0EC] max-w-[600px] leading-relaxed font-[500]">
            Specify your event details below to configure your custom workspace, generate initial quotes, and get matching venue recommendations instantly.
          </p>
        </div>

        {/* Interactive Search Bar Form */}
        <form 
          onSubmit={handleSubmit}
          className="relative z-10 bg-white/95 backdrop-blur-md border border-[#ECE7DF] rounded-[24px] p-4 shadow-[0_15px_35px_rgba(0,0,0,0.05)] w-full max-w-[1000px] mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            
            {/* Event Type Select */}
            <div className="relative group">
              <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-[#0F5B3E] transition-colors pointer-events-none z-10" />
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                required
                className="w-full bg-transparent text-[13px] font-[600] text-gray-800 py-3.5 pl-9 pr-6 border border-[#ECE7DF] rounded-xl outline-none focus:border-[#0F5B3E] focus:ring-1 focus:ring-[#0F5B3E]/30 cursor-pointer appearance-none hover:bg-gray-50 transition-all"
              >
                <option value="" disabled>Event Type</option>
                <option value="wedding">Wedding / Valima</option>
                <option value="mehndi">Mehndi / Dholki</option>
                <option value="corporate">Corporate Event</option>
                <option value="birthday">Birthday Party</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none border-solid border-l-transparent border-r-transparent border-t-[4px] border-t-gray-400 w-0 h-0" />
            </div>

            {/* City Select */}
            <div className="relative group">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-[#0F5B3E] transition-colors pointer-events-none z-10" />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="w-full bg-transparent text-[13px] font-[600] text-gray-800 py-3.5 pl-9 pr-6 border border-[#ECE7DF] rounded-xl outline-none focus:border-[#0F5B3E] focus:ring-1 focus:ring-[#0F5B3E]/30 cursor-pointer appearance-none hover:bg-gray-50 transition-all"
              >
                <option value="" disabled>City</option>
                <option value="lahore">Lahore</option>
                <option value="karachi">Karachi</option>
                <option value="islamabad">Islamabad</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none border-solid border-l-transparent border-r-transparent border-t-[4px] border-t-gray-400 w-0 h-0" />
            </div>

            {/* Guests Input */}
            <div className="relative group">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-[#0F5B3E] transition-colors pointer-events-none z-10" />
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                placeholder="No. of Guests"
                required
                min="1"
                className="w-full bg-transparent text-[13px] font-[600] text-gray-800 py-3.5 pl-9 pr-4 border border-[#ECE7DF] rounded-xl outline-none focus:border-[#0F5B3E] focus:ring-1 focus:ring-[#0F5B3E]/30 placeholder-gray-400 hover:bg-gray-50 transition-all"
              />
            </div>

            {/* Date Input */}
            <div className="relative group">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-[#0F5B3E] transition-colors pointer-events-none z-10" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full bg-transparent text-[13px] font-[600] text-gray-800 py-3.5 pl-9 pr-3 border border-[#ECE7DF] rounded-xl outline-none focus:border-[#0F5B3E] focus:ring-1 focus:ring-[#0F5B3E]/30 hover:bg-gray-50 transition-all text-left"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full h-full py-3.5 bg-[#0F5B3E] hover:bg-[#0d4d34] text-white text-[13px] font-[700] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>Find Venues</span>
                <Search className="w-4 h-4" />
              </button>
            </div>

          </div>
        </form>

        {/* Supporting Text */}
        <div className="relative z-10 text-center mt-6">
          <p className="text-[12px] text-[#A2C7B8] font-[500]">
            Or want to register a service instead?{" "}
            <a href="/business" className="text-white underline hover:text-[#D4AF37] transition-colors font-bold">
              Register as Business
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
