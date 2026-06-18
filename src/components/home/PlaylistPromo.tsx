"use client"
import { motion } from "framer-motion"
import { Music2, Play, ChevronRight, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PlaylistPromo() {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-[url('/images/pakistani_wedding_venue.png')] bg-cover bg-center opacity-10 mix-blend-luminosity pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white font-bold mb-6 text-sm backdrop-blur-sm"
            >
              <Music2 className="w-4 h-4 text-orange-400" /> EVENT SOUNDTRACK
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black mb-6 leading-tight"
            >
              Curate the Perfect <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-primary">Shaadi Beats</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-300 font-medium mb-8 leading-relaxed"
            >
              From epic Bridal Entries to the ultimate Couple Dance. And yes—we even have the lyrics for traditional Dholki Tappay so your family can sing along!
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/tools/shaadi-beats">
                <Button className="bg-gradient-to-r from-orange-500 to-primary hover:from-orange-600 hover:to-primary/90 text-white rounded-2xl py-7 px-8 font-bold text-lg shadow-xl shadow-orange-500/20 transition-all hover:scale-105 group border-0">
                  <Play className="w-5 h-5 mr-2 fill-white group-hover:scale-110 transition-transform" /> Browse Playlists
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Visual (Interactive mock player) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 md:p-8 shadow-lg relative"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl flex items-center gap-2"><span className="text-2xl">🥁</span> Dholki Classics</h3>
              <span className="text-xs font-bold px-3 py-1 bg-white/10 rounded-full">Lyrics Available</span>
            </div>

            <div className="space-y-4">
              {[
                { title: 'Lathe Di Chadar', artist: 'Traditional', playing: true },
                { title: 'Kala Shah Kala', artist: 'Noor Jehan', playing: false },
                { title: 'Bibi Shirini', artist: 'Traditional', playing: false },
              ].map((song, i) => (
                <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer ${song.playing ? 'bg-white/10 border border-white/20' : 'hover:bg-white/5 border border-transparent'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${song.playing ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    <Play className={`w-4 h-4 ${song.playing ? 'fill-current' : ''}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold ${song.playing ? 'text-white' : 'text-slate-200'}`}>{song.title}</h4>
                    <p className="text-sm text-slate-400 font-medium">{song.artist}</p>
                  </div>
                  {song.playing && (
                    <div className="flex items-center gap-1 text-orange-400 text-xs font-bold px-2 py-1 bg-orange-500/10 rounded-lg border border-orange-500/20 animate-pulse">
                      <FileText className="w-3 h-3" /> LYRICS
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mock Lyrics Popup */}
            <div className="absolute -bottom-6 -right-6 md:-right-12 bg-orange-100 text-orange-900 rounded-2xl p-6 shadow-lg w-64 md:w-80 rotate-3 border-2 border-orange-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-orange-600">Now Singing</span>
                <Music2 className="w-4 h-4 text-orange-500" />
              </div>
              <p className="font-bold italic text-lg leading-snug">"Lathe di chadar utte saleti rang mahiya... Aavo samne..."</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
