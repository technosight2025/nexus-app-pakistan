"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Plus, Search, MoreVertical, Package, Grid, Image as ImageIcon, Check, Filter, ImagePlus, X, Briefcase
} from "lucide-react"

const INITIAL_CATALOGUE = [
  { id: 1, type: "Service", category: "Photography", name: "Premium Wedding Photography", price: 65000, desc: "2 Senior Photographers, Unlimited Shots, Color Graded", image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&q=80", published: true },
  { id: 2, type: "Service", category: "Photography", name: "Pre-Wedding Shoot", price: 35000, desc: "1 Outdoor Location, 2 Outfit Changes", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80", published: true },
  { id: 3, type: "Service", category: "Videography", name: "Cinematic Event Coverage", price: 85000, desc: "2 Cinematographers, Teaser + Full Highlight Video", image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&q=80", published: true },
  { id: 4, type: "Service", category: "Videography", name: "Drone Coverage", price: 20000, desc: "4 Hours Aerial Coverage via DJI Mavic 3", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&q=80", published: false },
  { id: 5, type: "Product", category: "Print", name: "Signature Leather Album (12x36)", price: 25000, desc: "40 Pages, Premium UV Printing", image: "https://images.unsplash.com/photo-1544390059-478678f1498b?w=400&q=80", published: true },
  { id: 6, type: "Package", category: "Bundle", name: "The Grand Royal Package", price: 150000, desc: "Includes Premium Photo, Cinematic Video, and Drone Coverage for 1 event.", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80", published: true },
]

export default function CataloguePage() {
  const [items, setItems] = useState(INITIAL_CATALOGUE)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  const [selectedItem, setSelectedItem] = useState<typeof INITIAL_CATALOGUE[0] | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  // Form State
  const [formId, setFormId] = useState<number | null>(null)
  const [formName, setFormName] = useState("")
  const [formType, setFormType] = useState("Service")
  const [formCategory, setFormCategory] = useState("Photography")
  const [formPrice, setFormPrice] = useState("")
  const [formDesc, setFormDesc] = useState("")
  const [formImage, setFormImage] = useState("")
  const [formPublished, setFormPublished] = useState(true)

  const filters = ["All", "Services", "Packages", "Products", "Photography", "Videography", "Print"]

  const filtered = items.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase())
    
    let matchesFilter = false
    if (filter === "All") matchesFilter = true
    else if (filter === "Services") matchesFilter = c.type === "Service"
    else if (filter === "Packages") matchesFilter = c.type === "Package"
    else if (filter === "Products") matchesFilter = c.type === "Product"
    else if (filter === "Photography") matchesFilter = c.category === "Photography"
    else if (filter === "Videography") matchesFilter = c.category === "Videography"
    else if (filter === "Print") matchesFilter = c.category === "Print"
    
    return matchesSearch && matchesFilter
  })

  const handleEdit = (item: typeof INITIAL_CATALOGUE[0]) => {
    setFormId(item.id)
    setFormName(item.name)
    setFormType(item.type)
    setFormCategory(item.category)
    setFormPrice(item.price.toString())
    setFormDesc(item.desc)
    setFormImage(item.image)
    setFormPublished(item.published)
    setIsCreating(true)
  }

  const handleDelete = (id: number) => {
    setItems(items.filter(i => i.id !== id))
    if (selectedItem?.id === id) {
      setSelectedItem(null)
    }
  }

  const handleTogglePublish = (id: number) => {
    setItems(items.map(i => {
      if (i.id === id) {
        const updatedItem = { ...i, published: !i.published }
        if (selectedItem?.id === id) setSelectedItem(updatedItem)
        return updatedItem
      }
      return i
    }))
  }

  const handleSave = () => {
    if (!formName || !formPrice) return
    
    if (formId) {
      // Update
      const updatedItems = items.map(i => {
        if (i.id === formId) {
          const updatedItem = {
            ...i,
            name: formName,
            type: formType,
            category: formCategory,
            price: Number(formPrice),
            desc: formDesc,
            image: formImage || i.image,
            published: formPublished
          }
          if (selectedItem?.id === formId) setSelectedItem(updatedItem)
          return updatedItem
        }
        return i
      })
      setItems(updatedItems)
    } else {
      // Create
      const newItem = {
        id: Math.max(0, ...items.map(i => i.id)) + 1,
        name: formName,
        type: formType,
        category: formCategory,
        price: Number(formPrice),
        desc: formDesc,
        image: formImage || "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&q=80",
        published: formPublished
      }
      setItems([newItem, ...items])
    }
    
    setIsCreating(false)
    setFormId(null)
    setFormName("")
    setFormPrice("")
    setFormDesc("")
    setFormImage("")
    setFormPublished(true)
  }

  // Calculate stats
  const totalItems = items.length
  const totalPackages = items.filter(i => i.type === "Package").length
  const totalServices = items.filter(i => i.type === "Service").length
  const avgPrice = items.reduce((sum, item) => sum + item.price, 0) / (totalItems || 1)

  return (
    <div className="space-y-5 md:space-y-6 pb-24">

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: "Total Items", value: totalItems, color: "text-[#4F46E5]", bg: "bg-[#EEF2FF] dark:bg-indigo-500/10" },
          { label: "Packages", value: totalPackages, color: "text-[#22C55E]", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
          { label: "Services", value: totalServices, color: "text-[#F59E0B]", bg: "bg-amber-50 dark:bg-amber-500/10" },
          { label: "Avg Price", value: `₨${(avgPrice/1000).toFixed(0)}k`, color: "text-[#0EA5E9]", bg: "bg-sky-50 dark:bg-sky-500/10" },
        ].map(c => (
          <div key={c.label} className={`${c.bg} rounded-xl md:rounded-2xl p-4 md:p-5`}>
            <div className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF] mb-1">{c.label}</div>
            <div className={`text-[22px] font-black ${c.color} leading-none`}>{c.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        {/* LEFT: Item list */}
        <div className="xl:col-span-2 space-y-4">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search catalogue..."
                className="w-full pl-9 pr-4 py-2 text-[12px] font-semibold bg-white dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl text-[#111827] dark:text-white placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black transition-all cursor-pointer ${
                    filter === f ? "bg-[#4F46E5] text-white" : "bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 text-[#9CA3AF] hover:bg-[#EEF2FF] hover:text-[#4F46E5] hover:border-[#4F46E5]"
                  }`}
                >
                  {f}
                </button>
              ))}
              <button 
                onClick={() => {
                  setFormId(null)
                  setFormName("")
                  setFormPrice("")
                  setFormDesc("")
                  setFormImage("")
                  setFormPublished(true)
                  setIsCreating(true)
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#4F46E5] text-white rounded-xl text-[9px] font-black hover:bg-indigo-700 transition-all cursor-pointer"
              >
                <Plus className="w-3 h-3" /> New Item
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {filtered.map(item => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedItem(item)
                  setIsCreating(false)
                }}
                className={`bg-white dark:bg-[#111118] border rounded-2xl overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col ${
                  selectedItem?.id === item.id && !isCreating
                    ? "border-[#4F46E5] ring-2 ring-[#4F46E5]/20" 
                    : "border-[#E5E7EB] dark:border-white/8"
                }`}
              >
                <div className="h-32 w-full bg-[#F3F4F6] dark:bg-white/5 relative overflow-hidden shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#9CA3AF]"><ImageIcon className="w-6 h-6 opacity-50" /></div>
                  )}
                  <div className="absolute top-2 left-2 flex gap-1">
                    <span className="text-[8px] font-black text-white bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md tracking-wider uppercase">{item.type}</span>
                    <span className="text-[8px] font-black text-[#4F46E5] bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md tracking-wider uppercase">{item.category}</span>
                    {!item.published && <span className="text-[8px] font-black text-amber-500 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md tracking-wider uppercase">Draft</span>}
                  </div>
                  <div className="absolute top-2 right-2">
                    <div className="text-[11px] font-black text-[#111827] dark:text-white bg-white/90 dark:bg-[#111118]/90 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-sm">
                      ₨{(item.price/1000).toFixed(0)}k
                    </div>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="text-[13px] font-black text-[#111827] dark:text-white mb-1 leading-tight">{item.name}</div>
                  <div className="text-[10px] text-[#6B7280] line-clamp-2">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Detail / Creation Panel */}
        <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl overflow-hidden xl:sticky xl:top-[80px] h-fit">
          {isCreating ? (
            // Create Form
            <div className="flex flex-col h-full">
              <div className="p-4 md:p-5 border-b border-[#E5E7EB] dark:border-white/8 flex items-center justify-between bg-[#F8FAFC] dark:bg-[#111118]">
                <div className="flex items-center gap-2 text-[#111827] dark:text-white">
                  <Package className="w-4 h-4 text-[#4F46E5]" />
                  <span className="text-[14px] font-black">Create Catalogue Item</span>
                </div>
                <button onClick={() => {
                  setIsCreating(false)
                  setFormId(null)
                }} className="text-[#9CA3AF] hover:text-[#EF4444] cursor-pointer"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Type</label>
                    <select value={formType} onChange={e => setFormType(e.target.value)} className="w-full bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl px-3 py-2 text-[12px] font-semibold text-[#111827] dark:text-white outline-none focus:border-[#4F46E5] appearance-none cursor-pointer">
                      <option value="Service" className="dark:bg-[#111118]">Service</option>
                      <option value="Package" className="dark:bg-[#111118]">Package</option>
                      <option value="Product" className="dark:bg-[#111118]">Product</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Category</label>
                    <select value={formCategory} onChange={e => setFormCategory(e.target.value)} className="w-full bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl px-3 py-2 text-[12px] font-semibold text-[#111827] dark:text-white outline-none focus:border-[#4F46E5] appearance-none cursor-pointer">
                      <option value="Photography" className="dark:bg-[#111118]">Photography</option>
                      <option value="Videography" className="dark:bg-[#111118]">Videography</option>
                      <option value="Print" className="dark:bg-[#111118]">Print</option>
                      <option value="Bundle" className="dark:bg-[#111118]">Bundle</option>
                      <option value="Add-on" className="dark:bg-[#111118]">Add-on</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Item Name</label>
                  <input type="text" value={formName} onChange={e => setFormName(e.target.value)} placeholder="e.g. Premium Wedding Photography" className="w-full bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl px-3 py-2 text-[12px] font-semibold text-[#111827] dark:text-white outline-none focus:border-[#4F46E5]" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Base Price (₨)</label>
                  <input type="number" value={formPrice} onChange={e => setFormPrice(e.target.value)} placeholder="65000" className="w-full bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl px-3 py-2 text-[12px] font-semibold text-[#111827] dark:text-white outline-none focus:border-[#4F46E5]" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Description & Deliverables</label>
                  <textarea value={formDesc} onChange={e => setFormDesc(e.target.value)} placeholder="Describe what is included..." rows={3} className="w-full bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl px-3 py-2 text-[12px] text-[#111827] dark:text-white outline-none focus:border-[#4F46E5] resize-none" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Display Image</label>
                  <div className="border-2 border-dashed border-[#E5E7EB] dark:border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#F8FAFC] dark:hover:bg-white/2 transition-colors">
                    <ImagePlus className="w-6 h-6 text-[#9CA3AF] mb-2" />
                    <div className="text-[11px] font-bold text-[#374151] dark:text-gray-300">Click to upload thumbnail</div>
                    <div className="text-[9px] text-[#9CA3AF] mt-0.5">JPG, PNG up to 5MB</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <div 
                    onClick={() => setFormPublished(!formPublished)} 
                    className={`w-10 h-5 rounded-full p-1 cursor-pointer transition-colors relative ${formPublished ? 'bg-[#4F46E5]' : 'bg-gray-300 dark:bg-white/10'}`}
                  >
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform ${formPublished ? 'translate-x-5' : 'translate-x-0'}`} />
                  </div>
                  <label onClick={() => setFormPublished(!formPublished)} className="text-[11px] font-bold text-[#374151] dark:text-gray-300 cursor-pointer">Publish to public profile</label>
                </div>

                <button onClick={handleSave} className="w-full py-2.5 bg-[#4F46E5] text-white rounded-xl text-[11px] font-black hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer mt-4">
                  {formId ? "Save Changes" : "Save to Catalogue"}
                </button>
              </div>
            </div>
          ) : !selectedItem ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-6">
              <Package className="w-10 h-10 text-[#E5E7EB] dark:text-white/10 mb-3" />
              <div className="text-[12px] font-bold text-[#9CA3AF]">Select an item to view details or create a new one.</div>
              <button onClick={() => {
                setFormId(null)
                setFormName("")
                setFormPrice("")
                setFormDesc("")
                setFormImage("")
                setFormPublished(true)
                setIsCreating(true)
              }} className="mt-4 px-4 py-2 bg-[#4F46E5] text-white rounded-xl text-[10px] font-black hover:bg-indigo-700 transition-colors cursor-pointer">Create New Item</button>
            </div>
          ) : (
            <>
              {/* Item Detail Header */}
              <div className="h-48 w-full bg-[#F3F4F6] dark:bg-white/5 relative">
                {selectedItem.image ? (
                  <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#9CA3AF]"><ImageIcon className="w-8 h-8 opacity-50" /></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex gap-2 mb-2">
                    <span className="text-[9px] font-black text-white bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md tracking-widest uppercase">{selectedItem.type}</span>
                    <span className="text-[9px] font-black text-white bg-[#4F46E5]/90 backdrop-blur-sm px-2 py-1 rounded-md tracking-widest uppercase">{selectedItem.category}</span>
                    {!selectedItem.published && <span className="text-[9px] font-black text-white bg-amber-500/90 backdrop-blur-sm px-2 py-1 rounded-md tracking-widest uppercase">Draft</span>}
                  </div>
                  <h2 className="text-[18px] font-black text-white leading-tight">{selectedItem.name}</h2>
                </div>
              </div>

              {/* Item Details */}
              <div className="p-5 space-y-5">
                <div className="flex items-end justify-between border-b border-[#E5E7EB] dark:border-white/10 pb-4">
                  <div>
                    <div className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest mb-0.5">Base Price</div>
                    <div className="text-[20px] font-black text-[#111827] dark:text-white leading-none">₨{selectedItem.price.toLocaleString()}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(selectedItem)} className="px-4 py-2 bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl text-[10px] font-black text-[#374151] dark:text-gray-300 hover:bg-[#EEF2FF] hover:text-[#4F46E5] hover:border-[#4F46E5] transition-colors cursor-pointer">
                      Edit Item
                    </button>
                    <button onClick={() => handleDelete(selectedItem.id)} className="w-9 h-9 flex items-center justify-center bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl text-[#9CA3AF] hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors cursor-pointer">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 pb-4 border-b border-[#E5E7EB] dark:border-white/10">
                  <div 
                    onClick={() => handleTogglePublish(selectedItem.id)} 
                    className={`w-10 h-5 rounded-full p-1 cursor-pointer transition-colors relative ${selectedItem.published ? 'bg-[#4F46E5]' : 'bg-gray-300 dark:bg-white/10'}`}
                  >
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform ${selectedItem.published ? 'translate-x-5' : 'translate-x-0'}`} />
                  </div>
                  <label onClick={() => handleTogglePublish(selectedItem.id)} className="text-[11px] font-bold text-[#374151] dark:text-gray-300 cursor-pointer">
                    {selectedItem.published ? 'Published to Public Profile' : 'Hidden from Public Profile (Draft)'}
                  </label>
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest">Description & Deliverables</div>
                  <p className="text-[12px] text-[#374151] dark:text-gray-300 leading-relaxed">
                    {selectedItem.desc}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
