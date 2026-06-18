"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Star, MapPin, CheckCircle2, ShieldCheck, Mail, Share2, Award, 
  Camera, Video, Users, CheckSquare, Calendar, PlayCircle 
} from "lucide-react"
import { LiveAvailabilityCalendar } from "@/components/shared/LiveAvailabilityCalendar"

export function PremiumProfileView() {
  const [activeTab, setActiveTab] = useState("portfolio")

  const tabs = [
    { id: "portfolio", label: "Portfolio" },
    { id: "packages", label: "Packages & Pricing" },
    { id: "availability", label: "Live Availability" },
    { id: "about", label: "About & Experience" },
    { id: "reviews", label: "Reviews (124)" }
  ]

  return (
    <div className="bg-[#FAF7F2] min-h-screen pt-20 pb-20">
      
      {/* Cover Photo */}
      <div className="h-[300px] md:h-[400px] w-full relative">
        <img 
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop" 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative -mt-32">
        <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.08)] overflow-hidden border border-slate-100">
          
          {/* Header Section */}
          <div className="p-8 md:p-12 border-b border-slate-100">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              
              {/* Avatar */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl overflow-hidden shrink-0 bg-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1518110924513-568b2b7169ac?q=80&w=800&auto=format&fit=crop" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 mt-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Ali Rahman</h1>
                      <div className="flex items-center gap-1 bg-[#C9A227]/10 text-[#C9A227] px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase border border-[#C9A227]/20">
                        <ShieldCheck className="w-3.5 h-3.5" /> Elite Pro
                      </div>
                    </div>
                    <p className="text-xl text-slate-600 font-medium">Cinematography & Creative Direction</p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:text-[#0F5B3E] hover:border-[#0F5B3E] transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="px-8 py-3 bg-[#0F5B3E] text-white font-bold rounded-xl hover:bg-[#0a422c] transition-colors">
                      Request Quote
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-slate-600 font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4.5 h-4.5 text-slate-400" />
                    Lahore, Pakistan
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4.5 h-4.5 text-[#C9A227] fill-[#C9A227]" />
                    <span className="text-slate-900 font-bold">4.9</span> (124 reviews)
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckSquare className="w-4.5 h-4.5 text-[#0F5B3E]" />
                    150+ Projects Completed
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-8 md:px-12 flex overflow-x-auto [&::-webkit-scrollbar]:hidden border-b border-slate-100">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-5 px-6 font-bold text-sm whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id 
                    ? "border-[#0F5B3E] text-[#0F5B3E]" 
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Area */}
          <div className="p-8 md:p-12 bg-slate-50 min-h-[500px]">
            {activeTab === "portfolio" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-black text-slate-900">Featured Work</h3>
                  <div className="flex gap-2">
                    <button className="px-4 py-1.5 bg-white border border-slate-200 text-slate-900 text-sm font-bold rounded-full">All</button>
                    <button className="px-4 py-1.5 text-slate-500 text-sm font-semibold rounded-full hover:bg-slate-200">Videos</button>
                    <button className="px-4 py-1.5 text-slate-500 text-sm font-semibold rounded-full hover:bg-slate-200">Photos</button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Grid items simulate Behance style masonry or strict grid */}
                  {[1,2,3,4,5,6].map((item) => (
                    <div key={item} className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-200 cursor-pointer">
                      <img 
                        src={`https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop&sig=${item}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        alt="Portfolio item"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <PlayCircle className="w-12 h-12 text-white opacity-80" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "packages" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Package Cards */}
                  {["Essential Shoot", "Premium Story", "Elite Cinema"].map((pkg, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#0F5B3E]/30 transition-all">
                      <h4 className="text-xl font-black text-slate-900 mb-2">{pkg}</h4>
                      <div className="text-3xl font-black text-[#0F5B3E] mb-6">Rs. {(i+1)*150},000</div>
                      <ul className="space-y-3 mb-8">
                        {["1 Day Coverage", "Cinematic Highlight (3-5 min)", "Drone Footage included", "Raw footage provided"].map((feat, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-[#C9A227]" /> {feat}
                          </li>
                        ))}
                      </ul>
                      <button className="w-full py-3 rounded-xl border-2 border-slate-200 font-bold text-slate-700 hover:border-[#0F5B3E] hover:text-[#0F5B3E] transition-colors">
                        Select Package
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "availability" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-slate-900 mb-4">Check Availability</h3>
                    <p className="text-slate-600 mb-8 font-medium">My calendar is updated in real-time. If your dates are green, I am available to book! Yellow dates mean I only have a few hours or one slot left.</p>
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                      <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-blue-600"/> Upcoming Weekends</h4>
                      <ul className="space-y-4">
                        <li className="flex justify-between items-center pb-4 border-b border-slate-100">
                          <div>
                            <p className="font-bold text-slate-900">Nov 5 - Nov 6</p>
                            <p className="text-sm text-slate-500 font-medium">Sat - Sun</p>
                          </div>
                          <span className="px-3 py-1 bg-slate-100 text-slate-500 font-bold text-xs rounded-lg uppercase tracking-wider">Booked</span>
                        </li>
                        <li className="flex justify-between items-center pb-4 border-b border-slate-100">
                          <div>
                            <p className="font-bold text-slate-900">Nov 12 - Nov 13</p>
                            <p className="text-sm text-slate-500 font-medium">Sat - Sun</p>
                          </div>
                          <span className="px-3 py-1 bg-slate-100 text-slate-500 font-bold text-xs rounded-lg uppercase tracking-wider">Booked</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <div>
                            <p className="font-bold text-slate-900">Nov 19 - Nov 20</p>
                            <p className="text-sm text-slate-500 font-medium">Sat - Sun</p>
                          </div>
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-lg border border-emerald-200 uppercase tracking-wider">Available</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="w-full md:w-[320px] shrink-0">
                    <LiveAvailabilityCalendar />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Other tabs omitted for brevity, but would contain bio and reviews */}
          </div>
        </div>
      </div>
    </div>
  )
}
