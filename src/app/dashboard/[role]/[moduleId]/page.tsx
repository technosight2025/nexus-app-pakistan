"use client"

import { use } from "react"
import { MODULE_REGISTRY } from "@/config/modules"
import { Construction } from "lucide-react"

export default function DynamicModulePage({ params }: { params: Promise<{ role: string, moduleId: string }> }) {
  const resolvedParams = use(params)
  const module = MODULE_REGISTRY[resolvedParams.moduleId]

  if (!module) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] text-slate-500">
        <h1 className="text-2xl font-black text-slate-900 mb-2">Module Not Found</h1>
        <p className="text-sm font-medium">The requested module "{resolvedParams.moduleId}" does not exist in the registry.</p>
      </div>
    )
  }

  // Render the registered component
  const Component = module.component

  return (
    <div className="p-4 md:p-8 w-full max-w-[1600px] mx-auto">
      <Component />
    </div>
  )
}
