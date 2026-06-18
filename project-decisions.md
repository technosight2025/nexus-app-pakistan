# NEXUS — Approved Project Decisions Log

This document records the architectural, design, and product decisions officially approved for the NEXUS platform.

---

## 1. Core Brand & Naming
*   **Decision:** The platform is officially branded as **NEXUS** (stylized in capitals).
*   **Rationale:** The name signifies a central connection point, positioning the platform as the primary connector ("the nexus") for customers, vendors, venues, and operators in Pakistan.

---

## 2. Multi-Tenant Logical Isolation Architecture
*   **Decision:** Adopt a single shared PostgreSQL database utilizing row-level tenant security tags over separate database instances.
*   **Rationale:** Lowers hosting overhead and simplifies global marketplace search listings, while leveraging strict PostgreSQL Row-Level Security (RLS) policies on the `organization_id` column to prevent cross-tenant data leaks.

---

## 3. Technology Stack Selection
*   **Decision:** Standardize on **Next.js App Router**, **TypeScript**, and **Supabase (PostgreSQL)**.
*   **Rationale:**
    - Next.js Server Components enable SEO optimization and rapid page loads for search directories, while Client Components support dashboard modules.
    - TypeScript provides type safety for data models.
    - Supabase manages Auth, SSR sessions, and real-time database listener updates without a custom API server.

---

## 4. Role-Based Dynamic Dashboards
*   **Decision:** Filter the system dashboard layout based on the user's logged-in organization profile role (Venue, Caterer, Studio, Decorator) rather than loading identical screens.
*   **Rationale:** Customizes the layout to fit the specific workflows of different vendor types, reducing UI clutter and cognitive load.

---

## 5. Mobile-First Approach
*   **Decision:** Enforce a strict mobile-responsive target for the system dashboard workspace.
*   **Rationale:** Event coordinators, photographers, and catering staff operate on the event floor via mobile phones. Standard desktop sidebars collapse into a touch-optimized bottom navigation bar ([MobileBottomNav](file:///d:/Nexus-App-Pakistan/src/components/layout/MobileBottomNav.tsx)) on small viewports.

---

## 6. NEXUS Apps Marketplace
*   **Decision:** Implement a toggleable modular dashboard system ([NexusAppsView](file:///d:/Nexus-App-Pakistan/src/components/dashboard/venue/NexusAppsView.tsx)) backed by the database table `module_activations`.
*   **Rationale:** Allows vendors to configure their workspace by enabling or disabling modules (Leads, Projects, Equipment logs) and links feature access to billing subscription tiers.

---

## 7. Digital Display Network
*   **Decision:** Build a digital display signage module managed through the `screens` table and promoted via [DisplayNetworkPromo.tsx](file:///d:/Nexus-App-Pakistan/src/components/home/DisplayNetworkPromo.tsx).
*   **Rationale:** Enables venues to pair screens (using a pairing code) and stream live schedules, event slide shows, and advertisements directly to TV screens in banquet halls or lobbies.

---

## 8. Memories Platform
*   **Decision:** Bundle digital asset proofs, selection interfaces, and final assets delivery into a unified "Memories Platform".
*   **Rationale:** Consolidates workflows for studios and clients. Instead of using disparate tools (like WhatsApp, WeTransfer, and emails), clients proof high-res files, provide timestamped video feedback, and download files directly in NEXUS.

---

## 9. 12-Column Bento Homepage Layout
*   **Decision:** Design the landing homepage using a premium 12-column Bento Grid structure ([BentoHomeLayout.tsx](file:///d:/Nexus-App-Pakistan/src/components/home/BentoHomeLayout.tsx)).
*   **Rationale:** Organizes different platform pillars (Marketplace search, Operating System dashboard features, Display Network promo, and Bridal rentals) into an engaging visual layout.
