'use client';

import React, { useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { 
  Sparkles, Share2, Palette, Clock, AlignLeft, Send, ArrowLeft, 
  Check, Smartphone, Volume2, VolumeX, ArrowRight, Calendar, MapPin, CheckCircle2 
} from 'lucide-react';

type ThemeKey = 'regal' | 'emerald' | 'mughal';
type FlowStep = 'intro' | 'details' | 'itinerary' | 'rsvp';

export default function FullyInteractiveMusicalEInvite() {
  const params = useParams();
  const bookingId = params?.bookingId as string;

  // --- Dynamic Style Matrix ---
  const themes = {
    regal: { name: 'Regal Ivory & Gold', bg: 'bg-[#FAF5EC]', border: 'border-[#C5A880]', text: 'text-slate-900', secondary: 'text-[#C5A880]', accent: 'bg-[#C5A880]', cardBg: 'bg-white/80' },
    emerald: { name: 'Emerald Palace', bg: 'bg-[#0A2F21]', border: 'border-[#C5A880]/40', text: 'text-[#FAF5EC]', secondary: 'text-[#C5A880]', accent: 'bg-[#0F5B3E]', cardBg: 'bg-emerald-950/60' },
    mughal: { name: 'Mughal Ruby', bg: 'bg-[#4A0E17]', border: 'border-[#D4AF37]/40', text: 'text-[#FAF5EC]', secondary: 'text-[#D4AF37]', accent: 'bg-[#D4AF37]', cardBg: 'bg-rose-950/60' },
  };

  // --- State Primitives ---
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>('regal');
  const [headlineText, setHeadlineText] = useState<string>('Zain & Fatima');
  const [ceremonyTime, setCeremonyTime] = useState<string>('Baraat: Nov 14, 7:00 PM');
  const [venueAddress, setVenueAddress] = useState<string>('The Royal Palm Marquee, E-11, Islamabad');
  const [customUrduGreeting, setCustomUrduGreeting] = useState<string>('تشریف آوری آپ کی باعث مسرت ہوگی');
  const [isLiveLinkGenerated, setIsLiveLinkGenerated] = useState<boolean>(false);

  // --- Live Interactive Flow & Audio States ---
  const [currentPreviewStep, setCurrentPreviewStep] = useState<FlowStep>('intro');
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [rsvpCount, setRsvpCount] = useState<string>('2');
  const [rsvpConfirmed, setRsvpConfirmed] = useState<boolean>(false);

  const activeStyle = themes[selectedTheme];

  const handlePublishDigitalInvite = () => {
    setIsLiveLinkGenerated(true);
    alert("Masha'Allah! Your fully interactive musical invite flow is published live.");
  };

  const handleShareWhatsAppInvite = () => {
    const inviteUrl = `https://nexus-app-pakistan.vercel.app/invite/${bookingId}`;
    const shareText = `✨ *Interactive Wedding Invitation* ✨\n\n🕊️ You are cordially invited to the wedding celebration of *${headlineText}*.\n\n🎵 Experience the full musical invitation flow system, view itinerary details, maps, and submit your RSVP live here:\n${inviteUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 pb-16 antialiased font-sans">
      
      {/* Configuration Navigation Header */}
      <header className="border-b border-[#C5A880]/20 bg-white sticky top-0 z-40 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <a href={`/portal/${bookingId}`} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
            <ArrowLeft className="w-4 h-4 text-slate-500" />
          </a>
          <div>
            <span className="text-[9px] uppercase font-black tracking-widest text-[#C5A880]">Nexus Symphony Engine</span>
            <h1 className="text-base font-serif font-black text-slate-950 tracking-tight">Interactive Musical E-Invite</h1>
          </div>
        </div>
        
        {isLiveLinkGenerated && (
          <button
            type="button"
            onClick={handleShareWhatsAppInvite}
            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-1.5 animate-fade-in"
          >
            <Share2 className="w-3.5 h-3.5" /> Share Interactive Flow
          </button>
        )}
      </header>

      {/* Workspace Configuration Split Layout */}
      <main className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Input Controllers & Customization Engine Form */}
        <div className="lg:col-span-5 bg-white border border-[#C5A880]/20 rounded-2xl p-6 shadow-sm space-y-6 h-fit">
          <div className="space-y-1">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-[#0F5B3E]" /> Content & Design Tuning
            </h3>
            <p className="text-[11px] text-slate-400">Manage interactive elements, melody options, and calligraphic texts.</p>
          </div>

          {/* Theme Palette Matrix */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Visual Aesthetics Template Theme</label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(themes) as ThemeKey[]).map((themeKey) => (
                <button
                  key={themeKey}
                  type="button"
                  onClick={() => setSelectedTheme(themeKey)}
                  className={`p-2.5 rounded-xl border text-left text-[11px] font-bold transition-all ${
                    selectedTheme === themeKey ? 'border-[#0F5B3E] bg-[#0F5B3E]/5 text-slate-900 shadow-sm' : 'border-slate-200 text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {themes[themeKey].name}
                </button>
              ))}
            </div>
          </div>

          {/* Wording Content Parameters Inputs */}
          <div className="space-y-4 pt-3 border-t border-slate-100">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Couple Names Headline</label>
              <input type="text" value={headlineText} onChange={(e) => setHeadlineText(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-xl focus:outline-none" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Ceremony Timings Vector</label>
              <input type="text" value={ceremonyTime} onChange={(e) => setCeremonyTime(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-xl focus:outline-none" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Physical Venue Address Coordinate</label>
              <input type="text" value={venueAddress} onChange={(e) => setVenueAddress(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-xl focus:outline-none" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Urdu Welcome Blessing Script</label>
              <input type="text" value={customUrduGreeting} onChange={(e) => setCustomUrduGreeting(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-xl text-right font-serif focus:outline-none" />
            </div>
          </div>

          <button
            type="button"
            onClick={handlePublishDigitalInvite}
            className="w-full bg-slate-950 hover:bg-slate-900 text-white font-black text-xs uppercase tracking-widest py-3 rounded-xl transition-all shadow-md"
          >
            Generate & Sync Live Interactive Canvas
          </button>
        </div>

        {/* RIGHT COLUMN: Live Interactive Flow System Smartphone Simulator */}
        <div className="lg:col-span-7 flex flex-col items-center">
          
          {/* Simulation Helper Selector Tabs */}
          <div className="flex bg-slate-100 border border-slate-200 p-1 rounded-xl text-[9px] font-black uppercase tracking-wider mb-4 shadow-sm">
            {(['intro', 'details', 'itinerary', 'rsvp'] as FlowStep[]).map((step) => (
              <button
                key={step}
                onClick={() => setCurrentPreviewStep(step)}
                className={`px-3 py-1.5 rounded-lg transition-all ${currentPreviewStep === step ? 'bg-white text-[#0F5B3E] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {step === 'intro' ? '1. Welcome Card' : step === 'details' ? '2. Core Details' : step === 'itinerary' ? '3. Schedule Map' : '4. RSVP Portal'}
              </button>
            ))}
          </div>

          {/* Smartphone Hardware Frame Wrapper */}
          <div className="w-full max-w-[320px] aspect-[9/19] rounded-[44px] border-[12px] border-slate-900 p-3.5 bg-slate-950 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-4 bg-slate-950 rounded-b-2xl flex justify-center z-50"><div className="w-24 h-3 bg-slate-900 rounded-full" /></div>
            
            {/* Dynamic Musical E-Invite Presentation Display Node */}
            <div className={`w-full h-full rounded-[30px] overflow-hidden flex flex-col justify-between p-6 border transition-all duration-300 relative text-center backdrop-blur-sm ${activeStyle.bg} ${activeStyle.border}`}>
              
              {/* TOP HUD: Real-time Audio System Control Pill */}
              <div className="w-full flex justify-between items-center z-20">
                <span className={`text-[8px] uppercase tracking-widest font-black ${activeStyle.secondary}`}>Nexus Live Invite</span>
                <button 
                  onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                  className={`p-1.5 rounded-full backdrop-blur-md transition-all border ${isPlayingMusic ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 animate-pulse' : 'bg-white/10 text-slate-400 border-white/10'}`}
                >
                  {isPlayingMusic ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* CORE INTERACTIVE FLOW SCENE SWITCHER ROOT CONTAINER */}
              <div className="flex-1 flex flex-col justify-center items-center my-auto py-4 z-10 w-full">
                
                {/* FLOW SCREEN 1: Welcome Cinematic Greeting */}
                {currentPreviewStep === 'intro' && (
                  <div className="space-y-4 animate-fade-in w-full">
                    <span className={`text-[9px] uppercase tracking-widest font-black block animate-bounce ${activeStyle.secondary}`}>You are Invited</span>
                    <h2 className={`font-serif text-lg font-black tracking-wide leading-relaxed ${activeStyle.text}`}>
                      {customUrduGreeting}
                    </h2>
                    <div className={`w-8 h-0.5 mx-auto opacity-30 ${activeStyle.accent}`} />
                    <p className={`font-serif text-xl font-bold ${activeStyle.text}`}>{headlineText}</p>
                    <button onClick={() => setCurrentPreviewStep('details')} className={`mx-auto mt-4 px-4 py-2 text-[9px] font-black uppercase tracking-wider text-white rounded-lg flex items-center gap-1 shadow-md ${activeStyle.accent}`}>
                      Enter Invitation <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* FLOW SCREEN 2: Core Details Segment */}
                {currentPreviewStep === 'details' && (
                  <div className="space-y-4 animate-fade-in w-full text-center">
                    <div className="p-4 rounded-2xl border border-slate-200/10 shadow-inner space-y-3 bg-black/5">
                      <Calendar className="w-5 h-5 mx-auto text-[#C5A880]" />
                      <div>
                        <span className={`text-[7px] uppercase font-black tracking-widest block ${activeStyle.secondary}`}>Celebration Timing</span>
                        <p className={`text-xs font-black mt-0.5 ${activeStyle.text}`}>{ceremonyTime}</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl border border-slate-200/10 shadow-inner space-y-3 bg-black/5">
                      <MapPin className="w-5 h-5 mx-auto text-[#C5A880]" />
                      <div>
                        <span className={`text-[7px] uppercase font-black tracking-widest block ${activeStyle.secondary}`}>Venue Coordination</span>
                        <p className={`text-[10px] font-bold leading-relaxed mt-0.5 ${activeStyle.text}`}>{venueAddress}</p>
                      </div>
                    </div>
                    <button onClick={() => setCurrentPreviewStep('itinerary')} className={`mx-auto px-4 py-2 text-[9px] font-black uppercase tracking-wider text-white rounded-lg flex items-center gap-1 shadow-md ${activeStyle.accent}`}>
                      View Full Itinerary <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* FLOW SCREEN 3: Interactive Itinerary Logistics Mapping */}
                {currentPreviewStep === 'itinerary' && (
                  <div className="space-y-3 animate-fade-in w-full text-left">
                    <span className={`text-[8px] uppercase tracking-widest font-black block text-center ${activeStyle.secondary}`}>Ceremony Timeline Breakdown</span>
                    <div className="space-y-2 max-w-[240px] mx-auto pt-2">
                      <div className="border-l-2 border-[#C5A880] pl-3 relative pb-2">
                        <div className="absolute w-2 h-2 rounded-full bg-[#C5A880] -left-[5px] top-1" />
                        <span className={`text-[8px] font-black block ${activeStyle.secondary}`}>07:00 PM</span>
                        <span className={`text-[10px] font-bold block ${activeStyle.text}`}>Reception of Baraat & Guest Arrival</span>
                      </div>
                      <div className="border-l-2 border-[#C5A880] pl-3 relative pb-2">
                        <div className="absolute w-2 h-2 rounded-full bg-[#C5A880] -left-[5px] top-1" />
                        <span className={`text-[8px] font-black block ${activeStyle.secondary}`}>08:30 PM</span>
                        <span className={`text-[10px] font-bold block ${activeStyle.text}`}>Nikah Ceremony & Ring Exchange</span>
                      </div>
                      <div className="border-l-2 border-transparent pl-3 relative">
                        <div className="absolute w-2 h-2 rounded-full bg-[#0F5B3E] -left-[5px] top-1" />
                        <span className={`text-[8px] font-black block text-emerald-500`}>09:30 PM</span>
                        <span className={`text-[10px] font-bold block ${activeStyle.text}`}>Royal Dinner & Traditional Rukhsati</span>
                      </div>
                    </div>
                    <button onClick={() => setCurrentPreviewStep('rsvp')} className={`mx-auto mt-2 px-4 py-2 text-[9px] font-black uppercase tracking-wider text-white rounded-lg flex items-center gap-1 shadow-md ${activeStyle.accent}`}>
                      Confirm Attendance <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* FLOW SCREEN 4: Integrated Interactive RSVP Capture Node */}
                {currentPreviewStep === 'rsvp' && (
                  <div className="space-y-4 animate-fade-in w-full">
                    <span className={`text-[9px] uppercase tracking-widest font-black block ${activeStyle.secondary}`}>Digital RSVP Registry</span>
                    
                    {rsvpConfirmed ? (
                      <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-center space-y-1.5">
                        <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-400" />
                        <p className="text-[10px] font-black uppercase tracking-wider">Attendance Confirmed!</p>
                        <p className="text-[9px] opacity-80">Shukriya. Your response has been logged securely into the Host database matrix.</p>
                      </div>
                    ) : (
                      <div className="bg-black/5 border border-white/5 p-4 rounded-xl space-y-3 text-center">
                        <label className={`text-[8px] font-black uppercase tracking-wider block ${activeStyle.secondary}`}>Number of Guests Attending</label>
                        <select value={rsvpCount} onChange={(e) => setRsvpCount(e.target.value)} className="w-full bg-white text-slate-800 text-xs py-1.5 px-2 rounded-lg border border-slate-200 font-bold focus:outline-none">
                          <option value="1">1 Person</option>
                          <option value="2">2 Persons (Family Bundle)</option>
                          <option value="4">4 Persons (Extended Group)</option>
                        </select>
                        <button type="button" onClick={() => setRsvpConfirmed(true)} className="w-full bg-[#0F5B3E] text-white font-black text-[9px] uppercase tracking-widest py-2 rounded-lg transition-all shadow-sm">
                          Submit RSVP Registration
                        </button>
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* BOTTOM HUD: Permanent Viral Growth Loop Credit */}
              <div className="pt-3 border-t border-slate-200/10 text-center z-20">
                <span className="text-[7px] text-slate-400 tracking-wider block uppercase font-medium">Curated Powered Via</span>
                <span className="inline-block text-[8px] font-black uppercase tracking-widest bg-amber-400 text-slate-950 px-2 py-0.5 rounded mt-0.5 shadow-sm">
                  Nexus Heritage
                </span>
              </div>

            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
