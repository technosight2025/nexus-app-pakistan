"use client"

import { Card } from "@/components/ui/card"
import { Search, Plus, MoreHorizontal, Clock, MessageSquare, Image as ImageIcon, Video, Paperclip } from "lucide-react"

export default function TasksPage() {
  const columns = [
    {
      id: "todo",
      title: "To Do",
      color: "bg-gray-100",
      tasks: [
        {
          id: "TSK-01",
          title: "Cull Ali & Fatima Wedding Photos",
          project: "Ali & Fatima Wedding",
          type: "Photography",
          assignee: "FA",
          dueDate: "Oct 15",
          comments: 2,
          attachments: 0
        },
        {
          id: "TSK-02",
          title: "Select Highlights Audio Track",
          project: "TechCorp Gala",
          type: "Videography",
          assignee: "ZA",
          dueDate: "Oct 16",
          comments: 0,
          attachments: 1
        }
      ]
    },
    {
      id: "in_progress",
      title: "In Progress",
      color: "bg-blue-50",
      tasks: [
        {
          id: "TSK-03",
          title: "Color Grade Teaser Video",
          project: "Hassan Mehndi",
          type: "Videography",
          assignee: "MS",
          dueDate: "Oct 14",
          comments: 5,
          attachments: 2
        }
      ]
    },
    {
      id: "review",
      title: "Review",
      color: "bg-yellow-50",
      tasks: [
        {
          id: "TSK-04",
          title: "Album Design Draft 1",
          project: "Ali & Fatima Wedding",
          type: "Design",
          assignee: "AK",
          dueDate: "Oct 13",
          comments: 8,
          attachments: 4
        }
      ]
    },
    {
      id: "completed",
      title: "Completed",
      color: "bg-green-50",
      tasks: [
        {
          id: "TSK-05",
          title: "Backup SD Cards",
          project: "TechCorp Gala",
          type: "Operations",
          assignee: "ZA",
          dueDate: "Oct 12",
          comments: 0,
          attachments: 0
        }
      ]
    }
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 h-[calc(100vh-8rem)] flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-black font-poppins text-gray-900 dark:text-white tracking-tight">
            Task Board
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Manage editing workflows, assignments, and approvals.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex -space-x-2 mr-4 hidden sm:flex items-center">
            <div className="w-8 h-8 rounded-full border-2 border-white dark:border-black bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-700 dark:text-blue-400">FA</div>
            <div className="w-8 h-8 rounded-full border-2 border-white dark:border-black bg-green-100 dark:bg-green-500/20 flex items-center justify-center text-xs font-bold text-green-700 dark:text-green-400">ZA</div>
            <div className="w-8 h-8 rounded-full border-2 border-white dark:border-black bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-700 dark:text-purple-400">MS</div>
            <div className="w-8 h-8 rounded-full border-2 border-white dark:border-black bg-gray-100 dark:bg-white/10 flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-300">+2</div>
          </div>
          <button className="px-5 py-2.5 bg-[#0A3B2A] dark:bg-cyan-600 text-white rounded-full font-bold text-sm hover:bg-[#0F5B3E] dark:hover:bg-cyan-500 transition-colors shadow-lg flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Task
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-6 overflow-x-auto pb-4 flex-1 h-full min-h-0 custom-scrollbar">
        {columns.map((column) => (
          <div key={column.id} className="min-w-[320px] w-[320px] flex flex-col h-full bg-gray-50/50 dark:bg-white/5 dark:backdrop-blur-xl rounded-2xl border border-gray-100 dark:border-white/10 p-4">
            
            <div className="flex justify-between items-center mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900 dark:text-white">{column.title}</h3>
                <span className="w-5 h-5 rounded-full bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 text-xs font-bold flex items-center justify-center text-gray-500 dark:text-gray-400">
                  {column.tasks.length}
                </span>
              </div>
              <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-white">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 min-h-0 custom-scrollbar">
              {column.tasks.map((task) => (
                <Card key={task.id} className="p-4 border border-gray-100 dark:border-white/10 dark:bg-black/20 shadow-sm dark:shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-md dark:hover:border-cyan-500/30 transition-shadow cursor-pointer cursor-grab active:cursor-grabbing">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      task.type === 'Photography' ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' :
                      task.type === 'Videography' ? 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400' :
                      task.type === 'Design' ? 'bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400' : 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300'
                    }`}>
                      {task.type}
                    </span>
                    <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-white">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1 leading-tight">{task.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-4">{task.project}</p>

                  <div className="flex justify-between items-center border-t border-gray-50 dark:border-white/5 pt-3">
                    <div className="flex items-center gap-3 text-gray-400 dark:text-gray-500">
                      <div className="flex items-center gap-1 text-xs font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span className={column.id === 'completed' ? 'text-green-600 dark:text-green-400' : ''}>{task.dueDate}</span>
                      </div>
                      {task.comments > 0 && (
                        <div className="flex items-center gap-1 text-xs font-medium">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{task.comments}</span>
                        </div>
                      )}
                      {task.attachments > 0 && (
                        <div className="flex items-center gap-1 text-xs font-medium">
                          <Paperclip className="w-3.5 h-3.5" />
                          <span>{task.attachments}</span>
                        </div>
                      )}
                    </div>
                    <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-[10px] font-bold text-gray-600 dark:text-gray-300 border border-white dark:border-black shadow-sm">
                      {task.assignee}
                    </div>
                  </div>
                </Card>
              ))}
              
              <button className="w-full py-3 rounded-xl border-2 border-dashed border-gray-200 dark:border-white/10 text-gray-400 dark:text-gray-500 font-semibold text-sm hover:border-gray-300 dark:hover:border-white/20 hover:text-gray-500 dark:hover:text-gray-300 transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Add Task
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
