"use client"
import { useState } from "react"
import { FileText, Plus, Search, Send, FileEdit, Trash2, Eye, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock Data
const MOCK_QUOTES = [
  { id: "Q-1001", client: "Zainab Malik", date: "Oct 12, 2026", amount: "Rs 450,000", status: "Sent" },
  { id: "Q-1002", client: "Ahmed Raza", date: "Oct 10, 2026", amount: "Rs 150,000", status: "Accepted" },
  { id: "Q-1003", client: "Fatima Noor", date: "Oct 08, 2026", amount: "Rs 800,000", status: "Draft" },
]

export function QuotationBuilder() {
  const [isCreating, setIsCreating] = useState(false)

  if (isCreating) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black text-slate-900">Create Quotation</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
            <Button className="bg-slate-900 hover:bg-slate-800 text-white font-bold"><Eye className="w-4 h-4 mr-2" /> Preview</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold"><Send className="w-4 h-4 mr-2" /> Send to Client</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Client Details */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-4 border-b border-slate-100 pb-2">Client Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Select Lead</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium focus:border-blue-500 outline-none">
                    <option>Zainab Malik (Mehndi)</option>
                    <option>Hassan Ali (Walima)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Event Date</label>
                  <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium focus:border-blue-500 outline-none" />
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
                <h3 className="text-lg font-black text-slate-900">Line Items</h3>
                <Button variant="outline" size="sm" className="h-8 text-xs font-bold"><Plus className="w-3 h-3 mr-1" /> Add Item</Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <input type="text" placeholder="Item Name (e.g. Premium Hall Rental)" className="w-full border border-slate-200 rounded-lg p-2 text-sm font-medium mb-1" />
                    <textarea placeholder="Description" rows={2} className="w-full border border-slate-200 rounded-lg p-2 text-sm text-slate-500" />
                  </div>
                  <div className="w-24">
                    <input type="number" placeholder="Qty" defaultValue={1} className="w-full border border-slate-200 rounded-lg p-2 text-sm font-medium" />
                  </div>
                  <div className="w-32">
                    <input type="number" placeholder="Price" defaultValue={250000} className="w-full border border-slate-200 rounded-lg p-2 text-sm font-medium" />
                  </div>
                  <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors mt-0.5"><Trash2 className="w-4 h-4" /></button>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <input type="text" placeholder="Item Name (e.g. Standard Catering Package)" className="w-full border border-slate-200 rounded-lg p-2 text-sm font-medium mb-1" />
                    <textarea placeholder="Description" rows={2} className="w-full border border-slate-200 rounded-lg p-2 text-sm text-slate-500" />
                  </div>
                  <div className="w-24">
                    <input type="number" placeholder="Qty" defaultValue={500} className="w-full border border-slate-200 rounded-lg p-2 text-sm font-medium" />
                  </div>
                  <div className="w-32">
                    <input type="number" placeholder="Price" defaultValue={4500} className="w-full border border-slate-200 rounded-lg p-2 text-sm font-medium" />
                  </div>
                  <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors mt-0.5"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate-900 rounded-2xl p-6 text-white sticky top-24 shadow-xl">
              <h3 className="text-lg font-black mb-6">Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-300 text-sm">
                  <span>Subtotal</span>
                  <span className="font-medium">Rs 2,500,000</span>
                </div>
                <div className="flex justify-between text-slate-300 text-sm">
                  <span>Tax (16%)</span>
                  <span className="font-medium">Rs 400,000</span>
                </div>
                <div className="flex justify-between text-slate-300 text-sm">
                  <span>Discount</span>
                  <span className="font-medium text-emerald-400">- Rs 50,000</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-700">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-slate-300 font-medium">Total Amount</span>
                  <span className="text-3xl font-black text-white">Rs 2,850,000</span>
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 mb-2 block">Payment Terms</label>
                  <select className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm font-medium text-white outline-none">
                    <option>50% Advance, 50% on Event Day</option>
                    <option>100% Advance</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 mb-2 block">Valid Until</label>
                  <input type="date" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm font-medium text-white outline-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-in fade-in duration-500 h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Quotations</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Manage and send pricing proposals.</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
          <Plus className="w-4 h-4 mr-2" /> Create Quote
        </Button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search quotes..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-blue-500 outline-none"
            />
          </div>
          <Button variant="outline" className="bg-white border-slate-200">Filter Status</Button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <th className="p-4 border-b border-slate-100">Quote ID</th>
              <th className="p-4 border-b border-slate-100">Client</th>
              <th className="p-4 border-b border-slate-100">Date</th>
              <th className="p-4 border-b border-slate-100">Amount</th>
              <th className="p-4 border-b border-slate-100">Status</th>
              <th className="p-4 border-b border-slate-100 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_QUOTES.map((quote) => (
              <tr key={quote.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-bold text-slate-900">{quote.id}</td>
                <td className="p-4 font-medium text-slate-700">{quote.client}</td>
                <td className="p-4 text-sm text-slate-500">{quote.date}</td>
                <td className="p-4 font-bold text-slate-900">{quote.amount}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold
                    ${quote.status === 'Sent' ? 'bg-blue-100 text-blue-700' : 
                      quote.status === 'Accepted' ? 'bg-emerald-100 text-emerald-700' : 
                      'bg-slate-100 text-slate-700'}
                  `}>
                    {quote.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                      <FileEdit className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
