"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { ChevronRight, ChevronLeft, Calendar, Eye, Clock, Upload, Music, Lock, Users, Sparkles, X, Plus, Trash2, CheckCircle2, PlayCircle, Send, Link as LinkIcon, Share2, Phone, PauseCircle, MapPin, Grid, MessageSquare, Layout, Smartphone, Archive, Bell } from 'lucide-react';

export function InvitationBuilder() {
  const [step, setStep] = useState(1);
  const totalSteps = 16;

  // --- GLOBAL STATE ---
  const [info, setInfo] = useState({
    eventName: '', eventType: 'Wedding', hostNames: '', date: '', time: '', venue: '', address: '', mapsLink: '', description: ''
  });
  const [experience, setExperience] = useState('Single Event');
  const availableThemes = [
    { id: 'royal', name: 'Royal Emerald', bgImage: 'https://images.unsplash.com/photo-1544425884-d92ea407c0b0?auto=format&fit=crop&q=80', overlay: 'from-black via-black/40 to-transparent' },
    { id: 'minimal', name: 'Minimal White', bgImage: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&q=80', overlay: 'from-black/60 via-black/20 to-transparent' },
    { id: 'lahori', name: 'Lahori Heritage', bgImage: 'https://images.unsplash.com/photo-1583939000003-88c9fae88a3b?auto=format&fit=crop&q=80', overlay: 'from-black/90 via-black/40 to-transparent' },
    { id: 'floral', name: 'Rose Garden', bgImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80', overlay: 'from-rose-900/80 via-black/20 to-transparent' },
  ];
  const [theme, setTheme] = useState(availableThemes[0]);
  const [story, setStory] = useState([{ title: '', time: '', desc: '' }]);
  const [uploadedPics, setUploadedPics] = useState<{name: string, url: string}[]>([]);
  const [music, setMusic] = useState('None');
  const [timeline, setTimeline] = useState([{ time: '', event: '' }]);
  const [rsvpSettings, setRsvpSettings] = useState({ diet: true, transport: false, guests: true, accommodation: false });
  const [access, setAccess] = useState('Public');
  const [portalTabs, setPortalTabs] = useState({ welcome: true, details: true, gallery: true, updates: true, faq: false });
  const [wishWall, setWishWall] = useState(false);
  const [seating, setSeating] = useState(false);
  const [dayMode, setDayMode] = useState(true);
  const [memories, setMemories] = useState(true);

  const [language, setLanguage] = useState('English');
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Modals
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedLink, setPublishedLink] = useState("");

  const stepsDef = [
    { num: 1, title: "Event Info", icon: Calendar },
    { num: 2, title: "Experience", icon: Grid },
    { num: 3, title: "Theme", icon: Eye },
    { num: 4, title: "Story", icon: Clock },
    { num: 5, title: "Media", icon: Upload },
    { num: 6, title: "Music", icon: Music },
    { num: 7, title: "Timeline", icon: Calendar },
    { num: 8, title: "RSVP", icon: Users },
    { num: 9, title: "Guests", icon: Users },
    { num: 10, title: "QR Pass", icon: Lock },
    { num: 11, title: "Portal", icon: LinkIcon },
    { num: 12, title: "Updates", icon: Bell },
    { num: 13, title: "Wish Wall", icon: MessageSquare },
    { num: 14, title: "Seating", icon: Layout },
    { num: 15, title: "Day Mode", icon: Smartphone },
    { num: 16, title: "Memories", icon: Archive },
  ];

  const handleAIFill = () => {
    setAiLoading(true);
    setTimeout(() => {
      setInfo({ eventName: "Ali & Fatima's Royal Wedding", eventType: 'Wedding', hostNames: "Ali & Fatima", date: "2026-12-24", time: "19:00", venue: "Shalimar Gardens", address: "Lahore, PK", mapsLink: "maps.google.com", description: "Join us to celebrate our union." });
      setExperience('Multi-Day Event Journey');
      setTheme(availableThemes[0]);
      setStory([
        { title: 'How We Met', time: '2024-08-15T10:00', desc: 'A chance encounter that changed everything.' },
        { title: 'The Engagement', time: '2025-06-20T18:00', desc: 'A beautiful evening surrounded by family.' }
      ]);
      setTimeline([{ time: '19:00', event: 'Guest Arrival' }, { time: '20:30', event: 'Dinner' }]);
      setMusic('Traditional Sitar');
      setAccess('QR Protected');
      setWishWall(true);
      setMemories(true);
      setAiLoading(false);
      setShowAIModal(false);
    }, 2500);
  };

  const addStoryEvent = () => setStory([...story, { title: '', time: '', desc: '' }]);
  const updateStory = (index: number, field: string, value: string) => { const n = [...story]; n[index] = { ...n[index], [field]: value }; setStory(n); };
  const removeStory = (index: number) => setStory(story.filter((_, i) => i !== index));

  const addTimeline = () => setTimeline([...timeline, { time: '', event: '' }]);
  const updateTimeline = (index: number, field: string, value: string) => { const n = [...timeline]; n[index] = { ...n[index], [field]: value }; setTimeline(n); };

  return (
    <section id="builder" className="w-full bg-[#1D1C17] py-24 px-4 md:px-8 relative">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">Invitation Builder V2</h2>
            <p className="text-white/60 text-lg">The Complete Guest Experience Platform.</p>
          </div>
          <button onClick={() => setShowAIModal(true)} className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#C9A227] to-[#B08D22] border border-white/20 hover:scale-105 transition-all shadow-[0_10px_40px_-10px_rgba(201,162,39,0.8)]">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
            <span className="text-white font-bold tracking-wide">NEXUS AI Magic Fill</span>
          </button>
        </div>

        <div className="bg-[#FAF7F2] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[750px]">
          
          {/* Left Panel */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col border-r border-[#E6E2DA]">
            
            {/* Horizontal Scrolling Step Indicator */}
            <div className="flex items-center mb-12 relative overflow-x-auto no-scrollbar pb-6 gap-6">
              <div className="absolute top-5 left-0 w-[800px] h-[2px] bg-[#E6E2DA] -z-10" />
              <div className="absolute top-5 left-0 h-[2px] bg-[#0F5B3E] -z-10 transition-all duration-500" style={{ width: `${((step - 1) / (totalSteps - 1)) * 800}px` }} />
              
              {stepsDef.map((s) => {
                const Icon = s.icon;
                const isActive = step === s.num;
                const isPassed = step > s.num;
                return (
                  <div key={s.num} className="flex flex-col items-center gap-2 shrink-0 cursor-pointer" onClick={() => setStep(s.num)}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors border-2 ${isActive ? 'bg-[#0F5B3E] border-[#0F5B3E] text-white shadow-lg scale-110' : isPassed ? 'bg-[#0F5B3E] border-[#0F5B3E] text-white' : 'bg-[#FAF7F2] border-[#E6E2DA] text-[#5E6460]'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-[#0F5B3E]' : 'text-[#5E6460]'}`}>{s.title}</span>
                  </div>
                )
              })}
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar pb-8 pr-2">
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                  
                  {step === 1 && (
                    <>
                      <h3 className="text-2xl font-serif font-bold text-[#1D1C17]">Event Creation</h3>
                      <div className="space-y-4">
                        <div><label className="text-xs font-bold text-[#5E6460] uppercase mb-1 block">Event Type</label><select value={info.eventType} onChange={e=>setInfo({...info, eventType: e.target.value})} className="w-full bg-white border border-[#E6E2DA] rounded-xl px-4 py-3 focus:outline-none"><option>Wedding</option><option>Corporate</option><option>Birthday</option><option>Other</option></select></div>
                        <div><label className="text-xs font-bold text-[#5E6460] uppercase mb-1 block">Event Name</label><input type="text" value={info.eventName} onChange={e=>setInfo({...info, eventName: e.target.value})} className="w-full bg-white border border-[#E6E2DA] rounded-xl px-4 py-3" /></div>
                        <div><label className="text-xs font-bold text-[#5E6460] uppercase mb-1 block">Host Names</label><input type="text" value={info.hostNames} onChange={e=>setInfo({...info, hostNames: e.target.value})} className="w-full bg-white border border-[#E6E2DA] rounded-xl px-4 py-3" /></div>
                        <div className="grid grid-cols-2 gap-4">
                          <div><label className="text-xs font-bold text-[#5E6460] uppercase mb-1 block">Date</label><input type="date" value={info.date} onChange={e=>setInfo({...info, date: e.target.value})} className="w-full bg-white border border-[#E6E2DA] rounded-xl px-4 py-3" /></div>
                          <div><label className="text-xs font-bold text-[#5E6460] uppercase mb-1 block">Time</label><input type="time" value={info.time} onChange={e=>setInfo({...info, time: e.target.value})} className="w-full bg-white border border-[#E6E2DA] rounded-xl px-4 py-3" /></div>
                        </div>
                        <div><label className="text-xs font-bold text-[#5E6460] uppercase mb-1 block">Venue</label><input type="text" value={info.venue} onChange={e=>setInfo({...info, venue: e.target.value})} className="w-full bg-white border border-[#E6E2DA] rounded-xl px-4 py-3" /></div>
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <h3 className="text-2xl font-serif font-bold text-[#1D1C17]">Experience Type</h3>
                      <div className="space-y-4">
                        {['Single Event', 'Multi-Day Event Journey'].map(t => (
                          <div key={t} onClick={() => setExperience(t)} className={`p-4 rounded-xl border cursor-pointer ${experience === t ? 'bg-[#E6F0EC] border-[#0F5B3E]' : 'bg-white border-[#E6E2DA]'}`}>
                            <span className={`font-bold ${experience === t ? 'text-[#0F5B3E]' : 'text-[#1D1C17]'}`}>{t}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <h3 className="text-2xl font-serif font-bold text-[#1D1C17]">Select Theme</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {availableThemes.map(t => (
                          <div key={t.id} onClick={() => setTheme(t)} className={`aspect-[3/4] rounded-xl bg-cover bg-center cursor-pointer relative ${theme.id === t.id ? 'border-4 border-[#0F5B3E] shadow-lg' : 'border-2 border-transparent'}`} style={{ backgroundImage: `url('${t.bgImage}')` }}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg" />
                            <div className="absolute bottom-3 left-3 right-3 text-center text-sm font-bold text-white">{t.name}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {step === 4 && (
                    <>
                      <h3 className="text-2xl font-serif font-bold text-[#1D1C17]">Visual Story Builder</h3>
                      <button onClick={addStoryEvent} className="text-sm font-bold text-[#0F5B3E] flex items-center gap-1"><Plus className="w-4 h-4"/> Add Story Block</button>
                      <div className="space-y-4 mt-4">
                        {story.map((event, idx) => (
                          <div key={idx} className="bg-white p-4 rounded-xl border border-[#E6E2DA] space-y-3 relative group">
                            <button onClick={() => removeStory(idx)} className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                            <input type="text" value={event.title} onChange={e => updateStory(idx, 'title', e.target.value)} placeholder="Title" className="w-[90%] bg-transparent border-b focus:outline-none font-bold text-[#1D1C17]" />
                            <input type="datetime-local" value={event.time} onChange={e => updateStory(idx, 'time', e.target.value)} className="w-full bg-transparent border-none text-sm text-[#0F5B3E]" />
                            <textarea value={event.desc} onChange={e => updateStory(idx, 'desc', e.target.value)} placeholder="Description..." rows={2} className="w-full bg-[#FAF7F2] rounded-lg p-3 text-sm focus:outline-none" />
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {step === 5 && (
                    <>
                      <h3 className="text-2xl font-serif font-bold text-[#1D1C17]">Media Manager</h3>
                      <label htmlFor="media-upload" className="w-full h-48 border-2 border-dashed border-[#C9A227] rounded-2xl bg-[#FDF8EA] flex flex-col items-center justify-center cursor-pointer">
                        <Upload className="w-8 h-8 text-[#C9A227] mb-2" />
                        <span className="font-bold">Upload Photos & Video</span>
                        <input id="media-upload" type="file" multiple accept="image/*" className="hidden" onChange={(e) => {
                          if (e.target.files) setUploadedPics([...uploadedPics, ...Array.from(e.target.files).map(f => ({name: f.name, url: URL.createObjectURL(f)}))]);
                        }}/>
                      </label>
                      <div className="grid grid-cols-4 gap-2 mt-4">
                        {uploadedPics.map((pic, i) => <div key={i} className="aspect-square rounded-lg bg-cover bg-center" style={{ backgroundImage: `url('${pic.url}')` }} />)}
                      </div>
                    </>
                  )}

                  {step === 6 && (
                    <>
                      <h3 className="text-2xl font-serif font-bold text-[#1D1C17]">Music Experience</h3>
                      <div className="space-y-3">
                        {['None', 'Traditional Sitar', 'Modern Cinematic', 'Soft Piano', 'Upload Custom Track'].map(track => (
                          <div key={track} onClick={() => setMusic(track)} className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer ${music === track ? 'bg-[#E6F0EC] border-[#0F5B3E]' : 'bg-white'}`}>
                            <div className="flex items-center gap-3"><PlayCircle className="w-5 h-5"/> <span className="font-bold text-sm">{track}</span></div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {step === 7 && (
                    <>
                      <h3 className="text-2xl font-serif font-bold text-[#1D1C17]">Event Timeline</h3>
                      <button onClick={addTimeline} className="text-sm font-bold text-[#0F5B3E] flex items-center gap-1 mb-4"><Plus className="w-4 h-4"/> Add Schedule Item</button>
                      <div className="space-y-3">
                        {timeline.map((t, idx) => (
                          <div key={idx} className="flex gap-2 bg-white p-3 rounded-xl border border-[#E6E2DA]">
                            <input type="time" value={t.time} onChange={e => updateTimeline(idx, 'time', e.target.value)} className="w-1/3 outline-none font-bold text-[#0F5B3E] bg-transparent" />
                            <input type="text" value={t.event} onChange={e => updateTimeline(idx, 'event', e.target.value)} placeholder="Event Name" className="w-2/3 outline-none" />
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {step === 8 && (
                    <>
                      <h3 className="text-2xl font-serif font-bold text-[#1D1C17]">RSVP Management</h3>
                      <div className="space-y-4 mt-4">
                        {[{id:'guests', label:'Guest Count (+1s)'}, {id:'diet', label:'Meal Preference'}, {id:'transport', label:'Transport Needs'}, {id:'accommodation', label:'Accommodation Req'}].map(s => (
                          <div key={s.id} className="flex justify-between p-4 bg-white rounded-xl border border-[#E6E2DA]">
                            <span className="font-bold text-sm">{s.label}</span>
                            <button onClick={() => setRsvpSettings({...rsvpSettings, [s.id]: !(rsvpSettings as any)[s.id]})} className={`w-12 h-6 rounded-full p-1 transition-colors ${(rsvpSettings as any)[s.id] ? 'bg-[#0F5B3E]' : 'bg-[#E6E2DA]'}`}>
                              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${(rsvpSettings as any)[s.id] ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {step === 9 && (
                    <>
                      <h3 className="text-2xl font-serif font-bold text-[#1D1C17]">Guest Management</h3>
                      <p className="text-sm text-[#5E6460]">Import guests to segment and track individually.</p>
                      <div className="flex gap-4 mt-4">
                        <button className="flex-1 py-3 bg-[#25D366] text-white rounded-xl font-bold">Import via WhatsApp</button>
                        <button className="flex-1 py-3 bg-white border border-[#E6E2DA] text-[#1D1C17] rounded-xl font-bold">Upload CSV</button>
                      </div>
                    </>
                  )}

                  {step === 10 && (
                    <>
                      <h3 className="text-2xl font-serif font-bold text-[#1D1C17]">QR Pass System</h3>
                      <div className="space-y-4 mt-4">
                        {['Public', 'Password Protected', 'QR Protected'].map(type => (
                          <div key={type} onClick={() => setAccess(type)} className={`p-4 rounded-xl border cursor-pointer ${access === type ? 'bg-[#E6F0EC] border-[#0F5B3E]' : 'bg-white'}`}>
                            <span className="font-bold text-sm">{type}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {step === 11 && (
                    <>
                      <h3 className="text-2xl font-serif font-bold text-[#1D1C17]">Digital Guest Portal</h3>
                      <p className="text-sm text-[#5E6460]">Configure which tabs are visible to guests.</p>
                      <div className="space-y-3 mt-4">
                        {Object.keys(portalTabs).map(tab => (
                          <div key={tab} className="flex justify-between p-3 bg-white rounded-xl border border-[#E6E2DA]">
                            <span className="font-bold text-sm capitalize">{tab}</span>
                            <button onClick={() => setPortalTabs({...portalTabs, [tab]: !(portalTabs as any)[tab]})} className={`w-10 h-5 rounded-full p-1 ${(portalTabs as any)[tab] ? 'bg-[#0F5B3E]' : 'bg-[#E6E2DA]'}`}><div className={`w-3 h-3 bg-white rounded-full ${(portalTabs as any)[tab] ? 'translate-x-5' : 'translate-x-0'}`} /></button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {step === 12 && (
                    <>
                      <h3 className="text-2xl font-serif font-bold text-[#1D1C17]">Live Event Updates</h3>
                      <div className="bg-[#FDF8EA] border border-[#C9A227] p-4 rounded-xl">
                        <Bell className="w-6 h-6 text-[#C9A227] mb-2" />
                        <h4 className="font-bold">Push Notifications</h4>
                        <p className="text-sm">When published, you can push live traffic alerts or schedule changes to all guests.</p>
                      </div>
                    </>
                  )}

                  {step === 13 && (
                    <>
                      <h3 className="text-2xl font-serif font-bold text-[#1D1C17]">Wish Wall</h3>
                      <div className="flex justify-between p-4 bg-white rounded-xl border border-[#E6E2DA]">
                        <div><span className="font-bold text-sm block">Enable Wish Wall</span><span className="text-xs text-[#5E6460]">Guests can upload photos & voice notes</span></div>
                        <button onClick={() => setWishWall(!wishWall)} className={`w-12 h-6 rounded-full p-1 ${wishWall ? 'bg-[#0F5B3E]' : 'bg-[#E6E2DA]'}`}><div className={`w-4 h-4 bg-white rounded-full ${wishWall ? 'translate-x-6' : 'translate-x-0'}`} /></button>
                      </div>
                    </>
                  )}

                  {step === 14 && (
                    <>
                      <h3 className="text-2xl font-serif font-bold text-[#1D1C17]">Seating Management</h3>
                      <div className="bg-gradient-to-r from-[#1D1C17] to-[#3a3934] text-white p-6 rounded-xl flex flex-col items-center text-center">
                        <Layout className="w-8 h-8 text-[#C9A227] mb-3" />
                        <h4 className="font-bold text-lg text-[#C9A227]">Premium Feature</h4>
                        <p className="text-sm opacity-80 mt-2">Unlock AI-powered table assignments and family grouping.</p>
                        <button className="mt-4 px-6 py-2 bg-[#C9A227] text-black font-bold rounded-full text-sm">Upgrade Workspace</button>
                      </div>
                    </>
                  )}

                  {step === 15 && (
                    <>
                      <h3 className="text-2xl font-serif font-bold text-[#1D1C17]">Event Day Mode</h3>
                      <div className="flex justify-between p-4 bg-white rounded-xl border border-[#E6E2DA]">
                        <div><span className="font-bold text-sm block">Enable Day Mode</span><span className="text-xs text-[#5E6460]">Transforms invite into a live companion app</span></div>
                        <button onClick={() => setDayMode(!dayMode)} className={`w-12 h-6 rounded-full p-1 ${dayMode ? 'bg-[#0F5B3E]' : 'bg-[#E6E2DA]'}`}><div className={`w-4 h-4 bg-white rounded-full ${dayMode ? 'translate-x-6' : 'translate-x-0'}`} /></button>
                      </div>
                    </>
                  )}

                  {step === 16 && (
                    <>
                      <h3 className="text-2xl font-serif font-bold text-[#1D1C17]">Memories Transformation</h3>
                      <div className="flex justify-between p-4 bg-white rounded-xl border border-[#E6E2DA]">
                        <div><span className="font-bold text-sm block">Auto-Archive</span><span className="text-xs text-[#5E6460]">Converts microsite into a memories portal after event</span></div>
                        <button onClick={() => setMemories(!memories)} className={`w-12 h-6 rounded-full p-1 ${memories ? 'bg-[#0F5B3E]' : 'bg-[#E6E2DA]'}`}><div className={`w-4 h-4 bg-white rounded-full ${memories ? 'translate-x-6' : 'translate-x-0'}`} /></button>
                      </div>
                    </>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-auto flex items-center justify-between pt-6 border-t border-[#E6E2DA] shrink-0">
              <button onClick={() => setStep(Math.max(1, step - 1))} className={`px-6 py-3 rounded-full font-bold flex items-center gap-2 ${step === 1 ? 'opacity-0 pointer-events-none' : 'bg-white text-[#5E6460]'}`}>
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={() => { if (step === totalSteps) setShowPublishModal(true); else setStep(Math.min(totalSteps, step + 1)); }} className="px-8 py-3 bg-[#0F5B3E] hover:bg-[#0A422C] text-white rounded-full font-bold flex items-center gap-2 shadow-[0_4px_14px_0_rgba(15,91,62,0.39)]">
                {step === totalSteps ? 'Publish Invitation' : 'Next Step'} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
          </div>

          {/* Right Panel: Live Mobile Preview */}
          <div className="w-full lg:w-1/2 bg-[#F2EFE9] p-8 lg:p-12 flex items-center justify-center bg-[url('/images/noise.png')] opacity-95 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase z-10 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Live Preview
            </div>

            <div className="relative w-[320px] h-[650px] bg-black rounded-[3rem] border-[8px] border-black shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-50"></div>
              
              <div className="w-full h-full bg-[#1D1C17] relative flex flex-col overflow-y-auto no-scrollbar pb-10">
                <div className="absolute inset-0 bg-cover bg-center h-[650px]" style={{ backgroundImage: `url('${theme.bgImage}')` }} />
                <div className={`absolute inset-0 bg-gradient-to-t ${theme.overlay} h-[650px]`} />
                
                <div className="relative z-10 flex flex-col items-center justify-end p-8 text-center min-h-[650px]">
                  <span className="text-[#C9A227] tracking-widest text-xs font-bold uppercase mb-4 drop-shadow-md">You are invited</span>
                  <h1 className="text-4xl font-serif text-white mb-2 leading-tight drop-shadow-lg break-words w-full">
                    {info.hostNames ? info.hostNames.split('&').map((name, i) => (
                      <React.Fragment key={i}>{name.trim()} {i === 0 && info.hostNames.includes('&') && <><br/><span className="text-2xl text-[#C9A227] italic">&</span><br/></>}</React.Fragment>
                    )) : 'Host Names'}
                  </h1>
                  <p className="text-white/90 text-sm mb-1 mt-4 drop-shadow-md">{info.date ? new Date(info.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Date'}</p>
                  <p className="text-white/80 text-xs mb-8 drop-shadow-md">{info.venue || 'Location'}</p>
                  <div className="w-full py-3 bg-white/20 backdrop-blur-md text-white rounded-full font-bold text-sm border border-white/30 mb-4 shadow-lg">Swipe to open story</div>
                </div>

                {/* Additional Preview Content Based on new features */}
                {story.length > 0 && story[0].title !== '' && (
                  <div className="relative z-10 bg-white min-h-[400px] rounded-t-3xl p-6 mt-[-2rem]">
                    <h2 className="text-2xl font-serif text-[#1D1C17] text-center mb-8">Our Journey</h2>
                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#E6E2DA] before:to-transparent">
                      {story.map((evt, i) => (
                        <div key={i} className="relative flex items-center group is-active">
                          <div className="w-4 h-4 rounded-full bg-[#0F5B3E] shrink-0 z-10 absolute -left-[5px]" />
                          <div className="w-full ml-6 p-4 rounded-xl border border-[#E6E2DA] bg-[#FAF7F2]">
                            <div className="font-bold text-[#1D1C17] text-sm mb-1">{evt.title}</div>
                            <div className="text-xs text-[#0F5B3E] mb-1">{evt.time ? new Date(evt.time).toLocaleString('en-US', {month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'}) : ''}</div>
                            <div className="text-xs text-[#5E6460]">{evt.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {timeline.length > 0 && timeline[0].event !== '' && (
                      <div className="mt-12">
                        <h2 className="text-2xl font-serif text-[#1D1C17] text-center mb-6">Schedule</h2>
                        {timeline.map((t, i) => (
                           <div key={i} className="flex justify-between border-b border-[#E6E2DA] py-3 text-sm">
                             <span className="font-bold text-[#0F5B3E]">{t.time}</span>
                             <span className="text-[#1D1C17] font-medium">{t.event}</span>
                           </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-10 mb-8 flex justify-center">
                       <button className="bg-[#0F5B3E] text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg">Confirm RSVP</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPublishModal && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4"><div className="absolute inset-0 bg-black/60" onClick={() => setShowPublishModal(false)}/><div className="relative bg-white p-12 rounded-2xl z-10 w-full max-w-lg text-center"><h2 className="text-3xl font-serif font-bold mb-4">Published!</h2><p className="text-[#5E6460] mb-8">Your microsite is live.</p><button className="w-full py-4 bg-[#0F5B3E] hover:bg-[#0A422C] transition-colors text-white rounded-xl font-bold" onClick={()=>window.location.href='/invite/demo-guest-view'}>Open Guest View</button></div></div>, document.body
      )}

      {showAIModal && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4"><div className="absolute inset-0 bg-black/60" onClick={() => setShowAIModal(false)}/><div className="relative bg-white p-8 rounded-2xl z-10 w-full max-w-md"><h2 className="font-serif font-bold text-3xl mb-2 text-[#1D1C17]">AI Magic Fill</h2><p className="text-[#5E6460] mb-8">Let NEXUS AI build the entire 16-step platform for you instantly.</p><button className="w-full py-4 bg-[#C9A227] hover:bg-[#B08D22] text-white rounded-xl font-bold flex items-center justify-center gap-2" onClick={handleAIFill}>{aiLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Sparkles className="w-5 h-5"/>} {aiLoading ? 'Generating...' : 'Generate 16-Step Platform'}</button></div></div>, document.body
      )}
    </section>
  );
}
