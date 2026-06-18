# NEXUS — Product Build Plan

This document maps the developmental milestones and phase roadmap for the NEXUS platform.

---

## Phase 0 — Foundation

Establish the core multi-tenant security layers, database structures, and dynamic authentications.

*   [ ] **PostgreSQL Schemas:** Set up tables (`organizations`, `users`, `subscriptions`, `module_activations`, `feature_flags`, `notifications`, `audit_logs`) inside Supabase.
*   [ ] **Row-Level Security (RLS):** Write and test RLS policies using `organization_id` to guarantee absolute data isolation between tenant organizations.
*   [ ] **Supabase Auth Integration:** Set up session middlewares, dynamic cookie exchanges, and login/signup/password-recovery views within the Next.js `(auth)` group.
*   [ ] **Type Synchronization:** Map DB types to domain types inside [index.ts](file:///d:/Nexus-App-Pakistan/src/types/index.ts) using the Supabase CLI generator.

---

## Phase 1 — Dashboard Framework

Implement the responsive dashboard workspace, navigation layers, and permission checkers.

*   [ ] **Responsive Shell Layout:** Setup the desktop sidebar ([Sidebar.tsx](file:///d:/Nexus-App-Pakistan/src/components/layout/Sidebar.tsx)) and touch-screen bottom navigation bar ([MobileBottomNav](file:///d:/Nexus-App-Pakistan/src/components/layout/MobileBottomNav.tsx)).
*   [ ] **Global State Stores:** Configure Zustand client-state slices for active sessions, user notifications, and UI panel settings.
*   [ ] **RBAC Security Layers:** Build the `<RequirePermission>` component wrapper to enforce permissions dynamically.
*   [ ] **License Verification:** Develop the `<RequirePlan>` wrapper matching capability thresholds inside [plans.ts](file:///d:/Nexus-App-Pakistan/src/lib/subscriptions/plans.ts).

---

## Phase 2 — Venue Management Suite

Build workspace modules tailored for wedding marquees, banquet halls, and hospitality venues.

*   [ ] **Central Calendar:** Build the interactive scheduler ([CalendarView.tsx](file:///d:/Nexus-App-Pakistan/src/components/dashboard/venue/CalendarView.tsx)) preventing schedule overlaps.
*   [ ] **Leads CRM Pipeline:** Establish kanban card trackers ([LeadsView.tsx](file:///d:/Nexus-App-Pakistan/src/components/dashboard/venue/LeadsView.tsx)) mapping inquiry lifecycles.
*   [ ] **Quotation Builder:** Create pricing calculation grids ([QuotationBuilder.tsx](file:///d:/Nexus-App-Pakistan/src/components/dashboard/venue/QuotationBuilder.tsx)) with tax overrides.
*   [ ] **Halls & Spaces Configurator:** Enable vendors to register individual halls, marquees, and capacity thresholds.

---

## Phase 3 — Media Studio Suite

Build tools for photography houses, videography agencies, and media production suites.

*   [ ] **Shoot Projects Board:** Build the Kanban shoot workflow tracker ([StudioProjectsView.tsx](file:///d:/Nexus-App-Pakistan/src/components/dashboard/studio/StudioProjectsView.tsx)).
*   [ ] **Equipment Tracking Ledger:** Build the gear checkout checklist ([EquipmentTrackingView.tsx](file:///d:/Nexus-App-Pakistan/src/components/dashboard/studio/EquipmentTrackingView.tsx)) for lenses, cameras, and lights.
*   [ ] **Team Assignment Scheduler:** Enable studio managers to assign shooters, lighting helpers, and editors to events.
*   [ ] **Accounting Ledger:** Implement the direct business margin log tracker ([AccountingView.tsx](file:///d:/Nexus-App-Pakistan/src/components/dashboard/studio/AccountingView.tsx)).

---

## Phase 4 — Customer Platform

Design the public marketplace discovery directories and client dashboard portals.

*   [ ] **Public Search Directories:** Render search filters for directories (`/venues`, `/photographers`, `/caterers`) using React Server Components.
*   [ ] **Dynamic SEO Metadata:** Integrate page-level SEO descriptors (meta titles, custom social banners, structured schema data).
*   [ ] **Public Profiles:** Build marketplace profiles templates ([PublicProfilePreview.tsx](file:///d:/Nexus-App-Pakistan/src/components/dashboard/venue/PublicProfilePreview.tsx)) rendering portfolios.

---

## Phase 5 — NEXUS Apps Marketplace

Implement the module-to-plan management cockpit.

*   [ ] **Modules Registry:** Build the marketplace dashboard panel ([NexusAppsView.tsx](file:///d:/Nexus-App-Pakistan/src/components/dashboard/venue/NexusAppsView.tsx)).
*   [ ] **Dynamic Activation Toggle:** Create dashboard toggle controls connecting module activation fields to database triggers.
*   [ ] **Billing Tier Sync:** Connect active module counts to active subscription verification hooks.

---

## Phase 6 — Digital Displays

Introduce digital signage streaming tools for banquet lobbies.

*   [ ] **Display pairing module:** Build display connection managers ([DisplaysView.tsx](file:///d:/Nexus-App-Pakistan/src/components/dashboard/venue/DisplaysView.tsx)).
*   [ ] **Slideshow Playlist streams:** Create media stream handlers pushing custom slide collections to paired screens.
*   [ ] **Real-time Schedule integration:** Automatically stream active room schedules, timing cards, and event banners.

---

## Phase 7 — Memories Platform

Deploy the creative assets review and digital delivery hub.

*   [ ] **Photo Selection Proofs:** Build digital proofing portals ([PhotoSelectionView.tsx](file:///d:/Nexus-App-Pakistan/src/components/dashboard/studio/PhotoSelectionView.tsx)).
*   [ ] **Video Reviews canvas:** Deploy the timestamped video feedback container ([VideoReviewView.tsx](file:///d:/Nexus-App-Pakistan/src/components/dashboard/studio/VideoReviewView.tsx)).
*   [ ] **Secure Delivery Center:** Build high-speed CDN deliver centers ([DeliveryCenterView.tsx](file:///d:/Nexus-App-Pakistan/src/components/dashboard/studio/DeliveryCenterView.tsx)) with secure URL gates.
