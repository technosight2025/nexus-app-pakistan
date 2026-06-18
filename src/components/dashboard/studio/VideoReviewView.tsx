"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Video, Plus, Search, CheckCircle2, ChevronLeft, 
  Play, Pause, SkipBack, SkipForward, Volume2, 
  Settings2, Clock, MessageSquare, X, Check, Circle
} from "lucide-react"
import { Button } from "@/components/ui/button"

type VideoStatus = "Awaiting Feedback" | "Revisions Requested" | "Approved"

interface Comment {
  id: string
  timestamp: string
  seconds: number
  text: string
  author: string
  isResolved: boolean
}

interface VideoProject {
  id: string
  title: string
  clientName: string
  status: VideoStatus
  version: string
  duration: string
  sentDate: string
  thumbnail: string
  comments: Comment[]
}

const INITIAL_PROJECTS: VideoProject[] = [
  {
    id: "VID-001",
    title: "Ali & Sara Wedding Highlights",
    clientName: "Ali Raza",
    status: "Revisions Requested",
    version: "V1",
    duration: "04:30",
    sentDate: "Oct 12, 2023",
    thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
    comments: [
      { id: "C1", timestamp: "01:15", seconds: 75, text: "Can we use a different transition here? This one feels too fast.", author: "Ali Raza", isResolved: false },
      { id: "C2", timestamp: "02:30", seconds: 150, text: "Love this shot of the rings!", author: "Sara Ahmed", isResolved: true },
      { id: "C3", timestamp: "03:45", seconds: 225, text: "The music is a bit too loud in this section, I can't hear the vows clearly.", author: "Ali Raza", isResolved: false },
    ]
  },
  {
    id: "VID-002",
    title: "TechCorp Annual Gala",
    clientName: "TechCorp Inc.",
    status: "Awaiting Feedback",
    version: "V2",
    duration: "02:15",
    sentDate: "Today",
    thumbnail: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=600&auto=format&fit=crop",
    comments: []
  },
  {
    id: "VID-003",
    title: "Zainab's Mehndi Teaser",
    clientName: "Zainab Ahmed",
    status: "Approved",
    version: "Final",
    duration: "01:00",
    sentDate: "Oct 05, 2023",
    thumbnail: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=600&auto=format&fit=crop",
    comments: [
      { id: "C4", timestamp: "00:45", seconds: 45, text: "Perfect! Ready to post on Insta.", author: "Zainab", isResolved: true }
    ]
  }
]

export function VideoReviewView() {
  const [projects, setProjects] = useState<VideoProject[]>(INITIAL_PROJECTS)
  const [activeVideo, setActiveVideo] = useState<VideoProject | null>(null)
  
  const [searchQuery, setSearchQuery] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0) // Mock current time in seconds

  // Modal State
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)
  const [newVideoForm, setNewVideoForm] = useState({ title: "", clientName: "", version: "V1" })

  const handleCreateVideo = () => {
    if (!newVideoForm.title || !newVideoForm.clientName) return
    const newVid: VideoProject = {
      id: `VID-${Math.floor(Math.random() * 1000)}`,
      title: newVideoForm.title,
      clientName: newVideoForm.clientName,
      status: "Awaiting Feedback",
      version: newVideoForm.version,
      duration: "00:00",
      sentDate: "Just now",
      thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop",
      comments: []
    }
    setProjects([newVid, ...projects])
    setIsNewModalOpen(false)
    setNewVideoForm({ title: "", clientName: "", version: "V1" })
  }

  const toggleCommentResolve = (commentId: string) => {
    if (!activeVideo) return
    const updatedComments = activeVideo.comments.map(c => 
      c.id === commentId ? { ...c, isResolved: !c.isResolved } : c
    )
    
    // Update active video
    const updatedVideo = { ...activeVideo, comments: updatedComments }
    setActiveVideo(updatedVideo)
    
    // Update in projects list
    setProjects(projects.map(p => p.id === updatedVideo.id ? updatedVideo : p))
  }

  // Review Workspace View
  if (activeVideo) {
    const unresolvedCount = activeVideo.comments.filter(c => !c.isResolved).length
    const totalComments = activeVideo.comments.length

    return (
      <div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in slide-in-from-right-4 duration-500 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="h-16 border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shrink-0 bg-slate-50/80 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setActiveVideo(null)} className="rounded-full bg-white hover:bg-slate-200 shadow-sm">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="hidden sm:block">
              <h1 className="text-lg font-black text-slate-900 flex items-center gap-2">
                {activeVideo.title}
                <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">{activeVideo.version}</span>
              </h1>
              <p className="text-xs font-medium text-slate-500">Client: {activeVideo.clientName}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm font-bold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
              <MessageSquare className="w-4 h-4 text-slate-400" />
              {unresolvedCount} Unresolved
            </div>
            {unresolvedCount === 0 && totalComments > 0 ? (
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-sm">
                Mark as Approved
              </Button>
            ) : (
              <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-sm">
                Export Feedback
              </Button>
            )}
          </div>
        </div>

        {/* Workspace Layout */}
        <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
          
          {/* Left Pane: Video Player Mockup */}
          <div className="flex-1 bg-slate-950 relative flex flex-col justify-center items-center overflow-hidden">
            <img 
              src={activeVideo.thumbnail} 
              alt="Video Thumbnail" 
              className={`w-full h-full object-cover opacity-60 transition-all duration-700 ${isPlaying ? 'scale-105 blur-sm' : 'scale-100'}`} 
            />
            
            {/* Play Button Overlay */}
            {!isPlaying && (
              <div 
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={() => setIsPlaying(true)}
              >
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 hover:scale-110 transition-all group">
                  <Play className="w-8 h-8 text-white fill-white ml-2 group-hover:text-primary group-hover:fill-primary transition-colors" />
                </div>
              </div>
            )}

            {/* Video Controls Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              {/* Progress Bar Mock */}
              <div className="h-1.5 w-full bg-white/30 rounded-full mb-4 overflow-hidden relative cursor-pointer">
                <div 
                  className="absolute top-0 left-0 h-full bg-primary" 
                  style={{ width: `${isPlaying ? '45%' : '0%'}` }}
                />
                {/* Comment Markers on Timeline */}
                {activeVideo.comments.map(c => (
                  <div 
                    key={c.id} 
                    className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full shadow-sm cursor-pointer hover:scale-150 transition-transform ${c.isResolved ? 'bg-emerald-400' : 'bg-rose-400'}`}
                    style={{ left: `${(c.seconds / 300) * 100}%` }} // Mocking 300s total duration
                    title={c.text}
                  />
                ))}
              </div>
              
              <div className="flex justify-between items-center text-white">
                <div className="flex items-center gap-4">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-primary transition-colors">
                    {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
                  </button>
                  <button className="hover:text-primary transition-colors">
                    <SkipBack className="w-5 h-5 fill-current" />
                  </button>
                  <button className="hover:text-primary transition-colors">
                    <SkipForward className="w-5 h-5 fill-current" />
                  </button>
                  <span className="text-sm font-mono font-bold tracking-wider opacity-80">
                    {isPlaying ? '01:15' : '00:00'} / {activeVideo.duration}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Volume2 className="w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer" />
                  <Settings2 className="w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Pane: Timestamped Comments */}
          <div className="w-full lg:w-96 bg-white flex flex-col border-l border-slate-200">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center shrink-0">
              <h2 className="font-black text-slate-900">Feedback Notes</h2>
              <span className="text-xs font-bold text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-200">
                {totalComments} Total
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {activeVideo.comments.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="font-bold text-slate-700">No comments yet</h3>
                  <p className="text-sm text-slate-500 mt-1">When the client leaves timestamped feedback, it will appear here.</p>
                </div>
              ) : (
                activeVideo.comments.map(comment => (
                  <div 
                    key={comment.id} 
                    className={`p-4 rounded-2xl border transition-all ${
                      comment.isResolved 
                        ? "bg-slate-50 border-slate-200 opacity-60" 
                        : "bg-white border-amber-200 shadow-sm hover:border-amber-400"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border cursor-pointer hover:bg-slate-900 hover:text-white transition-colors ${
                          comment.isResolved ? "bg-slate-200 border-slate-300 text-slate-600" : "bg-amber-100 border-amber-300 text-amber-800"
                        }`}>
                          {comment.timestamp}
                        </span>
                        <span className="text-xs font-bold text-slate-500">{comment.author}</span>
                      </div>
                      
                      {/* Resolve Action */}
                      <button 
                        onClick={() => toggleCommentResolve(comment.id)}
                        className={`group p-1 rounded-full transition-all ${
                          comment.isResolved ? "bg-emerald-100 text-emerald-600 hover:bg-emerald-200" : "bg-slate-100 text-slate-400 hover:bg-emerald-500 hover:text-white"
                        }`}
                        title={comment.isResolved ? "Unresolve" : "Mark as Resolved"}
                      >
                        {comment.isResolved ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className={`text-sm ${comment.isResolved ? "text-slate-500 line-through decoration-slate-300" : "text-slate-700 font-medium"}`}>
                      "{comment.text}"
                    </p>
                  </div>
                ))
              )}
            </div>
            
            {/* Mock Editor Reply / internal note */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 shrink-0">
               <input 
                 type="text" 
                 placeholder="Add an internal editor note..." 
                 className="w-full h-10 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
               />
            </div>
          </div>

        </div>
      </div>
    )
  }

  // Main Projects Overview
  const filteredProjects = projects.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.clientName.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 p-6 md:p-8 rounded-3xl shadow-lg border border-slate-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-black flex items-center gap-2 tracking-tight">
            <Video className="w-8 h-8 text-amber-400" /> Video Review Studio
          </h1>
          <p className="text-sm font-medium text-slate-400 mt-2 max-w-xl">Upload drafts and let clients leave frame-accurate, timestamped comments directly on the video.</p>
        </div>
        
        <Button onClick={() => setIsNewModalOpen(true)} className="bg-white text-slate-900 hover:bg-slate-100 rounded-xl shadow-md font-bold shrink-0 relative z-10">
          <Plus className="w-4 h-4 mr-2" /> Upload New Draft
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search projects or clients..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium shadow-sm bg-white"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProjects.map((project) => {
          const unresolvedCount = project.comments.filter(c => !c.isResolved).length;

          return (
            <div 
              key={project.id} 
              onClick={() => setActiveVideo(project)}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group cursor-pointer hover:border-primary/50 hover:shadow-md transition-all"
            >
              {/* Thumbnail */}
              <div className="h-44 relative bg-slate-100 overflow-hidden">
                <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                
                {/* Play icon mock */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50">
                    <Play className="w-5 h-5 text-white fill-white ml-1" />
                  </div>
                </div>

                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white px-2 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider">
                  {project.duration}
                </div>

                <div className="absolute top-3 right-3">
                  {project.status === "Approved" && (
                    <span className="flex items-center gap-1 bg-emerald-500 text-white px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      <CheckCircle2 className="w-3 h-3" /> Approved
                    </span>
                  )}
                  {project.status === "Revisions Requested" && (
                    <span className="flex items-center gap-1 bg-rose-500 text-white px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      <Settings2 className="w-3 h-3" /> Revisions
                    </span>
                  )}
                  {project.status === "Awaiting Feedback" && (
                    <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-slate-700 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      <Clock className="w-3 h-3" /> Awaiting
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col gap-3">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-black text-slate-900 truncate pr-2 group-hover:text-primary transition-colors">{project.title}</h3>
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0">{project.version}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-500 truncate">{project.clientName}</p>
                </div>

                <div className={`mt-2 flex items-center gap-2 text-sm font-bold p-2.5 rounded-xl border ${
                  unresolvedCount > 0 
                    ? "bg-amber-50 text-amber-700 border-amber-100" 
                    : project.comments.length > 0 
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                      : "bg-slate-50 text-slate-500 border-slate-100"
                }`}>
                  <MessageSquare className="w-4 h-4" />
                  {unresolvedCount > 0 
                    ? `${unresolvedCount} Unresolved Comments` 
                    : project.comments.length > 0 
                      ? "All Comments Resolved" 
                      : "No feedback yet"}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* New Draft Modal */}
      <AnimatePresence>
        {isNewModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsNewModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 backdrop-blur-md">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Video className="w-5 h-5 text-primary" /> Upload Video Draft
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setIsNewModalOpen(false)} className="rounded-full hover:bg-slate-200">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Project Title</label>
                  <input 
                    type="text" value={newVideoForm.title} onChange={e => setNewVideoForm({...newVideoForm, title: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                    placeholder="e.g. Cinematic Highlights"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Client Name</label>
                  <input 
                    type="text" value={newVideoForm.clientName} onChange={e => setNewVideoForm({...newVideoForm, clientName: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                    placeholder="e.g. Ali & Sara"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Version Number</label>
                  <input 
                    type="text" value={newVideoForm.version} onChange={e => setNewVideoForm({...newVideoForm, version: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                    placeholder="e.g. V1, V2, Final"
                  />
                </div>
                
                <div className="mt-4 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors" />
                  </div>
                  <p className="font-bold text-slate-700 text-sm">Drag & Drop MP4</p>
                  <p className="text-xs text-slate-500 mt-1">or click to browse files</p>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsNewModalOpen(false)} className="rounded-xl bg-white shadow-sm">Cancel</Button>
                <Button onClick={handleCreateVideo} className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-sm font-bold">
                  Upload & Generate Link
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
