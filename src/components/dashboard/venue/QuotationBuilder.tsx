"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Plus, Trash2, Calculator, Save, Send, Users, 
  CalendarDays, MapPin, Search, ChevronDown, CheckCircle2,
  FileText, ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type LineItem = {
  id: string | number
  productId?: string
  name: string
  pricingType: "per_head" | "fixed" | string
  price: number
  quantity: number // if fixed, usually 1. If per_head, it mirrors guestCount but can be overridden.
}

export function QuotationBuilder() {
  const [quotationId] = useState(() => `QT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`)
  const [clientName, setClientName] = useState("Ahmed Raza")
  const [eventType, setEventType] = useState("Wedding (Valima)")
  const [eventDate, setEventDate] = useState("2026-10-15")
  const [guestCount, setGuestCount] = useState(450)

  const [items, setItems] = useState<LineItem[]>([
    { id: "1", productId: "p1", name: "Grand Hall Venue", pricingType: "fixed", price: 150000, quantity: 1 },
    { id: "2", productId: "p2", name: "Premium Buffet (Chicken)", pricingType: "per_head", price: 2500, quantity: 1 },
    { id: "3", productId: "custom", name: "Floral Stage Decor (Premium)", pricingType: "fixed", price: 85000, quantity: 1 },
  ])

  const [products, setProducts] = useState([
    { id: "p1", name: "Grand Hall Venue", type: "fixed", price: 150000 },
    { id: "p2", name: "Premium Buffet (Chicken)", type: "per_head", price: 2500 },
    { id: "p3", name: "Standard Buffet (Mutton)", type: "per_head", price: 3500 },
    { id: "p4", name: "Basic Floral Decor", type: "fixed", price: 50000 },
    { id: "p5", name: "DJ & Sound System", type: "fixed", price: 30000 },
  ])

  const [showAddProduct, setShowAddProduct] = useState(false)
  const [activeItemIdForNewProduct, setActiveItemIdForNewProduct] = useState<string | number | null>(null)
  const [newProductData, setNewProductData] = useState({ name: "", type: "fixed", price: 0 })

  const [discount, setDiscount] = useState(0) // Flat discount
  const [taxRate, setTaxRate] = useState(0.05) // 5% PRA Tax

  const handleGuestCountChange = (newCount: number) => {
    setGuestCount(newCount)
    setItems(items.map(item => 
      item.pricingType === "per_head" ? { ...item, quantity: newCount } : item
    ))
  }

  // Derived state
  const subtotal = items.reduce((acc, item) => {
    const qty = item.quantity
    return acc + (item.price * qty)
  }, 0)

  const taxAmount = (subtotal - discount) * taxRate
  const grandTotal = subtotal - discount + taxAmount
  const advanceRequired = grandTotal * 0.2 // 20% standard advance

  const handleAddItem = () => {
    setItems([...items, { 
      id: Date.now(), 
      productId: "custom",
      name: "", 
      pricingType: "fixed", 
      price: 0, 
      quantity: 1 
    }])
  }

  const handleRemoveItem = (id: string | number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleUpdateItem = (id: string | number, field: string, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item))
  }

  const handleProductSelect = (itemId: string | number, productId: string) => {
    if (productId === "add_new") {
      setActiveItemIdForNewProduct(itemId)
      setShowAddProduct(true)
      return
    }
    if (productId === "custom") {
      setItems(items.map(item => item.id === itemId ? { ...item, productId: "custom", name: "" } : item))
      return
    }
    const product = products.find(p => p.id === productId)
    if (product) {
      setItems(items.map(item => item.id === itemId ? {
        ...item,
        productId: product.id,
        name: product.name,
        pricingType: product.type,
        price: product.price,
        quantity: product.type === "per_head" ? guestCount : 1
      } : item))
    }
  }

  const handleSaveNewProduct = () => {
    const newProd = {
      id: `p${Date.now()}`,
      name: newProductData.name,
      type: newProductData.type,
      price: newProductData.price
    }
    setProducts([...products, newProd])
    
    // Auto-select this product for the line item that initiated it
    if (activeItemIdForNewProduct) {
      setItems(items.map(item => item.id === activeItemIdForNewProduct ? {
        ...item,
        productId: newProd.id,
        name: newProd.name,
        pricingType: newProd.type,
        price: newProd.price,
        quantity: newProd.type === "per_head" ? guestCount : 1
      } : item))
    }
    
    setShowAddProduct(false)
    setNewProductData({ name: "", type: "fixed", price: 0 })
    setActiveItemIdForNewProduct(null)
  }

  const [showPreview, setShowPreview] = useState(false)

  const handlePrint = () => {
    window.print()
  }

  const handleWhatsAppShare = () => {
    const text = `Hi ${clientName},\n\nHere is your quotation for ${eventType} on ${new Date(eventDate).toLocaleDateString()}.\n\nGrand Total: PKR ${grandTotal.toLocaleString()}\nAdvance Required: PKR ${advanceRequired.toLocaleString()}\n\nLooking forward to hosting your event at Royal Palace!\n\nBest,\nRoyal Palace Management`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  const [leads, setLeads] = useState([
    { id: "l1", name: "Ahmed Raza", type: "Wedding (Valima)", date: "2026-10-15", guests: 450 },
    { id: "l2", name: "Fatima Ali", type: "Mehndi", date: "2026-11-02", guests: 300 },
    { id: "l3", name: "TechCorp", type: "Corporate Seminar", date: "2026-09-20", guests: 150 },
    { id: "l4", name: "Zara Khan", type: "Birthday Party", date: "2026-09-12", guests: 80 }
  ])

  const handleAutoFill = (leadId: string) => {
    if (leadId === "add_new") {
      window.open('/dashboard/vendor/leads/new', '_blank')
      return
    }
    
    if (leadId === "new") {
      setClientName("")
      setEventType("")
      setEventDate("")
      setGuestCount(0)
      return
    }
    
    const lead = leads.find(l => l.id === leadId)
    if (lead) {
      setClientName(lead.name)
      setEventType(lead.type)
      setEventDate(lead.date)
      handleGuestCountChange(lead.guests)
    }
  }


  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50 p-6 lg:p-8 relative">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <nav className="flex items-center text-xs font-bold text-slate-400 gap-2 mb-3">
              <Link href="/dashboard/vendor" className="hover:text-primary transition-colors">Dashboard</Link>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <Link href="/dashboard/vendor" className="hover:text-primary transition-colors">Quotations</Link>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span className="text-slate-900">New Quotation</span>
            </nav>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">New Quotation</h1>
              <span className="text-xs font-black text-slate-500 bg-slate-200/50 px-2.5 py-1 rounded-md tracking-wider">{quotationId}</span>
            </div>
            <p className="text-slate-500 font-medium text-sm">Build a proposal and send it to your client instantly.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white border-border shadow-sm font-bold">
              <Save className="w-4 h-4 mr-2" /> Save Draft
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-sm font-bold" onClick={() => setShowPreview(true)}>
              <FileText className="w-4 h-4 mr-2" /> Preview & Share
            </Button>
          </div>
        </div>

        {/* Client & Event Info */}
        <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h2 className="font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" /> Client & Event Details
            </h2>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select 
                className="w-full sm:w-64 h-9 px-3 rounded-md border border-slate-200 bg-slate-50 text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/20"
                onChange={(e) => handleAutoFill(e.target.value)}
                value={leads.find(l => l.name === clientName)?.id || "new"}
              >
                <option value="new">-- Enter Details Manually --</option>
                <option value="add_new">+ Add New Contact</option>
                <optgroup label="Active Leads">
                  {leads.map(lead => (
                    <option key={lead.id} value={lead.id}>{lead.name} ({lead.type})</option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Client Name</label>
              <input 
                type="text" 
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Event Type</label>
              <input 
                type="text" 
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Event Date</label>
              <input 
                type="date" 
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium text-slate-700"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Guaranteed Guest Count</label>
              <input 
                type="number" 
                value={guestCount}
                onChange={(e) => handleGuestCountChange(Number(e.target.value))}
                className="w-full h-10 px-3 rounded-lg border border-border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-bold text-primary"
              />
            </div>
          </div>
        </div>

        {/* Line Items Engine */}
        <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" /> Line Items
            </h2>
            <Button size="sm" variant="outline" className="h-8 border-dashed" onClick={handleAddItem}>
              <Plus className="w-4 h-4 mr-1" /> Add Blank Row
            </Button>
          </div>

          <div className="space-y-4">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 text-xs font-bold text-slate-500 px-2">
              <div className="col-span-5">PRODUCT / SERVICE</div>
              <div className="col-span-2">PRICING</div>
              <div className="col-span-2">QTY</div>
              <div className="col-span-2 text-right">AMOUNT</div>
              <div className="col-span-1"></div>
            </div>

            {/* Items List */}
            {items.map((item, idx) => {
              const isPerHead = item.pricingType === "per_head"
              const qty = item.quantity
              const lineTotal = item.price * qty

              return (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={item.id} 
                  className="grid grid-cols-12 gap-4 items-start bg-slate-50 p-2 rounded-xl border border-slate-100 group"
                >
                  <div className="col-span-5 flex flex-col">
                    <select 
                      value={item.productId || "custom"}
                      onChange={(e) => handleProductSelect(item.id, e.target.value)}
                      className="w-full bg-transparent border-none focus:outline-none focus:ring-0 font-bold text-sm text-slate-900 truncate cursor-pointer"
                    >
                      <option value="custom">-- Custom Item --</option>
                      <option value="add_new">+ Add New Product/Service</option>
                      <optgroup label="Products & Services">
                        {products.map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </optgroup>
                    </select>
                    {item.productId === "custom" && (
                      <input 
                        type="text" 
                        value={item.name}
                        onChange={(e) => handleUpdateItem(item.id, "name", e.target.value)}
                        className="w-full mt-1 bg-white px-2 py-1.5 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary/20 shadow-sm"
                        placeholder="Type Custom Description..."
                      />
                    )}
                  </div>
                  
                  <div className="col-span-2">
                    <select 
                      value={item.pricingType}
                      onChange={(e) => {
                        handleUpdateItem(item.id, "pricingType", e.target.value)
                        if (e.target.value === "per_head") {
                          handleUpdateItem(item.id, "quantity", guestCount)
                        } else {
                          handleUpdateItem(item.id, "quantity", 1)
                        }
                      }}
                      className="w-full bg-transparent text-xs font-bold text-slate-500 focus:outline-none cursor-pointer mb-1"
                    >
                      <option value="fixed">Fixed</option>
                      <option value="per_head">Per Head</option>
                    </select>
                    <div className="flex items-center">
                      <span className="text-xs text-slate-400 mr-1">Rs</span>
                      <input 
                        type="number" 
                        value={item.price || ""}
                        onChange={(e) => handleUpdateItem(item.id, "price", Number(e.target.value))}
                        className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-xs font-bold text-slate-900 p-0 h-auto"
                      />
                    </div>
                  </div>

                  <div className="col-span-2 mt-1 flex items-center gap-1">
                    <input 
                      type="number" 
                      value={item.quantity || ""}
                      onChange={(e) => handleUpdateItem(item.id, "quantity", Number(e.target.value))}
                      className="w-16 px-2 py-1 bg-white border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs font-bold text-center"
                    />
                    {isPerHead && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pax</span>}
                  </div>

                  <div className="col-span-2 text-right font-black text-slate-900 text-sm mt-1">
                    {lineTotal.toLocaleString()}
                  </div>

                  <div className="col-span-1 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50" onClick={() => handleRemoveItem(item.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Subtotal & Financials */}
          <div className="mt-8 pt-6 border-t border-dashed border-border flex justify-end">
            <div className="w-full max-w-sm space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-500">Subtotal</span>
                <span className="font-bold text-slate-900">PKR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-500">Discount (Flat)</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">PKR</span>
                  <input 
                    type="number" 
                    value={discount || ""}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="w-24 px-2 py-1 bg-slate-50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-right font-bold text-red-600"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-500">PRA Tax ({(taxRate * 100).toFixed(0)}%)</span>
                <span className="font-bold text-slate-900">PKR {taxAmount.toLocaleString()}</span>
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                <span className="font-black text-slate-900 text-lg">Grand Total</span>
                <span className="font-black text-primary text-xl">PKR {grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* PREVIEW MODAL overlay */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-slate-200 w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative print:p-0 print:bg-white print:max-w-none print:h-auto print:max-h-none print:rounded-none">
            
            {/* Modal Header Actions (Hidden when printing) */}
            <div className="bg-white border-b border-slate-200 p-4 flex justify-between items-center print:hidden z-10 shadow-sm">
              <h3 className="font-bold text-slate-900">Quotation Preview</h3>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={handlePrint} className="font-bold">
                  Print / PDF
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold" onClick={handleWhatsAppShare}>
                  <Send className="w-4 h-4 mr-2" /> Share via WhatsApp
                </Button>
                <button onClick={() => setShowPreview(false)} className="ml-2 p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700">
                  <Plus className="w-5 h-5 rotate-45" />
                </button>
              </div>
            </div>

            {/* The Proposal Document */}
            <div className="overflow-y-auto p-8 print:overflow-visible print:p-0 flex justify-center">
              <div className="bg-white w-full max-w-lg min-h-[800px] shadow-sm border border-slate-100 print:shadow-none print:border-none relative p-10 font-serif mx-auto">
                
                {/* Header */}
                <div className="text-center mb-12 relative">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight font-sans">ROYAL PALACE</h2>
                  <p className="text-slate-500 text-sm italic mt-1">Event Proposal & Estimate</p>
                  <div className="absolute top-0 right-0 text-right">
                    <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-0.5">Quotation #</p>
                    <p className="font-bold text-slate-900 font-sans text-sm">{quotationId}</p>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex justify-between text-sm mb-12 pb-6 border-b border-slate-200">
                  <div>
                    <p className="text-slate-400 text-xs font-sans font-bold tracking-widest uppercase mb-1">Prepared For</p>
                    <p className="font-bold text-slate-900 font-sans">{clientName || "Client Name"}</p>
                    <p className="text-slate-600 mt-1">{eventType}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400 text-xs font-sans font-bold tracking-widest uppercase mb-1">Event Details</p>
                    <p className="font-bold text-slate-900 font-sans">{new Date(eventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'})}</p>
                    <p className="text-slate-600 mt-1">{guestCount} Guests Guaranteed</p>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-6 mb-12">
                  {items.map(item => {
                    const isPerHead = item.pricingType === "per_head"
                    const qty = item.quantity
                    const lineTotal = item.price * qty

                    return (
                      <div key={item.id} className="flex justify-between items-start group">
                        <div className="pr-4">
                          <h4 className="font-bold text-slate-900 font-sans text-sm">{item.name || "Untitled Item"}</h4>
                          <p className="text-slate-500 text-xs mt-1 font-sans">
                            {isPerHead 
                              ? `${qty} Guests @ Rs ${item.price.toLocaleString()}/head` 
                              : `${qty} Unit @ Rs ${item.price.toLocaleString()}/ea`}
                          </p>
                        </div>
                        <div className="font-bold text-slate-900 font-sans text-sm shrink-0">
                          Rs {lineTotal.toLocaleString()}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Totals */}
                <div className="border-t-2 border-slate-900 pt-6 space-y-3 font-sans text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>Rs {subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span>Discount</span>
                      <span>- Rs {discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Taxes (5%)</span>
                    <span>Rs {taxAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 mt-2 border-t border-slate-200">
                    <span className="font-black text-slate-900 text-lg">Total Estimate</span>
                    <span className="font-black text-slate-900 text-xl">Rs {grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Footer Note */}
                <div className="mt-16 pt-8 border-t border-slate-200 text-center">
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    To secure your booking for {new Date(eventDate).toLocaleDateString()}, an advance payment of <strong className="text-slate-900">Rs {advanceRequired.toLocaleString()}</strong> is required. 
                    This quote is valid for 7 days.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL overlay */}
      {showAddProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
            <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Add Product / Service</h3>
              <button onClick={() => { setShowAddProduct(false); setActiveItemIdForNewProduct(null) }} className="p-2 hover:bg-slate-200 rounded-full text-slate-500">
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Service/Product Name</label>
                <input 
                  type="text" 
                  value={newProductData.name}
                  onChange={(e) => setNewProductData({...newProductData, name: e.target.value})}
                  className="w-full h-10 px-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                  placeholder="e.g. Photography Package"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Pricing Model</label>
                  <select 
                    value={newProductData.type}
                    onChange={(e) => setNewProductData({...newProductData, type: e.target.value as "fixed" | "per_head"})}
                    className="w-full h-10 px-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium bg-white"
                  >
                    <option value="fixed">Fixed Price</option>
                    <option value="per_head">Per Head / Per Unit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Default Price (Rs)</label>
                  <input 
                    type="number" 
                    value={newProductData.price || ""}
                    onChange={(e) => setNewProductData({...newProductData, price: Number(e.target.value)})}
                    className="w-full h-10 px-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => { setShowAddProduct(false); setActiveItemIdForNewProduct(null) }}>Cancel</Button>
              <Button onClick={handleSaveNewProduct}>Save & Apply</Button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
