"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  CalendarCheck, CalendarDays, Search, Plus, 
  Download, FileText, ChevronRight, Share2, Loader2,
  X, Banknote, MapPin, User, Clock, Phone, Mail, Building2, Printer
} from "lucide-react"
import { Button } from "@/components/ui/button"

// --- Types & Initial Data ---
type BookingStatus = "Confirmed" | "Pending Payment" | "Tentative" | "Cancelled"

interface Booking {
  id: string
  customerName: string
  phone: string
  email: string
  date: string
  time: string
  space: string
  eventType: string
  guests: number
  status: BookingStatus
  totalAmount: number
  paidAmount: number
  createdAt: string
}

const initialBookings: Booking[] = [
  {
    id: "BKG-2026-0128",
    customerName: "Sarah Ahmed",
    phone: "+92 300 1234567",
    email: "sarah@example.com",
    date: "Dec 15, 2026",
    time: "18:00 - 23:30",
    space: "Grand Ballroom",
    eventType: "Wedding Reception",
    guests: 500,
    status: "Confirmed",
    totalAmount: 1575000,
    paidAmount: 500000,
    createdAt: "Nov 01, 2026"
  },
  {
    id: "BKG-2026-0129",
    customerName: "Ali Khan",
    phone: "+92 321 7654321",
    email: "ali@example.com",
    date: "Dec 20, 2026",
    time: "19:00 - 23:00",
    space: "Royal Marquee",
    eventType: "Corporate Dinner",
    guests: 300,
    status: "Pending Payment",
    totalAmount: 950000,
    paidAmount: 0,
    createdAt: "Nov 10, 2026"
  },
  {
    id: "BKG-2026-0130",
    customerName: "Fatima Noor",
    phone: "+92 333 9876543",
    email: "fatima@example.com",
    date: "Jan 05, 2027",
    time: "12:00 - 16:00",
    space: "Garden Pavilion",
    eventType: "Engagement",
    guests: 150,
    status: "Tentative",
    totalAmount: 450000,
    paidAmount: 0,
    createdAt: "Nov 25, 2026"
  },
  {
    id: "BKG-2026-0131",
    customerName: "Usman Tariq",
    phone: "+92 345 1122334",
    email: "usman@example.com",
    date: "Oct 10, 2026",
    time: "19:00 - 23:30",
    space: "Grand Ballroom",
    eventType: "Wedding Reception",
    guests: 450,
    status: "Cancelled",
    totalAmount: 1400000,
    paidAmount: 200000,
    createdAt: "Sep 01, 2026"
  }
]

// --- Helper Functions ---
const getStatusStyles = (status: BookingStatus) => {
  switch (status) {
    case "Confirmed": return "bg-emerald-100 text-emerald-700 border-emerald-200"
    case "Pending Payment": return "bg-amber-100 text-amber-700 border-amber-200"
    case "Tentative": return "bg-blue-100 text-blue-700 border-blue-200"
    case "Cancelled": return "bg-red-100 text-red-700 border-red-200"
    default: return "bg-slate-100 text-slate-700 border-slate-200"
  }
}

const formatCurrency = (amount: number) => {
  return 'Rs: ' + new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(amount);}

export function BookingsView() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings)
  const [activeTab, setActiveTab] = useState<"All" | BookingStatus>("All")
  const [searchQuery, setSearchQuery] = useState("")
  
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false)
  const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  // Invoice Designer State (Synced from Settings)
  const [designerTheme, setDesignerTheme] = useState("modern")
  const [designerColor, setDesignerColor] = useState("bg-slate-900")
  const [designerFont, setDesignerFont] = useState("font-sans")
  const [designerTableStyle, setDesignerTableStyle] = useState("lines")
  const [designerShowFooter, setDesignerShowFooter] = useState(true)
  const [designerFooterText, setDesignerFooterText] = useState("Royal Palace Banquet | 123 Main Blvd, Gulberg III, Lahore\nNTN: 8492041-9 | bookings@royalpalace.pk")

  useEffect(() => {
    // Load invoice settings if available
    const saved = localStorage.getItem('invoiceSettings')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setDesignerTheme(parsed.designerTheme || "modern")
        setDesignerColor(parsed.designerColor || "bg-slate-900")
        setDesignerFont(parsed.designerFont || "font-sans")
        setDesignerTableStyle(parsed.designerTableStyle || "lines")
        setDesignerShowFooter(parsed.designerShowFooter ?? true)
        setDesignerFooterText(parsed.designerFooterText || "Royal Palace Banquet | 123 Main Blvd, Gulberg III, Lahore\nNTN: 8492041-9 | bookings@royalpalace.pk")
      } catch (e) {}
    }
  }, [])


  // Form states for new booking
  const [newBookingData, setNewBookingData] = useState<Partial<Booking>>({
    customerName: "", phone: "", email: "", date: "", time: "18:00 - 23:00", 
    space: "Grand Ballroom", eventType: "Wedding Reception", guests: 100, 
    totalAmount: 500000, paidAmount: 0, status: "Tentative"
  })

  // Payment state
  const [paymentAmount, setPaymentAmount] = useState<number>(0)

  const filteredBookings = bookings.filter(b => {
    const matchesTab = activeTab === "All" || b.status === activeTab
    const matchesSearch = b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  // Customer Autocomplete Logic
  const existingCustomers = Array.from(new Map(bookings.map(b => [b.customerName, { name: b.customerName, phone: b.phone, email: b.email }])).values())
  const filteredCustomers = existingCustomers.filter(c => c.name.toLowerCase().includes((newBookingData.customerName || "").toLowerCase()))


  // --- PDF Viewer Actions ---
  const handlePrint = () => {
    window.print();
  }

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    // Simulate generation delay
    setTimeout(() => {
      setIsDownloading(false);
      // Fallback to print dialog for saving as PDF
      alert("In a real environment, this would generate a clean .pdf file using html2pdf.js or similar. Opening the print dialog so you can 'Save as PDF'.");
      window.print();
    }, 1500);
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Invoice ${selectedBooking?.id}`,
        text: `Here is the invoice for ${selectedBooking?.customerName}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Invoice link copied to clipboard!");
    }
  }

  const handleCreateBooking = () => {
    const newBooking: Booking = {
      id: `BKG-2026-0${132 + bookings.length}`,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: (newBookingData.paidAmount || 0) > 0 ? "Confirmed" : "Pending Payment",
      ...(newBookingData as Omit<Booking, 'id' | 'createdAt' | 'status'>)
    }
    setBookings([newBooking, ...bookings])
    setIsNewBookingModalOpen(false)
    setNewBookingData({
      customerName: "", phone: "", email: "", date: "", time: "18:00 - 23:00", 
      space: "Grand Ballroom", eventType: "Wedding Reception", guests: 100, 
      totalAmount: 500000, paidAmount: 0, status: "Tentative"
    })
  }

  const handleRecordPayment = () => {
    if (!selectedBooking) return
    const updatedBookings = bookings.map(b => {
      if (b.id === selectedBooking.id) {
        const newPaidAmount = b.paidAmount + Number(paymentAmount)
        const newStatus = newPaidAmount >= b.totalAmount ? "Confirmed" : b.status
        const updatedBooking = { ...b, paidAmount: newPaidAmount, status: newStatus }
        setSelectedBooking(updatedBooking) // Update slide-out panel state too
        return updatedBooking
      }
      return b
    })
    setBookings(updatedBookings)
    setIsPaymentModalOpen(false)
    setPaymentAmount(0)
  }

  const tabs = ["All", "Confirmed", "Pending Payment", "Tentative", "Cancelled"]

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 relative">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Bookings</h1>
          <p className="text-slate-500 font-medium mt-1">Manage all your upcoming and past events.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" className="font-bold border-slate-200 bg-white">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
          <Button className="font-bold w-full sm:w-auto" onClick={() => setIsNewBookingModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> New Booking
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total Upcoming</p>
          <div>
            <p className="text-2xl font-black text-slate-900">{formatCurrency(bookings.filter(b => b.status !== 'Cancelled').reduce((sum, b) => sum + b.totalAmount, 0))}</p>
            <p className="text-sm font-medium text-slate-500 mt-1">{bookings.length} Bookings</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Pending Payments</p>
          <div>
            <p className="text-2xl font-black text-amber-600">{formatCurrency(bookings.filter(b => b.status === "Pending Payment").reduce((sum, b) => sum + (b.totalAmount - b.paidAmount), 0))}</p>
            <p className="text-sm font-medium text-slate-500 mt-1">{bookings.filter(b => b.status === "Pending Payment").length} Bookings</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Tentative</p>
          <div>
            <p className="text-2xl font-black text-blue-600">{formatCurrency(bookings.filter(b => b.status === "Tentative").reduce((sum, b) => sum + b.totalAmount, 0))}</p>
            <p className="text-sm font-medium text-slate-500 mt-1">{bookings.filter(b => b.status === "Tentative").length} Bookings</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total Revenue Expected</p>
          <div>
            <p className="text-2xl font-black text-emerald-600">{formatCurrency(bookings.reduce((sum, b) => sum + (b.status !== 'Cancelled' ? b.totalAmount : 0), 0))}</p>
            <p className="text-sm font-medium text-slate-500 mt-1">All Active Bookings</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {/* Controls */}
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto hide-scrollbar pb-2 md:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                  activeTab === tab 
                    ? "bg-slate-900 text-white shadow-sm" 
                    : "text-slate-600 hover:bg-slate-200 bg-white border border-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search bookings..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white border-b border-slate-200">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Booking / Client</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date & Space</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Financials</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr 
                    key={booking.id} 
                    className="hover:bg-slate-50 transition-colors cursor-pointer group"
                    onClick={() => setSelectedBooking(booking)}
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{booking.customerName}</div>
                      <div className="text-xs font-medium text-primary mt-0.5">{booking.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-700 flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5 text-slate-400" /> {booking.date}</div>
                      <div className="text-xs text-slate-500 mt-1">{booking.space} • {booking.guests} Guests</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border ${getStatusStyles(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-bold text-slate-900">{formatCurrency(booking.totalAmount)}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        Due: {formatCurrency(booking.totalAmount - booking.paidAmount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button variant="ghost" size="icon" className="text-slate-400 group-hover:text-primary transition-colors">
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <CalendarCheck className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <p className="text-sm font-bold text-slate-900">No bookings found</p>
                    <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search query.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-out Detail Panel Overlay */}
      <AnimatePresence>
        {selectedBooking && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBooking(null)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col border-l border-slate-200"
            >
              <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50">
                <div>
                  <h2 className="text-xl font-black text-slate-900">{selectedBooking.id}</h2>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border mt-2 ${getStatusStyles(selectedBooking.status)}`}>
                    {selectedBooking.status}
                  </span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedBooking(null)} className="rounded-full bg-white border border-slate-200 hover:bg-slate-100 hover:text-slate-900">
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Client Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black">
                        {selectedBooking.customerName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{selectedBooking.customerName}</p>
                        <p className="text-xs text-slate-500">Created {selectedBooking.createdAt}</p>
                      </div>
                    </div>
                    <div className="pl-13 space-y-2 mt-2">
                      <a href={`tel:${selectedBooking.phone}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-primary transition-colors font-medium">
                        <Phone className="w-3.5 h-3.5" /> {selectedBooking.phone}
                      </a>
                      <a href={`mailto:${selectedBooking.email}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-primary transition-colors font-medium">
                        <Mail className="w-3.5 h-3.5" /> {selectedBooking.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Event Details</h3>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <CalendarDays className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Date & Time</p>
                        <p className="text-sm font-bold text-slate-900">{selectedBooking.date}</p>
                        <p className="text-xs text-slate-600 font-medium">{selectedBooking.time}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Venue Space</p>
                        <p className="text-sm font-bold text-slate-900">{selectedBooking.space}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Event Type & Guests</p>
                        <p className="text-sm font-bold text-slate-900">{selectedBooking.eventType}</p>
                        <p className="text-xs text-slate-600 font-medium">{selectedBooking.guests} Expected Guests</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Financial Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-slate-600">Total Amount</span>
                      <span className="font-bold text-slate-900">{formatCurrency(selectedBooking.totalAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-emerald-600">Amount Paid</span>
                      <span className="font-bold text-emerald-600">{formatCurrency(selectedBooking.paidAmount)}</span>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-sm">
                      <span className="font-bold text-slate-900">Balance Due</span>
                      <span className="font-black text-slate-900 text-lg">{formatCurrency(selectedBooking.totalAmount - selectedBooking.paidAmount)}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Panel Actions */}
              <div className="p-6 border-t border-slate-100 bg-white grid grid-cols-2 gap-3 shrink-0">
                <Button variant="outline" className="w-full font-bold text-sm" onClick={() => setIsInvoiceModalOpen(true)}>
                  <FileText className="w-4 h-4 mr-2" /> View Invoice
                </Button>
                <Button 
                  className="w-full font-bold text-sm bg-primary text-white hover:bg-primary/90" 
                  onClick={() => setIsPaymentModalOpen(true)}
                  disabled={selectedBooking.paidAmount >= selectedBooking.totalAmount}
                >
                  <Banknote className="w-4 h-4 mr-2" /> 
                  {selectedBooking.paidAmount >= selectedBooking.totalAmount ? "Fully Paid" : "Record Payment"}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MODALS */}

      {/* 1. New Booking Modal */}
      <AnimatePresence>
        {isNewBookingModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[80]" onClick={() => setIsNewBookingModalOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-[90] overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h2 className="text-xl font-black text-slate-900">New Booking</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsNewBookingModalOpen(false)} className="rounded-full bg-white border border-slate-200 hover:bg-slate-100 hover:text-slate-900">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="p-6 overflow-y-auto space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Client Details</h3>
                  </div>
                  <div className="relative">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Customer Name</label>
                    <input 
                      type="text" 
                      value={newBookingData.customerName} 
                      onChange={e => {
                        setNewBookingData({...newBookingData, customerName: e.target.value})
                        setIsCustomerDropdownOpen(true)
                      }}
                      onFocus={() => setIsCustomerDropdownOpen(true)}
                      onBlur={() => setTimeout(() => setIsCustomerDropdownOpen(false), 200)}
                      placeholder="Search or enter new..."
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" 
                    />
                    
                    <AnimatePresence>
                      {isCustomerDropdownOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 shadow-xl rounded-xl z-50 max-h-48 overflow-y-auto"
                        >
                          {filteredCustomers.length > 0 ? (
                            <>
                              {filteredCustomers.map(c => (
                                <div 
                                  key={c.name}
                                  className="p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0"
                                  onClick={() => {
                                    setNewBookingData({...newBookingData, customerName: c.name, phone: c.phone, email: c.email})
                                    setIsCustomerDropdownOpen(false)
                                  }}
                                >
                                  <div className="font-bold text-sm text-slate-900">{c.name}</div>
                                  <div className="text-xs text-slate-500">{c.phone} • {c.email}</div>
                                </div>
                              ))}
                              {!filteredCustomers.some(c => c.name.toLowerCase() === (newBookingData.customerName || "").toLowerCase()) && (newBookingData.customerName || "").trim() !== "" && (
                                <div 
                                  className="p-3 hover:bg-slate-50 cursor-pointer text-primary font-bold text-sm flex items-center gap-2 border-t border-slate-100 bg-primary/5"
                                  onClick={() => setIsCustomerDropdownOpen(false)}
                                >
                                  <Plus className="w-4 h-4" /> Add "{newBookingData.customerName}" as new customer
                                </div>
                              )}
                            </>
                          ) : (
                            (newBookingData.customerName || "").trim() !== "" ? (
                              <div 
                                className="p-3 hover:bg-slate-50 cursor-pointer text-primary font-bold text-sm flex items-center gap-2"
                                onClick={() => setIsCustomerDropdownOpen(false)}
                              >
                                <Plus className="w-4 h-4" /> Add "{newBookingData.customerName}" as new customer
                              </div>
                            ) : (
                              <div className="p-4 text-center text-sm text-slate-500">Type to search or add new</div>
                            )
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Phone Number</label>
                    <input type="text" value={newBookingData.phone} onChange={e => setNewBookingData({...newBookingData, phone: e.target.value})} className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Email Address</label>
                    <input type="email" value={newBookingData.email} onChange={e => setNewBookingData({...newBookingData, email: e.target.value})} className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                  </div>

                  <div className="md:col-span-2 mt-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Event Details</h3>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Date</label>
                    <input type="date" value={newBookingData.date} onChange={e => setNewBookingData({...newBookingData, date: e.target.value})} className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Time</label>
                    <input type="text" value={newBookingData.time} onChange={e => setNewBookingData({...newBookingData, time: e.target.value})} className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Venue Space</label>
                    <select value={newBookingData.space} onChange={e => setNewBookingData({...newBookingData, space: e.target.value})} className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium">
                      <option>Grand Ballroom</option>
                      <option>Royal Marquee</option>
                      <option>Garden Pavilion</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Event Type</label>
                    <input type="text" value={newBookingData.eventType} onChange={e => setNewBookingData({...newBookingData, eventType: e.target.value})} className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Expected Guests</label>
                    <input type="number" value={newBookingData.guests} onChange={e => setNewBookingData({...newBookingData, guests: Number(e.target.value)})} className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                  </div>

                  <div className="md:col-span-2 mt-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Financials</h3>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Total Amount (PKR)</label>
                    <input type="number" value={newBookingData.totalAmount} onChange={e => setNewBookingData({...newBookingData, totalAmount: Number(e.target.value)})} className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Initial Deposit Paid (PKR)</label>
                    <input type="number" value={newBookingData.paidAmount} onChange={e => setNewBookingData({...newBookingData, paidAmount: Number(e.target.value)})} className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                  </div>
                </div>

              </div>
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
                <Button variant="ghost" className="font-bold text-sm" onClick={() => setIsNewBookingModalOpen(false)}>Cancel</Button>
                <Button className="font-bold text-sm bg-primary text-white hover:bg-primary/90" onClick={handleCreateBooking}>
                  <Plus className="w-4 h-4 mr-2" /> Create Booking
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 2. Record Payment Modal */}
      <AnimatePresence>
        {isPaymentModalOpen && selectedBooking && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[80]" onClick={() => setIsPaymentModalOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-2xl shadow-2xl z-[90] overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h2 className="text-xl font-black text-slate-900">Record Payment</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsPaymentModalOpen(false)} className="rounded-full bg-white border border-slate-200 hover:bg-slate-100 hover:text-slate-900">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Balance Due</p>
                  <p className="text-3xl font-black text-slate-900">{formatCurrency(selectedBooking.totalAmount - selectedBooking.paidAmount)}</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Payment Amount (PKR)</label>
                  <input type="number" value={paymentAmount} onChange={e => setPaymentAmount(Number(e.target.value))} className="w-full h-14 px-4 text-xl rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-primary focus:ring-0 font-black" />
                </div>
              </div>
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex flex-col gap-3">
                <Button className="w-full h-12 font-bold text-sm bg-primary text-white hover:bg-primary/90" onClick={handleRecordPayment}>
                  Confirm Payment
                </Button>
                <Button variant="ghost" className="w-full font-bold text-sm" onClick={() => setIsPaymentModalOpen(false)}>Cancel</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 3. View Invoice Modal */}
      <AnimatePresence>
        {isInvoiceModalOpen && selectedBooking && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-[#323639] z-[100] flex flex-col h-screen w-screen"
            >
              {/* PDF Viewer Header */}
              <div className="h-14 bg-[#323639] border-b border-[#202124] flex items-center justify-between px-6 shrink-0 shadow-sm z-10 w-full">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#F40F02] flex items-center justify-center text-white font-bold text-[10px]">PDF</div>
                  <span className="text-slate-200 font-medium text-sm">{selectedBooking.id.replace('BKG', 'INV')}_RoyalPalace.pdf</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                  <Button variant="ghost" size="sm" onClick={handlePrint} className="text-slate-300 hover:text-white hover:bg-slate-700/50"><Printer className="w-4 h-4 sm:mr-2" /> <span className="hidden sm:inline">Print</span></Button>
                  <Button variant="ghost" size="sm" onClick={handleShare} className="text-slate-300 hover:text-white hover:bg-slate-700/50"><Share2 className="w-4 h-4 sm:mr-2" /> <span className="hidden sm:inline">Share</span></Button>
                  <Button variant="ghost" size="sm" onClick={handleDownloadPDF} disabled={isDownloading} className="text-slate-300 hover:text-white hover:bg-slate-700/50">
                    {isDownloading ? <Loader2 className="w-4 h-4 sm:mr-2 animate-spin" /> : <Download className="w-4 h-4 sm:mr-2" />} 
                    <span className="hidden sm:inline">{isDownloading ? 'Generating...' : 'Download'}</span>
                  </Button>
                  <div className="w-px h-6 bg-slate-600 mx-1 sm:mx-2"></div>
                  <Button variant="ghost" size="icon" onClick={() => setIsInvoiceModalOpen(false)} className="text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-full">
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              
              {/* PDF Viewer Body */}
              <div className="flex-1 overflow-y-auto bg-[#525659] p-8 flex justify-center items-start w-full custom-scrollbar">
                
                {/* Professional Invoice Paper */}
                <div className={`bg-white w-full max-w-[800px] shadow-2xl rounded-sm flex flex-col relative overflow-hidden my-4 min-h-[1100px] ${designerFont} ${designerTheme === "minimal" ? "shadow-sm border border-slate-200" : ""}`}>
                  
                  {/* Accent Top Bar */}
                  {designerTheme === "modern" && (
                    <div className={`h-4 w-full ${designerColor}`}></div>
                  )}
                  
                  <div className={`p-10 sm:p-14 flex-1 ${designerTheme === "elegant" ? "flex flex-col items-center text-center" : ""}`}>
                    {/* Header: Branding & Invoice Metadata */}
                    <div className={`flex flex-col w-full mb-12 gap-8 ${designerTheme === "elegant" ? "items-center" : designerTheme === "minimal" ? "md:flex-row-reverse justify-between items-start" : "md:flex-row justify-between items-start"}`}>
                      {/* Company Info */}
                      <div className={`flex flex-col ${designerTheme === "elegant" ? "items-center" : ""}`}>
                        <div className={`flex items-center gap-3 mb-4 ${designerTheme === "elegant" ? "flex-col" : ""}`}>
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${designerColor} bg-opacity-10 shadow-inner`}>
                            <Building2 className={`w-7 h-7 ${designerColor.replace('bg-', 'text-')}`} />
                          </div>
                          <div className={designerTheme === "elegant" ? "text-center" : ""}>
                            <h1 className={`text-2xl font-black tracking-tight leading-none ${designerTheme === "elegant" ? designerColor.replace('bg-', 'text-') : "text-slate-900"}`}>Royal Palace</h1>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Banquet & Marquee</p>
                          </div>
                        </div>
                        <div className={`text-sm text-slate-600 space-y-1 ${designerTheme === "elegant" ? "text-center" : ""}`}>
                          <p>123 Main Boulevard, Gulberg III</p>
                          <p>Lahore, Punjab 54000, Pakistan</p>
                          <p className="text-slate-400 mt-2">NTN: 1234567-8</p>
                        </div>
                      </div>
                      
                      {/* Invoice Details */}
                      <div className={`text-left ${designerTheme === "elegant" ? "text-center mt-6" : designerTheme === "minimal" ? "text-left" : "md:text-right"}`}>
                        <h2 className={`text-4xl font-black tracking-tighter mb-4 uppercase ${designerTheme === "elegant" ? designerColor.replace('bg-', 'text-') : "text-slate-200"}`}>Invoice</h2>
                        <div className={`grid grid-cols-2 gap-x-8 gap-y-2 text-sm ${designerTheme === "elegant" ? "text-center justify-items-center" : designerTheme === "minimal" ? "text-left" : "text-right"}`}>
                          <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Invoice No</span>
                          <span className="font-bold text-slate-900">{selectedBooking.id.replace('BKG', 'INV')}</span>
                          
                          <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Date of Issue</span>
                          <span className="font-bold text-slate-900">{selectedBooking.createdAt}</span>
                          
                          <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Due Date</span>
                          <span className="font-bold text-slate-900">{selectedBooking.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-slate-100 mb-10"></div>

                    {/* Client & Event Info */}
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 mb-12 w-full`}>
                      {/* Billed To */}
                      <div className={designerTheme === "elegant" ? "text-center" : ""}>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Billed To</p>
                        <p className="text-lg font-black text-slate-900">{selectedBooking.customerName}</p>
                        <div className="text-sm text-slate-600 space-y-1 mt-2">
                          <p>{selectedBooking.phone}</p>
                          <p>{selectedBooking.email}</p>
                        </div>
                      </div>
                      {/* Event Details */}
                      <div className={`${designerTheme === "elegant" ? "text-center" : "md:bg-slate-50 md:p-6 md:rounded-xl md:border md:border-slate-100"}`}>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Event Details</p>
                        <div className="space-y-2 text-sm">
                          <div className={`flex ${designerTheme === "elegant" ? "justify-center gap-4" : "justify-between"}`}>
                            <span className="text-slate-500">Booking Ref</span>
                            <span className="font-bold text-slate-900">{selectedBooking.id}</span>
                          </div>
                          <div className={`flex ${designerTheme === "elegant" ? "justify-center gap-4" : "justify-between"}`}>
                            <span className="text-slate-500">Date & Time</span>
                            <span className="font-bold text-slate-900">{selectedBooking.date} • {selectedBooking.time.split(' - ')[0]}</span>
                          </div>
                          <div className={`flex ${designerTheme === "elegant" ? "justify-center gap-4" : "justify-between"}`}>
                            <span className="text-slate-500">Venue Space</span>
                            <span className="font-bold text-slate-900">{selectedBooking.space}</span>
                          </div>
                          <div className={`flex ${designerTheme === "elegant" ? "justify-center gap-4" : "justify-between"}`}>
                            <span className="text-slate-500">Expected Guests</span>
                            <span className="font-bold text-slate-900">{selectedBooking.guests} PAX</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Line Items Table */}
                    <div className={`mb-8 w-full ${designerTableStyle === "boxed" ? "border-2 border-slate-200 rounded-xl" : designerTableStyle === "grid" ? "border border-slate-200 rounded-sm" : "rounded-xl overflow-hidden"}`}>
                      <table className={`w-full text-left border-collapse ${designerTableStyle === "boxed" ? "border-2 border-slate-200" : ""} ${designerTableStyle === "grid" ? "border border-slate-200" : ""}`}>
                        <thead>
                          <tr className={`
                            ${designerTableStyle === "lines" || designerTableStyle === "boxed" ? "border-b border-slate-200" : ""}
                            ${designerTableStyle === "grid" ? "border-b border-slate-200 bg-slate-50" : "bg-slate-50"}
                            ${designerTheme === "minimal" && designerTableStyle === "lines" ? "border-transparent text-slate-400 bg-transparent" : "text-slate-600"} 
                          `}>
                            <th className={`py-3 px-4 text-[10px] font-black uppercase tracking-widest w-1/2 ${designerTableStyle === "grid" || designerTableStyle === "boxed" ? "border-r border-slate-200" : ""}`}>Description</th>
                            <th className={`py-3 px-4 text-[10px] font-black uppercase tracking-widest text-center ${designerTableStyle === "grid" || designerTableStyle === "boxed" ? "border-r border-slate-200" : ""}`}>Qty</th>
                            <th className={`py-3 px-4 text-[10px] font-black uppercase tracking-widest text-right ${designerTableStyle === "grid" || designerTableStyle === "boxed" ? "border-r border-slate-200" : ""}`}>Rate</th>
                            <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody className={`${designerTableStyle === "lines" ? "divide-y divide-slate-100" : ""}`}>
                          {/* Mock line items calculated from total */}
                          <tr className={`${designerTableStyle === "grid" || designerTableStyle === "boxed" ? "border-b border-slate-200" : ""}`}>
                            <td className={`py-4 px-4 ${designerTableStyle === "grid" || designerTableStyle === "boxed" ? "border-r border-slate-200" : ""}`}>
                              <p className="font-bold text-slate-900 text-sm">{selectedBooking.space} Rental</p>
                              <p className="text-xs text-slate-500 mt-1">Exclusive use of the venue space for 5 hours</p>
                            </td>
                            <td className={`py-4 px-4 text-center text-sm font-medium text-slate-700 ${designerTableStyle === "grid" || designerTableStyle === "boxed" ? "border-r border-slate-200" : ""}`}>1</td>
                            <td className={`py-4 px-4 text-right text-sm font-medium text-slate-700 ${designerTableStyle === "grid" || designerTableStyle === "boxed" ? "border-r border-slate-200" : ""}`}>{formatCurrency(selectedBooking.totalAmount * 0.4)}</td>
                            <td className="py-4 px-4 text-right font-bold text-slate-900">{formatCurrency(selectedBooking.totalAmount * 0.4)}</td>
                          </tr>
                          <tr className={`${designerTableStyle === "grid" || designerTableStyle === "boxed" ? "border-b border-slate-200" : ""}`}>
                            <td className={`py-4 px-4 ${designerTableStyle === "grid" || designerTableStyle === "boxed" ? "border-r border-slate-200" : ""}`}>
                              <p className="font-bold text-slate-900 text-sm">{selectedBooking.eventType} Catering Package</p>
                              <p className="text-xs text-slate-500 mt-1">Standard menu, seated dinner service</p>
                            </td>
                            <td className={`py-4 px-4 text-center text-sm font-medium text-slate-700 ${designerTableStyle === "grid" || designerTableStyle === "boxed" ? "border-r border-slate-200" : ""}`}>{selectedBooking.guests}</td>
                            <td className={`py-4 px-4 text-right text-sm font-medium text-slate-700 ${designerTableStyle === "grid" || designerTableStyle === "boxed" ? "border-r border-slate-200" : ""}`}>{formatCurrency((selectedBooking.totalAmount * 0.5) / selectedBooking.guests)}</td>
                            <td className="py-4 px-4 text-right font-bold text-slate-900">{formatCurrency(selectedBooking.totalAmount * 0.5)}</td>
                          </tr>
                          <tr className={`${designerTableStyle === "grid" || designerTableStyle === "boxed" ? "border-b border-slate-200" : ""}`}>
                            <td className={`py-4 px-4 ${designerTableStyle === "grid" || designerTableStyle === "boxed" ? "border-r border-slate-200" : ""}`}>
                              <p className="font-bold text-slate-900 text-sm">Basic Decor & Setup</p>
                              <p className="text-xs text-slate-500 mt-1">Stage, lighting, and standard seating arrangements</p>
                            </td>
                            <td className={`py-4 px-4 text-center text-sm font-medium text-slate-700 ${designerTableStyle === "grid" || designerTableStyle === "boxed" ? "border-r border-slate-200" : ""}`}>1</td>
                            <td className={`py-4 px-4 text-right text-sm font-medium text-slate-700 ${designerTableStyle === "grid" || designerTableStyle === "boxed" ? "border-r border-slate-200" : ""}`}>{formatCurrency(selectedBooking.totalAmount * 0.1)}</td>
                            <td className="py-4 px-4 text-right font-bold text-slate-900">{formatCurrency(selectedBooking.totalAmount * 0.1)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Financial Summary Area */}
                    <div className={`flex flex-col md:flex-row items-start w-full ${designerTheme === "elegant" ? "justify-center" : "justify-between"}`}>
                      
                      {/* Payment Info / Notes */}
                      {designerTheme !== "elegant" && (
                        <div className="w-full md:w-1/2 mb-8 md:mb-0 pr-0 md:pr-8">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Payment Terms</p>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Please make all checks payable to <strong>Royal Palace Banquet</strong>. 
                            Bank transfer available: IBAN PK35 MEZN 0000 0000 0000. 
                            <br/><br/>
                            50% deposit required to confirm booking. Balance due 7 days prior to the event date.
                          </p>
                        </div>
                      )}

                      {/* Totals Box */}
                      <div className={`w-full ${designerTheme === "elegant" ? "md:w-2/3 border-t border-slate-200 pt-6" : "md:w-80 bg-slate-50 rounded-xl p-6 border border-slate-200"}`}>
                        <div className="space-y-3">
                          <div className={`flex justify-between text-sm ${designerTheme === "elegant" ? "px-4" : ""}`}>
                            <span className="font-bold text-slate-500">Subtotal</span>
                            <span className="font-bold text-slate-900">{formatCurrency(selectedBooking.totalAmount * 0.84)}</span>
                          </div>
                          <div className={`flex justify-between text-sm ${designerTheme === "elegant" ? "px-4" : ""}`}>
                            <span className="font-bold text-slate-500">GST (16%)</span>
                            <span className="font-bold text-slate-900">{formatCurrency(selectedBooking.totalAmount * 0.16)}</span>
                          </div>
                          
                          <div className={`pt-3 flex justify-between text-base ${designerTheme === "elegant" ? "px-4 border-t border-slate-100" : "border-t border-slate-200"}`}>
                            <span className={`font-black ${designerTheme === "elegant" ? designerColor.replace('bg-', 'text-') : "text-slate-900"}`}>Total</span>
                            <span className={`font-black ${designerTheme === "elegant" ? designerColor.replace('bg-', 'text-') : "text-slate-900"}`}>{formatCurrency(selectedBooking.totalAmount)}</span>
                          </div>
                          
                          <div className={`flex justify-between text-sm ${designerTheme === "elegant" ? "px-4" : ""}`}>
                            <span className="font-bold text-emerald-600">Amount Paid</span>
                            <span className="font-black text-emerald-600">-{formatCurrency(selectedBooking.paidAmount)}</span>
                          </div>
                          
                          <div className={`pt-3 mt-3 flex justify-between items-center text-xl ${designerTheme === "elegant" ? "px-4 border-t-2 border-slate-100" : "border-t-2 border-slate-900"}`}>
                            <span className="font-black text-slate-900">Balance Due</span>
                            <span className="font-black text-slate-900 bg-amber-100 text-amber-800 px-2 py-1 rounded-md">{formatCurrency(selectedBooking.totalAmount - selectedBooking.paidAmount)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer / Thank You */}
                    {designerShowFooter ? (
                      <div className={`mt-16 pt-8 border-t border-slate-100 text-center w-full`}>
                        <p className="text-slate-400 text-xs whitespace-pre-line leading-relaxed">{designerFooterText}</p>
                      </div>
                    ) : (
                      <div className={`mt-16 pt-8 border-t border-slate-100 text-center w-full`}>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Thank you for choosing Royal Palace Banquet!</p>
                      </div>
                    )}

                    {/* PAID Stamp */}
                    {selectedBooking.paidAmount >= selectedBooking.totalAmount && (
                      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -rotate-12 border-[6px] border-emerald-500 text-emerald-500 text-7xl font-black uppercase tracking-widest px-10 py-6 opacity-15 pointer-events-none z-10 rounded-xl">
                        PAID IN FULL
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  )
}
