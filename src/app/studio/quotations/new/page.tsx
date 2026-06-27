"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft, Plus, Save, Send, Eye, FileText, Check, Trash2, 
  Settings, Copy, CreditCard, ChevronDown, MonitorPlay, Camera, Film,
  UserPlus, Mail, Phone, MapPin, Briefcase, Home, Tag, Clock, Users, Video
} from "lucide-react"

import { createQuotation, DEFAULT_TERMS, DEFAULT_PAYMENT, DEFAULT_DELIVERABLES } from "@/lib/mock-db"

const AVAILABLE_SERVICES = [
  { id: 1, type: "Service", category: "Photography", name: "Premium Wedding Photography", price: 65000, desc: "2 Senior Photographers, Unlimited Shots, Color Graded", image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&q=80" },
  { id: 2, type: "Service", category: "Photography", name: "Pre-Wedding Shoot", price: 35000, desc: "1 Outdoor Location, 2 Outfit Changes", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80" },
  { id: 3, type: "Service", category: "Videography", name: "Cinematic Event Coverage", price: 85000, desc: "2 Cinematographers, Teaser + Full Highlight Video", image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&q=80" },
  { id: 4, type: "Service", category: "Videography", name: "Drone Coverage", price: 20000, desc: "4 Hours Aerial Coverage via DJI Mavic 3", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&q=80" },
  { id: 5, type: "Product", category: "Print", name: "Signature Leather Album (12x36)", price: 25000, desc: "40 Pages, Premium UV Printing", image: "https://images.unsplash.com/photo-1544390059-478678f1498b?w=400&q=80" },
  { id: 6, type: "Package", category: "Bundle", name: "The Grand Royal Package", price: 150000, desc: "Includes Premium Photo, Cinematic Video, and Drone Coverage for 1 event.", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80" },
]

const MOCK_CONTACTS = [
  { name: "Ayesha Khan", email: "ayesha@gmail.com", phone: "+92-300-1234567", city: "Lahore", homeAddress: "DHA Phase 6, Lahore", businessAddress: "", type: "Client" },
  { name: "Hassan Ali", email: "hassan@hotmail.com", phone: "+92-321-9876543", city: "Islamabad", homeAddress: "F-8/4, Islamabad", businessAddress: "", type: "Client" },
  { name: "Farhan Malik", email: "farhan@techcorp.pk", phone: "+92-300-7890123", city: "Lahore", homeAddress: "Askari 11, Lahore", businessAddress: "TechCorp Plaza", type: "Corporate" },
  { name: "Alpha Prints", email: "orders@alphaprints.pk", phone: "+92-300-1112233", city: "Lahore", homeAddress: "", businessAddress: "Shop 12, Nisbat Road", type: "Vendor" },
]

export default function NewQuotationPage() {
  const router = useRouter()
  
  // Form State
  const [clientName, setClientName] = useState("")
  const [eventName, setEventName] = useState("")
  const [eventDate, setEventDate] = useState("")
  
  // Custom Event State
  const [isCustomEvent, setIsCustomEvent] = useState(false)
  const [eventTime, setEventTime] = useState("")
  const [eventVenue, setEventVenue] = useState("")
  const [eventGuests, setEventGuests] = useState("")
  const [eventCoverage, setEventCoverage] = useState("")
  
  // New Contact State
  const [isNewContact, setIsNewContact] = useState(false)
  const [clientEmail, setClientEmail] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [clientCity, setClientCity] = useState("")
  const [clientBusinessAddress, setClientBusinessAddress] = useState("")
  const [clientHomeAddress, setClientHomeAddress] = useState("")
  const [clientType, setClientType] = useState("Client")
  
  // Search State
  const [showDropdown, setShowDropdown] = useState(false)
  const filteredContacts = MOCK_CONTACTS.filter(c => c.name.toLowerCase().includes(clientName.toLowerCase()))

  const handleSelectContact = (contact: typeof MOCK_CONTACTS[0]) => {
    setClientName(contact.name)
    setClientEmail(contact.email)
    setClientPhone(contact.phone)
    setClientCity(contact.city)
    setClientBusinessAddress(contact.businessAddress)
    setClientHomeAddress(contact.homeAddress)
    setClientType(contact.type)
    setIsNewContact(true)
    setShowDropdown(false)
  }
  
  // Quotation State
  const [items, setItems] = useState<{id: string, name: string, price: number, desc: string, qty: number}[]>([])
  const [discount, setDiscount] = useState(0)
  const [discountType, setDiscountType] = useState<"flat" | "percent">("flat")
  const [taxRate, setTaxRate] = useState(0)
  const [targetBudget, setTargetBudget] = useState<string>("")
  
  // Contract Details State
  const [terms, setTerms] = useState(DEFAULT_TERMS)
  const [paymentSteps, setPaymentSteps] = useState(DEFAULT_PAYMENT)
  const [deliverables, setDeliverables] = useState(DEFAULT_DELIVERABLES)
  
  // Custom Service State
  const [isCustomServiceOpen, setIsCustomServiceOpen] = useState(false)
  const [customServiceName, setCustomServiceName] = useState("")
  const [customServicePrice, setCustomServicePrice] = useState("")
  const [customServiceDesc, setCustomServiceDesc] = useState("")

  const handleAddCustomService = () => {
    if (!customServiceName || !customServicePrice) return
    setItems([...items, { 
      id: Math.random().toString(), 
      name: customServiceName, 
      price: Number(customServicePrice), 
      desc: customServiceDesc, 
      qty: 1 
    }])
    setCustomServiceName("")
    setCustomServicePrice("")
    setCustomServiceDesc("")
    setIsCustomServiceOpen(false)
  }
  
  const handleAddService = (srv: typeof AVAILABLE_SERVICES[0]) => {
    const existing = items.find(i => i.name === srv.name)
    if (existing) {
      setItems(items.map(i => i.name === srv.name ? { ...i, qty: i.qty + 1 } : i))
    } else {
      setItems([...items, { id: Math.random().toString(), name: srv.name, price: srv.price, desc: srv.desc, qty: 1 }])
    }
  }

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(i => i.id !== id))
  }

  const handleUpdateItem = (id: string, field: "price" | "desc", value: string | number) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i))
  }

  const handleMatchBudget = () => {
    const budget = Number(targetBudget)
    if (budget <= 0) return

    const subtotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0)
    
    // We want: (target_subtotal - flat_discount) * (1 + taxRate/100) = budget
    // So target_after_discount = budget / (1 + taxRate/100)
    const requiredAfterDiscount = budget / (1 + taxRate / 100)
    
    if (subtotal === 0) {
      setItems([{
        id: Math.random().toString(),
        name: "Custom Event Package",
        price: Math.round(requiredAfterDiscount),
        desc: "Comprehensive coverage tailored to your budget requirements.",
        qty: 1
      }])
    } else if (requiredAfterDiscount < subtotal) {
      setDiscountType("flat")
      setDiscount(Math.round(subtotal - requiredAfterDiscount))
    } else if (requiredAfterDiscount > subtotal) {
      // Add the difference as an add-on service
      setItems([...items, {
        id: Math.random().toString(),
        name: "Additional Custom Services",
        price: Math.round(requiredAfterDiscount - subtotal),
        desc: "Added to match target budget",
        qty: 1
      }])
      setDiscount(0)
    }
  }

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0)
  const discountAmount = discountType === "percent" ? (subtotal * discount) / 100 : discount
  const afterDiscount = subtotal - discountAmount
  const taxAmount = (afterDiscount * taxRate) / 100
  const total = afterDiscount + taxAmount

  const handleSaveAndSend = () => {
    if (!clientName || !eventName) {
      alert("Please enter at least a Client Name and Event Type.")
      return
    }
    
    if (items.length === 0) {
      alert("Please add at least one service to the quotation.")
      return
    }
    
    const newQuote = createQuotation({
      client: clientName,
      event: eventName,
      date: eventDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      total: total,
      subtotal: subtotal,
      discount: discountAmount,
      tax: taxAmount,
      items: items,
      terms: terms,
      paymentSteps: paymentSteps,
      deliverables: deliverables
    })
    
    if (newQuote) {
      router.push(`/studio/quotations/${newQuote.id}`)
    }
  }

  return (
    <div className="space-y-5 md:space-y-6 max-w-6xl mx-auto pb-24">
      
      {/* HEADER */}
      <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="w-10 h-10 rounded-xl border border-[#E5E7EB] dark:border-white/10 flex items-center justify-center text-[#6B7280] hover:bg-[#F8FAFC] dark:hover:bg-white/5 hover:text-[#4F46E5] transition-colors cursor-pointer shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-[18px] md:text-[22px] font-black text-[#111827] dark:text-white leading-tight">Create New Quotation</h1>
            <p className="text-[11px] md:text-[12px] font-medium text-[#6B7280] dark:text-gray-400 mt-0.5">Build a custom package and send it to your client.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 text-[#374151] dark:text-gray-300 rounded-xl text-[11px] font-black cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
            <Eye className="w-3.5 h-3.5" /> Preview PDF
          </button>
          <button onClick={handleSaveAndSend} className="flex items-center gap-2 px-5 py-2 bg-[#4F46E5] text-white rounded-xl text-[11px] font-black cursor-pointer hover:bg-indigo-700 transition-colors shadow-sm">
            <Check className="w-3.5 h-3.5" /> Save & Continue
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-5 md:space-y-6">
        
        {/* Status Stepper (Static Draft State for Builder) */}
        <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-2xl p-6 shadow-sm overflow-x-auto">
          <div className="min-w-[400px]">
            <div className="flex items-center justify-between w-full relative z-0">
              {["Draft", "Sent", "Approved", "Invoiced"].map((step, index) => {
                const isCompleted = false
                const isActive = index === 0
                
                return (
                  <div key={step} className="flex flex-col items-center relative flex-1">
                    {index !== 0 && (
                      <div className="absolute left-[-50%] right-[50%] top-4 h-1 -z-10 bg-[#E5E7EB] dark:bg-white/10" />
                    )}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px] z-10 transition-colors ${
                      isActive ? 'bg-[#4F46E5] text-white ring-4 ring-indigo-50 dark:ring-indigo-500/20 shadow-md' : 
                      'bg-[#F3F4F6] text-[#9CA3AF] dark:bg-white/5 dark:text-gray-500 border border-[#E5E7EB] dark:border-white/10'
                    }`}>
                      {index + 1}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest mt-3 transition-colors ${
                      isActive ? 'text-[#4F46E5]' : 'text-[#9CA3AF] dark:text-gray-500'
                    }`}>
                      {step}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* BUILDER */}
        <div className="lg:col-span-2 space-y-5 md:space-y-6">
          
          {/* Client Details */}
          <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-5 space-y-4">
            <div className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest border-b border-[#F3F4F6] dark:border-white/5 pb-2">Client & Event Details</div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2 relative">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-[#374151] dark:text-gray-300">Client Search</label>
                  <button 
                    onClick={() => {
                      setIsNewContact(!isNewContact)
                      setShowDropdown(false)
                    }}
                    className="text-[10px] font-black text-[#4F46E5] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <UserPlus className="w-3 h-3" />
                    {isNewContact ? "Hide Contact Details" : "Add New Contact"}
                  </button>
                </div>
                <input 
                  type="text" 
                  value={clientName} 
                  onChange={e => {
                    setClientName(e.target.value)
                    setShowDropdown(e.target.value.length > 0 && !isNewContact)
                  }} 
                  onFocus={() => {
                    if (clientName.length > 0 && !isNewContact) setShowDropdown(true)
                  }}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  placeholder={isNewContact ? "Full Name (e.g. Hamza Ali)" : "Search existing clients..."} 
                  className="w-full bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl px-4 py-2.5 text-[12px] text-[#111827] dark:text-white outline-none focus:border-[#4F46E5] transition-colors" 
                />
                
                {/* Search Dropdown */}
                {showDropdown && filteredContacts.length > 0 && (
                  <div className="absolute top-[100%] mt-1 left-0 right-0 bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                    {filteredContacts.map((contact, idx) => (
                      <div 
                        key={idx} 
                        onMouseDown={(e) => {
                          e.preventDefault() // Prevent blur
                          handleSelectContact(contact)
                        }}
                        className="px-4 py-3 border-b border-[#F3F4F6] dark:border-white/5 last:border-0 hover:bg-[#F8FAFC] dark:hover:bg-white/5 cursor-pointer transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[12px] font-bold text-[#111827] dark:text-white">{contact.name}</span>
                          <span className="text-[9px] font-black text-[#4F46E5] bg-[#EEF2FF] dark:bg-indigo-500/10 px-2 py-0.5 rounded-full">{contact.type}</span>
                        </div>
                        <div className="text-[10px] text-[#9CA3AF] mt-0.5">{contact.phone} • {contact.email}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {isNewContact && (
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-[#F8FAFC] dark:bg-white/2 border border-indigo-100 dark:border-indigo-500/20 rounded-xl mb-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#6B7280]">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" />
                      <input type="email" value={clientEmail} onChange={e => setClientEmail(e.target.value)} placeholder="client@email.com" className="w-full bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-lg pl-9 pr-3 py-2 text-[11px] outline-none focus:border-[#4F46E5]" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#6B7280]">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" />
                      <input type="tel" value={clientPhone} onChange={e => setClientPhone(e.target.value)} placeholder="+92 300 0000000" className="w-full bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-lg pl-9 pr-3 py-2 text-[11px] outline-none focus:border-[#4F46E5]" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#6B7280]">City / Region</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" />
                      <input type="text" value={clientCity} onChange={e => setClientCity(e.target.value)} placeholder="Lahore" className="w-full bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-lg pl-9 pr-3 py-2 text-[11px] outline-none focus:border-[#4F46E5]" />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#6B7280]">Business Address</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" />
                      <input type="text" value={clientBusinessAddress} onChange={e => setClientBusinessAddress(e.target.value)} placeholder="Office / Studio Address" className="w-full bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-lg pl-9 pr-3 py-2 text-[11px] outline-none focus:border-[#4F46E5]" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#6B7280]">Home Address</label>
                    <div className="relative">
                      <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" />
                      <input type="text" value={clientHomeAddress} onChange={e => setClientHomeAddress(e.target.value)} placeholder="Residential Address" className="w-full bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-lg pl-9 pr-3 py-2 text-[11px] outline-none focus:border-[#4F46E5]" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#6B7280]">Contact Type</label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF] pointer-events-none" />
                      <select value={clientType} onChange={e => setClientType(e.target.value)} className="w-full bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-lg pl-9 pr-3 py-2 text-[11px] outline-none focus:border-[#4F46E5] appearance-none cursor-pointer">
                        <option value="Client">Client</option>
                        <option value="Lead">Lead</option>
                        <option value="Vendor">Vendor</option>
                        <option value="Freelancer">Freelancer</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF] pointer-events-none" />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-1.5 md:col-span-2 relative">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-[#374151] dark:text-gray-300">Event Type</label>
                  <button 
                    onClick={() => setIsCustomEvent(!isCustomEvent)}
                    className="text-[10px] font-black text-[#4F46E5] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    {isCustomEvent ? "Hide Event Details" : "Add Event Details"}
                  </button>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input 
                      type="text" 
                      value={eventName} 
                      onChange={e => setEventName(e.target.value)} 
                      placeholder="e.g. Walima Ceremony" 
                      list="event-types"
                      className="w-full bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl px-4 py-2.5 text-[12px] text-[#111827] dark:text-white outline-none focus:border-[#4F46E5] transition-colors" 
                    />
                    <datalist id="event-types">
                      <option value="Wedding / Baraat" />
                      <option value="Walima Ceremony" />
                      <option value="Mehndi / Sangeet" />
                      <option value="Engagement / Mangni" />
                      <option value="Mayun / Ubtan" />
                      <option value="Nikkah" />
                      <option value="Corporate Event" />
                      <option value="Birthday Party" />
                      <option value="Product Shoot" />
                      <option value="Bridal Shower" />
                      <option value="Baby Shower" />
                    </datalist>
                  </div>
                  <div className="flex-1">
                    <input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} className="w-full bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl px-4 py-2.5 text-[12px] text-[#111827] dark:text-white outline-none focus:border-[#4F46E5] transition-colors" />
                  </div>
                </div>
              </div>

              {isCustomEvent && (
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-4 bg-[#F8FAFC] dark:bg-white/2 border border-indigo-100 dark:border-indigo-500/20 rounded-xl mt-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#6B7280]">Event Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" />
                      <input type="time" value={eventTime} onChange={e => setEventTime(e.target.value)} className="w-full bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-lg pl-9 pr-3 py-2 text-[11px] outline-none focus:border-[#4F46E5]" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#6B7280]">Venue</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" />
                      <input type="text" value={eventVenue} onChange={e => setEventVenue(e.target.value)} placeholder="e.g. Pearl Continental" className="w-full bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-lg pl-9 pr-3 py-2 text-[11px] outline-none focus:border-[#4F46E5]" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#6B7280]">Number of Guests</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" />
                      <input type="number" value={eventGuests} onChange={e => setEventGuests(e.target.value)} placeholder="e.g. 500" className="w-full bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-lg pl-9 pr-3 py-2 text-[11px] outline-none focus:border-[#4F46E5]" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#6B7280]">Coverage Hours</label>
                    <div className="relative">
                      <Video className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" />
                      <select value={eventCoverage} onChange={e => setEventCoverage(e.target.value)} className="w-full bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-lg pl-9 pr-3 py-2 text-[11px] outline-none focus:border-[#4F46E5] appearance-none cursor-pointer">
                        <option value="">Select duration</option>
                        <option value="2">2 Hours</option>
                        <option value="4">4 Hours (Half Day)</option>
                        <option value="8">8 Hours (Full Day)</option>
                        <option value="12">12+ Hours (Extended)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF] pointer-events-none" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Itemized Services */}
          <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#F3F4F6] dark:border-white/5 flex justify-between items-center bg-[#F8FAFC] dark:bg-white/2">
              <div className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest">Line Items</div>
              <span className="text-[11px] font-bold text-[#374151] dark:text-gray-300">{items.length} services</span>
            </div>
            
            <div className="p-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10 opacity-60">
                  <FileText className="w-10 h-10 text-[#9CA3AF] mb-3" />
                  <p className="text-[12px] font-bold text-[#374151] dark:text-gray-300">No services added</p>
                  <p className="text-[10px] text-[#6B7280]">Add predefined or custom services below.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-[#E5E7EB] dark:border-white/10 rounded-xl bg-white dark:bg-[#111118] hover:border-[#4F46E5]/40 transition-colors group">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-md bg-[#EEF2FF] text-[#4F46E5] dark:bg-indigo-500/10 dark:text-indigo-400 text-[10px] font-black flex items-center justify-center mt-0.5 shrink-0">{index + 1}</div>
                        <div>
                          <div className="text-[13px] font-bold text-[#111827] dark:text-white">{item.name}</div>
                          <input 
                            type="text" 
                            value={item.desc}
                            onChange={(e) => handleUpdateItem(item.id, "desc", e.target.value)}
                            className="text-[10px] text-[#6B7280] mt-0.5 bg-transparent border-b border-dashed border-transparent hover:border-gray-300 dark:hover:border-white/20 focus:border-[#4F46E5] dark:focus:border-[#4F46E5] outline-none w-full sm:w-[250px] md:w-[350px] transition-colors pb-0.5"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-4 sm:gap-6 self-end sm:self-auto">
                        <div className="text-right">
                          <div className="text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-0.5">Price</div>
                          <div className="flex items-center gap-1 justify-end">
                            <span className="text-[12px] font-black text-[#111827] dark:text-white">₨</span>
                            <input 
                              type="number"
                              value={item.price || ""}
                              onChange={(e) => handleUpdateItem(item.id, "price", Number(e.target.value))}
                              className="text-[12px] font-black text-[#111827] dark:text-white bg-transparent border-b border-dashed border-transparent hover:border-gray-300 dark:hover:border-white/20 focus:border-[#4F46E5] outline-none w-16 text-right pb-0.5 transition-colors"
                            />
                            <span className="text-[12px] font-black text-[#111827] dark:text-white ml-0.5">x {item.qty}</span>
                          </div>
                        </div>
                        <div className="text-right w-24">
                          <div className="text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-0.5">Total</div>
                          <div className="text-[14px] font-black text-[#4F46E5]">₨{(item.price * item.qty).toLocaleString()}</div>
                        </div>
                        <button onClick={() => handleRemoveItem(item.id)} className="w-8 h-8 rounded-lg bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer hover:bg-red-100">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Service Selection / Creation */}
              <div className="mt-4 pt-4 border-t border-[#E5E7EB] dark:border-white/10 space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 space-y-1.5 relative">
                    <label className="text-[11px] font-bold text-[#374151] dark:text-gray-300">Add Predefined Service</label>
                    <div className="relative">
                      <select 
                        onChange={e => {
                          const srv = AVAILABLE_SERVICES.find(s => s.id === Number(e.target.value))
                          if (srv) handleAddService(srv)
                          e.target.value = "" // Reset select after adding
                        }}
                        className="w-full bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl px-4 py-2.5 text-[12px] text-[#111827] dark:text-white outline-none focus:border-[#4F46E5] transition-colors appearance-none cursor-pointer"
                        defaultValue=""
                      >
                        <option value="" disabled className="bg-white dark:bg-[#111118] text-[#111827] dark:text-white">Select a service to add...</option>
                        {['Photography', 'Videography', 'Print', 'Bundle', 'Add-on'].map(cat => (
                          <optgroup key={cat} label={cat} className="bg-white dark:bg-[#111118] text-[#9CA3AF] font-bold">
                            {AVAILABLE_SERVICES.filter(s => s.category === cat).map(srv => (
                              <option key={srv.id} value={srv.id} className="bg-white dark:bg-[#111118] text-[#111827] dark:text-white font-normal">
                                {srv.name} - ₨{srv.price.toLocaleString()}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
                    </div>
                  </div>
                  
                  <div className="flex items-end">
                    <span className="text-[12px] font-medium text-[#9CA3AF] mb-3 mx-2 hidden md:block">or</span>
                  </div>

                  <div className="flex-1 space-y-1.5 flex items-end">
                    {!isCustomServiceOpen ? (
                      <button 
                        onClick={() => setIsCustomServiceOpen(true)}
                        className="w-full py-2.5 border border-dashed border-[#E5E7EB] dark:border-white/20 rounded-xl text-[11px] font-black text-[#6B7280] hover:text-[#4F46E5] hover:border-[#4F46E5] transition-colors cursor-pointer flex items-center justify-center gap-1 bg-[#F8FAFC] dark:bg-white/5 h-[42px]"
                      >
                        <Plus className="w-3.5 h-3.5" /> Create Custom Service
                      </button>
                    ) : null}
                  </div>
                </div>

                {isCustomServiceOpen && (
                  <div className="p-4 border border-[#E5E7EB] dark:border-white/10 rounded-xl bg-[#F8FAFC] dark:bg-white/2">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[11px] font-bold text-[#111827] dark:text-white">Custom Service Details</span>
                      <button onClick={() => setIsCustomServiceOpen(false)} className="text-[10px] font-bold text-[#9CA3AF] hover:text-[#EF4444] cursor-pointer">Cancel</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <input 
                        type="text" 
                        value={customServiceName} 
                        onChange={e => setCustomServiceName(e.target.value)} 
                        placeholder="Service Name" 
                        className="w-full bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-lg px-3 py-2 text-[11px] text-[#111827] dark:text-white outline-none focus:border-[#4F46E5]" 
                      />
                      <input 
                        type="number" 
                        value={customServicePrice} 
                        onChange={e => setCustomServicePrice(e.target.value)} 
                        placeholder="Price (₨)" 
                        className="w-full bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-lg px-3 py-2 text-[11px] text-[#111827] dark:text-white outline-none focus:border-[#4F46E5]" 
                      />
                      <div className="md:col-span-2">
                        <input 
                          type="text" 
                          value={customServiceDesc} 
                          onChange={e => setCustomServiceDesc(e.target.value)} 
                          placeholder="Description (Optional)" 
                          className="w-full bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-lg px-3 py-2 text-[11px] text-[#111827] dark:text-white outline-none focus:border-[#4F46E5]" 
                        />
                      </div>
                    </div>
                    <button 
                      onClick={handleAddCustomService}
                      className="w-full py-2 bg-[#4F46E5] text-white rounded-lg text-[10px] font-black hover:bg-indigo-700 transition-colors cursor-pointer"
                    >
                      Add to Quotation
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Totals Calculation */}
            <div className="bg-[#F8FAFC] dark:bg-[#1A1A24] p-5 border-t border-[#E5E7EB] dark:border-white/5 flex flex-col md:flex-row justify-between items-start gap-6">
              
              {/* Target Budget Matcher */}
              <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-xl p-4 w-full md:w-[320px]">
                <div className="text-[11px] font-black text-[#374151] dark:text-gray-300 mb-2">Target Budget Matcher</div>
                <div className="text-[10px] text-[#6B7280] mb-3 leading-relaxed">Client has a strict budget? Enter it below and we'll auto-calculate the exact discount needed.</div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] font-bold text-[#9CA3AF]">₨</span>
                    <input 
                      type="number" 
                      value={targetBudget}
                      onChange={e => setTargetBudget(e.target.value)}
                      placeholder="e.g. 150000"
                      className="w-full bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-lg pl-7 pr-3 py-2 text-[12px] font-bold text-[#111827] dark:text-white outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                  <button onClick={handleMatchBudget} className="px-3 py-2 bg-[#111827] dark:bg-white text-white dark:text-[#111827] rounded-lg text-[11px] font-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap">
                    Match Budget
                  </button>
                </div>
              </div>

              {/* Math Totals */}
              <div className="w-full md:max-w-xs space-y-3">
                <div className="flex justify-between items-center text-[12px] text-[#6B7280] dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-bold">₨{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center text-[12px] text-[#6B7280] dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <span>Discount</span>
                    <div className="flex bg-white dark:bg-white/5 rounded-md border border-[#E5E7EB] dark:border-white/10 p-0.5 overflow-hidden">
                      <button onClick={() => setDiscountType("flat")} className={`px-2 py-0.5 text-[9px] font-black rounded-sm cursor-pointer transition-colors ${discountType === "flat" ? "bg-[#4F46E5] text-white" : "text-[#9CA3AF] hover:text-[#374151]"}`}>₨</button>
                      <button onClick={() => setDiscountType("percent")} className={`px-2 py-0.5 text-[9px] font-black rounded-sm cursor-pointer transition-colors ${discountType === "percent" ? "bg-[#4F46E5] text-white" : "text-[#9CA3AF] hover:text-[#374151]"}`}>%</button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#9CA3AF]">- {discountType === "flat" ? "₨" : ""}</span>
                    <input 
                      type="number" 
                      value={discount} 
                      onChange={e => setDiscount(Number(e.target.value))} 
                      className="w-20 bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-lg px-2 py-1 text-right text-[12px] font-bold text-[#EF4444] outline-none focus:border-[#EF4444]"
                    />
                    {discountType === "percent" && <span className="text-[#9CA3AF]">%</span>}
                  </div>
                </div>

                <div className="flex justify-between items-center text-[12px] text-[#6B7280] dark:text-gray-400">
                  <span>Tax</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#9CA3AF]">+</span>
                    <input 
                      type="number" 
                      value={taxRate} 
                      onChange={e => setTaxRate(Number(e.target.value))} 
                      className="w-16 bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-lg px-2 py-1 text-right text-[12px] font-bold text-[#F59E0B] outline-none focus:border-[#F59E0B]"
                    />
                    <span className="text-[#9CA3AF]">%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t border-[#E5E7EB] dark:border-white/10">
                  <span className="text-[14px] font-black text-[#111827] dark:text-white">Final Total</span>
                  <div className="text-right">
                    <div className="text-[18px] font-black text-[#4F46E5]">₨{total.toLocaleString()}</div>
                    <div className="flex gap-2 justify-end mt-0.5">
                      {discountAmount > 0 && <span className="text-[10px] text-[#22C55E] font-bold">Saved ₨{discountAmount.toLocaleString()}</span>}
                      {taxAmount > 0 && <span className="text-[10px] text-[#F59E0B] font-bold">+₨{taxAmount.toLocaleString()} Tax</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contract Details */}
          <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#F3F4F6] dark:border-white/5 bg-[#F8FAFC] dark:bg-white/2">
              <div className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest">Contract Details</div>
            </div>
            <div className="p-5 space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#374151] dark:text-gray-300 flex justify-between">
                  Expected Deliverables
                </label>
                <textarea 
                  value={deliverables}
                  onChange={(e) => setDeliverables(e.target.value)}
                  placeholder="List the final deliverables here..."
                  className="w-full bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl px-4 py-3 text-[12px] text-[#111827] dark:text-white outline-none focus:border-[#4F46E5] transition-colors min-h-[80px] resize-y"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#374151] dark:text-gray-300 flex justify-between">
                  Payment Milestones
                </label>
                <textarea 
                  value={paymentSteps}
                  onChange={(e) => setPaymentSteps(e.target.value)}
                  placeholder="Define payment steps..."
                  className="w-full bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl px-4 py-3 text-[12px] text-[#111827] dark:text-white outline-none focus:border-[#4F46E5] transition-colors min-h-[80px] resize-y"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#374151] dark:text-gray-300 flex justify-between">
                  Terms & Conditions
                </label>
                <textarea 
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  placeholder="Add any specific terms or conditions..."
                  className="w-full bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl px-4 py-3 text-[12px] text-[#111827] dark:text-white outline-none focus:border-[#4F46E5] transition-colors min-h-[120px] resize-y"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
