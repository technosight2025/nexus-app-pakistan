"use client"

import { useNexusEcosystem, AppConfig, ECOSYSTEM_APPS } from "@/app/context/NexusEcosystemContext"

// Re-export types
export type { AppConfig }
export const AVAILABLE_APPS = ECOSYSTEM_APPS

// Re-export provider and hook as aliases for backwards compatibility
export { NexusEcosystemProvider as StudioAppProvider } from "@/app/context/NexusEcosystemContext"

export function useStudioApps() {
  const context = useNexusEcosystem()
  return {
    installedAppIds: context.installedAppIds,
    installApp: context.installApp,
    uninstallApp: context.uninstallApp,
    isAppInstalled: context.isAppInstalled,
    availableApps: context.availableApps
  }
}
