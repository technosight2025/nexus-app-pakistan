"use client"

import React, { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { 
  FileText, Plus, Filter, Calculator, Printer, Send, Copy, 
  Check, Package, Receipt, Wallet, Sparkles, DollarSign, 
  Trash2, ChevronDown, CheckCircle, Info
} from "lucide-react"

function SalesQuotesContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") || "quotes"

  const setTab = (tab: string) => {
    router.push(`/business/venues/quotes?tab=${tab}`)
  }

  // Interactive Quote Builder States
  const [guests, setGuests] = useState(400)
  const [selectedHall, setSelectedHall] = useState("Grand Marquee")
  const [menuType, setMenuType] = useState("Chicken Single Dish")
  const [decorLevel, setDecorLevel] = useState("Premium Emerald Floral")
  
  const [extras, setExtras] = useState({
    sound: true,
    valet: false,
    ledWall: true
  })

  // Pricing rates mapping
  const hallPrices: Record<string, number> = { "Grand Marquee": 500000, "Crystal Hall": 250000, "Pearl Hall": 150000 }
  const menuPrices: Record<string, number> = { "Chicken Single Dish": 1500, "Mutton Single Dish": 2500, "Mutton & Chicken Royal": 3500 }
  const decorPrices: Record<string, number> = { "Minimalist": 50000, "Premium Emerald Floral": 150000, "Royal Gold Stage": 250000 }
  const extraPrices: Record<string, number> = { sound: 25000, valet: 30000, ledWall: 40000 }

  const calculateTotal = () => {
    const hallCost = hallPrices[selectedHall] || 0
    const cateringCost = (menuPrices[menuType] || 0) * guests
    const decorCost = decorPrices[decorLevel] || 0
    let extrasCost = 0
    if (extras.sound) extrasCost += extraPrices.sound
    if (extras.valet) extrasCost += extraPrices.valet
    if (extras.ledWall) extrasCost += extraPrices.ledWall

    const subtotal = hallCost + cateringCost + decorCost + extrasCost
    const tax = Math.round(subtotal * 0.05) // FBR 5% Services Tax
    return { hallCost, cateringCost, decorCost, extrasCost, subtotal, tax, grandTotal: subtotal + tax }
  }

  const bill = calculateTotal()

  // Share proposal WhatsApp text
  const getProposalText = () => {
    return `Salam! Proposal from Royal Garden Banquet:
- Hall: ${selectedHall} (Rs. ${hallPrices[selectedHall].toLocaleString()})
- Catering: ${guests} guests @ ${menuType} (Rs. ${(menuPrices[menuType] * guests).toLocaleString()})
- Decoration: ${decorLevel} (Rs. ${decorPrices[decorLevel].toLocaleString()})
- Extras: Sound/LED Wall setup
- FBR Services Tax (5%): Rs. ${bill.tax.toLocaleString()}
*GRAND TOTAL: Rs. ${bill.grandTotal.toLocaleString()}*
Link to view digital timeline & selection selections: http://nexus.com/portal/EV-AhmedFatima`
  }

  const [copiedProposal, setCopiedProposal] = useState(false)
  const handleCopyProposal = () => {
    navigator.clipboard.writeText(getProposalText())
    setCopiedProposal(true)
    setTimeout(() => setCopiedProposal(false), 2000)
  }

  // Pre-made Packages
  const packages = [
    { name: "Sufi Night Package", price: "Rs. 350,000 flat", details: "Hall rental, high-end acoustic sound, basic decor, sufi staging, tea & green-tea service.", tags: ["Sufi", "Music"] },
    { name: "Executive Corporate Buffet", price: "Rs. 2,200/head", details: "Includes Hall B, hi-tech projector, microphone PA, continental buffet, hot drinks, mineral water.", tags: ["Corporate", "Buffet"] },
    { name: "Royal Gold Wedding Package", price: "Rs. 1,450,000 Package", details: "Grand Marquee, full floral decor, 800 guests, 1 dish mutton menu, LED wall, professional valet, VIP lounge.", tags: ["Premium", "Wedding"] }
  ]

  // Invoices list
  const invoices = [
    { id: "INV-2025-09", client: "Hassan Ali (Walima)", date: "May 10, 2025", total: "Rs. 6,50,000", paid: "Rs. 5,50,000", balance: "Rs. 1,00,000", status: "Partial" },
    { id: "INV-2025-10", client: "Ali & Sara Engagement", date: "May 12, 2025", total: "Rs. 2,50,000", paid: "Rs. 2,50,000", balance: "Rs. 0", status: "Paid" },
    { id: "INV-2025-11", client: "Raza Birthday Bash", date: "May 14, 2025", total: "Rs. 85,000", paid: "Rs. 20,000", balance: "Rs. 65,000", status: "Overdue" },
    { id: "INV-2025-12", client: "Ahmed Wedding Booking", date: "May 15, 2025", total: "Rs. 4,50,000", paid: "Rs. 3,50,000", balance: "Rs. 1,00,000", status: "Partial" }
  ]

  // Payments log
  const payments = [
    { id: "TXN-8201", client: "Hassan Ali", date: "May 10, 2025", amount: "Rs. 1,50,000", method: "Bank Transfer (HBL)", status: "Verified" },
    { id: "TXN-8202", client: "Ali & Sara", date: "May 12, 2025", amount: "Rs. 1,00,000", method: "Cash", status: "Verified" },
    { id: "TXN-8203", client: "Ahmed Wedding", date: "May 15, 2025", amount: "Rs. 2,00,000", method: "Online Bank (Meezan)", status: "Verified" },
    { id: "TXN-8204", client: "Raza Birthday", date: "May 18, 2025", amount: "Rs. 20,000", method: "EasyPaisa", status: "Pending Audit" }
  ]

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-left">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#0F5B3E]" /> Proposal & Invoice Center
          </h1>
          <p className="text-gray-500 mt-1 text-[13px] font-medium">
            Build proposals, configure custom event packages, print invoices, and audit payments.
          </p>
        </div>
        
        <button 
          onClick={() => setTab("quotes")}
          className="px-4 py-2 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white rounded-xl font-bold text-[12px] transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-3.5 h-3.5" /> 
          {activeTab === "quotes" && "Calculate Custom Quote"}
          {activeTab === "packages" && "Create Package Template"}
          {activeTab === "invoices" && "Issue Invoice"}
          {activeTab === "payments" && "Log Cash Receipt"}
        </button>
      </div>

      {/* Tab Select Bar */}
      <div className="flex overflow-x-auto pb-1 bg-white border border-[#ECE7DF] rounded-[14px] p-1 gap-1 shrink-0 scrollbar-none">
        <button 
          onClick={() => setTab("quotes")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "quotes" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Proposal Builder
        </button>
        <button 
          onClick={() => setTab("packages")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "packages" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Venue Packages
        </button>
        <button 
          onClick={() => setTab("invoices")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "invoices" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Invoices log
        </button>
        <button 
          onClick={() => setTab("payments")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "payments" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Payment Ledger
        </button>
      </div>

      {/* Tab Views */}

      {/* Tab 1: Proposal Builder */}
      {activeTab === "quotes" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
          {/* Inputs Section */}
          <Card className="lg:col-span-2 p-5 border border-gray-100 bg-white rounded-[24px] shadow-sm space-y-4">
            <h3 className="text-[13.5px] font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <Calculator className="w-4.5 h-4.5 text-[#0F5B3E]" /> Pricing Factors
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9.5px] font-extrabold text-gray-400 uppercase">Total Guest Count</label>
                <input 
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value) || 0)}
                  className="w-full px-3.5 py-2 border border-[#ECE7DF] rounded-xl text-[12px] font-bold text-gray-800 focus:outline-none focus:border-[#0F5B3E]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9.5px] font-extrabold text-gray-400 uppercase">Select Hall Space</label>
                <select 
                  value={selectedHall}
                  onChange={(e) => setSelectedHall(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ECE7DF] rounded-xl text-[12px] font-bold text-gray-700 bg-white focus:outline-none"
                >
                  <option value="Grand Marquee">Grand Marquee (Rs. 500,000)</option>
                  <option value="Crystal Hall">Crystal Hall (Rs. 250,000)</option>
                  <option value="Pearl Hall">Pearl Hall (Rs. 150,000)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9.5px] font-extrabold text-gray-400 uppercase">Catering Plan (Per head)</label>
                <select 
                  value={menuType}
                  onChange={(e) => setMenuType(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ECE7DF] rounded-xl text-[12px] font-bold text-gray-700 bg-white focus:outline-none"
                >
                  <option value="Chicken Single Dish">Chicken Single Dish (Rs. 1,500)</option>
                  <option value="Mutton Single Dish">Mutton Single Dish (Rs. 2,500)</option>
                  <option value="Mutton & Chicken Royal">Mutton & Chicken Royal (Rs. 3,500)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9.5px] font-extrabold text-gray-400 uppercase">Decoration & Stage setup</label>
                <select 
                  value={decorLevel}
                  onChange={(e) => setDecorLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ECE7DF] rounded-xl text-[12px] font-bold text-gray-700 bg-white focus:outline-none"
                >
                  <option value="Minimalist">Minimalist Setup (Rs. 50,000)</option>
                  <option value="Premium Emerald Floral">Premium Emerald Floral (Rs. 150,000)</option>
                  <option value="Royal Gold Stage">Royal Gold Stage Setup (Rs. 250,000)</option>
                </select>
              </div>
            </div>

            {/* Extras */}
            <div className="space-y-2 pt-2">
              <label className="text-[9.5px] font-extrabold text-gray-400 uppercase block mb-1">Additional Extras</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="flex items-center gap-2.5 p-3 border border-[#ECE7DF]/75 rounded-xl cursor-pointer hover:bg-gray-50">
                  <input 
                    type="checkbox" 
                    checked={extras.sound}
                    onChange={(e) => setExtras({ ...extras, sound: e.target.checked })}
                    className="w-4 h-4 text-[#0F5B3E] border-[#ECE7DF] rounded-md focus:ring-0"
                  />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-gray-800">Acoustic Sound</span>
                    <span className="text-[9px] text-gray-400 font-bold">Rs. 25,000</span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 p-3 border border-[#ECE7DF]/75 rounded-xl cursor-pointer hover:bg-gray-50">
                  <input 
                    type="checkbox" 
                    checked={extras.valet}
                    onChange={(e) => setExtras({ ...extras, valet: e.target.checked })}
                    className="w-4 h-4 text-[#0F5B3E] border-[#ECE7DF] rounded-md focus:ring-0"
                  />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-gray-800">Valet Parking</span>
                    <span className="text-[9px] text-gray-400 font-bold">Rs. 30,000</span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 p-3 border border-[#ECE7DF]/75 rounded-xl cursor-pointer hover:bg-gray-50">
                  <input 
                    type="checkbox" 
                    checked={extras.ledWall}
                    onChange={(e) => setExtras({ ...extras, ledWall: e.target.checked })}
                    className="w-4 h-4 text-[#0F5B3E] border-[#ECE7DF] rounded-md focus:ring-0"
                  />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-gray-800">High-res LED Wall</span>
                    <span className="text-[9px] text-gray-400 font-bold">Rs. 40,000</span>
                  </div>
                </label>
              </div>
            </div>
          </Card>

          {/* Pricing Summary Desk */}
          <Card className="p-5 border border-gray-100 bg-[#FAF8F5] rounded-[24px] shadow-sm flex flex-col justify-between h-full min-h-[360px]">
            <div className="space-y-4">
              <h3 className="text-[13px] font-black text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-100">
                Summary Billing
              </h3>

              <div className="space-y-2 text-[11px] font-semibold text-gray-500">
                <div className="flex justify-between">
                  <span>Hall Hire ({selectedHall}):</span>
                  <span className="text-gray-950 font-bold">Rs. {bill.hallCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Catering ({guests} Guests):</span>
                  <span className="text-gray-950 font-bold">Rs. {bill.cateringCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Decoration setup:</span>
                  <span className="text-gray-950 font-bold">Rs. {bill.decorCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Extras setup:</span>
                  <span className="text-gray-950 font-bold">Rs. {bill.extrasCost.toLocaleString()}</span>
                </div>

                <div className="border-t border-gray-200/50 pt-2.5 flex justify-between text-[11.5px] font-bold text-gray-600">
                  <span>Subtotal:</span>
                  <span>Rs. {bill.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11.5px] font-bold text-gray-600">
                  <span>FBR Service Tax (5%):</span>
                  <span>Rs. {bill.tax.toLocaleString()}</span>
                </div>

                <div className="border-t border-gray-200 pt-2.5 flex justify-between text-[14px] font-black text-[#0F5B3E]">
                  <span>Grand Total:</span>
                  <span>Rs. {bill.grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 mt-6 pt-4 border-t border-gray-100">
              <button 
                onClick={handleCopyProposal}
                className="w-full py-2 bg-white hover:bg-gray-50 border border-[#ECE7DF] text-gray-700 font-bold rounded-xl text-[11px] flex items-center justify-center gap-1.5 transition-all"
              >
                {copiedProposal ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied proposal!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-gray-400" /> Copy WhatsApp Proposal
                  </>
                )}
              </button>

              <button className="w-full py-2 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white font-bold rounded-xl text-[11px] flex items-center justify-center gap-1.5 transition-all shadow-sm">
                <Printer className="w-3.5 h-3.5" /> Print PDF Proposal
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* Tab 2: Packages templates */}
      {activeTab === "packages" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {packages.map((pkg, idx) => (
            <Card key={idx} className="p-5 border border-gray-100 bg-white rounded-[24px] shadow-sm flex flex-col justify-between h-[210px]">
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="text-[13.5px] font-black text-gray-900 leading-snug">{pkg.name}</h4>
                  <div className="flex gap-1">
                    {pkg.tags.map(t => (
                      <span key={t} className="text-[8px] font-extrabold px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded uppercase">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 font-medium leading-relaxed mt-3">
                  {pkg.details}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
                <span className="text-[13px] font-black text-[#0F5B3E]">{pkg.price}</span>
                <button className="text-[10px] bg-[#E6F0EC] hover:bg-[#0F5B3E] hover:text-white text-[#0F5B3E] font-bold px-3 py-1 rounded-xl transition-all">
                  Use Package
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Tab 3: Invoices list */}
      {activeTab === "invoices" && (
        <Card className="p-5 border border-gray-100 bg-white rounded-[20px] shadow-sm">
          <div className="overflow-x-auto text-left">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#ECE7DF] text-[10.5px] text-gray-400 font-extrabold uppercase">
                  <th className="pb-3.5 pl-2">Invoice ID</th>
                  <th className="pb-3.5">Billed Client</th>
                  <th className="pb-3.5">Issue Date</th>
                  <th className="pb-3.5">Total Amount</th>
                  <th className="pb-3.5">Paid Amount</th>
                  <th className="pb-3.5">Outstanding Balance</th>
                  <th className="pb-3.5 text-center">Billing status</th>
                  <th className="pb-3.5 text-right pr-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-[11.5px] font-semibold text-gray-700">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 pl-2 font-bold text-gray-900">{inv.id}</td>
                    <td className="py-3.5 font-black text-gray-800">{inv.client}</td>
                    <td className="py-3.5 text-gray-400">{inv.date}</td>
                    <td className="py-3.5 font-bold text-gray-950">{inv.total}</td>
                    <td className="py-3.5 text-emerald-600 font-bold">{inv.paid}</td>
                    <td className="py-3.5 text-rose-600 font-bold">{inv.balance}</td>
                    <td className="py-3.5 text-center">
                      <span className={`px-2 py-0.5 rounded text-[8.5px] font-extrabold uppercase ${
                        inv.status === "Paid" 
                          ? "bg-emerald-100 text-emerald-800" 
                          : inv.status === "Partial" 
                          ? "bg-blue-100 text-blue-800" 
                          : "bg-rose-100 text-rose-800"
                      }`}>{inv.status}</span>
                    </td>
                    <td className="py-3.5 text-right pr-2">
                      <button className="px-3 py-1 bg-white border border-[#ECE7DF] hover:bg-gray-50 rounded-xl text-[10px] font-bold text-gray-700">
                        Record Payment
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Tab 4: Payments receipts */}
      {activeTab === "payments" && (
        <Card className="p-5 border border-gray-100 bg-white rounded-[20px] shadow-sm">
          <div className="overflow-x-auto text-left">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#ECE7DF] text-[10.5px] text-gray-400 font-extrabold uppercase">
                  <th className="pb-3.5 pl-2">Receipt ID</th>
                  <th className="pb-3.5">Client</th>
                  <th className="pb-3.5">Transaction Date</th>
                  <th className="pb-3.5">Payment Amount</th>
                  <th className="pb-3.5">Payment Method</th>
                  <th className="pb-3.5 text-right pr-2">Audit Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-[11.5px] font-semibold text-gray-700">
                {payments.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 pl-2 font-bold text-gray-900">{txn.id}</td>
                    <td className="py-3.5 font-black text-gray-800">{txn.client}</td>
                    <td className="py-3.5 text-gray-400">{txn.date}</td>
                    <td className="py-3.5 font-bold text-emerald-600">{txn.amount}</td>
                    <td className="py-3.5 font-bold text-gray-600">{txn.method}</td>
                    <td className="py-3.5 text-right pr-2">
                      <span className={`px-2 py-0.5 rounded text-[8.5px] font-extrabold uppercase ${
                        txn.status === "Verified" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      }`}>{txn.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

    </div>
  )
}

export default function VenuesQuotesPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-48">
        <span className="text-sm font-bold text-gray-400 animate-pulse">Loading Proposal Center...</span>
      </div>
    }>
      <SalesQuotesContent />
    </Suspense>
  )
}
