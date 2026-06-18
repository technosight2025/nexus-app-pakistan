"use client"
import { Users, Video, TrendingUp, AlertCircle, Plus, Camera, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function StudioDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Studio Overview</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your active shoots and deliverables.</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Project
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
              <Video className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="font-bold text-slate-600">Active Projects</h3>
          </div>
          <div className="text-4xl font-black text-slate-900 mb-2">18</div>
          <p className="text-sm font-bold text-indigo-500 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> In production
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Camera className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="font-bold text-slate-600">Upcoming Shoots</h3>
          </div>
          <div className="text-4xl font-black text-slate-900 mb-2">4</div>
          <p className="text-sm font-bold text-emerald-500 flex items-center gap-1">
            This weekend
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="font-bold text-slate-600">Client Reviews</h3>
          </div>
          <div className="text-4xl font-black text-slate-900 mb-2">7</div>
          <p className="text-sm font-bold text-amber-600">Awaiting selection</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-600">New Leads</h3>
          </div>
          <div className="text-4xl font-black text-slate-900 mb-2">12</div>
          <p className="text-sm font-bold text-blue-500 flex items-center gap-1">
            From public profile
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Active Projects Tracker */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-xl font-black text-slate-900">Project Pipeline</h3>
            <Button variant="link" className="text-indigo-600 font-bold p-0">View All</Button>
          </div>
          <div className="divide-y divide-slate-100">
            {/* Project 1 */}
            <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-full flex flex-col items-center justify-center border border-indigo-100 shrink-0">
                  <Video className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Zainab & Ahmed Cinematic Film</h4>
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-500 mt-1">
                    <span>Due: Dec 15</span>
                    <span>•</span>
                    <span>Editor: Hamza</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                  Editing
                </span>
                <div className="w-32 h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-amber-500 w-[60%] rounded-full" />
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex flex-col items-center justify-center border border-emerald-100 shrink-0">
                  <ImageIcon className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Ali's Walima Album</h4>
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-500 mt-1">
                    <span>Status: Sent for Selection</span>
                    <span>•</span>
                    <span>Client: Ali Raza</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                  Client Review
                </span>
                <div className="w-32 h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-blue-500 w-[90%] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deliverables / Alerts */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-xl font-black text-slate-900 mb-4">Action Needed</h3>
            <div className="space-y-4">
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl">
                <p className="font-bold text-rose-900 text-sm mb-1">Approaching Deadline</p>
                <p className="text-rose-700 text-xs font-medium">Hassan's Wedding Album prints need to be sent to the lab by tomorrow.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
