"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Music2, Plus, Heart, Share2, FileText, ChevronDown, ChevronUp, Users, Radio, Check, X, Search, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"

const CATEGORIES = [
  { id: 'dholki', name: 'Dholki & Tappay', icon: '🥁', color: 'bg-orange-100 text-orange-600' },
  { id: 'bridal', name: 'Bridal Entry', icon: '✨', color: 'bg-pink-100 text-pink-600' },
  { id: 'baraat', name: 'Groom Entry', icon: '🐎', color: 'bg-emerald-100 text-emerald-600' },
  { id: 'dance', name: 'Couple Dance', icon: '💃', color: 'bg-purple-100 text-purple-600' },
]

const INITIAL_TRACKS = {
  dholki: [
    { id: 1, title: 'Lathe Di Chadar', artist: 'Traditional / Musarrat Nazir', duration: '3:45', hasLyrics: true, lyrics: "Lathe di chadar utte saleti rang mahiya...\nAavo samne, aavo samne, aavo samne...\nKolon di rus ke na lang mahiya..." },
    { id: 2, title: 'Bibi Shirini', artist: 'Traditional', duration: '4:10', hasLyrics: true, lyrics: "Bibi shirini, bibi shirini...\nTere te sadqay jawan bibi shirini..." },
    { id: 3, title: 'Kala Shah Kala', artist: 'Noor Jehan', duration: '5:20', hasLyrics: true, lyrics: "Kala shah kala, mera kala hai sardar...\nGoreyan nu dafa karo!" },
    { id: 4, title: 'Chitta Kukkad', artist: 'Musarrat Nazir', duration: '3:30', hasLyrics: true, lyrics: "Chitta kukkad banere te...\nKasni dupatte waliye, munda sadqay tere te." },
  ],
  bridal: [
    { id: 5, title: 'Din Shagna Da', artist: 'Jasleen Royal', duration: '4:20', hasLyrics: false },
    { id: 6, title: 'Afgheen (Instrumental)', artist: 'Ali Sethi', duration: '3:15', hasLyrics: false },
  ],
  baraat: [
    { id: 8, title: 'Azeem-o-Shaan Shahenshah', artist: 'A.R. Rahman', duration: '6:15', hasLyrics: false },
    { id: 9, title: 'Desi Look', artist: 'Kanika Kapoor', duration: '3:20', hasLyrics: false },
  ],
  dance: [
    { id: 11, title: 'Pasoori', artist: 'Ali Sethi & Shae Gill', duration: '3:45', hasLyrics: false },
    { id: 12, title: 'Raat Di Gedi', artist: 'Diljit Dosanjh', duration: '3:10', hasLyrics: false },
  ]
}

const MOCK_MEMBERS = [
  { name: "Khala Jan", initials: "KJ", color: "bg-blue-500" },
  { name: "Cousin Sara", initials: "CS", color: "bg-pink-500" },
  { name: "Ahmed", initials: "A", color: "bg-emerald-500" },
]

export function ShaadiBeats() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof INITIAL_TRACKS>('dholki')
  const [playingTrack, setPlayingTrack] = useState<number | null>(null)
  const [expandedLyrics, setExpandedLyrics] = useState<number | null>(null)
  
  // Collaborative State
  const [tracks, setTracks] = useState(INITIAL_TRACKS)
  const [isLiveSession, setIsLiveSession] = useState(false)
  const [connectedMembers, setConnectedMembers] = useState<typeof MOCK_MEMBERS>([])
  const [suggestions, setSuggestions] = useState([
    { id: 101, title: 'Mehndi Laga Ke Rakhna', artist: 'Lata Mangeshkar', suggestedBy: 'Cousin Sara', status: 'pending' },
    { id: 102, title: 'Banno Tera Swagger', artist: 'Swati Sharma', suggestedBy: 'Khala Jan', status: 'pending' }
  ])
  const [isSuggesting, setIsSuggesting] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const currentTracks = tracks[activeCategory]

  const togglePlay = (id: number) => {
    setPlayingTrack(playingTrack === id ? null : id)
  }

  const toggleLyrics = (id: number) => {
    setExpandedLyrics(expandedLyrics === id ? null : id)
  }

  const handleStartLiveSession = () => {
    setIsLiveSession(true)
    // Simulate members joining over time
    setTimeout(() => setConnectedMembers([MOCK_MEMBERS[0]]), 1000)
    setTimeout(() => setConnectedMembers([MOCK_MEMBERS[0], MOCK_MEMBERS[1]]), 2500)
    setTimeout(() => setConnectedMembers(MOCK_MEMBERS), 4000)
  }

  const handleApproveSuggestion = (suggestion: any) => {
    // Add to current category
    const newTrack = { id: suggestion.id, title: suggestion.title, artist: suggestion.artist, duration: '3:45', hasLyrics: false }
    setTracks({
      ...tracks,
      [activeCategory]: [...tracks[activeCategory], newTrack]
    })
    // Remove from suggestions
    setSuggestions(suggestions.filter(s => s.id !== suggestion.id))
  }

  const handleRejectSuggestion = (id: number) => {
    setSuggestions(suggestions.filter(s => s.id !== id))
  }

  const handleSubmitSuggestion = () => {
    if (!searchQuery) return
    const newSuggestion = {
      id: Date.now(),
      title: searchQuery,
      artist: 'Unknown Artist',
      suggestedBy: 'You',
      status: 'pending'
    }
    setSuggestions([...suggestions, newSuggestion])
    setSearchQuery('')
    setIsSuggesting(false)
  }

  const playingTrackDetails = Object.values(tracks).flat().find(t => t.id === playingTrack)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 font-bold mb-4 text-xs tracking-wider">
            <Music2 className="w-4 h-4" /> SHAADI BEATS
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Event Playlist & Dholki Guide</h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl">
            Curate the perfect soundtrack. Start a live session to sync lyrics with family and accept song requests!
          </p>
        </div>
        
        {/* Collaborative Actions */}
        <div className="flex items-center gap-4">
          {!isLiveSession ? (
            <Button onClick={handleStartLiveSession} className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl py-6 px-6 font-bold shadow-lg shadow-orange-500/20 transition-all hover:scale-105">
              <Radio className="w-5 h-5 mr-2 animate-pulse" /> Start Live Dholki Session
            </Button>
          ) : (
            <div className="bg-white border-2 border-orange-200 rounded-2xl p-3 flex items-center gap-4 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-bold text-orange-700 text-sm">LIVE SESSION</span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="flex -space-x-3">
                {connectedMembers.map((m, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${m.color} text-white text-xs font-bold flex items-center justify-center border-2 border-white shadow-sm z-${30-i} relative group`}>
                    {m.initials}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {m.name}
                    </div>
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-xs font-bold flex items-center justify-center border-2 border-white shadow-sm z-0">
                  <UserPlus className="w-3 h-3" />
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsLiveSession(false)} className="text-slate-500 hover:text-slate-900">
                End
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
        
        {/* Categories Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="font-bold text-lg text-slate-900 mb-4 px-2">Playlists</h3>
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id as keyof typeof INITIAL_TRACKS)
                setExpandedLyrics(null)
              }}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                activeCategory === category.id 
                  ? 'border-slate-900 bg-white shadow-md' 
                  : 'border-transparent hover:bg-slate-100'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${category.color}`}>
                {category.icon}
              </div>
              <div>
                <h4 className={`font-bold text-lg ${activeCategory === category.id ? 'text-slate-900' : 'text-slate-700'}`}>
                  {category.name}
                </h4>
                <p className="text-sm text-slate-500 font-medium">{tracks[category.id as keyof typeof INITIAL_TRACKS].length} Tracks</p>
              </div>
            </button>
          ))}

          {/* Collaborative Suggestion Queue */}
          {isLiveSession && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-8 bg-blue-50 border-2 border-blue-100 rounded-3xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-blue-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" /> Guest Requests
                </h4>
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">{suggestions.length}</span>
              </div>
              
              <div className="space-y-3">
                <AnimatePresence>
                  {suggestions.length === 0 ? (
                    <motion.p className="text-sm text-blue-600/60 font-medium text-center py-4">No pending requests</motion.p>
                  ) : (
                    suggestions.map(s => (
                      <motion.div 
                        key={s.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white rounded-xl p-3 shadow-sm border border-blue-100"
                      >
                        <p className="text-xs font-bold text-blue-500 mb-1">{s.suggestedBy} suggested:</p>
                        <h5 className="font-bold text-slate-900 text-sm truncate">{s.title}</h5>
                        <div className="flex items-center gap-2 mt-3">
                          <button onClick={() => handleApproveSuggestion(s)} className="flex-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-xs font-bold py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1">
                            <Check className="w-3 h-3" /> Approve
                          </button>
                          <button onClick={() => handleRejectSuggestion(s.id)} className="flex-1 bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-bold py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1">
                            <X className="w-3 h-3" /> Reject
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </div>

        {/* Tracklist Main Area */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-slate-100 min-h-[600px] flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-slate-100 pb-6 gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{CATEGORIES.find(c => c.id === activeCategory)?.name}</h2>
                <p className="text-slate-500 font-medium mt-1">
                  {activeCategory === 'dholki' ? 'Tap "View Lyrics" to sing along to traditional classics!' : 'Curated hits for your perfect moment.'}
                </p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                {isLiveSession && (
                  <Button onClick={() => setIsSuggesting(!isSuggesting)} className="flex-1 sm:flex-none bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl font-bold transition-colors">
                    <Plus className="w-4 h-4 mr-2" /> Suggest Song
                  </Button>
                )}
                <Button variant="outline" className="hidden sm:flex rounded-xl font-bold border-slate-200">
                  <Share2 className="w-4 h-4 mr-2" /> Share
                </Button>
              </div>
            </div>

            {/* Inline Suggestion Form */}
            <AnimatePresence>
              {isSuggesting && isLiveSession && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="bg-blue-50 border border-blue-100 rounded-2xl p-4 overflow-hidden"
                >
                  <h4 className="font-bold text-blue-900 mb-3 text-sm">Search and Suggest a Song</h4>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="e.g. Mehndi Laga Ke Rakhna..."
                        className="w-full bg-white border border-blue-200 rounded-xl pl-10 pr-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <Button onClick={handleSubmitSuggestion} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold">
                      Suggest
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4 flex-1">
              <AnimatePresence mode="popLayout">
                {currentTracks.map((track, index) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    key={track.id} 
                    className={`bg-slate-50 border-2 rounded-2xl overflow-hidden transition-all ${
                      playingTrack === track.id ? 'border-primary shadow-md' : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="p-4 flex items-center gap-4">
                      <button 
                        onClick={() => togglePlay(track.id)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                          playingTrack === track.id 
                            ? 'bg-primary text-white shadow-lg shadow-primary/30 animate-pulse' 
                            : 'bg-white text-slate-700 shadow-sm hover:bg-slate-100'
                        }`}
                      >
                        {playingTrack === track.id ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-bold truncate text-lg ${playingTrack === track.id ? 'text-primary' : 'text-slate-900'}`}>
                          {track.title}
                        </h4>
                        <p className="text-slate-500 text-sm font-medium truncate">{track.artist}</p>
                      </div>

                      <div className="hidden sm:block text-slate-400 font-medium text-sm w-12 text-center">
                        {track.duration}
                      </div>

                      <div className="flex items-center gap-2">
                        {track.hasLyrics && (
                          <button 
                            onClick={() => toggleLyrics(track.id)}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${
                              expandedLyrics === track.id 
                                ? 'bg-orange-100 text-orange-700' 
                                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            }`}
                          >
                            <FileText className="w-4 h-4" /> 
                            <span className="hidden sm:inline">Lyrics</span>
                            {expandedLyrics === track.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        )}
                        <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors">
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Lyrics Expansion */}
                    <AnimatePresence>
                      {expandedLyrics === track.id && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="bg-orange-50 border-t border-orange-100 relative overflow-hidden"
                        >
                          {isLiveSession && (
                            <div className="absolute top-4 right-4 bg-red-500/10 text-red-600 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 border border-red-500/20">
                              <Radio className="w-3 h-3 animate-pulse" /> SYNCED LIVE
                            </div>
                          )}
                          <div className="p-6">
                            <h5 className="font-bold text-orange-800 mb-4 flex items-center gap-2">
                              <Music2 className="w-4 h-4" /> Traditional Lyrics
                            </h5>
                            <div className="space-y-4 pr-24">
                              {((track as any).lyrics as string)?.split('\n').map((line, i) => (
                                <p key={i} className="text-lg text-orange-900/80 font-medium italic">
                                  {line}
                                </p>
                              ))}
                            </div>
                            <div className="mt-6 flex justify-end">
                              <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-100 rounded-xl">
                                Share Lyrics
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Mini Player */}
      <AnimatePresence>
        {playingTrackDetails && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-slate-900 text-white rounded-full p-2 pr-6 shadow-lg border border-slate-700 flex items-center gap-4 z-50"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-pink-500 flex items-center justify-center flex-shrink-0 animate-[spin_4s_linear_infinite]">
              <Music2 className="w-5 h-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-bold truncate">{playingTrackDetails.title}</h4>
                <div className="flex gap-0.5 mt-1">
                  <motion.div animate={{ height: ["4px", "12px", "4px"] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-1 bg-primary rounded-full" />
                  <motion.div animate={{ height: ["8px", "16px", "8px"] }} transition={{ duration: 0.8, delay: 0.2, repeat: Infinity }} className="w-1 bg-pink-500 rounded-full" />
                  <motion.div animate={{ height: ["6px", "14px", "6px"] }} transition={{ duration: 0.8, delay: 0.4, repeat: Infinity }} className="w-1 bg-orange-400 rounded-full" />
                </div>
              </div>
              <p className="text-slate-400 text-xs font-medium truncate">{playingTrackDetails.artist}</p>
            </div>

            <div className="flex items-center gap-3">
              <button className="text-slate-400 hover:text-white transition-colors"><Heart className="w-5 h-5" /></button>
              <button onClick={() => setPlayingTrack(null)} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Pause className="w-5 h-5 fill-current" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
