"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

interface RSVPWizardProps {
  guestName: string;
  maxGuests?: number;
}

export const RSVPWizard: React.FC<RSVPWizardProps> = ({ guestName, maxGuests = 4 }) => {
  const [step, setStep] = useState(0);
  
  // Form State
  const [isAttending, setIsAttending] = useState<boolean | null>(null);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [wish, setWish] = useState("");

  const handleNext = () => setStep(s => s + 1);

  const toggleRequirement = (req: string) => {
    setRequirements(prev => 
      prev.includes(req) ? prev.filter(r => r !== req) : [...prev, req]
    );
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div 
            key="step0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center space-y-8"
          >
            <h3 className="text-3xl font-serif text-nexus-charcoal">
              Assalam-o-Alaikum,<br/>
              <span className="text-nexus-emerald">{guestName}</span>
            </h3>
            <p className="text-nexus-charcoal/70 font-light">Will you be joining us to celebrate?</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button 
                onClick={() => { setIsAttending(true); handleNext(); }}
                className="px-8 py-4 bg-nexus-emerald text-white rounded-full font-medium hover:bg-emerald-800 transition-colors"
              >
                Yes, Inshallah
              </button>
              <button 
                onClick={() => { setIsAttending(false); setStep(4); }} // Skip to end if no
                className="px-8 py-4 bg-white border border-nexus-charcoal/20 text-nexus-charcoal rounded-full font-medium hover:bg-gray-50 transition-colors"
              >
                Regretfully No
              </button>
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center space-y-8"
          >
            <h3 className="text-3xl font-serif text-nexus-charcoal">How many will attend?</h3>
            <p className="text-nexus-charcoal/70 font-light">We have reserved up to {maxGuests} seats for your party.</p>
            
            <div className="flex items-center justify-center gap-6 my-8">
              <button 
                onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                className="w-12 h-12 rounded-full border border-nexus-charcoal/20 flex items-center justify-center text-xl hover:bg-gray-50"
              >-</button>
              <span className="text-4xl font-serif w-12">{guestCount}</span>
              <button 
                onClick={() => setGuestCount(Math.min(maxGuests, guestCount + 1))}
                className="w-12 h-12 rounded-full border border-nexus-charcoal/20 flex items-center justify-center text-xl hover:bg-gray-50"
              >+</button>
            </div>

            <button 
              onClick={handleNext}
              className="px-10 py-3 bg-nexus-charcoal text-white rounded-full font-medium hover:bg-black transition-colors inline-flex items-center gap-2"
            >
              Next <ArrowRight size={18} />
            </button>
          </motion.div>
        );

      case 2:
        return (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center space-y-8"
          >
            <h3 className="text-3xl font-serif text-nexus-charcoal">Any special requirements?</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-md mx-auto">
              {['Vegetarian/Vegan', 'Wheelchair Access', 'Transport Needed', 'Other'].map((req) => (
                <label 
                  key={req} 
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${requirements.includes(req) ? 'border-nexus-emerald bg-emerald-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div className={`w-5 h-5 rounded border flex items-center justify-center ${requirements.includes(req) ? 'bg-nexus-emerald border-nexus-emerald text-white' : 'border-gray-300'}`}>
                    {requirements.includes(req) && <Check size={14} />}
                  </div>
                  <span className="text-sm font-medium text-nexus-charcoal">{req}</span>
                </label>
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="px-10 py-3 bg-nexus-charcoal text-white rounded-full font-medium hover:bg-black transition-colors inline-flex items-center gap-2 mt-8"
            >
              Continue <ArrowRight size={18} />
            </button>
          </motion.div>
        );

      case 3:
        return (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center space-y-6"
          >
            <h3 className="text-3xl font-serif text-nexus-charcoal">Leave a wish</h3>
            <p className="text-nexus-charcoal/70 font-light">Share your blessings for the couple.</p>
            
            <textarea 
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              className="w-full max-w-md h-32 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-nexus-emerald focus:border-transparent outline-none resize-none mx-auto block text-nexus-charcoal"
              placeholder="May Allah bless..."
            />

            <button 
              onClick={handleNext}
              className="px-10 py-3 bg-nexus-gold text-black rounded-full font-semibold hover:bg-yellow-500 transition-colors inline-flex items-center gap-2 shadow-lg"
            >
              Submit RSVP <Check size={18} />
            </button>
          </motion.div>
        );

      case 4:
        return (
          <motion.div 
            key="step4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 py-10"
          >
            <div className="w-20 h-20 bg-nexus-emerald/10 text-nexus-emerald rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} />
            </div>
            <h3 className="text-3xl font-serif text-nexus-charcoal">JazakAllah</h3>
            <p className="text-nexus-charcoal/70 font-light text-lg">
              {isAttending 
                ? "Your response has been saved. We can't wait to celebrate with you!" 
                : "We will miss you! Thank you for letting us know."}
            </p>
            
            {isAttending && (
              <button className="mt-8 px-8 py-3 border border-nexus-charcoal text-nexus-charcoal rounded-full font-medium hover:bg-gray-50 transition-colors">
                Add to Calendar
              </button>
            )}
          </motion.div>
        );
    }
  };

  return (
    <section className="bg-nexus-creme py-32 px-4 relative overflow-hidden">
      <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-16 border border-gray-100 relative z-10">
        
        {/* Progress Bar */}
        {step < 4 && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 rounded-t-[2.5rem] overflow-hidden">
            <motion.div 
              className="h-full bg-nexus-gold"
              initial={{ width: "0%" }}
              animate={{ width: `${((step) / 4) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </section>
  );
};
