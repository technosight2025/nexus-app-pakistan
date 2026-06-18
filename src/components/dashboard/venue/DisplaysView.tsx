"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MonitorPlay, Plus, Power, Wifi, WifiOff, Cast, 
  Image as ImageIcon, Type, LayoutTemplate, X, 
  RefreshCw, CheckCircle2, MonitorSmartphone, Edit2, Trash2
} from "lucide-react"
import { Button } from "@/components/ui/button"

type ScreenStatus = "Online" | "Offline"
type ContentType = "Image" | "Text" | "Template" | "Idle"

interface DisplayScreen {
  id: string
  name: string
  location: string
  status: ScreenStatus
  currentContent: {
    type: ContentType
    data: string // URL for image, Text for text/template, or "Nexus OS Logo" for Idle
  }
}

const INITIAL_SCREENS: DisplayScreen[] = [
  {
    id: "SCR-01",
    name: "Main Entrance Kiosk",
    location: "Lobby",
    status: "Online",
    currentContent: {
      type: "Template",
      data: "Welcome to the Wedding of Ali & Sara"
    }
  },
  {
    id: "SCR-02",
    name: "Hall A Projector",
    location: "Royal Hall",
    status: "Online",
    currentContent: {
      type: "Image",
      data: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=400&auto=format&fit=crop"
    }
  },
  {
    id: "SCR-03",
    name: "Hall B Projector",
    location: "Crystal Hall",
    status: "Offline",
    currentContent: {
      type: "Idle",
      data: "Nexus OS Logo"
    }
  },
  {
    id: "SCR-04",
    name: "Dining Area TV",
    location: "Dining Room",
    status: "Online",
    currentContent: {
      type: "Text",
      data: "Dinner will be served at 9:00 PM"
    }
  }
]

export function DisplaysView() {
  const [screens, setScreens] = useState<DisplayScreen[]>(INITIAL_SCREENS)
  
  // Modal State
  const [isCastModalOpen, setIsCastModalOpen] = useState(false)
  const [selectedScreen, setSelectedScreen] = useState<DisplayScreen | null>(null)
  
  // Cast Form State
  const [castType, setCastType] = useState<ContentType>("Template")
  const [castData, setCastData] = useState("")

  // Add/Edit Screen State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingScreenId, setEditingScreenId] = useState<string | null>(null)
  const [screenForm, setScreenForm] = useState({ name: "", location: "", status: "Online" as ScreenStatus })

  const onlineCount = screens.filter(s => s.status === "Online").length
  const offlineCount = screens.filter(s => s.status === "Offline").length

  const handleOpenCastModal = (screen: DisplayScreen) => {
    if (screen.status === "Offline") return // Can't cast to offline
    setSelectedScreen(screen)
    setCastType(screen.currentContent.type !== "Idle" ? screen.currentContent.type : "Template")
    setCastData(screen.currentContent.type !== "Idle" ? screen.currentContent.data : "")
    setIsCastModalOpen(true)
  }

  const handlePushContent = () => {
    if (!selectedScreen) return
    
    setScreens(screens.map(s => {
      if (s.id === selectedScreen.id) {
        return {
          ...s,
          currentContent: {
            type: castType,
            data: castData || "Default Content"
          }
        }
      }
      return s
    }))
    
    setIsCastModalOpen(false)
  }

  const handleOpenEditModal = (screen?: DisplayScreen) => {
    if (screen) {
      setEditingScreenId(screen.id)
      setScreenForm({ name: screen.name, location: screen.location, status: screen.status })
    } else {
      setEditingScreenId(null)
      setScreenForm({ name: "", location: "", status: "Online" })
    }
    setIsEditModalOpen(true)
  }

  const handleSaveScreen = () => {
    if (!screenForm.name || !screenForm.location) return

    if (editingScreenId) {
      setScreens(screens.map(s => s.id === editingScreenId ? { ...s, ...screenForm } : s))
    } else {
      setScreens([...screens, {
        id: `SCR-${Math.floor(Math.random() * 1000)}`,
        ...screenForm,
        currentContent: { type: "Idle", data: "Nexus OS Logo" }
      }])
    }
    setIsEditModalOpen(false)
  }

  const handleDeleteScreen = (id: string) => {
    setScreens(screens.filter(s => s.id !== id))
  }

  return (
    <div className="space-y-6 w-full pb-12 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 p-6 rounded-3xl shadow-lg border border-slate-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative z-10">
          <h1 className="text-2xl font-black flex items-center gap-2">
            <MonitorPlay className="w-6 h-6 text-primary" /> Displays & Digital Signage
          </h1>
          <p className="text-sm font-medium text-slate-400 mt-1">Manage and cast content to all screens across your venue.</p>
        </div>
        
        <div className="flex items-center gap-4 relative z-10 bg-slate-800/50 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-700/50">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-bold text-slate-200">{onlineCount} Online</span>
          </div>
          <div className="w-px h-4 bg-slate-700" />
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="text-sm font-bold text-slate-200">{offlineCount} Offline</span>
          </div>
        </div>
      </div>

      {/* Screen Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {screens.map(screen => (
          <div key={screen.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group">
            {/* Screen Mockup Area */}
            <div className="aspect-video bg-slate-900 relative p-4 flex items-center justify-center overflow-hidden">
              {/* Bezel styling */}
              <div className="absolute inset-2 rounded-xl border-[6px] border-black/80 flex items-center justify-center overflow-hidden bg-slate-800 shadow-inner">
                {screen.status === "Offline" ? (
                  <div className="flex flex-col items-center text-slate-600 gap-2">
                    <Power className="w-8 h-8" />
                    <span className="text-xs font-bold uppercase tracking-widest">No Signal</span>
                  </div>
                ) : (
                  <>
                    {screen.currentContent.type === "Image" && (
                      <img src={screen.currentContent.data} alt="Screen Content" className="w-full h-full object-cover" />
                    )}
                    {screen.currentContent.type === "Template" && (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-slate-900 flex flex-col items-center justify-center text-center p-6 relative">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
                        <h2 className="text-white font-serif italic text-2xl drop-shadow-lg z-10">{screen.currentContent.data}</h2>
                      </div>
                    )}
                    {screen.currentContent.type === "Text" && (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center text-center p-6">
                        <h2 className="text-white font-bold text-xl">{screen.currentContent.data}</h2>
                      </div>
                    )}
                    {screen.currentContent.type === "Idle" && (
                      <div className="flex flex-col items-center text-slate-500 opacity-50">
                        <span className="font-black text-4xl tracking-tight text-white mb-2">NEXUS</span>
                        <span className="text-xs font-bold uppercase tracking-widest">Ready to Cast</span>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              {/* Stand mock */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-2 bg-gradient-to-t from-slate-700 to-slate-600 rounded-t-sm" />
            </div>

            {/* Controls Area */}
            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-black text-slate-900 text-lg">{screen.name}</h3>
                  <div className="flex items-center gap-2">
                    {screen.status === "Online" ? (
                      <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
                        <Wifi className="w-3 h-3" /> Online
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-rose-50 text-rose-700 text-[10px] font-bold uppercase tracking-wider">
                        <WifiOff className="w-3 h-3" /> Offline
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
                    <MonitorSmartphone className="w-4 h-4" /> {screen.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenEditModal(screen)} className="w-8 h-8 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteScreen(screen.id)} className="w-8 h-8 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-2">
                <Button 
                  onClick={() => handleOpenCastModal(screen)}
                  disabled={screen.status === "Offline"}
                  className={`flex-1 rounded-xl shadow-sm ${screen.status === "Online" ? "bg-primary hover:bg-primary/90 text-white" : "bg-slate-100 text-slate-400"}`}
                >
                  <Cast className="w-4 h-4 mr-2" /> Cast Content
                </Button>
                <Button variant="outline" size="icon" className="rounded-xl border-slate-200 text-slate-500 shrink-0">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Add Screen Card */}
        <div onClick={() => handleOpenEditModal()} className="bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-8 min-h-[350px] cursor-pointer hover:bg-slate-50 hover:border-primary/50 transition-colors group">
          <div className="w-16 h-16 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-md transition-all text-slate-400 group-hover:text-primary">
            <Plus className="w-8 h-8" />
          </div>
          <h3 className="font-black text-slate-900 text-lg">Add New Screen</h3>
          <p className="text-sm font-medium text-slate-500 text-center mt-2 max-w-[200px]">Connect a new Smart TV or casting device to your network.</p>
        </div>
      </div>

      {/* Cast Modal */}
      <AnimatePresence>
        {isCastModalOpen && selectedScreen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCastModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 z-50 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 backdrop-blur-md shrink-0">
                <div>
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <Cast className="w-5 h-5 text-primary" /> Cast to {selectedScreen.name}
                  </h2>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">Currently casting: {selectedScreen.currentContent.type}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsCastModalOpen(false)} className="rounded-full hover:bg-slate-200">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-6 overflow-y-auto flex flex-col md:flex-row gap-8">
                {/* Cast Controls */}
                <div className="flex-1 space-y-6">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Content Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button 
                        onClick={() => { setCastType("Template"); setCastData("Welcome to the Event") }}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all gap-2 ${castType === "Template" ? "border-primary bg-primary/5 text-primary" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}
                      >
                        <LayoutTemplate className="w-5 h-5" />
                        <span className="text-xs font-bold">Template</span>
                      </button>
                      <button 
                        onClick={() => { setCastType("Image"); setCastData("https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=400&auto=format&fit=crop") }}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all gap-2 ${castType === "Image" ? "border-primary bg-primary/5 text-primary" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}
                      >
                        <ImageIcon className="w-5 h-5" />
                        <span className="text-xs font-bold">Image/Video</span>
                      </button>
                      <button 
                        onClick={() => { setCastType("Text"); setCastData("Please take your seats") }}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all gap-2 ${castType === "Text" ? "border-primary bg-primary/5 text-primary" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}
                      >
                        <Type className="w-5 h-5" />
                        <span className="text-xs font-bold">Custom Text</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {castType === "Image" ? "Media URL" : "Message Content"}
                    </label>
                    {castType === "Image" ? (
                      <input 
                        type="text" value={castData} onChange={e => setCastData(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                        placeholder="https://..."
                      />
                    ) : (
                      <textarea 
                        value={castData} onChange={e => setCastData(e.target.value)}
                        className="w-full h-24 p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none"
                        placeholder="Type your message here..."
                      />
                    )}
                  </div>
                </div>

                {/* Live Preview Pane */}
                <div className="w-full md:w-[280px] shrink-0 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                    Live Preview <span className="flex items-center gap-1 text-emerald-500 text-[10px]"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Syncing</span>
                  </label>
                  <div className="aspect-video bg-slate-900 rounded-xl border-4 border-slate-800 overflow-hidden shadow-inner flex items-center justify-center relative">
                    {castType === "Image" && castData && (
                      <img src={castData} alt="Preview" className="w-full h-full object-cover" />
                    )}
                    {castType === "Template" && (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-slate-900 flex items-center justify-center p-4 text-center">
                        <h2 className="text-white font-serif italic text-sm drop-shadow-md">{castData || "Welcome"}</h2>
                      </div>
                    )}
                    {castType === "Text" && (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center p-4 text-center">
                        <h2 className="text-white font-bold text-sm">{castData || "Your Text Here"}</h2>
                      </div>
                    )}
                    {!castData && castType !== "Idle" && (
                      <span className="text-slate-600 text-xs font-bold uppercase tracking-widest">No Content</span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 text-center mt-2">This is exactly what will appear on {selectedScreen.name}.</p>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
                <Button variant="outline" onClick={() => setIsCastModalOpen(false)} className="rounded-xl bg-white shadow-sm">Cancel</Button>
                <Button onClick={handlePushContent} className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-sm">
                  <Cast className="w-4 h-4 mr-2" /> Push to Screen
                </Button>
              </div>
            </motion.div>
          </>
        )}

        {/* Add/Edit Screen Modal */}
        {isEditModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 backdrop-blur-md">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <MonitorSmartphone className="w-5 h-5 text-primary" /> {editingScreenId ? "Edit Screen" : "Add New Screen"}
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setIsEditModalOpen(false)} className="rounded-full hover:bg-slate-200">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Screen Name</label>
                  <input 
                    type="text" value={screenForm.name} onChange={e => setScreenForm({...screenForm, name: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                    placeholder="e.g. Lobby Welcome TV"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</label>
                  <input 
                    type="text" value={screenForm.location} onChange={e => setScreenForm({...screenForm, location: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                    placeholder="e.g. Ground Floor Lobby"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Network Status</label>
                  <select 
                    value={screenForm.status} onChange={e => setScreenForm({...screenForm, status: e.target.value as ScreenStatus})}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium bg-white"
                  >
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)} className="rounded-xl bg-white shadow-sm">Cancel</Button>
                <Button onClick={handleSaveScreen} className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-sm">
                  {editingScreenId ? "Save Changes" : "Add Screen"}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
