"use client"

import { motion } from "framer-motion"
import { MapPin, Star, ShieldCheck, CheckCircle2, Clock, Users, Building2, Utensils, Gift } from "lucide-react"

export interface PublicProfileData {
  businessName: string
  coverImage: string
  logo: string
  tagline: string
  about: string
  features: {
    showHalls: boolean
    showPackages: boolean
    showMenus: boolean
    showOffers: boolean
  }
  latestOffer: {
    title: string
    description: string
    discount: string
  }
  packages: Array<{
    id: string
    name: string
    price: number
    items: string[]
  }>
  menus: Array<{
    id: string
    name: string
    pricePerHead: number
    items: string[]
  }>
}

export function PublicProfilePreview({ data }: { data: PublicProfileData }) {
  // Mock visible halls for preview
  const previewHalls = [
    { name: "Grand Royal Hall", capacity: 800, type: "Indoor", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop" },
    { name: "Emerald Lawn", capacity: 1200, type: "Outdoor", img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop" }
  ]

  return (
    <div className="bg-slate-50 w-full h-full overflow-hidden relative flex flex-col">
      {/* Browser Mockup Header */}
      <div className="bg-slate-900 h-10 w-full flex items-center px-4 gap-2 shrink-0">
        <div className="w-3 h-3 rounded-full bg-rose-500" />
        <div className="w-3 h-3 rounded-full bg-amber-500" />
        <div className="w-3 h-3 rounded-full bg-emerald-500" />
        <div className="mx-auto bg-slate-800 text-slate-400 text-[10px] px-24 py-1 rounded-md font-mono">
          nexus.pk/venue/{data.businessName.toLowerCase().replace(/\s+/g, '-')}
        </div>
      </div>

      {/* Page Content (Scrollable) */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
        {/* Cover & Hero */}
        <div className="relative h-64 bg-slate-200">
          <img src={data.coverImage} alt="Cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 flex items-end gap-4">
            <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-xl shrink-0">
              <img src={data.logo} alt="Logo" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="text-white pb-2">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black">{data.businessName}</h1>
                <ShieldCheck className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-slate-200 text-sm font-medium">{data.tagline}</p>
              <div className="flex items-center gap-4 mt-2 text-xs font-medium text-slate-300">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Lahore, Pakistan</span>
                <span className="flex items-center gap-1 text-amber-400"><Star className="w-3 h-3 fill-amber-400" /> 4.9 (120 Reviews)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Latest Offer Banner */}
          {data.features.showOffers && data.latestOffer.title && (
            <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-5 text-white shadow-lg shadow-rose-500/20 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Gift className="w-5 h-5" /> {data.latestOffer.title}
                  </h3>
                  <p className="text-rose-100 text-sm mt-1">{data.latestOffer.description}</p>
                </div>
                <div className="bg-white text-rose-600 font-black px-4 py-2 rounded-xl text-lg shadow-sm">
                  {data.latestOffer.discount}
                </div>
              </div>
            </div>
          )}

          {/* About Section */}
          <div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">About Us</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{data.about}</p>
          </div>

          {/* Halls Section */}
          {data.features.showHalls && (
            <div>
              <h3 className="font-bold text-lg text-slate-900 mb-3 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" /> Available Spaces
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {previewHalls.map((hall, i) => (
                  <div key={i} className="min-w-[200px] bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm shrink-0">
                    <div className="h-28 bg-slate-100 relative">
                      <img src={hall.img} alt={hall.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3">
                      <h4 className="font-bold text-sm text-slate-900 truncate">{hall.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">{hall.type} • Up to {hall.capacity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Packages Section */}
          {data.features.showPackages && data.packages.length > 0 && (
            <div>
              <h3 className="font-bold text-lg text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" /> Wedding Packages
              </h3>
              <div className="space-y-3">
                {data.packages.map(pkg => (
                  <div key={pkg.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-slate-900">{pkg.name}</h4>
                      <span className="font-black text-primary text-sm">PKR {(pkg.price / 1000).toFixed(0)}k</span>
                    </div>
                    <ul className="space-y-1.5">
                      {pkg.items.map((item, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Menus Section */}
          {data.features.showMenus && data.menus.length > 0 && (
            <div>
              <h3 className="font-bold text-lg text-slate-900 mb-3 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-primary" /> Catering Menus
              </h3>
              <div className="space-y-3">
                {data.menus.map(menu => (
                  <div key={menu.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-slate-900">{menu.name}</h4>
                      <span className="font-black text-slate-900 text-sm">PKR {menu.pricePerHead} <span className="text-xs text-slate-500 font-medium">/head</span></span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {menu.items.join(" • ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
