"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  FolderOpen, Plus, Search, Calendar, 
  MoreHorizontal, Camera, Video, Edit3, 
  CheckCircle2, X
} from "lucide-react"
import { Button } from "@/components/ui/button"

type ProjectStage = "Pre-Production" | "Shooting" | "Post-Production" | "Client Review" | "Delivered"

interface Project {
  id: string
  title: string
  clientName: string
  date: string
  stage: ProjectStage
  packageType: string
  assignedEditor: string
  tags: string[]
  coverImage: string
}

const INITIAL_PROJECTS: Project[] = [
  {
    id: "PRJ-001",
    title: "TechCorp Annual Gala",
    clientName: "TechCorp Inc.",
    date: "Oct 20, 2023",
    stage: "Pre-Production",
    packageType: "Corporate Video",
    assignedEditor: "Unassigned",
    tags: ["Needs Drone"],
    coverImage: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "PRJ-002",
    title: "Zainab's Mehndi",
    clientName: "Zainab Ahmed",
    date: "Oct 15, 2023",
    stage: "Shooting",
    packageType: "Photography + Video",
    assignedEditor: "Aisha Malik",
    tags: ["Rush Edit"],
    coverImage: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "PRJ-003",
    title: "Ali & Sara Wedding",
    clientName: "Ali Raza",
    date: "Oct 10, 2023",
    stage: "Post-Production",
    packageType: "Premium 3-Day",
    assignedEditor: "Zain Ali",
    tags: [],
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "PRJ-004",
    title: "Fashion Campaign Q4",
    clientName: "Khaadi",
    date: "Sep 28, 2023",
    stage: "Client Review",
    packageType: "Commercial Photo",
    assignedEditor: "Aisha Malik",
    tags: ["High Priority"],
    coverImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "PRJ-005",
    title: "Hassan's Baraat",
    clientName: "Hassan",
    date: "Sep 15, 2023",
    stage: "Delivered",
    packageType: "Photography",
    assignedEditor: "Zain Ali",
    tags: [],
    coverImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400&auto=format&fit=crop"
  }
]

const STAGES: ProjectStage[] = ["Pre-Production", "Shooting", "Post-Production", "Client Review", "Delivered"]

export function StudioProjectsView() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS)
  const [searchQuery, setSearchQuery] = useState("")
  
  // Modal State
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false)
  const [newProjectForm, setNewProjectForm] = useState({ title: "", clientName: "", packageType: "" })

  const getStageIcon = (stage: ProjectStage) => {
    switch(stage) {
      case "Pre-Production": return <Calendar className="w-4 h-4 text-indigo-500" />
      case "Shooting": return <Camera className="w-4 h-4 text-rose-500" />
      case "Post-Production": return <Edit3 className="w-4 h-4 text-amber-500" />
      case "Client Review": return <Video className="w-4 h-4 text-blue-500" />
      case "Delivered": return <CheckCircle2 className="w-4 h-4 text-emerald-500" />
    }
  }

  // Mock function to move a project to the next stage
  const handleMoveProject = (projectId: string, currentStage: ProjectStage) => {
    const currentIndex = STAGES.indexOf(currentStage)
    if (currentIndex < STAGES.length - 1) {
      const nextStage = STAGES[currentIndex + 1]
      setProjects(projects.map(p => p.id === projectId ? { ...p, stage: nextStage } : p))
    }
  }

  const handleCreateProject = () => {
    if (!newProjectForm.title || !newProjectForm.clientName) return
    const newProj: Project = {
      id: `PRJ-${Math.floor(Math.random() * 1000)}`,
      title: newProjectForm.title,
      clientName: newProjectForm.clientName,
      date: "TBD",
      stage: "Pre-Production",
      packageType: newProjectForm.packageType || "Custom",
      assignedEditor: "Unassigned",
      tags: ["New"],
      coverImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&auto=format&fit=crop"
    }
    setProjects([...projects, newProj])
    setIsNewProjectOpen(false)
    setNewProjectForm({ title: "", clientName: "", packageType: "" })
  }

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 p-6 rounded-3xl shadow-lg border border-slate-800 text-white relative overflow-hidden shrink-0 mb-6 mx-4 sm:mx-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-black flex items-center gap-2 tracking-tight">
            <FolderOpen className="w-8 h-8 text-indigo-400" /> Projects Board
          </h1>
          <p className="text-sm font-medium text-slate-400 mt-2 max-w-xl">
            Track the lifecycle of your studio shoots from pre-production planning to final delivery.
          </p>
        </div>
        
        <div className="flex gap-2 relative z-10">
          <div className="relative hidden sm:block w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-xl border-none bg-white/10 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/20 text-sm font-medium backdrop-blur-sm"
            />
          </div>
          <Button onClick={() => setIsNewProjectOpen(true)} className="bg-white text-slate-900 hover:bg-slate-100 rounded-xl shadow-md font-bold shrink-0">
            <Plus className="w-4 h-4 mr-2" /> New Project
          </Button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="sm:hidden relative w-full mb-6 mx-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search projects..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium shadow-sm bg-white"
        />
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar mx-4 sm:mx-0">
        <div className="flex gap-4 min-w-max h-full">
          {STAGES.map(stage => {
            const stageProjects = filteredProjects.filter(p => p.stage === stage)
            
            return (
              <div key={stage} className="w-[320px] flex flex-col bg-slate-50/80 rounded-3xl border border-slate-200/60 overflow-hidden shrink-0">
                {/* Column Header */}
                <div className="p-4 border-b border-slate-200/60 bg-slate-100/50 flex justify-between items-center backdrop-blur-sm shrink-0">
                  <h3 className="font-bold text-slate-700 flex items-center gap-2">
                    {getStageIcon(stage)} {stage}
                  </h3>
                  <span className="bg-white text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full border border-slate-200 shadow-sm">
                    {stageProjects.length}
                  </span>
                </div>

                {/* Column Content */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
                  {stageProjects.map(project => (
                    <motion.div 
                      layoutId={project.id}
                      key={project.id} 
                      className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-grab active:cursor-grabbing"
                    >
                      <div className="h-24 rounded-xl overflow-hidden mb-3 relative">
                        <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                        <div className="absolute bottom-2 left-2 flex gap-1">
                          {project.tags.map(tag => (
                            <span key={tag} className="bg-slate-900/80 backdrop-blur-sm text-white text-[9px] font-bold px-1.5 py-0.5 rounded text-white uppercase tracking-wider">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-black text-slate-900 leading-tight">{project.title}</h4>
                        <button className="text-slate-400 hover:text-slate-900 transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <p className="text-xs font-medium text-slate-500 mb-3">{project.clientName} • {project.packageType}</p>
                      
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Editor</p>
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700">
                              {project.assignedEditor !== "Unassigned" ? project.assignedEditor.charAt(0) : "?"}
                            </div>
                            <span className="text-xs font-bold text-slate-700">{project.assignedEditor}</span>
                          </div>
                        </div>

                        {stage !== "Delivered" && (
                          <Button 
                            variant="ghost" size="sm" 
                            onClick={() => handleMoveProject(project.id, stage)}
                            className="h-7 text-[10px] font-bold uppercase tracking-wider bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 opacity-0 group-hover:opacity-100 transition-all"
                          >
                            Move Forward
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  
                  {stageProjects.length === 0 && (
                    <div className="h-24 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                      No Projects
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* New Project Modal */}
      <AnimatePresence>
        {isNewProjectOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsNewProjectOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 backdrop-blur-md">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-indigo-500" /> Create Project
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setIsNewProjectOpen(false)} className="rounded-full hover:bg-slate-200">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Project Title</label>
                  <input 
                    type="text" 
                    value={newProjectForm.title} 
                    onChange={e => setNewProjectForm({...newProjectForm, title: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-bold"
                    placeholder="e.g. Zainab's Baraat"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Client Name</label>
                  <input 
                    type="text" 
                    value={newProjectForm.clientName} 
                    onChange={e => setNewProjectForm({...newProjectForm, clientName: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-medium"
                    placeholder="Search or add client..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Package / Deliverable</label>
                  <select 
                    value={newProjectForm.packageType} 
                    onChange={e => setNewProjectForm({...newProjectForm, packageType: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-medium bg-white"
                  >
                    <option value="">Select Package</option>
                    <option value="Photography Only">Photography Only</option>
                    <option value="Videography Only">Videography Only</option>
                    <option value="Photo + Video Package">Photo + Video Package</option>
                    <option value="Premium 3-Day Wedding">Premium 3-Day Wedding</option>
                    <option value="Corporate / Commercial">Corporate / Commercial</option>
                  </select>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsNewProjectOpen(false)} className="rounded-xl bg-white shadow-sm">Cancel</Button>
                <Button onClick={handleCreateProject} className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl shadow-sm font-bold">
                  Create Project
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
