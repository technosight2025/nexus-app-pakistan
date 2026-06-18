"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  FolderOpen, FileText, Image as ImageIcon, FileSpreadsheet, 
  UploadCloud, Download, Search, MoreVertical, Star, 
  Plus, Filter, Folder, FileIcon, Camera, Video, Cloud, HardDrive
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface VaultFile {
  id: string
  name: string
  type: "document" | "image" | "spreadsheet" | "pdf"
  category: "contracts" | "invoices" | "inspiration" | "guests" | "media" | "photos" | "videos" | "other"
  size: string
  date: string
  isStarred: boolean
}

const MOCK_FILES: VaultFile[] = [
  { id: "f1", name: "Grand_Ballroom_Contract_Signed.pdf", type: "pdf", category: "contracts", size: "2.4 MB", date: "Dec 10, 2026", isStarred: true },
  { id: "f2", name: "Guest_List_Final_V3.xlsx", type: "spreadsheet", category: "guests", size: "845 KB", date: "Dec 12, 2026", isStarred: true },
  { id: "f3", name: "Catering_Invoice_Deposit.pdf", type: "pdf", category: "invoices", size: "1.1 MB", date: "Jan 15, 2027", isStarred: false },
  { id: "f4", name: "Decor_Moodboard_Pink.jpg", type: "image", category: "inspiration", size: "4.5 MB", date: "Feb 02, 2027", isStarred: true },
  { id: "f5", name: "Photography_Package_Details.pdf", type: "pdf", category: "contracts", size: "3.2 MB", date: "Jan 20, 2027", isStarred: false },
  { id: "f6", name: "Seating_Chart_Draft.pdf", type: "pdf", category: "guests", size: "1.8 MB", date: "Mar 05, 2027", isStarred: false },
  { id: "f7", name: "Bridal_Dress_Inspo_1.png", type: "image", category: "inspiration", size: "5.1 MB", date: "Feb 10, 2027", isStarred: false },
]

const FOLDERS = [
  { id: "contracts", name: "Contracts & Legal", count: 12, icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
  { id: "invoices", name: "Invoices & Receipts", count: 8, icon: FileSpreadsheet, color: "text-emerald-600", bg: "bg-emerald-50" },
  { id: "inspiration", name: "Inspiration Boards", count: 45, icon: ImageIcon, color: "text-rose-600", bg: "bg-rose-50" },
  { id: "guests", name: "Guest Documents", count: 3, icon: FolderOpen, color: "text-purple-600", bg: "bg-purple-50" },
  { id: "media", name: "Media Assets", count: 18, icon: Cloud, color: "text-indigo-600", bg: "bg-indigo-50" },
  { id: "photos", name: "Event Photos", count: 156, icon: Camera, color: "text-pink-600", bg: "bg-pink-50" },
  { id: "videos", name: "Event Videos", count: 12, icon: Video, color: "text-cyan-600", bg: "bg-cyan-50" },
]

export function VaultOverview() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const getFileIcon = (type: VaultFile["type"]) => {
    switch(type) {
      case "pdf": return <FileText className="w-5 h-5 text-rose-500" />
      case "spreadsheet": return <FileSpreadsheet className="w-5 h-5 text-emerald-500" />
      case "image": return <ImageIcon className="w-5 h-5 text-blue-500" />
      default: return <FileIcon className="w-5 h-5 text-slate-500" />
    }
  }

  const filteredFiles = MOCK_FILES.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory ? file.category === activeCategory : true
    return matchesSearch && matchesCategory
  })

  const starredFiles = MOCK_FILES.filter(f => f.isStarred)

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 md:py-12 space-y-8">
      
      {/* 🌟 Header & Upload Action */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-[32px] md:text-[40px] font-black font-poppins text-[#0A3B2A] tracking-tight leading-tight">
            Documents Vault
          </h1>
          <p className="text-slate-500 font-medium text-lg mt-2">
            Your secure digital filing cabinet for all event documents.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-full border-slate-200 text-slate-700 font-bold bg-white">
            <Plus className="w-5 h-5 mr-2" /> New Folder
          </Button>
          <Button className="h-12 px-6 rounded-full bg-[#0A3B2A] text-white font-bold shadow-md hover:bg-[#0A3B2A]/90 transition-all">
            <UploadCloud className="w-5 h-5 mr-2" /> Upload File
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key="files"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
        >
          {/* 🌟 Left Sidebar: Search & Folders */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-[24px] focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 shadow-sm font-medium"
              />
            </div>

            {/* Folders Navigation */}
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 space-y-6">
              <h3 className="text-sm font-bold font-poppins text-slate-900 uppercase tracking-wider">Quick Filters</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveCategory(null)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl transition-colors ${
                    activeCategory === null ? "bg-[#FAF8F5] text-[#0A3B2A]" : "hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Folder className={`w-5 h-5 ${activeCategory === null ? "text-[#0A3B2A]" : "text-slate-400"}`} />
                    <span className="font-bold text-sm">All Files</span>
                  </div>
                </button>
                
                {FOLDERS.map((folder) => (
                  <button 
                    key={folder.id}
                    onClick={() => setActiveCategory(folder.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl transition-colors ${
                      activeCategory === folder.id ? "bg-[#FAF8F5] text-[#0A3B2A]" : "hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${folder.bg} ${folder.color}`}>
                        <folder.icon className="w-4 h-4" />
                      </div>
                      <span className={`font-bold text-sm ${activeCategory === folder.id ? "text-[#0A3B2A]" : "text-slate-600"}`}>
                        {folder.name}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-400 bg-white px-2 py-1 rounded-full shadow-sm">
                      {folder.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cloud Storage Info */}
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold font-poppins text-slate-900 uppercase tracking-wider">Cloud Storage</h3>
                <HardDrive className="w-5 h-5 text-slate-400" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold text-slate-600">
                  <span>45 GB used</span>
                  <span>100 GB</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0A3B2A] rounded-full" style={{ width: "45%" }} />
                </div>
                <p className="text-xs font-medium text-slate-500 pt-1">
                  You have 55 GB of free space remaining. Upgrade for unlimited media storage.
                </p>
              </div>
            </div>

          </div>

          {/* 🌟 Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Quick Access / Starred Row */}
            {!activeCategory && !searchQuery && (
              <div className="space-y-4">
                <h2 className="text-[20px] font-bold font-poppins text-[#0A3B2A] flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> Starred & Recent
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {starredFiles.map(file => (
                    <motion.div 
                      whileHover={{ y: -4 }}
                      key={`star-${file.id}`}
                      className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm cursor-pointer group hover:border-[#0A3B2A]/20 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] flex items-center justify-center">
                          {getFileIcon(file.type)}
                        </div>
                        <button className="text-slate-300 hover:text-slate-600">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                      <h4 className="font-bold text-sm text-[#1A1A1A] line-clamp-1 group-hover:text-[#0A3B2A] transition-colors" title={file.name}>
                        {file.name}
                      </h4>
                      <div className="flex items-center justify-between mt-3 text-xs font-medium text-slate-400">
                        <span>{file.size}</span>
                        <span>{file.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* All Files List View */}
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h2 className="text-[20px] font-bold font-poppins text-[#0A3B2A]">
                  {activeCategory ? FOLDERS.find(f => f.id === activeCategory)?.name : "All Documents"}
                </h2>
                <div className="flex items-center gap-2 text-slate-400">
                  <Button variant="ghost" size="icon" className="hover:text-slate-800">
                    <Filter className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider bg-white">
                      <th className="py-4 px-6 font-bold">Name</th>
                      <th className="py-4 px-6 font-bold">Category</th>
                      <th className="py-4 px-6 font-bold">Date Modified</th>
                      <th className="py-4 px-6 font-bold">Size</th>
                      <th className="py-4 px-6 text-right font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredFiles.length > 0 ? (
                      filteredFiles.map(file => (
                        <tr key={file.id} className="hover:bg-[#FAF8F5]/50 transition-colors group cursor-pointer">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              {getFileIcon(file.type)}
                              <span className="font-bold text-sm text-[#1A1A1A] group-hover:text-[#0A3B2A] transition-colors">{file.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-600 capitalize">
                              {file.category}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-sm text-slate-500 font-medium">
                            {file.date}
                          </td>
                          <td className="py-4 px-6 text-sm text-slate-500 font-medium">
                            {file.size}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="icon" className="w-8 h-8 text-slate-400 hover:text-[#0A3B2A] hover:bg-[#FAF8F5]">
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="w-8 h-8 text-slate-400 hover:text-slate-800 hover:bg-slate-100">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-500 font-medium">
                          No files found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
