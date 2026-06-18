"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  ArrowLeft, Save, User, MapPin, Phone, Mail, 
  CalendarDays, Banknote, Users, MessageSquare, ChevronRight,
  Briefcase, Building2, CreditCard, Camera, Wallet, Plus, Trash2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function NewLeadView() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    contactType: "Customer",
    entityType: "Individual",
    companyName: "",
    cnic: "",
    picture: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "Lahore",
    source: "Instagram",
    eventType: "Wedding",
    eventDate: "",
    guests: "",
    budget: "",
    notes: "",
    accounts: [{ id: "acc1", method: "", title: "", number: "" }]
  })

  const handleSave = () => {
    // In a real app, this would hit an API.
    // For now, we simulate saving and redirect to the dashboard pipeline.
    alert("Contact saved successfully!")
    router.push("/dashboard/vendor")
  }

  const handleAddAccount = () => {
    setFormData({
      ...formData,
      accounts: [...formData.accounts, { id: `acc${Date.now()}`, method: "", title: "", number: "" }]
    })
  }

  const handleRemoveAccount = (id: string) => {
    setFormData({
      ...formData,
      accounts: formData.accounts.filter(acc => acc.id !== id)
    })
  }

  const isCustomer = formData.contactType === "Customer"

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      
      {/* Breadcrumb */}
      <nav className="flex items-center text-xs font-bold text-slate-400 gap-2 mb-2">
        <Link href="/dashboard/vendor" className="hover:text-primary transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3 h-3" /> Dashboard
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-300" />
        <Link href="/dashboard/vendor" className="hover:text-primary transition-colors">
          Contacts
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-300" />
        <span className="text-slate-900">New Contact</span>
      </nav>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Create New Contact</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Enter complete details for your new contact.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none font-bold" onClick={() => router.back()}>Cancel</Button>
          <Button className="flex-1 sm:flex-none bg-primary hover:bg-primary/90 text-white font-bold" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" /> Save Contact
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        
        {/* Section 0: Identity & Role */}
        <div className="p-6 border-b border-border bg-slate-50/50">
          <h2 className="font-bold text-slate-900 flex items-center gap-2 mb-6">
            <Briefcase className="w-5 h-5 text-indigo-500" /> Identity & Role
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">Contact Role</label>
              <select 
                value={formData.contactType}
                onChange={e => setFormData({...formData, contactType: e.target.value})}
                className="w-full h-11 px-4 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
              >
                <option>Customer</option>
                <option>Vendor</option>
                <option>Employee</option>
                <option>Team Member</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">Entity Type</label>
              <select 
                value={formData.entityType}
                onChange={e => setFormData({...formData, entityType: e.target.value})}
                className="w-full h-11 px-4 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
              >
                <option>Individual</option>
                <option>Company</option>
              </select>
            </div>
            
            {formData.entityType === "Company" && (
              <div className="lg:col-span-2">
                <label className="block text-xs font-bold text-slate-500 mb-1.5">Company Name *</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input 
                    type="text" 
                    value={formData.companyName}
                    onChange={e => setFormData({...formData, companyName: e.target.value})}
                    className="w-full h-11 pl-11 pr-4 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-colors"
                    placeholder="e.g. Nexus Corp"
                  />
                </div>
              </div>
            )}
            
            <div className={formData.entityType === "Company" ? "lg:col-span-4" : "lg:col-span-2"}>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">Passport / CNIC Number</label>
              <div className="relative">
                <CreditCard className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <input 
                  type="text" 
                  value={formData.cnic}
                  onChange={e => setFormData({...formData, cnic: e.target.value})}
                  className="w-full h-11 pl-11 pr-4 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-colors"
                  placeholder="00000-0000000-0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Personal Info */}
        <div className="p-6 border-b border-border">
          <h2 className="font-bold text-slate-900 flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-blue-500" /> Basic Information
          </h2>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 relative overflow-hidden group cursor-pointer hover:bg-slate-50 transition-colors shrink-0">
              {formData.picture ? (
                <img src={formData.picture} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <Camera className="w-6 h-6 group-hover:scale-110 transition-transform" />
              )}
              <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader()
                    reader.onload = (event) => {
                      setFormData({...formData, picture: event.target?.result as string})
                    }
                    reader.readAsDataURL(e.target.files[0])
                  }
                }}
              />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Contact Picture</h3>
              <p className="text-xs text-slate-500 mt-0.5">Upload a photo. Max 2MB.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">First Name *</label>
              <input 
                type="text" 
                value={formData.firstName}
                onChange={e => setFormData({...formData, firstName: e.target.value})}
                className="w-full h-11 px-4 rounded-lg border border-border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-colors"
                placeholder="Ahmed"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">Last Name</label>
              <input 
                type="text" 
                value={formData.lastName}
                onChange={e => setFormData({...formData, lastName: e.target.value})}
                className="w-full h-11 px-4 rounded-lg border border-border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-colors"
                placeholder="Raza"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">Phone Number *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full h-11 pl-11 pr-4 rounded-lg border border-border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-colors"
                  placeholder="+92 300 0000000"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full h-11 pl-11 pr-4 rounded-lg border border-border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-colors"
                  placeholder="contact@example.com"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 mb-1.5">Address</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <input 
                  type="text" 
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                  className="w-full h-11 pl-11 pr-4 rounded-lg border border-border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-colors"
                  placeholder="Street, Area, etc."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Event Details (Conditional) */}
        {isCustomer && (
          <div className="p-6 border-b border-border bg-slate-50/50">
            <h2 className="font-bold text-slate-900 flex items-center gap-2 mb-6">
              <CalendarDays className="w-5 h-5 text-purple-500" /> Event Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-2">
                <label className="block text-xs font-bold text-slate-500 mb-1.5">Event Type</label>
                <select 
                  value={formData.eventType}
                  onChange={e => setFormData({...formData, eventType: e.target.value})}
                  className="w-full h-11 px-4 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                >
                  <option>Wedding</option>
                  <option>Mehndi</option>
                  <option>Valima</option>
                  <option>Corporate Event</option>
                  <option>Birthday Party</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">Expected Date</label>
                <input 
                  type="date" 
                  value={formData.eventDate}
                  onChange={e => setFormData({...formData, eventDate: e.target.value})}
                  className="w-full h-11 px-4 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">Est. Guests</label>
                <div className="relative">
                  <Users className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input 
                    type="number" 
                    value={formData.guests}
                    onChange={e => setFormData({...formData, guests: e.target.value})}
                    className="w-full h-11 pl-11 pr-4 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                    placeholder="e.g. 500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Financial Details */}
        <div className="p-6 border-b border-border bg-slate-50/50">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-slate-900 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-amber-500" /> Payment & Financial Details
            </h2>
            <Button variant="outline" size="sm" onClick={handleAddAccount} className="h-8 text-xs font-bold border-dashed border-slate-300">
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Account
            </Button>
          </div>
          
          <div className="space-y-4">
            {formData.accounts.map((acc, index) => (
              <div key={acc.id} className="relative bg-white p-5 rounded-xl border border-slate-200 shadow-sm group transition-all hover:border-slate-300">
                {formData.accounts.length > 1 && (
                  <button 
                    onClick={() => handleRemoveAccount(acc.id)}
                    className="absolute -top-3 -right-3 bg-white text-slate-400 hover:text-red-500 p-1.5 rounded-full border border-slate-200 hover:border-red-200 transition-colors shadow-sm opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Method</label>
                    <select 
                      value={acc.method}
                      onChange={e => {
                        const newAccs = [...formData.accounts];
                        newAccs[index].method = e.target.value;
                        setFormData({...formData, accounts: newAccs});
                      }}
                      className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-colors"
                    >
                      <option value="">-- Select Method --</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Raast ID">Raast ID</option>
                      <option value="EasyPaisa">EasyPaisa</option>
                      <option value="JazzCash">JazzCash</option>
                      <option value="SadaPay">SadaPay</option>
                      <option value="NayaPay">NayaPay</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Account Title</label>
                    <input 
                      type="text" 
                      value={acc.title}
                      onChange={e => {
                        const newAccs = [...formData.accounts];
                        newAccs[index].title = e.target.value;
                        setFormData({...formData, accounts: newAccs});
                      }}
                      className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-colors"
                      placeholder="e.g. Ahmed Raza"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Account / IBAN Number</label>
                    <input 
                      type="text" 
                      value={acc.number}
                      onChange={e => {
                        const newAccs = [...formData.accounts];
                        newAccs[index].number = e.target.value;
                        setFormData({...formData, accounts: newAccs});
                      }}
                      className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-colors"
                      placeholder="e.g. 03001234567 or PK..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Qualification & Notes */}
        <div className="p-6">
          <h2 className="font-bold text-slate-900 flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-emerald-500" /> Additional Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isCustomer && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">Estimated Budget (PKR)</label>
                  <input 
                    type="number" 
                    value={formData.budget}
                    onChange={e => setFormData({...formData, budget: e.target.value})}
                    className="w-full h-11 px-4 rounded-lg border border-border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-colors"
                    placeholder="e.g. 1500000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">Lead Source</label>
                  <select 
                    value={formData.source}
                    onChange={e => setFormData({...formData, source: e.target.value})}
                    className="w-full h-11 px-4 rounded-lg border border-border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-colors"
                  >
                    <option>Instagram</option>
                    <option>Facebook</option>
                    <option>Referral</option>
                    <option>Walk-in</option>
                    <option>Website</option>
                    <option>Nexus Platform</option>
                  </select>
                </div>
              </>
            )}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 mb-1.5">Notes</label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
                <textarea 
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-colors resize-y min-h-[120px]"
                  placeholder={isCustomer ? "Any specific requirements, preferences, or notes from the initial conversation..." : "General notes about this contact..."}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
