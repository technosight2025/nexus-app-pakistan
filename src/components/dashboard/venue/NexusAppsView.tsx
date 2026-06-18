"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Users, MonitorPlay, Camera, Eye, X, ArrowRight, Wallet, QrCode, Sliders, Bot,
  Check, CheckCircle2, AlertCircle, Sparkles, AppWindow, Settings, Info, Server,
  Building2, UserCheck, CalendarDays, Bell, ListOrdered, Search, Package, Receipt,
  DollarSign, Clock, Wrench, ShieldAlert, User, Coins, Tv, Paintbrush, ChefHat, 
  BarChart3, PieChart, TrendingUp, Key, MessageSquareCode, Sparkle, Star, BookOpen,
  Map, Activity, Inbox, CheckSquare, Laptop
} from "lucide-react"
import { Button } from "@/components/ui/button"

type AppCategory = 
  | "All" 
  | "Core Platform" 
  | "Customer & Events" 
  | "Marketplace" 
  | "Business Operations" 
  | "Venue & Hospitality" 
  | "Creative Production" 
  | "AI Apps" 
  | "Enterprise OS"

interface NexusApp {
  id: string
  name: string
  description: string
  icon: any
  category: AppCategory
  tier: "FREE" | "PREMIUM" | "ENTERPRISE" | "AI"
  price: string
  features: string[]
  imageUrl: string
  supportedWorkspaces: ("venue" | "studio" | "vendor")[]
  studioId?: string // Maps studio ID if different
  phase: 1 | 2 | 3 | 4
}

const APPS_DIRECTORY: NexusApp[] = [
  // 1. Core Platform Apps (Phase 1 & 2)
  {
    id: "identity",
    name: "Identity & Organization OS",
    description: "Manage users, organizations, multi-branch setups, team permissions, and security logs.",
    icon: Key,
    category: "Core Platform",
    tier: "FREE",
    price: "Free",
    features: ["Role-Based Access Control (RBAC)", "Multi-Branch Management", "Comprehensive Activity Logs"],
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "studio", "vendor"],
    phase: 1
  },
  {
    id: "crm",
    name: "CRM OS",
    description: "Full sales pipeline, leads tracking, customer profiles, follow-ups, and communication histories.",
    icon: UserCheck,
    category: "Core Platform",
    tier: "FREE",
    price: "Free",
    features: ["Pipeline Tracker", "Enquiry Conversions", "Client Profile Cards"],
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "studio", "vendor"],
    phase: 1
  },
  {
    id: "messaging",
    name: "Messaging OS",
    description: "Direct messaging, group channels, internal team syncs, and client chat center integrations.",
    icon: MessageSquareCode,
    category: "Core Platform",
    tier: "FREE",
    price: "Free",
    features: ["Live DM & Group Channels", "File Attachments Support", "Customer Chat Widgets"],
    imageUrl: "https://images.unsplash.com/photo-1577563908411-50cb98976fea?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "studio", "vendor"],
    phase: 1
  },
  {
    id: "calendar",
    name: "Calendar OS",
    description: "Personal and unified shared team scheduling, booking availability, and event resource planning.",
    icon: CalendarDays,
    category: "Core Platform",
    tier: "FREE",
    price: "Free",
    features: ["Shared Team Calendars", "Live Booking Availability Link", "Conflict Auto-Detection"],
    imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "studio", "vendor"],
    phase: 1
  },
  {
    id: "notifications",
    name: "Notifications OS",
    description: "Omnichannel notification center supporting Push, SMS templates, WhatsApp alerts, and automated emails.",
    icon: Bell,
    category: "Core Platform",
    tier: "FREE",
    price: "Free",
    features: ["WhatsApp Templates Sync", "Custom SMS Gateway Routing", "Automated Booking Emails"],
    imageUrl: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "studio", "vendor"],
    phase: 1
  },

  // 2. Customer & Event Apps (Phase 1 & 2 & 3)
  {
    id: "event_os",
    name: "Event OS",
    description: "The operational center: event layout planning, timelines, checklist items, budgets, and analytics.",
    icon: Sparkle,
    category: "Customer & Events",
    tier: "FREE",
    price: "Free",
    features: ["Event Checklist Logs", "Command Room Workspace", "Budget Cost Sheet Tracking"],
    imageUrl: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "studio", "vendor"],
    phase: 1
  },
  {
    id: "guests",
    name: "Guest Management OS",
    description: "Manage guest lists, check-ins, family group tags, seating layouts, and live arrival status reports.",
    icon: Users,
    category: "Customer & Events",
    tier: "FREE",
    price: "Free",
    features: ["Live Guest Arrivals Checklist", "Interactive Seating Plan Builder", "Family Association Tagging"],
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["studio", "vendor"],
    phase: 1
  },
  {
    id: "invitations",
    name: "Invitation OS",
    description: "Design premium digital invitations, configure RSVP tracking URLs, and distribute via WhatsApp.",
    icon: QrCode,
    category: "Customer & Events",
    tier: "PREMIUM",
    price: "Rs. 800/mo",
    features: ["Digital Wedding Cards Designer", "RSVP Automated Tracker", "Check-in QR Card Codes"],
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["studio", "vendor"],
    phase: 1
  },
  {
    id: "memories",
    name: "Memories OS",
    description: "Secure photo delivery galleries, watermark configurations, and interactive guest upload hubs.",
    icon: Camera,
    category: "Customer & Events",
    tier: "FREE",
    price: "Free",
    features: ["High-Res Photo Download Links", "PIN-Protected Client Galleries", "QR Guest Upload Wall"],
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["studio", "vendor"],
    phase: 1
  },
  {
    id: "planner",
    name: "Event Planner OS",
    description: "Comprehensive coordination deck: templates, planning budgets, checklist timelines, and vendor networks.",
    icon: ListOrdered,
    category: "Customer & Events",
    tier: "PREMIUM",
    price: "Rs. 1,000/mo",
    features: ["Pre-built Checklist Templates", "Unified Coordinator Timelines", "Direct Planner Assignment"],
    imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["studio", "vendor"],
    phase: 2
  },

  // 3. Marketplace Apps (Phase 1)
  {
    id: "marketplace_os",
    name: "Marketplace OS",
    description: "Expose your profile on Pakistan's premier event directory. Manage reviews, searches, and leads.",
    icon: Search,
    category: "Marketplace",
    tier: "FREE",
    price: "Free",
    features: ["SEO Profiles optimization", "Live Customer Reviews Verification", "Direct Search Discovery Enquiries"],
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "studio", "vendor"],
    phase: 1
  },
  {
    id: "booking_os",
    name: "Booking OS",
    description: "Availability logs, digital proposals, booking requests, contract routing, and online approvals.",
    icon: Star,
    category: "Marketplace",
    tier: "FREE",
    price: "Free",
    features: ["Online Proposal E-Signatures", "Real-Time Booking Log Sheets", "Refund Policy Automations"],
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "studio", "vendor"],
    phase: 1
  },
  {
    id: "vendor_os",
    name: "Vendor OS",
    description: "Manage portfolio cards, package pricing configurations, slot bookings, and partner recommendations.",
    icon: Package,
    category: "Marketplace",
    tier: "FREE",
    price: "Free",
    features: ["Portfolio Item Uploads", "Seasonal Rate Multipliers", "Cross-Promo Vendor Networking"],
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "studio", "vendor"],
    phase: 1
  },
  {
    id: "studio_os",
    name: "Studio OS",
    description: "Specialized workspace for photography and videography teams. Projects, shoots, and deliveries.",
    icon: MonitorPlay,
    category: "Marketplace",
    tier: "FREE",
    price: "Free",
    features: ["Shoot Scheduling Dashboard", "Production Deliverables List", "Agency Level Portfolios"],
    imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "studio", "vendor"],
    phase: 1
  },
  {
    id: "venue_os",
    name: "Venue OS",
    description: "Specialized workspace for banquet halls, hotels, and farmhouses. Halls, pricing, and operations.",
    icon: Building2,
    category: "Marketplace",
    tier: "FREE",
    price: "Free",
    features: ["Banquet Hall Pricing Grid", "Operational Shifts Logger", "Dynamic Booking Matrix"],
    imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "studio", "vendor"],
    phase: 1
  },
  {
    id: "catering_os",
    name: "Catering OS",
    description: "Configure dish libraries, build food packages, compute raw materials, and sync kitchen sheets.",
    icon: ChefHat,
    category: "Marketplace",
    tier: "PREMIUM",
    price: "Rs. 1,000/mo",
    features: ["Recipe Raw Material Calculator", "Kitchen Prep Schedules", "Menu Builder Sheets"],
    imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "vendor"],
    phase: 2
  },
  {
    id: "decor_os",
    name: "Decor & Moodboards",
    description: "Drag-and-drop decor moodboards, design catalog syncs, floral lists, and staging layouts.",
    icon: Paintbrush,
    category: "Marketplace",
    tier: "PREMIUM",
    price: "Rs. 1,200/mo",
    features: ["Drag-and-Drop Moodboards", "Inventory Placement Logs", "Client Palette Reviews"],
    imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "vendor"],
    phase: 2
  },

  // 4. Business Operations Apps (Phase 2 & 3)
  {
    id: "accounting",
    name: "Accounting OS",
    description: "Revenue tracking, Profit & Loss analysis, expense management, vendor payouts, and financial sheets.",
    icon: Wallet,
    category: "Business Operations",
    tier: "PREMIUM",
    price: "Rs. 1,500/mo",
    features: ["Revenue & P&L Sheets", "Vendor Payouts Ledger", "Tax Report Preparations"],
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "studio", "vendor"],
    phase: 2
  },
  {
    id: "workforce",
    name: "HR & Workforce OS",
    description: "Staff and crew scheduling, attendance card logs, daily wagers database, and wage calculation desks.",
    icon: User,
    category: "Business Operations",
    tier: "PREMIUM",
    price: "Rs. 1,200/mo",
    features: ["Employee Attendance Tracker", "Daily Wagers Shift Sheets", "Workforce Scheduling Desk"],
    imageUrl: "https://images.unsplash.com/photo-1521791136368-1a8682707636?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "studio", "vendor"],
    studioId: "team",
    phase: 2
  },
  {
    id: "payroll",
    name: "Payroll OS",
    description: "Auto-generate salaries, track staff advance payouts, manage overtime formulas, and dispatch payslips.",
    icon: Coins,
    category: "Business Operations",
    tier: "PREMIUM",
    price: "Rs. 800/mo",
    features: ["Salaries Generation", "Overtime Calculator", "Automated Payslips Emailing"],
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "studio", "vendor"],
    phase: 3
  },
  {
    id: "inventory",
    name: "Inventory & Assets",
    description: "Track physical stock assets (decor, AV gear, cameras), consumable buffers, and warehouse locations.",
    icon: Package,
    category: "Business Operations",
    tier: "FREE",
    price: "Free",
    features: ["Physical Asset Cataloging", "Consumables Low-Stock Alerting", "Warehouse Location Transfers"],
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "studio", "vendor"],
    phase: 2
  },
  {
    id: "procurement",
    name: "Procurement OS",
    description: "Issue purchase requests, organize vendor RFQs, output purchase orders, and monitor supplies.",
    icon: Receipt,
    category: "Business Operations",
    tier: "PREMIUM",
    price: "Rs. 1,500/mo",
    features: ["Purchase Request Workflows", "RFQ Supplier Sheets", "Purchase Order Dispatcher"],
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "vendor"],
    phase: 3
  },
  {
    id: "rental",
    name: "Rental OS",
    description: "Log equipment check-ins/outs, schedule dispatches, configure damage reports, and track rental inventory.",
    icon: Sliders,
    category: "Business Operations",
    tier: "PREMIUM",
    price: "Rs. 1,500/mo",
    features: ["Live Rental Allocation Logs", "Dispatch Integrity Checklists", "Late Return Penalty Calculators"],
    imageUrl: "https://images.unsplash.com/photo-1506869640319-ce1a188bb36b?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["studio", "vendor"],
    phase: 2
  },
  {
    id: "tasks",
    name: "Task & Project OS",
    description: "Kanban task boards, workflow checklists, deadline alerts, and team allocations.",
    icon: CheckSquare,
    category: "Business Operations",
    tier: "FREE",
    price: "Free",
    features: ["Kanban Task Boards", "Team Performance Charts", "Urgent Milestone Notifications"],
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "studio", "vendor"],
    phase: 2
  },

  // 5. Venue & Hospitality Apps (Phase 2 & 4)
  {
    id: "displays",
    name: "Displays OS",
    description: "Dynamic digital signage welcome screens, menu boards, and Android TV loop publishers.",
    icon: Tv,
    category: "Venue & Hospitality",
    tier: "PREMIUM",
    price: "Rs. 2,000/mo",
    features: ["Android TV Loop Syncing", "Digital Signage Slides", "Welcome Welcome Messages Configurator"],
    imageUrl: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "studio", "vendor"],
    phase: 2
  },
  {
    id: "hospitality",
    name: "Hospitality OS",
    description: "Front-desk reception registers, concierge services, and guest request desk tracking.",
    icon: Users,
    category: "Venue & Hospitality",
    tier: "PREMIUM",
    price: "Rs. 1,500/mo",
    features: ["Guest Concierge Ticketing", "Reception Arrival Lists", "Internal Services Dispatcher"],
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue"],
    phase: 4
  },
  {
    id: "rooms",
    name: "Room Management OS",
    description: "Hotel room reservations, housekeeping shift triggers, and front desk check-in registers.",
    icon: Building2,
    category: "Venue & Hospitality",
    tier: "ENTERPRISE",
    price: "Contact Sales",
    features: ["Hotel Room Grid Booking", "Housekeeping Status Logs", "Billing Checkout Summaries"],
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue"],
    phase: 4
  },

  // 6. Creative Production Apps (Phase 1 & 4)
  {
    id: "production",
    name: "Production OS",
    description: "Track shoots, crew assignments, gear checklists, and transportation logs.",
    icon: Camera,
    category: "Creative Production",
    tier: "PREMIUM",
    price: "Rs. 1,500/mo",
    features: ["Shoot Crew Sheets", "Gear Dispatch Logs", "Live Transportation Calendars"],
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["studio", "vendor"],
    phase: 4
  },
  {
    id: "post_production",
    name: "Post Production OS",
    description: "Track editing pipelines, client video reviews, modification requests, and delivery timelines.",
    icon: Sliders,
    category: "Creative Production",
    tier: "PREMIUM",
    price: "Rs. 1,500/mo",
    features: ["Editing Pipeline Boards", "Interactive Video Reviews Interface", "Raw Asset Delivery Tracking"],
    imageUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["studio", "vendor"],
    phase: 4
  },
  {
    id: "portfolio",
    name: "Portfolio OS",
    description: "Launch public galleries, review widgets, and visual layouts directly synced with your website profile.",
    icon: BookOpen,
    category: "Creative Production",
    tier: "FREE",
    price: "Free",
    features: ["Gallery Website Syncs", "Rating Review Widgets", "Client Case-Study Builders"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["studio", "vendor"],
    phase: 1
  },
  {
    id: "streaming",
    name: "Live Streaming OS",
    description: "Broadcast setups, high-fidelity streams control desks, and live viewer analytics reporting.",
    icon: Tv,
    category: "Creative Production",
    tier: "PREMIUM",
    price: "Rs. 3,000/mo",
    features: ["Direct RTMP Streams Routing", "Live Viewers Stats Analytics", "Video Loop Backup Player"],
    imageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "studio", "vendor"],
    phase: 4
  },

  // 7. AI Apps (Phase 3)
  {
    id: "ai_assistant",
    name: "AI Assistant OS",
    description: "Natural language query engine to draft emails, generate proposals, and lookup dashboard records.",
    icon: Bot,
    category: "AI Apps",
    tier: "AI",
    price: "Rs. 2,000/mo",
    features: ["Automated Inquiry Responders", "Workspace Search Assistant", "Proposal Draft Writing"],
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "studio", "vendor"],
    studioId: "ai_assistant",
    phase: 3
  },
  {
    id: "ai_quotes",
    name: "AI Quotation OS",
    description: "Generate instant proposal price sheets based on client inputs and historically converted quotations.",
    icon: MessageSquareCode,
    category: "AI Apps",
    tier: "AI",
    price: "Rs. 1,500/mo",
    features: ["Proposal Smart Generator", "Client Intake Analytics Matching", "Dynamic Pricing Modifiers"],
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "studio", "vendor"],
    phase: 3
  },
  {
    id: "ai_content",
    name: "AI Content OS",
    description: "Draft wedding captions, compile social posts, write copy descriptions, and design marketing schedules.",
    icon: Sparkles,
    category: "AI Apps",
    tier: "AI",
    price: "Rs. 1,000/mo",
    features: ["Social Caption Generators", "Creative Cards Copywriter", "Campaign Scheduling Schedules"],
    imageUrl: "https://images.unsplash.com/photo-1684369585098-904123b306b9?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "studio", "vendor"],
    phase: 3
  },
  {
    id: "ai_analytics",
    name: "AI Analytics OS",
    description: "Gain business recommendations, conversions forecasts, and customer behavior insights via AI.",
    icon: TrendingUp,
    category: "AI Apps",
    tier: "AI",
    price: "Rs. 2,500/mo",
    features: ["Revenue Growth Forecasting", "Lead Conversions Predictions", "Automated Business Advice"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "studio", "vendor"],
    phase: 3
  },

  // 8. Enterprise OS (Phase 2 & 4)
  {
    id: "analytics",
    name: "Analytics OS",
    description: "Deep dive reporting workspace: lead acquisition costs, bookings densities, and business analytics.",
    icon: BarChart3,
    category: "Enterprise OS",
    tier: "PREMIUM",
    price: "Rs. 2,500/mo",
    features: ["Sales Conversion Funnel Charts", "Occupancy Density Maps", "Revenue Growth Summaries"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "studio", "vendor"],
    phase: 2
  },
  {
    id: "reports",
    name: "Reports OS",
    description: "Create fully customized exports, configure visual dashboards, and schedule automated reports email routing.",
    icon: PieChart,
    category: "Enterprise OS",
    tier: "PREMIUM",
    price: "Rs. 1,500/mo",
    features: ["Custom CSV/PDF Exports", "Scheduled Emails Summaries", "Visual Dashboard Widgets Builder"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "studio", "vendor"],
    phase: 2
  },
  {
    id: "workflow",
    name: "Workflow Automation OS",
    description: "Construct trigger-action automations, connect lead alerts to actions, and auto-dispatch proposals.",
    icon: Settings,
    category: "Enterprise OS",
    tier: "ENTERPRISE",
    price: "Contact Sales",
    features: ["Visual Trigger Builder Tool", "Webhook Action Hooks", "Dynamic Field Replacements"],
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "studio", "vendor"],
    phase: 3
  },
  {
    id: "integrations",
    name: "API & Integration OS",
    description: "Access official SDK APIs, configure third-party webhooks, and map CRM databases.",
    icon: Key,
    category: "Enterprise OS",
    tier: "ENTERPRISE",
    price: "Contact Sales",
    features: ["Webhooks Custom Gateways", "Token Management Desks", "API Sandbox Environments"],
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "studio", "vendor"],
    phase: 4
  },
  {
    id: "marketplace_admin",
    name: "App Marketplace OS",
    description: "Manage subscription plans, review billing invoices, configure scopes, and add billing items.",
    icon: AppWindow,
    category: "Enterprise OS",
    tier: "ENTERPRISE",
    price: "Contact Sales",
    features: ["Workspace Billing Invoices Desk", "Seat Allocations Console", "Application Scopes Configurator"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
    supportedWorkspaces: ["venue", "studio", "vendor"],
    phase: 4
  }
]

export function NexusAppsView() {
  const [activeTab, setActiveTab] = useState<"all" | "active">("all")
  const [activeCategory, setActiveCategory] = useState<AppCategory>("All")
  const [selectedApp, setSelectedApp] = useState<NexusApp | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  
  // Workspace installations local state
  const [venueApps, setVenueApps] = useState<string[]>([])
  const [studioApps, setStudioApps] = useState<string[]>([])
  const [vendorApps, setVendorApps] = useState<string[]>([])

  // Modal setup state (Configurations)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [configuringApp, setConfiguringApp] = useState<NexusApp | null>(null)
  const [modalVenueChecked, setModalVenueChecked] = useState(false)
  const [modalStudioChecked, setModalStudioChecked] = useState(false)
  const [modalVendorChecked, setModalVendorChecked] = useState(false)

  // Modal setup state (Waitlist/Early Access)
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)
  const [waitlistApp, setWaitlistApp] = useState<NexusApp | null>(null)
  const [waitlistEmail, setWaitlistEmail] = useState("")
  const [waitlistCompany, setWaitlistCompany] = useState("")
  const [waitlistRole, setWaitlistRole] = useState("Venue Owner")

  // Feedback notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Load from local storage
  const loadInstallationStates = () => {
    // Venue OS
    const storedVenue = localStorage.getItem("nexus_venue_apps")
    if (storedVenue) {
      try { setVenueApps(JSON.parse(storedVenue)) } catch (e) {}
    } else {
      const initial = ["accounting", "workforce", "ai_helper"]
      localStorage.setItem("nexus_venue_apps", JSON.stringify(initial))
      setVenueApps(initial)
    }

    // Studio OS
    const storedStudio = localStorage.getItem("nexus-installed-apps")
    if (storedStudio) {
      try { setStudioApps(JSON.parse(storedStudio)) } catch (e) {}
    } else {
      const initial = ["dashboard", "leads"]
      localStorage.setItem("nexus-installed-apps", JSON.stringify(initial))
      setStudioApps(initial)
    }

    // Vendor OS
    const storedVendor = localStorage.getItem("nexus_vendor_apps")
    if (storedVendor) {
      try { setVendorApps(JSON.parse(storedVendor)) } catch (e) {}
    } else {
      const initial = ["displays", "rental", "accounting"]
      localStorage.setItem("nexus_vendor_apps", JSON.stringify(initial))
      setVendorApps(initial)
    }
  }

  useEffect(() => {
    loadInstallationStates()

    // Add general listener to sync changes
    const syncStates = () => {
      loadInstallationStates()
    }
    window.addEventListener("storage", syncStates)
    window.addEventListener("nexus_venue_apps_changed", syncStates)
    window.addEventListener("nexus_studio_apps_changed", syncStates)
    window.addEventListener("nexus_vendor_apps_changed", syncStates)

    return () => {
      window.removeEventListener("storage", syncStates)
      window.removeEventListener("nexus_venue_apps_changed", syncStates)
      window.removeEventListener("nexus_studio_apps_changed", syncStates)
      window.removeEventListener("nexus_vendor_apps_changed", syncStates)
    }
  }, [])

  // Auto-clear toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toastMessage])

  // Helper check if installed anywhere
  const isInstalledAnywhere = (app: NexusApp) => {
    const isVen = venueApps.includes(app.id)
    const isStud = studioApps.includes(app.studioId || app.id)
    const isVend = vendorApps.includes(app.id)
    return isVen || isStud || isVend
  }

  // Categories list
  const categories: AppCategory[] = [
    "All", "Core Platform", "Customer & Events", "Marketplace", "Business Operations", "Venue & Hospitality", "Creative Production", "AI Apps", "Enterprise OS"
  ]

  // Filter apps
  const filteredApps = APPS_DIRECTORY.filter(app => {
    const matchesCategory = activeCategory === "All" || app.category === activeCategory
    const matchesTab = activeTab === "all" || isInstalledAnywhere(app)
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesTab && matchesSearch
  })

  // Open install configuration dialog
  const openConfigurationModal = (app: NexusApp) => {
    if (app.phase >= 3) {
      // Phase 3 & 4 apps open waitlist modal
      setWaitlistApp(app)
      setWaitlistEmail("")
      setWaitlistCompany("")
      setIsWaitlistOpen(true)
    } else {
      setConfiguringApp(app)
      setModalVenueChecked(venueApps.includes(app.id))
      setModalStudioChecked(studioApps.includes(app.studioId || app.id))
      setModalVendorChecked(vendorApps.includes(app.id))
      setIsModalOpen(true)
    }
  }

  // Handle Save configuration targets
  const saveInstallationTargets = () => {
    if (!configuringApp) return

    // Update Venue OS
    let nextVenue = [...venueApps]
    if (configuringApp.supportedWorkspaces.includes("venue")) {
      if (modalVenueChecked) {
        if (!nextVenue.includes(configuringApp.id)) nextVenue.push(configuringApp.id)
      } else {
        nextVenue = nextVenue.filter(id => id !== configuringApp.id)
      }
      localStorage.setItem("nexus_venue_apps", JSON.stringify(nextVenue))
      setVenueApps(nextVenue)
      window.dispatchEvent(new Event("nexus_venue_apps_changed"))
    }

    // Update Studio OS
    let nextStudio = [...studioApps]
    const sId = configuringApp.studioId || configuringApp.id
    if (configuringApp.supportedWorkspaces.includes("studio")) {
      if (modalStudioChecked) {
        if (!nextStudio.includes(sId)) nextStudio.push(sId)
      } else {
        nextStudio = nextStudio.filter(id => id !== sId)
      }
      localStorage.setItem("nexus-installed-apps", JSON.stringify(nextStudio))
      setStudioApps(nextStudio)
      window.dispatchEvent(new Event("nexus_studio_apps_changed"))
    }

    // Update Vendor OS
    let nextVendor = [...vendorApps]
    if (configuringApp.supportedWorkspaces.includes("vendor")) {
      if (modalVendorChecked) {
        if (!nextVendor.includes(configuringApp.id)) nextVendor.push(configuringApp.id)
      } else {
        nextVendor = nextVendor.filter(id => id !== configuringApp.id)
      }
      localStorage.setItem("nexus_vendor_apps", JSON.stringify(nextVendor))
      setVendorApps(nextVendor)
      window.dispatchEvent(new Event("nexus_vendor_apps_changed"))
    }

    // General storage event
    window.dispatchEvent(new Event("storage"))

    setToastMessage(`Workspaces updated for ${configuringApp.name}!`)
    setIsModalOpen(false)
    setConfiguringApp(null)
  }

  // Handle Join Waitlist submit
  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault()
    if (!waitlistApp) return

    setToastMessage(`Success! Joined waitlist for ${waitlistApp.name}.`)
    setIsWaitlistOpen(false)
    setWaitlistApp(null)
  }

  return (
    <div className="space-y-8 w-full pb-12 animate-in fade-in duration-500 relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 bg-[#0F5B3E] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-[12px] font-bold"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#ECE7DF] dark:border-white/10 pb-5">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            <AppWindow className="w-6 h-6 text-[#0F5B3E]" /> Nexus App Store
            <span className="text-[9.5px] font-bold text-[#0F5B3E] bg-[#E6F0EC] px-2.5 py-0.5 rounded-full tracking-wider uppercase">
              Ecosystem
            </span>
          </h1>
          <p className="text-gray-500 mt-1 text-[12px] font-semibold">
            Explore 40 unified enterprise applications. Activate modular suites or join priority waitlists for forthcoming workspaces.
          </p>
        </div>

        {/* Tab switchers & Search bar */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search apps..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-xl border border-slate-200 bg-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F5B3E]/20"
            />
          </div>

          <div className="flex bg-gray-100 p-1 rounded-xl border border-transparent self-start sm:self-auto">
            <button 
              onClick={() => setActiveTab("all")}
              className={`px-4 py-1.5 rounded-lg text-[12px] font-bold transition-all ${
                activeTab === "all" ? "bg-white text-gray-950 shadow-xs" : "text-gray-500 hover:text-gray-950"
              }`}
            >
              All Systems
            </button>
            <button 
              onClick={() => setActiveTab("active")}
              className={`px-4 py-1.5 rounded-lg text-[12px] font-bold transition-all ${
                activeTab === "active" ? "bg-white text-gray-950 shadow-xs" : "text-gray-500 hover:text-gray-950"
              }`}
            >
              Installed Modules
            </button>
          </div>
        </div>
      </div>

      {/* Categories Filter Strip */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#ECE7DF]/50">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all border ${
              activeCategory === cat
                ? "bg-[#0F5B3E] text-white border-transparent shadow-xs scale-102"
                : "bg-white text-gray-600 border-[#ECE7DF] hover:bg-gray-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Apps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 text-left">
        {filteredApps.map((app) => {
          const isVen = venueApps.includes(app.id)
          const isStud = studioApps.includes(app.studioId || app.id)
          const isVend = vendorApps.includes(app.id)
          
          const activeWorkspaces = []
          if (isVen) activeWorkspaces.push("Venue OS")
          if (isStud) activeWorkspaces.push("Studio OS")
          if (isVend) activeWorkspaces.push("Vendor OS")

          const installed = activeWorkspaces.length > 0

          // Phase badges/styling colors
          const phaseBadgeStyles = {
            1: "bg-[#E6F0EC] text-[#0F5B3E] border-[#0F5B3E]/10",
            2: "bg-blue-50 text-blue-700 border-blue-100",
            3: "bg-amber-50 text-amber-700 border-amber-100",
            4: "bg-purple-50 text-purple-700 border-purple-100"
          }

          return (
            <div 
              key={app.id} 
              className={`group bg-white rounded-3xl border ${installed ? "border-[#0F5B3E]/30 ring-1 ring-[#0F5B3E]/10 shadow-sm" : "border-slate-200 shadow-xs"} overflow-hidden flex flex-col justify-between h-[220px] relative transition-all duration-300 hover:shadow-lg`}
            >
              
              {/* Hover Preview Overlay */}
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col items-center justify-center p-5 text-center">
                <h4 className="text-white font-black text-sm mb-1">{app.name}</h4>
                <p className="text-[#34D399] text-[9.5px] font-black uppercase tracking-wider mb-2">Phase {app.phase} Roadmap</p>
                <p className="text-slate-300 text-[10.5px] font-medium mb-5">Click preview to see module screenshots and features list.</p>
                
                <div className="flex gap-2 w-full max-w-[200px]">
                  <Button 
                    size="sm"
                    onClick={() => setSelectedApp(app)}
                    className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-lg text-[11px]"
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" /> Quick Preview
                  </Button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3 gap-2">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${installed ? "bg-[#E6F0EC] text-[#0F5B3E]" : "bg-slate-100 text-slate-400"}`}>
                      <app.icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[13px] font-black text-slate-900 leading-tight line-clamp-2" title={app.name}>
                        {app.name}
                      </h3>
                      <span className="text-[9px] font-bold text-slate-400 block truncate mt-0.5">{app.category}</span>
                    </div>
                  </div>
                  <span className={`text-[8.5px] font-extrabold px-1.5 py-0.5 rounded border shrink-0 ${phaseBadgeStyles[app.phase]}`}>
                    Phase {app.phase}
                  </span>
                </div>

                <p className="text-[11px] text-gray-500 font-medium leading-relaxed flex-1 overflow-hidden line-clamp-3">
                  {app.description}
                </p>
              </div>

              {/* Action Bar */}
              <div className="px-5 py-3 border-t border-slate-50 bg-slate-50/50 flex justify-between items-center text-[10.5px]">
                <div className="flex flex-col gap-0.5">
                  <span className="text-slate-400 font-bold">Active Workspace:</span>
                  <span className="text-slate-800 font-extrabold text-[9px] truncate max-w-[120px]">
                    {app.phase >= 3 ? "Waitlist Queue" : (installed ? activeWorkspaces.join(", ") : "Not Installed")}
                  </span>
                </div>
                <button 
                  onClick={() => openConfigurationModal(app)}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-all ${
                    app.phase >= 3 
                      ? "bg-slate-950 text-white hover:bg-slate-800 text-[10px]" 
                      : (installed 
                        ? "border border-[#0F5B3E] text-[#0F5B3E] hover:bg-[#E6F0EC]" 
                        : "bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white"
                      )
                  }`}
                >
                  {app.phase >= 3 ? "Request Access" : "Configure"}
                </button>
              </div>

            </div>
          )
        })}

        {filteredApps.length === 0 && (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-center border-2 border-dashed border-[#ECE7DF] rounded-3xl bg-white">
            <Info className="w-9 h-9 text-slate-300 mb-2" />
            <h4 className="font-bold text-slate-800">No applications found</h4>
            <p className="text-[11px] text-slate-400 mt-1 max-w-[280px]">
              No active modules or waitlist queues were found matching your current search parameters.
            </p>
          </div>
        )}
      </div>

      {/* Install Target Selector Modal */}
      <AnimatePresence>
        {isModalOpen && configuringApp && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-[#FAF8F5]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#E6F0EC] text-[#0F5B3E] flex items-center justify-center">
                    <configuringApp.icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-[14px]">Configure {configuringApp.name}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Installation Destinations</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 hover:bg-slate-200 text-slate-400 hover:text-slate-700 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Selector checkboxes */}
              <div className="p-6 space-y-4">
                <p className="text-[11.5px] text-slate-500 font-medium">
                  Select which active workspaces will display this module and configure its settings. Unchecking will deactivate the module from that view.
                </p>

                <div className="space-y-2">
                  
                  {/* Venue OS */}
                  {configuringApp.supportedWorkspaces.includes("venue") ? (
                    <label className="flex items-center justify-between p-3 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          checked={modalVenueChecked} 
                          onChange={(e) => setModalVenueChecked(e.target.checked)}
                          className="w-4.5 h-4.5 text-[#0F5B3E] rounded-md border-slate-300 focus:ring-[#0F5B3E]"
                        />
                        <div className="text-left">
                          <p className="text-[12px] font-black text-slate-800 flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" /> Venue OS Workspace
                          </p>
                          <p className="text-[9.5px] text-slate-400">Install in banquet & venue management dashboard</p>
                        </div>
                      </div>
                      <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded ${modalVenueChecked ? "bg-[#E6F0EC] text-[#0F5B3E]" : "bg-slate-100 text-slate-400"}`}>
                        {modalVenueChecked ? "Active" : "Inactive"}
                      </span>
                    </label>
                  ) : (
                    <div className="flex items-center justify-between p-3 border border-slate-100 rounded-2xl bg-slate-50/50 opacity-60">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" disabled className="w-4.5 h-4.5 rounded-md border-slate-200" />
                        <div className="text-left">
                          <p className="text-[12px] font-black text-slate-400 flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-slate-300" /> Venue OS Workspace
                          </p>
                          <p className="text-[9.5px] text-slate-300">Not supported for this module type</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Studio OS */}
                  {configuringApp.supportedWorkspaces.includes("studio") ? (
                    <label className="flex items-center justify-between p-3 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          checked={modalStudioChecked} 
                          onChange={(e) => setModalStudioChecked(e.target.checked)}
                          className="w-4.5 h-4.5 text-[#0F5B3E] rounded-md border-slate-300 focus:ring-[#0F5B3E]"
                        />
                        <div className="text-left">
                          <p className="text-[12px] font-black text-slate-800 flex items-center gap-1">
                            <Laptop className="w-3.5 h-3.5 text-slate-400" /> Studio OS Workspace
                          </p>
                          <p className="text-[9.5px] text-slate-400">Install in photographer / videographer dashboard</p>
                        </div>
                      </div>
                      <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded ${modalStudioChecked ? "bg-[#E6F0EC] text-[#0F5B3E]" : "bg-slate-100 text-slate-400"}`}>
                        {modalStudioChecked ? "Active" : "Inactive"}
                      </span>
                    </label>
                  ) : null}

                  {/* Vendor OS */}
                  {configuringApp.supportedWorkspaces.includes("vendor") ? (
                    <label className="flex items-center justify-between p-3 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          checked={modalVendorChecked} 
                          onChange={(e) => setModalVendorChecked(e.target.checked)}
                          className="w-4.5 h-4.5 text-[#0F5B3E] rounded-md border-slate-300 focus:ring-[#0F5B3E]"
                        />
                        <div className="text-left">
                          <p className="text-[12px] font-black text-slate-800 flex items-center gap-1">
                            <Server className="w-3.5 h-3.5 text-slate-400" /> Vendor / Freelancer OS
                          </p>
                          <p className="text-[9.5px] text-slate-400">Install in general event service provider dashboard</p>
                        </div>
                      </div>
                      <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded ${modalVendorChecked ? "bg-[#E6F0EC] text-[#0F5B3E]" : "bg-slate-100 text-slate-400"}`}>
                        {modalVendorChecked ? "Active" : "Inactive"}
                      </span>
                    </label>
                  ) : null}

                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3 justify-end">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl font-bold text-[11px]"
                >
                  Cancel
                </Button>
                <Button 
                  size="sm"
                  onClick={saveInstallationTargets}
                  className="bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white rounded-xl font-bold text-[11px]"
                >
                  Confirm Settings
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Early Access / Waitlist Join Modal */}
      <AnimatePresence>
        {isWaitlistOpen && waitlistApp && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsWaitlistOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-[#FAF8F5]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
                    <Sparkles className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-[14px]">Request Early Access</h3>
                    <p className="text-[10px] text-amber-600 font-bold uppercase">Roadmap Phase {waitlistApp.phase}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsWaitlistOpen(false)}
                  className="p-1.5 hover:bg-slate-200 text-slate-400 hover:text-slate-700 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleJoinWaitlist}>
                <div className="p-6 space-y-4">
                  <p className="text-[11.5px] text-slate-500 font-medium">
                    This module (<strong>{waitlistApp.name}</strong>) is scheduled for release in Phase {waitlistApp.phase}. Sign up for early beta access queues and launch announcements.
                  </p>

                  <div className="space-y-3 text-left">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Company / Organization</label>
                      <input 
                        type="text" 
                        required
                        value={waitlistCompany}
                        onChange={(e) => setWaitlistCompany(e.target.value)}
                        placeholder="e.g. Shalimar Event Planners"
                        className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F5B3E]/20"
                      />
                    </div>
                    
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Business Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={waitlistEmail}
                        onChange={(e) => setWaitlistEmail(e.target.value)}
                        placeholder="e.g. name@company.com"
                        className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F5B3E]/20"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Your Industry Role</label>
                      <select 
                        value={waitlistRole}
                        onChange={(e) => setWaitlistRole(e.target.value)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F5B3E]/20"
                      >
                        <option value="Venue Owner">Venue Owner / Banquet Manager</option>
                        <option value="Studio Agency">Creative Production / Photographer</option>
                        <option value="Caterer / Decorator">Independent Event Vendor</option>
                        <option value="Enterprise Client">Enterprise Operations Executive</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3 justify-end">
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsWaitlistOpen(false)}
                    className="rounded-xl font-bold text-[11px]"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    size="sm"
                    className="bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white rounded-xl font-bold text-[11px]"
                  >
                    Submit Request
                  </Button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Module Preview Drawer */}
      <AnimatePresence>
        {selectedApp && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedApp(null)}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs z-50"
            />
            <motion.div 
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl bg-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[85vh]"
            >
              <button 
                onClick={() => setSelectedApp(null)}
                className="absolute top-4 right-4 z-50 bg-black/20 text-white hover:bg-white hover:text-slate-900 rounded-full p-1.5 backdrop-blur-xs transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Cover visual banner */}
              <div className="w-full h-56 shrink-0 relative overflow-hidden group">
                <img 
                  src={selectedApp.imageUrl} 
                  alt={selectedApp.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                <div className="absolute bottom-5 left-6 right-6 z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 shadow-lg text-white">
                      <selectedApp.icon className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-white tracking-tight drop-shadow-md">{selectedApp.name}</h2>
                      <p className="text-white/80 font-bold text-[10.5px] uppercase tracking-wider">{selectedApp.category} • Phase {selectedApp.phase}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description content */}
              <div className="p-6 bg-slate-50 overflow-y-auto flex-1 flex flex-col md:flex-row gap-6">
                <div className="flex-1 text-left">
                  <p className="text-slate-600 font-medium text-[13px] leading-relaxed mb-6">
                    {selectedApp.description}
                  </p>

                  <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-wider mb-3">Key Features & Modules Included</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedApp.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] font-bold text-slate-700 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right CTA bar */}
                <div className="w-full md:w-56 shrink-0 border-t md:border-t-0 md:border-l border-slate-200 pt-5 md:pt-0 md:pl-6 flex flex-col justify-center">
                  <div className="mb-4 text-center md:text-left">
                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider">Plan Billing</span>
                    <p className="text-lg font-black text-[#D9467A]">{selectedApp.price}</p>
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => {
                      const app = selectedApp
                      setSelectedApp(null)
                      openConfigurationModal(app)
                    }}
                    className="w-full bg-[#0F5B3E] text-white hover:bg-[#0A3B2A] rounded-xl font-bold h-10 text-[12px]"
                  >
                    {selectedApp.phase >= 3 ? "Join Beta Waitlist" : "Configure Destinations"}
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
