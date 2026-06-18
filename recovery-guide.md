# NEXUS — Recovery & Project Context Guide

This guide serves as the project memory and troubleshooting manual. It is designed to help developer sessions quickly restore context, understand active project status, and resolve common development errors.

---

## 1. Project Memory & Governance Index

If session context is lost (due to IDE reboots, AI model context resets, or handovers), read the following documents in order to realign:

1.  **[project-overview.md](file:///d:/Nexus-App-Pakistan/project-overview.md):** The core platform description, target personas (SaaS and Consumer), and long-term industry vision.
2.  **[architecture.md](file:///d:/Nexus-App-Pakistan/architecture.md):** The logical multi-tenant database rules, RLS policies structure, permission levels, and component structures.
3.  **[project-decisions.md](file:///d:/Nexus-App-Pakistan/project-decisions.md):** Log of approved architectural and product design decisions (e.g. Bento homepage, digital lobby display networks).
4.  **[code-standards.md](file:///d:/Nexus-App-Pakistan/code-standards.md):** Rules for coding (TypeScript strictly, no `any`, no inline styling, Tailwind-only, and RSC layouts).
5.  **[ui-tokens.md](file:///d:/Nexus-App-Pakistan/ui-tokens.md):** Theme HSL color variables (Emerald, Pink, Gold, Warm Ivory), font families, and border radius ratios.
6.  **[ui-rules.md](file:///d:/Nexus-App-Pakistan/ui-rules.md):** Guidelines for UI designs (Odoo-style grid density, Stripe-style clean borders, no wedding-themed graphic designs, minimal glassmorphism, no heavy shadows).
7.  **[ui-registry.md](file:///d:/Nexus-App-Pakistan/ui-registry.md):** Comprehensive catalog mapping current layout shells, wrappers, and dashboard components.
8.  **[build-plan.md](file:///d:/Nexus-App-Pakistan/build-plan.md):** The step-by-step 8-phase roadmap checklist (Phases 0 through 7).
9.  **[progress-tracker.md](file:///d:/Nexus-App-Pakistan/progress-tracker.md):** Live monitor tracking the active phase, completed tasks list, pending actions, and feature approvals.
10. **[review-rules.md](file:///d:/Nexus-App-Pakistan/review-rules.md):** PR approval standards auditing code for tenant isolation, security guards, styling tokens, and mobile touch targets.

---

## 2. Walkthrough to Resume Work

Follow these steps to resume development from a cold start:

1.  **Check Current Status:** Read [progress-tracker.md](file:///d:/Nexus-App-Pakistan/progress-tracker.md) to locate the current active phase (currently Phase 1 / 2) and read the topmost pending checkboxes.
2.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    Open `http://localhost:3000` to verify that the home page and core routes compile.
3.  **Consult UI Registry:** Before creating any new interactive layouts, cards, buttons, or input forms, check [ui-registry.md](file:///d:/Nexus-App-Pakistan/ui-registry.md) to verify if a matching primitive or wrapper is already present in `src/components/ui/` or `src/components/layout/`.
4.  **Enforce Governance Rules:** Ensure that no wedding-themed language or romantic styling variables creep into layouts. Keep the UI aligned with the Odoo high-density SaaS model.
5.  **Verify DB Isolation:** If database tables are modified, verify that RLS is enabled and queries check for `organization_id` session tags.

---

## 3. General Troubleshooting Runbook

### Issue: Database Operations Fail on Client Side
-   **Symptom:** Operations return network failures or local context logs a dummy configuration error.
-   **Action:** Ensure [.env.local](file:///d:/Nexus-App-Pakistan/.env.local) is loaded in the workspace root and contains active keys:
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
    ```

### Issue: Next.js Cache Freezes or Server Out of Memory
-   **Symptom:** The console hangs, or local compilation fails to pick up folder changes.
-   **Action:** Terminate the node runner and clean the build caches:
    ```powershell
    Remove-Item -Recurse -Force .next
    Remove-Item tsconfig.tsbuildinfo
    npm run dev
    ```

### Issue: Supabase Database Types Out of Sync
-   **Symptom:** TypeScript throws errors claiming schema properties are missing from local interfaces.
-   **Action:** Regenerate type mappings:
    ```bash
    npx supabase gen types typescript --project-id "your-project-id" > src/types/supabase.ts
    ```
