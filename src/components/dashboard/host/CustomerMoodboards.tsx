"use client"

import { useState } from "react"
import { MessageCircle, CheckCircle2, Paintbrush, Share2, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CustomerMoodboards() {
  const [boardList, setBoardList] = useState([
    {
      id: 1,
      title: "Mehndi - Vibrant Desi",
      status: "Approved",
      mainImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop",
      palettes: ["bg-amber-500", "bg-pink-500", "bg-emerald-500", "bg-orange-400"],
      feedback: "We absolutely love this! The vibrant colors are exactly what we had in mind for the Mehndi night."
    },
    {
      id: 2,
      title: "Baraat - Regal Red & Gold",
      status: "Awaiting Review",
      mainImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
      palettes: ["bg-red-700", "bg-amber-400", "bg-red-900", "bg-yellow-600"],
      feedback: ""
    }
  ])

  const [comments, setComments] = useState<{ [key: number]: string }>({})

  const handleTextChange = (id: number, text: string) => {
    setComments(prev => ({
      ...prev,
      [id]: text
    }))
  }

  const handleApprove = (id: number) => {
    const customFeedback = comments[id]?.trim()
    setBoardList(prev => prev.map(board => 
      board.id === id 
        ? { 
            ...board, 
            status: "Approved", 
            feedback: customFeedback || "Approved by Ali R. (No additional notes)" 
          } 
        : board
    ))
  }

  const handleRequestChanges = (id: number) => {
    const customFeedback = comments[id]?.trim()
    if (!customFeedback) {
      alert("Please write details about the changes you want in the comment box first.")
      return
    }
    setBoardList(prev => prev.map(board => 
      board.id === id 
        ? { 
            ...board, 
            status: "Changes Requested", 
            feedback: `Revision requested: "${customFeedback}"` 
          } 
        : board
    ))
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Decor Moodboards</h2>
          <p className="text-slate-500 font-medium">Review and approve floral arrangements and stage designs.</p>
        </div>
        <Button variant="outline" className="border-slate-200 text-slate-600 rounded-xl font-bold bg-white cursor-pointer">
          <Share2 className="w-4 h-4 mr-2" /> Share with Family
        </Button>
      </div>

      <div className="space-y-12">
        {boardList.map((board) => (
          <div key={board.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col lg:flex-row">
            
            {/* Left - Main Image */}
            <div className="lg:w-2/3 h-80 lg:h-auto relative">
              <img 
                src={board.mainImage} 
                alt={board.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <h3 className="text-3xl font-black text-white tracking-tight drop-shadow-md">{board.title}</h3>
                  
                  {board.status === "Approved" && (
                    <div className="bg-emerald-500/20 backdrop-blur-md text-emerald-300 font-bold px-3 py-1 rounded-full flex items-center border border-emerald-500/30 text-sm">
                      <CheckCircle2 className="w-4.5 h-4.5 mr-1.5 shrink-0" /> Approved
                    </div>
                  )}

                  {board.status === "Changes Requested" && (
                    <div className="bg-rose-500/20 backdrop-blur-md text-rose-300 font-bold px-3 py-1 rounded-full flex items-center border border-rose-500/30 text-sm">
                      <Clock className="w-4.5 h-4.5 mr-1.5 shrink-0" /> Revision Sent
                    </div>
                  )}

                  {board.status === "Awaiting Review" && (
                    <div className="bg-amber-500/20 backdrop-blur-md text-amber-300 font-bold px-3 py-1 rounded-full flex items-center border border-amber-500/30 text-sm">
                      <Paintbrush className="w-4.5 h-4.5 mr-1.5 shrink-0" /> Awaiting Review
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right - Palettes & Feedback */}
            <div className="lg:w-1/3 p-8 flex flex-col bg-slate-50 justify-between">
              <div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">Color Palette</h4>
                <div className="flex gap-3 mb-8">
                  {board.palettes.map((color, i) => (
                    <div key={i} className={`w-12 h-12 rounded-full ${color} shadow-inner border border-black/10`} />
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">Client Feedback</h4>
                  
                  {board.status === "Approved" && (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-emerald-800 text-sm font-medium animate-in fade-in duration-300">
                      "{board.feedback}"
                      <div className="mt-2 text-xs font-bold text-emerald-600">— Approved by Ali R.</div>
                    </div>
                  )}

                  {board.status === "Changes Requested" && (
                    <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 text-rose-800 text-sm font-medium animate-in fade-in duration-300">
                      {board.feedback}
                      <div className="mt-2 text-xs font-bold text-rose-600">— Requested changes</div>
                    </div>
                  )}

                  {board.status === "Awaiting Review" && (
                    <div className="space-y-4">
                      <p className="text-slate-500 text-sm font-medium">Please review the proposed design. If you need changes to the floral selections or stage setup, leave a comment.</p>
                      <textarea 
                        value={comments[board.id] || ""}
                        onChange={(e) => handleTextChange(board.id, e.target.value)}
                        className="w-full h-24 bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none font-medium text-slate-700"
                        placeholder="Add your comments here..."
                      ></textarea>
                    </div>
                  )}
                </div>
              </div>

              {board.status === "Awaiting Review" && (
                <div className="pt-6 mt-6 border-t border-slate-200 flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => handleRequestChanges(board.id)}
                    className="flex-1 rounded-xl font-bold border-slate-300 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" /> Request Changes
                  </Button>
                  <Button 
                    onClick={() => handleApprove(board.id)}
                    className="flex-1 bg-slate-900 hover:bg-[#0F5B3E] text-white rounded-xl font-bold cursor-pointer"
                  >
                    Approve Design
                  </Button>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}
