"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  User, CalendarHeart, Shield, Bell, CreditCard, Camera, 
  Save, CheckCircle2, ChevronRight, LogOut, Trash2
} from "lucide-react"

export function SettingsOverview() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isSaved, setIsSaved] = useState(false)
  
  // Profile State
  const [profile, setProfile] = useState({
    firstName: "Zoya",
    lastName: "Malik",
    email: "zoya.malik@example.com",
    phone: "+92 300 1234567"
  })

  // Event State
  const [eventDetails, setEventDetails] = useState({
    title: "Zoya & Ali's Grand Wedding",
    date: "2027-02-14",
    location: "Lahore, Pakistan",
    guests: "850",
    budget: "5000000"
  })

  // Privacy State
  const [privacy, setPrivacy] = useState({
    discoverable: true,
    guestUpload: true
  })

  // Notifications State
  const [notifications, setNotifications] = useState({
    messages: true,
    rsvps: true,
    payments: true,
    marketing: false
  })

  // Load from local storage
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem("hostV2Settings")
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings)
        if (parsed.profile) setProfile(parsed.profile)
        if (parsed.eventDetails) setEventDetails(parsed.eventDetails)
        if (parsed.privacy) setPrivacy(parsed.privacy)
        if (parsed.notifications) setNotifications(parsed.notifications)
      }
    } catch (e) {
      console.error("Failed to load settings", e)
    }
  }, [])

  const handleSave = () => {
    setIsSaved(true)
    
    // Save to local storage to simulate backend persistence
    localStorage.setItem("hostV2Settings", JSON.stringify({
      profile,
      eventDetails,
      privacy,
      notifications
    }))

    setTimeout(() => setIsSaved(false), 3000)
  }

  const TABS = [
    { id: "profile", label: "Profile & Account", icon: User },
    { id: "event", label: "Event Details", icon: CalendarHeart },
    { id: "privacy", label: "Privacy & Collaboration", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing & Payments", icon: CreditCard },
  ]

  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-8 md:py-12 space-y-8">
      
      {/* 🌟 Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-[32px] md:text-[40px] font-black font-poppins text-[#0A3B2A] tracking-tight leading-tight">
            Settings
          </h1>
          <p className="text-slate-500 font-medium text-lg mt-2">
            Manage your personal preferences, event configuration, and billing details.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* 🌟 Sidebar Navigation */}
        <div className="w-full md:w-64 shrink-0 space-y-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all font-bold text-sm ${
                activeTab === tab.id 
                  ? "bg-[#0A3B2A] text-white shadow-md" 
                  : "bg-transparent text-slate-600 hover:bg-white hover:shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3">
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </div>
              {activeTab === tab.id && <ChevronRight className="w-4 h-4 opacity-50" />}
            </button>
          ))}
          
          <div className="pt-6 mt-6 border-t border-slate-200 space-y-2">
            <button className="w-full flex items-center gap-3 p-4 rounded-2xl transition-all font-bold text-sm text-slate-500 hover:bg-white hover:text-slate-800">
              <LogOut className="w-5 h-5" /> Sign Out
            </button>
          </div>
        </div>

        {/* 🌟 Content Area */}
        <div className="flex-1 bg-white rounded-[32px] shadow-sm border border-slate-100 p-6 md:p-10 relative overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <motion.div 
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold font-poppins text-[#0A3B2A] mb-1">Profile & Account</h2>
                  <p className="text-sm font-medium text-slate-500">Update your personal and contact details.</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full border-4 border-slate-50 overflow-hidden relative group">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150" alt="Profile" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <button className="bg-white border border-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-sm hover:border-[#0A3B2A] transition-colors">
                      Change Avatar
                    </button>
                    <p className="text-xs font-medium text-slate-400 mt-2">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block">First Name</label>
                    <input 
                      type="text" 
                      value={profile.firstName} 
                      onChange={e => setProfile({...profile, firstName: e.target.value})}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-slate-100 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block">Last Name</label>
                    <input 
                      type="text" 
                      value={profile.lastName} 
                      onChange={e => setProfile({...profile, lastName: e.target.value})}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-slate-100 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block">Email Address</label>
                    <input 
                      type="email" 
                      value={profile.email} 
                      onChange={e => setProfile({...profile, email: e.target.value})}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-slate-100 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block">Phone Number</label>
                    <input 
                      type="tel" 
                      value={profile.phone} 
                      onChange={e => setProfile({...profile, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-slate-100 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20" 
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* EVENT DETAILS TAB */}
            {activeTab === "event" && (
              <motion.div 
                key="event"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold font-poppins text-[#0A3B2A] mb-1">Event Details</h2>
                  <p className="text-sm font-medium text-slate-500">Core parameters that drive your planning dashboard.</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block">Event Title</label>
                    <input 
                      type="text" 
                      value={eventDetails.title} 
                      onChange={e => setEventDetails({...eventDetails, title: e.target.value})}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-slate-100 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 block">Primary Start Date</label>
                      <input 
                        type="date" 
                        value={eventDetails.date} 
                        onChange={e => setEventDetails({...eventDetails, date: e.target.value})}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-slate-100 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 block">Primary Location (City)</label>
                      <input 
                        type="text" 
                        value={eventDetails.location} 
                        onChange={e => setEventDetails({...eventDetails, location: e.target.value})}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-slate-100 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 block">Estimated Guest Count</label>
                      <input 
                        type="number" 
                        value={eventDetails.guests} 
                        onChange={e => setEventDetails({...eventDetails, guests: e.target.value})}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-slate-100 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 block">Overall Budget Target (PKR)</label>
                      <input 
                        type="number" 
                        value={eventDetails.budget} 
                        onChange={e => setEventDetails({...eventDetails, budget: e.target.value})}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-slate-100 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20" 
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PRIVACY TAB */}
            {activeTab === "privacy" && (
              <motion.div 
                key="privacy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold font-poppins text-[#0A3B2A] mb-1">Privacy & Collaboration</h2>
                  <p className="text-sm font-medium text-slate-500">Manage who can see and modify your event details.</p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-5 rounded-2xl border border-slate-100 bg-[#FAF8F5]">
                    <div>
                      <h4 className="font-bold text-slate-900">Make Event Discoverable</h4>
                      <p className="text-sm text-slate-500 mt-1">Allow guests to search for your event by name or ID.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={privacy.discoverable} 
                        onChange={e => setPrivacy({...privacy, discoverable: e.target.checked})}
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0A3B2A]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-5 rounded-2xl border border-slate-100 bg-[#FAF8F5]">
                    <div>
                      <h4 className="font-bold text-slate-900">Guest Memories Upload</h4>
                      <p className="text-sm text-slate-500 mt-1">Allow approved guests to upload photos to the Memories Wall.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={privacy.guestUpload} 
                        onChange={e => setPrivacy({...privacy, guestUpload: e.target.checked})}
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0A3B2A]"></div>
                    </label>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-bold text-slate-900 mb-4">Co-Hosts</h4>
                    <div className="flex items-center gap-4 bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                      <div className="w-10 h-10 bg-[#0A3B2A] rounded-full flex items-center justify-center text-white font-bold">A</div>
                      <div className="flex-1">
                        <p className="font-bold text-sm">Ali Rehman</p>
                        <p className="text-xs text-slate-500">ali@example.com (Full Access)</p>
                      </div>
                      <button className="text-slate-400 hover:text-rose-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <button className="mt-3 text-sm font-bold text-[#BE185D] hover:underline">
                      + Invite another co-host
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* NOTIFICATIONS TAB */}
            {activeTab === "notifications" && (
              <motion.div 
                key="notifications"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold font-poppins text-[#0A3B2A] mb-1">Notifications</h2>
                  <p className="text-sm font-medium text-slate-500">Control how and when you receive alerts.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { key: "messages", title: "Vendor Messages", desc: "Get notified when a vendor replies to you." },
                    { key: "rsvps", title: "RSVP Updates", desc: "Daily summary of new guest RSVPs." },
                    { key: "payments", title: "Payment Reminders", desc: "Alerts for upcoming vendor invoice due dates." },
                    { key: "marketing", title: "Marketing & Offers", desc: "Exclusive discounts from Nexus partner vendors." },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-5 rounded-2xl border border-slate-100 bg-[#FAF8F5]">
                      <div>
                        <h4 className="font-bold text-slate-900">{item.title}</h4>
                        <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={notifications[item.key as keyof typeof notifications]} 
                          onChange={e => setNotifications({...notifications, [item.key]: e.target.checked})}
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0A3B2A]"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* BILLING TAB */}
            {activeTab === "billing" && (
              <motion.div 
                key="billing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold font-poppins text-[#0A3B2A] mb-1">Billing & Payments</h2>
                  <p className="text-sm font-medium text-slate-500">Manage your payment methods for vendor bookings.</p>
                </div>

                <div className="bg-gradient-to-br from-[#0A3B2A] to-[#155E45] rounded-2xl p-6 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <CreditCard className="w-8 h-8 opacity-80" />
                    <span className="font-mono font-bold tracking-widest opacity-80">VISA</span>
                  </div>
                  <div className="relative z-10">
                    <p className="font-mono text-xl tracking-widest mb-2">**** **** **** 4242</p>
                    <div className="flex justify-between text-sm opacity-80">
                      <span>{profile.firstName} {profile.lastName}</span>
                      <span>12/28</span>
                    </div>
                  </div>
                </div>

                <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-bold hover:border-[#0A3B2A] hover:text-[#0A3B2A] transition-colors">
                  + Add New Payment Method
                </button>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Global Save Button */}
          <div className="pt-8 mt-8 border-t border-slate-100 flex justify-end">
            <button 
              onClick={handleSave}
              className={`px-8 py-3 rounded-full font-bold shadow-md transition-all flex items-center gap-2 ${
                isSaved ? "bg-[#25D366] text-white" : "bg-[#0A3B2A] text-white hover:bg-[#0A3B2A]/90"
              }`}
            >
              {isSaved ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
              {isSaved ? "Saved Successfully" : "Save Changes"}
            </button>
          </div>

        </div>

      </div>

    </div>
  )
}
