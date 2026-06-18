# NEXUS — UI Component Registry

This document catalogs all current components, layout blocks, and workspace modules in the NEXUS system, along with future components planned for implementation.

---

## 1. UI Primitives (`src/components/ui`)

These are atomic, presentation-only components built with Radix UI and Tailwind CSS v4 styling:

*   **Button (`button.tsx`):** Trigger elements with customizable styles (emerald, pink, outline, destructive, ghost) and scaling profiles (default, sm, lg, icon).
*   **Card (`card.tsx`):** Container blocks for layouts. Includes `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, and `CardFooter`.
*   **Dialog (`dialog.tsx`):** Accessible pop-up overlays, alerts, and detailed settings models.
*   **Badge (`badge.tsx`):** Pill-shaped status indicators (emerald for success, red for alert, pink for highlights, gray for draft).
*   **Avatar (`avatar.tsx`):** Round cuts displaying user profile images or custom name letters fallback.
*   **Input (`input.tsx`):** Odoo-style styled form input fields.
*   **Table (`table.tsx`):** Clean columns grid to view rows (clients list, transaction logs, booking events).
*   **Tabs (`tabs.tsx`):** Compact toggles to split views within cards or dashboards.

---

## 2. Access & Security Wrappers (`src/components/ui`)

These wrapper components guard specific child nodes based on user metadata:

*   **`RequirePermission` (`RequirePermission.tsx`):** Restricts rendering to users with specific RBAC permission strings (e.g., `bookings:approve`).
*   **`RequirePlan` (`RequirePlan.tsx`):** Restricts premium views to organizations with the necessary subscription tier (e.g., `pro` or `enterprise`).
*   **`FeatureFlag` (`FeatureFlag.tsx`):** Enables rolling out experimental screens to select tenant organizations.

---

## 3. Global Framework Layouts (`src/components/layout`)

Structure shells wrapping public paths and SaaS dashboard views:

*   **`GlobalHeader` (`GlobalHeader.tsx`):** Top sticky bar. Contains logo search inputs, profile settings menu, and dark mode toggler.
*   **`Sidebar` (`Sidebar.tsx`):** Vertical navigation bar checking user permission tags to dynamically render permitted options.
*   **`MobileBottomNav` (`MobileBottomNav.tsx`):** Bottom sticky navigation bar loaded on touch-screen viewports (`< md`).
*   **`MegaFooter` (`MegaFooter.tsx`):** Categorized public link indexes.
*   **`GlobalAIAssistant` (`GlobalAIAssistant.tsx`):** Floating chatbot assistant overlaying screens.

---

## 4. Bento Homepage & Discovery Components (`src/components/home`)

Components composing the 12-column Bento Grid landing page and search layouts:

*   **`BentoHomeLayout` (`BentoHomeLayout.tsx`):** The modular homepage wrapper arranging promotional widgets and marketplace shortcuts.
*   **`SmartSearchBar` (`SmartSearchBar.tsx`):** Context-aware search input matching locations, capacity limits, and pricing.
*   **`QuickQuoteBuilder` (`QuickQuoteBuilder.tsx`):** Interactive budget planner prompting guest numbers and catering preferences to render cost estimations.
*   **`NexusOperatingSystem` (`NexusOperatingSystem.tsx`):** Promo bento card demonstrating dashboard systems.
*   **`DisplayNetworkPromo` (`DisplayNetworkPromo.tsx`):** Promo item demonstrating digital displays and signage tools.
*   **`PlaylistPromo` (`PlaylistPromo.tsx`):** Interactive card highlighting video playbacks.

---

## 5. Venue Workspace Modules (`src/components/dashboard/venue`)

Views rendered dynamically for venue operators (`Venue` role):

*   **`VenueDashboardHome` (`VenueDashboardHome.tsx`):** Main operator feed displaying booking calendars, pending leads, and active invoices.
*   **`CalendarView` (`CalendarView.tsx`):** Central dashboard calendar managing venue schedules and event blocks.
*   **`BookingsView` (`BookingsView.tsx`):** Comprehensive table grid managing reservations, catering specifications, and guest count sheets.
*   **`LeadsView` (`LeadsView.tsx`):** Kanban CRM tracking inquiries (in contacted, negotiating, and confirmed stages).
*   **`LeadDetailsView` (`LeadDetailsView.tsx`):** Split panel view detailing a lead's communications history.
*   **`NewLeadView` (`NewLeadView.tsx`):** Step-by-step form helper adding leads.
*   **`QuotationBuilder` (`QuotationBuilder.tsx`):** Pricing compiler building cost sheets with tax calculations.
*   **`DisplaysView` (`DisplaysView.tsx`):** Display network terminal configuration manager (pairing, schedules, screen states).
*   **`HallsSpacesView` (`HallsSpacesView.tsx`):** Hall config panel managing distinct banquet halls, marquees, and capacity parameters.
*   **`AssetsView` (`AssetsView.tsx`):** Logistics checklist dashboard.
*   **`ContactsView` (`ContactsView.tsx`):** Tenant customer and operator registry.
*   **`ActivityLogsView` (`ActivityLogsView.tsx`):** Real-time activity feeds showing updates, updates audits, and actions.
*   **`ProfileMakerView` (`ProfileMakerView.tsx`):** Profile manager building marketplace profile listings.
*   **`PublicProfilePreview` (`PublicProfilePreview.tsx`):** Preview component rendering what clients see.
*   **`NexusBusinessAI` (`NexusBusinessAI.tsx`):** Business advisor dashboard.

---

## 6. Studio & Media Workspace Modules (`src/components/dashboard/studio`)

Views rendered dynamically for photographers, videographers, and creative agencies (`Studio` role):

*   **`StudioDashboardHome` (`StudioDashboardHome.tsx`):** Main feed showing project kanban boards and calendar details.
*   **`StudioLeadsView` (`StudioLeadsView.tsx`):** CRM tailored for media inquiries.
*   **`StudioProjectsView` (`StudioProjectsView.tsx`):** Shoot projects tracker mapping raw footage uploads, selected items, and completed deliveries.
*   **`PhotoSelectionView` (`PhotoSelectionView.tsx`):** Client photo selection portal.
*   **`VideoReviewView` (`VideoReviewView.tsx`):** Frame-by-frame video review canvas supporting client comments at specific timestamps.
*   **`DeliveryCenterView` (`DeliveryCenterView.tsx`):** High-res project package digital delivery platform.
*   **`EquipmentTrackingView` (`EquipmentTrackingView.tsx`):** Equipment checkout checklist tracker.
*   **`TeamScheduleView` (`TeamScheduleView.tsx`):** Assignments scheduler matching shooters to shoots.
*   **`PaymentsView` (`PaymentsView.tsx`):** Client payments tracker.
*   **`AccountingView` (`AccountingView.tsx`):** Expenses ledger.

---

## 7. Chat & Messaging (`src/components/chat`)

*   **`NexusChat` (`NexusChat.tsx`):** B2B interface linking conversations, contacts list, media attachments, and message tracking.

---

## 8. Future Planned Components

Below is the product catalog scheduled for future milestone cycles:

*   **`ContractGenerator` (Milestone 2):** Automated client contract builder binding confirmed quotations into legal PDF drafts.
*   **`MobileBarcodeScanner` (Milestone 7):** Lightweight camera-based scan card built into MobileBottomNav to process equipment checkouts on the go.
*   **`MultiScreenSync` (Milestone 7):** Sync mechanism to push identical visual slides simultaneously across multiple paired TVs.
*   **`CorporateBillingDashboard` (Milestone 6):** Advanced payment portal for corporate clients, supporting multi-person approvals and corporate invoice reconciliation.
*   **`CustomerReviewsWidget` (Milestone 3):** Embeddable feedback form for client accounts to publish ratings on marketplace listings.
