"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  UploadCloud, Plus, Search, Link as LinkIcon, 
  Download, HardDrive, CheckCircle2, Clock, 
  Lock, X, FileText, Image as ImageIcon, Video
} from "lucide-react"
import { Button } from "@/components/ui/button"

type DeliveryStatus = "Uploading" | "Ready to Download" | "Downloaded" | "Expired"

interface DeliveryItem {
  id: string
  title: string
  clientName: string
  status: DeliveryStatus
  size: string
  files: number
  expiresIn: string
  hasPin: boolean
  sentDate: string
  coverImage: string
}

const INITIAL_DELIVERIES: DeliveryItem[] = [
  {
    id: "DEL-001",
    title: "Ali & Sara - Final Wedding Album",
    clientName: "Ali Raza",
    status: "Ready to Download",
    size: "4.2 GB",
    files: 150,
    expiresIn: "14 days",
    hasPin: true,
    sentDate: "Today",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "DEL-002",
    title: "TechCorp Gala - 4K Video",
    clientName: "TechCorp Inc.",
    status: "Downloaded",
    size: "12.8 GB",
    files: 1,
    expiresIn: "3 days",
    hasPin: false,
    sentDate: "Oct 12, 2023",
    coverImage: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "DEL-003",
    title: "Zainab's Mehndi - Raw Files",
    clientName: "Zainab Ahmed",
    status: "Expired",
    size: "28.5 GB",
    files: 450,
    expiresIn: "Expired",
    hasPin: true,
    sentDate: "Sep 20, 2023",
    coverImage: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=400&auto=format&fit=crop",
  }
]

export function DeliveryCenterView() {
  const [deliveries, setDeliveries] = useState<DeliveryItem[]>(INITIAL_DELIVERIES)
  const [searchQuery, setSearchQuery] = useState("")

  // Modal State
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)
  const [newDeliveryForm, setNewDeliveryForm] = useState({ title: "", clientName: "", pin: "", usePin: false })

  const handleCreateDelivery = () => {
    if (!newDeliveryForm.title || !newDeliveryForm.clientName) return
    const newDel: DeliveryItem = {
      id: `DEL-${Math.floor(Math.random() * 1000)}`,
      title: newDeliveryForm.title,
      clientName: newDeliveryForm.clientName,
      status: "Uploading",
      size: "0 MB",
      files: 0,
      expiresIn: "30 days",
      hasPin: newDeliveryForm.usePin,
      sentDate: "Just now",
      coverImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=400&auto=format&fit=crop",
    }
    setDeliveries([newDel, ...deliveries])
    setIsNewModalOpen(false)
    setNewDeliveryForm({ title: "", clientName: "", pin: "", usePin: false })
  }

  const filteredDeliveries = deliveries.filter(d => 
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Hero Card */}
        <div className="flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 p-6 md:p-8 rounded-3xl shadow-lg border border-slate-800 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
          
          <div className="relative z-10">
            <h1 className="text-2xl md:text-3xl font-black flex items-center gap-2 tracking-tight">
              <UploadCloud className="w-8 h-8 text-emerald-400" /> Delivery Center
            </h1>
            <p className="text-sm font-medium text-slate-400 mt-2 max-w-xl">
              Securely deliver high-resolution albums and 4K videos directly to your clients without relying on third-party links.
            </p>
          </div>
          
          <Button onClick={() => setIsNewModalOpen(true)} className="bg-white text-slate-900 hover:bg-slate-100 rounded-xl shadow-md font-bold shrink-0 relative z-10">
            <Plus className="w-4 h-4 mr-2" /> New Delivery Link
          </Button>
        </div>

        {/* Storage KPI Card */}
        <div className="w-full md:w-80 bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col justify-center">
          <div className="flex justify-between items-end mb-4">
            <div>
              <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">
                <HardDrive className="w-4 h-4" /> Cloud Storage
              </div>
              <div className="text-2xl font-black text-slate-900">850 <span className="text-sm text-slate-500 font-bold">GB Used</span></div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-slate-900">1 TB</div>
              <div className="text-xs text-slate-500">Total</div>
            </div>
          </div>
          
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-emerald-500 rounded-full w-[85%]" />
          </div>
          <p className="text-xs text-slate-500 font-medium">85% of your plan used. Deliveries older than 30 days are automatically archived.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search deliveries or clients..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium shadow-sm bg-white"
          />
        </div>
      </div>

      {/* Deliveries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDeliveries.map((delivery) => (
          <div 
            key={delivery.id} 
            className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group cursor-pointer hover:border-primary/50 hover:shadow-md transition-all"
          >
            {/* Cover Image & Badges */}
            <div className="h-40 relative bg-slate-100 overflow-hidden">
              <img src={delivery.coverImage} alt={delivery.title} className={`w-full h-full object-cover transition-transform duration-500 ${delivery.status !== 'Expired' && 'group-hover:scale-105'} ${delivery.status === 'Expired' && 'grayscale opacity-50'}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-black text-white text-lg truncate drop-shadow-md">{delivery.title}</h3>
                <p className="text-xs font-bold text-slate-300 truncate">{delivery.clientName}</p>
              </div>

              <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                {delivery.status === "Downloaded" && (
                  <span className="flex items-center gap-1 bg-emerald-500 text-white px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    <CheckCircle2 className="w-3 h-3" /> Downloaded
                  </span>
                )}
                {delivery.status === "Ready to Download" && (
                  <span className="flex items-center gap-1 bg-primary text-white px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    <Download className="w-3 h-3" /> Ready
                  </span>
                )}
                {delivery.status === "Uploading" && (
                  <span className="flex items-center gap-1 bg-amber-500 text-white px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm animate-pulse">
                    <UploadCloud className="w-3 h-3" /> Uploading...
                  </span>
                )}
                {delivery.status === "Expired" && (
                  <span className="flex items-center gap-1 bg-slate-800 text-white px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    <Clock className="w-3 h-3" /> Expired
                  </span>
                )}
                
                {delivery.hasPin && (
                  <span className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-sm text-white px-2 py-1 rounded-md text-[10px] font-bold shadow-sm">
                    <Lock className="w-3 h-3" /> PIN Protected
                  </span>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Size</p>
                  <p className="text-sm font-black text-slate-900">{delivery.size}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Expires In</p>
                  <p className={`text-sm font-black ${delivery.status === 'Expired' ? 'text-slate-400' : 'text-slate-900'}`}>{delivery.expiresIn}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-medium text-slate-400">
                <span className="flex items-center gap-1 hover:text-slate-700 transition-colors cursor-pointer">
                  <LinkIcon className="w-3 h-3" /> Copy Link
                </span>
                <span>Sent: {delivery.sentDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Delivery Modal */}
      <AnimatePresence>
        {isNewModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsNewModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 z-50 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 backdrop-blur-md shrink-0">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <UploadCloud className="w-5 h-5 text-emerald-500" /> Create Secure Delivery
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setIsNewModalOpen(false)} className="rounded-full hover:bg-slate-200">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 col-span-2 sm:col-span-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Delivery Title</label>
                    <input 
                      type="text" value={newDeliveryForm.title} onChange={e => setNewDeliveryForm({...newDeliveryForm, title: e.target.value})}
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium"
                      placeholder="e.g. Final Wedding Album"
                    />
                  </div>
                  <div className="space-y-1.5 col-span-2 sm:col-span-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Client Name</label>
                    <input 
                      type="text" value={newDeliveryForm.clientName} onChange={e => setNewDeliveryForm({...newDeliveryForm, clientName: e.target.value})}
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium"
                      placeholder="e.g. Ali & Sara"
                    />
                  </div>
                </div>

                {/* PIN Protection Toggle */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${newDeliveryForm.usePin ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-400'}`}>
                        <Lock className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">PIN Protection</h4>
                        <p className="text-xs text-slate-500">Require a 4-digit PIN to download files.</p>
                      </div>
                    </div>
                    
                    {/* Mock Toggle Switch */}
                    <div 
                      className={`w-12 h-6 rounded-full cursor-pointer transition-colors relative ${newDeliveryForm.usePin ? 'bg-emerald-500' : 'bg-slate-300'}`}
                      onClick={() => setNewDeliveryForm({...newDeliveryForm, usePin: !newDeliveryForm.usePin})}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${newDeliveryForm.usePin ? 'left-7' : 'left-1'}`} />
                    </div>
                  </div>

                  <AnimatePresence>
                    {newDeliveryForm.usePin && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }} 
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2 border-t border-slate-200">
                          <input 
                            type="text" 
                            maxLength={4}
                            value={newDeliveryForm.pin} 
                            onChange={e => setNewDeliveryForm({...newDeliveryForm, pin: e.target.value.replace(/[^0-9]/g, '')})}
                            className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-mono tracking-widest text-center placeholder:tracking-normal"
                            placeholder="Enter 4-digit PIN"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* File Upload Mock */}
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 hover:border-emerald-400/50 transition-colors cursor-pointer group">
                  <div className="flex gap-2 mb-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:-translate-y-2 transition-transform duration-300">
                      <ImageIcon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:-translate-y-2 transition-transform duration-300 delay-75">
                      <Video className="w-5 h-5 text-rose-400" />
                    </div>
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:-translate-y-2 transition-transform duration-300 delay-150">
                      <FileText className="w-5 h-5 text-amber-400" />
                    </div>
                  </div>
                  <p className="font-bold text-slate-700 text-sm">Drag & Drop Files or Folders</p>
                  <p className="text-xs text-slate-500 mt-1">Supports massive files up to 100GB per delivery.</p>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
                <Button variant="outline" onClick={() => setIsNewModalOpen(false)} className="rounded-xl bg-white shadow-sm">Cancel</Button>
                <Button onClick={handleCreateDelivery} className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-sm font-bold">
                  Start Upload
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
