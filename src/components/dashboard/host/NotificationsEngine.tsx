"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Check, CheckCircle2, Clock, Wallet, Users, Info, X } from "lucide-react"

export function NotificationsEngine() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Payment Due",
      message: "Deposit of Rs 150,000 for Grand Taj Marquee is due tomorrow.",
      time: "2 hours ago",
      type: "alert",
      icon: Wallet,
      color: "text-[#FF6B6B]",
      bg: "bg-[#FF6B6B]/10",
      isRead: false
    },
    {
      id: 2,
      title: "New RSVPs",
      message: "Ali Khan & Family (4 pax) confirmed their attendance.",
      time: "5 hours ago",
      type: "success",
      icon: Users,
      color: "text-[#6BCB77]",
      bg: "bg-[#6BCB77]/10",
      isRead: false
    },
    {
      id: 3,
      title: "Task Reminder",
      message: "Approve Decor Design before the deadline.",
      time: "1 day ago",
      type: "warning",
      icon: Clock,
      color: "text-[#FFD93D]",
      bg: "bg-[#FFD93D]/20",
      isRead: true
    },
    {
      id: 4,
      title: "Vendor Quote Received",
      message: "Royal Aesthetics sent a quotation for review.",
      time: "2 days ago",
      type: "info",
      icon: Info,
      color: "text-[#4D96FF]",
      bg: "bg-[#4D96FF]/10",
      isRead: true
    }
  ])

  const unreadCount = notifications.filter(n => !n.isRead).length

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })))
  }

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n))
  }

  return (
    <div className="relative" ref={dropdownRef}>
      
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2.5 rounded-full transition-all ${
          isOpen ? 'bg-white/80 text-[#FF6B6B] shadow-sm' : 'text-slate-400 hover:bg-white/50 hover:text-[#FF6B6B]'
        }`}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#FF6B6B] rounded-full border-2 border-white shadow-[0_0_8px_rgba(255,107,107,0.8)] animate-pulse" />
        )}
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="absolute right-0 mt-3 w-80 sm:w-96 bg-white/90 backdrop-blur-2xl border border-white shadow-[0_20px_60px_rgba(0,0,0,0.1)] rounded-3xl overflow-hidden z-50 origin-top-right"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-100/50 flex justify-between items-center bg-white/50 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-800">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="bg-[#FF6B6B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {unreadCount} New
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className="text-[11px] font-semibold text-[#4D96FF] hover:text-[#3b82f6] flex items-center gap-1 transition-colors"
                >
                  <Check className="w-3 h-3" /> Mark all read
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-[400px] overflow-y-auto no-scrollbar flex flex-col">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  <Bell className="w-8 h-8 mx-auto mb-3 text-slate-300" />
                  <p className="text-sm font-medium">You're all caught up!</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    onClick={() => markAsRead(notification.id)}
                    className={`p-4 border-b border-slate-50 last:border-0 hover:bg-white/60 transition-colors cursor-pointer relative group flex items-start gap-3 ${
                      !notification.isRead ? 'bg-white/40' : 'opacity-70'
                    }`}
                  >
                    {!notification.isRead && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF6B6B] to-[#FF8E8B]" />
                    )}
                    
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white shadow-sm ${notification.bg} ${notification.color}`}>
                      <notification.icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0 pr-6">
                      <h4 className="text-sm font-bold text-slate-800 truncate mb-0.5">{notification.title}</h4>
                      <p className="text-[11px] font-medium text-slate-500 leading-snug line-clamp-2">{notification.message}</p>
                      <span className="text-[10px] font-semibold text-slate-400 mt-1 block">{notification.time}</span>
                    </div>

                    {!notification.isRead && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          markAsRead(notification.id)
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-green-500 hover:border-green-200"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-slate-100/50 bg-slate-50/50 text-center">
              <button className="text-[11px] font-bold text-slate-500 hover:text-slate-800 transition-colors">
                View All Notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
