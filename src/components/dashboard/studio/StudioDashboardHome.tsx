"use client"

import { motion } from "framer-motion"
import { 
  Camera, Video, UploadCloud, HeartHandshake, 
  FolderOpen, Plus, Clock, CheckCircle2, ChevronRight,
  UserCheck, DollarSign, TrendingUp, BarChart3, ArrowUpRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const RECENT_PROJECTS = [
  { id: 1, name: "Ali & Sara Wedding", type: "Photography + Videography", status: "Editing", dueDate: "Oct 15", progress: 65 },
  { id: 2, name: "Zainab's Mehndi", type: "Photography", status: "Awaiting Selection", dueDate: "Oct 10", progress: 90 },
  { id: 3, name: "TechCorp Gala", type: "Videography", status: "Shooting", dueDate: "Oct 20", progress: 20 },
]

export function StudioDashboardHome() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome back, Lumiere Studios.</h1>
          <p className="text-slate-500 font-medium mt-1">Here is the consolidated status of your CRM, Sales, and Accounting today.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/studio/accounting">
            <Button variant="outline" className="rounded-xl border-slate-200 text-slate-600 font-bold hover:bg-slate-50">
              <BarChart3 className="w-4 h-4 mr-2" /> Financials
            </Button>
          </Link>
          <Link href="/dashboard/studio/leads">
            <Button className="rounded-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-sm">
              <UserCheck className="w-4 h-4 mr-2" /> View CRM Leads
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Core - Projects */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:border-indigo-200 transition-colors">
          <div className="flex justify-between items-start z-10">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
              <FolderOpen className="w-6 h-6" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">+2 this week</span>
          </div>
          <div className="z-10">
            <h3 className="text-3xl font-black text-slate-900">12</h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Active Shoots</p>
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-indigo-50 opacity-50 group-hover:scale-150 transition-transform duration-500" />
        </div>

        {/* CRM Leads */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:border-rose-200 transition-colors">
          <div className="flex justify-between items-start z-10">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
              <UserCheck className="w-6 h-6" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-md">4 Total</span>
          </div>
          <div className="z-10">
            <h3 className="text-3xl font-black text-slate-900">1</h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">New CRM Lead Inquiries</p>
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-rose-50 opacity-50 group-hover:scale-150 transition-transform duration-500" />
        </div>

        {/* Sales Invoiced */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:border-emerald-200 transition-colors">
          <div className="flex justify-between items-start z-10">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Collected</span>
          </div>
          <div className="z-10">
            <h3 className="text-3xl font-black text-slate-900">750k</h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Total Sales Revenue (PKR)</p>
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-emerald-50 opacity-50 group-hover:scale-150 transition-transform duration-500" />
        </div>

        {/* Accounting - Profit Margin */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:border-indigo-200 transition-colors">
          <div className="flex justify-between items-start z-10">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-indigo-600 text-xs font-bold bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">90.7% Margin</span>
          </div>
          <div className="z-10">
            <h3 className="text-3xl font-black text-slate-900">680.5k</h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Net Accounting Profit</p>
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-indigo-50 opacity-50 group-hover:scale-150 transition-transform duration-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Active Projects List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-black text-slate-900">Recent Projects</h2>
            <Link href="/dashboard/studio/projects" className="text-sm font-bold text-primary hover:underline">View All</Link>
          </div>
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100">
              {RECENT_PROJECTS.map((project) => (
                <div key={project.id} className="p-6 hover:bg-slate-50/50 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                      {project.type.includes("Video") ? <Video className="w-6 h-6" /> : <Camera className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg group-hover:text-primary transition-colors">{project.name}</h3>
                      <p className="text-sm text-slate-500 font-medium">{project.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex-1 w-full sm:w-auto sm:max-w-[200px] flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-600">{project.status}</span>
                      <span className="text-slate-400">{project.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-1.5 text-sm font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                      <Clock className="w-4 h-4" /> Due {project.dueDate}
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CRM & Accounting Quick Board */}
        <div className="space-y-4">
          <h2 className="text-xl font-black text-slate-900">CRM & Bookkeeping Hub</h2>
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            
            <div className="p-4 border border-slate-200 rounded-2xl flex flex-col gap-2 bg-slate-50">
              <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span>Total Collected</span>
                <span className="text-emerald-600 font-black">750,000 PKR</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                <span>Total Expenses</span>
                <span className="text-rose-600 font-black">69,500 PKR</span>
              </div>
              <div className="h-px bg-slate-200 my-1" />
              <div className="flex justify-between items-center text-sm font-black text-slate-900 uppercase">
                <span>Net Margin</span>
                <span className="text-primary">90.7%</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group border border-transparent hover:border-slate-100">
                <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-4 h-4 text-rose-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">Fatima & Bilal (IG Inquiry)</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Needs a quotation for Wedding + Drone (Nov 12-14).</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group border border-transparent hover:border-slate-100">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-indigo-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">Pending Invoices Status</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Zainab Ahmed has PKR 100k balance outstanding.</p>
                </div>
              </div>
            </div>

            <Link href="/dashboard/studio/accounting" className="block w-full">
              <Button className="w-full mt-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow-sm font-bold text-sm">
                Open Ledger Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
