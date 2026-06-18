"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  User, Mail, Phone, MapPin, Shield, Bell, CreditCard, 
  Settings, Camera, Edit2, Lock, Smartphone, Globe
} from "lucide-react"

export function HostProfile() {
  const [activeTab, setActiveTab] = useState("personal")

  const TABS = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing", icon: CreditCard },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4 } }
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* 🌟 Profile Header 🌟 */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white shadow-[0_8px_32px_rgba(0,0,0,0.03)] overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#FF6B6B]/20 to-[#FFD93D]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_1px_rgba(255,255,255,0.8)] pointer-events-none z-10" />

        <div className="flex flex-col md:flex-row md:items-center gap-8 relative z-20">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
              <img 
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200" 
                alt="Ahmed"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <button className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8B] rounded-full flex items-center justify-center text-white border-2 border-white shadow-md hover:scale-110 transition-transform">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-800 tracking-tight">Ahmed Khan</h1>
                <p className="text-sm font-bold text-slate-500 mt-1 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> ahmed.khan@example.com
                </p>
              </div>
              <button className="bg-white hover:bg-slate-50 text-slate-700 font-black py-3 px-6 rounded-full text-[11px] uppercase tracking-widest shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-white transition-all flex items-center gap-2 w-fit">
                <Edit2 className="w-4 h-4" /> Edit Profile
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* 🌟 Navigation Sidebar 🌟 */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-64 shrink-0 space-y-2"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all relative ${
                  isActive ? "text-[#FF6B6B]" : "text-slate-500 hover:text-slate-800 hover:bg-white/40"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-profile-tab"
                    className="absolute inset-0 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-white rounded-[1.5rem] -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <tab.icon className={`w-5 h-5 ${isActive ? "text-[#FF6B6B]" : "text-slate-400"}`} />
                {tab.label}
              </button>
            )
          })}
        </motion.div>

        {/* 🌟 Tab Content Area 🌟 */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex-1 min-w-0"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white p-8 md:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.03)] relative overflow-hidden"
            >
              <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_1px_rgba(255,255,255,0.8)] pointer-events-none z-10" />
              
              {activeTab === "personal" && (
                <div className="space-y-8 relative z-20">
                  <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Personal Information</h2>
                    <p className="text-sm font-bold text-slate-500 mt-1">Update your personal details and contact information.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">First Name</label>
                      <input type="text" defaultValue="Ahmed" className="w-full bg-white/50 border border-white rounded-2xl px-6 py-4 text-slate-800 font-bold outline-none focus:ring-2 focus:ring-[#FF6B6B]/20 focus:bg-white shadow-sm transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Last Name</label>
                      <input type="text" defaultValue="Khan" className="w-full bg-white/50 border border-white rounded-2xl px-6 py-4 text-slate-800 font-bold outline-none focus:ring-2 focus:ring-[#FF6B6B]/20 focus:bg-white shadow-sm transition-all" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Email Address</label>
                      <input type="email" defaultValue="ahmed.khan@example.com" className="w-full bg-white/50 border border-white rounded-2xl px-6 py-4 text-slate-800 font-bold outline-none focus:ring-2 focus:ring-[#FF6B6B]/20 focus:bg-white shadow-sm transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="tel" defaultValue="+92 300 1234567" className="w-full bg-white/50 border border-white rounded-2xl pl-14 pr-6 py-4 text-slate-800 font-bold outline-none focus:ring-2 focus:ring-[#FF6B6B]/20 focus:bg-white shadow-sm transition-all" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="text" defaultValue="Lahore, Pakistan" className="w-full bg-white/50 border border-white rounded-2xl pl-14 pr-6 py-4 text-slate-800 font-bold outline-none focus:ring-2 focus:ring-[#FF6B6B]/20 focus:bg-white shadow-sm transition-all" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 flex justify-end">
                    <button className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8B] hover:opacity-90 text-white font-black py-4 px-10 rounded-full text-xs uppercase tracking-widest shadow-[0_4px_16px_rgba(255,107,107,0.3)] border border-white/20 transition-all active:scale-95">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-8 relative z-20">
                  <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Security Settings</h2>
                    <p className="text-sm font-bold text-slate-500 mt-1">Manage your password and secure your account.</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="p-6 bg-white/50 rounded-[2rem] border border-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-[1rem] bg-white flex items-center justify-center shadow-sm">
                          <Lock className="w-6 h-6 text-slate-400" />
                        </div>
                        <div>
                          <h3 className="text-base font-black text-slate-800">Change Password</h3>
                          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mt-1">Last changed 3 months ago</p>
                        </div>
                      </div>
                      <button className="bg-white hover:bg-slate-50 border border-white text-slate-700 font-black py-3 px-6 rounded-full text-[11px] uppercase tracking-widest shadow-sm transition-all w-fit">
                        Update
                      </button>
                    </div>

                    <div className="p-6 bg-white/50 rounded-[2rem] border border-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-[1rem] bg-gradient-to-br from-[#6BCB77]/20 to-[#6BCB77]/5 border border-[#6BCB77]/20 flex items-center justify-center shadow-sm">
                          <Smartphone className="w-6 h-6 text-[#6BCB77]" />
                        </div>
                        <div>
                          <h3 className="text-base font-black text-slate-800">Two-Factor Authentication</h3>
                          <p className="text-[11px] font-bold uppercase tracking-widest text-[#6BCB77] mt-1">Currently Enabled</p>
                        </div>
                      </div>
                      <button className="bg-white hover:bg-slate-50 border border-white text-slate-700 font-black py-3 px-6 rounded-full text-[11px] uppercase tracking-widest shadow-sm transition-all w-fit">
                        Manage
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-8 relative z-20">
                  <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Notification Preferences</h2>
                    <p className="text-sm font-bold text-slate-500 mt-1">Choose how and when we contact you.</p>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { title: "Event Updates", desc: "Get notified when a vendor accepts or declines.", email: true, push: true },
                      { title: "Messages", desc: "Receive alerts for new messages in your chats.", email: false, push: true },
                      { title: "Payment Reminders", desc: "Alerts for upcoming vendor payments.", email: true, push: true },
                      { title: "Nexus Marketing", desc: "News, tips, and promotional offers.", email: false, push: false },
                    ].map((item, i) => (
                      <div key={i} className="p-6 bg-white/50 rounded-[2rem] border border-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="flex-1">
                          <h3 className="text-base font-black text-slate-800">{item.title}</h3>
                          <p className="text-[12px] font-medium text-slate-500 mt-1">{item.desc}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <div className={`w-10 h-6 rounded-full p-1 transition-colors ${item.email ? 'bg-[#FF6B6B]' : 'bg-slate-200'}`}>
                              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${item.email ? 'translate-x-4' : ''}`} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <div className={`w-10 h-6 rounded-full p-1 transition-colors ${item.push ? 'bg-[#FF6B6B]' : 'bg-slate-200'}`}>
                              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${item.push ? 'translate-x-4' : ''}`} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Push</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "billing" && (
                <div className="space-y-8 relative z-20">
                  <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Billing & Cards</h2>
                    <p className="text-sm font-bold text-slate-500 mt-1">Manage your payment methods and billing history.</p>
                  </div>
                  
                  <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2rem] p-8 text-white overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                      <div className="flex justify-between items-start">
                        <CreditCard className="w-8 h-8 text-white/80" />
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-white/20 rounded-full">Primary</span>
                      </div>
                      <div>
                        <p className="text-2xl font-medium font-mono tracking-widest mb-2">•••• •••• •••• 4242</p>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">Card Holder</p>
                            <p className="font-bold tracking-wide">AHMED KHAN</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">Expires</p>
                            <p className="font-bold tracking-wide">12/28</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-white/50 hover:bg-white border border-white border-dashed text-slate-600 font-black py-4 rounded-[2rem] text-[11px] uppercase tracking-widest shadow-sm transition-all">
                    + Add New Payment Method
                  </button>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  )
}
