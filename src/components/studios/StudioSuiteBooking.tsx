"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, Tv, X, CheckCircle, Sparkles } from "lucide-react"

interface SpaceOption {
  id: string
  name: string
  location: string
  rate: string
  image: string
}

const SPACES: SpaceOption[] = [
  { id: "sp1", name: "Main Infinity Cyclorama Hall", location: "Lahore - Aura Fashion Bay", rate: "PKR 60,000 / Day", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=150&q=80" },
  { id: "sp2", name: "Dolby Atmos Recording Desk", location: "Karachi - Echo Sound Stage", rate: "PKR 50,000 / Day", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=150&q=80" },
  { id: "sp3", name: "Virtual Unreal Chromakey Studio", location: "Islamabad - Apex Production", rate: "PKR 120,000 / Day", image: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?auto=format&fit=crop&w=150&q=80" },
]

const TIME_SLOTS = [
  { id: "ts1", label: "Morning Block (09:00 AM - 01:00 PM)", discount: "Standard" },
  { id: "ts2", label: "Afternoon Block (02:00 PM - 06:00 PM)", discount: "Standard" },
  { id: "ts3", label: "Evening Block (07:00 PM - 11:00 PM)", discount: "+15% Night Shift" },
  { id: "ts4", label: "Full Day Access (09:00 AM - 09:00 PM)", discount: "Save 10%" },
]

const NEXT_DAYS = [
  { id: "d1", dayName: "Mon", dateStr: "Jun 08" },
  { id: "d2", dayName: "Tue", dateStr: "Jun 09" },
  { id: "d3", dayName: "Wed", dateStr: "Jun 10" },
  { id: "d4", dayName: "Thu", dateStr: "Jun 11" },
  { id: "d5", dayName: "Fri", dateStr: "Jun 12" },
]

export function StudioSuiteBooking() {
  const [selectedSpace, setSelectedSpace] = useState<SpaceOption>(SPACES[0])
  const [selectedDate, setSelectedDate] = useState(NEXT_DAYS[0].id)
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0].id)
  const [isReserving, setIsReserving] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [purpose, setPurpose] = useState("")

  const activeDateDetails = NEXT_DAYS.find(d => d.id === selectedDate)
  const activeSlotDetails = TIME_SLOTS.find(ts => ts.id === selectedSlot)

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setBookingConfirmed(true)
    setTimeout(() => {
      setIsReserving(false)
      setBookingConfirmed(false)
      setName("")
      setPhone("")
      setEmail("")
      setPurpose("")
    }, 3000)
  }

  return (
    <section className="py-16 bg-white border-b border-outline">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-3">
            <Clock className="w-4 h-4" /> Live Scheduler
          </div>
          <h2 className="text-3xl font-black text-foreground tracking-tight mb-2">
            Book Production Slots Online
          </h2>
          <p className="text-muted-foreground font-medium">
            Lock in dates and equipment packages instantly without back-and-forth emails.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Stage Selection (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <label className="text-sm font-black text-foreground block mb-3">1. Select Studio Space</label>
              <div className="space-y-3">
                {SPACES.map((space) => (
                  <div
                    key={space.id}
                    onClick={() => setSelectedSpace(space)}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 cursor-pointer ${
                      selectedSpace.id === space.id
                        ? "border-primary bg-primary/5"
                        : "border-outline bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-outline shrink-0">
                        <img src={space.image} alt={space.name} className="object-cover w-full h-full" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-foreground">{space.name}</h4>
                        <p className="text-xs text-muted-foreground font-semibold mt-0.5">{space.location}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-muted-foreground block">Day Rate</span>
                      <span className="font-black text-primary text-sm">{space.rate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Date strip selector */}
            <div>
              <label className="text-sm font-black text-foreground block mb-3">2. Select Shooting Date</label>
              <div className="flex gap-2 overflow-x-auto pb-1 max-w-full">
                {NEXT_DAYS.map((day) => (
                  <button
                    key={day.id}
                    onClick={() => setSelectedDate(day.id)}
                    className={`flex-1 min-w-[70px] py-3 px-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
                      selectedDate === day.id
                        ? "border-primary bg-primary text-white"
                        : "border-outline bg-slate-50 hover:bg-slate-100 text-foreground"
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider block opacity-85">{day.dayName}</span>
                    <span className="text-sm font-black mt-0.5">{day.dateStr}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Time Slots & Summary (5 cols) */}
          <div className="lg:col-span-5 bg-card rounded-3xl border border-outline p-6 lg:p-8 flex flex-col justify-between h-full min-h-[400px]">
            <div>
              <label className="text-sm font-black text-foreground block mb-4">3. Available Booking Slots</label>
              <div className="space-y-2">
                {TIME_SLOTS.map((slot) => (
                  <div
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${
                      selectedSlot === slot.id
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-outline bg-white hover:border-slate-300 text-muted-foreground"
                    }`}
                  >
                    <span className="text-xs font-bold text-foreground">{slot.label}</span>
                    <span className="text-[10px] font-black uppercase bg-slate-100 px-2 py-0.5 rounded border border-outline text-muted-foreground">
                      {slot.discount}
                    </span>
                  </div>
                ))}
              </div>

              {/* Summary Block */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-outline">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Booking Summary</span>
                <div className="space-y-1 text-xs font-semibold text-foreground">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Space:</span>
                    <span>{selectedSpace.name.split(" ")[1]} Stage</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{activeDateDetails?.dayName}, {activeDateDetails?.dateStr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hours:</span>
                    <span>{activeSlotDetails?.label.split(" (")[1]?.replace(")", "") || "Full Day"}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsReserving(true)}
              className="mt-6 w-full bg-primary hover:bg-primary/95 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-none flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Book Selected Slot
            </button>
          </div>

        </div>
      </div>

      {/* Modal Booking Form */}
      <AnimatePresence>
        {isReserving && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-outline w-full max-w-lg p-6 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
            >
              <button
                onClick={() => setIsReserving(false)}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground rounded-lg transition-colors border border-outline bg-slate-50"
              >
                <X className="w-4 h-4" />
              </button>

              {bookingConfirmed ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CheckCircle className="w-16 h-16 text-primary mb-4 animate-bounce" />
                  <h3 className="text-xl font-black text-foreground mb-2">Slot Locked Successfully!</h3>
                  <p className="text-sm font-medium text-muted-foreground max-w-xs">
                    Your reservation receipt has been sent to <strong>{email}</strong>. Booking Code: <strong>NXS-ST-6492</strong>.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-primary">
                    <Sparkles className="w-4 h-4" /> Confirming with studio manager...
                  </div>
                </div>
              ) : (
                <form onSubmit={handleReserveSubmit} className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-1">
                      Finalize Space Reservation
                    </span>
                    <h3 className="font-bold text-lg text-foreground leading-tight">
                      {selectedSpace.name}
                    </h3>
                    <p className="text-xs text-muted-foreground font-semibold mt-1">
                      {activeDateDetails?.dayName}, {activeDateDetails?.dateStr} • {activeSlotDetails?.label}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-xs font-bold text-foreground block mb-1">Production Lead / Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nabeel Qureshi"
                        className="w-full px-3 py-2 border border-outline rounded-xl text-sm font-medium focus:ring-1 focus:ring-primary outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-foreground block mb-1">Contact Email</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="nabeel@filmpakistan.com"
                          className="w-full px-3 py-2 border border-outline rounded-xl text-sm font-medium focus:ring-1 focus:ring-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-foreground block mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="0333-1234567"
                          className="w-full px-3 py-2 border border-outline rounded-xl text-sm font-medium focus:ring-1 focus:ring-primary outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-foreground block mb-1">Production Details (Purpose & Equipment needed)</label>
                      <textarea
                        required
                        rows={3}
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        placeholder="We are shooting a wedding highlight reel showcase. Need standard dressing room access and steady tripod rigs..."
                        className="w-full px-3 py-2 border border-outline rounded-xl text-sm font-medium focus:ring-1 focus:ring-primary outline-none resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setIsReserving(false)}
                      className="flex-1 py-3 border border-outline rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-primary hover:bg-primary/95 text-white rounded-xl text-sm font-bold shadow-sm transition-colors"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
