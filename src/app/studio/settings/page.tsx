"use client"

import { Card } from "@/components/ui/card"
import { User, Building2, Bell, Shield, CreditCard, Save, UploadCloud } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-poppins text-gray-900 dark:text-white tracking-tight">
            Settings
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Manage your personal profile, studio details, and system preferences.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-[#0A3B2A] dark:bg-cyan-600 text-white rounded-full font-bold text-sm hover:bg-[#0F5B3E] dark:hover:bg-cyan-500 transition-colors shadow-lg flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Settings Navigation */}
        <div className="w-full lg:w-64 shrink-0 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-white dark:bg-white/10 text-[#0A3B2A] dark:text-cyan-400 rounded-xl font-bold text-sm transition-colors shadow-sm dark:border dark:border-cyan-500/50 dark:shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <User className="w-4 h-4" /> Profile
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl font-bold text-sm transition-colors border border-transparent">
            <Building2 className="w-4 h-4" /> Studio Info
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl font-bold text-sm transition-colors border border-transparent">
            <Bell className="w-4 h-4" /> Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl font-bold text-sm transition-colors border border-transparent">
            <Shield className="w-4 h-4" /> Security
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl font-bold text-sm transition-colors border border-transparent">
            <CreditCard className="w-4 h-4" /> Billing & Plan
          </button>
        </div>

        {/* Settings Form Area */}
        <Card className="flex-1 p-6 sm:p-8 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10">
          
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Personal Information</h2>
          
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-black/40 border-2 border-white dark:border-[#050505] shadow-lg relative overflow-hidden group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200" alt="Profile" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <UploadCloud className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">Zoya Ahmed</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Lead Photographer & Owner</p>
              <button className="mt-3 text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors">
                Remove Picture
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">First Name</label>
              <input type="text" defaultValue="Zoya" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/40 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 dark:focus:ring-cyan-500/30 transition-all font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Name</label>
              <input type="text" defaultValue="Ahmed" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/40 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 dark:focus:ring-cyan-500/30 transition-all font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email Address</label>
              <input type="email" defaultValue="zoya@nexus-studio.pk" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/40 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 dark:focus:ring-cyan-500/30 transition-all font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Phone Number</label>
              <input type="tel" defaultValue="+92 300 1234567" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/40 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 dark:focus:ring-cyan-500/30 transition-all font-medium" />
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 dark:border-white/10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Preferences</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-white/10 bg-white dark:bg-black/20 cursor-pointer hover:border-gray-200 dark:hover:border-white/20 transition-all">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">Two-Factor Authentication</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Add an extra layer of security to your account.</p>
                </div>
                <div className="w-10 h-6 bg-[#0A3B2A] dark:bg-cyan-500 rounded-full relative shadow-inner">
                  <div className="absolute right-1 top-1 bottom-1 w-4 rounded-full bg-white shadow-sm"></div>
                </div>
              </label>
              <label className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-white/10 bg-white dark:bg-black/20 cursor-pointer hover:border-gray-200 dark:hover:border-white/20 transition-all">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">Email Notifications</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Receive daily summaries and alerts via email.</p>
                </div>
                <div className="w-10 h-6 bg-gray-200 dark:bg-white/10 rounded-full relative shadow-inner">
                  <div className="absolute left-1 top-1 bottom-1 w-4 rounded-full bg-white shadow-sm transition-all"></div>
                </div>
              </label>
            </div>
          </div>

        </Card>
      </div>
    </div>
  )
}
