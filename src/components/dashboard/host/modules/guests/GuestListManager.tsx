"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, UserCheck, UserX, Clock, Upload, Plus, Search, Filter, MoreHorizontal, X, FileSpreadsheet, QrCode, Camera, CheckCircle2 } from "lucide-react"

const theme = {
  primary: "#0F5B3E",
  accent: "#D4AF37",
  bg: "#FDF8F0",
  success: "#10B981"
}

export function GuestListManager({ guests, setGuests }: { guests: any[], setGuests: (g: any[]) => void }) {
  const [showImportModal, setShowImportModal] = useState(false)
  const [showScannerModal, setShowScannerModal] = useState(false)
  const [selectedQR, setSelectedQR] = useState<any>(null)
  const [scanResult, setScanResult] = useState<string | null>(null)
  
  const totalInvited = guests.reduce((acc, g) => acc + g.pax, 0)
  const confirmed = guests.filter(g => g.rsvp === 'Confirmed').reduce((acc, g) => acc + g.pax, 0)
  const declined = guests.filter(g => g.rsvp === 'Declined').reduce((acc, g) => acc + g.pax, 0)
  const arrived = guests.filter(g => g.checkin === 'Arrived').reduce((acc, g) => acc + g.pax, 0)

  const STATS = [
    { label: "Total Invited", val: totalInvited, icon: Users, color: theme.primary },
    { label: "Confirmed", val: confirmed, icon: UserCheck, color: theme.success },
    { label: "Declined", val: declined, icon: UserX, color: "#E11D48" },
    { label: "Arrived", val: arrived, icon: CheckCircle2, color: theme.accent },
  ]

  const handleScanSimulation = () => {
    setScanResult("Scanning...")
    setTimeout(() => {
      // Simulate checking in the first pending guest
      const pendingGuest = guests.find(g => g.checkin !== 'Arrived')
      if (pendingGuest) {
        setScanResult(`Success! Checked in ${pendingGuest.name} (${pendingGuest.pax} Pax)`)
        const updated = guests.map(g => g.id === pendingGuest.id ? { ...g, checkin: 'Arrived' } : g)
        setGuests(updated)
      } else {
        setScanResult("No pending guests found.")
      }
      setTimeout(() => setScanResult(null), 3000)
    }, 1500)
  }

  return (
    <div className="space-y-6 pb-24">
      {/* 🌟 KPI Stats 🌟 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {STATS.map((stat, i) => (
          <div 
            key={i} 
            className="bg-white/80 backdrop-blur-md rounded-[24px] p-6 flex items-center justify-between group hover:-translate-y-1 transition-all duration-300"
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 8px 24px rgba(212,175,55,0.15)"}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)"}
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider mb-1 text-gray-500">{stat.label}</p>
              <p className="text-3xl font-bold font-poppins" style={{ color: theme.primary }}>{stat.val}</p>
            </div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
              <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
            </div>
          </div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        
        {/* List Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 rounded-[24px] shadow-sm">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative group flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#0F5B3E]" />
              <input 
                type="text" 
                placeholder="Search guests..."
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 text-sm outline-none text-gray-700 focus:ring-2 focus:ring-[#0F5B3E]/20 focus:border-[#0F5B3E] transition-all"
                style={{ borderRadius: '12px' }}
              />
            </div>
            <button 
              className="p-2.5 bg-white border border-gray-200 text-gray-500 hover:text-[#0F5B3E] hover:border-[#D4AF37] transition-colors shrink-0"
              style={{ borderRadius: '12px' }}
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar w-full md:w-auto">
            <button 
              onClick={() => setShowScannerModal(true)} 
              className="flex items-center gap-2 px-4 py-2.5 bg-[#D4AF37] hover:bg-[#B89020] text-white font-bold transition-all active:scale-95 shadow-md shrink-0"
              style={{ borderRadius: '12px' }}
            >
              <Camera className="w-4 h-4" /> Scan QR
            </button>
            <button 
              onClick={() => setShowImportModal(true)} 
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors shrink-0 shadow-sm"
              style={{ borderRadius: '12px' }}
            >
              <Upload className="w-4 h-4" /> Import CSV
            </button>
            <button 
              className="flex items-center gap-2 px-5 py-2.5 hover:bg-[#1A7A54] text-white font-bold transition-all active:scale-95 shadow-md shrink-0"
              style={{ borderRadius: '12px', backgroundColor: theme.primary }}
            >
              <Plus className="w-4 h-4" /> Add Guest
            </button>
          </div>
        </div>

        {/* Guest Table */}
        <div className="bg-white rounded-[24px] overflow-hidden" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap font-inter">
              <thead className="bg-gray-50 border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-6 py-5">Guest Name</th>
                  <th className="px-6 py-5">Group</th>
                  <th className="px-6 py-5">RSVP Status</th>
                  <th className="px-6 py-5">Pax</th>
                  <th className="px-6 py-5">Check-in Status</th>
                  <th className="px-6 py-5 text-center">QR Pass</th>
                  <th className="px-6 py-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {guests.map((guest) => {
                  const isArrived = guest.checkin === 'Arrived'
                  return (
                    <tr key={guest.id} className="hover:bg-[#FDF8F0]/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-900">{guest.name}</td>
                      <td className="px-6 py-4 font-medium text-gray-600">{guest.group}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                          ${guest.rsvp === 'Confirmed' ? 'bg-[#10B981]/10 text-[#10B981]' : 
                            guest.rsvp === 'Declined' ? 'bg-[#E11D48]/10 text-[#E11D48]' : 
                            'bg-[#F59E0B]/10 text-[#F59E0B]'}
                        `}>
                          {guest.rsvp}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-700">{guest.pax}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border
                          ${isArrived ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20' : 
                            'bg-gray-100 text-gray-500 border-gray-200'}
                        `}>
                          {guest.checkin || 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => setSelectedQR(guest)}
                          className="w-10 h-10 mx-auto rounded-full bg-[#0F5B3E]/5 flex items-center justify-center text-[#0F5B3E] hover:bg-[#0F5B3E] hover:text-white transition-colors"
                        >
                          <QrCode className="w-5 h-5" />
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-[#0F5B3E] transition-colors p-2 hover:bg-[#0F5B3E]/5 rounded-xl">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center text-xs font-medium text-gray-500">
            <span>Showing {guests.length} of {guests.length} guests</span>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border border-gray-200 bg-white rounded-lg hover:bg-gray-100 transition-colors">Prev</button>
              <button className="px-3 py-1.5 border border-gray-200 bg-white rounded-lg hover:bg-gray-100 transition-colors">Next</button>
            </div>
          </div>
        </div>

      </motion.div>

      {/* 📸 QR Scanner Modal */}
      <AnimatePresence>
        {showScannerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-white shadow-xl overflow-hidden w-full max-w-md"
              style={{ borderRadius: '32px' }}
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-[#FDF8F0]">
                <h3 className="text-xl font-bold font-poppins text-[#1A1A1A]">Scan Guest Pass</h3>
                <button onClick={() => setShowScannerModal(false)} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 shadow-sm">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 flex flex-col items-center">
                <div className="w-64 h-64 border-4 border-dashed border-[#D4AF37] rounded-3xl mb-6 relative flex items-center justify-center bg-gray-50 overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(15,91,62,0.1)_50%)] bg-[length:100%_4px] animate-[scan_2s_linear_infinite]" />
                  <Camera className="w-12 h-12 text-gray-300 relative z-10" />
                  
                  {scanResult && (
                    <div className="absolute inset-0 bg-[#10B981] flex flex-col items-center justify-center text-white z-20">
                      <CheckCircle2 className="w-16 h-16 mb-2" />
                      <p className="font-bold text-center px-4">{scanResult}</p>
                    </div>
                  )}
                </div>
                
                <p className="text-sm font-medium text-gray-500 mb-6 text-center">
                  Align the QR code within the frame to instantly check-in the guest.
                </p>
                
                <button 
                  onClick={handleScanSimulation}
                  className="w-full py-3.5 text-white font-bold transition-all active:scale-95 shadow-lg"
                  style={{ borderRadius: '12px', backgroundColor: theme.primary }}
                >
                  Simulate QR Scan
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🎟️ Guest QR Display Modal */}
      <AnimatePresence>
        {selectedQR && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white shadow-xl p-8 flex flex-col items-center text-center relative max-w-sm w-full"
              style={{ borderRadius: '32px' }}
            >
              <button onClick={() => setSelectedQR(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                <X className="w-4 h-4" />
              </button>
              
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${theme.primary}15` }}>
                <QrCode className="w-8 h-8" style={{ color: theme.primary }} />
              </div>
              <h3 className="text-2xl font-bold font-poppins text-[#1A1A1A] mb-1">{selectedQR.name}</h3>
              <p className="text-sm font-medium text-[#D4AF37] mb-8">{selectedQR.group} • {selectedQR.pax} Pax</p>
              
              <div className="p-4 bg-white rounded-3xl shadow-sm border border-gray-100 mb-6 inline-block">
                {/* Dynamically generated QR code using an open API */}
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Nexus_Guest_${selectedQR.id}`} 
                  alt="QR Code"
                  className="w-48 h-48 rounded-xl"
                />
              </div>
              
              <button 
                onClick={() => setSelectedQR(null)}
                className="w-full py-3.5 text-[#0F5B3E] font-bold bg-[#0F5B3E]/10 transition-colors hover:bg-[#0F5B3E]/20"
                style={{ borderRadius: '12px' }}
              >
                Close Pass
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}} />

    </div>
  )
}
