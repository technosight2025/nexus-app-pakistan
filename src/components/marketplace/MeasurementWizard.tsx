"use client"

import React, { useState } from 'react'
import { X, ChevronRight, ChevronLeft, Check, Ruler } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface MeasurementWizardProps {
  onClose: () => void
  onComplete: (measurements: string, rawValues: Record<string, string>) => void
}

const MEASUREMENT_STEPS = [
  {
    id: "teera",
    title: "Shoulders (Teera)",
    description: "Measure straight across the top of your shoulders from one edge to the other.",
    image: "/images/guides/shoulders_teera_guide_1781438968176.png"
  },
  {
    id: "chati",
    title: "Chest (Chati)",
    description: "Measure horizontally across the fullest part of your bust/chest, keeping the tape comfortably loose.",
    image: "/images/guides/chest_chati_guide_1781438979422.png"
  },
  {
    id: "kamar",
    title: "Waist (Kamar)",
    description: "Measure horizontally around your natural waistline, usually the narrowest part of your torso.",
    image: "/images/guides/waist_kamar_guide_1781438990545.png"
  },
  {
    id: "ghair",
    title: "Hips (Ghair)",
    description: "Stand with feet together and measure horizontally around the fullest part of your hips.",
    image: "/images/guides/hips_ghair_guide_1781439007930.png"
  },
  {
    id: "lambaai",
    title: "Length (Lambaai)",
    description: "Measure vertically from the top of your shoulder down to your desired length (e.g. knees or floor).",
    image: "/images/guides/length_lambaai_guide_1781439020122.png"
  },
  {
    id: "bazu",
    title: "Sleeves (Bazu)",
    description: "Measure along your arm from the edge of your shoulder down to your desired sleeve length (e.g. wrist).",
    image: "/images/guides/sleeves_bazu_guide_1781439033489.png"
  }
]

export function MeasurementWizard({ onClose, onComplete }: MeasurementWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [values, setValues] = useState<Record<string, string>>({
    teera: "",
    chati: "",
    kamar: "",
    ghair: "",
    lambaai: "",
    bazu: ""
  })

  const handleNext = () => {
    if (currentStep < MEASUREMENT_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      // Complete
      const formatted = Object.entries(values)
        .filter(([_, val]) => val.trim() !== "")
        .map(([key, val]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${val}in`)
        .join(", ")
      onComplete(formatted, values)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const stepData = MEASUREMENT_STEPS[currentStep]
  const progress = ((currentStep + 1) / MEASUREMENT_STEPS.length) * 100

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
      >
        {/* Header */}
        <div className="bg-[#052E20] p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <Ruler className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold tracking-wide text-lg leading-tight">Measurement Guide</h3>
              <p className="text-white/60 text-xs font-medium">Step {currentStep + 1} of {MEASUREMENT_STEPS.length}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-100 w-full">
          <div 
            className="h-full bg-amber-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col sm:flex-row p-6 gap-8">
          {/* Visual Guide */}
          <div className="w-full sm:w-1/2 aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden relative border border-gray-100 shadow-inner group">
            <img 
              src={stepData.image} 
              alt={stepData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-4">
               <span className="text-white font-bold text-xs uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-white/10">
                 {stepData.title}
               </span>
            </div>
            {/* HTML Overlay Instruction */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 pt-12 transform translate-y-0 transition-transform">
               <p className="text-white font-medium text-sm drop-shadow-md">
                 <span className="text-[#D4AF37] font-bold block mb-1">PRO TIP</span>
                 {stepData.description}
               </p>
            </div>
          </div>

          {/* Instructions & Input */}
          <div className="w-full sm:w-1/2 flex flex-col justify-center">
            <h2 className="text-2xl font-black text-[#052E20] mb-3">{stepData.title}</h2>
            <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8">
              {stepData.description}
            </p>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Enter Measurement (Inches)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={values[stepData.id]}
                  onChange={(e) => setValues(prev => ({ ...prev, [stepData.id]: e.target.value }))}
                  placeholder="e.g. 34"
                  className="w-full pl-4 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl text-lg font-bold text-gray-700 focus:outline-none focus:border-[#0F5B3E] focus:bg-white transition-colors"
                  autoFocus
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <button 
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 ${
              currentStep === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-200 bg-gray-100'
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          
          <button 
            onClick={handleNext}
            className="px-8 py-3 bg-[#0F5B3E] hover:bg-[#0A422C] text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center gap-2"
          >
            {currentStep < MEASUREMENT_STEPS.length - 1 ? (
              <>Next Step <ChevronRight className="w-4 h-4" /></>
            ) : (
              <>Save Measurements <Check className="w-4 h-4" /></>
            )}
          </button>
        </div>

      </motion.div>
    </div>
  )
}
