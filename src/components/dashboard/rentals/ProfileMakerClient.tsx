"use client"

import React, { useState } from "react"
import { Store, Image as ImageIcon, Star, Sparkles, MapPin, Loader2 } from "lucide-react"

export default function ProfileMakerClient({ initialVendor, vendorId }: { initialVendor: any, vendorId: string }) {
  const [vendor, setVendor] = useState(initialVendor)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<string | null>(null)
  
  // Local states for editing
  const [businessName, setBusinessName] = useState(vendor.business_name || "")
  const [city, setCity] = useState(vendor.city || "")
  const [location, setLocation] = useState(vendor.location || "")
  const [about, setAbout] = useState(vendor.about || "")
  const [startingPrice, setStartingPrice] = useState(vendor.starting_price || 0)
  
  const [images, setImages] = useState<string[]>(vendor.images || [])
  const [newImageUrl, setNewImageUrl] = useState("")

  const [packages, setPackages] = useState<any[]>(vendor.packages || [])
  const [newPkgName, setNewPkgName] = useState("")
  const [newPkgPrice, setNewPkgPrice] = useState("")
  const [newPkgDesc, setNewPkgDesc] = useState("")

  let score = 10; // Base score
  if (vendor.business_name) score += 15;
  if (vendor.city && vendor.location) score += 15;
  if (vendor.about) score += 15;
  if (vendor.images?.length >= 4) score += 20;
  if (vendor.packages?.length > 0) score += 15;
  if (vendor.phone || vendor.email) score += 10;

  const handleSaveInfo = async () => {
    setIsSaving(true)
    try {
      const res = await fetch("/api/vendors/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ business_name: businessName, city, location, about, starting_price: Number(startingPrice) })
      })
      const data = await res.json()
      if (data.success) {
        setVendor(data.vendor)
        setActiveTab(null)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddImage = async () => {
    if (!newImageUrl) return;
    const updatedImages = [...images, newImageUrl]
    setImages(updatedImages)
    setNewImageUrl("")
    
    setIsSaving(true)
    try {
      const res = await fetch("/api/vendors/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images: updatedImages })
      })
      const data = await res.json()
      if (data.success) setVendor(data.vendor)
    } finally {
      setIsSaving(false)
    }
  }

  const handleRemoveImage = async (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index)
    setImages(updatedImages)
    setIsSaving(true)
    try {
      const res = await fetch("/api/vendors/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images: updatedImages })
      })
      const data = await res.json()
      if (data.success) setVendor(data.vendor)
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddPackage = async () => {
    if (!newPkgName || !newPkgPrice) return;
    const updatedPackages = [...packages, { name: newPkgName, price: Number(newPkgPrice), desc: newPkgDesc }]
    setPackages(updatedPackages)
    setNewPkgName("")
    setNewPkgPrice("")
    setNewPkgDesc("")
    
    setIsSaving(true)
    try {
      const res = await fetch("/api/vendors/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packages: updatedPackages })
      })
      const data = await res.json()
      if (data.success) setVendor(data.vendor)
    } finally {
      setIsSaving(false)
    }
  }

  const handleRemovePackage = async (index: number) => {
    const updatedPackages = packages.filter((_, i) => i !== index)
    setPackages(updatedPackages)
    setIsSaving(true)
    try {
      const res = await fetch("/api/vendors/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packages: updatedPackages })
      })
      const data = await res.json()
      if (data.success) setVendor(data.vendor)
    } finally {
      setIsSaving(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsSaving(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const uploadRes = await fetch("/api/vendors/upload", {
        method: "POST",
        body: formData
      })
      const uploadData = await uploadRes.json()
      
      if (uploadData.success) {
        const updatedImages = [...images, uploadData.url]
        setImages(updatedImages)
        
        // Save to vendor profile immediately
        const res = await fetch("/api/vendors/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ images: updatedImages })
        })
        const data = await res.json()
        if (data.success) setVendor(data.vendor)
      } else {
        alert("Upload failed: " + uploadData.error)
      }
    } catch (err) {
      alert("An error occurred during upload.")
    } finally {
      setIsSaving(false)
      // Reset input
      e.target.value = ""
    }
  }

  return (
    <div className="space-y-6">
      {/* Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { id: "info", icon: Store, title: "Business Info", desc: "Update boutique name, description, contact, and location.", action: "Edit Info" },
          { id: "photos", icon: ImageIcon, title: "Portfolio Gallery", desc: "Add/remove outfit photos to showcase your collection.", action: "Manage Photos" },
          { id: "pricing", icon: Star, title: "Pricing & Packages", desc: "Set rental prices, packages, and alteration fees.", action: "Edit Pricing" },
          { id: "ai", icon: Sparkles, title: "AI Try-On Integration", desc: "Connect your dresses to the AI Try-On Studio for virtual try-ons.", action: "Coming Soon" },
        ].map((item, i) => (
          <div key={i} onClick={() => item.id !== 'ai' && setActiveTab(item.id)} className={`bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 transition-shadow ${item.id !== 'ai' ? 'cursor-pointer hover:shadow-md hover:border-[#0A3B2A]/30' : 'opacity-70'}`}>
            <div className="w-10 h-10 rounded-xl bg-[#0A3B2A]/10 flex items-center justify-center shrink-0">
              <item.icon className="w-5 h-5 text-[#0A3B2A]" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-black text-slate-900 mb-1">{item.title}</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed mb-3">{item.desc}</p>
              <button className="text-xs font-bold text-[#0A3B2A] hover:underline flex items-center gap-1">
                {item.action} {item.id !== 'ai' && "→"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Profile Completion */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-black text-[#0A3B2A]">Profile Completion</h3>
          <span className="text-lg font-black text-emerald-600">{score}%</span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-gradient-to-r from-[#C5A880] to-[#0A3B2A] rounded-full transition-all duration-500" style={{ width: `${score}%` }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { label: "Business Name & Category", done: !!vendor.business_name },
            { label: "Location & City Setup", done: !!vendor.city && !!vendor.location },
            { label: "About Section", done: !!vendor.about },
            { label: "Portfolio Photos (Min 4)", done: (vendor.images?.length || 0) >= 4 },
            { label: "Pricing & Packages", done: (vendor.packages?.length || 0) > 0 },
            { label: "Contact Information Verified", done: !!vendor.phone || !!vendor.email },
          ].map((item, i) => (
             <div key={i} className="flex items-center gap-2 text-xs font-medium">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${item.done ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-300"}`}>
                {item.done ? "✓" : "○"}
              </div>
              <span className={item.done ? "text-slate-600" : "text-slate-400"}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Forms Area */}
      {activeTab === "info" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 animate-in slide-in-from-bottom-4 duration-300">
          <h3 className="text-lg font-black text-[#0A3B2A] mb-4">Edit Business Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Business Name</label>
              <input value={businessName} onChange={e => setBusinessName(e.target.value)} className="w-full border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:border-[#0A3B2A] outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">City</label>
              <input value={city} onChange={e => setCity(e.target.value)} placeholder="e.g. Lahore" className="w-full border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:border-[#0A3B2A] outline-none transition-colors" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Full Location / Address</label>
              <input value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. MM Alam Road, Gulberg III" className="w-full border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:border-[#0A3B2A] outline-none transition-colors" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">About / Description</label>
              <textarea value={about} onChange={e => setAbout(e.target.value)} rows={3} placeholder="Tell customers about your boutique..." className="w-full border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:border-[#0A3B2A] outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Starting Price (Rs.)</label>
              <input type="number" value={startingPrice} onChange={e => setStartingPrice(e.target.value)} placeholder="15000" className="w-full border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:border-[#0A3B2A] outline-none transition-colors" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setActiveTab(null)} className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50">Cancel</button>
            <button onClick={handleSaveInfo} disabled={isSaving} className="px-5 py-2.5 rounded-xl font-bold text-sm bg-[#0A3B2A] text-white flex items-center gap-2 hover:bg-[#0A3B2A]/90 transition-colors">
              {isSaving && <Loader2 className="w-4 h-4 animate-spin" />} Save Changes
            </button>
          </div>
        </div>
      )}

      {activeTab === "photos" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 animate-in slide-in-from-bottom-4 duration-300">
          <h3 className="text-lg font-black text-[#0A3B2A] mb-4">Portfolio Gallery</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {images.map((img, idx) => (
              <div key={idx} className="aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden relative group">
                <img src={img} alt="Portfolio" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button onClick={() => handleRemoveImage(idx)} className="bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-rose-600 transition-colors">Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <label className={`cursor-pointer px-5 py-3 rounded-xl font-bold text-sm bg-[#0A3B2A] text-white flex items-center justify-center w-full sm:w-auto gap-2 hover:bg-[#0A3B2A]/90 transition-colors ${isSaving ? 'opacity-50 pointer-events-none' : ''}`}>
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
              {isSaving ? "Uploading..." : "Upload from PC"}
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-3">Upload high quality images from your computer.</p>
        </div>
      )}

      {activeTab === "pricing" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 animate-in slide-in-from-bottom-4 duration-300">
          <h3 className="text-lg font-black text-[#0A3B2A] mb-4">Pricing Packages</h3>
          
          <div className="space-y-3 mb-6">
            {packages.length === 0 ? (
              <p className="text-sm text-slate-500 font-medium">No packages added yet.</p>
            ) : packages.map((pkg, idx) => (
              <div key={idx} className="p-4 border border-slate-100 rounded-xl bg-slate-50 flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-black text-slate-900">{pkg.name} <span className="text-emerald-600 ml-2">Rs. {pkg.price}</span></h4>
                  <p className="text-xs text-slate-500 font-medium mt-1">{pkg.desc}</p>
                </div>
                <button onClick={() => handleRemovePackage(idx)} className="text-xs font-bold text-rose-500 hover:text-rose-600">Remove</button>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Package Name</label>
              <input value={newPkgName} onChange={e => setNewPkgName(e.target.value)} placeholder="e.g. Bridal Signature" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-semibold outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Price (Rs.)</label>
              <input type="number" value={newPkgPrice} onChange={e => setNewPkgPrice(e.target.value)} placeholder="65000" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-semibold outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Description</label>
              <input value={newPkgDesc} onChange={e => setNewPkgDesc(e.target.value)} placeholder="What's included?" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-semibold outline-none" />
            </div>
            <div className="md:col-span-2 flex justify-end mt-2">
              <button onClick={handleAddPackage} disabled={isSaving || !newPkgName || !newPkgPrice} className="px-4 py-2 rounded-lg font-bold text-sm bg-black text-white flex items-center gap-2 hover:bg-black/80 transition-colors disabled:opacity-50">
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Package"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
