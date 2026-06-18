"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  History, Search, Shield, Trash2, CalendarDays, 
  ArrowLeft, ChevronRight, User, AlertCircle, FileText, CheckCircle2, ShieldAlert
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Role = "APP_ADMIN" | "STAFF"

interface AuditLog {
  id: string
  userName: string
  userRole: string
  action: string
  details: string
  timestamp: string
  ip: string
  severity: "info" | "warning" | "danger" | "success"
}

const MOCK_LOGS: AuditLog[] = [
  {
    id: "log-1",
    userName: "Ahmed Raza",
    userRole: "Vendor Owner",
    action: "DELETED_CONTACT",
    details: "Deleted contact 'Usman Tariq'",
    timestamp: "2026-06-05T14:30:00Z",
    ip: "192.168.1.105",
    severity: "danger"
  },
  {
    id: "log-2",
    userName: "Fatima Ali",
    userRole: "Sales Rep",
    action: "CREATED_QUOTATION",
    details: "Generated Quotation QT-2026-4832 for 'Zara Khan'",
    timestamp: "2026-06-05T13:15:22Z",
    ip: "192.168.1.112",
    severity: "success"
  },
  {
    id: "log-3",
    userName: "System",
    userRole: "Automated",
    action: "BACKUP_COMPLETED",
    details: "Daily database backup completed successfully.",
    timestamp: "2026-06-05T00:00:00Z",
    ip: "10.0.0.1",
    severity: "info"
  },
  {
    id: "log-4",
    userName: "Ahmed Raza",
    userRole: "Vendor Owner",
    action: "UPDATED_SETTINGS",
    details: "Changed Default Tax Rate to 5%",
    timestamp: "2026-06-04T18:45:10Z",
    ip: "192.168.1.105",
    severity: "warning"
  },
  {
    id: "log-5",
    userName: "Ali Khan",
    userRole: "Staff",
    action: "USER_LOGIN",
    details: "Logged in via Web Portal",
    timestamp: "2026-06-04T09:00:05Z",
    ip: "119.156.44.22",
    severity: "info"
  }
]

export function ActivityLogsView() {
  const [logs, setLogs] = useState<AuditLog[]>(MOCK_LOGS)
  const [currentRole, setCurrentRole] = useState<Role>("STAFF")
  const [searchQuery, setSearchQuery] = useState("")

  const handleDelete = (id: string) => {
    if (currentRole !== "APP_ADMIN") {
      alert("Permission Denied: Only App Admins can delete activity logs.")
      return
    }
    if (confirm("Are you sure you want to permanently delete this audit log? This action cannot be undone.")) {
      setLogs(logs.filter(log => log.id !== id))
    }
  }

  const handleBulkDelete = () => {
    if (currentRole !== "APP_ADMIN") {
      alert("Permission Denied: Only App Admins can delete activity logs.")
      return
    }
    if (confirm("WARNING: Are you sure you want to clear ALL activity logs?")) {
      setLogs([])
    }
  }

  const filteredLogs = logs.filter(log => 
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.details.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getSeverityIcon = (severity: string) => {
    switch(severity) {
      case "danger": return <Trash2 className="w-4 h-4 text-red-500" />
      case "success": return <CheckCircle2 className="w-4 h-4 text-emerald-500" />
      case "warning": return <AlertCircle className="w-4 h-4 text-amber-500" />
      default: return <FileText className="w-4 h-4 text-blue-500" />
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch(severity) {
      case "danger": return "bg-red-100 text-red-700"
      case "success": return "bg-emerald-100 text-emerald-700"
      case "warning": return "bg-amber-100 text-amber-700"
      default: return "bg-blue-100 text-blue-700"
    }
  }

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center text-xs font-bold text-slate-400 gap-2 mb-2">
        <Link href="/dashboard/vendor" className="hover:text-primary transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3 h-3" /> Dashboard
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-300" />
        <span className="text-slate-900">Activity Logs</span>
      </nav>

      {/* Header & Role Switcher */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-white p-6 rounded-2xl border border-border shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <History className="w-6 h-6 text-primary" />
            System Audit Trail
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Irreversible record of all system activities.
          </p>
        </div>
        
        <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center gap-4 w-full md:w-auto">
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Simulate Role View</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentRole("STAFF")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${currentRole === "STAFF" ? "bg-slate-900 text-white shadow-sm" : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200"}`}
              >
                Regular Staff
              </button>
              <button 
                onClick={() => setCurrentRole("APP_ADMIN")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${currentRole === "APP_ADMIN" ? "bg-red-500 text-white shadow-sm" : "bg-white text-slate-600 hover:bg-red-50 border border-slate-200"}`}
              >
                <ShieldAlert className="w-3.5 h-3.5" /> App Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Security Warning */}
      {currentRole === "STAFF" && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <Shield className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-amber-900">Restricted Mode</h4>
            <p className="text-xs text-amber-700 mt-0.5">You are viewing the logs as a Regular Staff member. Deletion of audit records is strictly prohibited and locked to App Admins only.</p>
          </div>
        </div>
      )}

      {currentRole === "APP_ADMIN" && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex justify-between items-center gap-3">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-red-900">Admin Override Active</h4>
              <p className="text-xs text-red-700 mt-0.5">You have elevated privileges. You may permanently delete audit logs.</p>
            </div>
          </div>
          <Button variant="destructive" size="sm" onClick={handleBulkDelete} className="font-bold text-xs shrink-0 shadow-sm">
            <Trash2 className="w-3.5 h-3.5 mr-2" /> Clear All Logs
          </Button>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search by user, action, or details..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 h-10 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Button variant="outline" size="sm" className="h-9 bg-white text-xs font-bold border-slate-200">
            <CalendarDays className="w-3.5 h-3.5 mr-2" /> Last 7 Days
          </Button>
          <Button variant="outline" size="sm" className="h-9 bg-white text-xs font-bold border-slate-200">
            <User className="w-3.5 h-3.5 mr-2" /> All Users
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date & Time</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">User / Role</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action Taken</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">IP Address</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Admin Controls</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <AnimatePresence>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 text-sm">
                    No logs found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <motion.tr 
                    key={log.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="hover:bg-slate-50 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="block text-sm font-bold text-slate-900">
                        {new Date(log.timestamp).toLocaleDateString()}
                      </span>
                      <span className="block text-xs text-slate-500 font-medium">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="block text-sm font-bold text-slate-900">{log.userName}</span>
                      <span className="block text-xs text-slate-500 font-medium">{log.userRole}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 p-1.5 rounded-md ${getSeverityBadge(log.severity)}`}>
                          {getSeverityIcon(log.severity)}
                        </div>
                        <div>
                          <span className="block text-sm font-bold text-slate-900">{log.action.replace(/_/g, ' ')}</span>
                          <span className="block text-xs text-slate-500 font-medium mt-0.5">{log.details}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                        {log.ip}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {currentRole === "APP_ADMIN" ? (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDelete(log.id)}
                          className="text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                          title="Delete Log"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      ) : (
                        <div className="text-xs font-bold text-slate-300 uppercase tracking-widest">Locked</div>
                      )}
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

    </div>
  )
}
