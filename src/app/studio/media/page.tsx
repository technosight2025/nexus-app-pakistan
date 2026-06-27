"use client"

import { useState } from "react"
import {
  HardDrive, Upload, Grid3X3, List, Search, Filter,
  Image, Film, Mic, FileText, Folder, MoreVertical,
  Download, Share2, Eye, Trash2, Plus, Cloud,
  CheckCircle2, Clock, Tag
} from "lucide-react"

const TABS = [
  { id: "all",    label: "All Media",  icon: HardDrive },
  { id: "photos", label: "Photos",     icon: Image },
  { id: "videos", label: "Videos",     icon: Film },
  { id: "audio",  label: "Audio",      icon: Mic },
  { id: "docs",   label: "Documents",  icon: FileText },
]

const FOLDERS = [
  { name: "Ayesha & Hamza — Jul 5", items: 847, size: "24.3 GB", color: "bg-indigo-500", initials: "AH", synced: true },
  { name: "Sara Imran — Jul 10",    items: 312, size: "8.7 GB",  color: "bg-sky-500",    initials: "SI", synced: true },
  { name: "Malik Family — Jul 14",  items: 518, size: "15.2 GB", color: "bg-emerald-500",initials: "MF", synced: false },
  { name: "Farhan Malik — Jul 22",  items: 0,   size: "—",       color: "bg-purple-500", initials: "FM", synced: false },
]

const FILES = [
  { id: 1, name: "DSC_0847.ARW", type: "photo", folder: "Ayesha & Hamza", size: "48 MB",  tags: ["RAW", "Baraat"], status: "Approved",  date: "Jul 5" },
  { id: 2, name: "highlight_reel.mp4", type: "video", folder: "Ayesha & Hamza", size: "4.2 GB", tags: ["Final", "Highlight"], status: "Editing",   date: "Jul 6" },
  { id: 3, name: "DSC_0312.ARW", type: "photo", folder: "Sara Imran",    size: "52 MB",  tags: ["RAW", "Studio"],  status: "Approved",  date: "Jul 10" },
  { id: 4, name: "drone_4k_00001.mp4", type: "video", folder: "Ayesha & Hamza", size: "1.8 GB", tags: ["RAW","Drone"],    status: "Queued",    date: "Jul 5" },
  { id: 5, name: "voice_memo_client.m4a", type: "audio", folder: "Malik Family",  size: "12 MB",  tags: ["Notes"],          status: "Done",      date: "Jul 14" },
  { id: 6, name: "contract_signed.pdf", type: "doc", folder: "Farhan Malik",  size: "512 KB", tags: ["Contract"],       status: "Done",      date: "Jun 15" },
  { id: 7, name: "walima_01_edited.jpg", type: "photo", folder: "Ayesha & Hamza", size: "18 MB",  tags: ["Edited","Final"], status: "Approved",  date: "Jul 7" },
  { id: 8, name: "mehndi_cinematic.mp4", type: "video", folder: "Malik Family",  size: "2.4 GB", tags: ["Cinematic"],      status: "Review",    date: "Jul 15" },
]

const TYPE_ICONS: Record<string, React.ElementType> = { photo: Image, video: Film, audio: Mic, doc: FileText }
const TYPE_COLORS: Record<string, string> = {
  photo: "text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10",
  video: "text-rose-500 bg-rose-50 dark:bg-rose-500/10",
  audio: "text-amber-500 bg-amber-50 dark:bg-amber-500/10",
  doc:   "text-sky-500 bg-sky-50 dark:bg-sky-500/10",
}
const STATUS_STYLES: Record<string, string> = {
  Approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Editing:  "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
  Queued:   "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Review:   "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
  Done:     "bg-gray-100 text-gray-600 dark:bg-white/8 dark:text-gray-400",
}

const STORAGE_USED = 48.2
const STORAGE_TOTAL = 200

export default function MediaLibraryPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [view, setView] = useState<"grid" | "list">("list")
  const [search, setSearch] = useState("")

  const filtered = FILES.filter(f => {
    const matchTab = activeTab === "all" || f.type === activeTab.replace("s","")
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.folder.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  const storagePct = Math.round((STORAGE_USED / STORAGE_TOTAL) * 100)

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] md:text-[26px] font-black text-[#111827] dark:text-white">Media Library</h1>
          <p className="text-[12px] text-[#9CA3AF] mt-0.5">Organize, tag, and deliver all project media assets</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#4F46E5] text-white rounded-xl text-[11px] font-black hover:bg-indigo-700 transition-all cursor-pointer shadow-sm">
          <Upload className="w-4 h-4" /> Upload Media
        </button>
      </div>

      {/* Storage + Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="col-span-2 bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest">Cloud Storage</div>
            <Cloud className="w-4 h-4 text-[#9CA3AF]" />
          </div>
          <div className="text-[20px] font-black text-[#111827] dark:text-white">{STORAGE_USED} GB <span className="text-[13px] font-semibold text-[#9CA3AF]">/ {STORAGE_TOTAL} GB</span></div>
          <div className="mt-2 h-2 bg-[#E5E7EB] dark:bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-[#4F46E5] rounded-full" style={{ width: `${storagePct}%` }} />
          </div>
          <div className="text-[9px] text-[#9CA3AF] mt-1">{storagePct}% used · {STORAGE_TOTAL - STORAGE_USED} GB free</div>
        </div>
        {[
          { label: "Total Files", value: FILES.length, color: "text-[#4F46E5]" },
          { label: "Pending Review", value: FILES.filter(f => f.status === "Review" || f.status === "Editing").length, color: "text-[#F59E0B]" },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-4">
            <div className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest mb-1">{s.label}</div>
            <div className={`text-[24px] font-black ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Project Folders */}
      <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest">Project Folders</div>
          <button className="text-[10px] font-black text-[#4F46E5] hover:underline cursor-pointer flex items-center gap-1"><Plus className="w-3 h-3" /> New Folder</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {FOLDERS.map(folder => (
            <div key={folder.name} className="border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-4 hover:border-[#4F46E5]/40 hover:shadow-sm transition-all cursor-pointer group">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-xl ${folder.color} text-white text-[9px] font-black flex items-center justify-center shrink-0`}>{folder.initials}</div>
                {folder.synced && <Cloud className="w-3.5 h-3.5 text-[#22C55E] ml-auto" />}
              </div>
              <div className="text-[11px] font-bold text-[#111827] dark:text-white leading-tight">{folder.name}</div>
              <div className="text-[9px] text-[#9CA3AF] mt-1">{folder.items} files · {folder.size}</div>
            </div>
          ))}
        </div>
      </div>

      {/* File Browser */}
      <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border-b border-[#F3F4F6] dark:border-white/5">
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search files…" className="w-full pl-8 pr-3 py-2 text-[11px] font-semibold bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl text-[#111827] dark:text-white placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all" />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-3 py-1.5 rounded-lg text-[9px] font-black cursor-pointer transition-all ${activeTab === tab.id ? "bg-[#4F46E5] text-white" : "bg-[#F8FAFC] dark:bg-white/5 text-[#9CA3AF] hover:text-[#4F46E5]"}`}>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex gap-1 ml-auto">
            {(["grid","list"] as const).map(v => (
              <button key={v} onClick={() => setView(v)} className={`p-2 rounded-lg cursor-pointer transition-colors ${view === v ? "bg-[#4F46E5] text-white" : "text-[#9CA3AF] hover:text-[#4F46E5]"}`}>
                {v === "grid" ? <Grid3X3 className="w-3.5 h-3.5" /> : <List className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>

        {/* Files */}
        {view === "list" ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="bg-[#F8FAFC] dark:bg-white/3 border-b border-[#E5E7EB] dark:border-white/8">
                  {["File", "Project", "Size", "Tags", "Status", ""].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[9px] font-black uppercase tracking-widest text-[#9CA3AF]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(file => {
                  const FIcon = TYPE_ICONS[file.type]
                  const fcls = TYPE_COLORS[file.type]
                  return (
                    <tr key={file.id} className="border-b border-[#F9FAFB] dark:border-white/3 hover:bg-[#F8FAFC] dark:hover:bg-white/3 transition-colors cursor-pointer">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${fcls}`}><FIcon className="w-3.5 h-3.5" /></div>
                          <div className="text-[11px] font-semibold text-[#374151] dark:text-gray-300 truncate max-w-[160px]">{file.name}</div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-[10px] text-[#9CA3AF] truncate max-w-[120px]">{file.folder}</td>
                      <td className="px-5 py-3.5 text-[10px] text-[#6B7280] dark:text-gray-400">{file.size}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex flex-wrap gap-1">
                          {file.tags.map(t => <span key={t} className="text-[8px] font-black px-1.5 py-0.5 bg-[#F8FAFC] dark:bg-white/5 text-[#9CA3AF] rounded">{t}</span>)}
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`text-[8px] font-black px-2 py-0.5 rounded-full ${STATUS_STYLES[file.status]}`}>{file.status}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 hover:bg-[#EEF2FF] dark:hover:bg-indigo-500/10 rounded-lg text-[#9CA3AF] hover:text-[#4F46E5] cursor-pointer"><Eye className="w-3.5 h-3.5" /></button>
                          <button className="p-1.5 hover:bg-[#EEF2FF] dark:hover:bg-indigo-500/10 rounded-lg text-[#9CA3AF] hover:text-[#4F46E5] cursor-pointer"><Download className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map(file => {
              const FIcon = TYPE_ICONS[file.type]
              const fcls = TYPE_COLORS[file.type]
              return (
                <div key={file.id} className="border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-4 hover:border-[#4F46E5]/40 hover:shadow-sm transition-all cursor-pointer group">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${fcls}`}><FIcon className="w-5 h-5" /></div>
                  <div className="text-[10px] font-bold text-[#111827] dark:text-white truncate">{file.name}</div>
                  <div className="text-[8px] text-[#9CA3AF] mt-0.5">{file.size}</div>
                  <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full mt-2 inline-block ${STATUS_STYLES[file.status]}`}>{file.status}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
