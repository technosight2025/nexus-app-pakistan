"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Palette, ExternalLink } from "lucide-react"

export default function AdminThemesPage() {
  const [themes, setThemes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/themes")
      .then(res => res.json())
      .then(data => {
        if (data.themes) setThemes(data.themes)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Theme Marketplace</h1>
          <p className="text-slate-500 font-medium">Manage and create new website templates for vendors.</p>
        </div>
        <Link href="/admin/themes/create" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
          <Plus className="w-5 h-5" /> Create New Theme
        </Link>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400 font-bold animate-pulse">Loading themes...</div>
      ) : themes.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm">
          <Palette className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-black text-slate-900 mb-2">No Themes Found</h3>
          <p className="text-slate-500 mb-6 max-w-md mx-auto">You haven't created any themes yet. Create your first theme to publish it to the Vendor Marketplace.</p>
          <Link href="/admin/themes/create" className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-colors">
            <Plus className="w-5 h-5" /> Create Theme
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {themes.map(theme => (
            <div key={theme.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="h-40 bg-slate-100 relative">
                {theme.preview_image ? (
                  <img src={theme.preview_image} alt={theme.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-300"><Palette className="w-8 h-8" /></div>
                )}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                  {theme.type}
                </div>
              </div>
              <div className="p-5 flex-1">
                <h3 className="text-lg font-black text-slate-900">{theme.name}</h3>
                <p className="text-slate-500 text-sm mt-1 mb-4 line-clamp-2">{theme.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-emerald-600 text-sm">{theme.price}</span>
                  <Link href={`/admin/themes/edit/${theme.id}`} className="text-indigo-600 hover:text-indigo-700 font-bold text-sm flex items-center gap-1">
                    Edit <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
