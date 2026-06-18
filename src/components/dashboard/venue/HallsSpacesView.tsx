"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Building2, Plus, MoreHorizontal, Users, Pencil, Trash2, 
  Settings, Image as ImageIcon, CheckCircle2, AlertCircle, Wind, Save, X, Eye, EyeOff
} from "lucide-react"
import { Button } from "@/components/ui/button"

type SpaceStatus = "Active" | "Maintenance" | "Renovation"
type SpaceType = "Indoor Hall" | "Outdoor Lawn" | "Rooftop" | "Bridal Room"

interface Space {
  id: string
  name: string
  type: SpaceType
  capacity: number
  basePrice: number
  status: SpaceStatus
  amenities: string[]
  imageUrl: string
  isVisible: boolean
}

const MOCK_SPACES: Space[] = [
  {
    id: "1",
    name: "Grand Royal Hall",
    type: "Indoor Hall",
    capacity: 800,
    basePrice: 250000,
    status: "Active",
    amenities: ["Central AC", "Stage Setup", "Sound System", "Bridal Room"],
    imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
    isVisible: true
  },
  {
    id: "2",
    name: "Emerald Lawn",
    type: "Outdoor Lawn",
    capacity: 1200,
    basePrice: 150000,
    status: "Active",
    amenities: ["Marquee Setup", "Fairy Lights", "Valet Parking"],
    imageUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop",
    isVisible: true
  },
  {
    id: "3",
    name: "Crystal Mini Hall",
    type: "Indoor Hall",
    capacity: 150,
    basePrice: 80000,
    status: "Maintenance",
    amenities: ["Split AC", "Basic Sound"],
    imageUrl: "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=2070&auto=format&fit=crop",
    isVisible: false
  }
]

export function HallsSpacesView() {
  const [spaces, setSpaces] = useState<Space[]>(MOCK_SPACES)
  const [isAddingSpace, setIsAddingSpace] = useState(false)
  const [editingSpace, setEditingSpace] = useState<Space | null>(null)

  const [formData, setFormData] = useState<Partial<Space>>({})

  const getStatusColor = (status: SpaceStatus) => {
    switch (status) {
      case "Active": return "text-emerald-600 bg-emerald-100 border-emerald-200"
      case "Maintenance": return "text-orange-600 bg-orange-100 border-orange-200"
      case "Renovation": return "text-rose-600 bg-rose-100 border-rose-200"
      default: return "text-slate-600 bg-slate-100 border-slate-200"
    }
  }

  const getStatusIcon = (status: SpaceStatus) => {
    switch (status) {
      case "Active": return <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
      case "Maintenance": return <AlertCircle className="w-3.5 h-3.5 mr-1" />
      case "Renovation": return <Settings className="w-3.5 h-3.5 mr-1" />
      default: return null
    }
  }

  const handleAddNew = () => {
    setEditingSpace(null)
    setFormData({
      name: "",
      type: "Indoor Hall",
      capacity: 100,
      basePrice: 50000,
      status: "Active",
      amenities: [],
      imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
      isVisible: true
    })
    setIsAddingSpace(true)
  }

  const handleEdit = (space: Space) => {
    setEditingSpace(space)
    setFormData(space)
    setIsAddingSpace(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this space?")) {
      setSpaces(spaces.filter(s => s.id !== id))
    }
  }

  const toggleVisibility = (id: string) => {
    setSpaces(spaces.map(s => s.id === id ? { ...s, isVisible: !s.isVisible } : s))
  }

  const handleSave = () => {
    if (!formData.name) return alert("Name is required")
    
    const newAmenities = typeof formData.amenities === 'string' 
      ? (formData.amenities as string).split(',').map(s => s.trim()).filter(Boolean)
      : formData.amenities

    if (editingSpace) {
      setSpaces(spaces.map(s => s.id === editingSpace.id ? { ...s, ...formData, amenities: newAmenities } as Space : s))
    } else {
      const newSpace: Space = {
        ...(formData as Space),
        id: Math.random().toString(36).substr(2, 9),
        amenities: newAmenities || []
      }
      setSpaces([newSpace, ...spaces])
    }
    setIsAddingSpace(false)
  }

  if (isAddingSpace) {
    return (
      <div className="max-w-3xl mx-auto pb-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {editingSpace ? "Edit Space" : "Add New Space"}
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              {editingSpace ? "Update the details for this venue space." : "Fill in the details to create a new space."}
            </p>
          </div>
          <Button variant="ghost" onClick={() => setIsAddingSpace(false)} className="text-slate-500 hover:text-slate-900">
            Cancel
          </Button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Space Name</label>
              <input 
                type="text" 
                value={formData.name || ''}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="e.g. Grand Royal Hall"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Type</label>
              <select 
                value={formData.type || 'Indoor Hall'}
                onChange={e => setFormData({...formData, type: e.target.value as SpaceType})}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
              >
                <option value="Indoor Hall">Indoor Hall</option>
                <option value="Outdoor Lawn">Outdoor Lawn</option>
                <option value="Rooftop">Rooftop</option>
                <option value="Bridal Room">Bridal Room</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Max Capacity</label>
              <input 
                type="number" 
                value={formData.capacity || ''}
                onChange={e => setFormData({...formData, capacity: parseInt(e.target.value) || 0})}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Base Price (PKR)</label>
              <input 
                type="number" 
                value={formData.basePrice || ''}
                onChange={e => setFormData({...formData, basePrice: parseInt(e.target.value) || 0})}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-700">Status</label>
              <div className="flex gap-4">
                {["Active", "Maintenance", "Renovation"].map((status) => (
                  <label key={status} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="status"
                      value={status}
                      checked={formData.status === status}
                      onChange={e => setFormData({...formData, status: e.target.value as SpaceStatus})}
                      className="w-4 h-4 text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-medium text-slate-700">{status}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-700">Amenities (comma separated)</label>
              <input 
                type="text" 
                value={Array.isArray(formData.amenities) ? formData.amenities.join(", ") : formData.amenities || ''}
                onChange={e => setFormData({...formData, amenities: e.target.value as any})}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="e.g. Central AC, Stage, Sound System"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-700">Image URL</label>
              <input 
                type="text" 
                value={formData.imageUrl || ''}
                onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-2 md:col-span-2 flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl mt-2">
              <div>
                <label className="text-sm font-bold text-slate-900">Visible on Public Profile</label>
                <p className="text-xs text-slate-500">Allow customers to see and book this space.</p>
              </div>
              <button
                onClick={() => setFormData({...formData, isVisible: !formData.isVisible})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.isVisible ? 'bg-primary' : 'bg-slate-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.isVisible ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl px-6">
              <Save className="w-4 h-4 mr-2" /> Save Space
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            Halls & Spaces
          </h1>
          <p className="text-slate-500 font-medium mt-1">Manage your physical venues, capacities, and pricing.</p>
        </div>
        <Button onClick={handleAddNew} className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm rounded-xl">
          <Plus className="w-4 h-4 mr-2" /> Add New Space
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
        <AnimatePresence>
          {spaces.map((space, idx) => (
            <motion.div
              key={space.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group hover:shadow-md hover:border-primary/50 transition-all flex flex-col"
            >
              {/* Image Section */}
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img 
                  src={space.imageUrl} 
                  alt={space.name}
                  className={`w-full h-full object-cover transition-all duration-500 ${!space.isVisible ? 'grayscale opacity-70' : 'group-hover:scale-105'}`}
                />
                
                {/* Hidden Overlay */}
                {!space.isVisible && (
                  <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center backdrop-blur-[1px]">
                    <span className="bg-slate-900/80 text-white font-bold px-3 py-1.5 rounded-lg text-sm flex items-center shadow-lg backdrop-blur-md border border-slate-700/50">
                      <EyeOff className="w-4 h-4 mr-2" /> Hidden on Profile
                    </span>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${getStatusColor(space.status)}`}>
                    {getStatusIcon(space.status)}
                    {space.status}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">{space.name}</h3>
                    <p className="text-sm font-medium text-slate-500">{space.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-900">PKR {(space.basePrice / 1000).toFixed(0)}k</p>
                    <p className="text-xs font-medium text-slate-500">Base Price</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 mb-4">
                  <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm font-bold">Max {space.capacity}</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {space.amenities.slice(0, 3).map((amenity, i) => (
                      <span key={i} className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                        {amenity}
                      </span>
                    ))}
                    {space.amenities.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                        +{space.amenities.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Actions Footer */}
              <div className="border-t border-slate-100 bg-slate-50 p-3 flex justify-between gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleVisibility(space.id)} 
                  className={`flex-1 justify-center ${space.isVisible ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200' : 'text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 font-bold bg-emerald-50/50'}`}
                >
                  {space.isVisible ? (
                    <><EyeOff className="w-4 h-4 mr-2" /> Hide</>
                  ) : (
                    <><Eye className="w-4 h-4 mr-2" /> Publish</>
                  )}
                </Button>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(space)} className="text-slate-600 hover:text-blue-600 hover:bg-blue-50">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(space.id)} className="text-slate-600 hover:text-rose-600 hover:bg-rose-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
