# NEXUS — Project Overview

NEXUS is **Pakistan's Event & Business Operating System**. It is a unified platform designed to manage operations, client bookings, workflows, and discovery across Pakistan's high-growth event, hospitality, and creative media sectors.

---

## 1. Project Information

*   **Project Name:** NEXUS
*   **Description:** Pakistan's Event & Business Operating System.
*   **Long-Term Vision:** Create a unified operating platform for Pakistan's event, hospitality, venue, and media industries.

---

## 2. Core Value Propositions

The event and wedding industry in Pakistan represents a massive economy that has traditionally been managed through scattered spreadsheets, paper ledgers, and fragmented communication tools. NEXUS addresses this by combining two major pillars:

1.  **Consumer Discovery Marketplace:** A premium discovery layer where individual users and corporate clients search, evaluate, and book top-tier event infrastructure and service providers.
2.  **Vendor Operations Operating System:** A modular SaaS dashboard that empowers business owners to track bookings, manage equipment inventory, reconcile financial ledgers, assign field staff, and digitize client proofs.

---

## 3. Target User Personas

NEXUS serves a multi-sided ecosystem with distinct interfaces and capabilities tailored to each participant:

*   **Customers:** Individual consumers looking to browse venues, photobooks, menus, and packages. They use the platform to communicate with vendors, review drafts (photos/videos), and make digital payments.
*   **Venues:** Wedding marquees, banquet halls, hotels, and farmhouse estates. They use NEXUS to prevent double-bookings, schedule floor layout schemes, and track major client packages.
*   **Photographers & Videographers:** Freelance creative professionals and field shooters. They track assigned event schedules, mark gear checkout logs, and sync shoot assignments.
*   **Studios:** Media production houses. They use NEXUS as their business engine to manage multiple shoot projects, pipeline photo selections, host timestamped video edits, and deliver assets via CDN links.
*   **Event Managers & Planners:** Agencies coordinating full weddings or multi-day celebrations. They consolidate schedules, track external supplier lists, and coordinate overall floor timelines.
*   **Caterers & Restaurants:** Catering companies and dining venues. They track custom menus, scale ingredient estimates based on guest counts, and schedule kitchen operations.
*   **Decorators:** Florists, theme builders, and set designers. They track staging schedules, rental inventories, and coordinate staff logistics.
*   **Corporate Clients:** Companies planning seminars, gala dinners, conferences, or marketing exhibitions. They use NEXUS for procurement, split invoicing, and structured corporate booking workflows.

---

## 4. Key SaaS Modules

NEXUS contains a dynamic modules layer (`src/config/modules.ts`) that vendor organizations activate based on their operations:

*   **Leads CRM:** Visual sales pipelines tracking client inquiries from initial touch to finalized contracts.
*   **Bookings Board:** Event calendars checking for schedule collisions.
*   **Payments & Invoices:** Advance deposits management, split invoices, and customer receipt logs.
*   **Accounting Ledger:** Tracking direct business margins (e.g. employee wages, fuel/transportation, equipment wear-and-tear).
*   **Projects Board:** Kanban boards designed around photography/media production lifecycles.
*   **Equipment Tracker:** Live barcode-style checkouts of cameras, lens gear, lighting assets, and major decor inventory.
*   **Client Proofing Portals:** High-res photo selection galleries and frame-by-frame video review tools.
*   **Digital Delivery:** CDN-backed download hubs for client project files.

---

## 5. Technology Blueprint

*   **Frontend Core:** Next.js 16 App Router (RSC + SSR configuration) for quick public page rendering and SEO optimization.
*   **Styling Engine:** Tailwind CSS v4 using responsive HSL design tokens matching luxury aesthetics.
*   **Backend & Security:** Supabase BaaS (PostgreSQL database, real-time sync, Row-Level Security isolation).
*   **Hosting Target:** Vercel (Edge routing, dynamic API routes, and optimized CDN storage).
