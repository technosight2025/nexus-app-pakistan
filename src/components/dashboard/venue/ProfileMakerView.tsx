"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Store, Image as ImageIcon, CheckCircle2, AlertCircle, Plus, 
  Trash2, GripVertical, Settings, Eye, PenTool, LayoutTemplate,
  Gift, Building2, Package, Utensils
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { PublicProfilePreview, PublicProfileData } from "./PublicProfilePreview"

const INITIAL_DATA: PublicProfileData = {
  businessName: "Royal Event Complex",
  coverImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
  logo: "https://images.unsplash.com/photo-1563906660144-b04b901b8964?q=80&w=2070&auto=format&fit=crop",
  tagline: "Making your dream events a reality.",
  about: "Welcome to Royal Event Complex, where elegance meets excellence. With over 10 years of experience, we provide top-tier venues, exquisite catering, and dedicated service to make your special day unforgettable.",
  features: {
    showHalls: true,
    showPackages: true,
    showMenus: true,
    showOffers: true
  },
  latestOffer: {
    title: "Winter Wedding Special",
    description: "Book now for Nov-Dec and get complimentary stage decor.",
    discount: "15% OFF"
  },
  packages: [
    {
      id: "1",
      name: "Silver Package",
      price: 250000,
      items: ["Basic Hall Setup", "Standard Lighting", "1 Bridal Room", "Basic DJ System"]
    }
  ],
  menus: [
    {
      id: "1",
      name: "Traditional Menu A",
      pricePerHead: 2500,
      items: ["Chicken Biryani", "Mutton Karahi", "Naan/Roti", "Fresh Salad", "Gajar Ka Halwa", "Cold Drinks"]
    }
  ]
}

export function ProfileMakerView() {
  const [data, setData] = useState<PublicProfileData>(INITIAL_DATA)
  const [activeTab, setActiveTab] = useState<"identity" | "packages" | "menus" | "offers">("identity")
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  const handleFeatureToggle = (feature: keyof PublicProfileData['features']) => {
    setData({
      ...data,
      features: { ...data.features, [feature]: !data.features[feature] }
    })
  }

  // Helper to add empty package
  const addPackage = () => {
    setData({
      ...data,
      packages: [...data.packages, { id: Math.random().toString(), name: "New Package", price: 0, items: ["New Item"] }]
    })
  }

  // Helper to update a package
  const updatePackage = (id: string, key: string, value: any) => {
    setData({
      ...data,
      packages: data.packages.map(p => p.id === id ? { ...p, [key]: value } : p)
    })
  }

  // Helper to add empty menu
  const addMenu = () => {
    setData({
      ...data,
      menus: [...data.menus, { id: Math.random().toString(), name: "New Menu", pricePerHead: 0, items: ["Item 1"] }]
    })
  }

  // Helper to update a menu
  const updateMenu = (id: string, key: string, value: any) => {
    setData({
      ...data,
      menus: data.menus.map(m => m.id === id ? { ...m, [key]: value } : m)
    })
  }

  if (isPreviewMode) {
    return (
      <div className="space-y-6 max-w-[1600px] mx-auto pb-12 w-full">
        {/* Preview Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Eye className="w-6 h-6 text-primary" /> Customer View Preview
            </h1>
            <p className="text-sm font-medium text-slate-500 mt-1">This is exactly what customers will see on your public storefront.</p>
          </div>
          <Button onClick={() => setIsPreviewMode(false)} variant="outline" className="rounded-xl border-slate-200 bg-white shadow-sm">
            <PenTool className="w-4 h-4 mr-2" /> Back to Editor
          </Button>
        </div>
        
        {/* Full Page Preview Container */}
        <div className="w-full h-[800px] rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-50">
          <PublicProfilePreview data={data} />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12 w-full">
      {/* Editor Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Store className="w-6 h-6 text-primary" /> Profile Maker
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Design your storefront exactly how customers see it.</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setIsPreviewMode(true)} variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl bg-white shadow-sm">
            <Eye className="w-4 h-4 mr-2" /> Preview Profile
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-sm">
            Publish Changes
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="space-y-2 p-4 bg-white rounded-3xl border border-slate-200 shadow-sm sticky top-6">
            <button 
              onClick={() => setActiveTab("identity")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === "identity" ? 'bg-white text-primary shadow-sm border border-slate-200' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <LayoutTemplate className="w-4 h-4" /> Identity & Hero
            </button>
            <button 
              onClick={() => setActiveTab("offers")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === "offers" ? 'bg-white text-primary shadow-sm border border-slate-200' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <Gift className="w-4 h-4" /> Latest Offers
            </button>
            <button 
              onClick={() => setActiveTab("packages")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === "packages" ? 'bg-white text-primary shadow-sm border border-slate-200' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <Package className="w-4 h-4" /> Packages
            </button>
            <button 
              onClick={() => setActiveTab("menus")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === "menus" ? 'bg-white text-primary shadow-sm border border-slate-200' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <Utensils className="w-4 h-4" /> Menus
            </button>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Visibility</h3>
              <div className="space-y-3 px-2">
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">Halls</span>
                  <button onClick={() => handleFeatureToggle('showHalls')} className={`w-8 h-4 rounded-full transition-colors ${data.features.showHalls ? 'bg-primary' : 'bg-slate-300'} relative`}>
                    <span className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${data.features.showHalls ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                </label>
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">Packages</span>
                  <button onClick={() => handleFeatureToggle('showPackages')} className={`w-8 h-4 rounded-full transition-colors ${data.features.showPackages ? 'bg-primary' : 'bg-slate-300'} relative`}>
                    <span className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${data.features.showPackages ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                </label>
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">Menus</span>
                  <button onClick={() => handleFeatureToggle('showMenus')} className={`w-8 h-4 rounded-full transition-colors ${data.features.showMenus ? 'bg-primary' : 'bg-slate-300'} relative`}>
                    <span className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${data.features.showMenus ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                </label>
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">Offers</span>
                  <button onClick={() => handleFeatureToggle('showOffers')} className={`w-8 h-4 rounded-full transition-colors ${data.features.showOffers ? 'bg-primary' : 'bg-slate-300'} relative`}>
                    <span className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${data.features.showOffers ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 w-full">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
            {activeTab === "identity" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900">Business Name</label>
                  <input 
                    type="text" value={data.businessName}
                    onChange={e => setData({...data, businessName: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900">Tagline</label>
                  <input 
                    type="text" value={data.tagline}
                    onChange={e => setData({...data, tagline: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900">Cover Image URL</label>
                  <input 
                    type="text" value={data.coverImage}
                    onChange={e => setData({...data, coverImage: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900">Logo Image URL</label>
                  <input 
                    type="text" value={data.logo}
                    onChange={e => setData({...data, logo: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900">About Us</label>
                  <textarea 
                    value={data.about}
                    onChange={e => setData({...data, about: e.target.value})}
                    className="w-full h-32 p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm resize-none"
                  />
                </div>
              </div>
            )}

            {activeTab === "offers" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5 mb-6 flex items-start gap-3">
                  <Gift className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-rose-900">Promotional Offer</h3>
                    <p className="text-sm text-rose-700/80 mt-1">This banner will appear prominently at the top of your public profile.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">Offer Title</label>
                    <input 
                      type="text" value={data.latestOffer.title}
                      onChange={e => setData({...data, latestOffer: { ...data.latestOffer, title: e.target.value }})}
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">Discount/Badge Text</label>
                    <input 
                      type="text" value={data.latestOffer.discount}
                      onChange={e => setData({...data, latestOffer: { ...data.latestOffer, discount: e.target.value }})}
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-sm font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">Description</label>
                    <textarea 
                      value={data.latestOffer.description}
                      onChange={e => setData({...data, latestOffer: { ...data.latestOffer, description: e.target.value }})}
                      className="w-full h-24 p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-sm resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "packages" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-slate-900">Wedding Packages</h2>
                  <Button size="sm" onClick={addPackage} className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg">
                    <Plus className="w-4 h-4 mr-2" /> Add Package
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {data.packages.map((pkg, idx) => (
                    <div key={pkg.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 relative group">
                      <button 
                        onClick={() => setData({ ...data, packages: data.packages.filter(p => p.id !== pkg.id) })}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-slate-200 text-rose-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-rose-50"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase">Package Name</label>
                          <input 
                            type="text" value={pkg.name}
                            onChange={e => updatePackage(pkg.id, 'name', e.target.value)}
                            className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase">Price (PKR)</label>
                          <input 
                            type="number" value={pkg.price}
                            onChange={e => updatePackage(pkg.id, 'price', parseInt(e.target.value) || 0)}
                            className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase">Included Items (comma separated)</label>
                        <textarea 
                          value={pkg.items.join(", ")}
                          onChange={e => updatePackage(pkg.id, 'items', e.target.value.split(",").map(i => i.trim()).filter(Boolean))}
                          className="w-full h-20 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm resize-none"
                        />
                      </div>
                    </div>
                  ))}
                  {data.packages.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
                      <Package className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500 font-medium">No packages added yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "menus" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-slate-900">Catering Menus</h2>
                  <Button size="sm" onClick={addMenu} className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg">
                    <Plus className="w-4 h-4 mr-2" /> Add Menu
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {data.menus.map((menu, idx) => (
                    <div key={menu.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 relative group">
                      <button 
                        onClick={() => setData({ ...data, menus: data.menus.filter(m => m.id !== menu.id) })}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-slate-200 text-rose-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-rose-50"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase">Menu Name</label>
                          <input 
                            type="text" value={menu.name}
                            onChange={e => updateMenu(menu.id, 'name', e.target.value)}
                            className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase">Price per Head (PKR)</label>
                          <input 
                            type="number" value={menu.pricePerHead}
                            onChange={e => updateMenu(menu.id, 'pricePerHead', parseInt(e.target.value) || 0)}
                            className="w-full h-9 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase">Dishes (comma separated)</label>
                        <textarea 
                          value={menu.items.join(", ")}
                          onChange={e => updateMenu(menu.id, 'items', e.target.value.split(",").map(i => i.trim()).filter(Boolean))}
                          className="w-full h-20 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm resize-none"
                        />
                      </div>
                    </div>
                  ))}
                  {data.menus.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
                      <Utensils className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500 font-medium">No menus added yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
