"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Box, Search, Plus, Filter, Edit2, Trash2, 
  AlertTriangle, Wrench, CheckCircle2, X
} from "lucide-react"
import { Button } from "@/components/ui/button"

type AssetCondition = "New" | "Good" | "Fair" | "Needs Repair"
type AssetCategory = "Furniture" | "Decor" | "Lighting" | "Dining & Cutlery" | "AV Equipment"

interface Asset {
  id: string
  name: string
  category: AssetCategory
  totalQty: number
  availableQty: number
  condition: AssetCondition
  lastMaintained: string
  image: string
}

const INITIAL_ASSETS: Asset[] = [
  {
    id: "AST-001",
    name: "Gold Tiffany Chairs",
    category: "Furniture",
    totalQty: 500,
    availableQty: 480,
    condition: "Good",
    lastMaintained: "Oct 15, 2023",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "AST-002",
    name: "Crystal Chandeliers (Large)",
    category: "Lighting",
    totalQty: 12,
    availableQty: 10,
    condition: "Needs Repair",
    lastMaintained: "Aug 22, 2023",
    image: "https://images.unsplash.com/photo-1543248939-ff40856f65d4?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "AST-003",
    name: "Round Banquet Tables (72\")",
    category: "Furniture",
    totalQty: 80,
    availableQty: 80,
    condition: "New",
    lastMaintained: "Nov 01, 2023",
    image: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "AST-004",
    name: "Silver Cutlery Sets (100pc)",
    category: "Dining & Cutlery",
    totalQty: 20,
    availableQty: 18,
    condition: "Fair",
    lastMaintained: "Sep 10, 2023",
    image: "https://images.unsplash.com/photo-1615886737525-450f3796fc10?q=80&w=200&auto=format&fit=crop"
  }
]

const CATEGORIES: AssetCategory[] = ["Furniture", "Decor", "Lighting", "Dining & Cutlery", "AV Equipment"]
const CONDITIONS: AssetCondition[] = ["New", "Good", "Fair", "Needs Repair"]

export function AssetsView() {
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<AssetCategory | "All">("All")
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null)
  const [formData, setFormData] = useState<Partial<Asset>>({
    category: "Furniture",
    condition: "New",
    totalQty: 0,
    availableQty: 0
  })

  // Derived metrics
  const totalAssetsTracked = assets.reduce((sum, a) => sum + a.totalQty, 0)
  const itemsNeedingRepair = assets.filter(a => a.condition === "Needs Repair").reduce((sum, a) => sum + (a.totalQty - a.availableQty > 0 ? (a.totalQty - a.availableQty) : 1), 0)
  const lowStockItems = assets.filter(a => a.availableQty < a.totalQty * 0.2).length // Less than 20% available

  // Handlers
  const handleOpenModal = (asset?: Asset) => {
    if (asset) {
      setEditingAsset(asset)
      setFormData(asset)
    } else {
      setEditingAsset(null)
      setFormData({
        name: "",
        category: "Furniture",
        condition: "New",
        totalQty: 0,
        availableQty: 0,
        lastMaintained: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=200&auto=format&fit=crop" // default placeholder
      })
    }
    setIsModalOpen(true)
  }

  const handleSave = () => {
    if (!formData.name) return

    if (editingAsset) {
      setAssets(assets.map(a => a.id === editingAsset.id ? { ...a, ...formData } as Asset : a))
    } else {
      const newAsset: Asset = {
        ...(formData as Asset),
        id: `AST-${Math.floor(Math.random() * 1000)}`,
      }
      setAssets([...assets, newAsset])
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id: string) => {
    setAssets(assets.filter(a => a.id !== id))
  }

  // Filtering
  const filteredAssets = assets.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || a.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getConditionBadge = (condition: AssetCondition) => {
    switch (condition) {
      case "New": return "bg-emerald-50 text-emerald-700"
      case "Good": return "bg-blue-50 text-blue-700"
      case "Fair": return "bg-amber-50 text-amber-700"
      case "Needs Repair": return "bg-rose-50 text-rose-700"
    }
  }

  return (
    <div className="space-y-6 w-full pb-12 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Box className="w-6 h-6 text-primary" /> Assets & Inventory
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage your venue's physical items, furniture, and equipment.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-sm">
          <Plus className="w-4 h-4 mr-2" /> Add New Asset
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-primary shrink-0 z-10">
            <Box className="w-6 h-6" />
          </div>
          <div className="z-10">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Items Tracked</p>
            <h3 className="text-2xl font-black text-slate-900">{totalAssetsTracked.toLocaleString()}</h3>
          </div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-indigo-50 opacity-50" />
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0 z-10">
            <Wrench className="w-6 h-6" />
          </div>
          <div className="z-10">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Needs Repair</p>
            <h3 className="text-2xl font-black text-slate-900">{itemsNeedingRepair} Items</h3>
          </div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-rose-50 opacity-50" />
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0 z-10">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="z-10">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Low Stock Alerts</p>
            <h3 className="text-2xl font-black text-slate-900">{lowStockItems} Categories</h3>
          </div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-amber-50 opacity-50" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search assets (e.g., Tiffany Chairs)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${selectedCategory === "All" ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              All
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${selectedCategory === cat ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Assets Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Asset</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Category</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Availability</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Condition</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Last Checked</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 font-medium">
                    No assets found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img src={asset.image} alt={asset.name} className="w-10 h-10 rounded-lg object-cover border border-slate-200" />
                        <div>
                          <p className="font-bold text-slate-900">{asset.name}</p>
                          <p className="text-xs font-mono text-slate-500">{asset.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700">
                        {asset.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden w-24">
                          <div 
                            className={`h-full rounded-full ${asset.availableQty / asset.totalQty < 0.2 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                            style={{ width: `${(asset.availableQty / asset.totalQty) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-slate-700">{asset.availableQty} <span className="text-slate-400 font-medium">/ {asset.totalQty}</span></span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${getConditionBadge(asset.condition)}`}>
                        {asset.condition}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-slate-500">
                      {asset.lastMaintained}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenModal(asset)} className="h-8 w-8 text-slate-500 hover:text-primary hover:bg-primary/10 rounded-lg">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(asset.id)} className="h-8 w-8 text-slate-500 hover:text-rose-500 hover:bg-rose-50 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-xl font-black text-slate-900">
                  {editingAsset ? "Edit Asset" : "Add New Asset"}
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)} className="rounded-full hover:bg-slate-200">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Asset Name</label>
                  <input 
                    type="text" value={formData.name || ""}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Banquet Chairs"
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
                    <select 
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value as AssetCategory})}
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium bg-white"
                    >
                      {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Condition</label>
                    <select 
                      value={formData.condition}
                      onChange={e => setFormData({...formData, condition: e.target.value as AssetCondition})}
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium bg-white"
                    >
                      {CONDITIONS.map(cond => <option key={cond} value={cond}>{cond}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Total Quantity</label>
                    <input 
                      type="number" value={formData.totalQty || 0}
                      onChange={e => setFormData({...formData, totalQty: parseInt(e.target.value) || 0})}
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Available Quantity</label>
                    <input 
                      type="number" value={formData.availableQty || 0}
                      onChange={e => setFormData({...formData, availableQty: parseInt(e.target.value) || 0})}
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-xl">Cancel</Button>
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-sm">
                  {editingAsset ? "Save Changes" : "Add Asset"}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
