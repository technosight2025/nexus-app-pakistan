"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { MoreHorizontal, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const INITIAL_PIPELINE = [
  {
    title: "New Lead",
    leads: [
      { id: "l1", name: "Ahmed Raza", type: "Wedding", date: "Oct 15", value: "1.2M" },
      { id: "l2", name: "Fatima Ali", type: "Mehndi", date: "Nov 02", value: "800k" },
      { id: "l3", name: "TechCorp", type: "Corporate", date: "Sep 20", value: "450k" }
    ]
  },
  {
    title: "Site Visit",
    leads: [
      { id: "l4", name: "Usman Tariq", type: "Valima", date: "Dec 05", value: "1.5M" },
      { id: "l5", name: "Zara Khan", type: "Birthday", date: "Sep 12", value: "200k" }
    ]
  },
  {
    title: "Quotation Sent",
    leads: [
      { id: "l6", name: "Bilal & Co", type: "Seminar", date: "Oct 01", value: "600k" }
    ]
  },
  {
    title: "Confirmed",
    leads: [
      { id: "l7", name: "Hassan Family", type: "Wedding", date: "Sep 25", value: "1.8M" },
      { id: "l8", name: "Aliya Noor", type: "Mehndi", date: "Oct 10", value: "900k" }
    ]
  }
]

export function LeadsView() {
  const [pipeline, setPipeline] = useState(INITIAL_PIPELINE)
  const router = useRouter()

  const handleDragStart = (e: React.DragEvent, sourceStageIdx: number, leadIdx: number) => {
    e.dataTransfer.setData("sourceStageIdx", sourceStageIdx.toString())
    e.dataTransfer.setData("leadIdx", leadIdx.toString())
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, targetStageIdx: number) => {
    e.preventDefault()
    const sourceStageIdx = parseInt(e.dataTransfer.getData("sourceStageIdx"))
    const leadIdx = parseInt(e.dataTransfer.getData("leadIdx"))
    
    if (isNaN(sourceStageIdx) || isNaN(leadIdx) || sourceStageIdx === targetStageIdx) return

    const newPipeline = [...pipeline].map(stage => ({...stage, leads: [...stage.leads]}))
    const leadToMove = newPipeline[sourceStageIdx].leads[leadIdx]
    
    newPipeline[sourceStageIdx].leads.splice(leadIdx, 1)
    newPipeline[targetStageIdx].leads.push(leadToMove)
    
    setPipeline(newPipeline)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Leads Pipeline</h1>
          <p className="text-slate-500 font-medium mt-1">Manage and track all your event inquiries.</p>
        </div>
        <Button className="bg-slate-900 text-white shadow-sm rounded-xl" onClick={() => router.push('/dashboard/vendor/leads/new')}>
          <Plus className="w-4 h-4 mr-2" /> Add Lead
        </Button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 h-[calc(100vh-200px)] min-h-[500px]">
        {pipeline.map((stage, idx) => (
          <div 
            key={idx} 
            className="flex-1 min-w-[260px] max-w-[350px] bg-slate-100/80 border border-slate-200 rounded-2xl p-4 flex flex-col"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, idx)}
          >
            <div className="flex justify-between items-center mb-4 px-1">
              <h3 className="font-bold text-slate-800">{stage.title}</h3>
              <span className="text-sm font-bold bg-white border border-slate-200 px-2.5 py-0.5 rounded-full text-slate-600 shadow-sm">{stage.leads.length}</span>
            </div>
            
            <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-1">
              {stage.leads.map((lead, lIdx) => (
                <motion.div 
                  key={lead.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e as any, idx, lIdx)}
                  onClick={() => router.push(`/dashboard/vendor/leads/${lead.id}`)}
                  whileHover={{ y: -2 }}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:border-primary/50 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-slate-900 truncate pr-2">{lead.name}</h4>
                    <Button variant="ghost" size="icon" className="w-6 h-6 text-slate-400 hover:text-slate-700 -mr-2 -mt-2" onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <span className="block text-xs text-slate-500 font-medium">{lead.type}</span>
                      <span className="block text-xs font-bold text-primary">{lead.date}</span>
                    </div>
                    <span className="text-xs font-black text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">PKR {lead.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
