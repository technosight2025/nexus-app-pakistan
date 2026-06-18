"use client"

import React, { useState } from 'react'
import { 
  ShieldCheck, ArrowRight, MessageSquare, DollarSign, X, CheckSquare, 
  RefreshCw, AlertTriangle, Send, UserCheck, Clock, FileText
} from 'lucide-react'

export interface EscrowContract {
  id: string
  itemName: string
  category: string
  price: number
  type: 'rental' | 'gig'
  selectedTier?: string
  startDate?: string
  endDate?: string
  seatingConfig?: string
  guestCount?: string
  requirements?: string
  status: 'Requirements' | 'Escrowed' | 'Prep' | 'Execution' | 'Verification' | 'Released'
  lastMessage?: string
}

interface EscrowTrackerHubProps {
  isOpen: boolean
  onClose: () => void
  contracts: EscrowContract[]
  onUpdateStatus: (id: string, newStatus: EscrowContract['status']) => void
}

export function EscrowTrackerHub({ isOpen, onClose, contracts, onUpdateStatus }: EscrowTrackerHubProps) {
  const [selectedContractId, setSelectedContractId] = useState<string | null>(
    contracts.length > 0 ? contracts[0].id : null
  )
  const [chatInput, setChatInput] = useState("")
  const [chatLogs, setChatLogs] = useState<Record<string, Array<{ sender: 'client' | 'vendor', text: string, time: string }>>>({
    'sample-1': [
      { sender: 'vendor', text: "Salam! Thanks for securing the booking slot. I'm reviewing the floor-plan requirements.", time: "11:42 AM" },
      { sender: 'client', text: "Excellent, please make sure the lighting aligns with our floral decorations.", time: "11:45 AM" }
    ]
  })
  
  const [isTyping, setIsTyping] = useState(false)

  if (!isOpen) return null

  const activeContractId = selectedContractId || (contracts.length > 0 ? contracts[0].id : null)
  const activeContract = contracts.find(c => c.id === activeContractId)

  const milestoneSteps: Array<{ key: EscrowContract['status']; label: string; desc: string }> = [
    { key: 'Requirements', label: '1. Requirements', desc: 'Client submits parameters' },
    { key: 'Escrowed', label: '2. Escrow Lock', desc: 'Funds secured in trust' },
    { key: 'Prep', label: '3. Service Prep', desc: 'Site visit or outfit fittings' },
    { key: 'Execution', label: '4. Event Day', desc: 'Service execution & delivery' },
    { key: 'Verification', label: '5. Proof Review', desc: 'Evaluate files / rentals return' },
    { key: 'Released', label: '6. Completed', desc: 'Funds distributed to vendor' }
  ]

  const getMilestoneIndex = (status: EscrowContract['status']) => {
    return milestoneSteps.findIndex(step => step.key === status)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim() || !activeContractId) return

    const inputMsg = chatInput.trim()
    const contractChat = chatLogs[activeContractId] || []
    
    setChatLogs({
      ...chatLogs,
      [activeContractId]: [
        ...contractChat,
        { sender: 'client', text: inputMsg, time: "Just Now" }
      ]
    })
    setChatInput("")
    setIsTyping(true)

    // Simulate smart vendor reply after delay
    setTimeout(() => {
      let replyText = "Received! We will adjust the timeline and align the crew matching your guidelines."
      if (inputMsg.toLowerCase().includes("stage") || inputMsg.toLowerCase().includes("decor")) {
        replyText = "Confirmed. Our logistics coordinator will visit the marquee to measure staging space dimensions."
      } else if (inputMsg.toLowerCase().includes("photo") || inputMsg.toLowerCase().includes("shoot")) {
        replyText = "We are organizing the team cameras and drones. Raw data will be uploaded to the Nexus Memories portal."
      } else if (inputMsg.toLowerCase().includes("payment") || inputMsg.toLowerCase().includes("release")) {
        replyText = "Thank you so much! Our account ledger will update and confirm slot releases immediately."
      }

      setChatLogs(prev => ({
        ...prev,
        [activeContractId]: [
          ...(prev[activeContractId] || []),
          { sender: 'vendor', text: replyText, time: "Just Now" }
        ]
      }))
      setIsTyping(false)
    }, 1500)
  }

  const activeChat = activeContractId ? chatLogs[activeContractId] || [] : []

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      {/* Main Container */}
      <div className="absolute inset-y-0 right-0 max-w-4xl w-full bg-[#FAF7F2] shadow-2xl flex flex-col h-full z-10">
        
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E6E2DA] flex items-center justify-between sticky top-0 z-10 shadow-3xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E6F0EC] text-[#0F5B3E] flex items-center justify-center border border-[#0F5B3E]/10">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="text-base font-extrabold text-slate-900">Nexus Escrow Contract Ledger</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Secured P2P Payments & Project Milestones</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-100 rounded-full text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {contracts.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <span className="text-4xl">🧾</span>
            <h4 className="text-sm font-black text-slate-800 mt-4">No Active Escrow Contracts</h4>
            <p className="text-xs text-slate-400 font-bold mt-1 max-w-sm">
              Secure slot bookings in the marketplace to automatically deploy escrow contracts on the ledger here.
            </p>
          </div>
        ) : (
          <div className="flex-1 flex overflow-hidden">
            
            {/* Left Column: Contracts Sidebar list */}
            <div className="w-1/3 border-r border-[#E6E2DA] bg-white overflow-y-auto no-scrollbar">
              <div className="p-4 border-b border-slate-100 bg-[#FAF7F2]/50 text-left">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Engagements</span>
              </div>
              <div className="divide-y divide-slate-100">
                {contracts.map((contract) => {
                  const isActive = contract.id === activeContractId
                  return (
                    <button
                      key={contract.id}
                      onClick={() => {
                        setSelectedContractId(contract.id)
                        if (!chatLogs[contract.id]) {
                          setChatLogs(prev => ({
                            ...prev,
                            [contract.id]: [
                              { sender: 'vendor', text: `Salam! Thank you for ordering my ${contract.itemName} service. Let me know if you have custom schedule requirements.`, time: "Just Now" }
                            ]
                          }))
                        }
                      }}
                      className={`w-full p-4 text-left transition-colors hover:bg-slate-50 flex flex-col gap-1 cursor-pointer ${isActive ? 'bg-[#FAF7F2] border-l-4 border-[#0F5B3E]' : ''}`}
                    >
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="text-xs font-black text-slate-800 line-clamp-1 leading-snug">{contract.itemName}</h4>
                        <span className="text-[8px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md font-bold uppercase shrink-0">
                          {contract.type === 'rental' ? 'Rental' : 'Gig'}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline mt-1">
                        <span className="text-[10px] text-[#0F5B3E] font-black">Rs. {contract.price.toLocaleString()}</span>
                        <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded-full ${
                          contract.status === 'Released' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {contract.status}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Right Column: Selected Contract details workspace */}
            <div className="w-2/3 flex flex-col h-full bg-[#FAF7F2] overflow-y-auto no-scrollbar">
              {activeContract ? (
                <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-6">
                    {/* Contract Quick summary row */}
                    <div className="bg-white rounded-2xl p-5 border border-[#E6E2DA] text-left flex justify-between items-start">
                      <div className="space-y-2">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">Contract Details</span>
                        <h3 className="text-base font-extrabold text-slate-800 leading-snug">{activeContract.itemName}</h3>
                        <p className="text-[10px] text-slate-400 font-bold">Category: {activeContract.category}</p>
                        
                        {/* Parameters details depending on type */}
                        <div className="pt-2 text-[10px] font-bold text-slate-600 space-y-1">
                          {activeContract.startDate && (
                            <div className="flex gap-1">
                              <span className="text-slate-400 font-medium">Booking Dates:</span>
                              <span>{activeContract.startDate} to {activeContract.endDate}</span>
                            </div>
                          )}
                          {activeContract.seatingConfig && (
                            <div className="flex gap-1">
                              <span className="text-slate-400 font-medium">Arrangement:</span>
                              <span>{activeContract.seatingConfig}</span>
                            </div>
                          )}
                          {activeContract.selectedTier && (
                            <div className="flex gap-1">
                              <span className="text-slate-400 font-medium">Gig Tier:</span>
                              <span className="text-[#0F5B3E] font-extrabold">{activeContract.selectedTier} package</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-right space-y-1">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">Escrow locked</span>
                        <div className="text-lg font-black text-[#0F5B3E]">Rs. {activeContract.price.toLocaleString()}</div>
                        <div className="inline-flex items-center gap-1 text-[8px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider mt-1.5">
                          🛡️ Secured
                        </div>
                      </div>
                    </div>

                    {/* Milestones Flow Diagram (Airbnb/Fiverr style) */}
                    <div className="space-y-3 text-left">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-1">
                        <Clock className="w-4 h-4 text-[#0F5B3E]" /> Project Milestones & Verification Timeline
                      </h4>

                      <div className="bg-white rounded-2xl border border-[#E6E2DA] p-5 space-y-4">
                        <div className="relative flex justify-between items-center w-full">
                          {/* Horizon line connecting steps */}
                          <div className="absolute top-3.5 left-0 right-0 h-1 bg-slate-100 -z-0" />
                          <div 
                            className="absolute top-3.5 left-0 h-1 bg-[#0F5B3E] transition-all duration-500 -z-0" 
                            style={{ width: `${(getMilestoneIndex(activeContract.status) / (milestoneSteps.length - 1)) * 100}%` }}
                          />

                          {milestoneSteps.map((step, idx) => {
                            const stepIdx = getMilestoneIndex(activeContract.status)
                            const isPast = idx < stepIdx
                            const isCurrent = idx === stepIdx
                            const isFuture = idx > stepIdx

                            return (
                              <div key={step.key} className="flex flex-col items-center relative z-10">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                                  isPast 
                                    ? 'bg-[#0F5B3E] text-white' 
                                    : isCurrent 
                                      ? 'bg-amber-400 text-slate-900 ring-4 ring-amber-100' 
                                      : 'bg-white border border-[#E6E2DA] text-slate-400'
                                }`}>
                                  {isPast ? '✓' : idx + 1}
                                </div>
                                <span className={`text-[8px] font-black mt-2 uppercase tracking-wide ${isCurrent ? 'text-[#0F5B3E]' : 'text-slate-400'}`}>
                                  {step.key}
                                </span>
                              </div>
                            )
                          })}
                        </div>

                        {/* Milestone Description Box */}
                        <div className="bg-[#FAF7F2] border border-[#E6E2DA] p-3 rounded-xl flex items-start gap-2 text-left">
                          <FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[9px] font-black text-[#0F5B3E] uppercase tracking-wider block">Current Phase: {activeContract.status}</span>
                            <p className="text-[10px] text-slate-500 font-semibold leading-normal mt-0.5">
                              {activeContract.status === 'Requirements' && "Waiting for the client and vendor to confirm requirements specifications."}
                              {activeContract.status === 'Escrowed' && "Funds are secured in trust escrow. Vendor is preparing materials."}
                              {activeContract.status === 'Prep' && "Active preparation phase. Client and vendor are coordinating details."}
                              {activeContract.status === 'Execution' && "Event execution is in progress. Verify service delivery today."}
                              {activeContract.status === 'Verification' && "Completed! Review digital assets, photos, or rental returns before releasing payment."}
                              {activeContract.status === 'Released' && "Transaction complete. Funds have been distributed to the provider's ledger."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chat Panel Simulator */}
                    <div className="space-y-3 text-left">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-1">
                        <MessageSquare className="w-4 h-4 text-[#0F5B3E]" /> Direct Host / Specialist Chat
                      </h4>

                      <div className="bg-white rounded-2xl border border-[#E6E2DA] flex flex-col h-64 overflow-hidden">
                        {/* Message log */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none text-[10px]">
                          {activeChat.map((msg, i) => (
                            <div 
                              key={i} 
                              className={`flex flex-col text-left space-y-1 max-w-[80%] ${msg.sender === 'client' ? 'ml-auto' : 'mr-auto'}`}
                            >
                              <span className={`px-3 py-2 rounded-2xl leading-normal font-semibold ${msg.sender === 'client' ? 'bg-[#0F5B3E] text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'}`}>
                                {msg.text}
                              </span>
                              <span className={`text-[8px] text-slate-400 font-bold ${msg.sender === 'client' ? 'text-right' : 'text-left'}`}>{msg.time}</span>
                            </div>
                          ))}
                          
                          {isTyping && (
                            <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-2xl w-16 rounded-bl-none text-slate-500 mr-auto">
                              <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" />
                              <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                              <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                            </div>
                          )}
                        </div>

                        {/* Input form */}
                        <form onSubmit={handleSendMessage} className="p-3 bg-[#FAF7F2] border-t border-[#E6E2DA] flex gap-2">
                          <input 
                            type="text" 
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Type a message to host/specialist..." 
                            className="flex-1 px-3 py-2 bg-white border border-[#E6E2DA] rounded-xl text-xs outline-none focus:border-[#0F5B3E]"
                          />
                          <button type="submit" className="p-2 bg-[#0F5B3E] hover:bg-[#0d4d34] text-white rounded-xl transition-colors cursor-pointer">
                            <Send className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>

                  {/* Actions footer inside selected contract */}
                  <div className="pt-6 border-t border-[#E6E2DA] mt-6 flex justify-between gap-3 bg-white -mx-6 -mb-6 p-6 rounded-b-[2rem]">
                    <div className="flex gap-2">
                      {activeContract.status !== 'Released' && (
                        <>
                          <button 
                            onClick={() => {
                              onUpdateStatus(activeContract.id, 'Verification')
                              alert("Milestone updated to Verification phase. Please review work details.")
                            }}
                            className="px-4.5 py-2.5 bg-white border border-[#E6E2DA] hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <RefreshCw className="w-4 h-4" /> Request Verification
                          </button>
                          
                          <button 
                            onClick={() => alert("Dispute submitted. Nexus support specialist will coordinate details.")}
                            className="px-4.5 py-2.5 bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <AlertTriangle className="w-4 h-4" /> Open Dispute
                          </button>
                        </>
                      )}
                    </div>

                    <div>
                      {activeContract.status !== 'Released' ? (
                        <button 
                          onClick={() => {
                            onUpdateStatus(activeContract.id, 'Released')
                            alert("Success! Funds released from Escrow trust to Vendor's billing account.")
                          }}
                          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-transform active:scale-95 shadow-md flex items-center gap-1.5 cursor-pointer block"
                        >
                          <UserCheck className="w-4 h-4" /> Release Funds to Vendor
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                          ✓ Contract Fully Settled
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-slate-400 font-bold">
                  Select a contract to view details.
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  )
}
