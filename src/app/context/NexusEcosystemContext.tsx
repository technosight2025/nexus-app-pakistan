"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useOrganization } from "./OrganizationContext";

export type EcosystemRole = "superadmin" | "business" | "customer" | "public";

export interface AppConfig {
  id: string;
  name: string;
  description: string;
  category: "Finance" | "Marketing" | "Event Management" | "Displays" | "Memories" | "Invitations" | "Team Management" | "AI Tools";
  price: "Free" | "Paid";
  priceDetail?: string;
  isPremium: boolean;
  iconName: string;
}

export const ECOSYSTEM_APPS: AppConfig[] = [
  {
    id: "dashboard",
    name: "Core Dashboard",
    description: "Business overview, analytics summary, and recent activity metrics feed.",
    category: "Event Management",
    price: "Free",
    isPremium: false,
    iconName: "LayoutGrid"
  },
  {
    id: "leads",
    name: "CRM & Leads",
    description: "Track enquiries, quotation statuses, and convert client conversations into bookings.",
    category: "Event Management",
    price: "Free",
    isPremium: false,
    iconName: "Users"
  },
  {
    id: "accounting",
    name: "Accounting Pro",
    description: "Revenue tracking, Profit & Loss analysis, expense management, vendor payouts, and financial sheets.",
    category: "Finance",
    price: "Paid",
    priceDetail: "Rs. 1,500/mo",
    isPremium: true,
    iconName: "Wallet"
  },
  {
    id: "displays",
    name: "Displays OS",
    description: "Broadcast slideshows, live guest uploads wall, welcome screens, and Android TV event signage publishing.",
    category: "Displays",
    price: "Paid",
    priceDetail: "Rs. 2,000/mo",
    isPremium: true,
    iconName: "MonitorPlay"
  },
  {
    id: "memories",
    name: "Memories Pro",
    description: "Unlimited photo galleries, high-res video sharing, guest upload portal, QR code card generators.",
    category: "Memories",
    price: "Paid",
    priceDetail: "Rs. 1,000/mo",
    isPremium: true,
    iconName: "Camera"
  },
  {
    id: "invitations",
    name: "Invitations Pro",
    description: "Digital wedding cards builder, RSVP collection tracker, guest list, and check-in QR codes.",
    category: "Invitations",
    price: "Paid",
    priceDetail: "Rs. 800/mo",
    isPremium: true,
    iconName: "QrCode"
  },
  {
    id: "team",
    name: "Team OS",
    description: "Employee profiles, freelancer database, daily wagers database, attendance tracking, and shifts scheduling.",
    category: "Team Management",
    price: "Paid",
    priceDetail: "Rs. 1,200/mo",
    isPremium: true,
    iconName: "Users"
  },
  {
    id: "rental",
    name: "Rental OS",
    description: "Equipment tracking, camera lens inventories, bookings log, automated damage reports, alerts.",
    category: "Event Management",
    price: "Paid",
    priceDetail: "Rs. 1,500/mo",
    isPremium: true,
    iconName: "Sliders"
  },
  {
    id: "ai_assistant",
    name: "AI Studio Assistant",
    description: "Generate quotes, draft messages to clients, search event files, analyze revenues using natural language.",
    category: "AI Tools",
    price: "Paid",
    isPremium: true,
    iconName: "Bot"
  },
  {
    id: "storefront",
    name: "AI Storefront Maker",
    description: "Generate a stunning, fully-customized public vendor website using AI. Preview and publish instantly.",
    category: "Marketing",
    price: "Free",
    isPremium: false,
    iconName: "LayoutTemplate"
  }
];

interface NexusEcosystemContextType {
  currentRole: EcosystemRole;
  installedAppIds: string[];
  installApp: (appId: string) => void;
  uninstallApp: (appId: string) => void;
  isAppInstalled: (appId: string) => boolean;
  availableApps: AppConfig[];
}

const NexusEcosystemContext = createContext<NexusEcosystemContextType | undefined>(undefined);

const DEFAULT_APPS = ["dashboard", "leads"];

export function NexusEcosystemProvider({ children }: { children: React.ReactNode }) {
  const { profile, isAuthenticated } = useAuth();
  const { organization } = useOrganization();
  
  const [currentRole, setCurrentRole] = useState<EcosystemRole>("public");
  const [installedAppIds, setInstalledAppIds] = useState<string[]>(DEFAULT_APPS);

  // Determine Ecosystem Role
  useEffect(() => {
    if (isAuthenticated) {
      if (profile?.email?.includes("admin@nexus.pk") || profile?.role === "admin" as any) {
        setCurrentRole("superadmin");
      } else if (organization) {
        setCurrentRole("business");
      } else {
        setCurrentRole("customer");
      }
    } else {
      setCurrentRole("public");
    }
  }, [profile, organization, isAuthenticated]);

  // Handle Installed Apps
  useEffect(() => {
    const loadSaved = () => {
      const saved = localStorage.getItem("nexus-installed-apps");
      if (saved) {
        try {
          setInstalledAppIds(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to load installed apps", e);
        }
      }
    };
    loadSaved();

    const handleStorageChange = () => loadSaved();
    window.addEventListener("nexus_studio_apps_changed", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("nexus_studio_apps_changed", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const installApp = (appId: string) => {
    setInstalledAppIds(prev => {
      if (prev.includes(appId)) return prev;
      const next = [...prev, appId];
      localStorage.setItem("nexus-installed-apps", JSON.stringify(next));
      window.dispatchEvent(new Event("nexus_studio_apps_changed"));
      return next;
    });
  };

  const uninstallApp = (appId: string) => {
    if (appId === "dashboard" || appId === "leads") return;
    setInstalledAppIds(prev => {
      const next = prev.filter(id => id !== appId);
      localStorage.setItem("nexus-installed-apps", JSON.stringify(next));
      window.dispatchEvent(new Event("nexus_studio_apps_changed"));
      return next;
    });
  };

  const isAppInstalled = (appId: string) => installedAppIds.includes(appId);

  return (
    <NexusEcosystemContext.Provider value={{
      currentRole,
      installedAppIds,
      installApp,
      uninstallApp,
      isAppInstalled,
      availableApps: ECOSYSTEM_APPS
    }}>
      {children}
    </NexusEcosystemContext.Provider>
  );
}

export function useNexusEcosystem() {
  const context = useContext(NexusEcosystemContext);
  if (context === undefined) {
    throw new Error("useNexusEcosystem must be used within a NexusEcosystemProvider");
  }
  return context;
}
