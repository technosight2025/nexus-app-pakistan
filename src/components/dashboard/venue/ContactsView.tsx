"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Users, Search, Filter, Plus, MoreVertical, 
  Mail, Phone, MapPin, Building2, Briefcase, 
  UserCircle, BadgeCheck, X, FileText, Edit2, Trash2
} from "lucide-react"
import { Button } from "@/components/ui/button"

type ContactType = "Customer" | "Staff" | "Vendor"

interface Contact {
  id: string
  name: string
  type: ContactType
  email: string
  phone: string
  city: string
  status: "Active" | "Inactive" | "Lead"
  avatarInitials: string
  avatarColor: string
}

const INITIAL_CONTACTS: Contact[] = [
  { id: "c1", name: "Zara Ali", type: "Customer", email: "zara.a@gmail.com", phone: "0300-1234567", city: "Lahore", status: "Active", avatarInitials: "ZA", avatarColor: "bg-blue-100 text-blue-700" },
  { id: "c2", name: "Ahmed Raza", type: "Customer", email: "ahmed.raza@yahoo.com", phone: "0321-7654321", city: "Islamabad", status: "Lead", avatarInitials: "AR", avatarColor: "bg-indigo-100 text-indigo-700" },
  { id: "s1", name: "Kamran Khan", type: "Staff", email: "kamran@royalpalace.com", phone: "0333-9998887", city: "Lahore", status: "Active", avatarInitials: "KK", avatarColor: "bg-emerald-100 text-emerald-700" },
  { id: "s2", name: "Fatima Sheikh", type: "Staff", email: "fatima.s@royalpalace.com", phone: "0345-1112223", city: "Lahore", status: "Active", avatarInitials: "FS", avatarColor: "bg-emerald-100 text-emerald-700" },
  { id: "v1", name: "Maha's Photography", type: "Vendor", email: "contact@mahasphoto.com", phone: "0301-4445556", city: "Karachi", status: "Active", avatarInitials: "MP", avatarColor: "bg-purple-100 text-purple-700" },
  { id: "v2", name: "Fresh Blooms Decor", type: "Vendor", email: "hello@freshblooms.pk", phone: "0311-2223334", city: "Lahore", status: "Inactive", avatarInitials: "FB", avatarColor: "bg-purple-100 text-purple-700" },
]

const DEFAULT_FORM_DATA = {
  name: "", email: "", phone: "", city: "", status: "Active" as any
}

export function ContactsView() {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS)
  const [activeTab, setActiveTab] = useState<"All" | ContactType>("All")
  const [searchQuery, setSearchQuery] = useState("")
  
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false)
  const [newContactType, setNewContactType] = useState<ContactType>("Customer")
  
  // CRUD State
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA)
  const [editingContactId, setEditingContactId] = useState<string | null>(null)

  const filteredContacts = contacts.filter(c => {
    const matchesTab = activeTab === "All" || c.type === activeTab
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.phone.includes(searchQuery)
    return matchesTab && matchesSearch
  })

  const handleAddNew = () => {
    setFormData(DEFAULT_FORM_DATA)
    setNewContactType("Customer")
    setEditingContactId(null)
    setIsAddPanelOpen(true)
  }

  const handleEdit = (contact: Contact) => {
    setFormData({
      name: contact.name, email: contact.email, phone: contact.phone, 
      city: contact.city, status: contact.status
    })
    setNewContactType(contact.type)
    setEditingContactId(contact.id)
    setIsAddPanelOpen(true)
  }

  const handleDelete = (id: string) => {
    if(confirm("Are you sure you want to delete this contact?")) {
      setContacts(prev => prev.filter(c => c.id !== id))
    }
  }

  const handleSave = () => {
    if (!formData.name || !formData.phone) return alert("Name and Phone are required.");

    if (editingContactId) {
      setContacts(prev => prev.map(c => 
        c.id === editingContactId 
        ? { ...c, ...formData, type: newContactType, avatarInitials: formData.name.substring(0, 2).toUpperCase() } 
        : c
      ))
    } else {
      const newContact: Contact = {
        id: `${newContactType.toLowerCase()[0]}${Date.now()}`,
        name: formData.name,
        type: newContactType,
        email: formData.email,
        phone: formData.phone,
        city: formData.city || "N/A",
        status: formData.status,
        avatarInitials: formData.name.substring(0, 2).toUpperCase(),
        avatarColor: newContactType === 'Customer' ? "bg-blue-100 text-blue-700" : newContactType === 'Staff' ? "bg-emerald-100 text-emerald-700" : "bg-purple-100 text-purple-700"
      }
      setContacts(prev => [newContact, ...prev])
    }
    setIsAddPanelOpen(false)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 relative">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            Contacts Directory
          </h1>
          <p className="text-slate-500 font-medium mt-1">Manage all your customers, staff, and vendors in one place.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" className="bg-white border-border shadow-sm rounded-xl flex-1 sm:flex-none">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
          <Button onClick={handleAddNew} className="bg-slate-900 text-white shadow-sm rounded-xl flex-1 sm:flex-none">
            <Plus className="w-4 h-4 mr-2" /> New Contact
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
          
          {/* Tabs */}
          <div className="flex items-center p-1 bg-slate-100/80 backdrop-blur-sm rounded-xl border border-slate-200 w-full sm:w-auto overflow-x-auto hide-scrollbar">
            {["All", "Customer", "Staff", "Vendor"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 sm:flex-none px-4 py-1.5 text-sm font-bold rounded-lg transition-all whitespace-nowrap ${
                  activeTab === tab 
                    ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200" 
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                }`}
              >
                {tab}s
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search contacts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Contact Name</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Type</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Contact Info</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Location</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Status</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${contact.avatarColor}`}>
                        {contact.avatarInitials}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{contact.name}</p>
                        <p className="text-xs text-slate-500 font-medium">ID: {contact.id.toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border
                      ${contact.type === 'Customer' ? 'bg-blue-50 text-blue-700 border-blue-100' : ''}
                      ${contact.type === 'Staff' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : ''}
                      ${contact.type === 'Vendor' ? 'bg-purple-50 text-purple-700 border-purple-100' : ''}
                    `}>
                      {contact.type === 'Customer' && <UserCircle className="w-3.5 h-3.5" />}
                      {contact.type === 'Staff' && <Briefcase className="w-3.5 h-3.5" />}
                      {contact.type === 'Vendor' && <Building2 className="w-3.5 h-3.5" />}
                      {contact.type}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        {contact.phone}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {contact.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {contact.city}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold
                      ${contact.status === 'Active' ? 'bg-green-100 text-green-700' : ''}
                      ${contact.status === 'Lead' ? 'bg-orange-100 text-orange-700' : ''}
                      ${contact.status === 'Inactive' ? 'bg-slate-100 text-slate-600' : ''}
                    `}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        contact.status === 'Active' ? 'bg-green-500' : 
                        contact.status === 'Lead' ? 'bg-orange-500' : 'bg-slate-400'
                      }`}></span>
                      {contact.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="w-8 h-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" onClick={() => handleEdit(contact)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-8 h-8 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg" onClick={() => handleDelete(contact.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredContacts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Search className="w-6 h-6 text-slate-300" />
                    </div>
                    <p className="text-slate-500 font-bold">No contacts found</p>
                    <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Contact Panel Overlay */}
      <AnimatePresence>
        {isAddPanelOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddPanelOpen(false)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white shadow-2xl z-[70] flex flex-col border-l border-slate-200"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
                <div>
                  <h2 className="font-black text-xl text-slate-900">{editingContactId ? "Edit Contact" : "New Contact"}</h2>
                  <p className="text-sm text-slate-500 font-medium mt-1">{editingContactId ? "Update existing contact information." : "Add a new person or business to your directory."}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsAddPanelOpen(false)} className="rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                
                {/* Contact Type Selector */}
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Contact Type</label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Customer", "Staff", "Vendor"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setNewContactType(type as ContactType)}
                        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                          newContactType === type 
                            ? "border-primary bg-primary/5 text-primary" 
                            : "border-slate-100 bg-white text-slate-500 hover:border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {type === 'Customer' && <UserCircle className="w-6 h-6" />}
                        {type === 'Staff' && <Briefcase className="w-6 h-6" />}
                        {type === 'Vendor' && <Building2 className="w-6 h-6" />}
                        <span className="text-sm font-bold">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Basic Info */}
                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Basic Information</label>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name / Company Name <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        placeholder="e.g. Zara Ali" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" 
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                        <input 
                          type="tel" 
                          placeholder="03xx-xxxxxxx" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
                        <input 
                          type="email" 
                          placeholder="name@example.com" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dynamic Fields based on Type */}
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={newContactType}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{newContactType} Details</label>
                    
                    {newContactType === "Staff" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-1.5">CNIC Number</label>
                          <input type="text" placeholder="xxxxx-xxxxxxx-x" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-1.5">Job Role / Designation</label>
                          <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20">
                            <option>Manager</option>
                            <option>Event Coordinator</option>
                            <option>Security Guard</option>
                            <option>Waiter</option>
                          </select>
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-bold text-slate-700 mb-1.5">Monthly Salary (PKR)</label>
                          <input type="number" placeholder="50000" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" />
                        </div>
                      </div>
                    )}

                    {newContactType === "Customer" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label className="block text-sm font-bold text-slate-700 mb-1.5">Lead Source</label>
                          <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20">
                            <option>Nexus Platform</option>
                            <option>Instagram</option>
                            <option>Referral</option>
                            <option>Walk-in</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-1.5">Total Spent to Date</label>
                          <input type="text" placeholder="0" disabled className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm font-medium text-slate-400" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-1.5">Status</label>
                          <select 
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                          >
                            <option value="Active">Active</option>
                            <option value="Lead">Lead</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {newContactType === "Vendor" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label className="block text-sm font-bold text-slate-700 mb-1.5">Services Provided</label>
                          <input type="text" placeholder="e.g. Photography, Catering, Decor" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-bold text-slate-700 mb-1.5">Bank Account Details</label>
                          <input type="text" placeholder="Bank Name - Account Number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Additional Info */}
                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Additional Details</label>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Address / Location</label>
                        <input type="text" placeholder="House/Street/Area" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">City</label>
                        <input 
                          type="text" 
                          placeholder="Lahore" 
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-400" /> Notes
                      </label>
                      <textarea 
                        rows={3} 
                        placeholder="Add any internal notes about this contact..." 
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none custom-scrollbar" 
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="p-5 bg-slate-50 border-t border-slate-200 flex justify-end gap-3 shrink-0">
                <Button variant="outline" onClick={() => setIsAddPanelOpen(false)} className="bg-white border-slate-200 hover:bg-slate-50 rounded-xl font-bold">
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-white shadow-sm rounded-xl font-bold px-6">
                  {editingContactId ? "Save Changes" : "Create Contact"}
                </Button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  )
}
