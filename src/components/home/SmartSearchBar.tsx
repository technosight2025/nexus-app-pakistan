"use client"
import { ElementType, useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin, Users, Calendar, Navigation, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Custom Animated Dropdown Component
function AnimatedSelect({ icon: Icon, placeholder, options }: { icon: ElementType, placeholder: string, options: { value: string, label: string }[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative group" ref={dropdownRef}>
      <Icon className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors z-10 pointer-events-none ${isOpen ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full pl-10 pr-10 h-14 bg-background border text-left rounded-xl font-medium outline-none transition-all flex items-center justify-between ${
          isOpen ? 'border-primary ring-2 ring-primary/20 text-foreground' : 'border-outline text-foreground hover:border-primary/50'
        }`}
      >
        <span className={selected ? "text-foreground" : "text-muted-foreground"}>
          {selected ? options.find(o => o.value === selected)?.label : placeholder}
        </span>
      </button>

      <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-transform duration-300 pointer-events-none ${isOpen ? 'rotate-180 text-primary' : ''}`} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-[calc(100%+8px)] left-0 w-full bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-outline overflow-hidden z-50 origin-top"
          >
            <div className="max-h-60 overflow-y-auto py-2">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setSelected(option.value)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors hover:bg-primary/5 ${
                    selected === option.value ? 'bg-primary/10 text-primary' : 'text-foreground'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function SmartSearchBar() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
        className="bg-white/90 backdrop-blur-xl rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-4 md:p-6 border border-white"
      >
        <div className="flex justify-between items-center mb-4 px-4">
          <h3 className="font-black text-xl text-foreground flex items-center gap-2">
            <span className="text-2xl">🎉</span> Find Your Perfect Vendors
          </h3>
          <span className="hidden md:inline-block text-xs font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
            Apna event plan karna shuru karein
          </span>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4" onSubmit={(e) => e.preventDefault()}>
          <AnimatedSelect 
            icon={Search} 
            placeholder="Event Type" 
            options={[
              { value: "wedding", label: "Wedding" },
              { value: "mehndi", label: "Mehndi / Mayun" },
              { value: "corporate", label: "Corporate Event" },
              { value: "birthday", label: "Birthday Party" }
            ]} 
          />
          
          <AnimatedSelect 
            icon={MapPin} 
            placeholder="City" 
            options={[
              { value: "lahore", label: "Lahore" },
              { value: "karachi", label: "Karachi" },
              { value: "islamabad", label: "Islamabad" }
            ]} 
          />

          <AnimatedSelect 
            icon={Navigation} 
            placeholder="Area" 
            options={[
              { value: "dha", label: "DHA" },
              { value: "gulberg", label: "Gulberg" },
              { value: "bahria", label: "Bahria Town" },
              { value: "johar", label: "Johar Town" }
            ]} 
          />

          <div className="relative group">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
            <Input type="number" placeholder="Guests" className="pl-10 h-14 bg-background border border-outline rounded-xl text-foreground font-medium focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 hover:border-primary/50 transition-colors" />
          </div>

          <div className="relative group">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
            <Input type="date" className="pl-10 pr-4 h-14 bg-background border border-outline rounded-xl text-foreground font-medium focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 hover:border-primary/50 transition-colors" />
          </div>

          <Button type="submit" className="h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black text-lg shadow-[0_8px_20px_rgba(255,56,92,0.3)] hover:-translate-y-1 transition-all">
            Find Options
          </Button>
        </form>
      </motion.div>
    </div>
  )
}
