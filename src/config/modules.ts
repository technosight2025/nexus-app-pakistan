import { ReactNode } from "react"
import { 
  CreditCard, UserCheck, FolderOpen, 
  Camera, Briefcase, Calendar, BarChart3,
  Video, UploadCloud
} from "lucide-react"

// Import our components
import { PaymentsView } from "@/components/dashboard/studio/PaymentsView"
import { StudioLeadsView } from "@/components/dashboard/studio/StudioLeadsView"
import { StudioProjectsView } from "@/components/dashboard/studio/StudioProjectsView"
import { EquipmentTrackingView } from "@/components/dashboard/studio/EquipmentTrackingView"
import { TeamScheduleView } from "@/components/dashboard/studio/TeamScheduleView"
import { PhotoSelectionView } from "@/components/dashboard/studio/PhotoSelectionView"
import { VideoReviewView } from "@/components/dashboard/studio/VideoReviewView"
import { DeliveryCenterView } from "@/components/dashboard/studio/DeliveryCenterView"
import { NexusAppsView } from "@/components/dashboard/venue/NexusAppsView"
import { AccountingView } from "@/components/dashboard/studio/AccountingView"

export type UserRole = "Venue" | "Studio" | "Caterer" | "Decorator" | "Customer"

export interface NexusModule {
  id: string
  name: string
  icon: any
  description: string
  component: () => ReactNode
  rolesAllowed: UserRole[]
  isCore?: boolean // Core modules cannot be deactivated
}

// THE CENTRAL REGISTRY
export const MODULE_REGISTRY: Record<string, NexusModule> = {
  // --- CRM & Finance ---
  "leads": {
    id: "leads",
    name: "Leads CRM",
    icon: UserCheck,
    description: "Manage incoming inquiries and sales pipeline.",
    component: StudioLeadsView,
    rolesAllowed: ["Venue", "Studio", "Caterer", "Decorator"]
  },
  "payments": {
    id: "payments",
    name: "Payments & Invoicing",
    icon: CreditCard,
    description: "Track advances, balances, and send invoices.",
    component: PaymentsView,
    rolesAllowed: ["Venue", "Studio", "Caterer", "Decorator"]
  },
  "accounting": {
    id: "accounting",
    name: "Accounting Ledger",
    icon: BarChart3,
    description: "Track studio expenses, payouts, and net profit margins.",
    component: AccountingView,
    rolesAllowed: ["Studio", "Caterer", "Decorator"]
  },
  
  // --- Studio Specific ---
  "projects": {
    id: "projects",
    name: "Projects Board",
    icon: FolderOpen,
    description: "Kanban board for tracking shoot lifecycles.",
    component: StudioProjectsView,
    rolesAllowed: ["Studio"]
  },
  "equipment": {
    id: "equipment",
    name: "Equipment Tracker",
    icon: Camera,
    description: "Manage cameras, lenses, and gear checkouts.",
    component: EquipmentTrackingView,
    rolesAllowed: ["Studio", "Decorator"]
  },
  "team-schedule": {
    id: "team-schedule",
    name: "Team Schedule",
    icon: Briefcase,
    description: "Assign staff to specific shoots and events.",
    component: TeamScheduleView,
    rolesAllowed: ["Studio", "Caterer", "Decorator"]
  },
  "photo-selection": {
    id: "photo-selection",
    name: "Photo Selection",
    icon: Camera,
    description: "Client portal for shortlisting photos.",
    component: PhotoSelectionView,
    rolesAllowed: ["Studio"]
  },
  "video-review": {
    id: "video-review",
    name: "Video Review",
    icon: Video,
    description: "Frame.io style timestamped video feedback.",
    component: VideoReviewView,
    rolesAllowed: ["Studio"]
  },
  "delivery": {
    id: "delivery",
    name: "Delivery Center",
    icon: UploadCloud,
    description: "Securely deliver high-res files to clients.",
    component: DeliveryCenterView,
    rolesAllowed: ["Studio"]
  },
  
  // --- Shared / Core Apps ---
  "nexus-apps": {
    id: "nexus-apps",
    name: "App Marketplace",
    icon: BarChart3, // Using placeholder icon
    description: "Install or remove modules for your dashboard.",
    component: NexusAppsView,
    rolesAllowed: ["Venue", "Studio", "Caterer", "Decorator"],
    isCore: true
  }
}

// Helper to get active modules for a user (Mocking a database fetch)
export function getActiveModulesForUser(role: UserRole, activeModuleIds: string[]): NexusModule[] {
  return activeModuleIds
    .map(id => MODULE_REGISTRY[id])
    .filter(module => module !== undefined && module.rolesAllowed.includes(role))
}
