# NEXUS — Code & PR Review Guidelines

All code contributions, database migrations, and UI pull requests (PRs) must be rigorously evaluated across the six pillars outlined below.

---

## 1. Multi-Tenant Support
Ensure that data isolation boundaries are clean and cannot leak records between different tenant organizations.

*   **Tenant Mapping Check:** Any new database table scoped to vendor workspaces must include an `organization_id` column of type `UUID` referencing `organizations.id` with a foreign key constraint.
*   **RLS Validation:** Verify that PostgreSQL Row-Level Security (RLS) is active on the table. Confirm that the table policies explicitly filter operations using the user's authenticated organization claim:
    ```sql
    organization_id = (SELECT organization_id FROM users WHERE id = auth.uid())
    ```
*   **Leak Testing:** Inspect database queries to ensure they respect the user's active session organization context, preventing cross-tenant leakage even if RLS were temporarily disabled.

---

## 2. Security
Audit code modifications for authorization controls, secret leakage, and entry validation.

*   **RBAC Guards:** Ensure that all privileged operations (e.g., approving bookings, editing packages, updating invoices) are protected by:
    - Renders gated behind `<RequirePermission>` elements.
    - Logic checks using `hasPermission()` from `usePermission()` hooks.
*   **Credential Security:** Inspect code to guarantee that no secret keys (such as `SUPABASE_SERVICE_ROLE_KEY`) are exposed in the client-side JavaScript bundles or public components.
*   **Input Sanitization & Typings:** Use Zod schemas and TypeScript type assertions to validate all forms and external API request bodies before saving them.

---

## 3. Performance
Optimize rendering, resource loading, and data transfer speeds.

*   **RSC Optimization:** Default to React Server Components (RSC) for page routes, listings, and static assets to reduce client-side bundle sizes and speed up page load times.
*   **Asset Compression:** Ensure all images are loaded using the Next.js optimization wrapper (`next/image`) with pre-calculated widths and layout parameters.
*   **State Optimization:** Keep Zustand state stores focused and modular to prevent unnecessary re-renders of unrelated components.
*   **Skeleton Loading:** Long-running database operations must be wrapped in React `<Suspense>` containers with skeletons to avoid rendering freezes.

---

## 4. Scalability
Design the database schema and layout files to handle high traffic and media storage.

*   **Asset Management:** Media items (photo proofing lists, video drafts, portfolio pictures) must be stored in Supabase CDN storage bucket volumes with proper access cache configurations, avoiding raw database attachments.
*   **Relational Integrity:** Check SQL migration scripts for cascading rules (`ON DELETE CASCADE` or `ON DELETE SET NULL`) to prevent orphan records when users or organizations are deleted.
*   **Feature Architecture:** Enforce logical component grouping under feature folders to keep the repository organized as the code base grows.

---

## 5. Reusability
Encourage the creation of clean, modular, and reusable components.

*   **Component Primitives:** Base elements (buttons, badge tags, inputs) should be built as reusable, presentational UI primitives in [src/components/ui](file:///d:/Nexus-App-Pakistan/src/components/ui).
*   **Utility Functions:** Extract common utility operations (such as tax calculations, date parsing, and string formatting) into utility helpers rather than duplicating code across components.

---

## 6. Mobile UX
Ensure a highly polished, responsive interface for field operators and mobile clients.

*   **Touch Targets:** Ensure all touch-interactive elements (buttons, inputs, sliders) have a minimum dimension of `44px x 44px` to facilitate easy tapping.
*   **Viewport Scaling:** Avoid hardcoded layout widths or heights. Utilize responsive flexbox grids and Tailwind breakpoint prefixes (e.g., `md:flex-row flex-col`).
*   **Responsive Shell Swap:** Test that desktop sidebars successfully collapse into touch-friendly bottom navigation bars on small viewports (`< md`).
