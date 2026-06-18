"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Navigation, Car, AlertTriangle, CheckCircle2, Clock, Map, Utensils } from "lucide-react"

export function BaraatTracker() {
  const [status, setStatus] = useState<'not_started' | 'on_way' | 'traffic' | 'arriving'>('on_way')
  const [progress, setProgress] = useState(30) // 0 to 100 percentage
  
  // Simulate movement
  useEffect(() => {
    if (status === 'not_started' || status === 'traffic') return;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          setStatus('arriving')
          return 95;
        }
        return prev + 1;
      })
    }, 1500)
    
    return () => clearInterval(interval)
  }, [status])

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Demo Controls (Only for prototype) */}
      <div className="mb-6 p-4 bg-slate-100 rounded-xl flex gap-2 justify-center flex-wrap border border-slate-200">
        <span className="w-full text-center text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Demo Controls</span>
        <button onClick={() => {setStatus('not_started'); setProgress(0)}} className="px-3 py-1 bg-white rounded shadow-sm text-xs font-bold text-slate-600 hover:text-slate-900">Reset</button>
        <button onClick={() => {setStatus('on_way'); setProgress(30)}} className="px-3 py-1 bg-white rounded shadow-sm text-xs font-bold text-blue-600 hover:text-blue-900">On Way</button>
        <button onClick={() => {setStatus('traffic')}} className="px-3 py-1 bg-white rounded shadow-sm text-xs font-bold text-orange-600 hover:text-orange-900">Traffic</button>
        <button onClick={() => {setStatus('arriving'); setProgress(95)}} className="px-3 py-1 bg-white rounded shadow-sm text-xs font-bold text-emerald-600 hover:text-emerald-900">Arriving</button>
      </div>

      {/* Main Tracker Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 relative">
        
        {/* Map Header Area (Mock Map) */}
        <div className="h-64 bg-slate-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
          
          {/* Route Path Line */}
          <div className="absolute top-1/2 left-12 right-12 h-2 bg-slate-200 rounded-full -translate-y-1/2 shadow-inner overflow-hidden">
            <motion.div 
              className={`h-full ${status === 'traffic' ? 'bg-orange-400' : 'bg-blue-500'}`} 
              animate={{ width: `${progress}%` }} 
              transition={{ type: 'spring', bounce: 0 }}
            />
          </div>

          {/* Start Point (Groom's House) */}
          <div className="absolute top-1/2 left-12 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white bg-slate-400 shadow-md z-10" />
          
          {/* End Point (Venue) */}
          <div className="absolute top-1/2 right-12 -translate-y-1/2 translate-x-1/2 flex flex-col items-center z-10">
            <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center animate-bounce mt-[-30px]">
              <MapPin className="w-6 h-6 text-red-500" />
            </div>
            <span className="font-bold text-xs bg-white px-2 py-1 rounded-md shadow-sm mt-1">Marquee</span>
          </div>

          {/* Moving Car Marker */}
          <motion.div 
            className="absolute top-1/2 left-12 -translate-y-1/2 -translate-x-1/2 z-20"
            animate={{ x: `calc(${progress}px * 3.5)` }} // Rough mock movement
            transition={{ type: 'spring', bounce: 0 }}
          >
            <div className="relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white ${
                status === 'traffic' ? 'bg-orange-500' : 
                status === 'arriving' ? 'bg-emerald-500' : 'bg-blue-600'
              }`}>
                {status === 'traffic' ? <AlertTriangle className="w-5 h-5 text-white" /> : 
                 status === 'arriving' ? <CheckCircle2 className="w-5 h-5 text-white" /> : 
                 <Car className="w-5 h-5 text-white" />}
              </div>
              {status === 'on_way' && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 border border-white"></span>
                </span>
              )}
            </div>
          </motion.div>
        </div>

        {/* Info Panel */}
        <div className="p-8 relative bg-white rounded-t-[2rem] -mt-6">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6" />
          
          <AnimatePresence mode="wait">
            {status === 'not_started' && (
              <motion.div key="not_started" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-center py-4">
                <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-2xl font-black text-slate-900 mb-2">Preparing to Leave</h3>
                <p className="text-slate-500 font-medium">The Baraat is getting ready. We'll notify you once they depart.</p>
              </motion.div>
            )}

            {status === 'on_way' && (
              <motion.div key="on_way" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-black text-slate-900">On The Way!</h3>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center">
                    <Navigation className="w-3 h-3 mr-1" /> Live
                  </span>
                </div>
                <p className="text-slate-500 font-medium mb-6">The Baraat has departed and is heading towards the venue.</p>
                
                <div className="flex gap-4">
                  <div className="flex-1 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">ETA</p>
                    <p className="text-2xl font-black text-blue-600">25 <span className="text-sm">mins</span></p>
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Distance</p>
                    <p className="text-2xl font-black text-slate-700">8 <span className="text-sm">km</span></p>
                  </div>
                </div>
              </motion.div>
            )}

            {status === 'traffic' && (
              <motion.div key="traffic" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-black text-slate-900">Heavy Traffic</h3>
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" /> Delayed
                  </span>
                </div>
                <p className="text-slate-500 font-medium mb-6">The Baraat is stuck in some traffic. Sit back and enjoy the appetizers!</p>
                
                <div className="flex gap-4">
                  <div className="flex-1 bg-orange-50 rounded-2xl p-4 border border-orange-100">
                    <p className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">Updated ETA</p>
                    <p className="text-2xl font-black text-orange-600">45 <span className="text-sm">mins</span></p>
                  </div>
                </div>
              </motion.div>
            )}

            {status === 'arriving' && (
              <motion.div key="arriving" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-emerald-50">
                  <Car className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-2">They're Here!</h3>
                <p className="text-slate-500 font-medium mb-6">The Baraat has arrived at the venue. Please proceed to the entrance for the grand welcome.</p>
                
                <div className="inline-flex items-center gap-2 bg-pink-50 text-pink-700 px-4 py-2 rounded-xl text-sm font-bold border border-pink-100">
                  <Utensils className="w-4 h-4" /> Food will be served shortly!
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
