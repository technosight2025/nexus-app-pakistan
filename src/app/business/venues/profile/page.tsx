"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Store, MapPin, DollarSign, Users, Image as ImageIcon, CheckCircle, Save, Globe, Eye } from 'lucide-react'

export default function ProfileBuilderPage() {
  const router = useRouter()
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "halls",
    categoryName: "Banquet Hall",
    location: "",
    price: "",
    unit: "event",
    maxGuests: "",
    description: "",
    image1: "",
    image2: "",
    image3: ""
  })

  const [isPublishing, setIsPublishing] = useState(false)
  const [publishSuccess, setPublishSuccess] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    try {
      const draft = localStorage.getItem("nexus_profile_draft")
      if (draft) {
        setFormData(JSON.parse(draft))
      }
    } catch(e) {}
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      localStorage.setItem("nexus_profile_draft", JSON.stringify(formData))
      setIsSaving(false)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 2000)
    }, 500)
  }

  const handlePreview = () => {
    const previewListing = {
      id: "preview",
      title: formData.title || "Untitled Venue",
      category: formData.category,
      categoryName: formData.categoryName || "Venue",
      location: formData.location || "Pakistan",
      distance: "Just Added",
      dates: "Available Now",
      rating: 5.0, 
      reviews: 0,
      price: Number(formData.price) || 0,
      unit: formData.unit,
      maxGuests: Number(formData.maxGuests) || 100,
      description: formData.description || "A beautiful venue for your next event.",
      images: [
        formData.image1 || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop",
        formData.image2 || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
        formData.image3 || "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop"
      ]
    }
    localStorage.setItem("nexus_preview_listing", JSON.stringify(previewListing))
    window.open("/venues/preview", "_blank")
  }

  const handlePublish = () => {
    setIsPublishing(true)

    // Simulate network latency
    setTimeout(() => {
      const customId = `custom-${Math.random().toString(36).substr(2, 9)}`
      
      const newListing = {
        id: customId,
        title: formData.title || "Untitled Venue",
        category: formData.category,
        categoryName: formData.categoryName || "Venue",
        location: formData.location || "Pakistan",
        distance: "Just Added",
        dates: "Available Now",
        rating: 5.0, // Default for new venues
        reviews: 0,
        price: Number(formData.price) || 0,
        unit: formData.unit,
        maxGuests: Number(formData.maxGuests) || 100,
        description: formData.description || "A beautiful venue for your next event.",
        images: [
          formData.image1 || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop",
          formData.image2 || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
          formData.image3 || "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop"
        ]
      }

      // Save to localStorage
      const existingRaw = localStorage.getItem("nexus_custom_listings")
      let customListings = []
      if (existingRaw) {
        try { customListings = JSON.parse(existingRaw) } catch (e) {}
      }
      customListings.unshift(newListing)
      localStorage.setItem("nexus_custom_listings", JSON.stringify(customListings))
      localStorage.removeItem("nexus_profile_draft")
      localStorage.removeItem("nexus_preview_listing")

      setIsPublishing(false)
      setPublishSuccess(true)

      // Redirect after success with a hard reload to bypass Next.js cache
      // Pass category as search param to automatically open correct tab
      setTimeout(() => {
        window.location.href = `/explore?category=${formData.category}`
      }, 1500)

    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Public Profile Builder</h1>
          <p className="text-gray-500 mt-1 font-medium">Create your venue listing and publish it directly to the Nexus Marketplace.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSave}
            disabled={isSaving || isPublishing}
            className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-xl font-bold transition-all shadow-sm disabled:opacity-70"
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : saveSuccess ? (
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            {saveSuccess ? "Saved!" : "Save Draft"}
          </button>

          <button 
            onClick={handlePreview}
            disabled={isPublishing}
            className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-xl font-bold transition-all shadow-sm disabled:opacity-70"
          >
            <Eye className="w-5 h-5" />
            Preview
          </button>

          <button 
            onClick={handlePublish}
            disabled={isPublishing || publishSuccess}
            className="flex items-center gap-2 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md disabled:opacity-70"
          >
            {isPublishing ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : publishSuccess ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <Globe className="w-5 h-5" />
            )}
            {publishSuccess ? "Published!" : "Publish to Explore"}
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Section 1: Basic Info */}
        <div className="p-8 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-[#0F5B3E]">
              <Store className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Basic Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Venue / Business Name</label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Royal Grand Marquee" 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0F5B3E]/20 focus:border-[#0F5B3E] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0F5B3E]/20 focus:border-[#0F5B3E] transition-all"
              >
                <option value="halls">Banquet Halls</option>
                <option value="marquees">Marquees</option>
                <option value="farmhouses">Farmhouses</option>
                <option value="lawns">Outdoor Lawns</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Display Sub-Category</label>
              <input 
                type="text" 
                name="categoryName"
                value={formData.categoryName}
                onChange={handleChange}
                placeholder="e.g. Premium Marquee" 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0F5B3E]/20 focus:border-[#0F5B3E] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Location & Description */}
        <div className="p-8 border-b border-gray-200 bg-gray-50/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <MapPin className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Location & Description</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Address</label>
              <input 
                type="text" 
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. DHA Phase 5, Lahore" 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0F5B3E]/20 focus:border-[#0F5B3E] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">About Your Space</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your venue, its ambiance, and what makes it special..." 
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0F5B3E]/20 focus:border-[#0F5B3E] transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Pricing & Capacity */}
        <div className="p-8 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <DollarSign className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Pricing & Capacity</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Base Price (PKR)</label>
              <input 
                type="number" 
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 250000" 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0F5B3E]/20 focus:border-[#0F5B3E] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Pricing Unit</label>
              <select 
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0F5B3E]/20 focus:border-[#0F5B3E] transition-all"
              >
                <option value="event">Per Event</option>
                <option value="guest">Per Guest (Head)</option>
                <option value="night">Per Night</option>
                <option value="hour">Per Hour</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Max Capacity (Guests)</label>
              <div className="relative">
                <Users className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="number" 
                  name="maxGuests"
                  value={formData.maxGuests}
                  onChange={handleChange}
                  placeholder="e.g. 800" 
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0F5B3E]/20 focus:border-[#0F5B3E] transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Media */}
        <div className="p-8 bg-gray-50/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <ImageIcon className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Gallery Links</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Main Cover Image URL</label>
              <input 
                type="text" 
                name="image1"
                value={formData.image1}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..." 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0F5B3E]/20 focus:border-[#0F5B3E] transition-all"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Secondary Image 1</label>
                <input 
                  type="text" 
                  name="image2"
                  value={formData.image2}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..." 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0F5B3E]/20 focus:border-[#0F5B3E] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Secondary Image 2</label>
                <input 
                  type="text" 
                  name="image3"
                  value={formData.image3}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..." 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0F5B3E]/20 focus:border-[#0F5B3E] transition-all"
                />
              </div>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  )
}
