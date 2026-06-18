"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Settings, Sliders, Key, CreditCard, Save } from "lucide-react"

export default function VenueSettingsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#0F5B3E]" /> Settings OS
          </h1>
          <p className="text-gray-500 mt-1 text-[13px] font-medium">
            Configure default billing parameters, register new banquet branches, and audit team permissions.
          </p>
        </div>
        
        <button className="px-4 py-2 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white rounded-xl font-bold text-[12px] transition-colors shadow-sm flex items-center gap-2">
          <Save className="w-3.5 h-3.5" /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {/* Branch Settings */}
        <Card className="p-5 border border-gray-100 bg-white rounded-[24px] shadow-sm space-y-4">
          <h3 className="text-[13px] font-black text-gray-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-gray-50">
            <Sliders className="w-4.5 h-4.5 text-[#0F5B3E]" /> Branch Parameters
          </h3>
          <div className="space-y-3.5 text-[11.5px] font-semibold">
            <div className="space-y-1">
              <label className="text-gray-400 block font-bold uppercase text-[9.5px]">Banquet Name</label>
              <input type="text" defaultValue="Royal Garden Banquet" className="w-full p-2 border border-[#ECE7DF] rounded-xl text-gray-800" />
            </div>
            <div className="space-y-1">
              <label className="text-gray-400 block font-bold uppercase text-[9.5px]">Active Branch Location</label>
              <input type="text" defaultValue="Main Canal Bank Road, Lahore" className="w-full p-2 border border-[#ECE7DF] rounded-xl text-gray-800" />
            </div>
          </div>
        </Card>

        {/* Security / Permissions */}
        <Card className="p-5 border border-gray-100 bg-white rounded-[24px] shadow-sm space-y-4">
          <h3 className="text-[13px] font-black text-gray-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-gray-50">
            <Key className="w-4.5 h-4.5 text-[#0F5B3E]" /> Admin Credentials
          </h3>
          <div className="space-y-3 text-[11.5px] font-semibold text-gray-600">
            <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
              <div>
                <p className="text-gray-900 font-bold">Usman Khan (Admin)</p>
                <p className="text-[9.5px] text-gray-400 font-medium">Owner level access</p>
              </div>
              <span className="text-[9.5px] text-emerald-600 font-extrabold">Active</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
              <div>
                <p className="text-gray-900 font-bold">Sajid Chef (Staff)</p>
                <p className="text-[9.5px] text-gray-400 font-medium">Kitchen OS access only</p>
              </div>
              <span className="text-[9.5px] text-emerald-600 font-extrabold">Active</span>
            </div>
          </div>
        </Card>

        {/* Billing */}
        <Card className="p-5 border border-gray-100 bg-white rounded-[24px] shadow-sm space-y-4">
          <h3 className="text-[13px] font-black text-gray-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-gray-50">
            <CreditCard className="w-4.5 h-4.5 text-[#0F5B3E]" /> Subscriptions & Billing
          </h3>
          <div className="space-y-3.5 text-[11.5px] font-semibold">
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-gray-50">
              <span className="text-[9px] text-[#0F5B3E] font-bold block uppercase mb-1">Active License Tier</span>
              <p className="text-gray-900 font-bold text-sm">Nexus Venue OS Premium</p>
              <span className="text-[9.5px] text-gray-400 font-semibold block mt-1">Renews on: July 1, 2026</span>
            </div>
          </div>
        </Card>
      </div>

    </div>
  )
}
