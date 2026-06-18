"use client"
import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search, Star, X, Upload, ImagePlus, Trash2, CheckCircle2, RefreshCw, AlertTriangle } from "lucide-react"
import Link from "next/link"

type Outfit = {
  id: string
  name: string
  tag: string
  status: string
  price: string
  rentals: number
  rating: number
  image_url: string
  sizes: string[]
  material: string
  due_back: string | null
  description?: string
  features?: string[]
}

const STATUS_COLOR: Record<string, string> = {
  "Available": "bg-emerald-100 text-emerald-700",
  "Rented":    "bg-rose-100 text-rose-700",
  "Reserved":  "bg-amber-100 text-amber-700",
}

const SIZE_OPTIONS    = ["XS", "S", "M", "L", "XL", "XXL", "Custom Fit"]
const TAG_OPTIONS     = ["Bridal", "Groom Wear", "Party Wear", "Mehndi", "Valima", "Formal"]
const FEATURE_OPTS    = ["Heavy Embroidery", "Includes Dupatta", "Crystals", "Zari Work", "Kundan", "Double Dupatta", "Trail", "Stone Work", "Thread Work", "Tilla"]

export default function WardrobePage() {
  const [outfits, setOutfits]       = useState<Outfit[]>([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState<string | null>(null)
  const [search, setSearch]         = useState("")
  const [filter, setFilter]         = useState("All")
  const [showForm, setShowForm]     = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [saved, setSaved]           = useState(false)
  const [editingId, setEditingId]   = useState<string | null>(null)

  // Form fields
  const [name, setName]               = useState("")
  const [tag, setTag]                 = useState("Bridal")
  const [price, setPrice]             = useState("")
  const [material, setMaterial]       = useState("")
  const [description, setDescription] = useState("")
  const [selectedSizes, setSelectedSizes]       = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [customFeature, setCustomFeature]       = useState("")
  const [imagePreview, setImagePreview]         = useState<string | null>(null)
  const [formErrors, setFormErrors]             = useState<Record<string, string>>({})
  const fileRef = useRef<HTMLInputElement>(null)

  // ── Fetch outfits from Supabase API ──
  const fetchOutfits = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/rentals/outfits")
      if (!res.ok) throw new Error(`Failed to load: ${res.statusText}`)
      const data = await res.json()
      setOutfits(Array.isArray(data) ? data : [])
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchOutfits() }, [fetchOutfits])

  const tags = ["All", ...Array.from(new Set(outfits.map(o => o.tag)))]
  const filtered = outfits.filter(o =>
    (filter === "All" || o.tag === filter) &&
    o.name.toLowerCase().includes(search.toLowerCase())
  )

  // ── Image upload ──
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImagePreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const toggleSize    = (s: string) => setSelectedSizes(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s])
  const toggleFeature = (f: string) => setSelectedFeatures(p => p.includes(f) ? p.filter(x => x !== f) : [...p, f])
  const addCustom     = () => {
    if (customFeature.trim() && !selectedFeatures.includes(customFeature.trim())) {
      setSelectedFeatures(p => [...p, customFeature.trim()])
      setCustomFeature("")
    }
  }

  // ── Validate ──
  const validate = () => {
    const e: Record<string, string> = {}
    if (!name.trim())     e.name     = "Outfit name is required"
    if (!price.trim())    e.price    = "Rental price is required"
    if (!material.trim()) e.material = "Material is required"
    if (selectedSizes.length === 0) e.sizes = "Select at least one size"
    setFormErrors(e)
    return Object.keys(e).length === 0
  }

  // ── Submit → POST or PUT to Supabase API ──
  const handleSubmit = async () => {
    if (!validate()) return
    setSubmitting(true)
    try {
      const method = editingId ? "PUT" : "POST"
      const payload = {
        ...(editingId && { id: editingId }),
        name:        name.trim(),
        tag,
        price:       price.replace(/,/g, ""),
        material:    material.trim(),
        description: description.trim(),
        sizes:       selectedSizes,
        features:    selectedFeatures,
        image_url:   imagePreview || "",
      }

      const res = await fetch("/api/rentals/outfits", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || `Failed to ${editingId ? "update" : "save"} outfit`)
      }
      const updatedOutfit = await res.json()
      
      if (editingId) {
        setOutfits(p => p.map(o => o.id === editingId ? updatedOutfit : o))
      } else {
        setOutfits(p => [updatedOutfit, ...p])
      }
      
      setSaved(true)
      setTimeout(() => {
        setSaved(false)
        setShowForm(false)
        resetForm()
      }, 1200)
    } catch (e: any) {
      alert(`Error ${editingId ? "updating" : "saving"} outfit: ` + e.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (outfit: Outfit) => {
    setEditingId(outfit.id)
    setName(outfit.name)
    setTag(outfit.tag)
    setPrice(outfit.price)
    setMaterial(outfit.material)
    setDescription(outfit.description || "")
    setSelectedSizes(outfit.sizes || [])
    setSelectedFeatures(outfit.features || [])
    setImagePreview(outfit.image_url || null)
    setFormErrors({})
    setShowForm(true)
  }

  const resetForm = () => {
    setEditingId(null)
    setName(""); setTag("Bridal"); setPrice(""); setMaterial("")
    setDescription(""); setSelectedSizes([]); setSelectedFeatures([])
    setImagePreview(null); setFormErrors({})
  }

  const closeForm = () => { setShowForm(false); resetForm(); setSaved(false) }

  // ── Delete ──
  const handleDelete = async (id: string) => {
    if (!confirm("Remove this outfit from your wardrobe?")) return
    setOutfits(p => p.filter(o => o.id !== id))
    await fetch("/api/rentals/outfits", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
  }

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-[#0A3B2A]">Wardrobe</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {loading ? "Loading..." : `${outfits.length} outfits in your collection`}
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button onClick={fetchOutfits} title="Refresh" className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition-colors">
            <RefreshCw className={`w-4 h-4 text-slate-500 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0A3B2A] text-white rounded-xl font-bold text-sm hover:bg-[#0A3B2A]/90 transition-colors shadow-md shadow-[#0A3B2A]/20">
            <Plus className="w-4 h-4" /> Add New Outfit
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-center gap-3 text-sm text-rose-600 font-medium">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
          <button onClick={fetchOutfits} className="ml-auto text-xs font-black underline">Retry</button>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search outfits..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20" />
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map(t => (
            <button key={t} onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${filter === t ? "bg-[#0A3B2A] text-white border-[#0A3B2A]" : "bg-white text-slate-600 border-slate-200 hover:border-[#0A3B2A]/40"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Outfits",     value: outfits.length,                               color: "text-slate-900" },
          { label: "Available Now",     value: outfits.filter(o => o.status==="Available").length, color: "text-emerald-600" },
          { label: "Currently Rented",  value: outfits.filter(o => o.status==="Rented").length,   color: "text-rose-600" },
          { label: "Reserved",          value: outfits.filter(o => o.status==="Reserved").length,  color: "text-amber-600" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm text-center">
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Skeleton / Empty State */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse">
              <div className="aspect-[3/4] bg-slate-100" />
              <div className="p-4 space-y-2">
                <div className="h-3 bg-slate-100 rounded w-2/3" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-slate-400 font-medium text-sm">No outfits found. Add your first outfit!</p>
        </div>
      )}

      {/* Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
                    <ImagePlus className="w-12 h-12 text-slate-200" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className={`absolute top-3 right-3 text-[9px] font-black px-2.5 py-1 rounded-full ${STATUS_COLOR[item.status] || "bg-slate-100 text-slate-500"}`}>{item.status}</span>
                {item.due_back && (
                  <span className="absolute top-3 left-3 text-[9px] font-bold px-2 py-0.5 bg-white/90 text-rose-600 rounded-lg">Due: {item.due_back}</span>
                )}
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-black text-sm leading-tight">{item.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-3 h-3 text-amber-400 fill-current" />
                    <span className="text-white/80 text-[10px] font-bold">{item.rating > 0 ? `${item.rating} • ` : ""}{item.rentals} rentals</span>
                  </div>
                </div>
                {/* Delete overlay */}
                <button onClick={() => handleDelete(item.id)}
                  className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 rounded-lg bg-white/90 flex items-center justify-center text-rose-500 hover:bg-rose-50">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{item.tag}</span>
                    <p className="text-sm font-black text-[#0A3B2A] mt-0.5">Rs. {item.price}/rental</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-medium">{item.sizes?.join(", ")}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{item.material}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/ai-tryon-studio?id=${item.id}`}
                    className="flex-1 py-2 text-center text-[10px] font-black uppercase bg-[#D4AF37]/10 text-[#A07830] rounded-lg hover:bg-[#D4AF37]/20 transition-colors">
                    Try-On
                  </Link>
                  <button onClick={() => handleEdit(item)} className="flex-1 py-2 text-center text-[10px] font-black uppercase bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ══ ADD OUTFIT DRAWER ══ */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={closeForm}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white z-50 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-black text-[#0A3B2A]">{editingId ? "Edit Outfit" : "Add New Outfit"}</h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Saved to your Supabase wardrobe</p>
                </div>
                <button onClick={closeForm} className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                  <X className="w-4 h-4 text-slate-600" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {/* Image Upload */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-2">Outfit Photo</label>
                  <input type="file" accept="image/*" className="hidden" ref={fileRef} onChange={handleImage} />
                  {imagePreview ? (
                    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 group">
                      <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button onClick={() => setImagePreview(null)} className="flex items-center gap-1.5 px-4 py-2 bg-white text-slate-800 rounded-xl font-bold text-xs">
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => fileRef.current?.click()}
                      className="w-full border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center gap-3 hover:bg-slate-50 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-[#0A3B2A]/10 flex items-center justify-center">
                        <ImagePlus className="w-6 h-6 text-[#0A3B2A]" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-slate-700">Click to upload photo</p>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">PNG, JPG up to 10MB</p>
                      </div>
                    </button>
                  )}
                </div>

                {/* Name */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1.5">Outfit Name *</label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Ruby Red Bridal Lehnga"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 ${formErrors.name ? "border-rose-300 bg-rose-50" : "border-slate-200"}`} />
                  {formErrors.name && <p className="text-xs text-rose-500 font-bold mt-1">{formErrors.name}</p>}
                </div>

                {/* Category */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1.5">Category *</label>
                  <div className="flex flex-wrap gap-2">
                    {TAG_OPTIONS.map(t => (
                      <button key={t} onClick={() => setTag(t)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${tag === t ? "bg-[#0A3B2A] text-white border-[#0A3B2A]" : "bg-white text-slate-600 border-slate-200 hover:border-[#0A3B2A]/40"}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price & Material */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1.5">Rental Price (Rs) *</label>
                    <input value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g. 65000"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 ${formErrors.price ? "border-rose-300 bg-rose-50" : "border-slate-200"}`} />
                    {formErrors.price && <p className="text-xs text-rose-500 font-bold mt-1">{formErrors.price}</p>}
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1.5">Material *</label>
                    <input value={material} onChange={e => setMaterial(e.target.value)} placeholder="e.g. Raw Silk"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 ${formErrors.material ? "border-rose-300 bg-rose-50" : "border-slate-200"}`} />
                    {formErrors.material && <p className="text-xs text-rose-500 font-bold mt-1">{formErrors.material}</p>}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1.5">Available Sizes *</label>
                  <div className="flex flex-wrap gap-2">
                    {SIZE_OPTIONS.map(s => (
                      <button key={s} onClick={() => toggleSize(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${selectedSizes.includes(s) ? "bg-[#0A3B2A] text-white border-[#0A3B2A]" : "bg-white text-slate-600 border-slate-200 hover:border-[#0A3B2A]/40"}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                  {formErrors.sizes && <p className="text-xs text-rose-500 font-bold mt-1.5">{formErrors.sizes}</p>}
                </div>

                {/* Features */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1.5">Key Features</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {FEATURE_OPTS.map(f => (
                      <button key={f} onClick={() => toggleFeature(f)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${selectedFeatures.includes(f) ? "bg-[#D4AF37]/20 text-[#8B6914] border-[#D4AF37]/40" : "bg-white text-slate-600 border-slate-200 hover:border-[#D4AF37]/40"}`}>
                        {f}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input value={customFeature} onChange={e => setCustomFeature(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && addCustom()}
                      placeholder="Add custom feature..."
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20" />
                    <button onClick={addCustom} className="px-3 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition-colors">Add</button>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1.5">Description</label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)}
                    placeholder="Describe the outfit style, occasion, embroidery details..."
                    rows={3} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 resize-none" />
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-slate-100">
                {Object.keys(formErrors).length > 0 && (
                  <div className="mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl">
                    <p className="text-xs font-black text-rose-600 mb-1">Please fix the following:</p>
                    <ul className="space-y-0.5">
                      {Object.values(formErrors).map((err, i) => (
                        <li key={i} className="text-xs font-medium text-rose-500 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />{err}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="p-6 flex gap-3">
                  <button onClick={closeForm} className="flex-1 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleSubmit} disabled={submitting}
                    className={`flex-1 py-3 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 disabled:opacity-60 ${
                      saved ? "bg-emerald-600 text-white" : "bg-[#0A3B2A] text-white hover:bg-[#0A3B2A]/90 shadow-lg shadow-[#0A3B2A]/20"
                    }`}
                  >
                    {saved ? (
                      <><CheckCircle2 className="w-4 h-4" /> {editingId ? "Outfit Updated!" : "Outfit Saved!"}</>
                    ) : submitting ? (
                      <><RefreshCw className="w-4 h-4 animate-spin" /> Saving...</>
                    ) : (
                      <><Upload className="w-4 h-4" /> {editingId ? "Update Outfit" : "Save Outfit"}</>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
