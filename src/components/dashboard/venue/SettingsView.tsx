"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Building2, Users, Banknote, BellRing, 
  ShieldCheck, Smartphone, Mail, CreditCard, 
  Save, Camera, Plus, Trash2, Key, Palette, Type, LayoutTemplate, Image,
  Laptop, Globe, LogOut, Clock, Lock
} from "lucide-react"
import { Button } from "@/components/ui/button"

type Tab = "general" | "financial" | "team" | "design" | "notifications" | "security"

export function SettingsView() {
  const [activeTab, setActiveTab] = useState<Tab>("general")

  // Security State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  
  // Bank Accounts State
  const [bankAccounts, setBankAccounts] = useState([
    { id: 1, bankName: "Meezan Bank", accountTitle: "Royal Palace Banquet", accountNumber: "PK35 MEZN 0000 0000 0000 0000" }
  ])

  const addBankAccount = () => {
    setBankAccounts([...bankAccounts, { id: Date.now(), bankName: "", accountTitle: "", accountNumber: "" }])
  }

  const removeBankAccount = (id: number) => {
    setBankAccounts(bankAccounts.filter(acc => acc.id !== id))
  }

  const updateBankAccount = (id: number, field: string, value: string) => {
    setBankAccounts(bankAccounts.map(acc => acc.id === id ? { ...acc, [field]: value } : acc))
  }
  
  // Notification Preferences State
  const [notifPrefs, setNotifPrefs] = useState({
    leads: { app: true, email: true, sms: false },
    finance: { app: true, email: true, sms: true },
    messages: { app: true, email: false, sms: false },
  })
  
  const toggleNotifPref = (category: 'leads' | 'finance' | 'messages', channel: 'app' | 'email' | 'sms') => {
    setNotifPrefs(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [channel]: !prev[category][channel]
      }
    }))
  }
  
  // Invoice Designer State
  const [designerTheme, setDesignerTheme] = useState("modern")
  const [designerColor, setDesignerColor] = useState("bg-slate-900")
  const [designerFont, setDesignerFont] = useState("font-sans")
  const [designerTableStyle, setDesignerTableStyle] = useState("lines")
  const [designerShowFooter, setDesignerShowFooter] = useState(true)
  const [designerFooterText, setDesignerFooterText] = useState("Royal Palace Banquet | 123 Main Blvd, Gulberg III, Lahore\nNTN: 8492041-9 | bookings@royalpalace.pk")

  useEffect(() => {
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

  const saveInvoiceSettings = () => {
    localStorage.setItem('invoiceSettings', JSON.stringify({
      designerTheme, designerColor, designerFont, designerTableStyle, designerShowFooter, designerFooterText
    }))
  }

  const tabs = [
    { id: "general", label: "General Information", icon: Building2 },
    { id: "financial", label: "Billing & Financial", icon: Banknote },
    { id: "design", label: "Invoice Designer", icon: Palette },
    { id: "team", label: "Team & Roles", icon: Users },
    { id: "notifications", label: "Notifications", icon: BellRing },
    { id: "security", label: "Security & Login", icon: ShieldCheck },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 font-medium mt-1">Manage your venue profile, team permissions, and financial defaults.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 shrink-0">
          <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? "bg-slate-900 text-white shadow-sm" 
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-primary" : "text-slate-400"}`} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            
            {activeTab === "general" && (
              <motion.div
                key="general"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-lg font-bold text-slate-900">General Information</h2>
                  <p className="text-sm text-slate-500">Update your primary venue details and branding.</p>
                </div>
                <div className="p-6 space-y-6">
                  {/* Logo Upload Mock */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Venue Logo</label>
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-slate-300" />
                      </div>
                      <Button variant="outline" className="font-bold text-xs"><Camera className="w-4 h-4 mr-2" /> Upload New Logo</Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Business Name</label>
                      <input type="text" defaultValue="Royal Palace Banquet" className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Registration Number</label>
                      <input type="text" defaultValue="NTN-8492041-9" className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Business Address</label>
                      <input type="text" defaultValue="123 Main Boulevard, Gulberg III, Lahore" className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Primary Phone</label>
                      <input type="text" defaultValue="+92 300 1234567" className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Primary Email</label>
                      <input type="email" defaultValue="bookings@royalpalace.pk" className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end">
                  <Button className="font-bold text-sm"><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
                </div>
              </motion.div>
            )}

            {activeTab === "financial" && (
              <motion.div
                key="financial"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-lg font-bold text-slate-900">Billing & Financial Defaults</h2>
                  <p className="text-sm text-slate-500">Configure tax rates, deposits, and payment methods for your quotations.</p>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Default Tax Rate (%)</label>
                      <input type="number" defaultValue="5" className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                      <p className="text-[11px] text-slate-400 mt-1">Applied automatically to new quotations.</p>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Required Advance Deposit (%)</label>
                      <input type="number" defaultValue="30" className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                    </div>
                  </div>

                  <hr className="border-slate-100" />
                  
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-3">Accepted Payment Methods</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary" />
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-slate-500" />
                          <span className="text-sm font-medium text-slate-700">Bank Transfer / IBAN</span>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary" />
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-slate-500" />
                          <span className="text-sm font-medium text-slate-700">Raast ID / EasyPaisa / JazzCash</span>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                        <input type="checkbox" className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary" />
                        <div className="flex items-center gap-2">
                          <Banknote className="w-4 h-4 text-slate-500" />
                          <span className="text-sm font-medium text-slate-700">Cash on Site</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <hr className="border-slate-100" />
                  
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">Bank Account Details</h3>
                        <p className="text-xs text-slate-500 mt-1">These details will be displayed on your invoices and quotations when Bank Transfer is accepted.</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={addBankAccount} className="font-bold text-xs"><Plus className="w-4 h-4 mr-1.5" /> Add Account</Button>
                    </div>
                    <div className="space-y-6">
                      {bankAccounts.map((account, index) => (
                        <div key={account.id} className="relative p-5 border border-slate-200 rounded-xl bg-slate-50/50">
                          {bankAccounts.length > 1 && (
                            <button onClick={() => removeBankAccount(account.id)} className="absolute top-5 right-5 text-slate-400 hover:text-red-500 transition-colors p-1" title="Remove account">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Bank Name</label>
                              <input type="text" value={account.bankName} onChange={(e) => updateBankAccount(account.id, "bankName", e.target.value)} placeholder="e.g. Meezan Bank" className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                            </div>
                            <div className={bankAccounts.length > 1 ? "pr-8 md:pr-0" : ""}>
                              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Account Title</label>
                              <input type="text" value={account.accountTitle} onChange={(e) => updateBankAccount(account.id, "accountTitle", e.target.value)} placeholder="e.g. Royal Palace Banquet" className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Account Number / IBAN</label>
                              <input type="text" value={account.accountNumber} onChange={(e) => updateBankAccount(account.id, "accountNumber", e.target.value)} placeholder="e.g. PK35 MEZN 0000 0000 0000 0000" className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end">
                  <Button className="font-bold text-sm"><Save className="w-4 h-4 mr-2" /> Save Financial Settings</Button>
                </div>
              </motion.div>
            )}

            {activeTab === "design" && (
              <motion.div
                key="design"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-lg font-bold text-slate-900">Quotation & Invoice Branding</h2>
                  <p className="text-sm text-slate-500">Customize the look and feel of the documents you send to clients.</p>
                </div>
                
                <div className="flex flex-col lg:flex-row">
                  {/* Left: Controls */}
                  <div className="flex-1 p-6 space-y-8 border-b lg:border-b-0 lg:border-r border-slate-200">
                    
                    <div>
                      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2"><LayoutTemplate className="w-4 h-4" /> Layout Theme</h3>
                      <div className="grid grid-cols-2 gap-3">
                        
                        {/* Modern Theme */}
                        <label onClick={() => setDesignerTheme("modern")} className={`flex flex-col items-center gap-2 p-3 border-2 rounded-xl cursor-pointer transition-colors ${designerTheme === "modern" ? "border-primary bg-primary/5" : "border-slate-200 hover:bg-slate-50"}`}>
                          <input type="radio" name="theme" checked={designerTheme === "modern"} readOnly className="hidden" />
                          <div className="w-full h-12 bg-white rounded shadow-sm border border-slate-200 flex flex-col p-1.5 gap-1 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-slate-400"></div>
                            <div className="w-1/3 h-2 bg-slate-300 rounded mt-1"></div>
                            <div className="w-full h-4 bg-slate-100 rounded"></div>
                          </div>
                          <span className={`text-xs font-bold ${designerTheme === "modern" ? "text-primary" : "text-slate-600"}`}>Modern</span>
                        </label>
                        
                        {/* Classic Theme */}
                        <label onClick={() => setDesignerTheme("classic")} className={`flex flex-col items-center gap-2 p-3 border-2 rounded-xl cursor-pointer transition-colors ${designerTheme === "classic" ? "border-primary bg-primary/5" : "border-slate-200 hover:bg-slate-50"}`}>
                          <input type="radio" name="theme" checked={designerTheme === "classic"} readOnly className="hidden" />
                          <div className="w-full h-12 bg-white rounded shadow-sm border border-slate-200 flex flex-col items-start p-1.5 gap-1">
                            <div className="w-1/3 h-2 bg-slate-300 rounded"></div>
                            <div className="w-2/3 h-2 bg-slate-200 rounded"></div>
                            <div className="w-full h-4 bg-slate-100 rounded mt-auto border-t border-slate-100 pt-1"></div>
                          </div>
                          <span className={`text-xs font-bold ${designerTheme === "classic" ? "text-primary" : "text-slate-600"}`}>Classic</span>
                        </label>

                        {/* Elegant Theme */}
                        <label onClick={() => setDesignerTheme("elegant")} className={`flex flex-col items-center gap-2 p-3 border-2 rounded-xl cursor-pointer transition-colors ${designerTheme === "elegant" ? "border-primary bg-primary/5" : "border-slate-200 hover:bg-slate-50"}`}>
                          <input type="radio" name="theme" checked={designerTheme === "elegant"} readOnly className="hidden" />
                          <div className="w-full h-12 bg-white rounded shadow-sm border border-slate-200 flex flex-col items-center p-1.5 gap-1">
                            <div className="w-1/2 h-2 bg-slate-400 rounded"></div>
                            <div className="w-1/4 h-1.5 bg-slate-200 rounded"></div>
                            <div className="w-full h-4 bg-slate-100 rounded mt-1 border border-slate-100"></div>
                          </div>
                          <span className={`text-xs font-bold ${designerTheme === "elegant" ? "text-primary" : "text-slate-600"}`}>Elegant</span>
                        </label>

                        {/* Minimal Theme */}
                        <label onClick={() => setDesignerTheme("minimal")} className={`flex flex-col items-center gap-2 p-3 border-2 rounded-xl cursor-pointer transition-colors ${designerTheme === "minimal" ? "border-primary bg-primary/5" : "border-slate-200 hover:bg-slate-50"}`}>
                          <input type="radio" name="theme" checked={designerTheme === "minimal"} readOnly className="hidden" />
                          <div className="w-full h-12 bg-white rounded shadow-sm border border-slate-100 flex flex-col items-end p-1.5 gap-1">
                            <div className="w-1/4 h-2 bg-slate-200 rounded"></div>
                            <div className="w-full h-4 bg-slate-50 rounded mt-1"></div>
                          </div>
                          <span className={`text-xs font-bold ${designerTheme === "minimal" ? "text-primary" : "text-slate-600"}`}>Minimal</span>
                        </label>

                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2"><Palette className="w-4 h-4" /> Accent Color</h3>
                      <div className="flex gap-3">
                        {['bg-slate-900', 'bg-blue-600', 'bg-rose-600', 'bg-emerald-600', 'bg-amber-500', 'bg-purple-600'].map((color, i) => (
                          <button 
                            key={i} 
                            onClick={() => setDesignerColor(color)}
                            className={`w-8 h-8 rounded-full ${color} shadow-sm border-2 ${designerColor === color ? 'border-primary ring-2 ring-primary/20' : 'border-white'} transition-transform hover:scale-110`} 
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2"><Type className="w-4 h-4" /> Typography</h3>
                      <select 
                        value={designerFont}
                        onChange={(e) => setDesignerFont(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                      >
                        <option value="font-sans">Inter (Modern Sans-Serif)</option>
                        <option value="font-serif">Playfair Display (Elegant Serif)</option>
                        <option value="font-mono">Roboto (Clean & Professional)</option>
                        <option value="font-serif italic">Outfit (Geometric & Bold)</option>
                      </select>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2"><LayoutTemplate className="w-4 h-4" /> Table Style</h3>
                      <div className="flex gap-3">
                        <label className={`flex-1 flex items-center justify-center py-2 px-3 border-2 rounded-xl cursor-pointer transition-colors ${designerTableStyle === "lines" ? "border-primary bg-primary/5 text-primary" : "border-slate-200 hover:bg-slate-50 text-slate-600"}`}>
                          <input type="radio" name="tableStyle" checked={designerTableStyle === "lines"} onChange={() => setDesignerTableStyle("lines")} className="hidden" />
                          <span className="text-xs font-bold">Lines</span>
                        </label>
                        <label className={`flex-1 flex items-center justify-center py-2 px-3 border-2 rounded-xl cursor-pointer transition-colors ${designerTableStyle === "grid" ? "border-primary bg-primary/5 text-primary" : "border-slate-200 hover:bg-slate-50 text-slate-600"}`}>
                          <input type="radio" name="tableStyle" checked={designerTableStyle === "grid"} onChange={() => setDesignerTableStyle("grid")} className="hidden" />
                          <span className="text-xs font-bold">Grid</span>
                        </label>
                        <label className={`flex-1 flex items-center justify-center py-2 px-3 border-2 rounded-xl cursor-pointer transition-colors ${designerTableStyle === "boxed" ? "border-primary bg-primary/5 text-primary" : "border-slate-200 hover:bg-slate-50 text-slate-600"}`}>
                          <input type="radio" name="tableStyle" checked={designerTableStyle === "boxed"} onChange={() => setDesignerTableStyle("boxed")} className="hidden" />
                          <span className="text-xs font-bold">Boxed</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2"><Image className="w-4 h-4" /> Document Logo</h3>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
                          <Building2 className="w-6 h-6 text-slate-300" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-slate-500 mb-2 font-medium">Upload a specific logo for your invoices (different from dashboard logo if needed).</p>
                          <Button variant="outline" size="sm" className="font-bold text-xs h-8"><Camera className="w-3.5 h-3.5 mr-2" /> Upload Logo</Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Footer text & Address</h3>
                        <label className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Show</span>
                          <div className={`w-8 h-4 rounded-full relative transition-colors ${designerShowFooter ? 'bg-primary' : 'bg-slate-300'}`}>
                            <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all`} style={{ left: designerShowFooter ? 'calc(100% - 14px)' : '2px' }}></div>
                          </div>
                          <input type="checkbox" className="hidden" checked={designerShowFooter} onChange={(e) => setDesignerShowFooter(e.target.checked)} />
                        </label>
                      </div>
                      
                      {designerShowFooter && (
                        <textarea 
                          rows={3} 
                          value={designerFooterText}
                          onChange={(e) => setDesignerFooterText(e.target.value)}
                          className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium resize-none"
                        />
                      )}
                    </div>

                  </div>

                  {/* Right: Live Preview */}
                  <div className="w-full lg:w-[400px] bg-slate-50 p-6 flex flex-col items-center">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 self-start">Live Preview (A4 Size)</h3>
                    <div className={`w-full max-w-[320px] aspect-[1/1.414] bg-white shadow-lg border border-slate-200 rounded-sm relative flex flex-col overflow-hidden transition-all duration-300 ${designerFont} ${designerTheme === "minimal" ? "shadow-sm border-slate-100" : ""}`}>
                      
                      {/* Dynamic Header */}
                      {designerTheme === "modern" && (
                        <div className={`absolute top-0 left-0 w-full h-2 ${designerColor} transition-colors`}></div>
                      )}
                      
                      <div className={`p-4 flex-1 ${designerTheme === "elegant" ? "flex flex-col items-center text-center" : ""}`}>
                        
                        {/* Header Section */}
                        <div className={`flex mb-3 ${designerTheme === "elegant" ? "flex-col items-center gap-3" : designerTheme === "classic" ? "flex-col items-start gap-3" : designerTheme === "minimal" ? "flex-row-reverse justify-between items-start" : "justify-between items-start"}`}>
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${designerColor} bg-opacity-10 transition-colors`}>
                            <Building2 className={`w-5 h-5 ${designerColor.replace('bg-', 'text-')} transition-colors`} />
                          </div>
                          <div className={`${designerTheme === "elegant" ? "text-center" : designerTheme === "classic" ? "text-left" : designerTheme === "minimal" ? "text-left" : "text-right"}`}>
                            <div className={`text-lg font-black tracking-tight ${designerTheme === "elegant" ? designerColor.replace('bg-', 'text-') : "text-slate-900"} transition-colors`}>QUOTATION</div>
                            <div className="text-[10px] font-bold text-slate-500 mt-0.5">QT-2026-0001</div>
                          </div>
                        </div>
                        
                        {/* Client Info */}
                        <div className={`mb-4 flex ${designerTheme === "elegant" ? "justify-center" : "justify-start"}`}>
                          <div className={`text-left ${designerTheme === "elegant" ? "text-center" : ""}`}>
                            <div className="font-bold text-slate-400 uppercase tracking-widest text-[8px] mb-1">Billed To</div>
                            <div className="font-bold text-slate-900 text-xs">Mr. Kamran Ali</div>
                            <div className="text-slate-500 text-[10px]">kamran@example.com</div>
                            <div className="text-slate-500 text-[10px]">+92 300 1234567</div>
                          </div>
                        </div>
                        
                        {/* Items Table */}
                        <div className="w-full mb-4">
                          <table className={`w-full text-left border-collapse ${designerTableStyle === "boxed" ? "border-2 border-slate-200" : ""} ${designerTableStyle === "grid" ? "border border-slate-200" : ""}`}>
                            <thead>
                              <tr className={`
                                ${designerTableStyle === "lines" || designerTableStyle === "boxed" ? "border-b border-slate-200" : ""}
                                ${designerTableStyle === "grid" ? "border-b border-slate-200" : ""}
                                ${designerTheme === "minimal" && designerTableStyle === "lines" ? "border-transparent text-slate-400" : "text-slate-600"} 
                                ${designerColor.replace('bg-', 'text-')}
                              `}>
                                <th className={`py-2 px-2 font-bold uppercase tracking-wider text-[8px] ${designerTableStyle === "grid" || designerTableStyle === "boxed" ? "border-r border-slate-200" : ""}`}>Description</th>
                                <th className={`py-2 px-2 font-bold uppercase tracking-wider text-[8px] text-center ${designerTableStyle === "grid" || designerTableStyle === "boxed" ? "border-r border-slate-200" : ""}`}>Qty</th>
                                <th className="py-2 px-2 font-bold uppercase tracking-wider text-[8px] text-right">Price</th>
                              </tr>
                            </thead>
                            <tbody className={`${designerTableStyle === "lines" ? "divide-y divide-slate-100" : ""}`}>
                              <tr className={`${designerTableStyle === "grid" || designerTableStyle === "boxed" ? "border-b border-slate-200" : ""}`}>
                                <td className={`py-2 px-2 ${designerTableStyle === "grid" || designerTableStyle === "boxed" ? "border-r border-slate-200" : ""}`}><span className="font-bold text-slate-900 block text-[11px]">Hall Rental</span><span className="text-slate-500 text-[9px]">Grand Ballroom</span></td>
                                <td className={`py-2 px-2 text-center text-slate-600 text-[10px] ${designerTableStyle === "grid" || designerTableStyle === "boxed" ? "border-r border-slate-200" : ""}`}>1</td>
                                <td className="py-2 px-2 text-right font-medium text-slate-900 text-[11px]">250,000</td>
                              </tr>
                              <tr className={`${designerTableStyle === "grid" || designerTableStyle === "boxed" ? "border-b border-slate-200" : ""}`}>
                                <td className={`py-2 px-2 ${designerTableStyle === "grid" || designerTableStyle === "boxed" ? "border-r border-slate-200" : ""}`}><span className="font-bold text-slate-900 block text-[11px]">Premium Catering</span><span className="text-slate-500 text-[9px]">Menu B (Per Head)</span></td>
                                <td className={`py-2 px-2 text-center text-slate-600 text-[10px] ${designerTableStyle === "grid" || designerTableStyle === "boxed" ? "border-r border-slate-200" : ""}`}>500</td>
                                <td className="py-2 px-2 text-right font-medium text-slate-900 text-[11px]">1,250,000</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Totals */}
                        <div className={`flex ${designerTheme === "elegant" ? "justify-center border-t border-slate-100 pt-3" : "justify-end"} w-full`}>
                          <div className={`w-full sm:w-2/3 space-y-1 text-[10px] ${designerTheme === "elegant" ? "text-center" : "text-right"}`}>
                            <div className="flex justify-between text-slate-500"><span>Subtotal:</span> <span>1,500,000</span></div>
                            <div className="flex justify-between text-slate-500"><span>Tax (5%):</span> <span>75,000</span></div>
                            <div className={`flex justify-between font-bold text-xs mt-2 pt-2 border-t border-slate-100 ${designerTheme === "elegant" ? designerColor.replace('bg-', 'text-') : "text-slate-900"}`}>
                              <span>Total:</span> <span>1,575,000</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      {designerShowFooter && (
                        <div className={`pt-4 px-4 pb-16 mt-auto transition-colors ${designerTheme === "elegant" ? "bg-white border-t border-slate-100" : designerTheme === "minimal" ? "bg-white" : "bg-slate-50 border-t border-slate-100"} text-center`}>
                          <p className="text-slate-400 text-[8px] whitespace-pre-line leading-relaxed">{designerFooterText}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end">
                  <Button className="font-bold text-sm" onClick={saveInvoiceSettings}><Save className="w-4 h-4 mr-2" /> Save Design Settings</Button>
                </div>
              </motion.div>
            )}

            {activeTab === "team" && (
              <motion.div
                key="team"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Team & Roles</h2>
                    <p className="text-sm text-slate-500">Manage who has access to your dashboard.</p>
                  </div>
                  <Button size="sm" className="font-bold text-xs"><Plus className="w-4 h-4 mr-1.5" /> Invite Member</Button>
                </div>
                <div className="p-0">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                        <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                        <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                        <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="block text-sm font-bold text-slate-900">Ahmed Raza</span>
                          <span className="block text-xs text-slate-500">ahmed@royalpalace.pk</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded-md">Owner</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Active</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-xs text-slate-400 font-medium">You</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="block text-sm font-bold text-slate-900">Fatima Ali</span>
                          <span className="block text-xs text-slate-500">fatima@royalpalace.pk</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded-md">Manager</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Active</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500 h-8 w-8"><Trash2 className="w-4 h-4" /></Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === "notifications" && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-lg font-bold text-slate-900">Notification Preferences</h2>
                  <p className="text-sm text-slate-500">Choose how and when you want to be alerted about activity.</p>
                </div>
                <div className="p-6 space-y-8">
                  
                  {/* Category: Leads & Bookings */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Leads & Bookings</h3>
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-bold text-slate-700">New Inquiries & Bookings</p>
                          <p className="text-xs text-slate-500">When a customer requests a quotation or confirms a booking.</p>
                        </div>
                        <div className="flex items-center gap-6">
                          <label className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider w-10 text-right">App</span>
                            <div className={`w-8 h-4 rounded-full relative transition-colors ${notifPrefs.leads.app ? 'bg-primary' : 'bg-slate-300'}`}>
                              <div className="absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all" style={{ left: notifPrefs.leads.app ? 'calc(100% - 14px)' : '2px' }}></div>
                            </div>
                            <input type="checkbox" className="hidden" checked={notifPrefs.leads.app} onChange={() => toggleNotifPref('leads', 'app')} />
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider w-10 text-right">Email</span>
                            <div className={`w-8 h-4 rounded-full relative transition-colors ${notifPrefs.leads.email ? 'bg-primary' : 'bg-slate-300'}`}>
                              <div className="absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all" style={{ left: notifPrefs.leads.email ? 'calc(100% - 14px)' : '2px' }}></div>
                            </div>
                            <input type="checkbox" className="hidden" checked={notifPrefs.leads.email} onChange={() => toggleNotifPref('leads', 'email')} />
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider w-10 text-right">SMS</span>
                            <div className={`w-8 h-4 rounded-full relative transition-colors ${notifPrefs.leads.sms ? 'bg-primary' : 'bg-slate-300'}`}>
                              <div className="absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all" style={{ left: notifPrefs.leads.sms ? 'calc(100% - 14px)' : '2px' }}></div>
                            </div>
                            <input type="checkbox" className="hidden" checked={notifPrefs.leads.sms} onChange={() => toggleNotifPref('leads', 'sms')} />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Category: Financials */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Financials & Payments</h3>
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-bold text-slate-700">Payment Confirmations</p>
                          <p className="text-xs text-slate-500">Alerts for advance deposits or final payments.</p>
                        </div>
                        <div className="flex items-center gap-6">
                          <label className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider w-10 text-right">App</span>
                            <div className={`w-8 h-4 rounded-full relative transition-colors ${notifPrefs.finance.app ? 'bg-primary' : 'bg-slate-300'}`}>
                              <div className="absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all" style={{ left: notifPrefs.finance.app ? 'calc(100% - 14px)' : '2px' }}></div>
                            </div>
                            <input type="checkbox" className="hidden" checked={notifPrefs.finance.app} onChange={() => toggleNotifPref('finance', 'app')} />
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider w-10 text-right">Email</span>
                            <div className={`w-8 h-4 rounded-full relative transition-colors ${notifPrefs.finance.email ? 'bg-primary' : 'bg-slate-300'}`}>
                              <div className="absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all" style={{ left: notifPrefs.finance.email ? 'calc(100% - 14px)' : '2px' }}></div>
                            </div>
                            <input type="checkbox" className="hidden" checked={notifPrefs.finance.email} onChange={() => toggleNotifPref('finance', 'email')} />
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider w-10 text-right">SMS</span>
                            <div className={`w-8 h-4 rounded-full relative transition-colors ${notifPrefs.finance.sms ? 'bg-primary' : 'bg-slate-300'}`}>
                              <div className="absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all" style={{ left: notifPrefs.finance.sms ? 'calc(100% - 14px)' : '2px' }}></div>
                            </div>
                            <input type="checkbox" className="hidden" checked={notifPrefs.finance.sms} onChange={() => toggleNotifPref('finance', 'sms')} />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Category: Communications */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Customer Communications</h3>
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-bold text-slate-700">Direct Messages</p>
                          <p className="text-xs text-slate-500">When customers send you messages or questions.</p>
                        </div>
                        <div className="flex items-center gap-6">
                          <label className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider w-10 text-right">App</span>
                            <div className={`w-8 h-4 rounded-full relative transition-colors ${notifPrefs.messages.app ? 'bg-primary' : 'bg-slate-300'}`}>
                              <div className="absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all" style={{ left: notifPrefs.messages.app ? 'calc(100% - 14px)' : '2px' }}></div>
                            </div>
                            <input type="checkbox" className="hidden" checked={notifPrefs.messages.app} onChange={() => toggleNotifPref('messages', 'app')} />
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider w-10 text-right">Email</span>
                            <div className={`w-8 h-4 rounded-full relative transition-colors ${notifPrefs.messages.email ? 'bg-primary' : 'bg-slate-300'}`}>
                              <div className="absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all" style={{ left: notifPrefs.messages.email ? 'calc(100% - 14px)' : '2px' }}></div>
                            </div>
                            <input type="checkbox" className="hidden" checked={notifPrefs.messages.email} onChange={() => toggleNotifPref('messages', 'email')} />
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider w-10 text-right">SMS</span>
                            <div className={`w-8 h-4 rounded-full relative transition-colors ${notifPrefs.messages.sms ? 'bg-primary' : 'bg-slate-300'}`}>
                              <div className="absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all" style={{ left: notifPrefs.messages.sms ? 'calc(100% - 14px)' : '2px' }}></div>
                            </div>
                            <input type="checkbox" className="hidden" checked={notifPrefs.messages.sms} onChange={() => toggleNotifPref('messages', 'sms')} />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end">
                  <Button className="font-bold text-sm"><Save className="w-4 h-4 mr-2" /> Save Preferences</Button>
                </div>
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-lg font-bold text-slate-900">Security & Login</h2>
                  <p className="text-sm text-slate-500">Manage your password, two-factor authentication, and active sessions.</p>
                </div>
                <div className="p-6 space-y-8">
                  
                  {/* Change Password */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Change Password</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Current Password</label>
                        <input type="password" placeholder="••••••••" className="w-full max-w-md h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Confirm New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                      </div>
                    </div>
                    <Button variant="outline" className="mt-4 font-bold text-sm"><Lock className="w-4 h-4 mr-2" /> Update Password</Button>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Two-Factor Authentication (2FA)</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border border-slate-200 rounded-xl bg-slate-50/50">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Smartphone className="w-5 h-5 text-slate-400" />
                          <span className="font-bold text-slate-700">Authenticator App</span>
                        </div>
                        <p className="text-xs text-slate-500 max-w-md">Use an app like Google Authenticator to generate verification codes for more secure logins.</p>
                      </div>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <span className={`text-xs font-bold uppercase tracking-wider ${twoFactorEnabled ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                        <div className={`w-12 h-6 rounded-full relative transition-colors ${twoFactorEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                          <div className="absolute top-1 w-4 h-4 bg-white rounded-full transition-all" style={{ left: twoFactorEnabled ? 'calc(100% - 20px)' : '4px' }}></div>
                        </div>
                        <input type="checkbox" className="hidden" checked={twoFactorEnabled} onChange={() => setTwoFactorEnabled(!twoFactorEnabled)} />
                      </label>
                    </div>
                  </div>

                  {/* Active Sessions */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Active Sessions</h3>
                    <div className="space-y-4">
                      {/* Current Session */}
                      <div className="flex items-center justify-between p-4 border border-primary/20 rounded-xl bg-primary/5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-primary">
                            <Laptop className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 flex items-center gap-2">Windows 11 • Chrome <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-primary/20 text-primary uppercase tracking-widest">Current</span></p>
                            <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5"><Globe className="w-3.5 h-3.5" /> Lahore, Pakistan • IP: 119.160.xxx.xxx</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Past Session */}
                      <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-white">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 text-slate-400">
                            <Smartphone className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-700">iPhone 14 • Safari</p>
                            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5"><Clock className="w-3.5 h-3.5" /> Last active: 2 hours ago</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-500 font-bold text-xs"><LogOut className="w-4 h-4 mr-1.5" /> Log out</Button>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 font-bold text-xs border-red-200"><LogOut className="w-4 h-4 mr-2" /> Log out of all other devices</Button>
                    </div>
                  </div>

                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end">
                  <Button className="font-bold text-sm"><Save className="w-4 h-4 mr-2" /> Save Security Settings</Button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}
