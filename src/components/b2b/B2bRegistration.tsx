"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Building2, Sparkles } from "lucide-react"

interface B2bRegistrationProps {
  isUrdu: boolean;
}

export function B2bRegistration({ isUrdu }: B2bRegistrationProps) {
  const router = useRouter()
  const [businessName, setBusinessName] = useState("")
  const [city, setCity] = useState("Lahore")
  const [category, setCategory] = useState("venue")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const launchData = {
      role: "owner",
      businessName,
      city,
      category
    }
    localStorage.setItem("nexus_launch_journey", JSON.stringify(launchData))
    router.push(`/onboarding?role=owner`)
  }

  return (
    <section id="registration" className="py-16 px-4 md:px-8 bg-[#FAF7F2] border-t border-[#E6E2DA] select-none">
      <div className="max-w-xl mx-auto">
        
        <div className="bg-white border border-[#E6E2DA] rounded-3xl p-6 md:p-8 shadow-md space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2" dir="ltr">
            <div className="w-12 h-12 rounded-full bg-[#0F5B3E]/10 flex items-center justify-center mx-auto border border-[#0F5B3E]/20 mb-3">
              <Building2 className="w-5 h-5 text-[#0F5B3E]" />
            </div>
            
            <h3 className="text-xl font-black text-[#1D1C17] uppercase tracking-wider">
              {isUrdu ? "Business Register Krain" : "Register Your Business"}
            </h3>
            
            <p className="text-xs text-[#5E6460] font-medium leading-relaxed font-sans">
              {isUrdu 
                ? "Apne hall, marquee, ya catering business ki details likhain aur system activate krain." 
                : "Enter your enterprise details below to provision your workspace database."
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" dir="ltr">
            
            {/* Business Name */}
            <div className="space-y-1">
              <label className="text-[9px] text-[#5E6460] font-black uppercase tracking-wider block">
                {isUrdu ? "Business Ka Naam" : "Business Name"}
              </label>
              <input
                type="text"
                required
                placeholder={isUrdu ? "e.g. Shalimar Caterers" : "e.g. Shalimar Caterers"}
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E6E2DA] focus:border-[#0F5B3E] focus:ring-1 focus:ring-[#0F5B3E] rounded-xl p-3.5 text-xs font-semibold text-foreground outline-none transition-all text-left"
              />
            </div>

            {/* City Location */}
            <div className="space-y-1">
              <label className="text-[9px] text-[#5E6460] font-black uppercase tracking-wider block">
                {isUrdu ? "Operating City" : "Operating City"}
              </label>
              <div className="relative">
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#E6E2DA] focus:border-[#0F5B3E] focus:ring-1 focus:ring-[#0F5B3E] rounded-xl p-3.5 text-xs font-semibold text-foreground outline-none transition-all appearance-none"
                >
                  <option value="Lahore">Lahore</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Karachi">Karachi</option>
                </select>
              </div>
            </div>

            {/* Specialty Category */}
            <div className="space-y-1">
              <label className="text-[9px] text-[#5E6460] font-black uppercase tracking-wider block">
                {isUrdu ? "Specialty Category" : "Specialty Category"}
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#E6E2DA] focus:border-[#0F5B3E] focus:ring-1 focus:ring-[#0F5B3E] rounded-xl p-3.5 text-xs font-semibold text-foreground outline-none transition-all appearance-none"
                >
                  <option value="venue">{isUrdu ? "Shadi Hall / Marquee" : "Banquet Hall / Marquee"}</option>
                  <option value="caterer">{isUrdu ? "Catering Company" : "Catering Company"}</option>
                  <option value="decorator">{isUrdu ? "Stage & Floral Decor" : "Stage & Floral Decor"}</option>
                  <option value="studio">{isUrdu ? "Photography Studio" : "Photography Studio"}</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 bg-[#0F5B3E] hover:bg-[#0c4a32] text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer mt-4"
            >
              <Sparkles className="w-4 h-4 text-[#C9A227] fill-[#C9A227]" />
              {isUrdu ? "Enterprise OS Activate Krain" : "Provision Enterprise OS"}
            </button>

          </form>

        </div>

      </div>
    </section>
  )
}
